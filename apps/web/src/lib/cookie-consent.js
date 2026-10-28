// Consentimiento de cookies: lógica pura (sin React) para leer, validar y guardar la decisión
// del usuario. La decisión se guarda en localStorage como JSON versionado; cualquier valor
// corrupto, de otra versión del esquema o de otra versión de la política se trata como
// "sin decisión" y el banner vuelve a preguntar (nada se activa por defecto).

import { POLICY_VERSION } from "./legal";

export const CONSENT_STORAGE_KEY = "dgz_cookie_consent";
export const CONSENT_SCHEMA_VERSION = 1;

// Eventos de window: abrir la configuración (footer) y avisar de un cambio (PostHogProvider).
export const OPEN_SETTINGS_EVENT = "dgz:open-cookie-settings";
export const CONSENT_CHANGED_EVENT = "dgz:consent-changed";

/**
 * Crea un registro de consentimiento nuevo.
 * @param {{ analytics: boolean, now?: Date, policyVersion?: string }} input
 */
export function createConsent({ analytics, now = new Date(), policyVersion = POLICY_VERSION }) {
  return {
    v: CONSENT_SCHEMA_VERSION,
    analytics: analytics === true,
    decidedAt: now.toISOString(),
    policyVersion,
  };
}

/** Serializa un consentimiento válido; devuelve null si no lo es. */
export function serializeConsent(consent) {
  const valid = normalizeConsent(consent, { policyVersion: null });
  return valid ? JSON.stringify(valid) : null;
}

/**
 * Interpreta el valor guardado. Devuelve el consentimiento o null si falta, está corrupto,
 * es de otro esquema o (por defecto) de otra versión de la política.
 * @param {unknown} raw
 * @param {{ policyVersion?: string | null }} [options] null = aceptar cualquier versión de política
 */
export function parseConsent(raw, { policyVersion = POLICY_VERSION } = {}) {
  if (typeof raw !== "string" || raw.length === 0 || raw.length > 2048) return null;
  let data;
  try {
    data = JSON.parse(raw);
  } catch {
    return null;
  }
  return normalizeConsent(data, { policyVersion });
}

function normalizeConsent(data, { policyVersion }) {
  if (!data || typeof data !== "object" || Array.isArray(data)) return null;
  if (data.v !== CONSENT_SCHEMA_VERSION) return null;
  if (typeof data.analytics !== "boolean") return null;
  if (typeof data.decidedAt !== "string" || Number.isNaN(Date.parse(data.decidedAt))) return null;
  if (typeof data.policyVersion !== "string" || data.policyVersion.length === 0) return null;
  if (policyVersion != null && data.policyVersion !== policyVersion) return null;
  // Solo se conservan los campos conocidos.
  return {
    v: CONSENT_SCHEMA_VERSION,
    analytics: data.analytics,
    decidedAt: data.decidedAt,
    policyVersion: data.policyVersion,
  };
}

/** true solo si hay una decisión válida que acepta la analítica. */
export function hasAnalyticsConsent(consent) {
  return Boolean(consent) && consent.analytics === true;
}

function defaultStorage() {
  try {
    return typeof window !== "undefined" ? window.localStorage : null;
  } catch {
    // Acceso bloqueado (modo privado estricto, cookies de terceros deshabilitadas, etc.)
    return null;
  }
}

/** Lee la decisión guardada; null si no hay o no se puede leer. */
export function readConsent(storage = defaultStorage()) {
  if (!storage) return null;
  try {
    return parseConsent(storage.getItem(CONSENT_STORAGE_KEY));
  } catch {
    return null;
  }
}

/** Guarda la decisión; devuelve false si el almacenamiento no está disponible. */
export function writeConsent(consent, storage = defaultStorage()) {
  const raw = serializeConsent(consent);
  if (!raw || !storage) return false;
  try {
    storage.setItem(CONSENT_STORAGE_KEY, raw);
    return true;
  } catch {
    return false;
  }
}

/** Avisa al resto de la app (p. ej. PostHogProvider) de la nueva decisión. */
export function notifyConsentChanged(consent) {
  if (typeof window === "undefined") return;
  window.dispatchEvent(new CustomEvent(CONSENT_CHANGED_EVENT, { detail: consent }));
}

/** Reabre el panel de configuración (botón "Configurar cookies" del footer). */
export function openCookieSettings() {
  if (typeof window === "undefined") return;
  window.dispatchEvent(new CustomEvent(OPEN_SETTINGS_EVENT));
}
