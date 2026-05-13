"use client";
import { useEffect, useRef, useState } from "react";

export default function OfficialGISDemo() {
  const mapRef = useRef(null);
  const [mapLoaded, setMapLoaded] = useState(false);

  useEffect(() => {
    // Load Leaflet dynamically to avoid SSR issues
    const link = document.createElement("link");
    link.rel = "stylesheet";
    link.href = "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/leaflet.css";
    document.head.appendChild(link);

    const script = document.createElement("script");
    script.src = "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/leaflet.js";
    script.onload = () => {
      if (window.L && !mapLoaded) {
        const L = window.L;
        const map = L.map(mapRef.current).setView([4.6486, -74.0592], 16); // Bogotá Chapinero

        // Base Layers
        const osm = L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
          attribution: "© OpenStreetMap contributors"
        }).addTo(map);

        const satellite = L.tileLayer("https://mt1.google.com/vt/lyrs=s&x={x}&y={y}&z={z}", {
          attribution: "© Google Maps"
        });

        // Official IGAC WMS - Catastro Multipropósito
        // Note: Using a robust public proxy or direct WMS if accessible
        const wmsCatastro = L.tileLayer.wms("https://mapas.igac.gov.co/server/services/catastro/catastromultiproposito/MapServer/WMSServer", {
          layers: "0,1,2", // Parcels, Buildings, etc.
          format: "image/png",
          transparent: true,
          attribution: "© IGAC - Colombia en Mapas",
          opacity: 0.7
        }).addTo(map);

        L.control.layers({
          "OpenStreetMap": osm,
          "Satélite Google": satellite
        }, {
          "Catastro Multipropósito (IGAC)": wmsCatastro
        }).addTo(map);

        setMapLoaded(true);
      }
    };
    document.head.appendChild(script);

    return () => {
      // Cleanup script/link if needed
    };
  }, [mapLoaded]);

  return (
    <section className="relative w-full py-32 bg-[#02040a] border-y border-slate-800/50">
      <div className="max-w-7xl mx-auto px-6">
        
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center mb-16">
          <div className="lg:col-span-7 space-y-6">
            <div className="inline-flex items-center gap-3 px-4 py-1.5 bg-blue-500/10 border border-blue-500/20 rounded-full">
              <span className="w-2 h-2 bg-blue-500 rounded-full animate-pulse"></span>
              <span className="text-[10px] font-mono text-blue-400 uppercase tracking-[0.3em] font-black">Live GIS Engine</span>
            </div>
            <h2 className="text-6xl md:text-7xl font-black text-white tracking-tighter leading-none">
              Consola <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-cyan-500">Geo-Especializada</span>
            </h2>
            <p className="text-slate-400 text-xl font-light leading-relaxed max-w-2xl">
              Acceso en tiempo real a la infraestructura de datos espaciales de Colombia. Visualización de capas catastrales oficiales integradas con análisis predictivo.
            </p>
          </div>
          <div className="lg:col-span-5 flex justify-end gap-4">
             <div className="p-6 bg-slate-900/50 border border-slate-800 rounded-2xl flex-1 text-center">
                <div className="text-3xl font-black text-blue-400">100%</div>
                <div className="text-[10px] text-slate-500 uppercase tracking-widest mt-1">Interoperabilidad</div>
             </div>
             <div className="p-6 bg-slate-900/50 border border-slate-800 rounded-2xl flex-1 text-center">
                <div className="text-3xl font-black text-cyan-400">0.4s</div>
                <div className="text-[10px] text-slate-500 uppercase tracking-widest mt-1">Latencia WMS</div>
             </div>
          </div>
        </div>

        {/* The Map Console */}
        <div className="relative group">
          <div className="absolute -inset-1 bg-gradient-to-r from-blue-600 to-cyan-600 rounded-[2.5rem] blur opacity-20 group-hover:opacity-40 transition duration-1000 group-hover:duration-200"></div>
          
          <div className="relative bg-[#0a0f16] border border-slate-800 rounded-[2rem] overflow-hidden shadow-2xl h-[700px] flex flex-col">
            
            {/* Console Header */}
            <div className="p-4 bg-slate-900/80 backdrop-blur-md border-b border-slate-800 flex justify-between items-center z-20">
               <div className="flex items-center gap-4">
                 <div className="flex gap-1.5">
                    <div className="w-3 h-3 rounded-full bg-red-500/50"></div>
                    <div className="w-3 h-3 rounded-full bg-yellow-500/50"></div>
                    <div className="w-3 h-3 rounded-full bg-green-500/50"></div>
                 </div>
                 <div className="h-4 w-px bg-slate-800 mx-2"></div>
                 <div className="text-[10px] font-mono text-slate-400 tracking-widest uppercase">
                    GIS_RUNTIME // <span className="text-blue-400">BOGOTÁ_CENTRAL_NODE</span>
                 </div>
               </div>
               <div className="flex items-center gap-4 text-[10px] font-mono text-slate-500">
                  <div className="flex items-center gap-2">
                    <span className="w-1.5 h-1.5 bg-emerald-500 rounded-full animate-pulse"></span>
                    IGAC_WMS_CONNECTED
                  </div>
               </div>
            </div>

            {/* Map Container */}
            <div ref={mapRef} className="flex-1 z-10 bg-slate-950">
               {!mapLoaded && (
                 <div className="w-full h-full flex items-center justify-center text-slate-500 font-mono animate-pulse">
                    INITIALIZING_SPATIAL_ENGINE...
                 </div>
               )}
            </div>

            {/* Overlay Telemetry */}
            <div className="absolute bottom-8 left-8 right-8 grid grid-cols-1 md:grid-cols-3 gap-6 pointer-events-none z-20">
               <div className="bg-black/60 backdrop-blur-xl border border-white/10 p-6 rounded-2xl pointer-events-auto hover:bg-black/80 transition-all">
                  <div className="text-[10px] font-mono text-blue-400 uppercase tracking-widest mb-2">Base de Datos</div>
                  <div className="text-lg font-bold text-white tracking-tight">Catastro Multipropósito</div>
                  <div className="mt-4 flex flex-wrap gap-2">
                    <span className="px-2 py-1 bg-blue-500/20 text-blue-300 text-[8px] font-black rounded uppercase">IGAC_OFFICIAL</span>
                    <span className="px-2 py-1 bg-white/5 text-slate-400 text-[8px] font-black rounded uppercase">LADM-COL_V3</span>
                  </div>
               </div>

               <div className="bg-black/60 backdrop-blur-xl border border-white/10 p-6 rounded-2xl pointer-events-auto hover:bg-black/80 transition-all">
                  <div className="text-[10px] font-mono text-cyan-400 uppercase tracking-widest mb-2">Análisis Espacial</div>
                  <div className="text-lg font-bold text-white tracking-tight">Densidad Predial</div>
                  <div className="mt-3 h-1.5 w-full bg-slate-800 rounded-full overflow-hidden">
                    <div className="h-full w-3/4 bg-gradient-to-r from-blue-500 to-cyan-400"></div>
                  </div>
                  <div className="mt-2 flex justify-between text-[8px] font-mono text-slate-500">
                    <span>LOW</span>
                    <span>OPTIMIZED</span>
                    <span>HIGH</span>
                  </div>
               </div>

               <div className="bg-black/60 backdrop-blur-xl border border-white/10 p-6 rounded-2xl pointer-events-auto hover:bg-black/80 transition-all flex items-center gap-6">
                  <div className="w-12 h-12 rounded-full border-4 border-blue-500/30 border-t-blue-500 animate-spin"></div>
                  <div className="space-y-1">
                    <div className="text-xs font-bold text-white">Sincronización</div>
                    <div className="text-[9px] font-mono text-slate-500">Actualizado hace 2ms</div>
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
          filter: grayscale(0.2) contrast(1.1) brightness(0.9) invert(0.05);
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
        .leaflet-bar a {
          background: rgba(10, 15, 22, 0.9) !important;
          color: white !important;
          border-bottom: 1px solid rgba(255, 255, 255, 0.1) !important;
        }
      `}</style>
    </section>
  );
}
