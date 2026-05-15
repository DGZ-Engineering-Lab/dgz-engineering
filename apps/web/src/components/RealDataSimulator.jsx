"use client";
import { useState, useEffect } from "react";

const REAL_DATA_SAMPLES = [
  {
    id: "IGAC-BOG-001",
    location: "Bogotá D.C. - Chapinero",
    nupre: "110010101000000010022000000000",
    standard: "LADM-COL V4.0",
    raw: {
      "unidad_administrativa": {
        "departamento": "11",
        "municipio": "001",
        "tipo": "URBANO",
        "derecho": "PROPIEDAD_COLECTIVA"
      },
      "unidad_espacial": {
        "geometria": "POLYGON((-74.05 4.64, -74.05 4.65, -74.04 4.65, -74.04 4.64, -74.05 4.64))",
        "area_terreno": "452.32 m2"
      }
    }
  },
  {
    id: "IGAC-MED-052",
    location: "Medellín - El Poblado",
    nupre: "050010102000000450012000000000",
    standard: "LADM-COL V4.0",
    raw: {
      "unidad_administrativa": {
        "departamento": "05",
        "municipio": "001",
        "tipo": "URBANO",
        "derecho": "PROPIEDAD_PRIVADA"
      },
      "unidad_espacial": {
        "geometria": "POLYGON((-75.56 6.20, -75.56 6.21, -75.55 6.21, -75.55 6.20, -75.56 6.20))",
        "area_terreno": "812.15 m2"
      }
    }
  }
];

export default function RealDataSimulator() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isValidating, setIsValidating] = useState(false);
  const [logs, setLogs] = useState([]);
  
  const sample = REAL_DATA_SAMPLES[currentIndex];

  useEffect(() => {
    setIsValidating(true);
    setLogs(["[INIT] Connecting to ICDE/IGAC Node...", `[FETCH] Pulling XTF record ${sample.id}`]);
    
    const timers = [
      setTimeout(() => setLogs(prev => [...prev, "[PARSING] Extracting LADM-COL packages..."]), 500),
      setTimeout(() => setLogs(prev => [...prev, "[VALIDATION] Checking topology integrity..."]), 1000),
      setTimeout(() => setLogs(prev => [...prev, `[SUCCESS] Spatial Unit validated: ${sample.nupre}`]), 2000),
      setTimeout(() => setIsValidating(false), 2500)
    ];

    return () => timers.forEach(t => clearTimeout(t));
  }, [currentIndex]);

  return (
    <section className="relative w-full py-12 lg:py-16 bg-[#02040a] overflow-hidden border-y border-slate-800/30">
      <div className="absolute inset-0 opacity-[0.05]" style={{ backgroundImage: 'radial-gradient(#38BDF8 1px, transparent 1px)', backgroundSize: '24px 24px' }}></div>
      
      <div className="max-w-7xl mx-auto px-6 relative z-10">
        
        <div className="flex flex-col items-center text-center mb-16 space-y-6">
          <div className="inline-flex items-center gap-3 px-4 py-1.5 bg-emerald-500/10 border border-emerald-500/20 rounded-full">
            <span className="w-2 h-2 bg-emerald-500 rounded-full animate-pulse"></span>
            <span className="text-[10px] font-mono text-emerald-400 uppercase tracking-[0.3em] font-black">Official Data Engine</span>
          </div>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-black text-white tracking-tighter">
            Integración <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 to-cyan-500">Nativa IGAC</span>
          </h2>
          <p className="text-slate-400 max-w-3xl mx-auto text-sm lg:text-base font-light leading-relaxed">
            Nuestros sistemas consumen y validan información directamente de los repositorios oficiales de la ICDE bajo el estándar LADM-COL.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-stretch">
          
          {/* Data Feed Side */}
          <div className="bg-[#0a0f16] border border-slate-800 rounded-[2rem] overflow-hidden flex flex-col shadow-2xl relative group">
            <div className="absolute top-0 right-0 p-4 opacity-20 group-hover:opacity-100 transition-opacity">
               <div className="text-[60px] font-black text-white/5 select-none">DATA_CORE</div>
            </div>

            <div className="p-8 border-b border-slate-800 bg-slate-900/30 flex justify-between items-center">
               <div className="space-y-1">
                 <div className="text-[10px] font-mono text-slate-500 uppercase tracking-widest">Source Package</div>
                 <div className="text-white font-bold">{sample.id}</div>
               </div>
               <button 
                onClick={() => setCurrentIndex((currentIndex + 1) % REAL_DATA_SAMPLES.length)}
                className="px-4 py-2 bg-emerald-500 text-black text-[10px] font-black uppercase tracking-widest rounded-lg hover:bg-emerald-400 transition-colors shadow-lg shadow-emerald-500/20"
               >
                 Next Sample
               </button>
            </div>

            <div className="flex-1 p-8 font-mono text-[11px] space-y-6 overflow-hidden">
                <div className="space-y-2">
                  <div className="text-slate-500">{/* RAW_JSON_INPUT (LADM-COL Schema) */}</div>
                 <pre className="text-cyan-400/90 leading-relaxed overflow-auto max-h-[300px] scrollbar-hide">
                    {JSON.stringify(sample.raw, null, 2)}
                 </pre>
               </div>
               
                <div className="pt-6 border-t border-slate-800/50 space-y-2">
                  <div className="text-slate-500">{/* VALIDATION_STREAM */}</div>
                  <div className="space-y-1.5">
                    {logs.map((log, i) => (
                      <div key={i} className="flex gap-3 text-emerald-400/80 animate-in fade-in slide-in-from-left-4 duration-500">
                        <span className="text-slate-600 tracking-tighter">[{i+1}]</span>
                        <span>{log}</span>
                      </div>
                    ))}
                    {isValidating && <div className="text-white animate-pulse">_PROCESSING_BLOCK...</div>}
                  </div>
               </div>
            </div>
          </div>

          {/* Visual Validation Side */}
          <div className="flex flex-col gap-8">
            
            {/* Map Preview */}
            <div className="flex-1 bg-[#05070a] border border-slate-800 rounded-[2rem] relative overflow-hidden group shadow-2xl">
               <div className="absolute inset-0 opacity-10">
                 <svg viewBox="0 0 100 100" className="w-full h-full stroke-slate-700" fill="none">
                    <path d="M0 10 H100 M0 30 H100 M0 50 H100 M0 70 H100 M0 90 H100" />
                    <path d="M10 0 V100 M30 0 V100 M50 0 V100 M70 0 V100 M90 0 V100" />
                 </svg>
               </div>

               <div className="absolute inset-0 flex items-center justify-center p-20">
                  <div className={`relative transition-all duration-1000 ${isValidating ? 'scale-90 opacity-20' : 'scale-110 opacity-100'}`}>
                     {/* Simulated Parcel Geometry */}
                     <svg viewBox="0 0 100 100" className="w-64 h-64 fill-emerald-500/20 stroke-emerald-500 stroke-[1.5]">
                        <path d="M20 20 L80 25 L75 85 L15 80 Z" className="animate-[pulse_4s_infinite]" />
                        <circle cx="50" cy="52" r="2" fill="white" className="animate-ping" />
                     </svg>
                     <div className="absolute -top-12 -left-12 p-4 bg-black/80 border border-slate-800 rounded-xl backdrop-blur-md">
                        <div className="text-[9px] font-mono text-slate-500 uppercase">Centroid</div>
                        <div className="text-[10px] text-white font-bold">{sample.location}</div>
                     </div>
                  </div>
               </div>

               <div className="absolute bottom-8 left-8 right-8 flex justify-between items-end">
                  <div className="space-y-2">
                    <div className="text-[10px] font-mono text-slate-500 uppercase tracking-widest">Spatial Reference</div>
                    <div className="px-3 py-1 bg-slate-900 border border-slate-800 rounded text-[10px] text-emerald-400 font-bold uppercase tracking-widest">MAGNA-SIRGAS / Origen-Único (EPSG:9377)</div>
                  </div>
                  <div className="text-[10px] font-mono text-slate-600 italic">Data powered by ICDE Repository</div>
               </div>
            </div>

            {/* Compliance Badge Card */}
            <div className="bg-[#0a0f16] border border-slate-800 rounded-[2rem] p-8 flex items-center gap-8 relative overflow-hidden group hover:border-emerald-500/30 transition-all">
               <div className="absolute -right-8 -top-8 w-32 h-32 bg-emerald-500/5 rounded-full blur-3xl group-hover:bg-emerald-500/10 transition-all"></div>
               <div className="w-16 h-16 rounded-2xl bg-emerald-500/10 flex items-center justify-center text-3xl">✅</div>
               <div className="flex-1 space-y-1">
                 <div className="text-[10px] font-mono text-slate-500 uppercase tracking-widest">Compliance Status</div>
                 <div className="text-lg font-black text-white uppercase tracking-tight">Fully LADM-COL Compliant</div>
                 <p className="text-xs text-slate-500">Registro validado contra el Catálogo de Objetos Catastrales IGAC 2024.</p>
               </div>
            </div>

          </div>

        </div>

      </div>
    </section>
  );
}
