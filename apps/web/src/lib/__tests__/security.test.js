import { afterEach, describe, expect, it, vi } from "vitest";
import {
  assertSameOrigin,
  boundedString,
  escapeHtml,
  getClientIp,
  isJsonRequest,
  isValidEmail,
  maskEmail,
  matchesFileSignature,
  singleLine,
} from "../security";

describe("escapeHtml", () => {
  it("escapes the five HTML-significant characters", () => {
    expect(escapeHtml(`<a href="x" title='y'>&</a>`)).toBe(
      "&lt;a href=&quot;x&quot; title=&#39;y&#39;&gt;&amp;&lt;/a&gt;"
    );
  });

  it("returns an empty string for null and undefined", () => {
    expect(escapeHtml(null)).toBe("");
    expect(escapeHtml(undefined)).toBe("");
  });

  it("keeps plain text untouched", () => {
    expect(escapeHtml("Catastro Multipropósito – Medellín")).toBe(
      "Catastro Multipropósito – Medellín"
    );
  });
});

describe("singleLine", () => {
  it("removes CR/LF so values cannot inject email headers", () => {
    expect(singleLine("Ana\r\nBcc: victim@example.com")).toBe("Ana Bcc: victim@example.com");
    expect(singleLine(null)).toBe("");
  });
});

describe("isValidEmail", () => {
  it.each(["a@b.co", "first.last+tag@sub.domain.gov.co"])("accepts %s", (email) => {
    expect(isValidEmail(email)).toBe(true);
  });

  it.each([
    "",
    "plain",
    "a@b",
    "a b@c.co",
    "a@@b.co",
    "<a>@b.co",
    null,
    42,
    `${"a".repeat(250)}@b.co`,
  ])("rejects %s", (email) => {
    expect(isValidEmail(email)).toBe(false);
  });
});

describe("boundedString", () => {
  it("trims strings within the limit", () => {
    expect(boundedString("  Ana  ", 10)).toBe("Ana");
  });

  it("rejects missing, blank, non-string or oversized required values", () => {
    for (const value of [undefined, null, "", "   ", 42, { $ne: "" }, "x".repeat(11)]) {
      expect(boundedString(value, 10)).toBeNull();
    }
  });

  it("allows empty optional values but still bounds them", () => {
    expect(boundedString(undefined, 10, { required: false })).toBe("");
    expect(boundedString("x".repeat(11), 10, { required: false })).toBeNull();
  });
});

describe("getClientIp", () => {
  const req = (headers) => ({ headers: new Headers(headers) });

  it("uses the first X-Forwarded-For hop", () => {
    expect(getClientIp(req({ "x-forwarded-for": " 3.3.3.3 , 10.0.0.1" }))).toBe("3.3.3.3");
  });

  it("falls back to x-real-ip, then cf-connecting-ip, then unknown", () => {
    expect(getClientIp(req({ "x-real-ip": "4.4.4.4", "cf-connecting-ip": "1.1.1.1" }))).toBe(
      "4.4.4.4"
    );
    expect(getClientIp(req({ "cf-connecting-ip": "1.1.1.1" }))).toBe("1.1.1.1");
    expect(getClientIp(req({}))).toBe("unknown");
  });

  it("prefers platform headers over a spoofable X-Forwarded-For", () => {
    expect(getClientIp(req({ "x-forwarded-for": "6.6.6.6", "x-real-ip": "4.4.4.4" }))).toBe("4.4.4.4");
    expect(
      getClientIp(req({ "x-forwarded-for": "6.6.6.6", "x-vercel-forwarded-for": "5.5.5.5, 10.0.0.1" }))
    ).toBe("5.5.5.5");
  });
});

describe("maskEmail", () => {
  it("hides the local part", () => {
    expect(maskEmail("albert@example.com")).toBe("a***@example.com");
  });

  it("returns a placeholder for non-emails", () => {
    expect(maskEmail(undefined)).toBe("***");
    expect(maskEmail("unknown")).toBe("***");
  });

  it("strips line breaks so log entries cannot be forged", () => {
    expect(maskEmail("a@evil.com\n[ADMIN] fake entry")).toBe("a***@evil.com[ADMIN] fake entry");
  });
});

describe("assertSameOrigin", () => {
  const req = (headers, url = "https://devgiz.vercel.app/api/contact") => ({
    url,
    headers: new Headers(headers),
  });

  afterEach(() => {
    vi.unstubAllEnvs();
  });

  it("accepts the canonical site and the request's own origin (previews)", () => {
    expect(assertSameOrigin(req({ origin: "https://devgiz.vercel.app" }))).toBe(true);
    expect(
      assertSameOrigin(
        req({ origin: "https://web-git-feat-devgiz.vercel.app" }, "https://web-git-feat-devgiz.vercel.app/api/ai")
      )
    ).toBe(true);
  });

  it("accepts NEXT_PUBLIC_SITE_URL", () => {
    vi.stubEnv("NEXT_PUBLIC_SITE_URL", "https://www.devgiz.co/");
    expect(assertSameOrigin(req({ origin: "https://www.devgiz.co" }))).toBe(true);
  });

  it("rejects foreign and opaque origins", () => {
    expect(assertSameOrigin(req({ origin: "https://evil.example" }))).toBe(false);
    expect(assertSameOrigin(req({ origin: "https://devgiz.vercel.app.evil.example" }))).toBe(false);
    expect(assertSameOrigin(req({ origin: "null" }))).toBe(false);
  });

  it("allows localhost only outside production", () => {
    vi.stubEnv("VERCEL_ENV", "development");
    expect(assertSameOrigin(req({ origin: "http://localhost:3000" }))).toBe(true);
    vi.stubEnv("VERCEL_ENV", "production");
    expect(assertSameOrigin(req({ origin: "http://localhost:3000" }))).toBe(false);
  });

  it("falls back to Sec-Fetch-Site when Origin is missing", () => {
    expect(assertSameOrigin(req({}))).toBe(true);
    expect(assertSameOrigin(req({ "sec-fetch-site": "same-origin" }))).toBe(true);
    expect(assertSameOrigin(req({ "sec-fetch-site": "none" }))).toBe(true);
    expect(assertSameOrigin(req({ "sec-fetch-site": "cross-site" }))).toBe(false);
    expect(assertSameOrigin(req({ "sec-fetch-site": "same-site" }))).toBe(false);
  });
});

describe("isJsonRequest", () => {
  const req = (type) => ({ headers: new Headers(type ? { "content-type": type } : {}) });

  it("accepts application/json with or without charset", () => {
    expect(isJsonRequest(req("application/json"))).toBe(true);
    expect(isJsonRequest(req("Application/JSON; charset=utf-8"))).toBe(true);
  });

  it("rejects simple CORS content types and missing headers", () => {
    expect(isJsonRequest(req("text/plain"))).toBe(false);
    expect(isJsonRequest(req("application/x-www-form-urlencoded"))).toBe(false);
    expect(isJsonRequest(req(undefined))).toBe(false);
  });
});

describe("matchesFileSignature", () => {
  const bytes = (str) => new TextEncoder().encode(str);

  it("validates ZIP-based formats by the PK header", () => {
    expect(matchesFileSignature("zip", new Uint8Array([0x50, 0x4b, 0x03, 0x04]))).toBe(true);
    expect(matchesFileSignature("xlsx", new Uint8Array([0x50, 0x4b, 0x03, 0x04]))).toBe(true);
    expect(matchesFileSignature("zip", bytes("MZ\x90"))).toBe(false);
  });

  it("validates GeoPackage as SQLite", () => {
    expect(matchesFileSignature("gpkg", bytes("SQLite format 3\u0000rest"))).toBe(true);
    expect(matchesFileSignature("gpkg", bytes("SQLite"))).toBe(false);
  });

  it("validates JSON/GeoJSON by the first non-space byte (BOM aware)", () => {
    expect(matchesFileSignature("geojson", bytes('  \n{"type":"FeatureCollection"}'))).toBe(true);
    expect(matchesFileSignature("json", bytes("\uFEFF[1,2]"))).toBe(true);
    expect(matchesFileSignature("json", bytes("<html>"))).toBe(false);
    expect(matchesFileSignature("json", bytes("   "))).toBe(false);
  });

  it("validates KML as XML", () => {
    expect(matchesFileSignature("kml", bytes('<?xml version="1.0"?><kml/>'))).toBe(true);
    expect(matchesFileSignature("kml", bytes("PK"))).toBe(false);
  });

  it("rejects CSV with NUL bytes", () => {
    expect(matchesFileSignature("csv", bytes("a,b\n1,2"))).toBe(true);
    expect(matchesFileSignature("csv", new Uint8Array([0x61, 0x00, 0x62]))).toBe(false);
  });

  it("rejects empty input and unknown extensions", () => {
    expect(matchesFileSignature("csv", new Uint8Array())).toBe(false);
    expect(matchesFileSignature("exe", bytes("MZ"))).toBe(false);
  });
});
