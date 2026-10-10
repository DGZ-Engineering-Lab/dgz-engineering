/**
 * Shared input-hardening helpers for API routes and email templates.
 */

const HTML_ESCAPES = {
  "&": "&amp;",
  "<": "&lt;",
  ">": "&gt;",
  '"': "&quot;",
  "'": "&#39;",
};

// Escape untrusted text before interpolating it into HTML (e.g. email bodies).
export function escapeHtml(value) {
  return String(value ?? "").replace(/[&<>"']/g, (ch) => HTML_ESCAPES[ch]);
}

// Strip CR/LF so values are safe in single-line contexts such as email subjects.
export function singleLine(value) {
  return String(value ?? "").replace(/[\r\n]+/g, " ").trim();
}

const EMAIL_RE = /^[^\s@<>()[\]\\,;:"]+@[^\s@<>()[\]\\,;:"]+\.[^\s@<>()[\]\\,;:"]{2,}$/;

export function isValidEmail(value) {
  return typeof value === "string" && value.length <= 254 && EMAIL_RE.test(value);
}

// Returns a trimmed string if `value` is a string within `max` chars, otherwise null.
export function boundedString(value, max, { required = true } = {}) {
  if (value === undefined || value === null || value === "") {
    return required ? null : "";
  }
  if (typeof value !== "string") return null;
  const trimmed = value.trim();
  if (required && trimmed.length === 0) return null;
  if (trimmed.length > max) return null;
  return trimmed;
}

// Best-effort client IP for rate limiting. Vercel sets x-forwarded-for / x-real-ip.
export function getClientIp(req) {
  const xff = req.headers.get("x-forwarded-for");
  if (xff) return xff.split(",")[0].trim();
  return req.headers.get("x-real-ip") || req.headers.get("cf-connecting-ip") || "unknown";
}
