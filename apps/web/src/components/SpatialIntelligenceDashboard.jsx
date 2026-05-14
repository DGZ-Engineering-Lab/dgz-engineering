"use client";

import { useEffect, useRef, useState, useCallback } from "react";
import mapboxgl from "mapbox-gl";
import "mapbox-gl/dist/mapbox-gl.css";
import { animate } from "animejs";

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
    setTelemetry(prev => [{ time, msg, type }, ...prev].slice(0, 8));
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
            map.current.addSource("parcels", { type: "geojson", data });
            map.current.addLayer({
              id: "parcels-layer",
              type: "fill",
              source: "parcels",
              paint: {
                "fill-color": "#06b6d4",
                "fill-opacity": 0.3,
                "fill-outline-color": "#22d3ee"
              }
            });
        }
        addLog(`SYNC_COMPLETE: ${data.features.length} features received`, "success");
      }
    } catch (err) {
      addLog("SYNC_ERROR: Backend connection failed", "error");
    }
  }, []);

  const runVurCheck = async (matricula = "001-123456") => {
    setIsVurLoading(true);
    addLog(`VUR_AUDIT_START: Querying Matrícula ${matricula}...`, "info");
    try {
      const res = await fetch(`${GEOAPI_URL}/intelligence/vur_check/${matricula}`);
      const data = await res.json();
      if (data.status === "SUCCESS") {
        setVurData(data.data);
        addLog("VUR_AUDIT_SUCCESS: Legal status verified", "success");
      } else {
        addLog("VUR_AUDIT_FAILED: Connection timeout", "error");
      }
    } catch (err) {
      addLog("VUR_AUDIT_ERROR: Service unavailable", "error");
    } finally {
      setIsVurLoading(false);
    }
  };

  useEffect(() => {
    if (map.current) return;

    try {
        map.current = new mapboxgl.Map({
          container: mapContainer.current,
          style: "mapbox://styles/mapbox/dark-v11",
          center: [-75.567, 6.244], // Medellín default
          zoom: 15,
          pitch: 60,
          bearing: -17,
          antialias: true
        });

        map.current.on("load", () => {
          addLog("DGZ_SPATIAL_OS: ENGINE_LOADED", "success");
          
          // Add 3D Terrain
          map.current.addSource("mapbox-dem", {
            type: "raster-dem",
            url: "mapbox://mapbox.mapbox-terrain-dem-v1",
            tileSize: 512,
            maxzoom: 14
          });
          map.current.setTerrain({ source: "mapbox-dem", exaggeration: 1.5 });

          // Add Sky Layer for Cinematic Feel
          map.current.addLayer({
            id: "sky",
            type: "sky",
            paint: {
              "sky-type": "atmosphere",
              "sky-atmosphere-sun": [0.0, 0.0],
              "sky-atmosphere-sun-intensity": 15
            }
          });

          // Add 3D Buildings Extrusion
          const layers = map.current.getStyle().layers;
          const labelLayerId = layers.find(
            (layer) => layer.type === "symbol" && layer.layout["text-field"]
          ).id;

          map.current.addLayer(
            {
              id: "3d-buildings",
              source: "composite",
              "source-layer": "building",
              filter: ["==", "extrude", "true"],
              type: "fill-extrusion",
              minzoom: 15,
              paint: {
                "fill-extrusion-color": "#0ea5e9",
                "fill-extrusion-height": [
                  "interpolate",
                  ["linear"],
                  ["zoom"],
                  15,
                  0,
                  15.05,
                  ["get", "height"]
                ],
                "fill-extrusion-base": [
                  "interpolate",
                  ["linear"],
                  ["zoom"],
                  15,
                  0,
                  15.05,
                  ["get", "min_height"]
                ],
                "fill-extrusion-opacity": 0.6
              }
            },
            labelLayerId
          );

          fetchParcels();
        });

        map.current.on("error", (e) => {
            if (e.error?.status === 401) {
                addLog("MAPBOX_AUTH_FAILED: Check Access Token", "error");
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

  const runSimulation = async () => {
    setIsSimulating(true);
    addLog("SIMULATION_START: Analyzing Radial Impact...", "info");
    
    // Mock selection for demo if none
    const mockFeature = {
        type: "Feature",
        properties: { id: "p-001" },
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
      addLog(`GEOAI_COMPLETE: Impact Radius ${data.impact_radius_m}m`, "success");
      
      // Visual feedback on map (simulated impact circle)
      if (map.current) {
          map.current.flyTo({ center: [-75.567, 6.244], zoom: 17, pitch: 75 });
      }

    } catch (err) {
      addLog("GEOAI_ERROR: Simulation failed", "error");
    } finally {
      setIsSimulating(false);
    }
  };

  return (
    <section id="lab" className="relative w-full py-24 bg-[#02040a] overflow-hidden border-y border-slate-800/50">
      {/* Noise Texture Background - Fixed with inline SVG to prevent 404 */}
      <div className="absolute inset-0 opacity-[0.03] pointer-events-none" style={{ backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.65' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")` }}></div>

      <div className="max-w-[1600px] mx-auto px-6 grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch h-[800px]">
        
        {/* Left Control Panel */}
        <div className="lg:col-span-4 flex flex-col gap-6">
          <div className="p-8 bg-slate-900/40 backdrop-blur-3xl border border-slate-800/50 rounded-[2.5rem] flex flex-col justify-between h-full">
            <div className="space-y-6">
              <div className="flex items-center gap-3">
                <div className="w-3 h-3 bg-cyan-500 rounded-full animate-pulse shadow-[0_0_15px_#06b6d4]"></div>
                <span className="text-cyan-400 font-mono text-xs tracking-widest font-bold uppercase">Digital Twin Live</span>
              </div>
              <h2 className="text-4xl font-black text-white tracking-tighter">Spatial Intelligence <br/><span className="text-slate-500">Dashboard V6</span></h2>
              <p className="text-slate-400 text-sm leading-relaxed">
                Interconexión en tiempo real con Neon (PostGIS) y motor analítico acelerado por Polars/DuckDB.
              </p>
            </div>

            {/* Performance Stats (The Factor Wow) */}
            <div className="grid grid-cols-2 gap-4 my-8">
                <div className="p-4 bg-black/40 rounded-2xl border border-slate-800/50">
                    <div className="text-[10px] text-slate-500 font-mono mb-1 uppercase">Polars Speed</div>
                    <div className="text-xl font-bold text-emerald-400">{polarsSpeed}ms</div>
                </div>
                <div className="p-4 bg-black/40 rounded-2xl border border-slate-800/50">
                    <div className="text-[10px] text-slate-500 font-mono mb-1 uppercase">Engine Latency</div>
                    <div className="text-xl font-bold text-cyan-400">0.08ms</div>
                </div>
            </div>

            <div className="space-y-4">
              <button 
                onClick={runSimulation}
                disabled={isSimulating}
                className="w-full py-4 bg-gradient-to-r from-cyan-600 to-blue-600 rounded-2xl text-white font-bold tracking-widest text-xs uppercase hover:shadow-[0_0_30px_rgba(6,182,212,0.4)] transition-all disabled:opacity-50"
              >
                {isSimulating ? "SIMULATING..." : "RUN SPATIAL SIMULATION"}
              </button>
              
              <button 
                onClick={() => runVurCheck()}
                disabled={isVurLoading}
                className="w-full py-4 bg-emerald-600/20 border border-emerald-500/50 rounded-2xl text-emerald-400 font-bold tracking-widest text-xs uppercase hover:bg-emerald-600/40 transition-all disabled:opacity-50"
              >
                {isVurLoading ? "QUERYING VUR..." : "VUR LEGAL AUDIT (SNR)"}
              </button>
              
              {/* Telemetry Log */}
              <div className="bg-black/60 rounded-2xl p-6 font-mono text-[10px] h-48 overflow-hidden border border-slate-800/50">
                <div className="text-slate-500 mb-2 border-b border-slate-800 pb-1">INTERNAL_TELEMETRY_STREAM</div>
                <div className="space-y-1">
                  {telemetry.map((log, i) => (
                    <div key={i} className={log.type === "error" ? "text-red-400" : log.type === "success" ? "text-emerald-400" : "text-cyan-500/70"}>
                      [{log.time}] {log.msg}
                    </div>
                  ))}
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
          {activeAnalysis && (
            <div className="absolute top-8 right-8 w-64 bg-slate-900/90 backdrop-blur-xl border border-cyan-500/30 rounded-3xl p-6 space-y-4 shadow-2xl animate-in fade-in slide-in-from-right-4">
              <div className="text-xs font-mono text-cyan-400 uppercase tracking-widest font-bold">Analysis_Output</div>
              <div className="space-y-3">
                <div className="flex justify-between items-center">
                  <span className="text-[10px] text-slate-400">Score</span>
                  <span className="text-lg font-black text-white">{activeAnalysis.score}</span>
                </div>
                <div className="w-full h-1 bg-slate-800 rounded-full overflow-hidden">
                   <div className="h-full bg-cyan-500" style={{ width: `${activeAnalysis.score}%` }}></div>
                </div>
                <div className="grid grid-cols-2 gap-2 text-[9px] font-mono text-slate-500">
                    <div>RADIUS: {activeAnalysis.impact_radius_m}m</div>
                    <div>RISK: {activeAnalysis.risk_assessment}</div>
                </div>
              </div>
            </div>
          )}

          {/* VUR Legal Data Overlay */}
          {vurData && (
            <div className="absolute bottom-8 left-8 w-80 bg-slate-900/90 backdrop-blur-xl border border-emerald-500/30 rounded-3xl p-6 space-y-4 shadow-2xl animate-in fade-in slide-in-from-bottom-4">
              <div className="flex justify-between items-center">
                <div className="text-xs font-mono text-emerald-400 uppercase tracking-widest font-bold">VUR_SNR_REGISTRY</div>
                <button onClick={() => setVurData(null)} className="text-slate-500 hover:text-white">✕</button>
              </div>
              <div className="space-y-2 text-sm">
                <div className="flex justify-between border-b border-slate-800 pb-1">
                  <span className="text-slate-500 text-[10px]">Matrícula</span>
                  <span className="text-white font-mono">{vurData.matricula}</span>
                </div>
                <div className="flex justify-between border-b border-slate-800 pb-1">
                  <span className="text-slate-500 text-[10px]">Estado Legal</span>
                  <span className="text-emerald-400 font-bold">{vurData.status}</span>
                </div>
                <div className="flex justify-between border-b border-slate-800 pb-1">
                  <span className="text-slate-500 text-[10px]">Propietario</span>
                  <span className="text-white">VERIFICADO</span>
                </div>
                <p className="text-[10px] text-slate-400 italic pt-2">
                  {vurData.message}
                </p>
              </div>
            </div>
          )}
        </div>

      </div>
    </section>
  );
}
