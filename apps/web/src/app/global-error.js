"use client";

import * as Sentry from "@sentry/nextjs";
import Link from "next/link";
import { useEffect } from "react";

export default function GlobalError({ error, reset }) {
  useEffect(() => {
    Sentry.captureException(error);
  }, [error]);

  return (
    <html lang="es">
      <body className="min-h-screen bg-slate-950 text-slate-100 flex flex-col items-center justify-center p-6 text-center antialiased">
        <div className="max-w-md w-full bg-[#0a0f18] border border-cyan-500/20 rounded-2xl p-8 shadow-2xl shadow-cyan-950/40">
          <div className="w-12 h-12 rounded-xl bg-cyan-500/10 border border-cyan-500/30 text-cyan-400 flex items-center justify-center mx-auto mb-5 font-mono text-xl font-bold">
            !
          </div>
          <h2 className="text-xl font-bold font-mono tracking-tight text-white mb-2">
            Interrupción Crítica del Sistema
          </h2>
          <p className="text-xs text-slate-400 font-light leading-relaxed mb-6">
            Se ha interceptado una anomalía no controlada en tiempo de ejecución. La telemetría ha sido registrada para auditoría técnica.
          </p>
          <div className="flex gap-3 justify-center">
            <button
              onClick={() => reset()}
              className="px-6 py-2.5 bg-cyan-500 text-slate-950 font-mono text-xs font-bold uppercase tracking-widest rounded-lg hover:bg-cyan-400 transition-colors shadow-lg shadow-cyan-500/20"
            >
              Reintentar Operación
            </button>
            <Link
              href="/"
              className="px-6 py-2.5 bg-slate-900 border border-slate-800 text-slate-300 font-mono text-xs uppercase tracking-widest rounded-lg hover:bg-slate-800 hover:text-white transition-colors"
            >
              Ir al Inicio
            </Link>
          </div>
        </div>
      </body>
    </html>
  );
}
