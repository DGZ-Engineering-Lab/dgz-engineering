"use client";
import { useEffect, useId, useRef, useState } from "react";
import Link from "next/link";
import { LEGAL_PATHS, RESPONSABLE } from "../lib/legal";
import {
  OPEN_SETTINGS_EVENT,
  createConsent,
  notifyConsentChanged,
  readConsent,
  writeConsent,
} from "../lib/cookie-consent";

// Banner de cookies propio (sin CMP de terceros). Primera capa con "Aceptar" y "Rechazar"
// de igual peso + "Configurar"; nada viene marcado. Diálogo no modal: no bloquea la página
// ni se cierra aceptando con Escape. Se reabre desde el footer con el evento
// "dgz:open-cookie-settings" y notifica cada decisión con "dgz:consent-changed".

const DECISION_BTN = "btn btn-primary btn-sm w-full";
const TEXT_BTN =
  "inline-flex min-h-10 items-center justify-center rounded-md px-2 text-xs font-semibold text-slate-700 underline underline-offset-4 hover:text-cyan-700 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-cyan-500";

// Altura visible de la barra CTA móvil (MobileCtaBar) para no taparla.
function mobileCtaHeight() {
  const bar = document.querySelector("[data-mobile-cta]");
  if (!bar || bar.getAttribute("aria-hidden") === "true") return 0;
  return bar.getBoundingClientRect().height;
}

export default function CookieConsent() {
  const [open, setOpen] = useState(false);
  const [view, setView] = useState("summary"); // "summary" | "settings"
  const [analytics, setAnalytics] = useState(false);
  const [hasDecision, setHasDecision] = useState(false);
  const [ctaOffset, setCtaOffset] = useState(0);
  const primaryRef = useRef(null);
  const returnFocusRef = useRef(null);
  const titleId = useId();
  const descId = useId();

  // Sin decisión válida guardada se muestra el banner; el footer puede reabrirlo.
  useEffect(() => {
    const saved = readConsent();
    if (saved) {
      setHasDecision(true);
      setAnalytics(saved.analytics);
    } else {
      setOpen(true);
    }

    const onOpen = () => {
      const current = readConsent();
      setHasDecision(Boolean(current));
      setAnalytics(current ? current.analytics : false);
      returnFocusRef.current = document.activeElement;
      setView("settings");
      setOpen(true);
    };
    window.addEventListener(OPEN_SETTINGS_EVENT, onOpen);
    return () => window.removeEventListener(OPEN_SETTINGS_EVENT, onOpen);
  }, []);

  // Foco al botón principal de la capa visible (sin desplazar la página).
  useEffect(() => {
    if (open) primaryRef.current?.focus({ preventScroll: true });
  }, [open, view]);

  // Se ubica por encima de la barra CTA móvil cuando esta es visible.
  useEffect(() => {
    if (!open) return;
    const measure = () => setCtaOffset(mobileCtaHeight());
    measure();
    const observer = new MutationObserver(measure);
    observer.observe(document.body, {
      subtree: true,
      childList: true,
      attributes: true,
      attributeFilter: ["aria-hidden"],
    });
    window.addEventListener("resize", measure);
    return () => {
      observer.disconnect();
      window.removeEventListener("resize", measure);
    };
  }, [open]);

  const close = () => {
    setOpen(false);
    setView("summary");
    const target = returnFocusRef.current;
    returnFocusRef.current = null;
    if (target && target instanceof HTMLElement && document.contains(target)) target.focus();
  };

  const decide = (value) => {
    const consent = createConsent({ analytics: value });
    writeConsent(consent);
    notifyConsentChanged(consent);
    setAnalytics(consent.analytics);
    setHasDecision(true);
    close();
  };

  // Escape nunca acepta: vuelve a la primera capa o cierra si ya había una decisión.
  const onKeyDown = (e) => {
    if (e.key !== "Escape") return;
    e.stopPropagation();
    if (hasDecision) close();
    else if (view === "settings") setView("summary");
  };

  if (!open) return null;

  const bottom =
    ctaOffset > 0 ? `${Math.ceil(ctaOffset) + 12}px` : "max(1rem, env(safe-area-inset-bottom))";

  return (
    <div
      role="dialog"
      aria-modal="false"
      aria-labelledby={titleId}
      aria-describedby={descId}
      onKeyDown={onKeyDown}
      style={{ bottom }}
      className="fixed inset-x-4 z-50 max-h-[calc(100dvh-6rem)] overflow-y-auto rounded-[var(--radius-lg,1rem)] border border-slate-200 bg-white/95 p-5 text-slate-700 shadow-[0_20px_50px_-20px_rgba(15,23,42,0.45)] backdrop-blur-lg transition-[bottom] duration-300 print:hidden sm:left-6 sm:right-auto sm:w-[26rem]"
    >
      {view === "summary" ? (
        <>
          <h2 id={titleId} className="text-sm font-black tracking-tight text-[#0b1220]">
            Cookies en este sitio
          </h2>
          <p id={descId} className="mt-2 text-xs leading-relaxed">
            Usamos almacenamiento necesario para que el sitio funcione y, solo si usted lo acepta,
            cookies de analítica (PostHog) para entender cómo se usa. Puede cambiar su decisión en
            cualquier momento desde «Configurar cookies» en el pie de página.{" "}
            <Link
              href={LEGAL_PATHS.cookies}
              className="font-semibold text-cyan-700 underline underline-offset-2 hover:text-cyan-900"
            >
              Política de cookies
            </Link>
          </p>
          <div className="mt-4 grid grid-cols-2 gap-2.5">
            <button
              ref={primaryRef}
              type="button"
              className={DECISION_BTN}
              onClick={() => decide(true)}
            >
              Aceptar
            </button>
            <button type="button" className={DECISION_BTN} onClick={() => decide(false)}>
              Rechazar
            </button>
          </div>
          <div className="mt-2 flex justify-center">
            <button type="button" className={TEXT_BTN} onClick={() => setView("settings")}>
              Configurar
            </button>
          </div>
        </>
      ) : (
        <>
          <h2 id={titleId} className="text-sm font-black tracking-tight text-[#0b1220]">
            Configurar cookies
          </h2>
          <p id={descId} className="mt-2 text-xs leading-relaxed">
            Elija qué categorías permite. La analítica está desactivada salvo que usted la active.
          </p>

          <ul className="mt-4 space-y-3">
            <li className="rounded-lg border border-slate-200 bg-slate-50/80 p-3">
              <div className="flex items-center justify-between gap-3">
                <span className="text-xs font-bold text-[#0b1220]">Necesarias</span>
                <span className="rounded-full bg-slate-200 px-2 py-0.5 text-[0.65rem] font-semibold text-slate-700">
                  Siempre activas
                </span>
              </div>
              <p className="mt-1.5 text-[0.72rem] leading-relaxed">
                Guardan su decisión sobre cookies, la sesión del panel de administración y sus
                preferencias de mapa e idioma. Sin ellas el sitio no funciona correctamente.
              </p>
            </li>
            <li className="rounded-lg border border-slate-200 p-3">
              <div className="flex items-center justify-between gap-3">
                <label
                  htmlFor={`${titleId}-analytics`}
                  className="text-xs font-bold text-[#0b1220]"
                >
                  Analítica
                </label>
                <input
                  id={`${titleId}-analytics`}
                  type="checkbox"
                  role="switch"
                  checked={analytics}
                  aria-checked={analytics}
                  onChange={(e) => setAnalytics(e.target.checked)}
                  aria-describedby={`${titleId}-analytics-desc`}
                  className="h-5 w-5 cursor-pointer accent-cyan-700"
                />
              </div>
              <p id={`${titleId}-analytics-desc`} className="mt-1.5 text-[0.72rem] leading-relaxed">
                PostHog (PostHog Inc., Estados Unidos) mide de forma agregada las páginas visitadas
                y las interacciones, con los textos enmascarados y sin grabación de sesiones.
              </p>
            </li>
          </ul>

          <div className="mt-4 grid grid-cols-2 gap-2.5">
            <button
              ref={primaryRef}
              type="button"
              className={DECISION_BTN}
              onClick={() => decide(analytics)}
            >
              Guardar
            </button>
            <button type="button" className={DECISION_BTN} onClick={() => decide(false)}>
              Rechazar
            </button>
          </div>
          <div className="mt-2 flex flex-wrap items-center justify-between gap-2">
            <button
              type="button"
              className={TEXT_BTN}
              onClick={() => (hasDecision ? close() : setView("summary"))}
            >
              {hasDecision ? "Cerrar sin cambios" : "Volver"}
            </button>
            <Link href={LEGAL_PATHS.cookies} className={TEXT_BTN}>
              Política de cookies
            </Link>
          </div>
          <p className="mt-2 text-[0.65rem] leading-relaxed text-slate-500">
            Responsable: {RESPONSABLE.nombre} ({RESPONSABLE.marca}) · {RESPONSABLE.email}
          </p>
        </>
      )}
    </div>
  );
}
