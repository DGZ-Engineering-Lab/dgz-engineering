"use client";
import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import Logo from "../../../components/Logo";

export default function GestureSandboxPage() {
  const [isCalibrating, setIsCalibrating] = useState(false);
  const [logs, setLogs] = useState([]);
  const [activeCoords, setActiveCoords] = useState("4.6486° N, 74.0592° W");

  const videoRef = useRef(null);
  const [hasCamera, setHasCamera] = useState(false);

  useEffect(() => {
    async function startCamera() {
      try {
        const stream = await navigator.mediaDevices.getUserMedia({ video: true });
        if (videoRef.current) {
          videoRef.current.srcObject = stream;
          setHasCamera(true);
        }
      } catch (err) {
        console.error("Error accessing camera:", err);
        setLogs(prev => ["[ERROR] Camera Access Denied", ...prev]);
      }
    }
    
    startCamera();
    setLogs(["[SYSTEM] Gesture Kernel v4.2 Initialized", "[AUTH] Neural Link Established", "[SENSOR] DepthMap Active"]);
    
    // Simulated gesture stream
    const interval = setInterval(() => {
      const actions = [
        "PANNING_X: +1.22", 
        "ZOOM_FACTOR: 1.05x", 
        "ROTATION: 15.2deg", 
        "LAYER_TOGGLE: CATASTRO_IGAC",
        "FETCHING_METADATA: BOGOTÁ_NODE",
        "SYNC: 0.02ms"
      ];
      setLogs(prev => [actions[Math.floor(Math.random() * actions.length)], ...prev.slice(0, 6)]);
      
      // Randomly change coords slightly to simulate panning
      setActiveCoords(`${(4.6486 + (Math.random() - 0.5) * 0.01).toFixed(4)}° N, ${(74.0592 + (Math.random() - 0.5) * 0.01).toFixed(4)}° W`);
    }, 1500);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="min-h-screen bg-[#02040a] text-white pt-32 pb-20 relative overflow-hidden">
      {/* HUD Background Overlay */}
      <div className="absolute inset-0 opacity-[0.03] pointer-events-none">
         <div className="absolute top-0 left-0 w-full h-full" style={{ backgroundImage: 'linear-gradient(rgba(0,229,255,0.2) 1px, transparent 1px), linear-gradient(90deg, rgba(0,229,255,0.2) 1px, transparent 1px)', backgroundSize: '40px 40px' }}></div>
      </div>

      <div className="max-w-7xl mx-auto px-6 relative z-10">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-16 gap-8">
           <div className="space-y-4">
              <Link href="/" className="text-slate-500 hover:text-cyan-400 transition-colors font-mono text-[10px] uppercase tracking-[0.4em] flex items-center gap-2">
                 ← Terminal Home
              </Link>
              <h1 className="text-7xl md:text-8xl font-black tracking-tighter leading-none">
                Gesture <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-blue-600 italic">Sandbox</span>
              </h1>
              <div className="flex items-center gap-4">
                 <span className="px-3 py-1 bg-cyan-500/10 border border-cyan-500/20 text-cyan-400 font-mono text-[10px] tracking-widest rounded uppercase">BETA v0.9.8</span>
                 <p className="text-slate-500 font-mono text-[10px] uppercase tracking-[0.4em]">Spatial interaction kernel // active_node: {activeCoords}</p>
              </div>
           </div>
           
           <div className="flex items-center gap-6 bg-slate-900/30 p-6 rounded-[2rem] border border-slate-800 backdrop-blur-xl">
              <div className="relative">
                 <div className="w-16 h-16 rounded-full border-2 border-cyan-500/20 flex items-center justify-center text-3xl animate-pulse">
                    👁️
                 </div>
                 <div className="absolute inset-0 border-2 border-cyan-400 rounded-full animate-ping opacity-20"></div>
              </div>
              <div className="text-left space-y-1">
                 <div className="text-[9px] font-mono text-slate-500 uppercase tracking-widest">Detection Engine</div>
                 <div className="text-sm font-black uppercase text-white tracking-tight">Computer Vision [ACTIVE]</div>
                 <div className="flex items-center gap-2">
                    <div className="w-1.5 h-1.5 bg-emerald-500 rounded-full animate-pulse"></div>
                    <span className="text-[9px] font-mono text-emerald-500 uppercase">Synchronized with NeuralLink</span>
                 </div>
              </div>
        </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
           
           {/* Visualizer Side */}
           <div className="lg:col-span-8 space-y-8">
              <div className="relative aspect-video bg-black rounded-[3rem] border border-slate-800 overflow-hidden shadow-[0_0_50px_rgba(0,0,0,0.5)] group">
                 
                 {/* Map Content - Dynamic Satellite Simulation */}
                 <div className="absolute inset-0 grayscale group-hover:grayscale-0 transition-all duration-1000 scale-105 group-hover:scale-100">
                    <img src="https://mt1.google.com/vt/lyrs=s&x=75500&y=104000&z=18" className="w-full h-full object-cover opacity-60" alt="Satellite" />
                 </div>

                 {/* Camera Feed Overlay */}
                 <div className="absolute inset-0 z-10 overflow-hidden pointer-events-none mix-blend-screen opacity-40">
                    <video 
                      ref={videoRef} 
                      autoPlay 
                      playsInline 
                      muted 
                      className={`w-full h-full object-cover transition-opacity duration-1000 ${hasCamera ? 'opacity-100' : 'opacity-0'}`}
                    />
                 </div>
                 
                 {/* Interactive HUD Overlays */}
                 <div className="absolute inset-0 pointer-events-none">
                    {/* Crosshair */}
                    <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-32 h-32 flex items-center justify-center">
                       <div className="absolute w-full h-[1px] bg-cyan-500/30"></div>
                       <div className="absolute h-full w-[1px] bg-cyan-500/30"></div>
                       <div className="w-4 h-4 border border-cyan-400"></div>
                    </div>

                    {/* Scanning Circle */}
                    <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[400px] h-[400px] border border-cyan-500/10 rounded-full animate-[spin_20s_linear_infinite]">
                       <div className="absolute top-0 left-1/2 w-2 h-2 bg-cyan-500 rounded-full -translate-x-1/2"></div>
                    </div>

                    {/* Corner Telemetry */}
                    <div className="absolute top-10 left-10 space-y-4">
                       <div className="bg-black/60 backdrop-blur-xl border border-white/10 p-4 rounded-xl">
                          <div className="text-[8px] font-mono text-slate-500 uppercase mb-1">Processing Latency</div>
                          <div className="text-lg font-black text-white">0.02<span className="text-xs text-cyan-400">ms</span></div>
                       </div>
                       <div className="bg-black/60 backdrop-blur-xl border border-white/10 p-4 rounded-xl">
                          <div className="text-[8px] font-mono text-slate-500 uppercase mb-1">Neural Precision</div>
                          <div className="text-lg font-black text-emerald-400">99.98<span className="text-xs text-white">%</span></div>
                       </div>
                    </div>

                    <div className="absolute top-10 right-10 flex flex-col items-end gap-2">
                       <div className="px-3 py-1 bg-red-500/20 border border-red-500/30 rounded text-[9px] font-black text-red-400 animate-pulse">REC // LIVE_FEED</div>
                       <div className="px-3 py-1 bg-black/60 border border-white/10 rounded text-[9px] font-mono text-slate-400">BOGOTÁ_D.C_DISTRICT_V</div>
                    </div>
                 </div>

                 {/* Console Stream Overlay */}
                 <div className="absolute bottom-10 left-10 w-64 h-40 bg-black/80 backdrop-blur-2xl border border-white/10 rounded-[2rem] p-6 overflow-hidden">
                    <div className="text-[8px] font-mono text-cyan-500 mb-4 tracking-widest font-black uppercase">Gesture_Kernel_Log</div>
                    <div className="flex flex-col gap-2">
                       {logs.map((log, i) => (
                          <div key={i} className={`text-[8px] font-mono transition-all duration-500 ${i === 0 ? 'text-white' : 'text-slate-500'}`}>
                             {i === 0 && <span className="text-cyan-400 mr-2">&gt;</span>}
                             {log}
                          </div>
                       ))}
                    </div>
                 </div>

                 {/* Action Bar */}
                 <div className="absolute bottom-10 right-10 flex gap-3">
                    <button className="px-6 py-3 bg-white/10 backdrop-blur-xl border border-white/20 rounded-xl text-[10px] font-black uppercase tracking-widest hover:bg-white hover:text-black transition-all">Save Node</button>
                    <button className="px-6 py-3 bg-cyan-600 border border-cyan-400/50 rounded-xl text-[10px] font-black uppercase tracking-widest hover:bg-cyan-500 transition-all">Export GIS</button>
                 </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                 <div className="p-8 bg-slate-900/30 border border-slate-800 rounded-[2.5rem] space-y-4">
                    <div className="w-12 h-12 rounded-2xl bg-cyan-500/10 flex items-center justify-center text-2xl">⚡</div>
                    <h3 className="text-xl font-bold">Interacción Fluida</h3>
                    <p className="text-sm text-slate-400 font-light leading-relaxed">
                       Navegue por el territorio sin tocar el teclado. Nuestra tecnología de visión artificial detecta micro-gestos para un control total del entorno SIG.
                    </p>
                 </div>
                 <div className="p-8 bg-slate-900/30 border border-slate-800 rounded-[2.5rem] space-y-4">
                    <div className="w-12 h-12 rounded-2xl bg-emerald-500/10 flex items-center justify-center text-2xl">🌍</div>
                    <h3 className="text-xl font-bold">Datos Oficiales</h3>
                    <p className="text-sm text-slate-400 font-light leading-relaxed">
                       Integrado directamente con los recursos de **Colombia en Mapas** y repositorios de datos abiertos del **IGAC** para máxima fidelidad territorial.
                    </p>
                 </div>
              </div>
           </div>

           {/* Controls Side */}
           <div className="lg:col-span-4 space-y-8">
              <div className="p-10 bg-slate-900 border border-slate-800 rounded-[3rem] space-y-10 shadow-2xl relative overflow-hidden">
                 <div className="absolute top-0 right-0 w-32 h-32 bg-cyan-500/5 rounded-full blur-3xl"></div>
                 <h2 className="text-2xl font-black tracking-tight leading-none">Console <span className="text-cyan-500">Settings</span></h2>
                 
                 <div className="space-y-6">
                    <div className="space-y-3">
                       <div className="flex justify-between text-[10px] font-mono text-slate-500 uppercase tracking-widest">
                          <span>Hand Sensitivity</span>
                          <span className="text-white">85%</span>
                       </div>
                       <div className="h-1.5 w-full bg-slate-800 rounded-full overflow-hidden">
                          <div className="h-full w-[85%] bg-gradient-to-r from-cyan-500 to-blue-600"></div>
                       </div>
                    </div>

                    <div className="p-5 bg-black/50 border border-slate-800 rounded-2xl flex justify-between items-center group hover:border-cyan-500/30 transition-all">
                       <span className="text-[10px] font-mono text-slate-400 uppercase tracking-widest">Active Source</span>
                       <span className="text-xs font-black text-cyan-400 tracking-tight">IGAC_SAT_2024</span>
                    </div>

                    <div className="p-5 bg-black/50 border border-slate-800 rounded-2xl flex justify-between items-center group hover:border-emerald-500/30 transition-all">
                       <span className="text-[10px] font-mono text-slate-400 uppercase tracking-widest">Kernel Mode</span>
                       <div className="flex items-center gap-2">
                          <div className="w-2 h-2 bg-emerald-500 rounded-full animate-pulse"></div>
                          <span className="text-xs font-black text-emerald-400 tracking-tight">STABLE</span>
                       </div>
                    </div>
                 </div>

                 <button 
                  onClick={() => setIsCalibrating(true)}
                  className="group relative w-full py-6 bg-white text-black font-black text-[10px] rounded-[1.5rem] hover:bg-cyan-500 transition-all uppercase tracking-[0.2em] overflow-hidden"
                 >
                    <span className="relative z-10">Re-Calibrar Sensor</span>
                    <div className="absolute inset-0 bg-cyan-400 translate-y-full group-hover:translate-y-0 transition-transform duration-300"></div>
                 </button>
              </div>

              {/* Stakeholder Value Card */}
              <div className="p-10 bg-gradient-to-br from-blue-600 via-cyan-600 to-emerald-600 rounded-[3rem] text-black shadow-2xl relative group hover:-translate-y-2 transition-transform duration-500">
                 <div className="absolute top-6 right-6">
                    <Logo className="w-16 h-16 text-black/10" />
                 </div>
                 <div className="space-y-6 relative z-10">
                    <div className="px-3 py-1 bg-black/10 border border-black/10 rounded-full text-[10px] font-black uppercase tracking-widest w-fit">Decision Guide</div>
                    <h3 className="text-3xl font-black leading-none tracking-tighter">¿Por qué usar gestos?</h3>
                    <p className="text-sm font-medium leading-relaxed opacity-90">
                       En situaciones de alta presión o presentaciones ejecutivas, la interacción natural permite una navegación mucho más dinámica y profesional, eliminando la barrera entre el experto y los datos.
                    </p>
                 </div>
              </div>
           </div>

        </div>

      </div>

      {isCalibrating && (
        <div className="fixed inset-0 z-[100] bg-black/95 backdrop-blur-xl flex items-center justify-center p-6 animate-in fade-in duration-500">
           <div className="max-w-md w-full p-16 bg-[#0a0f16] border border-cyan-500/30 rounded-[4rem] text-center space-y-10 shadow-[0_0_100px_rgba(0,229,255,0.1)]">
              <div className="relative w-32 h-32 mx-auto">
                 <div className="absolute inset-0 border-4 border-cyan-500/10 rounded-full"></div>
                 <div className="absolute inset-0 border-4 border-cyan-500 border-t-transparent rounded-full animate-spin"></div>
                 <div className="absolute inset-0 flex items-center justify-center text-4xl">👋</div>
              </div>
              <div className="space-y-4">
                 <h2 className="text-3xl font-black uppercase tracking-tighter leading-none">Sincronizando Sensor</h2>
                 <p className="text-slate-400 text-sm font-light leading-relaxed">Mueva su mano lentamente en círculos frente a la cámara para que la IA reconozca su patrón biométrico.</p>
              </div>
              <button onClick={() => setIsCalibrating(false)} className="px-10 py-4 bg-white/5 border border-white/10 text-white font-black text-[10px] rounded-2xl hover:bg-white hover:text-black transition-all uppercase tracking-widest">
                 Finalizar Calibración
              </button>
           </div>
        </div>
      )}
    </div>
  );
}
