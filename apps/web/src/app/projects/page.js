"use client";
import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import SovereignMapWrapper from "../../components/SovereignMapWrapper";
import Image from "next/image";

const PROJECTS = [
  {
    id: "catastro-valle",
    title: "Catastro Multipropósito Valle del Cauca",
    category: "Infraestructura Territorial",
    tagline: "Soberanía fiscal y seguridad jurídica predial mediante la implementación nativa del estándar LADM-COL e INTERLIS.",
    impact: ["+300.000 Predios Actualizados", "100% Interoperabilidad XTF", "Optimización de Procesos en 70%"],
    image: "/assets/img/blog-ladm-col.webp",
    stats: { label: "Estándar Oficial", value: "LADM-COL v3.0" }
  },
  {
    id: "qgis-plugin",
    title: "Validador LADM-COL QGIS Plugin",
    category: "Software de Ingeniería",
    tagline: "Control de calidad topológico nativo y verificación estructurada de consistencia parcelaria en tiempo real.",
    impact: ["Error Humano Mitigado al 95%", "Consistencia Transaccional PostGIS", "Reportes de Conformidad Automáticos"],
    image: "/assets/img/geoai_before.webp",
    stats: { label: "Núcleo", value: "PyQGIS / Python 3" }
  },
  {
    id: "automation-systems",
    title: "Territorial ETL & Data Pipelines",
    category: "Infraestructura de Datos",
    tagline: "Ingeniería de datos geoespaciales masivos para gobernaciones, alcaldías y gestores catastrales habilitados.",
    impact: ["500k+ Registros Validados/Día", "Integridad e Interoperabilidad INTERLIS", "Esquema de Seguridad AES-256"],
    image: "/assets/img/topo-bg.webp",
    stats: { label: "Intercambio", value: "XTF / INTERLIS" }
  },
  {
    id: "geo-llm",
    title: "Inteligencia GeoAI & Geo-LLM",
    category: "Inteligencia Artificial",
    tagline: "Modelos híbridos de procesamiento de lenguaje natural y motores GIS para análisis territorial estratégico de alta escala.",
    impact: ["Consultas Naturales SQL-GIS", "Modelos Predictivos de Valoración", "Generación Automatizada de Memorias"],
    image: "/assets/img/blog-cybersecurity.webp",
    stats: { label: "Modelo", value: "LLM-Hybrid Spatial" }
  }
];

export default function ProjectsPage() {
  const headerRef = useRef(null);
  const headerInView = useInView(headerRef, { once: true });
  const showcaseRef = useRef(null);
  const showcaseInView = useInView(showcaseRef, { once: true, margin: "-80px" });

  return (
    <div className="flex flex-col w-full bg-[#fcfcfc] text-[#1a1a1a] min-h-screen pt-32">
      
      {/* Header Editorial */}
      <section className="px-6 pb-24 border-b border-slate-200 overflow-hidden" ref={headerRef}>
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-end">
            <motion.div 
              className="lg:col-span-8 space-y-8"
              initial={{ opacity: 0, y: 30 }}
              animate={headerInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.7 }}
            >
              <div className="flex items-center gap-3">
                <span className="w-12 h-px bg-[#1a1a1a]"></span>
                <span className="text-[10px] font-mono uppercase tracking-[0.4em] text-slate-500 font-bold">Portafolio de Infraestructura Territorial // 2026</span>
              </div>
              <h1 className="text-6xl md:text-8xl font-black tracking-tighter leading-[0.9] text-[#1a1a1a]">
                Infraestructura <br /> <span className="text-slate-400 italic font-light">Territorial</span>
              </h1>
            </motion.div>
            <motion.div 
              className="lg:col-span-4 border-l border-slate-200 pl-8 pb-2"
              initial={{ opacity: 0, x: 20 }}
              animate={headerInView ? { opacity: 1, x: 0 } : {}}
              transition={{ delay: 0.3, duration: 0.6 }}
            >
              <p className="text-slate-500 text-lg font-light leading-relaxed">
                Casos de éxito y memorias técnicas de nuestras intervenciones más complejas, garantizando interoperabilidad catastral, seguridad jurídica y soberanía tecnológica en Colombia.
              </p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Projects Showcase - Masterpieces */}
      <section className="bg-white" ref={showcaseRef}>
        <div className="max-w-7xl mx-auto">
          {PROJECTS.map((project, idx) => (
            <motion.div
              key={project.id}
              initial={{ opacity: 0, y: 40 }}
              animate={showcaseInView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: idx * 0.15, duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
            >
            <Link href={`/projects/${project.id}`} prefetch={false} className="group block border-b border-slate-100 last:border-0 overflow-hidden">
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-0 items-stretch">
                {/* Text Info */}
                <div className={`lg:col-span-6 p-12 lg:p-20 flex flex-col justify-center space-y-10 ${idx % 2 !== 0 ? 'lg:order-2 lg:border-l border-slate-100' : 'lg:border-r border-slate-100'}`}>
                  <div className="space-y-4">
                    <div className="flex items-center gap-3">
                      <div className="text-[10px] font-mono text-slate-400 uppercase tracking-widest">{project.category}</div>
                      <div className="w-6 h-6 rounded-full bg-slate-100 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-300 -translate-x-2 group-hover:translate-x-0">
                        <ArrowUpRight className="w-3 h-3 text-[#1a1a1a]" />
                      </div>
                    </div>
                    <h2 className="text-3xl md:text-5xl font-black tracking-tighter leading-tight group-hover:text-slate-600 transition-colors duration-300">
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
                        <div key={item} className="flex items-center gap-3 group/item">
                          <span className="w-1.5 h-1.5 bg-[#1a1a1a] rounded-full group-hover/item:scale-150 transition-transform"></span>
                          <span className="text-sm font-medium text-slate-700">{item}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="pt-10">
                    <div className="inline-flex items-center gap-4 text-[11px] font-bold uppercase tracking-[0.2em] text-[#1a1a1a]">
                      Auditar Caso de Éxito y Metodología
                      <span className="w-12 h-px bg-[#1a1a1a] transition-all duration-500 group-hover:w-24"></span>
                    </div>
                  </div>
                </div>

                {/* Visual */}
                <div className={`lg:col-span-6 relative overflow-hidden bg-slate-50 ${idx % 2 !== 0 ? 'lg:order-1' : ''}`}>
                  <img 
                    src={project.image} 
                    alt={project.title}
                    fetchPriority={idx === 0 ? "high" : "low"}
                    loading={idx === 0 ? "eager" : "lazy"}
                    decoding="async"
                    className="object-cover grayscale-[0.3] group-hover:grayscale-0 group-hover:scale-105 transition-all duration-1000 w-full h-full absolute inset-0"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/10 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                  <div className="absolute top-10 right-10 p-6 bg-white/90 backdrop-blur-md shadow-xl rounded-lg text-center min-w-[140px] group-hover:shadow-2xl group-hover:-translate-y-1 transition-all duration-300">
                    <div className="text-[9px] font-mono text-slate-400 uppercase tracking-widest mb-1">{project.stats.label}</div>
                    <div className="text-lg font-black text-[#1a1a1a] tracking-tight">{project.stats.value}</div>
                  </div>
                </div>
              </div>
            </Link>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Interactive Ecosystem - Premium Integration */}
      <section className="py-32 bg-[#fafafa] border-y border-slate-200 overflow-hidden">
        <div className="max-w-7xl mx-auto px-6 mb-20 text-center space-y-6">
          <div className="text-[10px] font-mono text-slate-400 uppercase tracking-[0.5em]">Interactive Intelligence // v3.0</div>
          <h2 className="text-4xl md:text-6xl font-black text-[#1a1a1a] tracking-tighter">
            Ecosistema de <span className="text-slate-400 italic font-light">Inteligencia Espacial</span>
          </h2>
          <p className="max-w-2xl mx-auto text-slate-500 font-light text-lg leading-relaxed">
            Nuestra arquitectura unificada facilita el monitoreo táctico, la validación de inconsistencias topológicas y la gestión masiva de activos geográficos bajo estándares internacionales.
          </p>
        </div>

        <div className="max-w-7xl mx-auto px-6">
          <div className="w-full h-[680px] lg:h-[620px] rounded-[2.5rem] overflow-hidden shadow-[0_0_50px_rgba(0,0,0,0.5)] border border-slate-900 bg-slate-950/80 relative group hover:border-cyan-500/20 transition-all duration-500">
            <SovereignMapWrapper />
          </div>
        </div>
      </section>

      {/* Call to Action - Institutional */}
      <section className="py-40 bg-[#1a1a1a] text-white overflow-hidden relative">
        <div className="max-w-5xl mx-auto px-6 text-center space-y-12 relative z-10">
          <h2 className="text-5xl md:text-7xl font-black tracking-tighter leading-tight">
            Soberanía Territorial <br /> <span className="text-slate-500 font-light italic">y Alta Tecnología.</span>
          </h2>
          <p className="text-slate-400 text-xl font-light leading-relaxed max-w-2xl mx-auto">
            DGZ Engineering apoya a gobernaciones, gestores catastrales y corporaciones a estructurar sus datos territoriales bajo estándares LADM-COL e INTERLIS de clase mundial.
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
