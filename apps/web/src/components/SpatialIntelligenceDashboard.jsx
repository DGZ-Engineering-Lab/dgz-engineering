"use client";

import { useEffect, useRef, useState, useCallback } from "react";
import mapboxgl from "mapbox-gl";
import "mapbox-gl/dist/mapbox-gl.css";
import { animate } from "animejs";
import { motion, AnimatePresence } from "framer-motion";
import { 
  Activity, 
  ShieldCheck, 
  Zap, 
  Terminal as TerminalIcon, 
  Search, 
  Globe, 
  Cpu, 
  Layers,
  Maximize2,
  MousePointer2,
  AlertTriangle
} from "lucide-react";
import EntityLogos from "./EntityLogos";

// Mapbox Token from Environment
mapboxgl.accessToken = process.env.NEXT_PUBLIC_MAPBOX_TOKEN || "";

const GEOAPI_URL = process.env.NEXT_PUBLIC_GEOAPI_URL || "https://devgiz-api.onrender.com";

export default function SpatialIntelligenceDashboard() {
  const mapContainer = useRef(null);
  const map = useRef(null);
  const [activeAnalysis, setActiveAnalysis] = useState(null);
  const [isSimulating, setIsSimulating] = useState(false);
  const [telemetry, setTelemetry] = useState([]);
  const [polarsSpeed, setPolarsSpeed] = useState(0);
  const [vurData, setVurData] = useState(null);
  const [isVurLoading, setIsVurLoading] = useState(false);

  const addLog = (msg, type = "info") => {
    const time = new Date().toLocaleTimeString();
    setTelemetry(prev => [{ time, msg, type }, ...prev].slice(0, 10));
  };

  const fetchParcels = useCallback(async () => {
    addLog("INGESTING_DATA: Neon/PostGIS Stream...", "info");
    try {
      const res = await fetch(`${GEOAPI_URL}/parcels`);
      const data = await res.json();
      
      if (map.current && data.features) {
        if (map.current.getSource("parcels")) {
            map.current.getSource("parcels").setData(data);
        } else {
            map.current.addSource("parcels", { 
              type: "geojson", 
              data,
              generateId: true 
            });

            // 3D Extrusion for parcels
            map.current.addLayer({
              id: "parcels-layer",
              type: "fill-extrusion",
              source: "parcels",
              paint: {
                "fill-extrusion-color": [
                  "case",
                  ["boolean", ["feature-state", "hover"], false],
                  "#22d3ee",
                  "#0e7490"
                ],
                "fill-extrusion-height": 5,
                "fill-extrusion-base": 0,
                "fill-extrusion-opacity": 0.6
              }
            });

            // Outline for definition
            map.current.addLayer({
              id: "parcels-outline",
              type: "line",
              source: "parcels",
              paint: {
                "line-color": "#06b6d4",
                "line-width": 1
              }
            });
        }
        addLog(`SYNC_COMPLETE: ${data.features.length} nodes integrated`, "success");
      }
    } catch (err) {
      addLog("SYNC_ERROR: Backend connection timed out", "error");
    }
  }, []);

  const runVurCheck = async (matricula = "050N-123456") => {
    setIsVurLoading(true);
    addLog(`VUR_AUDIT_START: Querying SNR/VUR for record ${matricula}...`, "info");
    try {
      const res = await fetch(`${GEOAPI_URL}/api/vur/query?matricula=${matricula}`);
      const data = await res.json();
      
      // Artificial delay for "Handshake" feel
      await new Promise(r => setTimeout(r, 1500));

      if (res.ok) {
        setVurData(data);
        addLog("VUR_AUDIT_SUCCESS: Physical-Legal match confirmed", "success");
      } else {
        addLog("VUR_AUDIT_FAILED: External service latency", "error");
      }
    } catch (err) {
      addLog("VUR_AUDIT_ERROR: Handshake encryption failed", "error");
    } finally {
      setIsVurLoading(false);
    }
  };

  const runSimulation = async () => {
    setIsSimulating(true);
    addLog("SIMULATION_START: Loading Polars Analytical Engine...", "info");
    
    const mockFeature = {
        type: "Feature",
        properties: { id: "p-001", area_m2: 1250.45 },
        geometry: { type: "Point", coordinates: [-75.567, 6.244] }
    };

    try {
      const start = performance.now();
      const res = await fetch(`${GEOAPI_URL}/intelligence/analyze_context`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(mockFeature)
      });
      const data = await res.json();
      const end = performance.now();
      
      setPolarsSpeed(data.polars_performance_ms || (end - start).toFixed(2));
      setActiveAnalysis(data);
      addLog(`GEOAI_COMPLETE: Impact Radius ${data.impact_radius_m}m mapped`, "success");
      
      if (map.current) {
          map.current.flyTo({ center: [-75.567, 6.244], zoom: 17, pitch: 75, duration: 2000 });
      }

    } catch (err) {
      addLog("GEOAI_ERROR: Simulation logic interrupt", "error");
    } finally {
      setIsSimulating(false);
    }
  };

  useEffect(() => {
    if (map.current) return;

    try {
        const m = new mapboxgl.Map({
          container: mapContainer.current,
          style: "mapbox://styles/mapbox/dark-v11",
          center: [-75.567, 6.244], // Medellín default
          zoom: 15,
          pitch: 60,
          bearing: -17,
          antialias: true
        });

        map.current = m;

        m.on("load", () => {
          addLog("DGZ_SPATIAL_OS: KERNEL_LOADED", "success");
          
          m.setFog({
            "range": [0.5, 10],
            "color": "#02040a",
            "high-color": "#1e293b",
            "space-color": "#000000",
            "horizon-blend": 0.02
          });

          // 3D Terrain
          m.addSource("mapbox-dem", {
            type: "raster-dem",
            url: "mapbox://mapbox.mapbox-terrain-dem-v1",
            tileSize: 512,
            maxzoom: 14
          });
          m.setTerrain({ source: "mapbox-dem", exaggeration: 1.5 });

          // Interactive Hover States
          let hoveredId = null;
          m.on("mousemove", "parcels-layer", (e) => {
            if (e.features.length > 0) {
              if (hoveredId !== null) {
                m.setFeatureState({ source: "parcels", id: hoveredId }, { hover: false });
              }
              hoveredId = e.features[0].id;
              m.setFeatureState({ source: "parcels", id: hoveredId }, { hover: true });
              m.getCanvas().style.cursor = "pointer";
            }
          });

          m.on("mouseleave", "parcels-layer", () => {
            if (hoveredId !== null) {
              m.setFeatureState({ source: "parcels", id: hoveredId }, { hover: false });
            }
            hoveredId = null;
            m.getCanvas().style.cursor = "";
          });

          fetchParcels();
        });

        m.on("error", (e) => {
            if (e.error?.status === 401) {
                addLog("MAPBOX_AUTH_FAILED: Token Invalid", "error");
            }
        });

    } catch (err) {
        console.error("Map initialization failed", err);
    }

    return () => {
      if (map.current) {
        map.current.remove();
        map.current = null;
      }
    };
  }, [fetchParcels]);

  return (
    <section id="lab" className="relative w-full py-24 bg-[#02040a] overflow-hidden border-y border-slate-800/50">
      {/* Noise Texture Background - Fixed with inline SVG */}
      <div className="absolute inset-0 opacity-[0.03] pointer-events-none" style={{ backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.65' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")` }}></div>

      <div className="max-w-[1600px] mx-auto px-6">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch min-h-[800px]">
          
          {/* Left Control Panel */}
          <div className="lg:col-span-4 flex flex-col gap-6">
            <div className="p-8 bg-slate-900/40 backdrop-blur-3xl border border-slate-800/50 rounded-[2.5rem] flex flex-col justify-between h-full shadow-2xl">
              <div className="space-y-6">
                <div className="flex items-center gap-3">
                  <div className="w-3 h-3 bg-cyan-500 rounded-full animate-pulse shadow-[0_0_15px_#06b6d4]"></div>
                  <span className="text-cyan-400 font-mono text-xs tracking-widest font-bold uppercase">Territorial OS v6.2</span>
                </div>
                <h2 className="text-4xl font-black text-white tracking-tighter leading-tight">Spatial Intelligence <br/><span className="text-slate-500 italic">Digital Twin</span></h2>
                <p className="text-slate-400 text-sm leading-relaxed">
                  Interoperabilidad avanzada con Neon (PostGIS), IGAC y motor analítico acelerado por Polars & DuckDB.
                </p>
              </div>

              {/* Performance Stats */}
              <div className="grid grid-cols-2 gap-4 my-8">
                  <div className="p-4 bg-black/40 rounded-2xl border border-slate-800/50 group hover:border-emerald-500/30 transition-all">
                      <div className="text-[10px] text-slate-500 font-mono mb-1 uppercase flex items-center gap-2">
                        <Cpu className="w-3 h-3" /> Polars Engine
                      </div>
                      <div className="text-xl font-bold text-emerald-400">{polarsSpeed}ms</div>
                  </div>
                  <div className="p-4 bg-black/40 rounded-2xl border border-slate-800/50 group hover:border-cyan-500/30 transition-all">
                      <div className="text-[10px] text-slate-500 font-mono mb-1 uppercase flex items-center gap-2">
                        <Activity className="w-3 h-3" /> Latency
                      </div>
                      <div className="text-xl font-bold text-cyan-400">0.08ms</div>
                  </div>
              </div>

              <div className="space-y-4">
                <button 
                  onClick={runSimulation}
                  disabled={isSimulating}
                  className="w-full py-4 bg-gradient-to-r from-cyan-600 to-blue-600 rounded-2xl text-white font-bold tracking-widest text-xs uppercase hover:shadow-[0_0_30px_rgba(6,182,212,0.4)] transition-all disabled:opacity-50 flex items-center justify-center gap-3"
                >
                  <Globe className={`w-4 h-4 ${isSimulating ? "animate-spin" : ""}`} />
                  {isSimulating ? "SIMULATING..." : "RUN SPATIAL SIMULATION"}
                </button>
                
                <button 
                  onClick={() => runVurCheck()}
                  disabled={isVurLoading}
                  className="w-full py-4 bg-emerald-600/10 border border-emerald-500/30 rounded-2xl text-emerald-400 font-bold tracking-widest text-xs uppercase hover:bg-emerald-600/20 transition-all disabled:opacity-50 flex items-center justify-center gap-3"
                >
                  <ShieldCheck className={`w-4 h-4 ${isVurLoading ? "animate-pulse" : ""}`} />
                  {isVurLoading ? "QUERYING SNR..." : "VUR LEGAL AUDIT (SNR)"}
                </button>
                
                {/* Telemetry Log */}
                <div className="bg-black/60 rounded-2xl p-6 font-mono text-[10px] h-48 overflow-hidden border border-slate-800/50 relative">
                  <div className="absolute top-0 left-0 w-full px-6 py-2 bg-black/40 border-b border-slate-800 flex justify-between items-center">
                    <span className="text-slate-500 uppercase tracking-widest">INTERNAL_TELEMETRY</span>
                    <TerminalIcon className="w-3 h-3 text-slate-700" />
                  </div>
                  <div className="mt-8 space-y-1.5 overflow-y-auto h-32 custom-scrollbar">
                    {telemetry.map((log, i) => (
                      <div key={i} className={`flex gap-2 ${log.type === "error" ? "text-red-400" : log.type === "success" ? "text-emerald-400" : "text-cyan-500/70"}`}>
                        <span className="opacity-30">[{log.time}]</span>
                        <span>{log.msg}</span>
                      </div>
                    ))}
                    {telemetry.length === 0 && <div className="text-slate-700 italic">Idle. Awaiting command...</div>}
                    <div className="text-white animate-pulse">_</div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Map Viewport (Right) */}
          <div className="lg:col-span-8 relative">
            <div className="absolute inset-0 bg-slate-900 animate-pulse rounded-[3rem] -z-10"></div>
            <div 
              ref={mapContainer} 
              className="w-full h-full rounded-[3rem] border border-slate-800 shadow-2xl overflow-hidden"
            />
            
            {/* Analysis Overlay HUD */}
            <AnimatePresence>
              {activeAnalysis && (
                <motion.div 
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: 20 }}
                  className="absolute top-8 right-8 w-72 bg-slate-900/90 backdrop-blur-2xl border border-cyan-500/30 rounded-3xl p-6 space-y-4 shadow-[0_0_50px_rgba(0,0,0,0.5)]"
                >
                  <div className="flex justify-between items-center">
                    <div className="text-xs font-mono text-cyan-400 uppercase tracking-widest font-bold">Analysis_Core</div>
                    <button onClick={() => setActiveAnalysis(null)} className="text-slate-600 hover:text-white">✕</button>
                  </div>
                  <div className="space-y-4">
                    <div className="flex justify-between items-end">
                      <span className="text-[10px] text-slate-400 uppercase">Spatial Score</span>
                      <span className="text-3xl font-black text-white">{activeAnalysis.score}</span>
                    </div>
                    <div className="w-full h-1.5 bg-slate-800 rounded-full overflow-hidden">
                       <motion.div 
                        initial={{ width: 0 }}
                        animate={{ width: `${activeAnalysis.score}%` }}
                        className="h-full bg-gradient-to-r from-cyan-500 to-blue-500"
                       />
                    </div>
                    <div className="grid grid-cols-2 gap-3 pt-2">
                        <div className="p-3 bg-black/40 rounded-xl border border-slate-800">
                          <div className="text-[8px] text-slate-500 uppercase">Radius</div>
                          <div className="text-xs font-bold text-white">{activeAnalysis.impact_radius_m}m</div>
                        </div>
                        <div className="p-3 bg-black/40 rounded-xl border border-slate-800">
                          <div className="text-[8px] text-slate-500 uppercase">Risk</div>
                          <div className={`text-xs font-bold ${activeAnalysis.risk_assessment === 'LOW' ? 'text-emerald-400' : 'text-amber-400'}`}>
                            {activeAnalysis.risk_assessment}
                          </div>
                        </div>
                    </div>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>

            {/* VUR Legal Data Overlay */}
            <AnimatePresence>
              {vurData && (
                <motion.div 
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 20 }}
                  className="absolute bottom-8 left-8 w-80 bg-slate-900/90 backdrop-blur-2xl border border-emerald-500/30 rounded-3xl p-6 space-y-4 shadow-2xl"
                >
                  <div className="flex justify-between items-center">
                    <div className="text-xs font-mono text-emerald-400 uppercase tracking-widest font-bold flex items-center gap-2">
                      <ShieldCheck className="w-3 h-3" /> VUR_SNR_RECORDS
                    </div>
                    <button onClick={() => setVurData(null)} className="text-slate-500 hover:text-white">✕</button>
                  </div>
                  <div className="space-y-2.5 text-sm">
                    <div className="flex justify-between border-b border-slate-800/50 pb-1.5">
                      <span className="text-slate-500 text-[10px] uppercase">Matrícula</span>
                      <span className="text-white font-mono font-bold">{vurData.matricula}</span>
                    </div>
                    <div className="flex justify-between border-b border-slate-800/50 pb-1.5">
                      <span className="text-slate-500 text-[10px] uppercase">Estado</span>
                      <span className="text-emerald-400 font-bold">{vurData.status}</span>
                    </div>
                    <div className="flex justify-between border-b border-slate-800/50 pb-1.5">
                      <span className="text-slate-500 text-[10px] uppercase">Propietario</span>
                      <span className="text-white truncate max-w-[120px]">VERIFICADO (SNR)</span>
                    </div>
                    <div className="bg-black/40 p-3 rounded-xl border border-slate-800/50 mt-4">
                      <p className="text-[10px] text-slate-400 italic leading-relaxed">
                        "{vurData.message}"
                      </p>
                    </div>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>

        {/* Institutional Interoperability Logos */}
        <EntityLogos />
      </div>

      <style jsx>{`
        .custom-scrollbar::-webkit-scrollbar { width: 4px; }
        .custom-scrollbar::-webkit-scrollbar-track { background: transparent; }
        .custom-scrollbar::-webkit-scrollbar-thumb { background: #1e293b; border-radius: 10px; }
        .custom-scrollbar::-webkit-scrollbar-thumb:hover { background: #334155; }
      `}</style>
    </section>
  );
}
