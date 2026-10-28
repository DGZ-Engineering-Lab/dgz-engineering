import { describe, expect, it } from "vitest";
import { ContactValidationError, parseContactBody } from "../contact-validation";

const valid = {
  name: "Titular de Ejemplo",
  email: "titular@example.com",
  message: "Necesito una cotización",
  company: "Entidad de ejemplo",
  privacyConsent: true,
};

const codeOf = (body) => {
  try {
    parseContactBody(body);
    return null;
  } catch (err) {
    expect(err).toBeInstanceOf(ContactValidationError);
    return err.code;
  }
};

describe("parseContactBody", () => {
  it("returns trimmed fields when the body is valid", () => {
    expect(parseContactBody({ ...valid, name: "  Titular de Ejemplo  " })).toEqual({
      name: "Titular de Ejemplo",
      email: "titular@example.com",
      message: "Necesito una cotización",
      company: "Entidad de ejemplo",
    });
  });

  it("requires explicit privacy consent (Ley 1581)", () => {
    expect(codeOf({ ...valid, privacyConsent: undefined })).toBe("consent_required");
    expect(codeOf({ ...valid, privacyConsent: "true" })).toBe("consent_required");
    expect(codeOf(null)).toBe("consent_required");
  });

  it("rejects missing or oversized fields", () => {
    expect(codeOf({ ...valid, name: "" })).toBe("Missing or invalid fields");
    expect(codeOf({ ...valid, message: "x".repeat(5001) })).toBe("Missing or invalid fields");
    expect(codeOf({ ...valid, company: 42 })).toBe("Missing or invalid fields");
  });

  it("rejects invalid emails with the code the frontend expects", () => {
    expect(codeOf({ ...valid, email: "no-es-un-correo" })).toBe("Invalid email address");
  });

  it("treats company as optional", () => {
    expect(parseContactBody({ ...valid, company: undefined }).company).toBe("");
  });
});
