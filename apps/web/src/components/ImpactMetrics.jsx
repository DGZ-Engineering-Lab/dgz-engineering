"use client";
import { useState, useEffect, useRef } from "react";

export default function ImpactMetrics() {
  const [counts, setCounts] = useState([0, 0, 0]);
  const sectionRef = useRef(null);
  const [isVisible, setIsVisible] = useState(false);

  const metrics = [
    { target: 50, suffix: "k+", label: "Registros Procesados", sub: "Predios // Catastro", color: "text-emerald-400" },
    { target: -30, suffix: "%", label: "Margen de Error", sub: "QA/QC Automático", color: "text-cyan-400" },
    { target: 115, suffix: "%", label: "Eficiencia Operativa", sub: "ROI Workflow", color: "text-amber-400" }
  ];

  const entities = ["IGAC", "LADM-COL", "ANT", "SNR"];

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold: 0.1 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (!isVisible) return;

    const durations = [2000, 2000, 2000];
    const frames = 60;
    
    const intervals = metrics.map((m, i) => {
      let current = 0;
      const step = m.target / (durations[i] / (1000 / frames));
      
      return setInterval(() => {
        current += step;
        if ((step > 0 && current >= m.target) || (step < 0 && current <= m.target)) {
          setCounts(prev => {
            const next = [...prev];
            next[i] = m.target;
            return next;
          });
          clearInterval(intervals[i]);
        } else {
          setCounts(prev => {
            const next = [...prev];
            next[i] = Math.round(current);
            return next;
          });
        }
      }, 1000 / frames);
    });

    return () => intervals.forEach(clearInterval);
  }, [isVisible]);

  return (
    <section ref={sectionRef} className="relative w-full py-20 z-10 bg-black/50 border-t border-slate-800/50">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-12 items-center">
          
          <div className="lg:col-span-1 space-y-4">
             <div className="text-[10px] font-mono text-emerald-400 uppercase tracking-widest flex items-center gap-2">
               <span className="w-1.5 h-1.5 bg-emerald-400 rounded-full animate-pulse"></span> IMPACTO REAL
             </div>
             <h2 className="text-4xl font-extrabold text-white tracking-tight">Resultados <br/><span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 to-cyan-400">Comprobados</span></h2>
          </div>

          <div className="lg:col-span-3 grid grid-cols-1 md:grid-cols-3 gap-6">
             {metrics.map((m, i) => (
               <div key={i} className="group p-8 rounded-2xl bg-slate-900/40 border border-slate-800/50 hover:border-cyan-500/30 transition-all duration-500 hover:bg-slate-900/60 shadow-xl relative overflow-hidden">
                 <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-cyan-500/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity"></div>
                 <div className={`text-5xl font-black mb-2 tracking-tighter ${m.color}`}>
                   {counts[i]}{m.suffix}
                 </div>
                 <div className="text-base font-bold text-slate-200 mb-2 group-hover:text-white transition-colors">{m.label}</div>
                 <div className="text-[10px] font-mono text-slate-500 uppercase tracking-[0.2em]">{m.sub}</div>
               </div>
             ))}
          </div>

        </div>

        {/* Entities bar - high end presentation */}
        <div className="mt-20 pt-10 border-t border-slate-800/30">
          <div className="flex flex-col items-center gap-8">
            <span className="text-[9px] font-mono text-slate-600 uppercase tracking-[0.4em]">Sistemas interoperables con estándares globales:</span>
            <div className="flex flex-wrap justify-center gap-12 md:gap-20 opacity-30 grayscale hover:opacity-80 transition-all duration-700">
               {entities.map((ent, i) => (
                 <div key={i} className="flex flex-col items-center group cursor-crosshair">
                   <span className="text-3xl font-black text-white font-mono tracking-tighter group-hover:text-cyan-400 transition-colors">{ent}</span>
                   <div className="w-0 h-[1px] bg-cyan-500 group-hover:w-full transition-all duration-500 mt-1"></div>
                 </div>
               ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
