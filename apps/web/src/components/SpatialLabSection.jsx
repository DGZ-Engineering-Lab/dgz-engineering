"use client";
import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import ShapefileUploader from "./ShapefileUploader";

export default function SpatialLabSection() {
  const [flags, setFlags] = useState({
    premium_viewer: false,
    experimental_gestures: true
  });

  useEffect(() => {
    const fetchFlags = async () => {
      try {
        const res = await fetch("/api/flags");
        const data = await res.json();
        setFlags(data);
      } catch (e) {}
    };
    fetchFlags();
  }, []);

  return (
    <section id="lab" className="relative w-full py-32 z-10 bg-[#05070a] overflow-hidden border-t border-slate-900">
      {/* Background Decor */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-full pointer-events-none">
        <div className="absolute top-0 left-1/4 w-[500px] h-[500px] bg-cyan-500/5 rounded-full blur-[120px]"></div>
        <div className="absolute bottom-0 right-1/4 w-[500px] h-[500px] bg-purple-500/5 rounded-full blur-[120px]"></div>
      </div>

      <div className="max-w-7xl mx-auto px-6 relative z-10">

        {/* Header */}
        <div className="flex flex-col items-center text-center mb-24 space-y-6">
          <div className="inline-flex items-center gap-3 px-4 py-1.5 bg-cyan-500/10 border border-cyan-500/20 rounded-full text-cyan-400 font-mono text-[10px] tracking-[0.4em] uppercase font-bold">
            // NODOS DE CONEXIÓN
          </div>
          <h2 className="text-5xl md:text-6xl font-black text-white tracking-tighter leading-tight">
            Laboratorio de <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-blue-500 to-purple-600">Inteligencia Espacial</span>
          </h2>
          <p className="text-xl text-slate-400 font-light max-w-4xl leading-relaxed">
            Demos interactivas de nodos geoespaciales de alto rendimiento. Automatización territorial, motores catastrales multipropósito e ingeniería de sistemas espaciales avanzados.
          </p>

          <div className="pt-4">
            <a href="/lab/gesture-sandbox" className="group relative inline-flex items-center gap-3 px-8 py-4 bg-slate-900/50 border border-slate-800 text-white rounded-2xl hover:border-cyan-500/50 hover:bg-slate-800 transition-all overflow-hidden shadow-xl">
              <div className="absolute inset-0 bg-gradient-to-r from-cyan-500/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity"></div>
              <svg className="w-5 h-5 text-cyan-400 group-hover:rotate-12 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 15l-2 5L9 9l11 4-5 2zm0 0l5 5M7.188 2.239l.777 2.897M5.136 7.965l-2.898-.777M13.95 4.05l-2.122 2.122m-5.657 5.656l-2.12 2.122" /></svg>
              <span className="font-bold tracking-widest text-xs uppercase">Sandbox IA Gestual (BETA)</span>
            </a>
          </div>
        </div>

        {/* Spatial Lab Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-32">

          {/* Card 1 */}
          <div className="group relative flex flex-col p-10 rounded-[2.5rem] bg-slate-900/10 border border-slate-800/50 hover:border-cyan-500/30 transition-all duration-500 hover:bg-slate-900/30 overflow-hidden">
            <div className="flex justify-between items-start mb-10">
              <div className="space-y-1">
                <span className="text-[10px] font-mono text-slate-500 uppercase tracking-widest block">SYS_NODE: VIEWER_01</span>
                {flags.premium_viewer && (
                  <span className="inline-flex items-center gap-1 px-2 py-0.5 bg-cyan-500/10 border border-cyan-500/30 rounded text-[8px] font-mono text-cyan-400 animate-pulse">
                    <svg className="w-2 h-2" fill="currentColor" viewBox="0 0 20 20"><path d="M11 3a1 1 0 10-2 0v1a1 1 0 102 0V3zM15.657 5.757a1 1 0 00-1.414-1.414l-.707.707a1 1 0 001.414 1.414l.707-.707zM18 10a1 1 0 01-1 1h-1a1 1 0 110-2h1a1 1 0 011 1zM5.05 6.464A1 1 0 106.464 5.05l-.707-.707a1 1 0 00-1.414 1.414l.707.707zM5 10a1 1 0 01-1 1H3a1 1 0 110-2h1a1 1 0 011 1zM8 16v-1a1 1 0 112 0v1a1 1 0 11-2 0zM13.536 14.95a1 1 0 010-1.414l.707-.707a1 1 0 011.414 1.414l-.707.707a1 1 0 01-1.414 0zM6.464 14.95l-.707-.707a1 1 0 011.414-1.414l.707.707a1 1 0 01-1.414 1.414z" /></svg>
                    PREMIUM_EDGE_ACTIVE
                  </span>
                )}
              </div>
              <div className="w-14 h-14 rounded-2xl bg-cyan-500/10 text-cyan-400 flex items-center justify-center group-hover:scale-110 group-hover:bg-cyan-500 group-hover:text-black transition-all duration-500 shadow-lg border border-cyan-500/20">
                <svg className="w-7 h-7" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 20l-5.447-2.724A1 1 0 013 16.382V5.618a1 1 0 011.447-.894L9 7m0 13l6-3m-6 3V7m6 10l4.553 2.276A1 1 0 0021 18.382V7.618a1 1 0 00-.553-.894L15 4m0 13V4m0 0L9 7" /></svg>
              </div>
            </div>
            <h3 className="text-2xl font-bold text-white mb-4 tracking-tight">Interactive Spatial Node</h3>
            <p className="text-slate-400 text-base leading-relaxed mb-10 font-light">
              Visor GIS de alta precisión con renderizado de parcelas en tiempo real. Interacción con datasets locales exportados de QGIS con atributos topológicos profundos.
            </p>
            <div className="flex flex-wrap gap-2 mb-10 mt-auto">
              {["MapLibre GL", "Vector Tiles", "PostGIS"].map(t => (
                <span key={t} className="px-3 py-1.5 text-[9px] font-mono text-cyan-400 bg-cyan-500/5 border border-cyan-500/20 rounded-md">{t}</span>
              ))}
            </div>
            <div className="flex items-center justify-between pt-8 border-t border-slate-800/50">
              <span className="text-[10px] text-emerald-500 font-mono flex items-center gap-2 uppercase tracking-widest"><span className="w-1.5 h-1.5 bg-emerald-500 rounded-full animate-pulse"></span> Node Operational</span>
              <a href="/projects/gis-dashboard" className="text-xs font-bold text-white hover:text-cyan-400 transition-colors uppercase tracking-widest">Launch →</a>
            </div>
          </div>

          {/* Card 2 */}
          <div className="group relative flex flex-col p-10 rounded-[2.5rem] bg-slate-900/10 border border-slate-800/50 hover:border-amber-500/30 transition-all duration-500 hover:bg-slate-900/30 overflow-hidden">
            <div className="flex justify-between items-start mb-10">
              <span className="text-[10px] font-mono text-slate-500 uppercase tracking-widest">SYS_NODE: VALIDATOR_02</span>
              <div className="w-14 h-14 rounded-2xl bg-amber-500/10 text-amber-500 flex items-center justify-center group-hover:scale-110 group-hover:bg-amber-500 group-hover:text-black transition-all duration-500 shadow-lg border border-amber-500/20">
                <svg className="w-7 h-7" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" /></svg>
              </div>
            </div>
            <h3 className="text-2xl font-bold text-white mb-4 tracking-tight">Cadastral Intelligence</h3>
            <p className="text-slate-400 text-base leading-relaxed mb-10 font-light">
              Validador automático LADM-COL V3. Detección de traslapes, slivers e inconsistencias topológicas mediante kernels de Python de alta fidelidad.
            </p>
            <div className="flex flex-wrap gap-2 mb-10 mt-auto">
              {["FastAPI", "Shapely", "Topology"].map(t => (
                <span key={t} className="px-3 py-1.5 text-[9px] font-mono text-amber-500 bg-amber-500/5 border border-amber-500/20 rounded-md">{t}</span>
              ))}
            </div>
            <div className="flex items-center justify-between pt-8 border-t border-slate-800/50">
              <span className="text-[10px] text-amber-500 font-mono uppercase tracking-widest">Kernel Beta</span>
              <button className="text-xs font-bold text-white hover:text-amber-400 transition-colors uppercase tracking-widest">Initialize →</button>
            </div>
          </div>

          {/* Card 3 */}
          <div className="group relative flex flex-col p-10 rounded-[2.5rem] bg-slate-900/10 border border-slate-800/50 hover:border-emerald-500/30 transition-all duration-500 hover:bg-slate-900/30 overflow-hidden">
            <div className="flex justify-between items-start mb-10">
              <span className="text-[10px] font-mono text-slate-500 uppercase tracking-widest">SYS_NODE: PIPELINE_03</span>
              <div className="w-14 h-14 rounded-2xl bg-emerald-500/10 text-emerald-500 flex items-center justify-center group-hover:scale-110 group-hover:bg-emerald-500 group-hover:text-black transition-all duration-500 shadow-lg border border-emerald-500/20">
                <svg className="w-7 h-7" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M8 7v8a2 2 0 002 2h6M8 7V5a2 2 0 012-2h4.586a1 1 0 01.707.293l4.414 4.414a1 1 0 01.293.707V15a2 2 0 01-2 2h-2M8 7H6a2 2 0 00-2 2v10a2 2 0 002 2h8a2 2 0 002-2v-2" /></svg>
              </div>
            </div>
            <h3 className="text-2xl font-bold text-white mb-4 tracking-tight">Sovereign Pipelines</h3>
            <p className="text-slate-400 text-base leading-relaxed mb-10 font-light">
              Arquitectura ETL desatendida para ingestión geoespacial masiva, garantizando la integridad de datos a través de nodos GIS distribuidos.
            </p>
            <div className="flex flex-wrap gap-2 mb-10 mt-auto">
              {["GDAL/OGR", "ETL", "CI/CD"].map(t => (
                <span key={t} className="px-3 py-1.5 text-[9px] font-mono text-emerald-500 bg-emerald-500/5 border border-emerald-500/20 rounded-md">{t}</span>
              ))}
            </div>
            <div className="flex items-center justify-between pt-8 border-t border-slate-800/50">
              <span className="text-[10px] text-emerald-500 font-mono uppercase tracking-widest">System Stable</span>
              <div className="text-emerald-500"><svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 9l3 3-3 3m5 0h3M5 20h14a2 2 0 002-2V6a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" /></svg></div>
            </div>
          </div>

        </div>

        {/* Flagship Projects - Carousel Implementation */}
        <div className="pt-32 border-t border-slate-800/50">
          <ProjectCarousel />
        </div>

        {/* Async Geometry Validator - Expert Node */}
        <div className="mt-20 max-w-4xl mx-auto">
          <div className="text-center mb-10 space-y-4">
             <div className="text-[10px] font-mono text-indigo-400 uppercase tracking-[0.3em]">Módulo de Validación Masiva</div>
             <h3 className="text-3xl font-black text-white tracking-tighter">Auditoría Topológica <span className="italic font-light text-slate-500">Asíncrona</span></h3>
             <p className="text-slate-400 text-sm max-w-2xl mx-auto">Cargue archivos Shapefile (.zip) para ejecutar procesos de limpieza topológica LADM-COL en nuestro clúster de computación distribuida.</p>
          </div>
          <ShapefileUploader />
        </div>

      </div>
    </section>
  );
}

function ProjectCarousel() {
  const [activeIndex, setActiveIndex] = useState(0);

  const projects = [
    {
      id: "PROJ-CM-01",
      tag: "FLAGSHIP_NODE",
      status: "PRODUCTION STABLE",
      title: "ConstruMetrix GIS",
      desc: "Monitoreo GIS a nivel empresarial para infraestructura urbana moderna. Sincronización de telemetría en tiempo real a través de nodos distribuidos.",
      img: "/assets/img/logo-construmetrix.svg",
      link: "https://daga21gz.github.io/ConstruMetrix/",
      tech: ["POSTGIS", "PYQGIS", "REST_API"],
      accent: "cyan"
    },
    {
      id: "PROJ-GLLM-05",
      tag: "GEO_LLM_05",
      status: "R&D KERNEL",
      title: "Geo-LLM Intelligence",
      desc: "Agente de IA que traduce lenguaje natural a Spatial SQL y genera informes catastrales estadísticos en tiempo real.",
      img: null,
      icon: "🤖",
      link: "/projects/geo-llm",
      tech: ["LLM", "PostGIS AI", "GeoJSON"],
      accent: "amber"
    },
    {
      id: "PROJ-DASH-02",
      tag: "DASHBOARD_02",
      status: "LIVE_NODE",
      title: "Enterprise GIS Dashboard",
      desc: "Interfaz interactiva conectada a PostGIS para análisis territorial y telemetría en tiempo real.",
      img: null,
      icon: "📊",
      link: "/projects/gis-dashboard",
      tech: ["React", "PostGIS", "MapLibre"],
      accent: "cyan"
    },
    {
      id: "PROJ-AUTO-01",
      tag: "AUTOMATION_01",
      status: "ACTIVE_PIPELINE",
      title: "Territorial ETL Pipelines",
      desc: "Automatización desatendida de transformaciones de datos geográficos para evitar procesos manuales lentos.",
      img: null,
      icon: "⚙️",
      link: "/projects/automation-systems",
      tech: ["Python", "FME", "GDAL"],
      accent: "blue"
    },
    {
      id: "PROJ-QGIS-03",
      tag: "PYQGIS_PLUGIN",
      status: "STABLE_TOOL",
      title: "LADM-COL QGIS Plugin",
      desc: "Herramientas nativas en la UI de QGIS para validación topológica instantánea de bases de datos territoriales.",
      img: null,
      icon: "🔌",
      link: "/projects/qgis-plugin",
      tech: ["PyQGIS", "LADM-COL", "Python"],
      accent: "purple"
    },
    {
      id: "PROJ-EVA-01",
      tag: "AI_ASSISTANT_NODE",
      status: "STABLE_PRODUCTION",
      title: "E.V.A. Framework",
      desc: "Engineering Virtual Assistant. Framework avanzado de IA para la automatización de procesos de ingeniería y soporte técnico especializado.",
      img: null,
      icon: "🧠",
      link: "https://dgz-engineering-lab.github.io/E.V.A/",
      tech: ["AI_AGENT", "AUTOMATION", "NODE.JS"],
      accent: "purple"
    }
  ];

  const next = () => setActiveIndex((prev) => (prev + 1) % projects.length);
  const prev = () => setActiveIndex((prev) => (prev - 1 + projects.length) % projects.length);

  const activeProject = projects[activeIndex];

  return (
    <div className="relative">
      <div className="flex flex-col md:flex-row items-center justify-between mb-16 gap-8">
        <div className="space-y-2">
          <div className="flex items-center gap-3">
            <div className="w-8 h-[1px] bg-cyan-500"></div>
            <span className="text-[10px] font-mono text-cyan-500 uppercase tracking-[0.4em]">Portfolio Exhibit</span>
          </div>
          <h2 className="text-4xl font-black text-white tracking-tighter">Proyectos <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-blue-600">Destacados</span></h2>
        </div>

        {/* Carousel Controls */}
        <div className="flex items-center gap-6">
          <div className="flex gap-1.5 mr-4">
            {projects.map((_, i) => (
              <button
                key={i}
                onClick={() => setActiveIndex(i)}
                className={`h-1.5 transition-all duration-500 rounded-full ${i === activeIndex ? 'w-10 bg-cyan-500' : 'w-2 bg-slate-800 hover:bg-slate-700'}`}
              />
            ))}
          </div>
          <div className="flex gap-2">
            <button onClick={prev} className="p-4 rounded-2xl border border-slate-800 text-slate-400 hover:text-white hover:border-cyan-500 transition-all bg-slate-900/40 backdrop-blur-md">
              <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" /></svg>
            </button>
            <button onClick={next} className="p-4 rounded-2xl border border-slate-800 text-slate-400 hover:text-white hover:border-cyan-500 transition-all bg-slate-900/40 backdrop-blur-md">
              <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" /></svg>
            </button>
          </div>
        </div>
      </div>

      {/* Active Project Card */}
      <div className="relative min-h-[450px] group">
        <div className="absolute inset-0 bg-cyan-500/5 blur-[120px] rounded-full pointer-events-none group-hover:bg-cyan-500/10 transition-colors"></div>

        <div className="relative bg-[#0a0f16]/60 backdrop-blur-xl border border-slate-800/50 rounded-[3rem] overflow-hidden shadow-2xl flex flex-col lg:flex-row animate-in fade-in slide-in-from-right-8 duration-700">

          {/* Visual Side */}
          <div className="w-full lg:w-1/2 min-h-[350px] relative bg-[#05070a] flex items-center justify-center overflow-hidden border-b lg:border-b-0 lg:border-r border-slate-800/50">
            <div className="absolute inset-0 opacity-[0.15]" style={{ backgroundImage: 'radial-gradient(circle, #0e7490 1px, transparent 1px)', backgroundSize: '32px 32px' }}></div>

            <div className="relative z-10 transition-all duration-700 group-hover:scale-110 flex flex-col items-center">
              {activeProject.img ? (
                <img
                  src={activeProject.img}
                  alt={activeProject.title}
                  className="w-2/3 max-w-[280px] grayscale group-hover:grayscale-0 drop-shadow-[0_0_40px_rgba(0,229,255,0.3)] transition-all"
                />
              ) : (
                <div className="text-[140px] drop-shadow-[0_0_40px_rgba(0,229,255,0.2)]">
                  {activeProject.icon}
                </div>
              )}
            </div>

            {/* Scanning Line Effect */}
            <div className="absolute top-0 left-0 w-full h-[2px] bg-gradient-to-r from-transparent via-cyan-500 to-transparent shadow-[0_0_15px_cyan] animate-scan z-20"></div>
          </div>

          {/* Info Side */}
          <div className="w-full lg:w-1/2 p-10 lg:p-16 flex flex-col justify-center space-y-8">
            <div className="flex justify-between items-center">
              <span className="font-mono text-[10px] text-cyan-500 tracking-[0.4em] uppercase font-bold">{activeProject.tag}</span>
              <div className="flex items-center gap-2 px-4 py-1.5 bg-emerald-500/10 border border-emerald-500/20 rounded-full">
                <span className="w-1.5 h-1.5 bg-emerald-500 rounded-full animate-pulse"></span>
                <span className="text-[9px] font-black text-emerald-400 uppercase tracking-widest">{activeProject.status}</span>
              </div>
            </div>

            <div className="space-y-4">
              <h3 className="text-4xl lg:text-5xl font-black text-white tracking-tighter leading-none group-hover:text-cyan-400 transition-colors">
                {activeProject.title}
              </h3>
              <p className="text-xl text-slate-400 leading-relaxed font-light">
                {activeProject.desc}
              </p>
            </div>

            <div className="flex flex-wrap gap-2.5">
              {activeProject.tech.map((t, i) => (
                <span key={i} className="px-4 py-2 bg-slate-900 border border-slate-800 text-[10px] font-mono text-slate-500 rounded-xl uppercase tracking-widest group-hover:border-cyan-500/30 group-hover:text-cyan-400 transition-all">
                  {t}
                </span>
              ))}
            </div>

            <div className="pt-6">
              <a
                href={activeProject.link}
                target="_blank"
                rel="noreferrer"
                className="group/btn relative inline-flex items-center justify-center px-12 py-5 bg-white text-black font-black text-xs rounded-2xl hover:bg-cyan-500 transition-all shadow-2xl uppercase tracking-[0.2em] overflow-hidden"
              >
                <span className="relative z-10">Explorar Nodo</span>
                <div className="absolute inset-0 bg-cyan-400 translate-y-full group-hover/btn:translate-y-0 transition-transform duration-300"></div>
              </a>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
}
