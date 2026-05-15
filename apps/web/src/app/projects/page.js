"use client";
import { motion } from "framer-motion";
import Link from "next/link";
import dynamic from 'next/dynamic';

const SpatialIntelligenceDashboard = dynamic(
  () => import("../../components/SpatialIntelligenceDashboard"),
  { ssr: false }
);

const PROJECTS = [
  {
    id: "catastro-valle",
    title: "Catastro Multipropósito: Valle del Cauca",
    category: "Gestión Territorial",
    tagline: "Soberanía fiscal y seguridad jurídica mediante el estándar LADM-COL.",
    impact: ["+300k Predios Actualizados", "100% Interoperabilidad XTF", "Reducción de tiempos en 70%"],
    image: "https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&q=80&w=1200",
    stats: { label: "Estándar", value: "LADM-COL v3.0" }
  },
  {
    id: "qgis-plugin",
    title: "LADM-COL QGIS Plugin",
    category: "Software de Ingeniería",
    tagline: "Validación topológica nativa de alto rendimiento.",
    impact: ["Error Humano -95%", "Sincronización PostGIS", "Reportes Automáticos"],
    image: "https://images.unsplash.com/photo-1581092160562-40aa08e78837?auto=format&fit=crop&q=80&w=1200",
    stats: { label: "Engine", value: "PyQGIS / Python" }
  },
  {
    id: "automation-systems",
    title: "Territorial ETL Pipelines",
    category: "Infraestructura de Datos",
    tagline: "Automatización geoespacial desatendida para entidades públicas.",
    impact: ["500k+ Registros/Día", "Validación INTERLIS", "Cifrado AES-256"],
    image: "https://images.unsplash.com/photo-1451187580459-43490279c0fa?auto=format&fit=crop&q=80&w=1200",
    stats: { label: "Protocolo", value: "GDAL / OGR" }
  },
  {
    id: "geo-llm",
    title: "Geo-LLM Intelligence",
    category: "Inteligencia Artificial",
    tagline: "Análisis espacial avanzado mediante procesamiento de lenguaje natural.",
    impact: ["Natural Language SQL", "Análisis Predictivo", "Insights Territoriales"],
    image: "https://images.unsplash.com/photo-1485827404703-89b55fcc595e?auto=format&fit=crop&q=80&w=1200",
    stats: { label: "Modelo", value: "LLM-Hybrid GIS" }
  }
];

export default function ProjectsPage() {
  return (
    <div className="flex flex-col w-full bg-[#fcfcfc] text-[#1a1a1a] min-h-screen pt-32">
      
      {/* Header Editorial */}
      <section className="px-6 pb-24 border-b border-slate-200">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-end">
            <div className="lg:col-span-8 space-y-8">
              <div className="flex items-center gap-3">
                <span className="w-12 h-px bg-[#1a1a1a]"></span>
                <span className="text-[10px] font-mono uppercase tracking-[0.4em] text-slate-500 font-bold">Engineering Portfolio // 2026</span>
              </div>
              <h1 className="text-6xl md:text-8xl font-black tracking-tighter leading-[0.9] text-[#1a1a1a]">
                Casos de <br /> <span className="text-slate-400 italic font-light">Ingeniería</span>
              </h1>
            </div>
            <div className="lg:col-span-4 border-l border-slate-200 pl-8 pb-2">
              <p className="text-slate-500 text-lg font-light leading-relaxed">
                Documentamos nuestras soluciones más complejas, desde el desarrollo de software especializado hasta la implementación de estándares nacionales de tierras.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Projects Showcase - Masterpieces */}
      <section className="bg-white">
        <div className="max-w-7xl mx-auto">
          {PROJECTS.map((project, idx) => (
            <Link key={project.id} href={`/projects/${project.id}`} className="group block border-b border-slate-100 last:border-0 overflow-hidden">
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-0 items-stretch">
                {/* Text Info */}
                <div className={`lg:col-span-6 p-12 lg:p-20 flex flex-col justify-center space-y-10 ${idx % 2 !== 0 ? 'lg:order-2 lg:border-l border-slate-100' : 'lg:border-r border-slate-100'}`}>
                  <div className="space-y-4">
                    <div className="text-[10px] font-mono text-slate-400 uppercase tracking-widest">{project.category}</div>
                    <h2 className="text-3xl md:text-5xl font-black tracking-tighter leading-tight group-hover:text-slate-600 transition-colors">
                      {project.title}
                    </h2>
                    <p className="text-xl text-slate-500 font-light leading-relaxed">
                      {project.tagline}
                    </p>
                  </div>
                  
                  <div className="space-y-4">
                    <div className="text-[10px] font-bold uppercase tracking-widest text-[#1a1a1a] mb-6">Impacto Técnico</div>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-y-6 gap-x-12">
                      {project.impact.map(item => (
                        <div key={item} className="flex items-center gap-3">
                          <span className="w-1.5 h-1.5 bg-[#1a1a1a] rounded-full"></span>
                          <span className="text-sm font-medium text-slate-700">{item}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="pt-10">
                    <div className="inline-flex items-center gap-4 text-[11px] font-bold uppercase tracking-[0.2em] text-[#1a1a1a]">
                      Explorar Caso de Estudio
                      <span className="w-12 h-px bg-[#1a1a1a] transition-all group-hover:w-24"></span>
                    </div>
                  </div>
                </div>

                {/* Visual */}
                <div className={`lg:col-span-6 relative overflow-hidden bg-slate-50 ${idx % 2 !== 0 ? 'lg:order-1' : ''}`}>
                  <img 
                    src={project.image} 
                    alt={project.title}
                    className="w-full h-full object-cover grayscale-[0.3] group-hover:grayscale-0 group-hover:scale-105 transition-all duration-1000"
                  />
                  <div className="absolute top-10 right-10 p-6 bg-white/90 backdrop-blur-md shadow-xl rounded-sm text-center min-w-[140px]">
                    <div className="text-[9px] font-mono text-slate-400 uppercase tracking-widest mb-1">{project.stats.label}</div>
                    <div className="text-lg font-black text-[#1a1a1a] tracking-tight">{project.stats.value}</div>
                  </div>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* Interactive Ecosystem - Premium Integration */}
      <section className="py-32 bg-[#fafafa] border-y border-slate-200 overflow-hidden">
        <div className="max-w-7xl mx-auto px-6 mb-20 text-center space-y-6">
          <div className="text-[10px] font-mono text-slate-400 uppercase tracking-[0.5em]">Interactive Intelligence // v3.0</div>
          <h2 className="text-4xl md:text-6xl font-black text-[#1a1a1a] tracking-tighter">
            Ecosistema de <span className="text-slate-400 italic font-light">Visualización</span>
          </h2>
          <p className="max-w-2xl mx-auto text-slate-500 font-light text-lg leading-relaxed">
            Nuestra plataforma unificada permite la gestión táctica de activos territoriales con precisión de grado gubernamental.
          </p>
        </div>

        <div className="max-w-7xl mx-auto px-6">
          <div className="w-full h-[600px] rounded-sm overflow-hidden shadow-2xl border border-slate-200 bg-white relative group">
            <SpatialIntelligenceDashboard />
          </div>
        </div>
      </section>

      {/* Call to Action - Institutional */}
      <section className="py-40 bg-[#1a1a1a] text-white overflow-hidden relative">
        <div className="max-w-5xl mx-auto px-6 text-center space-y-12 relative z-10">
          <h2 className="text-5xl md:text-7xl font-black tracking-tighter leading-tight">
            Ingeniería de <br /> <span className="text-slate-500 font-light italic">Clase Mundial.</span>
          </h2>
          <p className="text-slate-400 text-xl font-light leading-relaxed max-w-2xl mx-auto">
            Estamos listos para transformar sus desafíos territoriales en soluciones de software robustas y escalables.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-6 pt-8">
            <Link 
              href="/#contact"
              className="px-12 py-5 bg-white text-black font-black text-xs uppercase tracking-[0.3em] hover:bg-slate-200 transition-all shadow-2xl"
            >
              Contactar Ingeniería
            </Link>
          </div>
        </div>
      </section>

    </div>
  );
}
