"use client";

// Reabre el panel de preferencias del banner de cookies (CookieConsent escucha este evento).
export default function CookieSettingsButton({ className = "" }) {
  return (
    <button
      type="button"
      onClick={() => window.dispatchEvent(new Event("dgz:open-cookie-settings"))}
      className={`inline-flex min-h-11 items-center rounded-lg border border-slate-300 bg-white px-4 text-sm font-semibold text-[#0b1220] hover:border-slate-500 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-slate-900 ${className}`}
    >
      Configurar cookies
    </button>
  );
}
