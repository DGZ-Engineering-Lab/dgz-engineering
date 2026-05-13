"use client";

import { useState, useEffect, useRef } from "react";
import Logo from "./Logo";
import RealtimeDataStream from "./RealtimeDataStream";
import { animate } from "animejs";

const SERVICES = [
  {
    id: "svc-01",
    title: "Actualización Territorial (LADM-COL)",
    desc: "Implementación del modelo LADM-COL V3 para procesos catastrales masivos. Garantizamos integridad topológica y jurídica.",
    icon: "🏗️",
    metrics: ["+500 Predios/Día", "100% Legal Ready"],
    tags: ["Interoperabilidad", "Catastro", "IGAC"],
    color: "cyan"
  },
  {
    id: "svc-02",
    title: "Control de Calidad (QA/QC)",
    desc: "Motores de validación automática para detectar inconsistencias espaciales y alfanuméricas antes de la entrega final.",
    icon: "✅",
    metrics: ["0.01% Error Margin", "Auto Validation"],
    tags: ["Precisión", "Auditoría", "Compliance"],
    color: "emerald"
  },
  {
    id: "svc-03",
    title: "ETL & GIS Pipelines",
    desc: "Automatización completa del flujo de datos desde sensores de campo hasta bases de datos PostGIS centralizadas.",
    icon: "📡",
    metrics: ["Real-time Sync", "FastAPI Backend"],
    tags: ["DevOps", "Python", "Spatial Data"],
    color: "blue"
  }
];

export default function UnifiedCapabilities() {
  const [activeTab, setActiveTab] = useState(0);
  const terminalRef = useRef(null);

  useEffect(() => {
    if (terminalRef.current) {
        animate(terminalRef.current, {
            opacity: [0, 1],
            translateX: [50, 0],
            duration: 1200,
            easing: 'outExpo',
            delay: 300
        });
    }
  }, [activeTab]);

  return (
    <section id="capabilities" className="relative w-full py-32 z-10 bg-[#02040a] border-t border-slate-800/50 overflow-hidden">
      {/* Background Decor */}
      <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-cyan-500/5 rounded-full blur-[150px] pointer-events-none"></div>
      
      <div className="max-w-7xl mx-auto px-6">
        {/* Header */}
        <div className="flex flex-col lg:flex-row justify-between items-end mb-24 gap-12">
          <div className="space-y-6">
            <div className="flex items-center gap-4">
               <div className="w-12 h-[1px] bg-gradient-to-r from-transparent to-cyan-500"></div>
               <span className="text-cyan-400 font-mono text-xs tracking-[0.4em] uppercase">Misión Crítica</span>
            </div>
            <h2 className="text-6xl md:text-7xl font-black text-white tracking-tighter leading-none">
               Ingeniería <br/>
               <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-blue-500 to-purple-600 italic text-glow">Multiproposito</span>
            </h2>
          </div>
          <p className="max-w-md text-slate-400 text-lg font-light leading-relaxed border-l border-slate-800 pl-8">
             Desplegamos infraestructuras de datos espaciales que cumplen con los más altos estándares nacionales e internacionales.
          </p>
        </div>

        {/* Content Matrix */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
           
           {/* Navigation Pillar */}
           <div className="lg:col-span-4 space-y-4">
              {SERVICES.map((svc, i) => (
                 <button
                    key={svc.id}
                    onClick={() => setActiveTab(i)}
                    className={`w-full text-left p-8 rounded-[2rem] border transition-all duration-500 group relative overflow-hidden ${
                       activeTab === i 
                       ? "bg-slate-900 border-cyan-500/50 shadow-2xl shadow-cyan-500/10" 
                       : "bg-transparent border-slate-800 hover:border-slate-700 hover:bg-white/5"
                    }`}
                 >
                    <div className="relative z-10 flex items-center gap-6">
                       <span className={`text-3xl transition-transform duration-500 ${activeTab === i ? "scale-110" : "grayscale opacity-50"}`}>
                          {svc.icon}
                       </span>
                       <div>
                          <div className={`text-xs font-mono uppercase tracking-widest mb-1 ${activeTab === i ? "text-cyan-400" : "text-slate-500"}`}>
                             NODE_0{i+1}
                          </div>
                          <div className={`text-lg font-bold transition-colors ${activeTab === i ? "text-white" : "text-slate-400"}`}>
                             {svc.title}
                          </div>
                       </div>
                    </div>
                    {activeTab === i && (
                       <div className="absolute bottom-0 left-0 h-1 bg-cyan-500 animate-[shimmer_2s_infinite]" style={{ width: '100%' }}></div>
                    )}
                 </button>
              ))}
           </div>

           {/* Visualization Terminal */}
           <div className="lg:col-span-8">
              <div ref={terminalRef} className="relative h-full bg-[#0a0f16] border border-slate-800 rounded-[3rem] overflow-hidden shadow-2xl flex flex-col min-h-[600px]">
                 
                 {/* Terminal Header */}
                 <div className="px-8 py-5 border-b border-slate-800 bg-slate-900/50 flex items-center justify-between">
                    <div className="flex gap-2">
                       <div className="w-3 h-3 rounded-full bg-red-500/20"></div>
                       <div className="w-3 h-3 rounded-full bg-amber-500/20"></div>
                       <div className="w-3 h-3 rounded-full bg-emerald-500/20"></div>
                    </div>
                    <div className="text-[10px] font-mono text-slate-500 uppercase tracking-widest flex items-center gap-4">
                       <span>RUNTIME: {SERVICES[activeTab].id.toUpperCase()}</span>
                       <span className="w-px h-3 bg-slate-800"></span>
                       <span className="text-emerald-400 animate-pulse">● EXECUTION_NOMINAL</span>
                    </div>
                 </div>

                 {/* Terminal Content */}
                 <div className="flex-1 p-10 lg:p-16 flex flex-col justify-between relative overflow-hidden">
                    {/* Background Visualizer Component */}
                    {activeTab === 2 ? (
                        <div className="absolute inset-0 p-8 opacity-40">
                            <RealtimeDataStream />
                        </div>
                    ) : (
                        <div className="absolute inset-0 opacity-5 pointer-events-none">
                            <Logo className="w-full h-full p-20" />
                        </div>
                    )}

                    <div className="space-y-12 relative z-10">
                       <div className="space-y-6">
                          <h3 className="text-5xl font-black text-white tracking-tight leading-tight">
                             {SERVICES[activeTab].title}
                          </h3>
                          <p className="text-2xl text-slate-400 font-light leading-relaxed max-w-2xl">
                             {SERVICES[activeTab].desc}
                          </p>
                       </div>

                       <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                          {SERVICES[activeTab].metrics.map((m, i) => (
                             <div key={i} className="p-6 bg-black/40 border border-slate-800 rounded-2xl backdrop-blur-md">
                                <div className="text-[10px] font-mono text-cyan-400 uppercase tracking-widest mb-2">Primary_Metric_0{i+1}</div>
                                <div className="text-3xl font-black text-white">{m}</div>
                             </div>
                          ))}
                       </div>
                    </div>

                    <div className="pt-12 border-t border-slate-800/50 flex flex-wrap gap-3 relative z-10">
                       {SERVICES[activeTab].tags.map(t => (
                          <span key={t} className="px-4 py-2 bg-slate-900 border border-slate-800 text-[10px] font-mono text-slate-500 rounded-xl uppercase tracking-widest">
                             {t}
                          </span>
                       ))}
                    </div>
                 </div>

                 {/* Side HUD (Desktop Only) */}
                 <div className="absolute bottom-10 right-10 w-64 bg-black/80 border border-slate-800 rounded-2xl p-6 font-mono text-[9px] hidden xl:block shadow-2xl backdrop-blur-xl z-20">
                    <div className="flex items-center gap-2 mb-4 border-b border-slate-800 pb-3">
                       <span className="w-2 h-2 bg-emerald-500 rounded-full animate-pulse shadow-[0_0_10px_#10b981]"></span>
                       <span className="text-slate-400 font-bold">STDOUT_STREAM</span>
                    </div>
                    <div className="space-y-2 text-cyan-500/80">
                       <div>[SYS] INIT_{SERVICES[activeTab].id.toUpperCase()}</div>
                       <div>[LOG] MAPPING_COORDS...</div>
                       <div>[LOG] SYNC_LADM_V3_COL</div>
                       <div className="text-white animate-pulse">_</div>
                    </div>
                 </div>

              </div>
           </div>
        </div>
      </div>
    </section>
  );
}
