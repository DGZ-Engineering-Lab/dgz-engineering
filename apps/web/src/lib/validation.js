export const CONTACT_LIMITS = {
  name: 120,
  email: 254,
  company: 160,
  message: 5000,
};

// Pragmatic check: one "@", no whitespace, a dot in the domain part.
const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export function isValidEmail(value) {
  return typeof value === "string" && value.length <= CONTACT_LIMITS.email && EMAIL_RE.test(value);
}

/**
 * Validates and normalizes a contact form submission.
 * Returns `{ ok: true, data }` or `{ ok: false, errors }` where `errors`
 * maps field names to a short machine-readable reason.
 */
export function validateContact(input) {
  const body = input && typeof input === "object" ? input : {};
  const str = (v) => (typeof v === "string" ? v.trim() : "");
  // Single-line fields end up in email subjects/headers: collapse any
  // whitespace (including CR/LF) so they cannot inject extra header lines.
  const line = (v) => str(v).replace(/\s+/g, " ");

  const data = {
    name: line(body.name),
    email: str(body.email).toLowerCase(),
    company: line(body.company),
    message: str(body.message),
  };

  const errors = {};
  for (const field of ["name", "email", "message"]) {
    if (!data[field]) errors[field] = "required";
  }
  for (const [field, max] of Object.entries(CONTACT_LIMITS)) {
    if (data[field].length > max) errors[field] = "too_long";
  }
  if (data.email && !errors.email && !isValidEmail(data.email)) {
    errors.email = "invalid";
  }

  if (Object.keys(errors).length > 0) return { ok: false, errors };
  return { ok: true, data: { ...data, company: data.company || "N/A" } };
}
