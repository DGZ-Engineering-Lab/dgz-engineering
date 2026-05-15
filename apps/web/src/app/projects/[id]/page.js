"use client";
import { useState } from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import { useParams } from "next/navigation";
import Logo from "../../../components/Logo";

// --- PROJECT DEFINITIONS ---

const PROJECTS_DATA = {
  "catastro-valle": {
    title: "Catastro Multipropósito: Valle del Cauca",
    category: "Gestión Territorial",
    tagline: "Soberanía fiscal y seguridad jurídica mediante el estándar LADM-COL.",
    image: "https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&q=80&w=1200",
    description: "Este proyecto representa la vanguardia en administración de tierras en Colombia. Implementamos un ecosistema completo basado en la norma ISO 19152 para descentralizar la gestión catastral del departamento, garantizando interoperabilidad con el IGAC y el SNR.",
    goals: [
      "Armonización de datos alfanuméricos y geográficos.",
      "Cumplimiento 100% de los esquemas INTERLIS (.xtf).",
      "Habilitación de trámites ciudadanos en tiempo real."
    ],
    challenges: "La disparidad de información entre el registro y el catastro fue el mayor bloqueo. La solución fue un motor de conciliación automática de linderos.",
    impact: [
      { label: "Área Mapeada", value: "22,140 km2" },
      { label: "Precisión Legal", value: "Grado 1" },
      { label: "Interoperabilidad", value: "VUR / SNR" }
    ],
    lab: "CADASTRE_VIEWER"
  },
  "qgis-plugin": {
    title: "LADM-COL QGIS Plugin",
    category: "Software de Ingeniería",
    tagline: "Validación topológica nativa para gestores territoriales.",
    image: "https://images.unsplash.com/photo-1581092160562-40aa08e78837?auto=format&fit=crop&q=80&w=1200",
    description: "Herramienta industrial diseñada para la validación instantánea de bases de datos territoriales bajo el estándar LADM-COL. Optimiza el flujo de trabajo eliminando errores manuales en la edición cartográfica.",
    goals: [
      "Detección de traslapes y huecos en tiempo real.",
      "Sincronización directa con bases de datos PostGIS.",
      "Generación de reportes de conformidad técnica automáticos."
    ],
    challenges: "El procesamiento de grandes volúmenes de datos espaciales en el cliente era lento. Optimizamos el motor usando PyQGIS y algoritmos de poda espacial.",
    impact: [
      { label: "Error Humano", value: "-95%" },
      { label: "Velocidad", value: "10x Faster" },
      { label: "Soporte", value: "QGIS 3.x" }
    ],
    lab: "PLUGIN_SIMULATOR"
  },
  "automation-systems": {
    title: "Territorial ETL Pipelines",
    category: "Infraestructura de Datos",
    tagline: "Automatización geoespacial desatendida de alto rendimiento.",
    image: "https://images.unsplash.com/photo-1451187580459-43490279c0fa?auto=format&fit=crop&q=80&w=1200",
    description: "Sistemas de orquestación de datos para la migración y transformación masiva de archivos GML, GeoJSON y XTF. Diseñado para alta disponibilidad en entornos gubernamentales críticos.",
    goals: [
      "Orquestación desatendida mediante motores GDAL.",
      "Validación contra modelos INTERLIS oficiales.",
      "Trazabilidad completa de cada transformación."
    ],
    challenges: "La heterogeneidad de los formatos origen impedía una migración limpia. Desarrollamos un traductor universal de esquemas territoriales.",
    impact: [
      { label: "Registros/Día", value: "500k+" },
      { label: "Uptime", value: "99.99%" },
      { label: "Seguridad", value: "AES-256" }
    ],
    lab: "PIPELINE_MONITOR"
  },
  "geo-llm": {
    title: "Geo-LLM Intelligence",
    category: "Inteligencia Artificial",
    tagline: "Análisis espacial avanzado mediante lenguaje natural.",
    image: "https://images.unsplash.com/photo-1485827404703-89b55fcc595e?auto=format&fit=crop&q=80&w=1200",
    description: "Motor de IA que permite interactuar con bases de datos geográficas mediante lenguaje natural. Convierte preguntas complejas en consultas espaciales precisas sobre el territorio.",
    goals: [
      "Traducción de lenguaje natural a Spatial SQL.",
      "Análisis predictivo de crecimiento urbano.",
      "Generación automática de reportes territoriales."
    ],
    challenges: "La ambigüedad del lenguaje natural en consultas espaciales. Implementamos una capa de validación semántica sobre esquemas PostGIS.",
    impact: [
      { label: "Accesibilidad", value: "User-Centric" },
      { label: "Motor", value: "LLM-Hybrid" },
      { label: "Data", value: "Real-Time SQL" }
    ],
    lab: "AI_CHAT_LAB"
  }
};

export default function ProjectDetailPage() {
  const params = useParams();
  const id = params.id;
  const project = PROJECTS_DATA[id];

  if (!project) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-white text-[#1a1a1a]">
        <div className="text-center space-y-6">
          <h1 className="text-4xl font-black text-slate-200">404 // Proyecto No Encontrado</h1>
          <Link href="/projects" className="text-slate-400 hover:underline">Volver al Portfolio</Link>
        </div>
      </div>
    );
  }

  return (
    <div className="flex flex-col w-full bg-white text-[#1a1a1a] min-h-screen pt-32 pb-20">
      <article className="max-w-7xl mx-auto px-6">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16">
          
          <div className="lg:col-span-8">
            <div className="space-y-8 mb-20 border-b border-slate-100 pb-16">
              <div className="flex items-center gap-4 text-[10px] font-mono text-slate-400 uppercase tracking-[0.3em]">
                <span className="text-[#1a1a1a] font-bold">{project.category}</span>
                <span className="w-1 h-1 bg-slate-300 rounded-full"></span>
                <span>Engineering Case Study</span>
              </div>
              <h1 className="text-5xl md:text-7xl font-black tracking-tighter leading-[0.95] text-[#1a1a1a]">
                {project.title}
              </h1>
              <p className="text-2xl text-slate-500 font-light italic border-l-2 border-slate-200 pl-8 py-2">
                {project.tagline}
              </p>
            </div>

            <div className="aspect-[21/9] overflow-hidden bg-slate-100 mb-20 rounded-sm">
              <img src={project.image} alt={project.title} className="w-full h-full object-cover grayscale-[0.2]" />
            </div>

            <div className="space-y-16">
              <section className="space-y-6">
                <h2 className="text-4xl font-black tracking-tight text-[#1a1a1a]">Resumen de Entrega</h2>
                <p className="text-xl text-slate-600 font-light leading-relaxed">{project.description}</p>
              </section>

              <section className="grid grid-cols-1 md:grid-cols-2 gap-12">
                <div className="space-y-6">
                  <h3 className="text-2xl font-bold tracking-tight">Objetivos Estratégicos</h3>
                  <ul className="space-y-4">
                    {project.goals.map(goal => (
                      <li key={goal} className="flex gap-4 items-start text-slate-500 font-light">
                        <span className="w-1.5 h-1.5 bg-[#1a1a1a] rounded-full mt-2.5 flex-shrink-0"></span>
                        {goal}
                      </li>
                    ))}
                  </ul>
                </div>
                <div className="space-y-6">
                  <h3 className="text-2xl font-bold tracking-tight">Desafíos Superados</h3>
                  <p className="text-slate-500 font-light leading-relaxed">{project.challenges}</p>
                </div>
              </section>

              {/* Dynamic Lab Viewer Based on Project Type */}
              <div className="p-12 bg-[#fafafa] border border-slate-100 rounded-sm space-y-8">
                <div className="flex items-center justify-between">
                  <div className="space-y-1">
                    <div className="text-[10px] font-mono text-slate-400 uppercase tracking-widest">Immersion Lab // Interactive Viewer</div>
                    <div className="text-sm font-bold text-[#1a1a1a]">Módulo de Visualización en Tiempo Real</div>
                  </div>
                  <div className="w-10 h-10 bg-[#1a1a1a] rounded-full flex items-center justify-center text-white text-xs">
                    →
                  </div>
                </div>
                <div className="aspect-video bg-white border border-slate-200 rounded-sm flex items-center justify-center">
                   <div className="text-center space-y-4">
                      <div className="w-12 h-12 border-4 border-slate-100 border-t-[#1a1a1a] rounded-full animate-spin mx-auto"></div>
                      <span className="block text-[10px] font-mono text-slate-300 uppercase tracking-[0.3em]">Secure Data Stream: Loading {project.lab}...</span>
                   </div>
                </div>
              </div>
            </div>

            <div className="mt-32 pt-20 border-t border-slate-100 flex flex-col md:flex-row justify-between items-center gap-8">
              <div className="flex items-center gap-4">
                <Logo className="w-12 h-12 opacity-80" />
                <div className="flex flex-col">
                  <span className="text-xs font-black uppercase tracking-widest text-[#1a1a1a]">DevGiz Engineering</span>
                  <span className="text-[10px] text-slate-400 font-mono">Territorial Infrastructure Lab</span>
                </div>
              </div>
              <Link href="/projects" className="px-8 py-4 bg-[#1a1a1a] text-white text-[10px] font-bold uppercase tracking-[0.2em] hover:bg-slate-800 transition-all shadow-xl">
                Volver al Portfolio de Ingeniería
              </Link>
            </div>
          </div>

          <div className="lg:col-span-4">
            <div className="sticky top-32 space-y-12">
              <div className="p-10 bg-[#fafafa] border border-slate-100 rounded-sm">
                <h3 className="text-[10px] font-mono text-slate-400 uppercase tracking-[0.3em] mb-10 border-b border-slate-200 pb-4">
                  Especificaciones Técnicas
                </h3>
                <div className="space-y-10">
                  {project.impact.map(stat => (
                    <div key={stat.label} className="space-y-1">
                      <div className="text-[9px] font-mono text-slate-500 uppercase tracking-widest">{stat.label}</div>
                      <div className="text-2xl font-black text-[#1a1a1a] tracking-tight">{stat.value}</div>
                    </div>
                  ))}
                </div>
              </div>

              <div className="p-10 bg-[#1a1a1a] text-white space-y-8 rounded-sm shadow-2xl">
                <h4 className="text-2xl font-black tracking-tight leading-tight">¿Requiere una solución a medida?</h4>
                <p className="text-slate-400 text-sm font-light">Diseñamos arquitecturas de datos espaciales adaptadas a la normativa vigente.</p>
                <Link href="/#contact" className="block text-center py-4 bg-white text-black text-[10px] font-bold uppercase tracking-[0.2em] hover:bg-slate-200 transition-all">Consultoría Técnica</Link>
              </div>
            </div>
          </div>
        </div>
      </article>
    </div>
  );
}
