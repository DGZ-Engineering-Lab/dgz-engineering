"use client";
import { useRef } from "react";
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
    icon: ShieldCheck
  },
  {
    id: "res1040",
    title: "Resolución 1040/2023 (IGAC)",
    tag: "Especificaciones Técnicas",
    desc: "Directiva oficial del IGAC que rige las especificaciones técnicas para el levantamiento catastral y precisión métrica del dato.",
    specs: ["Márgenes de tolerancia topológica", "Retícula oficial en origen CTM12", "Estandarización de fichas prediales"],
    icon: FileCode
  },
  {
    id: "res746",
    title: "Resolución 746/2024 (IGAC-SNR)",
    tag: "Interoperabilidad Transaccional",
    desc: "Lineamientos de interoperabilidad de bases de datos geográficas y alfanuméricas entre Catastro y Registro (SNR).",
    specs: ["Conciliación automática SNR-VUR", "Esquemas XML/XTF via INTERLIS", "Tolerancia y consistencia transaccional"],
    icon: Share2
  }
];

export default function StandardsPage() {
  const cardsRef = useRef(null);
  const cardsInView = useInView(cardsRef, { once: true, margin: "-80px" });
  const diagramRef = useRef(null);
  const diagramInView = useInView(diagramRef, { once: true, margin: "-80px" });

  return (
    <main className="bg-[#fcfcfc] min-h-screen text-[#1a1a1a] selection:bg-slate-200 pt-40 pb-32">
      
      {/* Header Section */}
      <section className="max-w-7xl mx-auto px-6 mb-32">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-end">
          <div className="lg:col-span-8 space-y-8">
            <div className="flex items-center gap-3">
              <span className="w-12 h-px bg-[#1a1a1a]"></span>
              <span className="text-[10px] font-mono uppercase tracking-[0.4em] text-slate-500 font-bold">Technical Governance // Standard Hub</span>
            </div>
            <h1 className="text-6xl md:text-8xl font-black tracking-tighter leading-[0.9] text-[#1a1a1a]">
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
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
          {STANDARDS.map((std, idx) => (
            <motion.div 
              key={std.id} 
              id={std.id}
              className="group p-12 bg-white border border-slate-100 hover:border-slate-300 hover:shadow-2xl transition-all relative overflow-hidden hover:-translate-y-1 duration-300 rounded-xl"
              initial={{ opacity: 0, y: 30 }}
              animate={cardsInView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: idx * 0.15, duration: 0.6 }}
            >
              <div className="absolute top-0 right-0 p-8 opacity-5 group-hover:opacity-10 transition-opacity duration-500">
                <std.icon className="w-40 h-40" />
              </div>
              <div className="space-y-8 relative z-10">
                <div className="flex items-center justify-between">
                  <div className="text-[10px] font-mono text-slate-400 uppercase tracking-widest">{std.tag}</div>
                  <div className="w-8 h-8 rounded-full bg-slate-100 flex items-center justify-center group-hover:bg-[#1a1a1a] transition-colors duration-300">
                    <std.icon className="w-4 h-4 text-slate-400 group-hover:text-white transition-colors" />
                  </div>
                </div>
                <h2 className="text-3xl font-black tracking-tight leading-none">{std.title}</h2>
                <p className="text-slate-500 font-light leading-relaxed h-24">{std.desc}</p>
                
                <div className="space-y-4 pt-8 border-t border-slate-100">
                  <div className="text-[10px] font-bold uppercase tracking-[0.2em] text-[#1a1a1a]">Especificaciones Clave:</div>
                  <div className="space-y-3">
                    {std.specs.map((spec, si) => (
                      <motion.div 
                        key={spec} 
                        className="flex items-center gap-3 group/spec"
                        initial={{ opacity: 0, x: -10 }}
                        animate={cardsInView ? { opacity: 1, x: 0 } : {}}
                        transition={{ delay: idx * 0.15 + si * 0.08 + 0.3, duration: 0.4 }}
                      >
                        <div className="w-1.5 h-1.5 bg-[#1a1a1a] rounded-full group-hover/spec:scale-150 transition-transform"></div>
                        <span className="text-xs text-slate-500 font-medium group-hover/spec:text-[#1a1a1a] transition-colors">{spec}</span>
                      </motion.div>
                    ))}
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Interactive Diagram Section - Simulated Visual */}
      <section className="max-w-7xl mx-auto px-6 mt-32" ref={diagramRef}>
        <motion.div 
          className="bg-[#1a1a1a] text-white p-12 lg:p-20 rounded-2xl relative overflow-hidden group"
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
              <div className="text-[10px] font-mono text-slate-500 uppercase tracking-[0.5em]">Interactive Engine // Visual Standard</div>
              <h3 className="text-4xl md:text-6xl font-black tracking-tighter leading-tight">
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
                    className="absolute w-3 h-3 rounded-full bg-cyan-500 shadow-[0_0_10px_#cfa758]"
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

      {/* Footer Branding */}
      <div className="max-w-7xl mx-auto px-6 mt-32 flex flex-col md:flex-row justify-between items-center border-t border-slate-100 pt-20 gap-8">
        <div className="flex items-center gap-4">
           <Logo className="w-12 h-12 opacity-80" />
           <div className="flex flex-col">
              <span className="text-xs font-black uppercase tracking-widest text-[#1a1a1a]">DevGiz Standards Board</span>
              <span className="text-[10px] text-slate-400 font-mono">Documentación Técnica // 2026</span>
           </div>
        </div>
        <Link href="/#contact" className="px-8 py-4 bg-[#1a1a1a] text-white text-[10px] font-bold uppercase tracking-[0.2em] hover:bg-slate-800 transition-all shadow-xl rounded-lg group flex items-center gap-3">
           Solicitar Certificación de Datos
           <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
        </Link>
      </div>

    </main>
  );
}
