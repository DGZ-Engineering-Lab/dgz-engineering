import { afterEach, describe, expect, it, vi } from "vitest";
import {
  CONSENT_CHANGED_EVENT,
  CONSENT_SCHEMA_VERSION,
  CONSENT_STORAGE_KEY,
  OPEN_SETTINGS_EVENT,
  createConsent,
  hasAnalyticsConsent,
  notifyConsentChanged,
  openCookieSettings,
  parseConsent,
  readConsent,
  serializeConsent,
  writeConsent,
} from "../cookie-consent";
import { POLICY_VERSION } from "../legal";

const NOW = new Date("2026-10-28T15:00:00.000Z");

function memoryStorage(initial = {}) {
  const data = new Map(Object.entries(initial));
  return {
    getItem: (k) => (data.has(k) ? data.get(k) : null),
    setItem: (k, v) => data.set(k, String(v)),
    removeItem: (k) => data.delete(k),
    data,
  };
}

const throwingStorage = {
  getItem: () => {
    throw new Error("SecurityError");
  },
  setItem: () => {
    throw new Error("QuotaExceededError");
  },
};

afterEach(() => {
  vi.unstubAllGlobals();
});

describe("createConsent", () => {
  it("builds a versioned record with the current policy", () => {
    expect(createConsent({ analytics: true, now: NOW })).toEqual({
      v: 1,
      analytics: true,
      decidedAt: "2026-10-28T15:00:00.000Z",
      policyVersion: POLICY_VERSION,
    });
  });

  it("only accepts analytics when it is exactly true", () => {
    // @ts-ignore: valor no booleano a propósito
    expect(createConsent({ analytics: "yes", now: NOW }).analytics).toBe(false);
    expect(createConsent({ analytics: false, now: NOW }).analytics).toBe(false);
  });
});

describe("serializeConsent / parseConsent", () => {
  it("round-trips a valid consent", () => {
    const consent = createConsent({ analytics: false, now: NOW });
    expect(parseConsent(serializeConsent(consent))).toEqual(consent);
  });

  it("drops unknown fields", () => {
    const raw = JSON.stringify({ ...createConsent({ analytics: true, now: NOW }), extra: "x" });
    expect(parseConsent(raw)).not.toHaveProperty("extra");
  });

  it("returns null for missing or corrupted values", () => {
    for (const raw of [
      null,
      undefined,
      "",
      "{",
      "null",
      "[]",
      "42",
      '"texto"',
      "{}",
      "x".repeat(5000),
    ]) {
      expect(parseConsent(raw)).toBeNull();
    }
  });

  it("rejects records with wrong field types", () => {
    const base = createConsent({ analytics: true, now: NOW });
    const variants = [
      { ...base, analytics: "true" },
      { ...base, analytics: 1 },
      { ...base, decidedAt: "no-es-fecha" },
      { ...base, decidedAt: 123 },
      { ...base, policyVersion: "" },
      { ...base, policyVersion: undefined },
    ];
    for (const v of variants) expect(parseConsent(JSON.stringify(v))).toBeNull();
  });

  it("rejects other schema versions", () => {
    const base = createConsent({ analytics: true, now: NOW });
    expect(parseConsent(JSON.stringify({ ...base, v: 0 }))).toBeNull();
    expect(parseConsent(JSON.stringify({ ...base, v: CONSENT_SCHEMA_VERSION + 1 }))).toBeNull();
    expect(parseConsent(JSON.stringify({ ...base, v: "1" }))).toBeNull();
  });

  it("asks again when the policy version changed", () => {
    const old = createConsent({ analytics: true, now: NOW, policyVersion: "2020-01-01" });
    expect(parseConsent(JSON.stringify(old))).toBeNull();
    // Sin exigir versión de política, el registro es válido.
    expect(parseConsent(JSON.stringify(old), { policyVersion: null })).toEqual(old);
  });

  it("serializeConsent refuses invalid input", () => {
    expect(serializeConsent(null)).toBeNull();
    expect(serializeConsent({ v: 1, analytics: "x" })).toBeNull();
  });
});

describe("hasAnalyticsConsent", () => {
  it("is true only for an explicit acceptance", () => {
    expect(hasAnalyticsConsent(createConsent({ analytics: true, now: NOW }))).toBe(true);
    expect(hasAnalyticsConsent(createConsent({ analytics: false, now: NOW }))).toBe(false);
    expect(hasAnalyticsConsent(null)).toBe(false);
    expect(hasAnalyticsConsent(undefined)).toBe(false);
  });
});

describe("readConsent / writeConsent", () => {
  it("writes under the dgz_cookie_consent key and reads it back", () => {
    const storage = memoryStorage();
    const consent = createConsent({ analytics: true, now: NOW });
    expect(writeConsent(consent, storage)).toBe(true);
    expect(CONSENT_STORAGE_KEY).toBe("dgz_cookie_consent");
    expect(JSON.parse(storage.data.get(CONSENT_STORAGE_KEY))).toEqual(consent);
    expect(readConsent(storage)).toEqual(consent);
  });

  it("reads null when nothing or garbage is stored", () => {
    expect(readConsent(memoryStorage())).toBeNull();
    expect(readConsent(memoryStorage({ [CONSENT_STORAGE_KEY]: "%%%" }))).toBeNull();
  });

  it("does not throw when storage is unavailable", () => {
    const consent = createConsent({ analytics: true, now: NOW });
    expect(readConsent(throwingStorage)).toBeNull();
    expect(writeConsent(consent, throwingStorage)).toBe(false);
    expect(readConsent(null)).toBeNull();
    expect(writeConsent(consent, null)).toBe(false);
    // Sin window (SSR / entorno node) tampoco falla.
    expect(readConsent()).toBeNull();
  });

  it("does not store an invalid consent", () => {
    const storage = memoryStorage();
    expect(writeConsent({ v: 2 }, storage)).toBe(false);
    expect(storage.data.size).toBe(0);
  });
});

describe("window events", () => {
  it("dispatches consent-changed with the decision", () => {
    const target = new EventTarget();
    vi.stubGlobal("window", target);
    const handler = vi.fn();
    target.addEventListener(CONSENT_CHANGED_EVENT, handler);
    const consent = createConsent({ analytics: false, now: NOW });
    notifyConsentChanged(consent);
    expect(handler).toHaveBeenCalledTimes(1);
    expect(handler.mock.calls[0][0].detail).toEqual(consent);
  });

  it("dispatches open-cookie-settings", () => {
    const target = new EventTarget();
    vi.stubGlobal("window", target);
    const handler = vi.fn();
    target.addEventListener(OPEN_SETTINGS_EVENT, handler);
    openCookieSettings();
    expect(handler).toHaveBeenCalledTimes(1);
    expect(OPEN_SETTINGS_EVENT).toBe("dgz:open-cookie-settings");
    expect(CONSENT_CHANGED_EVENT).toBe("dgz:consent-changed");
  });

  it("is a no-op without window", () => {
    expect(() => notifyConsentChanged(null)).not.toThrow();
    expect(() => openCookieSettings()).not.toThrow();
  });
});
