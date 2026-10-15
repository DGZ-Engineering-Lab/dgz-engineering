"use client";
import { useState, useRef } from "react";
import { motion, useInView } from "framer-motion";
import Link from "next/link";
import { ShieldCheck, FileCode, Share2, Layers, ArrowRight } from "lucide-react";
import Logo from "../../components/Logo";

const STANDARDS = [
  {
    id: "ladm",
    title: "Modelo LADM-COL (ISO 19152)",
    tag: "Normativa Nacional",
    desc: "El estándar oficial de administración del territorio colombiano para la integración transaccional entre interesado, derecho y predio.",
    specs: ["Alineado con ISO 19152:2012", "Estructuración predial transaccional", "Modelo base catastral oficial"],
    authority: "IGAC / Superintendencia de Notariado y Registro",
    format: "INTERLIS 2.3 (.ili / .xtf)",
    tolerance: "Subcentimétrica (< 0.05m en CTM12)",
    classes: ["COL_BAUnit", "COL_Interesado", "COL_RRR", "COL_UnidadEspacial"],
    codeSample: `MODEL Catastro_COL_V3_0 (es) AT "https://schemas.ladm-col.gov.co"
  VERSION "2026-01-15" =
  IMPORTS ISO19152;
  TOPIC CatastroRegistro =
    CLASS Predio EXTENDS ISO19152.LA_BAUnit =
      NumeroPredial : MANDATORY TEXT*30;
      AreaFisica_m2 : MANDATORY 0.00 .. 99999999.99;
      DestinoEconomico : MANDATORY TEXT*20;
    END Predio;
  END CatastroRegistro;
END Catastro_COL_V3_0.`,
    icon: ShieldCheck
  },
  {
    id: "res1040",
    title: "Resolución 1040/2023 (IGAC)",
    tag: "Especificaciones Técnicas",
    desc: "Directiva oficial del IGAC que rige las especificaciones técnicas para el levantamiento catastral y precisión métrica del dato.",
    specs: ["Márgenes de tolerancia topológica", "Retícula oficial en origen CTM12", "Estandarización de fichas prediales"],
    authority: "Instituto Geográfico Agustín Codazzi (IGAC)",
    format: "Spatial GeoPackage / PostGIS 3.4 / Shapefile CTM12",
    tolerance: "Urbano: e ≤ 0.08m | Rural: e ≤ 0.30m (EPSG:9377)",
    classes: ["Ficha_Predial", "Punto_Control_Geodesico", "Lindero_Vectorial", "Zona_Homogenea"],
    codeSample: `-- Control de Tolerancia Topológica IGAC Res 1040/2023
SELECT a.id, b.id, ST_Area(ST_Intersection(a.geom, b.geom)) as area_solape
FROM catastral_predios a, catastral_predios b
WHERE a.id < b.id 
  AND ST_Overlaps(a.geom, b.geom)
  AND ST_Area(ST_Intersection(a.geom, b.geom)) > 0.001; -- Umbral de tolerancia cero`,
    icon: FileCode
  },
  {
    id: "res746",
    title: "Resolución 746/2024 (IGAC-SNR)",
    tag: "Interoperabilidad Transaccional",
    desc: "Lineamientos de interoperabilidad de bases de datos geográficas y alfanuméricas entre Catastro y Registro (SNR).",
    specs: ["Conciliación automática SNR-VUR", "Esquemas XML/XTF via INTERLIS", "Tolerancia y consistencia transaccional"],
    authority: "Comisión Conjunta IGAC - Superintendencia de Notariado y Registro",
    format: "Servicio Web OGC WFS / Transferencia .XTF",
    tolerance: "Discrepancia cabida y linderos ≤ 5% para saneamiento por vía directa",
    classes: ["Conciliacion_Predio_SNR", "Folio_Matricula", "Titular_Derecho", "Acto_Registral"],
    codeSample: `<TRANSFER xmlns="http://www.interlis.ch/INTERLIS2.3">
  <HEADERSECTION SENDER="DGZ-ENGINEERING-PLATFORM" VERSION="2.3">
    <MODELS>
      <MODEL NAME="ResolucionConjunta_IGAC_SNR_V1" VERSION="2026"/>
    </MODELS>
  </HEADERSECTION>
  <DATASECTION>
    <ResolucionConjunta.Conciliacion TID="CONC_76001_00492">
      <DiscrepanciaSuperficie>1.8</DiscrepanciaSuperficie>
      <EstadoLegal>CONCILIADO_CONFORME</EstadoLegal>
    </ResolucionConjunta.Conciliacion>
  </DATASECTION>
</TRANSFER>`,
    icon: Share2
  }
];

export default function StandardsPage() {
  const [selectedStandardId, setSelectedStandardId] = useState("ladm");
  const cardsRef = useRef(null);
  const cardsInView = useInView(cardsRef, { once: true, margin: "-80px" });
  const diagramRef = useRef(null);
  const diagramInView = useInView(diagramRef, { once: true, margin: "-80px" });

  const activeStd = STANDARDS.find(s => s.id === selectedStandardId) || STANDARDS[0];

  return (
    <div className="bg-[#fcfcfc] min-h-screen text-[#1a1a1a] selection:bg-slate-200 pt-24 md:pt-28 pb-16">
      
      {/* Header Section */}
      <section className="max-w-7xl mx-auto px-6 mb-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-end">
          <div className="lg:col-span-8 space-y-8">
            <div className="flex items-center gap-3">
              <span className="w-12 h-px bg-[#1a1a1a]"></span>
              <span className="text-[10px] font-mono uppercase tracking-[0.28em] text-slate-500 font-bold">Technical Governance // Standard Hub</span>
            </div>
            <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-black tracking-tighter leading-[1.02] text-[#1a1a1a]">
              Protocolos de <br /> <span className="text-slate-400 italic font-light">Gobernanza Digital</span>
            </h1>
          </div>
          <div className="lg:col-span-4 border-l border-slate-200 pl-8 pb-2">
            <p className="text-slate-500 text-lg font-light leading-relaxed">
              En DevGiz, la ingeniería no es negociable. Operamos bajo los marcos técnicos más rigurosos del mundo para asegurar la integridad territorial.
            </p>
          </div>
        </div>
      </section>

      {/* Main Grid */}
      <section className="max-w-7xl mx-auto px-6" ref={cardsRef}>
        <div role="tablist" aria-label="Estándares técnicos oficiales" className="grid grid-cols-1 lg:grid-cols-3 gap-12">
          {STANDARDS.map((std, idx) => {
            const isSelected = selectedStandardId === std.id;
            return (
              <motion.button 
                type="button"
                role="tab"
                id={`std-tab-${std.id}`}
                aria-selected={isSelected}
                aria-controls="standards-inspector-panel"
                onClick={() => setSelectedStandardId(std.id)}
                key={std.id} 
                className={`group p-6 md:p-8 bg-white border transition-all relative overflow-hidden duration-300 rounded-xl text-left cursor-pointer focus-visible:ring-2 focus-visible:ring-cyan-500 focus:outline-none ${
                  isSelected 
                    ? "border-cyan-500 shadow-xl ring-1 ring-cyan-500/20 translate-y-[-2px]" 
                    : "border-slate-100 hover:border-slate-300 hover:shadow-lg hover:-translate-y-1"
                }`}
                initial={{ opacity: 0, y: 30 }}
                animate={cardsInView ? { opacity: 1, y: 0 } : {}}
                transition={{ delay: idx * 0.15, duration: 0.6 }}
              >
                <div className="absolute top-0 right-0 p-8 opacity-5 group-hover:opacity-10 transition-opacity duration-500">
                  <std.icon className="w-40 h-40" />
                </div>
                <div className="space-y-4 relative z-10">
                  <div className="flex items-center justify-between">
                    <div className="text-[10px] font-mono text-slate-400 uppercase tracking-widest">{std.tag}</div>
                    <div className={`w-8 h-8 rounded-full flex items-center justify-center transition-colors duration-300 ${
                      isSelected ? "bg-cyan-500 text-white" : "bg-slate-100 text-slate-400 group-hover:bg-[#1a1a1a] group-hover:text-white"
                    }`}>
                      <std.icon className="w-4 h-4 transition-colors" />
                    </div>
                  </div>
                  <h2 className="text-3xl font-black tracking-tight leading-none text-[#1a1a1a]">{std.title}</h2>
                  <p className="text-slate-500 font-light leading-relaxed h-24">{std.desc}</p>
                  
                  <div className="space-y-4 pt-8 border-t border-slate-100">
                    <div className="text-[10px] font-bold uppercase tracking-[0.2em] text-[#1a1a1a]">Especificaciones Clave:</div>
                    <div className="space-y-3">
                      {std.specs.map((spec) => (
                        <div key={spec} className="flex items-center gap-3 group/spec">
                          <div className={`w-1.5 h-1.5 rounded-full transition-transform ${isSelected ? "bg-cyan-500 scale-125" : "bg-[#1a1a1a]"}`}></div>
                          <span className="text-xs text-slate-600 font-medium">{spec}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="pt-2 text-[9px] font-mono text-cyan-600 font-bold uppercase tracking-widest flex items-center gap-1.5">
                    <span>{isSelected ? "● Inspección Activa" : "○ Clic para Inspeccionar"}</span>
                  </div>
                </div>
              </motion.button>
            );
          })}
        </div>

        {/* Interactive Standards Inspector HUD */}
        <motion.div 
          id="standards-inspector-panel"
          role="tabpanel"
          aria-labelledby={`std-tab-${activeStd.id}`}
          className="mt-8 p-6 md:p-8 bg-white border border-slate-200 rounded-2xl shadow-lg space-y-6"
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
        >
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-slate-100 pb-6">
            <div className="space-y-1">
              <span className="text-[9px] font-mono text-cyan-600 uppercase tracking-widest font-bold">
                Inspección Técnica de Cumplimiento // {activeStd.tag}
              </span>
              <h3 className="text-2xl font-black text-[#1a1a1a]">{activeStd.title}</h3>
            </div>
            <div className="inline-flex items-center gap-2 px-3 py-1.5 bg-slate-50 border border-slate-200 rounded-full font-mono text-[10px] text-slate-700">
              <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
              <span>100% Homologado en DevGiz Engine</span>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 font-mono text-xs">
            <div className="p-4 bg-slate-50 rounded-xl border border-slate-100 space-y-1">
              <span className="text-[9px] text-slate-400 uppercase tracking-wider block font-bold">Autoridad Emisora</span>
              <span className="text-slate-800 font-bold text-xs">{activeStd.authority}</span>
            </div>
            <div className="p-4 bg-slate-50 rounded-xl border border-slate-100 space-y-1">
              <span className="text-[9px] text-slate-400 uppercase tracking-wider block font-bold">Formato de Intercambio</span>
              <span className="text-slate-800 font-bold text-xs">{activeStd.format}</span>
            </div>
            <div className="p-4 bg-slate-50 rounded-xl border border-slate-100 space-y-1">
              <span className="text-[9px] text-slate-400 uppercase tracking-wider block font-bold">Tolerancia Oficial</span>
              <span className="text-slate-800 font-bold text-xs">{activeStd.tolerance}</span>
            </div>
          </div>

          <div className="space-y-3">
            <div className="flex items-center justify-between text-xs font-mono text-slate-500">
              <span className="font-bold uppercase tracking-wider">Estructura de Esquema / Código de Validación</span>
              <span className="text-[10px] text-slate-400">Syntax: INTERLIS / SQL / GML</span>
            </div>
            <pre className="p-6 bg-slate-950 text-cyan-300/90 rounded-xl font-mono text-[11px] leading-relaxed overflow-x-auto border border-slate-800 shadow-inner">
              {activeStd.codeSample}
            </pre>
          </div>
        </motion.div>
      </section>

      {/* Interactive Diagram Section - Simulated Visual */}
      <section className="max-w-7xl mx-auto px-6 mt-32" ref={diagramRef}>
        <motion.div 
          className="bg-[#1a1a1a] text-white p-6 lg:p-10 rounded-2xl relative overflow-hidden group"
          initial={{ opacity: 0, y: 30 }}
          animate={diagramInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7 }}
        >
          {/* Subtle grid background */}
          <div className="absolute inset-0 opacity-[0.03] pointer-events-none">
            <div className="absolute top-0 left-0 w-full h-full" style={{ backgroundImage: 'linear-gradient(rgba(255,255,255,0.4) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.4) 1px, transparent 1px)', backgroundSize: '30px 30px' }}></div>
          </div>
          <div className="absolute top-0 right-0 p-12 opacity-10 pointer-events-none">
             <Layers className="w-96 h-96" />
          </div>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 items-center relative z-10">
            <div className="space-y-8">
              <div className="text-[10px] font-mono text-slate-500 uppercase tracking-[0.32em]">Interactive Engine // Visual Standard</div>
              <h3 className="text-2xl sm:text-3xl md:text-4xl font-black tracking-tighter leading-tight">
                El Modelo <span className="text-slate-500 font-light italic">Universal de Tierras</span>
              </h3>
              <p className="text-slate-400 text-lg font-light leading-relaxed">
                Nuestra arquitectura permite visualizar la relación entre los puntos de control, los linderos físicos y los folios de registro en una sola estructura unificada de datos.
              </p>
              <div className="pt-8 flex flex-wrap gap-6">
                <div className="px-6 py-4 border border-slate-800 rounded-lg hover:border-slate-600 transition-colors cursor-default group/badge">
                  <div className="text-[9px] font-mono text-slate-600 mb-2 uppercase tracking-widest">Schema Status</div>
                  <div className="text-sm font-black text-emerald-500 tracking-widest group-hover/badge:scale-105 transition-transform origin-left">STABLE // LADM-COL v3.0</div>
                </div>
                <div className="px-6 py-4 border border-slate-800 rounded-lg hover:border-slate-600 transition-colors cursor-default group/badge">
                  <div className="text-[9px] font-mono text-slate-600 mb-2 uppercase tracking-widest">Compliance</div>
                  <div className="text-sm font-black text-white tracking-widest group-hover/badge:scale-105 transition-transform origin-left">ISO 19152 CERTIFIED</div>
                </div>
              </div>
            </div>
            
            <div className="aspect-square bg-white/5 border border-white/10 rounded-2xl backdrop-blur-3xl flex items-center justify-center p-12 relative">
               {/* Animated Diagram Components */}
               <div className="w-full h-full border border-white/5 relative flex items-center justify-center">
                  <motion.div 
                    className="w-32 h-32 border-2 border-slate-500 rounded-full absolute"
                    animate={{ scale: [1, 1.1, 1], opacity: [0.4, 0.8, 0.4] }}
                    transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
                  />
                  <motion.div 
                    className="w-48 h-48 border border-slate-800 absolute"
                    animate={{ rotate: 360 }}
                    transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
                  />
                  <motion.div 
                    className="w-56 h-56 border border-slate-900 rounded-full absolute"
                    animate={{ rotate: -360 }}
                    transition={{ duration: 30, repeat: Infinity, ease: "linear" }}
                  />
                  {/* Orbiting dots */}
                  <motion.div 
                    className="absolute w-3 h-3 rounded-full bg-cyan-500 shadow-[0_0_10px_#06b6d4]"
                    animate={{ 
                      x: [0, 90, 0, -90, 0],
                      y: [-90, 0, 90, 0, -90]
                    }}
                    transition={{ duration: 8, repeat: Infinity, ease: "linear" }}
                  />
                  <motion.div 
                    className="absolute w-2 h-2 rounded-full bg-emerald-500 shadow-[0_0_8px_#10b981]"
                    animate={{ 
                      x: [60, 0, -60, 0, 60],
                      y: [0, 60, 0, -60, 0]
                    }}
                    transition={{ duration: 6, repeat: Infinity, ease: "linear" }}
                  />
                  <div className="w-16 h-16 bg-white/10 backdrop-blur-md border border-white/20 flex items-center justify-center z-10 rounded-lg">
                     <Logo className="w-10 h-10 opacity-50" />
                  </div>
                  {/* Floating labels */}
                  <motion.div 
                    className="absolute top-6 left-6 text-[9px] font-mono text-slate-500 bg-black/50 p-2 border border-white/5 rounded"
                    animate={{ opacity: [0.5, 1, 0.5] }}
                    transition={{ duration: 3, repeat: Infinity }}
                  >
                    LAT: 4.6486 // LON: -74.0592
                  </motion.div>
                  <motion.div 
                    className="absolute bottom-6 right-6 text-[9px] font-mono text-slate-500 bg-black/50 p-2 border border-white/5 rounded"
                    animate={{ opacity: [0.5, 1, 0.5] }}
                    transition={{ duration: 4, repeat: Infinity, delay: 1.5 }}
                  >
                    BA_UNIT // PROPERTY_LEGAL
                  </motion.div>
               </div>
            </div>
          </div>
        </motion.div>
      </section>

      <div className="max-w-7xl mx-auto px-6 mt-20 flex justify-center">
        <Link href="/#contact" className="btn btn-primary group">
          Solicitar certificación de datos
          <ArrowRight className="group-hover:translate-x-1 transition-transform" />
        </Link>
      </div>

    </div>
  );
}
