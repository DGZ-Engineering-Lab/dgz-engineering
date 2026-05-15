"use client";

import { motion } from "framer-motion";
import { 
  Cpu, 
  Map as MapIcon, 
  Database, 
  Code2, 
  FileCheck, 
  Package, 
  Satellite, 
  Globe2, 
  Navigation, 
  Drones, 
  Radio, 
  Briefcase 
} from "lucide-react";

const METHODS = [
  { id: "IA", icon: Cpu, title: "IA Geoespacial", desc: "Modelos de ML para clasificación de cobertura, análisis predictivo y detección de cambios.", tag: "IA" },
  { id: "QGIS", icon: MapIcon, title: "QGIS", desc: "SIG de escritorio y servidor. Nuestro entorno principal de análisis y publicación.", tag: "QGIS" },
  { id: "PG", icon: Database, title: "PostGIS", desc: "Base de datos geoespacial sobre PostgreSQL. Análisis a escala de millones de predios.", tag: "PG" },
  { id: "PY", icon: Code2, title: "Python", desc: "Automatización, modelos de IA y scripting geoespacial con GeoPandas y Rasterio.", tag: "PY" },
  { id: "ISO", icon: FileCheck, title: "ISO 19152 · LADM", desc: "Modelo de dominio para administración de tierras. Base del estándar LADM-COL.", tag: "ISO" },
  { id: "XTF", icon: Package, title: "LADM-COL · XTF", desc: "Exportación nativa XTF. 9 municipios actualizados conforme normativa IGAC.", tag: "XTF" },
  { id: "EOS", icon: Satellite, title: "EOSDA", desc: "Alianza para monitoreo satelital de cultivos. Índices NDVI sobre Sentinel.", tag: "EOS" },
  { id: "GS", icon: Globe2, title: "GeoServer", desc: "Publicación vía OGC (WMS/WFS). Interoperabilidad para gobierno y sector privado.", tag: "GS" },
  { id: "ARC", icon: Navigation, title: "ArcGIS", desc: "Implementación Esri. 15 contratos con ISAGEN y geodatabases para UPME.", tag: "ARC" },
  { id: "UAV", icon: Satellite, title: "Drones & LiDAR", desc: "Aerofotogrametría y modelos digitales de terreno con precisión submétrica RTK.", tag: "UAV" },
  { id: "SAT", icon: Radio, title: "Sentinel & Landsat", desc: "Procesamiento de escenas satelitales para monitoreo y análisis territorial.", tag: "SAT" },
  { id: "OP", icon: Briefcase, title: "Operador Catastral", desc: "29 municipios actualizados. Barrido predial masivo y actualización catastral.", tag: "OP" }
];

export default function WorkMethodology() {
  return (
    <section className="py-24 bg-[#02040a] relative overflow-hidden">
      <div className="max-w-[1400px] mx-auto px-6">
        <div className="mb-16">
          <h2 className="text-4xl md:text-5xl font-black text-white tracking-tighter">
            Con qué <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-blue-600">trabajamos.</span>
          </h2>
          <p className="text-slate-500 mt-4 max-w-2xl font-light">
            Nuestra infraestructura combina los estándares internacionales más rigurosos con las tecnologías de procesamiento más avanzadas del mercado.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {METHODS.map((item, i) => (
            <motion.div 
              key={item.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.05 }}
              viewport={{ once: true }}
              className="group p-6 bg-slate-900/40 backdrop-blur-sm border border-slate-800 hover:border-cyan-500/30 rounded-3xl transition-all duration-500"
            >
              <div className="w-10 h-10 bg-slate-800 rounded-xl flex items-center justify-center mb-6 group-hover:bg-cyan-500/20 group-hover:text-cyan-400 transition-colors">
                <item.icon className="w-5 h-5" />
              </div>
              <div className="flex items-center gap-2 mb-2">
                <span className="text-[10px] font-mono text-cyan-500 font-bold uppercase tracking-widest">{item.tag}</span>
              </div>
              <h3 className="text-lg font-bold text-white mb-2 tracking-tight">{item.title}</h3>
              <p className="text-xs text-slate-400 leading-relaxed font-light">
                {item.desc}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
