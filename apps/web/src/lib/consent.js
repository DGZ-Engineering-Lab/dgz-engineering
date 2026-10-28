// Helpers puros de la prueba de autorización (Ley 1581 de 2012, art. 9; Decreto 1074, art. 2.2.2.25.2.4).
// Sin dependencias de Node: el hash se inyecta para poder probarlo y no arrastrar node:crypto al cliente.

import { FINALIDADES, POLICY_VERSION, authorizationText } from "./legal";

const MAX_VERSION_LENGTH = 20;
const MAX_SOURCE_LENGTH = 40;

// Identificador de formulario (consentSource) → finalidad declarada en la casilla.
// Coincidencia exacta primero; después por prefijo (audit-*, newsletter-*…).
const SOURCE_FINALIDAD = {
  contact: "contacto",
  "service-quote": "cotizacion",
  careers: "seleccion",
  "diagnostic-preaudit": "diagnostico",
};
const PREFIX_FINALIDAD = [
  ["audit-", "diagnostico"],
  ["diagnostic", "diagnostico"],
  ["newsletter", "boletin"],
  ["service-", "cotizacion"],
];

/** Normaliza el identificador del formulario: minúsculas, [a-z0-9_-], máx. 40 caracteres. */
export function sanitizeSource(value) {
  if (typeof value !== "string") return "unknown";
  const clean = value
    .trim()
    .toLowerCase()
    .replace(/[^a-z0-9_-]+/g, "-")
    .replace(/^-+|-+$/g, "")
    .slice(0, MAX_SOURCE_LENGTH);
  return clean || "unknown";
}

/** Versión de la política informada por el cliente; si no es válida, la vigente. */
export function sanitizePolicyVersion(value) {
  if (typeof value !== "string") return POLICY_VERSION;
  const trimmed = value.trim();
  if (!trimmed || trimmed.length > MAX_VERSION_LENGTH || !/^[\w.-]+$/.test(trimmed)) {
    return POLICY_VERSION;
  }
  return trimmed;
}

/** Finalidad (clave de FINALIDADES) que corresponde a un consentSource; por defecto, contacto. */
export function finalidadFromSource(source) {
  const clean = sanitizeSource(source);
  if (SOURCE_FINALIDAD[clean]) return SOURCE_FINALIDAD[clean];
  const match = PREFIX_FINALIDAD.find(([prefix]) => clean.startsWith(prefix));
  const finalidad = match ? match[1] : "contacto";
  return finalidad in FINALIDADES ? finalidad : "contacto";
}

/** true solo si el titular marcó la casilla (valor booleano estricto). */
export function hasPrivacyConsent(body) {
  return body?.privacyConsent === true;
}

/**
 * Registro de la autorización que se guarda junto al mensaje.
 * @param {any} body cuerpo JSON recibido
 * @param {{ hashText: (text: string) => string, now?: Date }} deps
 */
export function buildConsentRecord(body, { hashText, now = new Date() }) {
  const source = sanitizeSource(body?.consentSource);
  return {
    privacy: true,
    policyVersion: sanitizePolicyVersion(body?.policyVersion),
    source,
    acceptedAt: now.toISOString(),
    // Huella del texto exacto que vio el titular: prueba qué autorizó sin duplicar el texto.
    textHash: hashText(authorizationText(finalidadFromSource(source))),
    newsletter: body?.consent === true,
  };
}
