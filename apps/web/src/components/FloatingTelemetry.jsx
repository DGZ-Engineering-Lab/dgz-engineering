"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronDown, Radio } from "lucide-react";

export default function FloatingTelemetry() {
  const [time, setTime] = useState("");
  const [load, setLoad] = useState(12);
  const [activeNodes, setActiveNodes] = useState(1240);
  const [isMinimized, setIsMinimized] = useState(true);

  useEffect(() => {
    // Simulamos la telemetría directamente en el cliente para mayor fluidez 
    // y evitar errores 404 de rutas de API no configuradas.
    const timer = setInterval(() => {
      const now = new Date();
      setTime(now.toLocaleTimeString("en-GB", { hour12: false }));
      setLoad(Math.floor(Math.random() * (25 - 10) + 10));
      
      // Simular ligeras variaciones en los nodos activos cada ciertos segundos
      if (now.getSeconds() % 5 === 0) {
        setActiveNodes(prev => {
          const variance = Math.floor(Math.random() * 5) - 2;
          return Math.max(1200, Math.min(1500, prev + variance));
        });
      }
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  return (
    <div className="fixed bottom-6 left-6 z-[100] pointer-events-none hidden md:block select-none">
      <AnimatePresence mode="wait">
        {isMinimized ? (
          <motion.button
            key="minimized"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.8 }}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            transition={{ type: "spring", stiffness: 400, damping: 25 }}
            onClick={() => setIsMinimized(false)}
            aria-label="Mostrar panel de telemetría"
            aria-expanded={false}
            className="pointer-events-auto flex items-center gap-2 p-2 px-4 rounded-full bg-slate-950/80 hover:bg-slate-900/90 border border-cyan-500/30 hover:border-cyan-400/50 backdrop-blur-md text-cyan-400 transition-all cursor-pointer shadow-[0_8px_25px_rgba(0,0,0,0.6)] group/tele"
          >
            <Radio className="w-3.5 h-3.5 text-cyan-400 animate-pulse" />
            <span className="text-[9.5px] font-mono tracking-[0.25em] font-black uppercase">TELEMETRÍA_HUD</span>
          </motion.button>
        ) : (
          <motion.div
            key="expanded"
            initial={{ opacity: 0, y: 20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.95 }}
            transition={{ type: "spring", stiffness: 300, damping: 22 }}
            className="pointer-events-auto flex flex-col gap-1 p-5 rounded-2xl bg-[#06060a]/75 border border-cyan-500/25 backdrop-blur-2xl shadow-[0_15px_40px_rgba(0,0,0,0.7)] min-w-[230px] relative overflow-hidden group hover:border-cyan-500/40 transition-colors duration-500"
          >
            {/* Ruido de fondo analógico y rejilla táctica */}
            <div className="absolute inset-0 bg-[linear-gradient(to_right,rgba(255,255,255,0.01)_1px,transparent_1px)] bg-[size:1rem] pointer-events-none" />
            <div className="absolute inset-0 w-full h-full -translate-x-full group-hover:translate-x-full transition-transform duration-[1500ms] ease-out pointer-events-none bg-gradient-to-r from-transparent via-cyan-500/5 to-transparent" />
            
            <div className="flex items-center justify-between gap-6 pb-2.5 border-b border-slate-800/40 relative z-10">
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 rounded-full bg-cyan-400 animate-pulse shadow-[0_0_8px_#22d3ee]" />
                <span className="text-[9.5px] font-mono text-cyan-300 tracking-[0.2em] font-black">SYSTEM_LIVE</span>
              </div>
              <button
                onClick={() => setIsMinimized(true)}
                aria-label="Minimizar panel de telemetría"
                aria-expanded={true}
                className="p-1 hover:bg-white/5 rounded text-slate-500 hover:text-white cursor-pointer transition-all duration-200 hover:scale-110"
                title="Minimizar Telemetría"
              >
                <ChevronDown className="w-4 h-4" />
              </button>
            </div>
            
            <div className="mt-3 space-y-2 relative z-10">
              <div className="flex justify-between gap-8 text-[10px] font-mono text-slate-400 uppercase tracking-wide">
                <span>Uplink_Time</span>
                <span className="text-white font-bold">{time}</span>
              </div>
              <div className="flex justify-between gap-8 text-[10px] font-mono text-slate-400 uppercase tracking-wide">
                <span>Local_Node</span>
                <span className="text-white font-bold">MEDELLÍN_HQ</span>
              </div>
              <div className="flex justify-between gap-8 text-[10px] font-mono text-slate-400 uppercase tracking-wide">
                <span>Core_Load</span>
                <span className="text-white font-bold">{load}%</span>
              </div>
              <div className="flex justify-between gap-8 text-[10px] font-mono text-slate-400 uppercase tracking-wide">
                <span>Encryption</span>
                <span className="text-emerald-400 font-bold tracking-widest">DGZ_SECURE</span>
              </div>
              <div className="flex justify-between gap-8 text-[10px] font-mono text-slate-400 uppercase tracking-wide border-t border-slate-850 pt-2 mt-2">
                <span>Active_Nodes</span>
                <span className="text-cyan-400 font-black">{activeNodes}</span>
              </div>
            </div>
 
            <div className="mt-4 h-1.5 w-full bg-slate-800/40 rounded-full overflow-hidden relative z-10">
              <motion.div 
                initial={{ width: 0 }}
                animate={{ width: `${load * 4}%` }}
                transition={{ type: "spring", stiffness: 80, damping: 15 }}
                className="h-full bg-gradient-to-r from-cyan-500 to-blue-500 shadow-[0_0_10px_rgba(6,182,212,0.6)]"
              />
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
