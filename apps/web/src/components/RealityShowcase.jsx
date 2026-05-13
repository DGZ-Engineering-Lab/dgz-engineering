"use client";
import { useState, useEffect, useRef } from "react";

const ASPECTS = [
  {
    id: "cadastre",
    title: "Gestión Catastral",
    tag: "LADM-COL V3",
    icon: "🏗️",
    color: "cyan",
    description: "Validación topográfica automática y saneamiento de bases de datos territoriales masivas.",
    metrics: [
      { label: "Slivers Corregidos", value: "1,240" },
      { label: "Traslapes Detectados", value: "0" },
      { label: "Integridad", value: "99.9%" }
    ]
  },
  {
    id: "iot",
    title: "Infraestructura IoT",
    tag: "REAL-TIME SYNC",
    icon: "📡",
    color: "blue",
    description: "Monitoreo de activos físicos y sensores con telemetría satelital integrada.",
    metrics: [
      { label: "Nodos Activos", value: "4,821" },
      { label: "Latencia", value: "14ms" },
      { label: "Uptime", value: "99.99%" }
    ]
  },
  {
    id: "planning",
    title: "Planeación Geo-AI",
    tag: "STRATEGIC HUB",
    icon: "🧠",
    color: "purple",
    description: "Generación de modelos predictivos y heatmaps para el desarrollo urbano inteligente.",
    metrics: [
      { label: "Escenarios Gen.", value: "85" },
      { label: "Precisión IA", value: "94.2%" },
      { label: "ROI Estimado", value: "+22%" }
    ]
  }
];

export default function RealityShowcase() {
  const [activeTab, setActiveTab] = useState(ASPECTS[0]);
  const [isProcessing, setIsProcessing] = useState(false);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    setIsProcessing(true);
    setProgress(0);
    const timer = setInterval(() => {
      setProgress(p => {
        if (p >= 100) {
          setIsProcessing(false);
          clearInterval(timer);
          return 100;
        }
        return p + 2;
      });
    }, 30);
    return () => clearInterval(timer);
  }, [activeTab]);

  return (
    <section className="relative w-full py-32 bg-[#02040a] overflow-hidden border-t border-slate-900">
      {/* Background FX */}
      <div className="absolute inset-0 opacity-[0.02] pointer-events-none" style={{ backgroundImage: 'linear-gradient(90deg, #38BDF8 1px, transparent 1px), linear-gradient(#38BDF8 1px, transparent 1px)', backgroundSize: '40px 40px' }}></div>
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-[1px] bg-gradient-to-r from-transparent via-cyan-500/50 to-transparent"></div>

      <div className="max-w-7xl mx-auto px-6 relative z-10">
        
        <div className="flex flex-col lg:flex-row gap-16 items-start">
          
          {/* Sidebar Controls */}
          <div className="w-full lg:w-1/3 space-y-10">
            <div className="space-y-4">
              <div className="inline-flex items-center gap-2 px-3 py-1 bg-cyan-500/10 border border-cyan-500/20 rounded-full">
                <span className="w-1 h-1 bg-cyan-400 rounded-full animate-ping"></span>
                <span className="text-[10px] font-mono text-cyan-400 uppercase tracking-widest font-bold">Reality Showcase v1.0</span>
              </div>
              <h2 className="text-4xl md:text-5xl font-black text-white tracking-tighter leading-tight">
                Ingeniería en <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-blue-600">Acción</span>
              </h2>
              <p className="text-slate-400 font-light leading-relaxed">
                Selecciona una dimensión operativa para visualizar la ejecución de nuestros protocolos de alto rendimiento.
              </p>
            </div>

            <div className="space-y-3">
              {ASPECTS.map((aspect) => (
                <button
                  key={aspect.id}
                  onClick={() => setActiveTab(aspect)}
                  className={`w-full group flex items-center gap-4 p-5 rounded-2xl border transition-all duration-500 ${
                    activeTab.id === aspect.id 
                    ? `bg-slate-900/80 border-${aspect.color}-500/50 shadow-2xl shadow-${aspect.color}-500/10` 
                    : 'bg-slate-950/40 border-slate-800 hover:border-slate-700'
                  }`}
                >
                  <div className={`w-12 h-12 rounded-xl flex items-center justify-center text-2xl transition-transform duration-500 ${
                    activeTab.id === aspect.id ? 'scale-110' : 'grayscale opacity-50 group-hover:grayscale-0 group-hover:opacity-100'
                  }`} style={{ backgroundColor: activeTab.id === aspect.id ? `var(--tw-color-${aspect.color}-500)` : 'transparent' }}>
                    {aspect.icon}
                  </div>
                  <div className="text-left">
                    <div className={`text-sm font-black transition-colors ${activeTab.id === aspect.id ? 'text-white' : 'text-slate-500 group-hover:text-slate-300'}`}>
                      {aspect.title}
                    </div>
                    <div className="text-[9px] font-mono text-slate-500 tracking-widest uppercase">
                      {aspect.tag}
                    </div>
                  </div>
                </button>
              ))}
            </div>
          </div>

          {/* Visualization Canvas */}
          <div className="w-full lg:w-2/3">
            <div className="relative bg-[#0a0f16] border border-slate-800 rounded-[2.5rem] overflow-hidden shadow-2xl aspect-[16/10] lg:aspect-auto lg:h-[600px]">
              
              {/* Header Bar */}
              <div className="px-6 py-4 border-b border-slate-800 bg-slate-900/50 flex items-center justify-between">
                <div className="flex gap-2">
                  <div className="w-3 h-3 rounded-full bg-red-500/20"></div>
                  <div className="w-3 h-3 rounded-full bg-amber-500/20"></div>
                  <div className="w-3 h-3 rounded-full bg-emerald-500/20"></div>
                </div>
                <div className="text-[10px] font-mono text-slate-500 uppercase tracking-widest flex items-center gap-3">
                   <span className="hidden md:inline">SYSTEM_RUNTIME: {activeTab.id.toUpperCase()}_NODE</span>
                   <span className="w-[1px] h-3 bg-slate-800 hidden md:inline"></span>
                   <span className={isProcessing ? 'text-cyan-400' : 'text-emerald-400'}>
                     {isProcessing ? 'RUNNING_TASKS' : 'STANDBY_NOMINAL'}
                   </span>
                </div>
              </div>

              {/* Simulation Content */}
              <div className="relative h-full p-8 overflow-hidden">
                
                {/* Dynamic Background FX per Aspect */}
                {activeTab.id === 'cadastre' && (
                  <div className="absolute inset-0 flex items-center justify-center opacity-30">
                    <svg viewBox="0 0 200 200" className="w-2/3 h-2/3 stroke-cyan-500/30" fill="none">
                      <path d="M40 40 L160 40 L160 160 L40 160 Z" className="animate-pulse" />
                      <path d="M40 80 L160 80 M40 120 L160 120 M80 40 L80 160 M120 40 L120 160" />
                      {isProcessing && <rect x={40 + progress} y="40" width="2" height="120" fill="cyan" className="shadow-[0_0_10px_cyan]" />}
                    </svg>
                  </div>
                )}

                {activeTab.id === 'iot' && (
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="relative">
                       <div className="w-32 h-32 border border-blue-500/20 rounded-full animate-ping"></div>
                       <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-4 h-4 bg-blue-500 rounded-full shadow-[0_0_20px_blue]"></div>
                       {[0, 72, 144, 216, 288].map(deg => (
                         <div 
                           key={deg}
                           className="absolute top-1/2 left-1/2 h-40 w-[1px] bg-gradient-to-t from-blue-500/50 to-transparent origin-bottom"
                           style={{ transform: `translate(-50%, -100%) rotate(${deg}deg)` }}
                         ></div>
                       ))}
                    </div>
                  </div>
                )}

                {activeTab.id === 'planning' && (
                  <div className="absolute inset-0 p-12">
                    <div className="grid grid-cols-6 grid-rows-6 gap-2 h-full">
                       {Array.from({ length: 36 }).map((_, i) => (
                         <div 
                           key={i} 
                           className="rounded-sm transition-colors duration-1000"
                           style={{ 
                             backgroundColor: isProcessing 
                              ? `rgba(168, 85, 247, ${Math.random() * 0.4})` 
                              : 'rgba(30, 41, 59, 0.2)' 
                           }}
                         ></div>
                       ))}
                    </div>
                  </div>
                )}

                {/* Info Overlays */}
                <div className="relative z-20 h-full flex flex-col justify-between">
                  
                  <div className="max-w-md space-y-6">
                    <div className="space-y-2">
                      <h3 className="text-3xl font-black text-white">{activeTab.title}</h3>
                      <p className="text-slate-400 text-sm font-light leading-relaxed">
                        {activeTab.description}
                      </p>
                    </div>

                    <div className="grid grid-cols-3 gap-4">
                      {activeTab.metrics.map((m, i) => (
                        <div key={i} className="p-4 bg-black/40 border border-slate-800 rounded-2xl backdrop-blur-md">
                          <div className="text-[9px] font-mono text-slate-500 uppercase tracking-widest mb-1">{m.label}</div>
                          <div className="text-lg font-bold text-white transition-all duration-500">
                             {isProcessing ? '---' : m.value}
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Progress / Status Bar */}
                  <div className="w-full space-y-4">
                     <div className="flex justify-between items-end">
                        <div className="space-y-1">
                          <div className="text-[10px] font-mono text-slate-500 uppercase tracking-widest">
                            {isProcessing ? 'Executing Protocol...' : 'Protocol Finished'}
                          </div>
                          <div className="text-xs font-black text-white uppercase tracking-[0.2em]">
                             {activeTab.id}_sync_v2.0
                          </div>
                        </div>
                        <div className="text-2xl font-mono text-white font-black">{progress}%</div>
                     </div>
                     <div className="h-2 w-full bg-slate-900 rounded-full overflow-hidden border border-slate-800">
                        <div 
                          className="h-full transition-all duration-200 ease-out shadow-[0_0_15px_rgba(34,211,238,0.5)]"
                          style={{ 
                            width: `${progress}%`,
                            backgroundColor: activeTab.id === 'cadastre' ? '#22d3ee' : activeTab.id === 'iot' ? '#3b82f6' : '#a855f7'
                          }}
                        ></div>
                     </div>
                  </div>

                </div>

              </div>
              
              {/* Terminal Output */}
              <div className="absolute bottom-6 right-6 w-64 bg-black/90 border border-slate-800 rounded-xl p-4 font-mono text-[9px] hidden md:block">
                 <div className="flex items-center gap-2 mb-3 border-b border-slate-800 pb-2">
                    <span className="w-1.5 h-1.5 bg-emerald-500 rounded-full animate-pulse"></span>
                    <span className="text-slate-400">STDOUT_STREAM</span>
                 </div>
                 <div className="space-y-1 text-cyan-500/80">
                    <div>[SYS] INIT_NODE_{activeTab.id.toUpperCase()}</div>
                    <div>[LOG] MAPPING_COORDS...</div>
                    <div>[LOG] ENCRYPTING_DATA_STREAM</div>
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
