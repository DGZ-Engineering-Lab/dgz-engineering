"use client";
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

    return () => {
      if (map.current) {
        map.current.remove();
        map.current = null;
      }
    };
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
