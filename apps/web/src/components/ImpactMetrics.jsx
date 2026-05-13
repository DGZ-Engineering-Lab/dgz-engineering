"use client";
import { useState, useEffect, useRef } from "react";
import { animate, stagger } from "animejs";

const metrics = [
  { target: 50, suffix: "k+", label: "Registros Procesados", sub: "Predios // Catastro", color: "text-emerald-400" },
  { target: -30, suffix: "%", label: "Margen de Error", sub: "QA/QC Automático", color: "text-cyan-400" },
  { target: 115, suffix: "%", label: "Eficiencia Operativa", sub: "ROI Workflow", color: "text-amber-400" }
];

const entities = ["IGAC", "LADM-COL", "ANT", "SNR"];

export default function ImpactMetrics() {
  const [counts, setCounts] = useState([0, 0, 0]);
  const sectionRef = useRef(null);
  const entitiesRef = useRef(null);
  const [isVisible, setIsVisible] = useState(false);

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

    // Advanced stagger animation for interoperability nodes
    if (entitiesRef.current) {
      animate(entitiesRef.current.children, {
        opacity: [0, 1],
        translateY: [30, 0],
        scale: [0.9, 1],
        duration: 1200,
        delay: stagger(150, { start: 500 }),
        easing: 'outElastic(1, .6)'
      });
    }

    return () => intervals.forEach(clearInterval);
  }, [isVisible]);

  return (
    <section ref={sectionRef} className="relative w-full py-24 z-10 bg-[#02040a] border-t border-slate-800/50 overflow-hidden">
      {/* Decorative background glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[400px] bg-cyan-900/10 rounded-full blur-[120px] pointer-events-none"></div>

      <div className="max-w-7xl mx-auto px-6 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-12 items-center">
          
          <div className="lg:col-span-1 space-y-4">
             <div className="text-[10px] font-mono text-emerald-400 uppercase tracking-widest flex items-center gap-2">
               <span className="w-1.5 h-1.5 bg-emerald-400 rounded-full animate-pulse shadow-[0_0_8px_#34d399]"></span> IMPACTO REAL
             </div>
             <h2 className="text-4xl font-extrabold text-white tracking-tight">Resultados <br/><span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 to-cyan-400">Comprobados</span></h2>
          </div>

          <div className="lg:col-span-3 grid grid-cols-1 md:grid-cols-3 gap-6">
             {metrics.map((m, i) => (
               <div key={i} className="group p-8 rounded-3xl bg-[#0a0f16] border border-slate-800 hover:border-cyan-500/50 transition-all duration-500 hover:bg-slate-900/80 shadow-2xl relative overflow-hidden backdrop-blur-sm">
                 <div className="absolute top-0 left-0 w-full h-[2px] bg-gradient-to-r from-transparent via-cyan-500 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                 <div className="absolute inset-0 bg-gradient-to-b from-cyan-500/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"></div>
                 <div className={`relative z-10 text-6xl font-black mb-3 tracking-tighter ${m.color} drop-shadow-lg`}>
                   {counts[i]}{m.suffix}
                 </div>
                 <div className="relative z-10 text-lg font-bold text-slate-300 mb-2 group-hover:text-white transition-colors">{m.label}</div>
                 <div className="relative z-10 text-[10px] font-mono text-slate-500 uppercase tracking-[0.2em]">{m.sub}</div>
               </div>
             ))}
          </div>

        </div>

        {/* Entities bar - high end presentation */}
        <div className="mt-32 pt-12 border-t border-slate-800/50 relative">
          <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 px-4 bg-[#02040a]">
             <span className="text-[10px] font-mono text-slate-500 uppercase tracking-[0.5em] flex items-center gap-3">
                <span className="w-8 h-[1px] bg-slate-700"></span>
                Nodos de Interoperabilidad Global
                <span className="w-8 h-[1px] bg-slate-700"></span>
             </span>
          </div>
          
          <div ref={entitiesRef} className="flex flex-wrap justify-center gap-6 md:gap-10 mt-8 relative">
             {/* decorative background line */}
             <div className="absolute top-1/2 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-slate-800 to-transparent -z-10"></div>
             
             {entities.map((ent, i) => (
               <div key={i} className="opacity-0 relative group cursor-crosshair flex flex-col items-center justify-center p-8 min-w-[160px] bg-[#050810] border border-slate-800 rounded-2xl hover:border-cyan-500/60 hover:bg-[#0a1220] transition-all duration-500 overflow-hidden shadow-xl hover:shadow-[0_0_30px_rgba(6,182,212,0.15)] hover:-translate-y-2">
                 
                 {/* Inner Glow effect */}
                 <div className="absolute inset-0 bg-cyan-500/20 blur-2xl rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none"></div>
                 
                 {/* Technical Corner Brackets */}
                 <div className="absolute top-3 left-3 w-3 h-3 border-t-2 border-l-2 border-slate-700 group-hover:border-cyan-400 transition-colors duration-300"></div>
                 <div className="absolute top-3 right-3 w-3 h-3 border-t-2 border-r-2 border-slate-700 group-hover:border-cyan-400 transition-colors duration-300"></div>
                 <div className="absolute bottom-3 left-3 w-3 h-3 border-b-2 border-l-2 border-slate-700 group-hover:border-cyan-400 transition-colors duration-300"></div>
                 <div className="absolute bottom-3 right-3 w-3 h-3 border-b-2 border-r-2 border-slate-700 group-hover:border-cyan-400 transition-colors duration-300"></div>
                 
                 <span className="relative z-10 text-3xl font-black text-slate-400 font-mono tracking-tighter group-hover:text-transparent group-hover:bg-clip-text group-hover:bg-gradient-to-r group-hover:from-white group-hover:to-cyan-200 transition-all duration-300">{ent}</span>
                 
                 {/* Animated bottom bar */}
                 <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-0 h-[2px] bg-cyan-400 group-hover:w-3/4 transition-all duration-500 shadow-[0_0_10px_#22d3ee]"></div>
               </div>
             ))}
          </div>
        </div>
      </div>
    </section>
  );
}
