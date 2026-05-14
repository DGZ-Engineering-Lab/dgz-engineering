"use client";

import { useState, useEffect, useRef } from "react";
import Logo from "./Logo";
import RealtimeDataStream from "./RealtimeDataStream";
import EntityLogos from "./EntityLogos";
import VurQuery from "./VurQuery";
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
  },
  {
    id: "svc-04",
    title: "Auditoría Digital VUR/SNR",
    desc: "Consulta y validación jurídica en tiempo real directamente desde la base de datos de la SNR (VUR). Garantía de certeza física y jurídica.",
    icon: "⚖️",
    metrics: ["SNR Live Sync", "99.9% Reliability"],
    tags: ["VUR", "SNR", "Legal Tech"],
    color: "red"
  }
];

export default function UnifiedCapabilities() {
  const [activeTab, setActiveTab] = useState(0);
  const [mounted, setMounted] = useState(false);
  const terminalRef = useRef(null);

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    if (mounted && terminalRef.current) {
        animate(terminalRef.current, {
            opacity: [0, 1],
            translateX: [50, 0],
            duration: 1200,
            easing: 'outExpo',
            delay: 100
        });
    }
  }, [activeTab, mounted]);

  return (
    <section id="capabilities" className="relative w-full py-32 lg:py-40 z-10 bg-[#02040a] border-t border-slate-800/50 overflow-hidden">
      {/* Premium Background Decor */}
      <div className="absolute top-0 right-0 w-[800px] h-[800px] bg-cyan-900/10 rounded-full blur-[150px] pointer-events-none"></div>
      <div className="absolute bottom-0 left-0 w-[600px] h-[600px] bg-blue-900/10 rounded-full blur-[150px] pointer-events-none"></div>
      
      <div className="max-w-[1400px] mx-auto px-6 relative z-10">
        {/* Header Section */}
        <div className="flex flex-col xl:flex-row justify-between items-start xl:items-end mb-24 gap-12">
          <div className="space-y-6">
            <div className="flex items-center gap-4">
               <div className="w-16 h-[2px] bg-gradient-to-r from-cyan-500 to-transparent"></div>
               <span className="text-cyan-400 font-mono text-sm tracking-[0.4em] uppercase font-bold">
                 Soberanía Territorial Digital
               </span>
            </div>
            <h2 className="text-5xl md:text-7xl lg:text-[5.5rem] font-black text-white tracking-tighter leading-[1.1]">
               Inteligencia <br/>
               <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-blue-500 to-indigo-500 italic drop-shadow-[0_0_30px_rgba(6,182,212,0.4)]">Multiproposito</span>
            </h2>
          </div>
          <div className="xl:w-1/3 border-l-2 border-slate-800 pl-8 py-2">
            <p className="text-slate-400 text-xl font-light leading-relaxed">
               Desplegamos infraestructuras de datos espaciales que cumplen con los más altos estándares nacionales e internacionales, garantizando precisión y cumplimiento legal absoluto.
            </p>
          </div>
        </div>

        {/* Content Matrix Grid */}
        <div className="grid grid-cols-1 xl:grid-cols-12 gap-8 lg:gap-12 items-stretch">
           
           {/* Navigation Pillar (Left) */}
           <div className="xl:col-span-4 flex flex-col gap-4">
              {SERVICES.map((svc, i) => (
                 <button
                    key={svc.id}
                    onClick={() => setActiveTab(i)}
                    className={`w-full text-left p-8 xl:p-10 rounded-[2.5rem] border transition-all duration-500 group relative overflow-hidden flex-1 ${
                       activeTab === i 
                       ? "bg-slate-900/80 backdrop-blur-xl border-cyan-500/50 shadow-[0_0_40px_rgba(6,182,212,0.15)] transform scale-[1.02]" 
                       : "bg-[#050810] border-slate-800/80 hover:border-slate-600 hover:bg-[#0a0f16]"
                    }`}
                 >
                    {/* Active Background Glow */}
                    {activeTab === i && (
                      <div className="absolute inset-0 bg-gradient-to-br from-cyan-500/10 to-transparent pointer-events-none"></div>
                    )}
                    
                    <div className="relative z-10 flex items-center gap-6 xl:gap-8">
                       <div className={`flex items-center justify-center w-16 h-16 rounded-2xl transition-all duration-500 ${activeTab === i ? "bg-cyan-500/20 text-4xl scale-110 shadow-[0_0_20px_rgba(6,182,212,0.3)]" : "bg-slate-800/50 text-3xl grayscale opacity-50"}`}>
                          {svc.icon}
                       </div>
                       <div className="flex-1">
                          <div className={`text-[10px] font-mono uppercase tracking-[0.2em] mb-2 ${activeTab === i ? "text-cyan-400 font-bold" : "text-slate-500"}`}>
                             NODE_0{i+1}
                          </div>
                          <div className={`text-xl font-bold transition-colors leading-tight ${activeTab === i ? "text-white" : "text-slate-400 group-hover:text-slate-200"}`}>
                             {svc.title}
                          </div>
                       </div>
                    </div>
                    {activeTab === i && (
                       <div className="absolute bottom-0 left-0 h-1 bg-gradient-to-r from-cyan-400 to-blue-500 animate-[shimmer_2s_infinite] w-full"></div>
                    )}
                 </button>
              ))}
           </div>

           {/* Visualization Terminal (Right) */}
           <div className="xl:col-span-8 flex flex-col h-full min-h-[700px]">
              <div ref={terminalRef} className="relative flex-1 bg-[#050810] border border-slate-800 rounded-[3rem] overflow-hidden shadow-2xl flex flex-col group">
                 
                 {/* Terminal Header */}
                 <div className="px-8 py-5 border-b border-slate-800/80 bg-[#02040a]/80 backdrop-blur-md flex items-center justify-between z-20">
                    <div className="flex gap-2">
                       <div className="w-3.5 h-3.5 rounded-full bg-red-500/80 shadow-[0_0_10px_rgba(239,68,68,0.4)]"></div>
                       <div className="w-3.5 h-3.5 rounded-full bg-amber-500/80 shadow-[0_0_10px_rgba(245,158,11,0.4)]"></div>
                       <div className="w-3.5 h-3.5 rounded-full bg-emerald-500/80 shadow-[0_0_10px_rgba(16,185,129,0.4)]"></div>
                    </div>
                    <div className="text-[10px] sm:text-xs font-mono text-slate-400 uppercase tracking-widest flex items-center gap-4">
                       <span className="hidden sm:inline">RUNTIME: {SERVICES[activeTab].id.toUpperCase()}</span>
                       <span className="w-px h-4 bg-slate-700 hidden sm:block"></span>
                       <div className="flex items-center gap-2">
                          <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
                          <span className="text-emerald-400">EXECUTION_NOMINAL</span>
                       </div>
                    </div>
                 </div>

                 {/* Terminal Content Body */}
                 <div className="flex-1 p-8 md:p-12 lg:p-16 flex flex-col justify-between relative overflow-hidden bg-gradient-to-br from-slate-900/50 to-transparent">
                    {/* Dynamic Background Visualizer */}
                    <div className="absolute inset-0 pointer-events-none overflow-hidden rounded-b-[3rem]">
                      {activeTab === 2 ? (
                          <div className="absolute inset-0 p-8 opacity-60">
                              <RealtimeDataStream />
                          </div>
                      ) : activeTab === 3 ? (
                          <div className="absolute inset-0 bg-red-900/5 backdrop-blur-[2px]"></div>
                      ) : (
                          <div className="absolute inset-0 opacity-[0.03] flex items-center justify-center scale-150 transform -rotate-12">
                              <Logo className="w-full h-full" />
                          </div>
                      )}
                    </div>

                    {/* Main Content Info / Component Rendering */}
                    {activeTab === 3 ? (
                      <div className="relative z-20 h-full flex items-center justify-center">
                        <VurQuery />
                      </div>
                    ) : (
                      <div className="space-y-12 relative z-10 flex-1 flex flex-col justify-center">
                        <div className="space-y-6 max-w-3xl">
                           <h3 className="text-4xl md:text-5xl lg:text-6xl font-black text-white tracking-tight leading-tight">
                              {SERVICES[activeTab].title}
                           </h3>
                           <p className="text-xl md:text-2xl text-slate-400 font-light leading-relaxed">
                              {SERVICES[activeTab].desc}
                           </p>
                        </div>

                        {/* Metrics Grid */}
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 w-full max-w-3xl">
                           {SERVICES[activeTab].metrics.map((m, i) => (
                              <div key={i} className="p-6 bg-black/60 border border-slate-700/50 rounded-3xl backdrop-blur-xl hover:border-cyan-500/50 transition-colors shadow-xl">
                                 <div className="text-[10px] font-mono text-cyan-400 uppercase tracking-[0.2em] mb-3">Primary_Metric_0{i+1}</div>
                                 <div className="text-2xl md:text-3xl font-black text-white">{m}</div>
                              </div>
                           ))}
                        </div>
                      </div>
                    )}

                    {/* Footer Tags (Hide when VurQuery is active for more space) */}
                    {activeTab !== 3 && (
                      <div className="pt-10 mt-10 border-t border-slate-800/80 flex flex-wrap gap-3 relative z-10">
                         {SERVICES[activeTab].tags.map(t => (
                            <span key={t} className="px-5 py-2 bg-[#02040a] border border-slate-800 text-[10px] font-mono text-slate-400 rounded-full uppercase tracking-widest hover:border-cyan-500/50 transition-colors cursor-default">
                               {t}
                            </span>
                         ))}
                      </div>
                    )}
                 </div>

                 {/* Side HUD Monitor (Desktop Only) */}
                 <div className="absolute bottom-12 right-12 w-72 bg-[#02040a]/90 border border-slate-800 rounded-2xl p-6 font-mono text-[10px] hidden 2xl:block shadow-[0_0_50px_rgba(0,0,0,0.8)] backdrop-blur-2xl z-20 hover:border-cyan-500/30 transition-all">
                    <div className="flex items-center justify-between mb-4 border-b border-slate-800 pb-3">
                       <div className="flex items-center gap-2">
                         <span className="w-2 h-2 bg-emerald-500 rounded-full animate-pulse shadow-[0_0_10px_#10b981]"></span>
                         <span className="text-slate-300 font-bold">STDOUT_STREAM</span>
                       </div>
                       <span className="text-slate-600">v2.4.1</span>
                    </div>
                    <div className="space-y-2.5 text-cyan-500/80 leading-tight">
                        {mounted ? (
                          <>
                            <div><span className="text-slate-500">[{new Date().toLocaleTimeString()}]</span> [SYS] INIT_{SERVICES[activeTab].id.toUpperCase()}</div>
                            <div><span className="text-slate-500">[{new Date().toLocaleTimeString()}]</span> [LOG] ALLOCATING_RESOURCES...</div>
                            {activeTab === 3 && <div><span className="text-slate-500">[{new Date().toLocaleTimeString()}]</span> [AUTH] VUR_USER: CLAUDIAC.GOMEZ</div>}
                            <div><span className="text-slate-500">[{new Date().toLocaleTimeString()}]</span> [LOG] SYNC_LADM_V3_COL</div>
                            <div><span className="text-slate-500">[{new Date().toLocaleTimeString()}]</span> [OK] READY</div>
                          </>
                        ) : (
                          <div className="text-slate-500">[--:--:--] [SYS] INITIALIZING_TERMINAL...</div>
                        )}
                       <div className="text-white animate-pulse mt-2">_</div>
                    </div>
                 </div>

              </div>
           </div>
        </div>
        <EntityLogos />
      </div>
    </section>
  );
}
