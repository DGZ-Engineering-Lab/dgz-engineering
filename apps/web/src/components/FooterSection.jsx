"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import Logo from "./Logo";
import { Globe, ExternalLink, Mail } from "lucide-react";

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
    <footer className="relative w-full border-t border-slate-100 bg-white text-[#1a1a1a] z-10 pt-24 pb-12">
      <div className="max-w-7xl mx-auto px-6">

        {/* Global Marketing Hook CTA */}
        <div className="mb-24 p-12 bg-[#1a1a1a] rounded-[2rem] flex flex-col lg:flex-row items-center justify-between gap-12 overflow-hidden relative group">
          <div className="absolute inset-0 opacity-10 bg-[url('https://www.transparenttextures.com/patterns/carbon-fibre.png')]"></div>
          <div className="relative z-10 space-y-4 text-center lg:text-left">
            <div className="text-[10px] font-mono text-slate-500 uppercase tracking-[0.5em]">Enterprise Solutions</div>
            <h3 className="text-3xl md:text-4xl font-black text-white tracking-tighter">¿Listo para escalar su <span className="text-slate-500 italic">Infraestructura Espacial?</span></h3>
            <p className="text-slate-400 text-sm max-w-xl">Únase a los gobiernos y empresas que ya optimizan sus activos territoriales con nuestra tecnología.</p>
          </div>
          <Link
            href="/#contact"
            className="relative z-10 px-10 py-5 bg-white text-black text-[10px] font-black uppercase tracking-[0.3em] hover:bg-slate-200 transition-all shadow-2xl rounded-sm whitespace-nowrap"
          >
            Solicitar Auditoría Espacial
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-16 mb-24">
          
          {/* Brand Info */}
          <div className="lg:col-span-4 space-y-8">
            <Link href="/" className="flex items-center gap-3">
              <Logo className="w-10 h-10" />
              <div className="flex flex-col leading-none">
                <span className="text-2xl font-black tracking-tighter">DevGiz</span>
                <span className="text-[8px] font-mono uppercase tracking-[0.3em] text-slate-400 font-bold">Engineering Lab</span>
              </div>
            </Link>
            <p className="text-slate-500 font-light leading-relaxed text-sm max-w-xs">
              Líderes en infraestructura de datos territoriales y soberanía digital para el sector público y privado en Colombia.
            </p>
            <div className="flex items-center gap-6">
              <a href="#" className="text-slate-400 hover:text-[#1a1a1a] transition-colors"><Globe className="w-5 h-5" /></a>
              <a href="#" className="text-slate-400 hover:text-[#1a1a1a] transition-colors"><ExternalLink className="w-5 h-5" /></a>
              <a href="mailto:info@devgiz.com" className="text-slate-400 hover:text-[#1a1a1a] transition-colors"><Mail className="w-5 h-5" /></a>
            </div>
          </div>
        </div>

        {/* Legal Info and System Status */}
        <div className="flex flex-col md:flex-row items-center justify-between gap-6 border-t border-slate-200 pt-8 mt-8 text-xs font-mono text-slate-500">
          <div className="flex flex-col sm:flex-row items-center gap-2 text-center md:text-left">
            <span>© 2026 ALBERT DANIEL GAVIRIA ZAPATA. TODOS LOS DERECHOS RESERVADOS.</span>
            <span className="hidden sm:inline text-slate-300">·</span>
            <span className="text-slate-800 font-semibold tracking-wider">LADM-COL V3 CERTIFIED</span>
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
      </div>
    </footer>
  );
}
