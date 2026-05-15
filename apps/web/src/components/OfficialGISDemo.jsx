"use client";
import { useEffect, useRef, useState } from "react";

export default function OfficialGISDemo() {
  const mapRef = useRef(null);
  const [mapLoaded, setMapLoaded] = useState(false);
  const [apiStatus, setApiStatus] = useState("CONNECTING...");

  useEffect(() => {
    // Load Leaflet dynamically
    const link = document.createElement("link");
    link.rel = "stylesheet";
    link.href = "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/leaflet.css";
    document.head.appendChild(link);

    const script = document.createElement("script");
    script.src = "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/leaflet.js";
    script.onload = () => {
      if (window.L && !mapLoaded) {
        const L = window.L;
        const map = L.map(mapRef.current).setView([4.6486, -74.0592], 18); // Zoom in to see the ingested parcels

        // Base Layers
        const osm = L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
          attribution: "© OpenStreetMap contributors"
        }).addTo(map);

        const satellite = L.tileLayer("https://mt1.google.com/vt/lyrs=s&x={x}&y={y}&z={z}", {
          attribution: "© Google Maps"
        });

        // Official IGAC WMS (The background official layer)
        const wmsCatastro = L.tileLayer.wms("https://mapas.igac.gov.co/server/services/catastro/catastromultiproposito/MapServer/WMSServer", {
          layers: "0,1,2",
          format: "image/png",
          transparent: true,
          attribution: "© IGAC",
          opacity: 0.4
        }).addTo(map);

        // DEV-GIZ SPATIAL INTELLIGENCE LAYER (The "Blood" of the project)
        const fetchParcels = async () => {
          try {
            const response = await fetch("https://devgiz-api.onrender.com/parcels");
            const data = await response.json();
            
            if (data && data.features) {
              const geojsonLayer = L.geoJSON(data, {
                style: {
                  color: "#3b82f6",
                  weight: 2,
                  fillColor: "#3b82f6",
                  fillOpacity: 0.2
                },
                onEachFeature: (feature, layer) => {
                  layer.on('click', async (e) => {
                    layer.bindPopup("Cargando análisis de inteligencia...").openPopup();
                    
                    try {
                      const analysisResponse = await fetch("https://devgiz-api.onrender.com/intelligence/analyze_context", {
                        method: "POST",
                        headers: { "Content-Type": "application/json" },
                        body: JSON.stringify(feature)
                      });
                      const analysis = await analysisResponse.json();
                      
                      const popupContent = `
                        <div class="p-2 font-mono text-[10px] space-y-2">
                          <div class="flex justify-between border-b border-white/10 pb-1">
                            <span class="text-blue-400">ID_PREDIO:</span>
                            <span class="text-white">${analysis.parcel_id}</span>
                          </div>
                          <div class="flex justify-between">
                            <span class="text-cyan-400">SPATIAL_SCORE:</span>
                            <span class="font-bold ${analysis.spatial_score > 70 ? 'text-emerald-400' : 'text-yellow-400'}">${analysis.spatial_score}/100</span>
                          </div>
                          <div class="flex justify-between">
                            <span class="text-red-400">RIESGO_AMBIENTAL:</span>
                            <span class="font-bold">${analysis.risk_level}</span>
                          </div>
                          <div class="mt-2 pt-2 border-t border-white/10">
                            <div class="text-blue-300 uppercase mb-1">Recomendaciones:</div>
                            <ul class="list-disc pl-3 text-slate-300">
                              ${analysis.recommendations.map(r => `<li>${r}</li>`).join('')}
                            </ul>
                          </div>
                        </div>
                      `;
                      layer.setPopupContent(popupContent);
                    } catch (err) {
                      layer.setPopupContent("Error en nodo de inteligencia.");
                    }
                  });
                }
              }).addTo(map);
              
              // Center map on parcels
              map.fitBounds(geojsonLayer.getBounds());
              setApiStatus("GEO_AI_NODE_ACTIVE");
            }
          } catch (error) {
            console.error("API Connection error:", error);
            setApiStatus("OFFLINE_FALLBACK");
          }
        };

        fetchParcels();

        L.control.layers({
          "OpenStreetMap": osm,
          "Satélite Google": satellite
        }, {
          "IGAC Official WMS": wmsCatastro
        }).addTo(map);

        setMapLoaded(true);
      }
    };
    document.head.appendChild(script);

    return () => {};
  }, [mapLoaded]);

  return (
    <section className="relative w-full py-12 lg:py-16 bg-[#02040a] border-y border-slate-800/50">
      <div className="max-w-7xl mx-auto px-6">
        
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center mb-16">
          <div className="lg:col-span-7 space-y-6">
            <div className="inline-flex items-center gap-3 px-4 py-1.5 bg-blue-500/10 border border-blue-500/20 rounded-full">
              <span className="w-2 h-2 bg-blue-500 rounded-full animate-pulse"></span>
              <span className="text-[10px] font-mono text-blue-400 uppercase tracking-[0.3em] font-black">Spatial Intelligence v6.1</span>
            </div>
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-black text-white tracking-tighter leading-none">
              Plataforma <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-cyan-500">GeoAI Enterprise</span>
            </h2>
            <p className="text-slate-400 text-sm lg:text-base font-light leading-relaxed max-w-2xl">
              Integración de datos catastrales del IGAC con motores de análisis predictivo. Generando el Digital Twin de Colombia con soberanía tecnológica.
            </p>
          </div>
          <div className="lg:col-span-5 flex justify-end gap-4">
             <div className="p-6 bg-slate-900/50 border border-slate-800 rounded-2xl flex-1 text-center">
                <div className="text-2xl font-black text-blue-400">LEVEL 4</div>
                <div className="text-[10px] text-slate-500 uppercase tracking-widest mt-1">Digital Twin Maturity</div>
             </div>
             <div className="p-6 bg-slate-900/50 border border-slate-800 rounded-2xl flex-1 text-center">
                <div className="text-2xl font-black text-cyan-400">PostGIS</div>
                <div className="text-[10px] text-slate-500 uppercase tracking-widest mt-1">Spatial Core</div>
             </div>
          </div>
        </div>

        <div className="relative group">
          <div className="absolute -inset-1 bg-gradient-to-r from-blue-600 to-cyan-600 rounded-[2.5rem] blur opacity-20 group-hover:opacity-40 transition duration-1000 group-hover:duration-200"></div>
          
          <div className="relative bg-[#0a0f16] border border-slate-800 rounded-[2rem] overflow-hidden shadow-2xl h-[450px] lg:h-[550px] flex flex-col">
            
            <div className="p-4 bg-slate-900/80 backdrop-blur-md border-b border-slate-800 flex justify-between items-center z-20">
               <div className="flex items-center gap-4">
                 <div className="flex gap-1.5">
                    <div className="w-3 h-3 rounded-full bg-red-500/50"></div>
                    <div className="w-3 h-3 rounded-full bg-yellow-500/50"></div>
                    <div className="w-3 h-3 rounded-full bg-green-500/50"></div>
                 </div>
                 <div className="h-4 w-px bg-slate-800 mx-2"></div>
                 <div className="text-[10px] font-mono text-slate-400 tracking-widest uppercase">
                    SYSTEM_OS // <span className="text-blue-400">GEOSPATIAL_INTELLIGENCE_NODE</span>
                 </div>
               </div>
               <div className="flex items-center gap-4 text-[10px] font-mono text-slate-500">
                  <div className="flex items-center gap-2">
                    <span className="w-1.5 h-1.5 bg-emerald-500 rounded-full animate-pulse"></span>
                    {apiStatus}
                  </div>
               </div>
            </div>

            <div ref={mapRef} className="flex-1 z-10 bg-slate-950">
               {!mapLoaded && (
                 <div className="w-full h-full flex items-center justify-center text-slate-500 font-mono animate-pulse">
                    BOOTING_DEVGIZ_SPATIAL_RUNTIME...
                 </div>
               )}
            </div>

            <div className="absolute bottom-8 left-8 right-8 grid grid-cols-1 md:grid-cols-3 gap-6 pointer-events-none z-20">
               <div className="bg-black/80 backdrop-blur-xl border border-white/10 p-6 rounded-2xl pointer-events-auto">
                  <div className="text-[10px] font-mono text-blue-400 uppercase tracking-widest mb-2">Data Ingestion</div>
                  <div className="text-lg font-bold text-white tracking-tight">PostGIS Active Node</div>
                  <div className="mt-2 text-[9px] text-slate-500 font-mono">Connected to Neon Cloud Engine</div>
               </div>

               <div className="bg-black/80 backdrop-blur-xl border border-white/10 p-6 rounded-2xl pointer-events-auto">
                  <div className="text-[10px] font-mono text-cyan-400 uppercase tracking-widest mb-2">Engine Intelligence</div>
                  <div className="text-lg font-bold text-white tracking-tight">Context Analysis: ON</div>
                  <div className="mt-2 text-[9px] text-slate-500 font-mono">Shapely Geometry Engine Level 4</div>
               </div>

               <div className="bg-black/80 backdrop-blur-xl border border-white/10 p-6 rounded-2xl pointer-events-auto flex items-center gap-6">
                  <div className="w-12 h-12 rounded-full border-4 border-emerald-500/30 border-t-emerald-500 animate-spin"></div>
                  <div className="space-y-1">
                    <div className="text-xs font-bold text-white">Sincronización Real</div>
                    <div className="text-[9px] font-mono text-slate-500">Datos Vivos IGAC 2026</div>
                  </div>
               </div>
            </div>

          </div>
        </div>

      </div>
      
      <style jsx global>{`
        .leaflet-container {
          width: 100%;
          height: 100%;
          filter: grayscale(0.6) contrast(1.2) brightness(0.7) invert(0.1) hue-rotate(180deg);
        }
        .leaflet-popup-content-wrapper {
          background: rgba(10, 15, 22, 0.95) !important;
          color: white !important;
          border: 1px solid rgba(59, 130, 246, 0.5) !important;
          backdrop-filter: blur(12px);
          border-radius: 12px !important;
          padding: 0 !important;
        }
        .leaflet-popup-tip {
          background: rgba(10, 15, 22, 0.95) !important;
        }
        .leaflet-control-layers {
          background: rgba(10, 15, 22, 0.9) !important;
          border: 1px solid rgba(255, 255, 255, 0.1) !important;
          color: #94a3b8 !important;
          font-family: monospace !important;
          font-size: 10px !important;
          backdrop-filter: blur(8px);
          border-radius: 8px !important;
        }
      `}</style>
    </section>
  );
}
