"use client";
import { motion } from "framer-motion";
import { Target, Award, Globe, CheckCircle2, ArrowRight } from "lucide-react";
import Link from "next/link";
import Logo from "../../components/Logo";

const ACHIEVEMENTS = [
  { label: "Municipios Actualizados", value: "29", desc: "Soberanía fiscal activa en entes territoriales." },
  { label: "Predios Procesados", value: "1.2M+", desc: "Bases de datos armonizadas bajo LADM-COL." },
  { label: "Integraciones OGC", value: "15+", desc: "Interoperabilidad nativa con IGAC/SNR." },
  { label: "Precisión Técnica", value: "99.9%", desc: "Garantía de seguridad jurídica del dato." }
];

const DIRECTORS = [
  { 
    name: "Ing. Albert G.", 
    role: "Director Técnico & Arquitecto Geoespacial", 
    desc: "Arquitecto de sistemas de misión crítica y líder en la implementación del estándar LADM-COL en Colombia. Especialista en automatización geoespacial de alto rendimiento." 
  },
  { 
    name: "Dirección Estratégica", 
    role: "Gestión Operativa & Normativa", 
    desc: "Expertos en la articulación de políticas nacionales de catastro multipropósito y cumplimiento de estándares internacionales ISO 19152." 
  }
];

export default function AboutPage() {
  return (
    <main className="bg-[#fcfcfc] min-h-screen text-[#1a1a1a] selection:bg-slate-200">
      
      {/* Editorial Header */}
      <section className="pt-40 pb-24 px-6 border-b border-slate-200">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col lg:flex-row justify-between items-start lg:items-end gap-12">
            <div className="space-y-8 lg:max-w-4xl">
              <div className="flex items-center gap-3">
                <span className="w-12 h-px bg-[#1a1a1a]"></span>
                <span className="text-[10px] font-mono uppercase tracking-[0.4em] text-slate-500 font-bold">About DevGiz // Engineering Manifesto</span>
              </div>
              <h1 className="text-6xl md:text-8xl font-black tracking-tighter leading-[0.9] text-[#1a1a1a]">
                Soberanía Digital <br /> <span className="text-slate-400 italic font-light">del Territorio</span>
              </h1>
            </div>
            <div className="lg:max-w-sm pb-2">
              <p className="text-slate-500 text-lg font-light leading-relaxed">
                No construimos mapas. Diseñamos la infraestructura de datos que define el futuro jurídico y fiscal de las naciones.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* The Manifesto Section */}
      <section className="py-32 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-20">
            <div className="lg:col-span-5 space-y-10">
              <h2 className="text-4xl font-black tracking-tighter">Nuestros <span className="text-slate-400 italic font-light">Principios</span></h2>
              <div className="space-y-8">
                <div className="group">
                  <div className="text-[11px] font-bold uppercase tracking-widest text-slate-400 mb-2">01 / Rigor Técnico</div>
                  <p className="text-slate-600 font-light leading-relaxed">Cada línea de código y cada polígono procesado cumple estrictamente con el estándar ISO 19152 y la normativa nacional LADM-COL.</p>
                </div>
                <div className="group">
                  <div className="text-[11px] font-bold uppercase tracking-widest text-slate-400 mb-2">02 / Independencia</div>
                  <p className="text-slate-600 font-light leading-relaxed">Promovemos la autonomía de las entidades territoriales, eliminando la dependencia de licencias privativas y formatos cerrados.</p>
                </div>
                <div className="group">
                  <div className="text-[11px] font-bold uppercase tracking-widest text-slate-400 mb-2">03 / Innovación de Élite</div>
                  <p className="text-slate-600 font-light leading-relaxed">Implementamos arquitecturas de alto rendimiento (Polars, DuckDB) para el procesamiento masivo de datos que otros sistemas no pueden manejar.</p>
                </div>
              </div>
            </div>
            <div className="lg:col-span-7 bg-white border border-slate-100 p-12 lg:p-20 shadow-sm relative">
              <div className="absolute top-0 right-0 p-12 opacity-5">
                <Logo className="w-64 h-64" />
              </div>
              <h3 className="text-3xl font-black mb-8 tracking-tight">¿Por qué elegir DevGiz?</h3>
              <div className="space-y-6">
                {[
                  "Soluciones internacionales con presencia en toda América.",
                  "Dominio total de la normativa LADM-COL e interoperabilidad IGAC/SNR.",
                  "Arquitectura de alto rendimiento para procesamiento masivo.",
                  "Transparencia total mediante auditoría de datos geoespaciales."
                ].map((item, i) => (
                  <div key={i} className="flex gap-4 items-center group">
                    <div className="w-1.5 h-1.5 bg-[#1a1a1a] rounded-full"></div>
                    <p className="text-slate-500 font-light text-lg">{item}</p>
                  </div>
                ))}
              </div>
              <div className="mt-16 pt-16 border-t border-slate-100">
                <blockquote className="text-2xl font-light italic text-slate-400 leading-relaxed">
                  "Nuestra misión es convertir la complejidad geográfica en activos estratégicos de valor nacional."
                </blockquote>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Impact in Figures - High End Grid */}
      <section className="py-32 bg-[#fafafa] border-y border-slate-200">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-20 space-y-4">
            <div className="text-[10px] font-mono text-slate-400 uppercase tracking-[0.4em]">Strategic Results // KPI Report</div>
            <h2 className="text-4xl md:text-6xl font-black tracking-tighter">Impacto en <span className="text-slate-400 italic font-light">Cifras</span></h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-px bg-slate-200 border border-slate-200 shadow-2xl">
            {ACHIEVEMENTS.map((item, i) => (
              <div key={i} className="bg-white p-12 space-y-6 hover:bg-slate-50 transition-colors">
                <div className="text-5xl font-black tracking-tighter">{item.value}</div>
                <div className="space-y-2">
                  <div className="text-[10px] font-bold uppercase tracking-widest text-[#1a1a1a]">{item.label}</div>
                  <p className="text-xs text-slate-400 font-light leading-relaxed">{item.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Leadership - Executive Profile Style */}
      <section className="py-32 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-20">
            <div className="lg:col-span-4 space-y-6">
              <h2 className="text-4xl font-black tracking-tighter">Liderazgo <br/> <span className="text-slate-400 italic font-light">Estratégico</span></h2>
              <p className="text-slate-500 font-light leading-relaxed">
                Contamos con un equipo multidisciplinario de expertos en ingeniería geoespacial, derecho territorial y arquitectura de software.
              </p>
            </div>
            <div className="lg:col-span-8 grid grid-cols-1 md:grid-cols-2 gap-8">
              {DIRECTORS.map((director, i) => (
                <div key={i} className="p-10 border border-slate-100 bg-white hover:border-slate-300 transition-all group">
                  <div className="text-[10px] font-mono text-slate-400 uppercase tracking-widest mb-6">Director Board Member</div>
                  <h3 className="text-2xl font-black tracking-tight mb-2">{director.name}</h3>
                  <div className="text-slate-500 text-xs font-bold uppercase tracking-wider mb-6 border-b border-slate-100 pb-4">{director.role}</div>
                  <p className="text-slate-500 text-sm font-light leading-relaxed">{director.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Institutional CTA */}
      <section className="py-40 bg-[#1a1a1a] text-white">
        <div className="max-w-5xl mx-auto px-6 text-center space-y-12">
          <h2 className="text-5xl md:text-7xl font-black tracking-tighter leading-tight">
            ¿Es DevGiz el aliado <br /> <span className="text-slate-500 font-light italic">que su proyecto necesita?</span>
          </h2>
          <p className="text-slate-400 text-xl font-light leading-relaxed max-w-2xl mx-auto">
            En una reunión técnica analizamos sus desafíos territoriales y definimos cómo nuestra arquitectura puede aportar valor institucional.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-6 pt-8">
            <Link 
              href="/#contact"
              className="px-12 py-5 bg-white text-black font-black text-xs uppercase tracking-[0.3em] hover:bg-slate-200 transition-all shadow-2xl"
            >
              Agendar Sesión Técnica
            </Link>
          </div>
        </div>
      </section>

    </main>
  );
}
