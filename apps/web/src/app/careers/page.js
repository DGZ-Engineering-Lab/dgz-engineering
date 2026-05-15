"use client";
import { motion } from "framer-motion";
import { Code, Map, Shield, Zap, ArrowRight } from "lucide-react";
import Link from "next/link";
import Logo from "../../components/Logo";

const POSITIONS = [
  {
    title: "Senior GIS Engineer",
    type: "Full-time // Remote",
    team: "Spatial Architecture",
    desc: "Liderar el desarrollo de algoritmos de procesamiento masivo para bases de datos catastrales de escala nacional."
  },
  {
    title: "LADM-COL Legal Expert",
    type: "Contract // Hybrid",
    team: "Legal Governance",
    desc: "Garantizar la armonización normativa de nuestros sistemas con la legislación de tierras vigente en Colombia."
  },
  {
    title: "Backend Architect (Spatial Data)",
    type: "Full-time // Remote",
    team: "Infrastructure",
    desc: "Diseñar infraestructuras de alta disponibilidad basadas en PostGIS, DuckDB y protocolos de seguridad Zero Trust."
  }
];

export default function CareersPage() {
  return (
    <main className="bg-[#fcfcfc] min-h-screen text-[#1a1a1a] selection:bg-slate-200 pt-40 pb-32">
      
      {/* Header Section */}
      <section className="max-w-7xl mx-auto px-6 mb-32">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-end">
          <div className="lg:col-span-8 space-y-8">
            <div className="flex items-center gap-3">
              <span className="w-12 h-px bg-[#1a1a1a]"></span>
              <span className="text-[10px] font-mono uppercase tracking-[0.4em] text-slate-500 font-bold">Talent Acquisition // Join the Elite</span>
            </div>
            <h1 className="text-6xl md:text-8xl font-black tracking-tighter leading-[0.9] text-[#1a1a1a]">
              Ingeniería de <br /> <span className="text-slate-400 italic font-light">Misión Crítica</span>
            </h1>
          </div>
          <div className="lg:col-span-4 border-l border-slate-200 pl-8 pb-2">
            <p className="text-slate-500 text-lg font-light leading-relaxed">
              Buscamos a las mentes más brillantes en geociencias y desarrollo de software para asegurar la infraestructura territorial del futuro.
            </p>
          </div>
        </div>
      </section>

      {/* Core Values Section */}
      <section className="max-w-7xl mx-auto px-6 mb-40">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 border-y border-slate-100 py-20">
          <div className="space-y-6">
            <div className="w-10 h-10 bg-slate-100 flex items-center justify-center rounded-sm"><Code className="w-5 h-5" /></div>
            <h3 className="text-xl font-black tracking-tight">Stack Moderno</h3>
            <p className="text-sm text-slate-500 font-light leading-relaxed">Operamos con las últimas tecnologías en procesamiento paralelo, IA espacial y bases de datos vectoriales.</p>
          </div>
          <div className="space-y-6">
            <div className="w-10 h-10 bg-slate-100 flex items-center justify-center rounded-sm"><Shield className="w-5 h-5" /></div>
            <h3 className="text-xl font-black tracking-tight">Soberanía Real</h3>
            <p className="text-sm text-slate-500 font-light leading-relaxed">Su trabajo impactará directamente en la seguridad jurídica y la autonomía digital de municipios y departamentos.</p>
          </div>
          <div className="space-y-6">
            <div className="w-10 h-10 bg-slate-100 flex items-center justify-center rounded-sm"><Zap className="w-5 h-5" /></div>
            <h3 className="text-xl font-black tracking-tight">Cultura de Élite</h3>
            <p className="text-sm text-slate-500 font-light leading-relaxed">Fomentamos un entorno de aprendizaje continuo, excelencia técnica y responsabilidad absoluta sobre los resultados.</p>
          </div>
        </div>
      </section>

      {/* Open Positions Grid */}
      <section className="max-w-7xl mx-auto px-6">
        <div className="flex justify-between items-end mb-16">
          <div className="space-y-2">
            <div className="text-[10px] font-mono text-slate-400 uppercase tracking-widest">Active Search</div>
            <h2 className="text-4xl font-black tracking-tighter">Posiciones <span className="text-slate-400 italic font-light">Abiertas</span></h2>
          </div>
          <div className="text-xs font-bold text-[#1a1a1a] uppercase tracking-widest">{POSITIONS.length} Oportunidades</div>
        </div>

        <div className="space-y-6">
          {POSITIONS.map((job, idx) => (
            <div key={idx} className="group p-10 bg-white border border-slate-100 hover:border-slate-300 hover:shadow-2xl transition-all relative overflow-hidden">
              <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-8 relative z-10">
                <div className="space-y-3 lg:max-w-2xl">
                  <div className="flex items-center gap-3">
                    <span className="text-[10px] font-mono text-slate-400 uppercase tracking-widest">{job.team}</span>
                    <span className="w-1 h-1 bg-slate-200 rounded-full"></span>
                    <span className="text-[10px] font-mono text-emerald-500 uppercase tracking-widest">{job.type}</span>
                  </div>
                  <h3 className="text-3xl font-black tracking-tight group-hover:text-slate-600 transition-colors">{job.title}</h3>
                  <p className="text-slate-500 font-light leading-relaxed">{job.desc}</p>
                </div>
                <button className="px-10 py-5 bg-[#1a1a1a] text-white text-[10px] font-black uppercase tracking-[0.2em] hover:bg-slate-800 transition-all flex items-center gap-4">
                  Postularse <ArrowRight className="w-3 h-3" />
                </button>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Manifest Banner */}
      <section className="max-w-7xl mx-auto px-6 mt-40">
        <div className="bg-[#1a1a1a] text-white p-12 lg:p-24 rounded-sm text-center space-y-10 relative overflow-hidden">
          <div className="absolute top-0 left-0 p-12 opacity-5">
             <Logo className="w-64 h-64" />
          </div>
          <h2 className="text-4xl md:text-6xl font-black tracking-tighter leading-tight relative z-10">
            No buscamos empleados. <br /> <span className="text-slate-500 font-light italic">Buscamos Arquitectos del Territorio.</span>
          </h2>
          <p className="max-w-2xl mx-auto text-slate-400 text-lg font-light leading-relaxed relative z-10">
            Si cree que tiene lo necesario para integrarse en una de las firmas de ingeniería geoespacial más avanzadas del país, queremos conocerle.
          </p>
          <div className="pt-8 relative z-10">
            <a href="mailto:careers@devgiz.com" className="text-[11px] font-black uppercase tracking-[0.3em] border-b-2 border-white pb-2 hover:text-slate-400 hover:border-slate-400 transition-all">
              careers@devgiz.com
            </a>
          </div>
        </div>
      </section>

      {/* Footer link */}
      <div className="max-w-7xl mx-auto px-6 mt-32 flex flex-col md:flex-row justify-between items-center border-t border-slate-100 pt-20 gap-8">
        <div className="flex items-center gap-4">
           <Logo className="w-12 h-12 opacity-80" />
           <div className="flex flex-col">
              <span className="text-xs font-black uppercase tracking-widest text-[#1a1a1a]">DevGiz Talent Portal</span>
              <span className="text-[10px] text-slate-400 font-mono">Build with Purpose // 2026</span>
           </div>
        </div>
        <Link href="/" className="text-[10px] font-bold uppercase tracking-[0.2em] text-slate-500 hover:text-[#1a1a1a] transition-all">
           Volver al Inicio
        </Link>
      </div>

    </main>
  );
}
