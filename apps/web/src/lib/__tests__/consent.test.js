import { createHash } from "node:crypto";
import { describe, expect, it } from "vitest";
import {
  buildConsentRecord,
  finalidadFromSource,
  hasPrivacyConsent,
  sanitizePolicyVersion,
  sanitizeSource,
} from "../consent";
import { POLICY_VERSION, authorizationText } from "../legal";

const sha256 = (text) => createHash("sha256").update(text).digest("hex");

describe("finalidadFromSource", () => {
  it("maps every site form to its declared purpose", () => {
    expect(finalidadFromSource("contact")).toBe("contacto");
    expect(finalidadFromSource("audit-calculator")).toBe("diagnostico");
    expect(finalidadFromSource("audit-report")).toBe("diagnostico");
    expect(finalidadFromSource("diagnostic-preaudit")).toBe("diagnostico");
    expect(finalidadFromSource("service-quote")).toBe("cotizacion");
    expect(finalidadFromSource("careers")).toBe("seleccion");
    expect(finalidadFromSource("newsletter-faq")).toBe("boletin");
    expect(finalidadFromSource("newsletter-blog")).toBe("boletin");
  });

  it("normalizes case and falls back to contacto for unknown or missing sources", () => {
    expect(finalidadFromSource("  Newsletter-FAQ ")).toBe("boletin");
    expect(finalidadFromSource("otro-formulario")).toBe("contacto");
    expect(finalidadFromSource(undefined)).toBe("contacto");
    expect(finalidadFromSource(42)).toBe("contacto");
  });
});

describe("sanitizeSource", () => {
  it("keeps only [a-z0-9_-] and caps the length at 40", () => {
    expect(sanitizeSource("Audit-Report")).toBe("audit-report");
    expect(sanitizeSource("<script>alert(1)</script>")).toBe("script-alert-1-script");
    expect(sanitizeSource("x".repeat(80))).toHaveLength(40);
  });

  it("returns 'unknown' for non-strings and empty values", () => {
    expect(sanitizeSource(null)).toBe("unknown");
    expect(sanitizeSource({})).toBe("unknown");
    expect(sanitizeSource("   ")).toBe("unknown");
    expect(sanitizeSource("!!!")).toBe("unknown");
  });
});

describe("sanitizePolicyVersion", () => {
  it("accepts short version strings", () => {
    expect(sanitizePolicyVersion("2026-10-28")).toBe("2026-10-28");
    expect(sanitizePolicyVersion(" v1.2 ")).toBe("v1.2");
  });

  it("falls back to the current version when invalid or too long", () => {
    expect(sanitizePolicyVersion(undefined)).toBe(POLICY_VERSION);
    expect(sanitizePolicyVersion(20261028)).toBe(POLICY_VERSION);
    expect(sanitizePolicyVersion("")).toBe(POLICY_VERSION);
    expect(sanitizePolicyVersion("a".repeat(21))).toBe(POLICY_VERSION);
    expect(sanitizePolicyVersion("<b>1</b>")).toBe(POLICY_VERSION);
  });
});

describe("hasPrivacyConsent", () => {
  it("only accepts the boolean true", () => {
    expect(hasPrivacyConsent({ privacyConsent: true })).toBe(true);
    expect(hasPrivacyConsent({ privacyConsent: "true" })).toBe(false);
    expect(hasPrivacyConsent({ privacyConsent: 1 })).toBe(false);
    expect(hasPrivacyConsent({})).toBe(false);
    expect(hasPrivacyConsent(null)).toBe(false);
  });
});

describe("buildConsentRecord", () => {
  const now = new Date("2026-10-28T15:00:00.000Z");

  it("builds the authorization proof with the hash of the exact text shown", () => {
    const record = buildConsentRecord(
      {
        privacyConsent: true,
        policyVersion: POLICY_VERSION,
        consentSource: "newsletter-blog",
        consent: true,
      },
      { hashText: sha256, now }
    );
    expect(record).toEqual({
      privacy: true,
      policyVersion: POLICY_VERSION,
      source: "newsletter-blog",
      acceptedAt: "2026-10-28T15:00:00.000Z",
      textHash: sha256(authorizationText("boletin")),
      newsletter: true,
    });
    expect(record.textHash).toMatch(/^[a-f0-9]{64}$/);
  });

  it("uses the purpose of the source for the hash and defaults safely", () => {
    const record = buildConsentRecord(
      { privacyConsent: true, consentSource: "service-quote" },
      { hashText: sha256, now }
    );
    expect(record.textHash).toBe(sha256(authorizationText("cotizacion")));
    expect(record.policyVersion).toBe(POLICY_VERSION);
    expect(record.newsletter).toBe(false);

    const fallback = buildConsentRecord(
      { privacyConsent: true, consentSource: "???" },
      { hashText: sha256, now }
    );
    expect(fallback.source).toBe("unknown");
    expect(fallback.textHash).toBe(sha256(authorizationText("contacto")));
  });

  it("does not record newsletter consent unless it is strictly true", () => {
    const record = buildConsentRecord(
      { consentSource: "contact", consent: "yes" },
      { hashText: sha256, now }
    );
    expect(record.newsletter).toBe(false);
  });

  it("does not store the IP or other request data", () => {
    const record = buildConsentRecord(
      { consentSource: "contact", ip: "1.2.3.4", name: "Ana" },
      { hashText: sha256, now }
    );
    expect(Object.keys(record).sort()).toEqual([
      "acceptedAt",
      "newsletter",
      "policyVersion",
      "privacy",
      "source",
      "textHash",
    ]);
  });
});
