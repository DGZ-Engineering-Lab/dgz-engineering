"use client";

import { useState, useEffect, useRef } from "react";
import dynamic from "next/dynamic";
import { Globe, Cpu, Radio, ShieldAlert } from "lucide-react";

// Dynamic import of the actual Mapbox component, loaded only on demand
const SpatialIntelligenceDashboard = dynamic(
  () => import("./SpatialIntelligenceDashboard"),
  {
    ssr: false,
    loading: () => (
      <div className="w-full h-full flex flex-col items-center justify-center bg-[#060504] text-cyan-400 font-mono gap-4 select-none">
        <Radio className="w-8 h-8 animate-ping text-cyan-500" />
        <span className="text-[10px] tracking-[0.3em] uppercase font-black animate-pulse">
          Sincronizando Vector Flux 3D...
        </span>
      </div>
    )
  }
);

export default function SovereignMapWrapper() {
  const containerRef = useRef(null);
  const [isInView, setIsInView] = useState(false);
  const [isActivated, setIsActivated] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [consoleLogs, setConsoleLogs] = useState([]);
  const [mapEngine, setMapEngine] = useState("mapbox");

  // Read engine from localStorage on mount
  useEffect(() => {
    if (typeof window !== "undefined") {
      const savedEngine = localStorage.getItem("dgz_map_engine");
      if (savedEngine === "sovereign" || savedEngine === "mapbox") {
        setMapEngine(savedEngine);
      }
    }
  }, []);

  // Boot logs simulation for the high-fidelity tactical skeleton
  const bootLogs = [
    { time: "0.01s", text: "DGZ_SPATIAL_OS: BOOT SEQUENCE ACTIVE", type: "info" },
    { time: "0.08s", text: "POLARS_ENGINE: MULTI-THREAD VECTOR JOIN ACTIVE", type: "info" },
    { time: "0.15s", text: "DUCKDB_CORE: PARQUET SWARM SQL QUERY ENGINE ONLINE", type: "success" },
    { time: "0.22s", text: "POSTGIS_STREAM: LINK ESTABLISHED WITH MEDELLÍN_HQ", type: "success" },
    { time: "0.35s", text: "LADM_COL_V3: TOPOLOGICAL HEALER ENGINE READY", type: "success" },
    { time: "0.48s", text: "SYSTEM_STATUS: WAITING FOR OPERATOR COMPILING TRIGGER...", type: "warn" }
  ];

  // 1. Intersection Observer to defer code chunk parsing
  useEffect(() => {
    if (typeof window === "undefined" || !containerRef.current) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsInView(true);
          observer.disconnect();
        }
      },
      { rootMargin: "300px" } // Load chunk slightly before entering viewport
    );

    observer.observe(containerRef.current);
    return () => observer.disconnect();
  }, []);

  // 2. Telemetry logs printing sequence
  useEffect(() => {
    if (!isInView || isActivated) return;

    let currentLogIdx = 0;
    const interval = setInterval(() => {
      if (currentLogIdx < bootLogs.length) {
        const logEntry = bootLogs[currentLogIdx];
        if (logEntry) {
          setConsoleLogs((prev) => [...prev, logEntry]);
        }
        currentLogIdx++;
      } else {
        clearInterval(interval);
      }
    }, 200);

    return () => clearInterval(interval);
  }, [isInView, isActivated]);

  const handleActivate = () => {
    setIsLoading(true);
    setTimeout(() => {
      setIsActivated(true);
      setIsLoading(false);
    }, 800); // Small premium loading feedback
  };

  return (
    <div
      ref={containerRef}
      className="w-full h-full relative bg-[#050504] flex items-center justify-center overflow-hidden border-glow group"
      style={{ minHeight: "500px" }}
    >
      {/* 3D WebGL Live Dashboard */}
      {isActivated ? (
        <SpatialIntelligenceDashboard
          forceSovereign={mapEngine === "sovereign"}
          onChangeEngine={(eng) => {
            setMapEngine(eng);
            if (typeof window !== "undefined") {
              localStorage.setItem("dgz_map_engine", eng);
            }
          }}
        />
      ) : (
        /* Tactical HUD Skeleton Screen */
        <div className="absolute inset-0 w-full h-full flex flex-col justify-between p-6 select-none bg-[#060605]/95 relative">
          
          {/* Futuristic Cyber Grid Pattern */}
          <div className="absolute inset-0 bg-[linear-gradient(to_right,#080e1a_1px,transparent_1px),linear-gradient(to_bottom,#080e1a_1px,transparent_1px)] bg-[size:24px_24px] pointer-events-none opacity-40" />
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(207,167,88,0.03)_0%,transparent_70%)] pointer-events-none" />
          
          {/* Pulse Concentric Scanning Lines */}
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 pointer-events-none">
            <div className="w-80 h-80 rounded-full border border-cyan-500/10 animate-ping opacity-25" />
            <div className="w-56 h-56 rounded-full border border-cyan-500/5 absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 animate-pulse" />
          </div>

          {/* HUD Header Status */}
          <div className="flex items-center justify-between z-10 w-full">
            <div className="flex items-center gap-2">
              <span className="w-1.5 h-1.5 bg-cyan-400 rounded-full animate-pulse shadow-[0_0_8px_#ddbe7a]"></span>
              <span className="text-[10px] font-mono text-cyan-400 uppercase tracking-widest font-black">
                GEO_HUD // STANDBY_MODE
              </span>
            </div>
            <div className="text-[10px] font-mono text-slate-500 tracking-[0.2em]">
              EPSG:9377 COLOMBIA NATIONAL ORIGIN
            </div>
          </div>

          {/* Center Call to Action & Loading Overlay */}
          <div className="flex flex-col items-center justify-center gap-4 z-10 my-auto text-center">
            <div className="w-16 h-16 rounded-2xl bg-slate-950/80 border border-slate-900 flex items-center justify-center text-xl shadow-2xl relative group overflow-hidden mb-2">
              <div className="absolute inset-0 bg-gradient-to-br from-cyan-500/10 to-transparent opacity-100"></div>
              <Globe className="w-7 h-7 text-cyan-400 animate-pulse-soft" />
            </div>

            <div className="space-y-1.5 max-w-md">
              <h4 className="text-sm font-bold uppercase tracking-widest text-white">
                Motor Geoespacial LADM-COL
              </h4>
              <p className="text-[10px] text-slate-400 font-light leading-relaxed">
                Visualización tridimensional interactiva del catastro predial sincronizada en tiempo real mediante hilos de datos.
              </p>
            </div>

            {/* Indicator showing current selected engine */}
            <div className="text-[10px] font-mono tracking-wider z-10 mt-1">
              {mapEngine === "sovereign" ? (
                <span className="text-amber-400 font-bold flex items-center gap-1.5 bg-amber-500/10 border border-amber-500/25 px-2.5 py-1 rounded shadow-[0_0_15px_rgba(245,158,11,0.05)]">
                  <ShieldAlert className="w-3.5 h-3.5 text-amber-400 animate-pulse shrink-0" />
                  SISTEMA DE SEGURIDAD 2D ACTIVO // EVITA CONGELAMIENTO
                </span>
              ) : (
                <span className="text-cyan-400 font-bold flex items-center gap-1.5 bg-cyan-500/10 border border-cyan-500/25 px-2.5 py-1 rounded shadow-[0_0_15px_rgba(207,167,88,0.05)]">
                  <Globe className="w-3.5 h-3.5 text-cyan-400 animate-pulse shrink-0" />
                  MODO ESTÁNDAR 3D ACTIVO // REQUIERE WEBGL HABILITADO
                </span>
              )}
            </div>

            {/* Premium Selector de Motor de Renderizado */}
            <div className="z-10 mt-2 p-2 bg-slate-950/80 border border-slate-900 rounded-xl max-w-xs w-full flex flex-col gap-1.5">
              <span className="text-[10px] font-mono text-slate-400/80 tracking-widest uppercase font-black text-center">
                SELECCIONAR MOTOR DE RENDIMIENTO
              </span>
              <div className="flex gap-1 bg-black/60 p-0.5 rounded-lg border border-slate-900 font-mono text-[10px] tracking-wider uppercase">
                <button
                  type="button"
                  onClick={() => {
                    setMapEngine("mapbox");
                    if (typeof window !== "undefined") {
                      localStorage.setItem("dgz_map_engine", "mapbox");
                    }
                  }}
                  className={`flex-1 py-1.5 rounded transition-all cursor-pointer font-bold ${
                    mapEngine === "mapbox"
                      ? "bg-cyan-500/20 border border-cyan-500/30 text-cyan-400 shadow-[0_0_10px_rgba(207,167,88,0.25)]"
                      : "text-slate-400 hover:text-white"
                  }`}
                >
                  Mapbox 3D (WebGL)
                </button>
                <button
                  type="button"
                  onClick={() => {
                    setMapEngine("sovereign");
                    if (typeof window !== "undefined") {
                      localStorage.setItem("dgz_map_engine", "sovereign");
                    }
                  }}
                  className={`flex-1 py-1.5 rounded transition-all cursor-pointer font-bold ${
                    mapEngine === "sovereign"
                      ? "bg-amber-500/20 border border-amber-500/30 text-amber-400 shadow-[0_0_10px_rgba(245,158,11,0.25)]"
                      : "text-slate-400 hover:text-white"
                  }`}
                >
                  Soberano 2D (Seguro)
                </button>
              </div>
            </div>

            <button
              onClick={handleActivate}
              disabled={isLoading}
              className={`mt-4 pointer-events-auto px-8 py-3.5 text-slate-950 text-[10px] font-black uppercase tracking-[0.25em] transition-all duration-300 rounded-sm cursor-pointer disabled:opacity-50 relative min-w-[200px] ${
                mapEngine === "sovereign"
                  ? "bg-amber-500 hover:bg-amber-400 shadow-[0_0_30px_rgba(245,158,11,0.2)] hover:shadow-[0_0_40px_rgba(245,158,11,0.5)]"
                  : "bg-cyan-500 hover:bg-cyan-400 shadow-[0_0_30px_rgba(207,167,88,0.2)] hover:shadow-[0_0_40px_rgba(207,167,88,0.5)]"
              }`}
            >
              {isLoading ? (
                <span className="flex items-center justify-center gap-2">
                  <span className="w-2 h-2 border-2 border-slate-950 border-t-transparent rounded-full animate-spin"></span>
                  CARGANDO ENGINE...
                </span>
              ) : mapEngine === "sovereign" ? (
                "ACTIVAR VISOR 2D SEGURO"
              ) : (
                "ACTIVAR VISOR 3D"
              )}
            </button>
          </div>

          {/* HUD Footer Console Telemetry Log */}
          <div className="z-10 w-full border-t border-slate-900/60 pt-3 flex flex-col gap-1 min-h-[55px]">
            {consoleLogs.map((log, index) => log && (
              <div
                key={index}
                className="flex items-center gap-3 text-[10px] font-mono text-slate-500 justify-start select-none"
              >
                <span className="text-[10px] text-slate-600">[{log?.time || ""}]</span>
                <span
                  className={
                    log?.type === "success"
                      ? "text-emerald-400 font-bold"
                      : log?.type === "warn"
                      ? "text-amber-400"
                      : "text-slate-400"
                  }
                >
                  {log?.text || ""}
                </span>
              </div>
            ))}
          </div>

        </div>
      )}
    </div>
  );
}
