"use client";
import { useEffect, useState } from "react";

// Línea de estado superior. Lee /api/config (Edge Config) y solo muestra
// banner cuando hay mantenimiento; en operación normal es un filo dorado.
export default function SystemStatusHeader() {
  const [maintenance, setMaintenance] = useState(false);

  useEffect(() => {
    let cancelled = false;
    fetch("/api/config")
      .then((res) => (res.ok ? res.json() : null))
      .then((config) => {
        if (!cancelled && config?.systemStatus?.maintenance) setMaintenance(true);
      })
      .catch(() => {});
    return () => {
      cancelled = true;
    };
  }, []);

  if (maintenance) {
    return (
      <div className="fixed top-0 left-0 w-full z-[110] bg-amber-500/10 border-b border-amber-500/20 py-2 text-center backdrop-blur">
        <span className="text-[10px] font-mono text-amber-600 uppercase tracking-[0.3em] font-bold">
          Mantenimiento programado en nodo central
        </span>
      </div>
    );
  }

  return <div className="fixed top-0 left-0 w-full z-[110] h-px hairline-gold pointer-events-none" aria-hidden="true" />;
}
