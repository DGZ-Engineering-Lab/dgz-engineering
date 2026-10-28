"use client";

import { useEffect } from "react";
import {
  CONSENT_CHANGED_EVENT,
  CONSENT_STORAGE_KEY,
  hasAnalyticsConsent,
  readConsent,
} from "../lib/cookie-consent";

// posthog-js (~50 KB gzip) solo se descarga e inicializa si hay clave configurada y el
// usuario aceptó la analítica en el banner de cookies. Sin consentimiento no se carga el
// script ni se crea ninguna cookie de PostHog. Los componentes lo leen vía `window.posthog`.
//
// IP: posthog-js no expone una opción cliente vigente para no enviar la IP; activar
// "Discard client IP data" en la configuración del proyecto de PostHog.

// Las cookies y claves de PostHog empiezan por "ph_" (p. ej. ph_<token>_posthog).
function clearPostHogStorage() {
  for (const store of ["localStorage", "sessionStorage"]) {
    try {
      const s = window[store];
      for (const key of Object.keys(s)) if (key.startsWith("ph_")) s.removeItem(key);
    } catch {
      // almacenamiento bloqueado: nada que borrar
    }
  }
  try {
    const parts = window.location.hostname.split(".");
    // La cookie puede estar en el host o en un dominio padre (cross_subdomain_cookie).
    const domains = [""];
    for (let i = 0; i < parts.length - 1; i++)
      domains.push(`; domain=.${parts.slice(i).join(".")}`);
    for (const cookie of document.cookie.split(";")) {
      const name = cookie.split("=")[0].trim();
      if (!name.startsWith("ph_")) continue;
      for (const d of domains) {
        document.cookie = `${name}=; expires=Thu, 01 Jan 1970 00:00:00 GMT; path=/${d}`;
      }
    }
  } catch {
    // sin acceso a cookies
  }
}

export function PostHogProvider({ children }) {
  useEffect(() => {
    const key = process.env.NEXT_PUBLIC_POSTHOG_KEY;
    if (!key) return;

    let instance = null;
    let loading = false;
    let disposed = false;
    let cancelIdle = null;

    const enable = () => {
      if (instance) {
        // Revocó y volvió a aceptar en la misma sesión
        if (instance.has_opted_out_capturing()) instance.opt_in_capturing();
        window.posthog = instance;
        return;
      }
      if (loading) return;
      loading = true;
      import("posthog-js")
        .then(({ default: posthog }) => {
          loading = false;
          // La decisión pudo cambiar mientras se descargaba el script
          if (disposed || !hasAnalyticsConsent(readConsent())) return;
          posthog.init(key, {
            api_host: process.env.NEXT_PUBLIC_POSTHOG_HOST || "https://us.i.posthog.com",
            // Cookies/localStorage solo existen porque ya hay consentimiento
            persistence: "localStorage+cookie",
            person_profiles: "identified_only",
            capture_pageview: true,
            capture_pageleave: true,
            autocapture: true,
            // No capturar textos ni atributos de los elementos (pueden contener datos personales)
            mask_all_text: true,
            mask_all_element_attributes: true,
            // Sin grabación de sesiones ni encuestas
            disable_session_recording: true,
            enable_recording_console_log: false,
            disable_surveys: true,
            respect_dnt: true,
          });
          if (posthog.has_opted_out_capturing()) posthog.opt_in_capturing();
          instance = posthog;
          window.posthog = posthog;
        })
        .catch(() => {
          loading = false;
        });
    };

    const disable = () => {
      if (cancelIdle) {
        cancelIdle();
        cancelIdle = null;
      }
      if (instance) {
        instance.opt_out_capturing();
        instance.reset();
      }
      delete window.posthog;
      // Borra identificadores previos (también los de sesiones anteriores)
      clearPostHogStorage();
    };

    const apply = (consent) => (hasAnalyticsConsent(consent) ? enable() : disable());

    // Carga inicial diferida: solo si ya había consentimiento guardado
    if (hasAnalyticsConsent(readConsent())) {
      if ("requestIdleCallback" in window) {
        const id = window.requestIdleCallback(enable, { timeout: 4000 });
        cancelIdle = () => window.cancelIdleCallback(id);
      } else {
        const id = setTimeout(enable, 2000);
        cancelIdle = () => clearTimeout(id);
      }
    } else {
      // Sin consentimiento: elimina cookies que versiones anteriores del sitio hayan dejado
      clearPostHogStorage();
    }

    const onConsentChanged = (event) => apply(event.detail ?? readConsent());
    // Cambios hechos en otra pestaña
    const onStorage = (event) => {
      if (event.key === CONSENT_STORAGE_KEY) apply(readConsent());
    };

    window.addEventListener(CONSENT_CHANGED_EVENT, onConsentChanged);
    window.addEventListener("storage", onStorage);
    return () => {
      disposed = true;
      if (cancelIdle) cancelIdle();
      window.removeEventListener(CONSENT_CHANGED_EVENT, onConsentChanged);
      window.removeEventListener("storage", onStorage);
    };
  }, []);

  return children;
}
