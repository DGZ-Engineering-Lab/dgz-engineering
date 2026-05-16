"use client";

import { useState, useEffect } from "react";

export default function FooterSection() {
  const [time, setTime] = useState("");

  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      const options = { timeZone: 'America/Bogota', hour12: false, hour: '2-digit', minute: '2-digit', second: '2-digit' };
      setTime(now.toLocaleTimeString('es-CO', options) + " COT");
    };
    updateTime();
    const timer = setInterval(updateTime, 1000);
    return () => clearInterval(timer);
  }, []);

  return (
    <footer className="relative w-full border-t border-slate-800 bg-[#050505] z-10">
      <div className="max-w-7xl mx-auto px-6 py-6 flex flex-col md:flex-row items-center justify-between gap-6 text-xs font-mono text-slate-500">
        
        {/* Legal Info */}
        <div className="flex flex-col sm:flex-row items-center gap-2 text-center md:text-left">
          <span>© 2026 ALBERT DANIEL GAVIRIA ZAPATA. TODOS LOS DERECHOS RESERVADOS.</span>
          <span className="hidden sm:inline text-cyan-500">·</span>
          <span className="text-slate-400 font-semibold tracking-wider">LADM-COL V3 CERTIFIED</span>
        </div>

        {/* System Status */}
        <div className="flex items-center gap-3 px-4 py-2 rounded-full bg-slate-900 border border-slate-800" title="Operaciones estables">
          <div className="relative flex h-2 w-2">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
            <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
          </div>
          <span className="text-emerald-400 font-bold tracking-widest">DGZ_OS_V6.0 //_NOMINAL</span>
        </div>

        {/* Telemetry / Coordinates */}
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-2">
            <svg className="w-4 h-4 text-slate-400" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
            <span className="w-24 text-right">{time}</span>
          </div>
          <span className="text-slate-700">//</span>
          <div className="flex items-center gap-2 text-purple-400 font-bold">
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M21 12a9 9 0 01-9 9m9-9a9 9 0 00-9-9m9 9H3m9 9a9 9 0 01-9-9m9 9c1.657 0 3-4.03 3-9s-1.343-9-3-9m0 18c-1.657 0-3-4.03-3-9s1.343-9 3-9m-9 9a9 9 0 019-9" /></svg>
            <span>EPSG:4326</span>
          </div>
        </div>

      </div>
    </footer>
  );
}
