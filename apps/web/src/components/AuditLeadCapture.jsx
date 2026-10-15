"use client";

import { useState } from "react";
import { ArrowRight, Check, CheckCircle2, Clock, Lock, RefreshCw } from "lucide-react";
import { AUDIT_OFFER, buildAuditLeadMessage } from "../data/auditOffer";

/**
 * Email capture + paid audit offer shown at the end of the /diagnostic flows.
 * Sends the lead through /api/contact (Resend key lives only in server env vars).
 */
export default function AuditLeadCapture({ source = "calculator", estimate = {}, defaults = {} }) {
  const [form, setForm] = useState({
    name: defaults.name || "",
    email: defaults.email || "",
    municipio: defaults.municipio || "",
    consent: false,
  });
  const [status, setStatus] = useState("idle"); // idle | sending | success | error
  const [errorMessage, setErrorMessage] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (status === "sending") return;
    setStatus("sending");
    setErrorMessage("");

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: form.name,
          email: form.email,
          company: form.municipio,
          message: buildAuditLeadMessage({
            source,
            municipio: form.municipio,
            cargo: defaults.cargo,
            ...estimate,
          }),
        }),
      });
      const result = await response.json().catch(() => ({}));
      if (!response.ok) {
        throw new Error(
          response.status === 429
            ? "Demasiados envíos seguidos. Intente de nuevo en un minuto."
            : result.error === "Invalid email address"
              ? "Revise el correo electrónico."
              : "No pudimos enviar su solicitud. Intente de nuevo."
        );
      }
      setStatus("success");
      if (typeof window !== "undefined" && window.posthog) {
        window.posthog.capture("diagnostic_audit_requested", { source, municipio: form.municipio });
      }
    } catch (err) {
      setErrorMessage(err.message || "Fallo de red al enviar la solicitud.");
      setStatus("error");
    }
  };

  if (status === "success") {
    return (
      <div role="status" className="p-6 md:p-8 bg-white border border-slate-200 shadow-xl rounded-[2rem] space-y-4 text-center">
        <div className="w-14 h-14 mx-auto rounded-full bg-emerald-50 border border-emerald-200 flex items-center justify-center text-emerald-600">
          <CheckCircle2 className="w-7 h-7" />
        </div>
        <h3 className="text-xl font-black text-slate-900 uppercase tracking-wider">Solicitud recibida</h3>
        <p className="text-sm text-slate-600 leading-relaxed max-w-md mx-auto">
          Le escribiremos a <span className="text-cyan-700 font-semibold">{form.email}</span> en menos de 24 horas hábiles con la propuesta de la {AUDIT_OFFER.name}, los datos que necesitamos y el enlace de pago.
        </p>
      </div>
    );
  }

  const inputClass =
    "w-full px-4 py-3 bg-slate-50 border border-slate-300 focus:border-cyan-600 rounded-xl text-slate-900 placeholder:text-slate-400 text-sm focus:outline-none transition-colors";
  const labelClass = "text-[10px] font-mono text-slate-600 uppercase tracking-widest block font-bold";

  return (
    <div id="auditoria-express" className="p-6 md:p-8 bg-white border border-slate-200 shadow-xl rounded-[2rem] space-y-6 relative overflow-hidden">
      <div className="absolute top-0 right-0 w-32 h-32 bg-cyan-500/10 rounded-full blur-3xl pointer-events-none"></div>

      <div className="space-y-2">
        <span className="text-[9px] font-mono text-cyan-700 uppercase tracking-[0.3em] font-bold block">
          Valide esta cifra con sus datos reales
        </span>
        <h3 className="text-xl md:text-2xl font-black text-slate-900 uppercase tracking-wider">{AUDIT_OFFER.name}</h3>
        <div className="flex flex-wrap items-baseline gap-x-4 gap-y-1">
          <span className="text-3xl font-black text-slate-900 tracking-tight">{AUDIT_OFFER.price}</span>
          <span className="text-[10px] font-mono text-cyan-700 uppercase tracking-widest flex items-center gap-1.5">
            <Clock className="w-3.5 h-3.5" />
            {AUDIT_OFFER.delivery}
          </span>
        </div>
        <p className="text-[11px] text-slate-500">{AUDIT_OFFER.priceNote}</p>
      </div>

      <ul className="space-y-2 text-sm text-slate-700">
        {AUDIT_OFFER.deliverables.map((item) => (
          <li key={item} className="flex items-start gap-2">
            <Check className="w-3.5 h-3.5 text-cyan-600 flex-shrink-0 mt-0.5" />
            <span>{item}</span>
          </li>
        ))}
      </ul>

      <form onSubmit={handleSubmit} className="space-y-4 pt-4 border-t border-slate-200">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div className="space-y-2">
            <label htmlFor={`lead-${source}-name`} className={labelClass}>Nombre *</label>
            <input
              id={`lead-${source}-name`}
              type="text"
              required
              maxLength={120}
              autoComplete="name"
              placeholder="Ej. Ing. Carlos Restrepo"
              value={form.name}
              onChange={(e) => setForm({ ...form, name: e.target.value })}
              className={inputClass}
            />
          </div>
          <div className="space-y-2">
            <label htmlFor={`lead-${source}-email`} className={labelClass}>Correo electrónico *</label>
            <input
              id={`lead-${source}-email`}
              type="email"
              required
              maxLength={254}
              autoComplete="email"
              placeholder="Ej. catastro@municipio.gov.co"
              value={form.email}
              onChange={(e) => setForm({ ...form, email: e.target.value })}
              className={inputClass}
            />
          </div>
          <div className="space-y-2 sm:col-span-2">
            <label htmlFor={`lead-${source}-municipio`} className={labelClass}>Municipio / organización</label>
            <input
              id={`lead-${source}-municipio`}
              type="text"
              maxLength={160}
              autoComplete="organization"
              placeholder="Ej. Cartago (Valle del Cauca)"
              value={form.municipio}
              onChange={(e) => setForm({ ...form, municipio: e.target.value })}
              className={inputClass}
            />
          </div>
        </div>

        <label className="flex items-start gap-3 text-[11px] text-slate-600 leading-relaxed cursor-pointer">
          <input
            type="checkbox"
            required
            checked={form.consent}
            onChange={(e) => setForm({ ...form, consent: e.target.checked })}
            className="mt-0.5 accent-cyan-600"
          />
          <span>
            Autorizo a DevGiz a usar estos datos para enviarme la propuesta y contactarme sobre la auditoría (Ley 1581 de 2012, Habeas Data).
          </span>
        </label>

        {status === "error" && (
          <p role="alert" className="text-xs text-rose-600">{errorMessage}</p>
        )}

        <button
          type="submit"
          disabled={status === "sending"}
          className="w-full py-4 bg-slate-900 text-white hover:bg-cyan-600 disabled:opacity-60 disabled:cursor-wait transition-all text-[10px] font-black uppercase tracking-[0.2em] rounded-2xl flex items-center justify-center gap-3 shadow-[0_4px_20px_rgba(255,255,255,0.05)] hover:shadow-[0_0_20px_rgba(6,182,212,0.3)] cursor-pointer active:scale-95 focus-visible:ring-2 focus-visible:ring-cyan-400 focus:outline-none"
        >
          {status === "sending" ? (
            <>
              <RefreshCw className="w-4 h-4 animate-spin" />
              <span>Enviando…</span>
            </>
          ) : (
            <>
              <span>Quiero la auditoría</span>
              <ArrowRight className="w-4 h-4" />
            </>
          )}
        </button>

        <p className="text-[9px] font-mono text-slate-500 uppercase tracking-widest flex items-center justify-center gap-2 text-center">
          <Lock className="w-3 h-3 text-cyan-600 flex-shrink-0" />
          Sin compromiso: primero recibe la propuesta, luego decide
        </p>
      </form>
    </div>
  );
}
