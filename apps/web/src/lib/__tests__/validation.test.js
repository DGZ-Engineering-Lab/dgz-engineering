import { describe, expect, it } from "vitest";
import { CONTACT_LIMITS, isValidEmail, validateContact } from "../validation";

const valid = {
  name: "Ana Restrepo",
  email: "Ana@Example.co",
  message: "Necesitamos una cotización LADM-COL.",
  company: "IGAC",
};

describe("isValidEmail", () => {
  it.each(["a@b.co", "first.last+tag@sub.domain.gov.co"])("accepts %s", (email) => {
    expect(isValidEmail(email)).toBe(true);
  });

  it.each(["", "plain", "a@b", "a b@c.co", "a@@b.co", null, 42])("rejects %s", (email) => {
    expect(isValidEmail(email)).toBe(false);
  });
});

describe("validateContact", () => {
  it("accepts a complete submission and normalises it", () => {
    const result = validateContact({ ...valid, name: "  Ana Restrepo  " });
    expect(result).toEqual({
      ok: true,
      data: { ...valid, email: "ana@example.co" },
    });
  });

  it("defaults the company to N/A", () => {
    const result = validateContact({ ...valid, company: "   " });
    expect(result.ok).toBe(true);
    expect(result.data.company).toBe("N/A");
  });

  it("reports every missing required field", () => {
    expect(validateContact({})).toEqual({
      ok: false,
      errors: { name: "required", email: "required", message: "required" },
    });
  });

  it("tolerates non-object bodies", () => {
    for (const body of [null, undefined, "x", 3, []]) {
      expect(validateContact(body).ok).toBe(false);
    }
  });

  it("ignores non-string field values", () => {
    const result = validateContact({ ...valid, name: { $ne: "" } });
    expect(result).toEqual({ ok: false, errors: { name: "required" } });
  });

  it("rejects malformed emails", () => {
    expect(validateContact({ ...valid, email: "not-an-email" }).errors).toEqual({
      email: "invalid",
    });
  });

  it("enforces length limits", () => {
    const result = validateContact({ ...valid, message: "x".repeat(CONTACT_LIMITS.message + 1) });
    expect(result.errors).toEqual({ message: "too_long" });
  });

  it("collapses line breaks in single-line fields to block header injection", () => {
    const result = validateContact({ ...valid, name: "Ana\r\nBcc: victim@example.com" });
    expect(result.ok).toBe(true);
    expect(result.data.name).toBe("Ana Bcc: victim@example.com");
    expect(result.data.name).not.toMatch(/[\r\n]/);
  });

  it("keeps line breaks in the message body", () => {
    const result = validateContact({ ...valid, message: "Línea 1\nLínea 2" });
    expect(result.data.message).toBe("Línea 1\nLínea 2");
  });
});
