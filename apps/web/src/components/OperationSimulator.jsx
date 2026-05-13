"use client";
import { useState, useEffect, useRef } from "react";

export default function OperationSimulator() {
  const [logs, setLogs] = useState([]);
  const [activeNodes, setActiveNodes] = useState([]);
  const [metrics, setMetrics] = useState({
    precision: 99.8,
    processing: 0,
    nodes: 0
  });
  const scrollRef = useRef(null);

  // Simulation Data
  const regions = ["CUNDINAMARCA_HUB", "ANTIOQUIA_NODE", "VALLE_SENSORS", "ATLANTICO_GATE"];
  const tasks = ["LADM_VALIDATION", "GEOSPATIAL_INDEXING", "TOPOLOGICAL_FIX", "IOT_SYNC"];

  useEffect(() => {
    const interval = setInterval(() => {
      // Add Log
      const region = regions[Math.floor(Math.random() * regions.length)];
      const task = tasks[Math.floor(Math.random() * tasks.length)];
      const coord = `${(Math.random() * 10 + 4).toFixed(4)}°N, ${(Math.random() * 10 + 74).toFixed(4)}°W`;
      
      const newLog = {
        id: Date.now(),
        time: new Date().toLocaleTimeString('en-GB', { hour12: false, fractionalSecondDigits: 2 }),
        msg: `[${region}] >> EXEC: ${task} >> ${coord}`,
        type: Math.random() > 0.8 ? 'alert' : 'info'
      };

      setLogs(prev => [...prev.slice(-15), newLog]);
      
      // Update Metrics
      setMetrics(prev => ({
        precision: (99.7 + Math.random() * 0.2).toFixed(2),
        processing: Math.floor(Math.random() * 100),
        nodes: Math.floor(Math.random() * 500 + 1200)
      }));

      // Active Nodes Simulation
      setActiveNodes(prev => {
        const next = [...prev];
        if (next.length > 8) next.shift();
        next.push({ x: Math.random() * 100, y: Math.random() * 100 });
        return next;
      });

    }, 800);

    return () => clearInterval(interval);
  }, []);

  return (
    <section className="relative w-full py-24 bg-[#02040a] overflow-hidden border-y border-slate-800/50">
      {/* Background Grid Accent */}
      <div className="absolute inset-0 opacity-[0.03] pointer-events-none" 
           style={{ backgroundImage: 'radial-gradient(#38BDF8 1px, transparent 1px)', backgroundSize: '30px 30px' }}></div>

      <div className="max-w-7xl mx-auto px-6 relative z-10">
        
        <div className="mb-16 text-center space-y-4">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-cyan-500/20 bg-cyan-500/5">
            <span className="w-1.5 h-1.5 bg-cyan-400 rounded-full animate-pulse"></span>
            <span className="text-[10px] font-mono text-cyan-400 uppercase tracking-widest">Live System Simulation</span>
          </div>
          <h2 className="text-4xl md:text-5xl font-black text-white tracking-tighter">
            Ecosistema en <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-blue-500">Tiempo Real</span>
          </h2>
          <p className="text-slate-400 max-w-2xl mx-auto text-sm md:text-base font-light">
            Visualiza cómo nuestra infraestructura procesa, valida y despliega capas territoriales complejas con latencia cero.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
          
          {/* Left Pane: Terminal / Logs */}
          <div className="lg:col-span-5 flex flex-col h-[500px] bg-[#0a0f16] border border-slate-800 rounded-2xl overflow-hidden shadow-2xl group hover:border-cyan-500/30 transition-colors">
            <div className="px-4 py-3 border-b border-slate-800 bg-slate-900/50 flex items-center justify-between">
              <div className="flex gap-1.5">
                <div className="w-2.5 h-2.5 rounded-full bg-slate-700"></div>
                <div className="w-2.5 h-2.5 rounded-full bg-slate-700"></div>
                <div className="w-2.5 h-2.5 rounded-full bg-slate-700"></div>
              </div>
              <span className="text-[10px] font-mono text-slate-500 uppercase tracking-widest">INGESTION_PIPELINE.LOG</span>
            </div>
            <div className="flex-1 p-6 font-mono text-[11px] overflow-hidden space-y-1.5" ref={scrollRef}>
              {logs.map((log) => (
                <div key={log.id} className={`flex gap-3 transition-opacity duration-300 ${log.type === 'alert' ? 'text-amber-400' : 'text-cyan-400/80'}`}>
                  <span className="text-slate-600">[{log.time}]</span>
                  <span className="break-all">{log.msg}</span>
                </div>
              ))}
              <div className="text-white animate-pulse">_</div>
            </div>
            <div className="px-4 py-3 border-t border-slate-800 bg-[#050505] flex justify-between items-center text-[9px] font-mono text-slate-500 uppercase tracking-widest">
              <span>Status: Synchronized</span>
              <span className="text-cyan-400">9.4 GB/s</span>
            </div>
          </div>

          {/* Right Pane: Visual Visualization */}
          <div className="lg:col-span-7 grid grid-rows-2 gap-8">
            
            {/* Map Simulation */}
            <div className="bg-[#0a0f16] border border-slate-800 rounded-2xl relative overflow-hidden group hover:border-blue-500/30 transition-colors">
              <div className="absolute inset-0 opacity-20">
                <svg viewBox="0 0 100 100" className="w-full h-full stroke-slate-800" fill="none">
                  <path d="M0 20 L100 20 M0 40 L100 40 M0 60 L100 60 M0 80 L100 80" />
                  <path d="M20 0 L20 100 M40 0 L40 100 M60 0 L60 100 M80 0 L80 100" />
                </svg>
              </div>
              
              <div className="absolute inset-0 flex items-center justify-center">
                 <div className="w-64 h-64 border border-cyan-500/10 rounded-full animate-ping opacity-20"></div>
                 <div className="w-96 h-96 border border-blue-500/5 rounded-full animate-[ping_3s_linear_infinite] opacity-10"></div>
              </div>

              {activeNodes.map((node, i) => (
                <div 
                  key={i}
                  className="absolute w-2 h-2 bg-cyan-400 rounded-full shadow-[0_0_10px_#22d3ee]"
                  style={{ left: `${node.x}%`, top: `${node.y}%`, opacity: (i + 1) / activeNodes.length }}
                ></div>
              ))}

              <div className="absolute top-4 right-4 flex flex-col gap-2">
                 <div className="px-3 py-1.5 bg-black/80 border border-slate-800 rounded text-[9px] font-mono text-slate-400 uppercase">
                    Precision: <span className="text-cyan-400">{metrics.precision}%</span>
                 </div>
                 <div className="px-3 py-1.5 bg-black/80 border border-slate-800 rounded text-[9px] font-mono text-slate-400 uppercase">
                    Active_Nodes: <span className="text-white">{metrics.nodes}</span>
                 </div>
              </div>

              <div className="absolute bottom-4 left-4">
                 <div className="text-[10px] font-mono text-slate-500 uppercase tracking-widest flex items-center gap-2">
                    <span className="w-2 h-2 bg-blue-500 animate-pulse rounded-full"></span> 
                    Scanning Core Topology...
                 </div>
              </div>
            </div>

            {/* Bottom Row Dashboard Stats */}
            <div className="grid grid-cols-2 gap-8">
               <div className="bg-[#0a0f16] border border-slate-800 rounded-2xl p-6 flex flex-col justify-between group hover:border-purple-500/30 transition-colors overflow-hidden relative">
                  <div className="absolute -right-4 -bottom-4 w-20 h-20 bg-purple-500/5 rounded-full blur-2xl group-hover:bg-purple-500/10 transition-all"></div>
                  <span className="text-[10px] font-mono text-slate-500 uppercase tracking-widest">Neural Load</span>
                  <div className="text-4xl font-black text-white my-2">{metrics.processing}%</div>
                  <div className="w-full h-1 bg-slate-800 rounded-full overflow-hidden">
                    <div className="h-full bg-purple-500 transition-all duration-700" style={{ width: `${metrics.processing}%` }}></div>
                  </div>
               </div>

               <div className="bg-[#0a0f16] border border-slate-800 rounded-2xl p-6 flex flex-col justify-between group hover:border-emerald-500/30 transition-colors overflow-hidden relative">
                  <div className="absolute -right-4 -bottom-4 w-20 h-20 bg-emerald-500/5 rounded-full blur-2xl group-hover:bg-emerald-500/10 transition-all"></div>
                  <span className="text-[10px] font-mono text-slate-500 uppercase tracking-widest">System Health</span>
                  <div className="text-4xl font-black text-emerald-400 my-2">NOMINAL</div>
                  <div className="text-[9px] font-mono text-slate-500 uppercase">Uptime: 99.9999%</div>
               </div>
            </div>

          </div>

        </div>

        {/* Aspects Legend */}
        <div className="mt-16 grid grid-cols-2 md:grid-cols-4 gap-4">
          {[
            { label: "Catastro Digital", color: "bg-cyan-500" },
            { label: "Analítica Espacial", color: "bg-blue-500" },
            { label: "Infraestructura Cloud", color: "bg-purple-500" },
            { label: "Sincronización IoT", color: "bg-emerald-500" }
          ].map((item, i) => (
            <div key={i} className="flex items-center gap-3 px-6 py-4 bg-slate-900/40 border border-slate-800/50 rounded-xl">
               <div className={`w-2 h-2 rounded-full ${item.color}`}></div>
               <span className="text-xs font-mono text-slate-400 uppercase tracking-widest">{item.label}</span>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}
