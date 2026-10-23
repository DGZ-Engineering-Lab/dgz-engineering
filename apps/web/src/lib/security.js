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

// Mejor esfuerzo para la IP del cliente. En Vercel, x-real-ip y x-vercel-forwarded-for
// los fija la plataforma; el primer salto de x-forwarded-for queda como último recurso.
export function getClientIp(req) {
  const realIp = req.headers.get("x-real-ip");
  if (realIp && realIp.trim()) return realIp.trim();
  const vercelXff = req.headers.get("x-vercel-forwarded-for");
  if (vercelXff && vercelXff.trim()) return vercelXff.split(",")[0].trim();
  const xff = req.headers.get("x-forwarded-for");
  if (xff && xff.trim()) return xff.split(",")[0].trim();
  return req.headers.get("cf-connecting-ip") || "unknown";
}

// Oculta la parte local de un email para logs: "ana@x.co" → "a***@x.co".
export function maskEmail(value) {
  if (typeof value !== "string" || !value.includes("@")) return "***";
  const at = value.lastIndexOf("@");
  // Sin saltos de línea ni caracteres de control: evita falsificar entradas de log.
  return `${value.slice(0, 1)}***${value.slice(at)}`.replace(/[\r\n\t\u0000-\u001f\u007f]/g, "");
}

// ─── Protección CSRF básica para POST desde el navegador ──────────────────────

const DEFAULT_SITE_URL = "https://devgiz.vercel.app";

function isProductionEnv() {
  if (process.env.VERCEL_ENV) return process.env.VERCEL_ENV === "production";
  return process.env.NODE_ENV === "production";
}

function toOrigin(value) {
  if (!value) return null;
  try {
    return new URL(value).origin;
  } catch {
    return null;
  }
}

// Orígenes aceptados: sitio canónico, el propio host de la petición (Preview
// Deployments y dominios de Vercel) y localhost fuera de producción.
export function getAllowedOrigins(req) {
  const origins = new Set([DEFAULT_SITE_URL]);
  const add = (value) => {
    const origin = toOrigin(value);
    if (origin) origins.add(origin);
  };
  add(process.env.NEXT_PUBLIC_SITE_URL);
  if (process.env.VERCEL_URL) add(`https://${process.env.VERCEL_URL}`);
  if (process.env.VERCEL_BRANCH_URL) add(`https://${process.env.VERCEL_BRANCH_URL}`);
  add(req?.url);
  if (!isProductionEnv()) {
    add("http://localhost:3000");
    add("http://127.0.0.1:3000");
  }
  return origins;
}

/**
 * true si la petición viene del propio sitio. Con cabecera Origin se compara
 * contra la allowlist; sin ella se usa Sec-Fetch-Site (ausente, same-origin o none).
 * Las peticiones servidor-a-servidor sin estas cabeceras pasan: no es antibots.
 */
export function assertSameOrigin(req) {
  const origin = req.headers.get("origin");
  if (origin) {
    if (origin === "null") return false;
    const normalized = toOrigin(origin);
    return Boolean(normalized) && getAllowedOrigins(req).has(normalized);
  }
  const site = req.headers.get("sec-fetch-site");
  return site === null || site === "same-origin" || site === "none";
}

// true si el cuerpo se declara como JSON (fuerza preflight CORS en peticiones cruzadas).
export function isJsonRequest(req) {
  const type = (req.headers.get("content-type") || "").split(";")[0].trim().toLowerCase();
  return type === "application/json";
}

// ─── Validación de contenido por magic bytes ──────────────────────────────────

function firstNonSpaceByte(bytes) {
  let i = 0;
  // Saltar BOM UTF-8
  if (bytes[0] === 0xef && bytes[1] === 0xbb && bytes[2] === 0xbf) i = 3;
  for (; i < bytes.length; i++) {
    const b = bytes[i];
    if (b !== 0x20 && b !== 0x09 && b !== 0x0a && b !== 0x0d) return b;
  }
  return -1;
}

const SQLITE_MAGIC = "SQLite format 3";

/**
 * Comprueba que los primeros bytes (hasta 1024) corresponden a la extensión declarada.
 * @param {string} extension
 * @param {Uint8Array} bytes
 */
export function matchesFileSignature(extension, bytes) {
  if (!bytes || bytes.length === 0) return false;
  switch (extension) {
    case "zip":
    case "xlsx":
      return bytes[0] === 0x50 && bytes[1] === 0x4b; // "PK"
    case "gpkg":
      if (bytes.length < SQLITE_MAGIC.length) return false;
      for (let i = 0; i < SQLITE_MAGIC.length; i++) {
        if (bytes[i] !== SQLITE_MAGIC.charCodeAt(i)) return false;
      }
      return true;
    case "json":
    case "geojson": {
      const b = firstNonSpaceByte(bytes);
      return b === 0x7b || b === 0x5b; // "{" o "["
    }
    case "kml":
      return firstNonSpaceByte(bytes) === 0x3c; // "<"
    case "csv":
      return !bytes.subarray(0, 1024).includes(0x00);
    default:
      return false;
  }
}
