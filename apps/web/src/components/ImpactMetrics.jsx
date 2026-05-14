"use client";
import { useState, useEffect, useRef } from "react";
import { animate, stagger } from "animejs";

const metrics = [
  { target: 50, suffix: "k+", label: "Registros Procesados", sub: "Predios // Catastro", color: "text-emerald-400" },
  { target: -30, suffix: "%", label: "Margen de Error", sub: "QA/QC Automático", color: "text-cyan-400" },
  { target: 115, suffix: "%", label: "Eficiencia Operativa", sub: "ROI Workflow", color: "text-amber-400" }
];

const techStack = [
  {
    id: "backend",
    label: "Backend",
    symbol: "B",
    color: "text-blue-400",
    glow: "shadow-[0_0_20px_rgba(59,130,246,0.3)]",
    description: "Motor de procesamiento geoespacial asíncrono.",
    tools: [
      { name: "FastAPI", icon: "⚡", benefit: "Latencia mínima en peticiones" },
      { name: "GeoPandas", icon: "🗺️", benefit: "Análisis vectorial de alta precisión" },
      { name: "SQLAlchemy", icon: "🔗", benefit: "ORM robusto para gestión de datos" }
    ]
  },
  {
    id: "frontend",
    label: "Frontend",
    symbol: "F",
    color: "text-emerald-400",
    glow: "shadow-[0_0_20px_rgba(52,211,153,0.3)]",
    description: "Experiencia de usuario inmersiva y reactiva.",
    tools: [
      { name: "Next.js 15", icon: "⚛️", benefit: "Renderizado híbrido ultra-rápido" },
      { name: "Anime.js", icon: "🎬", benefit: "Coreografías visuales de alto nivel" },
      { name: "Tailwind", icon: "🎨", benefit: "Diseño premium altamente adaptable" }
    ]
  },
  {
    id: "database",
    label: "Database",
    symbol: "D",
    color: "text-amber-400",
    glow: "shadow-[0_0_20px_rgba(251,191,36,0.3)]",
    description: "Almacenamiento elástico con soporte espacial.",
    tools: [
      { name: "PostGIS", icon: "📍", benefit: "Consultas espaciales nativas" },
      { name: "Neon DB", icon: "☁️", benefit: "Escalamiento serverless instantáneo" },
      { name: "DuckDB", icon: "🦆", benefit: "Analítica local a velocidad luz" }
    ]
  },
  {
    id: "analytics",
    label: "Analytics",
    symbol: "A",
    color: "text-cyan-400",
    glow: "shadow-[0_0_20px_rgba(34,211,238,0.3)]",
    description: "Inteligencia territorial y ciencia de datos.",
    tools: [
      { name: "PySAL", icon: "📈", benefit: "Estadística espacial avanzada" },
      { name: "Polars", icon: "❄️", benefit: "ETL paralelo de ultra-rendimiento" },
      { name: "LADM-COL", icon: "📜", benefit: "Estandarización bajo norma nacional" }
    ]
  }
];


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

        {/* Interactive Tech Stack Nodes */}
        <div className="mt-32 pt-12 border-t border-slate-800/50 relative">
          <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 px-4 bg-[#02040a]">
             <span className="text-[10px] font-mono text-slate-500 uppercase tracking-[0.5em] flex items-center gap-3">
                <span className="w-8 h-[1px] bg-slate-700"></span>
                Arquitectura de Interoperabilidad Global
                <span className="w-8 h-[1px] bg-slate-700"></span>
             </span>
          </div>
          
          <div ref={entitiesRef} className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 mt-12">
             {techStack.map((node, i) => (
               <div key={i} className="opacity-0 group relative flex flex-col items-center">
                 {/* Main Node Card */}
                 <div className={`relative z-20 w-full p-8 rounded-2xl bg-[#050810] border border-slate-800 group-hover:border-slate-600 transition-all duration-500 cursor-pointer overflow-hidden ${node.glow}`}>
                   
                   {/* Technical corner accents */}
                   <div className="absolute top-0 left-0 w-4 h-4 border-t border-l border-slate-700 group-hover:border-cyan-400 transition-colors"></div>
                   <div className="absolute bottom-0 right-0 w-4 h-4 border-b border-r border-slate-700 group-hover:border-cyan-400 transition-colors"></div>

                   <div className="flex items-center gap-4 mb-4">
                     <div className={`text-4xl font-black font-mono ${node.color}`}>{node.symbol}</div>
                     <div className="h-8 w-[1px] bg-slate-800"></div>
                     <div className="text-xl font-bold text-white tracking-tight">{node.label}</div>
                   </div>
                   
                   <p className="text-xs text-slate-400 leading-relaxed mb-2 opacity-80 group-hover:opacity-100 transition-opacity">
                     {node.description}
                   </p>

                   {/* Indicador de expansión */}
                   <div className="flex justify-center mt-2">
                     <div className="w-1 h-1 rounded-full bg-slate-700 group-hover:bg-cyan-400 group-hover:animate-bounce transition-colors"></div>
                   </div>
                 </div>

                 {/* Expanded Tools Panel */}
                 <div className="w-full max-h-0 opacity-0 group-hover:max-h-[500px] group-hover:opacity-100 transition-all duration-700 ease-in-out overflow-hidden mt-4 space-y-3 px-2">
                   {node.tools.map((tool, idx) => (
                     <div key={idx} className="flex items-start gap-4 p-3 rounded-xl bg-slate-900/40 border border-slate-800/50 hover:bg-slate-800/60 transition-all group/tool transform translate-y-4 group-hover:translate-y-0" style={{ transitionDelay: `${idx * 100}ms` }}>
                       <div className="text-xl shrink-0 grayscale group-hover/tool:grayscale-0 transition-all">{tool.icon}</div>
                       <div className="space-y-1">
                         <div className="text-xs font-bold text-slate-200 group-hover/tool:text-white">{tool.name}</div>
                         <div className="text-[10px] text-slate-500 group-hover/tool:text-slate-300 leading-tight">
                           {tool.benefit}
                         </div>
                       </div>
                     </div>
                   ))}
                 </div>

                 {/* Decorative connection line for the group */}
                 <div className="absolute top-1/2 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-slate-800 to-transparent -z-10 group-hover:via-cyan-500/20 transition-all"></div>
               </div>
             ))}
          </div>
        </div>

      </div>
    </section>
  );
}
