"use client";
<<<<<<< HEAD

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
=======
import React, { useEffect, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { 
  Globe, 
  Cpu, 
  Zap, 
  ShieldCheck, 
  Activity, 
  Layers, 
  Search,
  Maximize2,
  Terminal as TerminalIcon,
  MousePointer2,
  AlertTriangle
} from "lucide-react";
import anime from "animejs";
import mapboxgl from "mapbox-gl";
import "mapbox-gl/dist/mapbox-gl.css";

const SpatialIntelligenceDashboard = () => {
  const mapContainer = useRef(null);
  const map = useRef(null);
  const [activeParcel, setActiveParcel] = useState(null);
  const [isSimulating, setIsSimulating] = useState(false);
  const [logs, setLogs] = useState([]);
  const [parcelsData, setParcelsData] = useState(null);
  const [mapLoaded, setMapLoaded] = useState(false);

  const MAPBOX_TOKEN = "pk.eyJ1IjoiYWxidXNnIiwiYSI6ImNsZnM5bWlqYjAxbmozY3B0Z2R2Z2R2Z2IifQ"; // Public token for demo

  const addLog = (msg) => {
    setLogs(prev => [...prev.slice(-12), { id: Date.now(), msg }]);
  };

  const GEOAPI_URL = process.env.NEXT_PUBLIC_GEOAPI_URL || "http://localhost:8000";

  const fetchParcels = async () => {
    try {
      addLog("Initializing Spatial Data Pipeline...");
      const res = await fetch(`${GEOAPI_URL}/parcels`);
      const data = await res.json();
      setParcelsData(data);
      
      if (map.current && data.features.length > 0) {
        if (map.current.getSource("parcels")) {
          map.current.getSource("parcels").setData(data);
        } else {
          map.current.addSource("parcels", {
            type: "geojson",
            data: data
          });

          map.current.addLayer({
            id: "parcels-fill",
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

          map.current.addLayer({
            id: "parcels-outline",
            type: "line",
            source: "parcels",
            paint: {
              "line-color": "#06b6d4",
              "line-width": 2
            }
          });
        }

        addLog(`Synchronized ${data.features.length} high-fidelity nodes from PostGIS.`);

        // Click interaction
        map.current.on("click", "parcels-fill", async (e) => {
          if (e.features.length === 0) return;
          
          const feature = e.features[0];
          const props = feature.properties;
          
          // Start Simulation UI
          setIsSimulating(true);
          addLog(`Targeting Parcel: ${props.codigo || "ID-" + props.objectid}`);
          
          try {
            // Call Real Backend Analysis
            const res = await fetch(`${GEOAPI_URL}/intelligence/analyze_context`, {
              method: "POST",
              headers: { "Content-Type": "application/json" },
              body: JSON.stringify({
                type: "Feature",
                properties: props,
                geometry: feature.geometry
              })
            });
            
            const analysis = await res.json();
            
            // Artificial delay for "Scanning" feel
            await new Promise(r => setTimeout(r, 1200));
            
            setActiveParcel({
              id: analysis.parcel_id,
              area: props.area_m2 ? `${props.area_m2.toFixed(2)} m²` : "N/A",
              score: analysis.spatial_score,
              risk: analysis.risk_level,
              infra: analysis.infrastructure_proximity,
              compliance: analysis.urban_compliance,
              recommendations: analysis.recommendations,
              simulation: analysis.simulation_data
            });

            // Update Simulation Visuals (Heatmap Nodes)
            if (analysis.simulation_data && analysis.simulation_data.heatmap_nodes) {
              const heatmapSource = {
                type: "FeatureCollection",
                features: analysis.simulation_data.heatmap_nodes.map(node => ({
                  type: "Feature",
                  geometry: { type: "Point", coordinates: [node.lon, node.lat] },
                  properties: { intensity: node.intensity }
                }))
              };

              if (map.current.getSource("simulation-nodes")) {
                map.current.getSource("simulation-nodes").setData(heatmapSource);
              } else {
                map.current.addSource("simulation-nodes", {
                  type: "geojson",
                  data: heatmapSource
                });
                
                map.current.addLayer({
                  id: "simulation-heat",
                  type: "heatmap",
                  source: "simulation-nodes",
                  paint: {
                    "heatmap-weight": ["get", "intensity"],
                    "heatmap-intensity": 1,
                    "heatmap-color": [
                      "interpolate",
                      ["linear"],
                      ["heatmap-density"],
                      0, "rgba(0,0,255,0)",
                      0.2, "rgb(0,255,255)",
                      0.4, "rgb(0,255,0)",
                      0.6, "rgb(255,255,0)",
                      1, "rgb(255,0,0)"
                    ],
                    "heatmap-radius": 30,
                    "heatmap-opacity": 0.7
                  }
                });
              }
            }

            addLog("Digital Twin simulation finalized.");
            addLog(`ROI Optimization: ${analysis.simulation_data.connectivity_improvement} detected.`);
            
          } catch (err) {
            addLog("CRITICAL: Analysis Engine timeout.");
          } finally {
            setIsSimulating(false);
          }
        });

        // Hover effect
        let hoveredStateId = null;
        map.current.on("mousemove", "parcels-fill", (e) => {
          if (e.features.length > 0) {
            if (hoveredStateId !== null) {
              map.current.setFeatureState(
                { source: "parcels", id: hoveredStateId },
                { hover: false }
              );
            }
            hoveredStateId = e.features[0].id;
            map.current.setFeatureState(
              { source: "parcels", id: hoveredStateId },
              { hover: true }
            );
            map.current.getCanvas().style.cursor = "pointer";
          }
        });

        map.current.on("mouseleave", "parcels-fill", () => {
          if (hoveredStateId !== null) {
            map.current.setFeatureState(
              { source: "parcels", id: hoveredStateId },
              { hover: false }
            );
          }
          hoveredStateId = null;
          map.current.getCanvas().style.cursor = "";
        });
      }
    } catch (err) {
      addLog("ERROR: Spatial OS connection failed.");
    }
  };

  // Initialize Map
  useEffect(() => {
    if (map.current) return;
    
    mapboxgl.accessToken = MAPBOX_TOKEN;
    const mapInstance = new mapboxgl.Map({
      container: mapContainer.current,
      style: "mapbox://styles/mapbox/dark-v11",
      center: [-74.0721, 4.5981], // Bogota center
      zoom: 15,
      pitch: 60,
      bearing: -20,
      antialias: true
    });

    map.current = mapInstance;

    mapInstance.on("load", () => {
      setMapLoaded(true);
      addLog("DevGiz Spatial Kernel v6.1 Initialized.");
      
      mapInstance.setFog({
        "range": [0.5, 10],
        "color": "#02040a",
        "high-color": "#1e293b",
        "space-color": "#000000",
        "horizon-blend": 0.02
      });

      fetchParcels();
    });
>>>>>>> origin/main

    return () => {
      if (map.current) {
        map.current.remove();
        map.current = null;
      }
    };
<<<<<<< HEAD
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
=======
  }, []);


  return (
    <section className="py-24 bg-[#02040a] relative overflow-hidden">
      {/* Background Grid */}
      <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-20 brightness-50"></div>
      
      <div className="max-w-7xl mx-auto px-6 relative z-10">
        <div className="mb-12">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-500/10 border border-cyan-500/20 text-cyan-400 text-xs font-mono tracking-widest uppercase mb-4">
            <Activity className="w-3 h-3 animate-pulse" /> Territorial OS: Digital Twin
          </div>
          <h2 className="text-4xl md:text-6xl font-black text-white leading-tight">
            Inteligencia <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-blue-600">Espacial de Élite</span>
          </h2>
          <p className="text-slate-400 mt-4 max-w-2xl font-medium">
            Interoperabilidad avanzada entre IGAC, PostGIS y Motores de Simulación 2027.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          
          {/* Left: Map Viewport */}
          <div className="lg:col-span-2 relative">
            <div className="h-[650px] w-full rounded-3xl border border-slate-800 bg-[#0a0c12] relative overflow-hidden shadow-2xl group">
              <div ref={mapContainer} className="absolute inset-0" />
              
              {/* Animated Scanner Effect (CSS Only overlay) */}
              <div className="absolute inset-0 pointer-events-none z-10 opacity-30">
                <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:20px_20px]"></div>
              </div>

              {/* HUD Elements */}
              <div className="absolute top-6 left-6 flex flex-col gap-3 pointer-events-none z-20">
                <div className="bg-black/60 backdrop-blur-xl border border-white/10 p-3 rounded-xl">
                  <div className="text-[8px] text-cyan-400 uppercase tracking-widest font-bold">Spatial Kernel</div>
                  <div className="text-white text-xs font-mono">v6.1.0_LTS</div>
                </div>
              </div>

              <div className="absolute top-6 right-6 pointer-events-none z-20">
                <div className="bg-black/60 backdrop-blur-xl border border-white/10 p-3 rounded-xl flex items-center gap-3">
                  <div className="text-right">
                    <div className="text-[8px] text-slate-500 uppercase tracking-widest">Latency</div>
                    <div className="text-emerald-400 text-xs font-mono">8ms</div>
                  </div>
                  <div className="w-[1px] h-6 bg-slate-800"></div>
                  <div className="text-right">
                    <div className="text-[8px] text-slate-500 uppercase tracking-widest">Engine</div>
                    <div className="text-white text-xs font-mono">GeoAI Node</div>
                  </div>
                </div>
              </div>

              {/* Cursor Instruction */}
              <div className="absolute bottom-6 left-1/2 -translate-x-1/2 bg-cyan-500/20 backdrop-blur-md border border-cyan-500/30 px-6 py-2 rounded-full text-white text-[10px] uppercase tracking-widest font-bold flex items-center gap-3 animate-bounce">
                <MousePointer2 className="w-3 h-3" /> Click en predio para análisis profundo
              </div>
            </div>
          </div>

          {/* Right: Analytical Console */}
          <div className="space-y-6">
            {/* Terminal Feed */}
            <div className="bg-[#050810] border border-slate-800 rounded-2xl p-5 h-[320px] flex flex-col shadow-inner">
              <div className="flex items-center justify-between mb-4 border-b border-white/5 pb-2">
                <div className="flex items-center gap-2 text-slate-400 text-xs font-mono">
                  <TerminalIcon className="w-3 h-3" /> GeoAI_Console_Stream
                </div>
                <div className="flex gap-1">
                  <div className="w-2 h-2 rounded-full bg-red-500/50"></div>
                  <div className="w-2 h-2 rounded-full bg-amber-500/50"></div>
                  <div className="w-2 h-2 rounded-full bg-green-500/50"></div>
                </div>
              </div>
              <div className="flex-1 overflow-y-auto space-y-2 font-mono text-[10px] custom-scrollbar">
                {logs.map((log) => (
                  <div key={log.id} className="text-cyan-400/80 flex gap-2 animate-in fade-in slide-in-from-left-2">
                    <span className="text-slate-600">»</span>
                    <span>{log.msg}</span>
                  </div>
                ))}
                {logs.length === 0 && <div className="text-slate-600 italic">Idle. Awaiting interaction...</div>}
                {isSimulating && <div className="w-2 h-4 bg-cyan-400 animate-pulse inline-block"></div>}
              </div>
            </div>

            {/* Active Analysis Result */}
            <AnimatePresence mode="wait">
              {activeParcel ? (
                <motion.div
                  key={activeParcel.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  className="bg-gradient-to-br from-cyan-900/20 to-blue-900/10 border border-cyan-500/30 rounded-2xl p-6 relative overflow-hidden"
                >
                  <div className="absolute top-0 right-0 p-4 opacity-10">
                    <ShieldCheck className="w-24 h-24 text-cyan-400" />
                  </div>
                  
                  <div className="relative z-10 space-y-5">
                    <div className="flex justify-between items-start">
                      <div>
                        <div className="text-[10px] text-cyan-400 uppercase tracking-widest font-bold">Node Intelligence</div>
                        <h3 className="text-2xl font-black text-white truncate max-w-[180px]">{activeParcel.id}</h3>
                      </div>
                      <div className="flex flex-col items-end">
                        <div className="bg-cyan-500 text-black font-black px-2 py-1 rounded text-xs">
                          {activeParcel.score}%
                        </div>
                        <div className="text-[8px] text-slate-500 mt-1 uppercase">Sovereignty Index</div>
                      </div>
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                      <div className="p-3 bg-black/40 rounded-xl border border-white/5">
                        <div className="text-[8px] text-slate-500 uppercase mb-1">Superficie</div>
                        <div className="text-white text-sm font-bold">{activeParcel.area}</div>
                      </div>
                      <div className="p-3 bg-black/40 rounded-xl border border-white/5">
                        <div className="text-[8px] text-slate-500 uppercase mb-1">Impacto 2027</div>
                        <div className="text-cyan-400 text-sm font-bold">
                          {activeParcel.simulation ? (activeParcel.simulation.impact_score * 100).toFixed(1) + "%" : "..."}
                        </div>
                      </div>
                    </div>

                    {activeParcel.infra && (
                      <div className="space-y-2">
                        <div className="flex justify-between text-[9px] text-slate-500 uppercase tracking-tighter">
                          <span>Proximity to Infrastructure</span>
                          <span className={activeParcel.compliance ? "text-emerald-400" : "text-amber-400"}>
                            {activeParcel.compliance ? "COMPLIANT" : "UNDER_THRESHOLD"}
                          </span>
                        </div>
                        <div className="h-1 bg-slate-800 rounded-full overflow-hidden">
                          <motion.div 
                            initial={{ width: 0 }}
                            animate={{ width: `${Math.min(100, (1/activeParcel.infra.main_road) * 10000)}%` }}
                            className="h-full bg-gradient-to-r from-blue-500 to-cyan-400" 
                          />
                        </div>
                      </div>
                    )}

                    <div className="pt-4 border-t border-white/5 space-y-2">
                      <div className="flex items-center gap-2 text-amber-400 text-[10px] font-bold uppercase tracking-widest">
                        <Zap className="w-3 h-3" /> Intelligence Insights
                      </div>
                      <div className="space-y-1">
                        {activeParcel.recommendations.map((rec, idx) => (
                          <p key={idx} className="text-[10px] text-slate-400 leading-relaxed italic flex gap-2">
                            <span className="text-cyan-500 opacity-50">•</span> {rec}
                          </p>
                        ))}
                      </div>
                    </div>
                  </div>
                </motion.div>
              ) : (
                <div className="h-[250px] border border-dashed border-slate-800 rounded-2xl flex flex-col items-center justify-center text-slate-600 text-xs text-center px-8 gap-4 bg-black/20">
                  <div className="p-4 rounded-full bg-slate-900/50">
                    <Search className="w-6 h-6 text-slate-700" />
                  </div>
                  <p>Selecciona un nodo parcelario para activar la telemetría del Digital Twin y los modelos de conectividad.</p>
                </div>
              )}
            </AnimatePresence>
          </div>
        </div>
      </div>
      
      <style jsx>{`
        .custom-scrollbar::-webkit-scrollbar { width: 4px; }
        .custom-scrollbar::-webkit-scrollbar-track { background: transparent; }
        .custom-scrollbar::-webkit-scrollbar-thumb { background: #1e293b; border-radius: 10px; }
        .custom-scrollbar::-webkit-scrollbar-thumb:hover { background: #334155; }
      `}</style>
    </section>
  );

};

export default SpatialIntelligenceDashboard;
>>>>>>> origin/main
