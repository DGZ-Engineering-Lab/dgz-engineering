"use client";
import { useEffect, useState } from "react";

export default function SystemStatusHeader() {
  const [status, setStatus] = useState({
    message: "SYSTEMS_OPERATIONAL",
    color: "emerald",
    maintenance: false
  });

  useEffect(() => {
    // In a real Vercel environment, this would call an API that reads from Edge Config
    // For now, we simulate the highly-efficient edge fetch
    const ctrl = new AbortController();
    const checkEdgeStatus = async () => {
      try {
        const res = await fetch("/api/config", { signal: ctrl.signal });
        const config = await res.json();
        if (config.systemStatus) setStatus(config.systemStatus);
      } catch (e) {
        // Fallback to nominal
      }
    };
    // Se difiere al reposo del navegador para no competir con LCP/hidratación
    let idle;
    if ("requestIdleCallback" in window) idle = window.requestIdleCallback(checkEdgeStatus, { timeout: 3000 });
    else idle = setTimeout(checkEdgeStatus, 1500);
    return () => {
      ctrl.abort();
      if ("cancelIdleCallback" in window) window.cancelIdleCallback(idle);
      else clearTimeout(idle);
    };
  }, []);

  if (status.maintenance) {
     return (
        <div role="status" className="bg-amber-500/10 border-b border-amber-500/20 py-2 text-center">
           <span className="text-[10px] font-mono text-amber-500 uppercase tracking-[0.3em] font-black">
              <span aria-hidden="true">⚠️</span> Mantenimiento Programado en Nodo Central
           </span>
        </div>
     );
  }

  return (
    <div aria-hidden="true" className="fixed top-0 left-0 w-full z-[100] h-1 flex">
       <div className={`h-full bg-${status.color}-500/50 transition-all duration-1000 shadow-[0_0_10px_${status.color === 'emerald' ? '#10b981' : '#ef4444'}]`} style={{ width: '100%' }}></div>
    </div>
  );
}
