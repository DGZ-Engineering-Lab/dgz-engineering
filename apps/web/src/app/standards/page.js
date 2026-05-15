"use client";
import { motion } from "framer-motion";
import Link from "next/link";
import { ShieldCheck, FileCode, Share2, Layers } from "lucide-react";
import Logo from "../../components/Logo";

const STANDARDS = [
  {
    id: "ladm-col",
    title: "LADM-COL (ISO 19152)",
    tag: "Core Standard",
    desc: "El modelo de administración de tierras que garantiza la relación técnica y legal entre el interesado, el derecho y el territorio.",
    specs: ["Basado en ISO 19152:2012", "Estandarización de objetos territoriales", "Seguridad jurídica multinivel"],
    icon: ShieldCheck
  },
  {
    id: "interlis",
    title: "INTERLIS",
    tag: "Data Exchange",
    desc: "Lenguaje de descripción conceptual para la transferencia masiva de datos geográficos sin pérdida de integridad semántica.",
    specs: ["Validación nativa en XTF", "Esquemas extensibles", "Compilación de modelos .ili"],
    icon: FileCode
  },
  {
    id: "icde",
    title: "Protocolos ICDE",
    tag: "Interoperability",
    desc: "Lineamientos de la Infraestructura Colombiana de Datos Espaciales para el intercambio soberano de información geográfica.",
    specs: ["WMS / WFS / WCS", "Metadatos ISO 19115", "Catálogos de objetos oficiales"],
    icon: Share2
  }
];

export default function StandardsPage() {
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
      <section className="max-w-7xl mx-auto px-6">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
          {STANDARDS.map((std, idx) => (
            <div key={std.id} className="group p-12 bg-white border border-slate-100 hover:border-slate-300 hover:shadow-2xl transition-all relative overflow-hidden">
              <div className="absolute top-0 right-0 p-8 opacity-5 group-hover:opacity-10 transition-opacity">
                <std.icon className="w-40 h-40" />
              </div>
              <div className="space-y-8 relative z-10">
                <div className="text-[10px] font-mono text-slate-400 uppercase tracking-widest">{std.tag}</div>
                <h2 className="text-3xl font-black tracking-tight leading-none">{std.title}</h2>
                <p className="text-slate-500 font-light leading-relaxed h-24">{std.desc}</p>
                
                <div className="space-y-4 pt-8 border-t border-slate-100">
                  <div className="text-[10px] font-bold uppercase tracking-[0.2em] text-[#1a1a1a]">Especificaciones Clave:</div>
                  <div className="space-y-3">
                    {std.specs.map(spec => (
                      <div key={spec} className="flex items-center gap-3">
                        <div className="w-1 h-1 bg-[#1a1a1a] rounded-full"></div>
                        <span className="text-xs text-slate-500 font-medium">{spec}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Interactive Diagram Section - Simulated Visual */}
      <section className="max-w-7xl mx-auto px-6 mt-32">
        <div className="bg-[#1a1a1a] text-white p-12 lg:p-20 rounded-sm relative overflow-hidden group">
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
                <div className="px-6 py-4 border border-slate-800 rounded-sm hover:border-slate-600 transition-colors">
                  <div className="text-[9px] font-mono text-slate-600 mb-2 uppercase tracking-widest">Schema Status</div>
                  <div className="text-sm font-black text-emerald-500 tracking-widest">STABLE // LADM-COL v3.0</div>
                </div>
                <div className="px-6 py-4 border border-slate-800 rounded-sm hover:border-slate-600 transition-colors">
                  <div className="text-[9px] font-mono text-slate-600 mb-2 uppercase tracking-widest">Compliance</div>
                  <div className="text-sm font-black text-white tracking-widest">ISO 19152 CERTIFIED</div>
                </div>
              </div>
            </div>
            
            <div className="aspect-square bg-white/5 border border-white/10 rounded-sm backdrop-blur-3xl flex items-center justify-center p-12 relative">
               {/* Simulated Diagram Components */}
               <div className="w-full h-full border border-white/5 relative flex items-center justify-center">
                  <div className="w-32 h-32 border-2 border-slate-500 rounded-full animate-pulse absolute"></div>
                  <div className="w-48 h-48 border border-slate-800 rotate-45 absolute"></div>
                  <div className="w-16 h-16 bg-white/10 backdrop-blur-md border border-white/20 flex items-center justify-center z-10">
                     <Logo className="w-10 h-10 opacity-50" />
                  </div>
                  {/* Floating labels */}
                  <div className="absolute top-10 left-10 text-[9px] font-mono text-slate-500 bg-black/50 p-2 border border-white/5">LAT: 4.6486 // LON: -74.0592</div>
                  <div className="absolute bottom-10 right-10 text-[9px] font-mono text-slate-500 bg-black/50 p-2 border border-white/5">BA_UNIT // PROPERTY_LEGAL</div>
               </div>
            </div>
          </div>
        </div>
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
        <Link href="/#contact" className="px-8 py-4 bg-[#1a1a1a] text-white text-[10px] font-bold uppercase tracking-[0.2em] hover:bg-slate-800 transition-all shadow-xl">
           Solicitar Certificación de Datos
        </Link>
      </div>

    </main>
  );
}
