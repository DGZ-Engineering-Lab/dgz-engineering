// Validación del cuerpo de /api/contact. Lanza ContactValidationError con el código de error
// público (los mismos textos que ya interpreta el frontend) en vez de devolver flags.
import { hasPrivacyConsent } from "./consent.js";
import { boundedString, isValidEmail } from "./security.js";

export class ContactValidationError extends Error {
  constructor(code) {
    super(code);
    this.name = "ContactValidationError";
    this.code = code;
  }
}

/**
 * @param {any} body
 * @returns {{ name: string, email: string, message: string, company: string }}
 */
export function parseContactBody(body) {
  // Ley 1581 de 2012: sin autorización previa y expresa no se tratan los datos.
  if (!hasPrivacyConsent(body)) throw new ContactValidationError("consent_required");

  const name = boundedString(body?.name, 120);
  const email = boundedString(body?.email, 254);
  const message = boundedString(body?.message, 5000);
  const company = boundedString(body?.company, 160, { required: false });

  if (!name || !email || !message || company === null) {
    throw new ContactValidationError("Missing or invalid fields");
  }
  if (!isValidEmail(email)) throw new ContactValidationError("Invalid email address");

  return { name, email, message, company };
}
