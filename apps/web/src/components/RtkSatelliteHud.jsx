"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Radio, Cpu, ShieldCheck } from "lucide-react";

export default function RtkSatelliteHud() {
  const [pdop, setPdop] = useState(1.1);
  const isLocked = pdop <= 1.5;
  const activeSats = Math.max(4, Math.round(16 - pdop * 3));

  const handlePdopChange = (e) => {
    const val = parseFloat(e.target.value);
    setPdop(val);
    
    if (window.dgzSynth) {
      try {
        if (val <= 1.5) {
          window.dgzSynth.playClick();
        } else {
          window.dgzSynth.playError();
        }
      } catch (err) {}
    }
  };

  const precision = pdop <= 1.5 
    ? `${(pdop * 1.5).toFixed(1)} cm` 
    : `${(pdop * 0.8).toFixed(2)} m`;

  return (
    <div className="p-6 bg-slate-950/60 border border-slate-900 rounded-3xl space-y-6 shadow-2xl relative overflow-hidden">
      {/* Blueprint grid background */}
      <div className="absolute inset-0 opacity-[0.02] pointer-events-none bg-[linear-gradient(to_right,rgba(255,255,255,0.1)_1px,transparent_1px),linear-gradient(to_bottom,rgba(255,255,255,0.1)_1px,transparent_1px)] bg-[size:15px_15px]" />
      
      <div className="flex items-center justify-between border-b border-slate-900 pb-3 relative z-10">
        <div className="space-y-0.5">
          <span className="text-[8px] font-mono text-cyan-400 uppercase tracking-widest block font-bold">
            RTK GNSS Geodetic System
          </span>
          <h4 className="text-xs font-bold text-white uppercase tracking-wider">
            Consola de Bloqueo Satelital
          </h4>
        </div>
        <span className={`px-2 py-0.5 rounded text-[7px] font-mono font-bold uppercase tracking-widest ${
          isLocked 
            ? "bg-emerald-500/10 text-emerald-400 border border-emerald-500/20" 
            : "bg-amber-500/10 text-amber-400 border border-amber-500/20 animate-pulse"
        }`}>
          {isLocked ? "RTK FIXED" : "RTK FLOAT"}
        </span>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-center relative z-10">
        
        {/* Left: Dynamic Satellite Orbit SVG */}
        <div className="aspect-square bg-slate-900/50 border border-slate-900 rounded-2xl flex items-center justify-center p-4 relative overflow-hidden min-h-[160px]">
          
          {/* Neon orbital tracks */}
          <svg viewBox="0 0 160 160" className="w-full h-full">
            {/* Center earth */}
            <circle cx="80" cy="80" r="16" className="fill-slate-950 stroke-cyan-500/30 stroke-1" />
            <circle cx="80" cy="80" r="10" className="fill-cyan-500/10 stroke-cyan-400/40 stroke-0.5" />
            
            {/* Orbits */}
            <circle cx="80" cy="80" r="38" fill="none" stroke="rgba(6, 182, 212, 0.12)" strokeWidth="1" strokeDasharray="3,2" />
            <circle cx="80" cy="80" r="60" fill="none" stroke="rgba(6, 182, 212, 0.08)" strokeWidth="1" />
            
            {/* Pulsing signal beams back to earth */}
            {isLocked && (
              <g opacity="0.3">
                <line x1="30" y1="40" x2="80" y2="80" stroke="#22d3ee" strokeWidth="0.8" className="animate-pulse" />
                <line x1="130" y1="40" x2="80" y2="80" stroke="#22d3ee" strokeWidth="0.8" />
                <line x1="80" y1="20" x2="80" y2="80" stroke="#22d3ee" strokeWidth="0.8" />
                <line x1="120" y1="120" x2="80" y2="80" stroke="#22d3ee" strokeWidth="0.8" />
              </g>
            )}

            {/* Orbiting Satellites */}
            <g>
              {/* Sat 1 */}
              <motion.circle
                cx="80" cy="80" r="4"
                className="fill-cyan-400 stroke-slate-950 stroke-0.5"
                animate={{ 
                  cx: [80, 118, 80, 42, 80],
                  cy: [42, 80, 118, 80, 42]
                }}
                transition={{ duration: 10, repeat: Infinity, ease: "linear" }}
              />
              {/* Sat 2 */}
              <motion.circle
                cx="80" cy="80" r="3.5"
                className="fill-emerald-400 stroke-slate-950 stroke-0.5"
                animate={{ 
                  cx: [80, 20, 80, 140, 80],
                  cy: [20, 80, 140, 80, 20]
                }}
                transition={{ duration: 14, repeat: Infinity, ease: "linear" }}
              />
              {/* Sat 3 */}
              <motion.circle
                cx="80" cy="80" r="3.5"
                className="fill-cyan-400 stroke-slate-950 stroke-0.5"
                animate={{ 
                  cx: [140, 80, 20, 80, 140],
                  cy: [80, 140, 80, 20, 80]
                }}
                transition={{ duration: 18, repeat: Infinity, ease: "linear" }}
              />
            </g>
          </svg>

          {/* Holographic HUD label */}
          <span className="absolute bottom-2 left-2 text-[7px] font-mono text-slate-500 uppercase tracking-widest">
            Constelación GNSS activa
          </span>
        </div>

        {/* Right: Telemetry Readout & Sliders */}
        <div className="space-y-4 flex flex-col justify-center">
          
          <div className="grid grid-cols-2 gap-4 border-b border-slate-900/60 pb-3">
            <div>
              <span className="text-[8px] font-mono text-slate-500 block uppercase tracking-wider">Factor PDOP</span>
              <span className={`text-sm font-black font-mono tracking-tight ${isLocked ? "text-cyan-400" : "text-amber-400"}`}>
                {pdop.toFixed(1)}
              </span>
            </div>
            <div>
              <span className="text-[8px] font-mono text-slate-500 block uppercase tracking-wider">Precisión RTK</span>
              <span className={`text-sm font-black font-mono tracking-tight ${isLocked ? "text-emerald-400" : "text-amber-400"}`}>
                {precision}
              </span>
            </div>
          </div>

          <div className="space-y-2">
            <div className="flex justify-between items-center text-[9px] font-mono font-bold uppercase tracking-wider">
              <span className="text-slate-400">Satélites en Línea</span>
              <span className="text-white">{activeSats} / 12 Activos</span>
            </div>
            <div className="flex items-center gap-1">
              {Array.from({ length: 12 }).map((_, i) => (
                <div 
                  key={i} 
                  className={`h-2 flex-1 rounded-sm transition-all duration-300 ${
                    i < activeSats 
                      ? isLocked 
                        ? "bg-cyan-500 shadow-[0_0_6px_#06b6d4]" 
                        : "bg-amber-500 shadow-[0_0_6px_#f59e0b]"
                      : "bg-slate-900"
                  }`} 
                />
              ))}
            </div>
          </div>

          {/* Interactive Dial Slider */}
          <div className="space-y-2 pt-2">
            <div className="flex justify-between items-center text-[8px] font-mono text-slate-500 uppercase tracking-widest">
              <label htmlFor="rtk-pdop">Ajustar Señal (PDOP)</label>
              <span>1.0 (Óptimo) - 4.5 (Inestable)</span>
            </div>
            <input id="rtk-pdop" aria-valuetext={`PDOP ${pdop}`}
              type="range"
              min="0.8"
              max="4.5"
              step="0.1"
              value={pdop}
              onChange={handlePdopChange}
              className="w-full h-1 bg-slate-900 border border-slate-800 rounded-lg appearance-none cursor-pointer accent-cyan-400"
            />
          </div>

        </div>

      </div>
    </div>
  );
}
