import { describe, expect, it } from "vitest";
import { boundedString, escapeHtml, getClientIp, isValidEmail, singleLine } from "../security";

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
});
