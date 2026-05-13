"use client";
import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import Logo from "../../../components/Logo";

export default function GestureSandboxPage() {
  const videoRef = useRef(null);
  const [isCalibrating, setIsCalibrating] = useState(false);
  const [logs, setLogs] = useState([]);

  useEffect(() => {
    setLogs(["[SYSTEM] Gesture Kernel Initialized", "[AUTH] Hand-Tracking v4.2 Active"]);
    
    // Simulated gesture stream
    const interval = setInterval(() => {
      const actions = ["PANNING_X: +1.2", "ZOOM_FACTOR: 1.05", "ROTATION: 15deg", "LAYER_TOGGLE: CATASTRO"];
      setLogs(prev => [actions[Math.floor(Math.random() * actions.length)], ...prev.slice(0, 5)]);
    }, 2000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="min-h-screen bg-black text-white pt-32 pb-20 relative overflow-hidden">
      {/* HUD Background Overlay */}
      <div className="absolute inset-0 opacity-20 pointer-events-none">
         <div className="absolute top-0 left-0 w-full h-full" style={{ backgroundImage: 'linear-gradient(rgba(0,229,255,0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(0,229,255,0.1) 1px, transparent 1px)', backgroundSize: '50px 50px' }}></div>
      </div>

      <div className="max-w-7xl mx-auto px-6 relative z-10">
        <div className="flex justify-between items-end mb-12">
           <div className="space-y-4">
              <Link href="/" className="text-slate-500 hover:text-cyan-400 transition-colors font-mono text-xs uppercase tracking-widest flex items-center gap-2">
                 ← Terminal Home
              </Link>
              <h1 className="text-6xl font-black tracking-tighter">
                Gesture <span className="text-cyan-400 italic">Sandbox</span>
              </h1>
              <p className="text-slate-500 font-mono text-[10px] uppercase tracking-[0.4em]">Spatial interaction kernel // Beta v0.9.2</p>
           </div>
           <div className="flex items-center gap-4 bg-slate-900/50 p-4 rounded-2xl border border-slate-800">
              <div className="w-12 h-12 rounded-full border-2 border-cyan-500/30 flex items-center justify-center text-cyan-400 animate-pulse">
                 👁️
              </div>
              <div className="text-left">
                 <div className="text-[9px] font-mono text-slate-500 uppercase">Detection Mode</div>
                 <div className="text-xs font-black uppercase">Computer Vision Active</div>
              </div>
           </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
           
           {/* Visualizer Side */}
           <div className="lg:col-span-2 space-y-8">
              <div className="relative aspect-video bg-slate-900 rounded-[2.5rem] border border-slate-800 overflow-hidden shadow-2xl group">
                 {/* Simulated Satellite View */}
                 <div className="absolute inset-0 grayscale opacity-50 contrast-125 group-hover:grayscale-0 transition-all duration-1000">
                    <img src="https://mt1.google.com/vt/lyrs=s&x=75500&y=104000&z=18" className="w-full h-full object-cover" alt="Satellite" />
                 </div>
                 
                 {/* HUD Overlays */}
                 <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                    <div className="w-48 h-48 border border-cyan-500/50 rounded-full animate-ping opacity-20"></div>
                    <div className="absolute top-1/2 left-0 right-0 h-[1px] bg-cyan-500/20"></div>
                    <div className="absolute top-0 bottom-0 left-1/2 w-[1px] bg-cyan-500/20"></div>
                 </div>

                 {/* Hand Tracking Simulator */}
                 <div className="absolute bottom-12 right-12 w-48 h-32 bg-black/80 backdrop-blur-md border border-white/10 rounded-2xl p-4 overflow-hidden">
                    <div className="text-[8px] font-mono text-slate-500 mb-2">GESTURE_FEED</div>
                    <div className="flex flex-col gap-1">
                       {logs.map((log, i) => (
                          <div key={i} className="text-[8px] font-mono text-emerald-400 opacity-80">{log}</div>
                       ))}
                    </div>
                 </div>

                 <div className="absolute top-8 left-8 flex gap-4">
                    <div className="px-4 py-2 bg-black/60 backdrop-blur-xl border border-white/10 rounded-xl">
                       <div className="text-[8px] font-mono text-slate-500">LATENCY</div>
                       <div className="text-xs font-black">12ms</div>
                    </div>
                    <div className="px-4 py-2 bg-black/60 backdrop-blur-xl border border-white/10 rounded-xl">
                       <div className="text-[8px] font-mono text-slate-500">PRECISION</div>
                       <div className="text-xs font-black text-cyan-400">99.2%</div>
                    </div>
                 </div>
              </div>

              <div className="p-8 bg-slate-900/30 border border-slate-800 rounded-[2rem] flex items-center gap-8">
                 <div className="text-4xl">👋</div>
                 <div className="space-y-1">
                    <h3 className="font-bold">¿Cómo funciona?</h3>
                    <p className="text-sm text-slate-400 font-light leading-relaxed">
                      Utilice movimientos de mano frente a su cámara para navegar por mapas de alta resolución. Nuestro motor de IA traduce gestos en comandos de navegación GIS, eliminando la necesidad de periféricos tradicionales.
                    </p>
                 </div>
              </div>
           </div>

           {/* Controls Side */}
           <div className="space-y-8">
              <div className="p-8 bg-slate-900 border border-slate-800 rounded-[2.5rem] space-y-6">
                 <h2 className="text-xl font-bold tracking-tight">Configuración del Nodo</h2>
                 
                 <div className="space-y-4">
                    <div className="p-4 bg-black/50 border border-slate-800 rounded-xl flex justify-between items-center">
                       <span className="text-xs font-mono text-slate-400">SENSIBILIDAD</span>
                       <div className="h-1.5 w-24 bg-slate-800 rounded-full overflow-hidden">
                          <div className="h-full w-2/3 bg-cyan-500"></div>
                       </div>
                    </div>
                    <div className="p-4 bg-black/50 border border-slate-800 rounded-xl flex justify-between items-center">
                       <span className="text-xs font-mono text-slate-400">MAPA BASE</span>
                       <span className="text-[10px] font-black text-cyan-400">GOOGLE_SATELLITE</span>
                    </div>
                    <div className="p-4 bg-black/50 border border-slate-800 rounded-xl flex justify-between items-center">
                       <span className="text-xs font-mono text-slate-400">ESTADO KERNEL</span>
                       <span className="text-[10px] font-black text-emerald-400">ONLINE</span>
                    </div>
                 </div>

                 <button 
                  onClick={() => setIsCalibrating(true)}
                  className="w-full py-4 bg-cyan-600 text-black font-black text-xs rounded-xl hover:bg-cyan-500 transition-all uppercase tracking-widest"
                 >
                    Iniciar Calibración
                 </button>
              </div>

              <div className="p-8 bg-gradient-to-br from-blue-600 to-cyan-600 rounded-[2.5rem] text-black">
                 <h3 className="text-xl font-black mb-2 uppercase tracking-tighter">Enterprise Ready</h3>
                 <p className="text-sm font-medium leading-relaxed opacity-80">
                   Tecnología diseñada para centros de mando y control territorial donde la agilidad es crítica.
                 </p>
                 <div className="mt-6 flex justify-end">
                    <Logo className="w-12 h-12 text-black/20" />
                 </div>
              </div>
           </div>

        </div>

      </div>

      {isCalibrating && (
        <div className="fixed inset-0 z-[100] bg-black/90 backdrop-blur-md flex items-center justify-center p-6">
           <div className="max-w-md w-full p-12 bg-slate-900 border border-cyan-500/30 rounded-[3rem] text-center space-y-8 animate-in zoom-in duration-300">
              <div className="w-24 h-24 rounded-full border-4 border-cyan-500/20 border-t-cyan-500 animate-spin mx-auto"></div>
              <div className="space-y-2">
                 <h2 className="text-2xl font-black uppercase tracking-tighter">Calibrando Sensor</h2>
                 <p className="text-slate-400 text-sm font-light">Mueva su mano lentamente frente a la cámara para sincronizar el kernel de inteligencia gestual.</p>
              </div>
              <button onClick={() => setIsCalibrating(false)} className="px-8 py-3 bg-white text-black font-black text-[10px] rounded-xl uppercase tracking-widest">
                 Cancelar
              </button>
           </div>
        </div>
      )}
    </div>
  );
}
