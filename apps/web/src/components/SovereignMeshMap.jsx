"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Layers, ShieldCheck, Zap, AlertTriangle, Cpu } from "lucide-react";

export default function SovereignMeshMap({ onSelectParcel }) {
  const [selectedId, setSelectedId] = useState("P-102");
  const [isHealing, setIsHealing] = useState(false);
  const [isHealed, setIsHealed] = useState(false);
  const [consoleLogs, setConsoleLogs] = useState([
    "SYS // Visor catográfico soberano cargado [MODO_OFFLINE].",
    "SYS // Rejilla digital de Medellín CTM12 inicializada en plano local."
  ]);

  const parcels = [
    {
      id: "P-101",
      name: "Parque de los Deseos",
      path: "M 30 30 L 130 30 L 130 130 L 30 130 Z",
      center: { x: 80, y: 80 },
      area: "1,200 m²",
      status: "CLEAN",
      desc: "Espacio Público Concertado",
      ladm: "LA_Predio (Bien Público)"
    },
    {
      id: "P-102",
      name: "Edificio de Ingeniería",
      path: isHealed ? "M 130 30 L 230 40 L 230 140 L 130 130 Z" : "M 110 30 L 230 40 L 230 140 L 110 130 Z",
      center: { x: 170, y: 85 },
      area: "1,150 m²",
      status: isHealed ? "CLEAN" : "DIRTY",
      desc: isHealed ? "Predio Conciliado por Snapping" : "Traslape Geométrico con P-101",
      ladm: "LA_Predio (Conflicto de Límite)"
    },
    {
      id: "P-103",
      name: "Estación de Metro",
      path: "M 30 140 L 130 130 L 120 230 L 20 230 Z",
      center: { x: 75, y: 180 },
      area: "980 m²",
      status: "CLEAN",
      desc: "Infraestructura del Sistema Integrado",
      ladm: "LA_ObraCivil (Servidumbre)"
    },
    {
      id: "P-104",
      name: "Jardín Botánico Norte",
      path: "M 130 130 L 240 140 L 240 240 L 120 230 Z",
      center: { x: 180, y: 185 },
      area: "1,420 m²",
      status: "CLEAN",
      desc: "Reserva de Conservación y Protección",
      ladm: "LA_RestriccionTerritorial (Ambiental)"
    }
  ];

  const selectedParcel = parcels.find(p => p.id === selectedId) || parcels[1];

  useEffect(() => {
    if (onSelectParcel) {
      onSelectParcel(selectedParcel);
    }
  }, [selectedId, isHealed, onSelectParcel, selectedParcel]);

  const executeSnapping = () => {
    if (isHealing || isHealed) return;
    setIsHealing(true);
    
    if (window.dgzSynth) {
      try { window.dgzSynth.playScanAlert(); } catch (e) {}
    }

    setConsoleLogs(prev => [
      ...prev,
      "[HEALER] Iniciando reconciliación espacial...",
      "[CTM12] Calculando tolerancias de colindancia (Resol. 1040/2023)...",
      "[SHAPELY] Ejecutando snapped vertices check..."
    ]);

    setTimeout(() => {
      setIsHealing(false);
      setIsHealed(true);
      setConsoleLogs(prev => [
        ...prev,
        "[SHAPELY] Auto-snapping completado con éxito a 0.05m.",
        "[XTF] Exportando modelo LADM-COL v3.0 Válido.",
        "[SUCCESS] Base de datos conciliada al 100%."
      ]);
      
      if (window.dgzSynth) {
        try { window.dgzSynth.playSuccess(); } catch (e) {}
      }
    }, 1500);
  };

  const resetHeal = () => {
    setIsHealed(false);
    setConsoleLogs([
      "SYS // Visor catográfico soberano cargado [MODO_OFFLINE].",
      "SYS // Rejilla digital CTM12 inicializada en plano local.",
      "[INFO] Simulación reiniciada. Inconsistencia de traslape restaurada."
    ]);
    if (window.dgzSynth) {
      try { window.dgzSynth.playClick(); } catch (e) {}
    }
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch w-full">
      {/* Visual Map Frame */}
      <div className="lg:col-span-7 p-6 md:p-8 bg-slate-950/40 glass-card-premium border-glow rounded-[2rem] flex flex-col justify-between min-h-[480px] relative overflow-hidden">
        <div className="flex items-center justify-between border-b border-slate-900 pb-4 mb-4 relative z-10">
          <div className="space-y-1">
            <span className="text-[9px] font-mono text-cyan-400 uppercase tracking-widest flex items-center gap-1.5 font-bold">
              <span className="w-1.5 h-1.5 bg-cyan-400 rounded-full animate-pulse shadow-[0_0_8px_#22d3ee]"></span>
              Sovereign Grid Fallback
            </span>
            <h3 className="text-sm font-bold text-white uppercase tracking-wider">Visor Catastral Offline</h3>
          </div>
          <span className="px-2 py-0.5 border border-cyan-500/25 bg-cyan-500/5 text-cyan-400 text-[9.5px] font-mono tracking-widest rounded uppercase">
            LOCAL ENGINE ACTIVE
          </span>
        </div>

        {/* Vector SVG Blueprint */}
        <div className="flex-grow bg-slate-950/80 rounded-2xl border border-slate-900/60 relative overflow-hidden flex items-center justify-center p-6 min-h-[260px] group">
          {/* Subtle grid background */}
          <div className="absolute inset-0 opacity-[0.04] pointer-events-none bg-[linear-gradient(to_right,rgba(0,229,255,0.2)_1px,transparent_1px),linear-gradient(to_bottom,rgba(0,229,255,0.2)_1px,transparent_1px)] bg-[size:25px_25px]" />
          
          {/* Scanline beam */}
          {isHealing && (
            <motion.div
              initial={{ y: "-100%" }}
              animate={{ y: "100%" }}
              transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
              className="absolute left-0 w-full h-[2px] bg-cyan-400/80 shadow-[0_0_12px_#06b6d4] z-10 pointer-events-none"
            />
          )}

          <svg viewBox="0 0 280 260" className="w-full max-w-[280px] h-auto drop-shadow-[0_15px_30px_rgba(0,0,0,0.5)]">
            {parcels.map((p) => {
              const isSelected = p.id === selectedId;
              const isError = p.status === "DIRTY";
              
              let fill = "rgba(15, 23, 42, 0.35)";
              let stroke = "rgba(71, 85, 105, 0.4)";
              
              if (isSelected) {
                fill = isError ? "rgba(239, 68, 68, 0.2)" : "rgba(6, 182, 212, 0.25)";
                stroke = isError ? "#ef4444" : "#06b6d4";
              }

              return (
                <g key={p.id} onClick={() => {
                  setSelectedId(p.id);
                  if (window.dgzSynth) {
                    try { window.dgzSynth.playClick(); } catch (e) {}
                  }
                }} className="cursor-pointer">
                  <motion.path
                    d={p.path}
                    fill={fill}
                    stroke={stroke}
                    strokeWidth={isSelected ? 2 : 1.2}
                    className="transition-all duration-500 hover:fill-slate-800/35"
                  />
                  
                  {/* Glowing anchor dots */}
                  {isSelected && p.id === "P-102" && !isHealed && (
                    <circle cx="110" cy="30" r="3.5" className="fill-red-500 stroke-slate-950 stroke-1 animate-pulse" />
                  )}
                  {isSelected && p.id === "P-102" && isHealed && (
                    <circle cx="130" cy="30" r="3.5" className="fill-emerald-400 stroke-slate-950 stroke-1 animate-pulse" />
                  )}

                  <text
                    x={p.center.x}
                    y={p.center.y}
                    className="fill-slate-400 font-mono text-[9.5px] tracking-widest font-black pointer-events-none select-none text-center"
                    textAnchor="middle"
                  >
                    {p.id}
                  </text>
                </g>
              );
            })}
          </svg>

          {/* Environmental River Zone */}
          <div className="absolute bottom-4 left-4 flex flex-col gap-1 text-[9.5px] font-mono text-slate-500">
            <div className="flex items-center gap-1.5">
              <div className="w-2.5 h-1 bg-cyan-500" />
              <span>Conforme Snapping</span>
            </div>
            <div className="flex items-center gap-1.5">
              <div className="w-2.5 h-1 bg-red-500 animate-pulse" />
              <span>Traslape de Linderos</span>
            </div>
          </div>
        </div>

        {/* Local Console Terminal */}
        <div className="mt-4 bg-[#010205] border border-slate-900 rounded-xl p-4 font-mono text-[9px] text-slate-400 space-y-1.5 relative overflow-hidden min-h-[90px] flex flex-col justify-between">
          <div className="flex items-center justify-between border-b border-slate-900 pb-1 mb-1">
            <span className="text-[9.5px] tracking-widest uppercase font-bold text-slate-500 flex items-center gap-1.5">
              <Cpu className="w-3 h-3 text-cyan-400" />
              Offline Terminal Stream
            </span>
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse"></span>
          </div>
          <div className="flex-grow space-y-1 max-h-[50px] overflow-y-auto pr-2">
            {consoleLogs.slice(-3).map((log, idx) => {
              let color = "text-slate-400";
              if (log.includes("[SUCCESS]")) color = "text-emerald-400 font-bold";
              if (log.includes("[HEALER]")) color = "text-cyan-400";
              if (log.includes("[WARNING]")) color = "text-amber-400 font-bold";
              return (
                <p key={idx} className={color}>
                  &gt; {log}
                </p>
              );
            })}
          </div>
        </div>
      </div>

      {/* Control Panel Frame */}
      <div className="lg:col-span-5 p-6 md:p-8 bg-slate-950/40 glass-card-premium border-glow rounded-[2rem] flex flex-col justify-between">
        <div className="space-y-6">
          <div className="flex justify-between items-center text-xs font-mono text-slate-500 font-bold">
            <span>PREDIO: {selectedParcel.id}</span>
            <span className={`px-2 py-0.5 rounded-full text-[9.5px] border font-bold ${
              selectedParcel.status === "CLEAN" 
                ? "bg-emerald-500/10 text-emerald-400 border-emerald-500/30" 
                : "bg-red-500/10 text-red-400 border-red-500/30 animate-pulse"
            }`}>
              {selectedParcel.status === "CLEAN" ? "CONFORME" : "TRASLAPE DETECTADO"}
            </span>
          </div>

          <div className="space-y-3">
            <div>
              <span className="text-[9.5px] font-mono text-slate-500 uppercase tracking-widest">Identidad Predial</span>
              <h4 className="text-sm font-bold text-white tracking-tight">{selectedParcel.name}</h4>
              <p className="text-[10px] text-cyan-400 font-mono italic">{selectedParcel.ladm}</p>
            </div>

            <div className="pt-3 border-t border-slate-900 grid grid-cols-2 gap-4 font-mono text-[9px]">
              <div>
                <span className="text-slate-500 uppercase block tracking-wider">Superficie Terreno</span>
                <span className="text-slate-200 font-black text-xs">{selectedParcel.area}</span>
              </div>
              <div>
                <span className="text-slate-500 uppercase block tracking-wider">Estado Técnico</span>
                <span className={`font-black text-xs ${selectedParcel.status === "CLEAN" ? "text-emerald-400" : "text-red-400"}`}>
                  {selectedParcel.status === "CLEAN" ? "Snapping OK" : "Solape de Linderos"}
                </span>
              </div>
            </div>

            <div className="pt-3 border-t border-slate-900 space-y-1">
              <span className="text-[9.5px] font-mono text-slate-500 uppercase tracking-widest block">Metodología / FMI</span>
              <p className="text-[10.5px] text-slate-400 leading-normal font-light">{selectedParcel.desc}</p>
            </div>
          </div>
        </div>

        <div className="pt-6 border-t border-slate-900 mt-6 space-y-3">
          <span className="text-[9.5px] font-mono text-slate-500 uppercase tracking-widest block">
            Acción Saneamiento
          </span>
          
          <div className="flex gap-3">
            {selectedParcel.id === "P-102" && !isHealed ? (
              <button
                onClick={executeSnapping}
                disabled={isHealing}
                className="flex-1 py-4 bg-white text-black hover:bg-cyan-500 hover:text-black hover:shadow-[0_0_20px_rgba(6,182,212,0.3)] transition-all duration-300 text-[10px] font-black uppercase tracking-[0.2em] rounded-xl flex items-center justify-center gap-2 cursor-pointer disabled:opacity-50"
              >
                <Zap className="w-3.5 h-3.5" />
                <span>Sanar Colindancia</span>
              </button>
            ) : (
              <button
                onClick={resetHeal}
                className="flex-1 py-4 bg-slate-900 text-slate-400 hover:text-white border border-slate-800 rounded-xl text-[10px] font-black uppercase tracking-[0.2em] transition-all cursor-pointer flex items-center justify-center gap-2"
              >
                Restablecer Lote
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
