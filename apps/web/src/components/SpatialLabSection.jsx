"use client";
import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";

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
    <div className="relative w-full py-16 lg:py-24 z-10 bg-transparent overflow-hidden">
      {/* Background Decor */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-full pointer-events-none">
        <div className="absolute top-0 left-1/4 w-[600px] h-[600px] bg-cyan-500/10 rounded-full blur-[150px]"></div>
        <div className="absolute bottom-0 right-1/4 w-[600px] h-[600px] bg-purple-500/10 rounded-full blur-[150px]"></div>
      </div>

      <div className="max-w-6xl mx-auto px-6 relative z-10">

        {/* Header */}
        <div className="flex flex-col items-center text-center mb-20 space-y-6">
          <div className="inline-flex items-center gap-3 px-5 py-2 bg-cyan-500/10 border border-cyan-500/30 rounded-full text-cyan-400 font-mono text-[10px] tracking-[0.4em] uppercase font-bold shadow-[0_0_20px_rgba(6,182,212,0.15)]">
            <span className="w-2 h-2 rounded-full bg-cyan-400 animate-pulse"></span>
            NODOS DE CONEXIÓN
          </div>
          <h2 className="text-5xl md:text-7xl font-black text-white tracking-tighter leading-none">
            Laboratorio de <br className="hidden md:block"/> <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-blue-500 to-indigo-500 drop-shadow-[0_0_30px_rgba(6,182,212,0.4)]">Inteligencia Espacial</span>
          </h2>
          <p className="text-xl text-slate-400 font-light max-w-3xl leading-relaxed">
            Demos interactivas de nodos geoespaciales de alto rendimiento. Automatización territorial, motores catastrales multipropósito e ingeniería de sistemas espaciales avanzados.
          </p>

          <div className="pt-6">
            <Link href="/lab/gesture-sandbox" className="group relative inline-flex items-center gap-3 px-8 py-4 bg-slate-900/80 border border-slate-700 text-white rounded-2xl hover:border-cyan-500 hover:bg-slate-800 transition-all overflow-hidden shadow-2xl backdrop-blur-xl">
              <div className="absolute inset-0 bg-gradient-to-r from-cyan-500/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity"></div>
              <svg className="w-6 h-6 text-cyan-400 group-hover:rotate-12 group-hover:scale-110 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 15l-2 5L9 9l11 4-5 2zm0 0l5 5M7.188 2.239l.777 2.897M5.136 7.965l-2.898-.777M13.95 4.05l-2.122 2.122m-5.657 5.656l-2.12 2.122" /></svg>
              <span className="font-bold tracking-[0.2em] text-xs uppercase z-10 relative">Sandbox IA Gestual (BETA)</span>
            </Link>
          </div>
        </div>

        {/* Spatial Lab Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-24">

          {/* Card 1 */}
          <div className="group relative flex flex-col p-10 rounded-[2.5rem] bg-[#02040a]/80 backdrop-blur-xl border border-slate-800/80 hover:border-cyan-500/50 transition-all duration-500 hover:-translate-y-2 shadow-xl hover:shadow-[0_20px_40px_-10px_rgba(6,182,212,0.2)] overflow-hidden">
            <div className="flex justify-between items-start mb-10 relative z-10">
              <div className="space-y-2">
                <span className="text-[10px] font-mono text-slate-500 uppercase tracking-[0.2em] block font-bold">SYS_NODE: VIEWER_01</span>
                {flags.premium_viewer && (
                  <span className="inline-flex items-center gap-1.5 px-2.5 py-1 bg-cyan-500/10 border border-cyan-500/30 rounded text-[9px] font-mono text-cyan-400 animate-pulse">
                    <svg className="w-2.5 h-2.5" fill="currentColor" viewBox="0 0 20 20"><path d="M11 3a1 1 0 10-2 0v1a1 1 0 102 0V3zM15.657 5.757a1 1 0 00-1.414-1.414l-.707.707a1 1 0 001.414 1.414l.707-.707zM18 10a1 1 0 01-1 1h-1a1 1 0 110-2h1a1 1 0 011 1zM5.05 6.464A1 1 0 106.464 5.05l-.707-.707a1 1 0 00-1.414 1.414l.707.707zM5 10a1 1 0 01-1 1H3a1 1 0 110-2h1a1 1 0 011 1zM8 16v-1a1 1 0 112 0v1a1 1 0 11-2 0zM13.536 14.95a1 1 0 010-1.414l.707-.707a1 1 0 011.414 1.414l-.707.707a1 1 0 01-1.414 0zM6.464 14.95l-.707-.707a1 1 0 011.414-1.414l.707.707a1 1 0 01-1.414 1.414z" /></svg>
                    PREMIUM_EDGE_ACTIVE
                  </span>
                )}
              </div>
              <div className="w-14 h-14 rounded-2xl bg-slate-900 border border-slate-700 text-cyan-400 flex items-center justify-center group-hover:scale-110 group-hover:bg-cyan-500 group-hover:text-black transition-all duration-500 shadow-lg">
                <svg className="w-7 h-7" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 20l-5.447-2.724A1 1 0 013 16.382V5.618a1 1 0 011.447-.894L9 7m0 13l6-3m-6 3V7m6 10l4.553 2.276A1 1 0 0021 18.382V7.618a1 1 0 00-.553-.894L15 4m0 13V4m0 0L9 7" /></svg>
              </div>
            </div>
            <h3 className="text-2xl font-bold text-white mb-4 tracking-tight relative z-10">Interactive Spatial Node</h3>
            <p className="text-slate-400 text-base leading-relaxed mb-10 font-light relative z-10">
              Visor GIS de alta precisión con renderizado de parcelas en tiempo real. Interacción con datasets locales exportados de QGIS con atributos topológicos profundos.
            </p>
            <div className="flex flex-wrap gap-2 mb-10 mt-auto relative z-10">
              {["MapLibre GL", "Vector Tiles", "PostGIS"].map(t => (
                <span key={t} className="px-3 py-1.5 text-[10px] font-mono text-cyan-400 bg-cyan-500/10 border border-cyan-500/30 rounded-lg">{t}</span>
              ))}
            </div>
            <div className="flex items-center justify-between pt-8 border-t border-slate-800/80 relative z-10">
              <span className="text-[10px] text-emerald-500 font-mono flex items-center gap-2 uppercase tracking-widest"><span className="w-1.5 h-1.5 bg-emerald-500 rounded-full animate-pulse shadow-[0_0_10px_#10b981]"></span> Node Operational</span>
              <Link href="/projects/gis-dashboard" className="text-xs font-bold text-white group-hover:text-cyan-400 transition-colors uppercase tracking-widest flex items-center gap-1">Launch <svg className="w-4 h-4 group-hover:translate-x-1 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" /></svg></Link>
            </div>
            {/* Hover Glow */}
            <div className="absolute inset-0 bg-gradient-to-b from-cyan-500/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity"></div>
          </div>

          {/* Card 2 */}
          <div className="group relative flex flex-col p-10 rounded-[2.5rem] bg-[#02040a]/80 backdrop-blur-xl border border-slate-800/80 hover:border-amber-500/50 transition-all duration-500 hover:-translate-y-2 shadow-xl hover:shadow-[0_20px_40px_-10px_rgba(245,158,11,0.2)] overflow-hidden">
            <div className="flex justify-between items-start mb-10 relative z-10">
              <span className="text-[10px] font-mono text-slate-500 uppercase tracking-[0.2em] font-bold">SYS_NODE: VALIDATOR_02</span>
              <div className="w-14 h-14 rounded-2xl bg-slate-900 border border-slate-700 text-amber-500 flex items-center justify-center group-hover:scale-110 group-hover:bg-amber-500 group-hover:text-black transition-all duration-500 shadow-lg">
                <svg className="w-7 h-7" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" /></svg>
              </div>
            </div>
            <h3 className="text-2xl font-bold text-white mb-4 tracking-tight relative z-10">Cadastral Intelligence</h3>
            <p className="text-slate-400 text-base leading-relaxed mb-10 font-light relative z-10">
              Validador automático LADM-COL V3. Detección de traslapes, slivers e inconsistencias topológicas mediante kernels de Python de alta fidelidad.
            </p>
            <div className="flex flex-wrap gap-2 mb-10 mt-auto relative z-10">
              {["FastAPI", "Shapely", "Topology"].map(t => (
                <span key={t} className="px-3 py-1.5 text-[10px] font-mono text-amber-500 bg-amber-500/10 border border-amber-500/30 rounded-lg">{t}</span>
              ))}
            </div>
            <div className="flex items-center justify-between pt-8 border-t border-slate-800/80 relative z-10">
              <span className="text-[10px] text-amber-500 font-mono uppercase tracking-widest flex items-center gap-2"><span className="w-1.5 h-1.5 bg-amber-500 rounded-full animate-pulse shadow-[0_0_10px_#f59e0b]"></span> Kernel Beta</span>
              <button className="text-xs font-bold text-white group-hover:text-amber-400 transition-colors uppercase tracking-widest flex items-center gap-1">Initialize <svg className="w-4 h-4 group-hover:rotate-90 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" /></svg></button>
            </div>
             <div className="absolute inset-0 bg-gradient-to-b from-amber-500/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity"></div>
          </div>

          {/* Card 3 */}
          <div className="group relative flex flex-col p-10 rounded-[2.5rem] bg-[#02040a]/80 backdrop-blur-xl border border-slate-800/80 hover:border-emerald-500/50 transition-all duration-500 hover:-translate-y-2 shadow-xl hover:shadow-[0_20px_40px_-10px_rgba(16,185,129,0.2)] overflow-hidden">
            <div className="flex justify-between items-start mb-10 relative z-10">
              <span className="text-[10px] font-mono text-slate-500 uppercase tracking-[0.2em] font-bold">SYS_NODE: PIPELINE_03</span>
              <div className="w-14 h-14 rounded-2xl bg-slate-900 border border-slate-700 text-emerald-500 flex items-center justify-center group-hover:scale-110 group-hover:bg-emerald-500 group-hover:text-black transition-all duration-500 shadow-lg">
                <svg className="w-7 h-7" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M8 7v8a2 2 0 002 2h6M8 7V5a2 2 0 012-2h4.586a1 1 0 01.707.293l4.414 4.414a1 1 0 01.293.707V15a2 2 0 01-2 2h-2M8 7H6a2 2 0 00-2 2v10a2 2 0 002 2h8a2 2 0 002-2v-2" /></svg>
              </div>
            </div>
            <h3 className="text-2xl font-bold text-white mb-4 tracking-tight relative z-10">Sovereign Pipelines</h3>
            <p className="text-slate-400 text-base leading-relaxed mb-10 font-light relative z-10">
              Arquitectura ETL desatendida para ingestión geoespacial masiva, garantizando la integridad de datos a través de nodos GIS distribuidos.
            </p>
            <div className="flex flex-wrap gap-2 mb-10 mt-auto relative z-10">
              {["GDAL/OGR", "ETL", "CI/CD"].map(t => (
                <span key={t} className="px-3 py-1.5 text-[10px] font-mono text-emerald-500 bg-emerald-500/10 border border-emerald-500/30 rounded-lg">{t}</span>
              ))}
            </div>
            <div className="flex items-center justify-between pt-8 border-t border-slate-800/80 relative z-10">
              <span className="text-[10px] text-emerald-500 font-mono uppercase tracking-widest flex items-center gap-2"><span className="w-1.5 h-1.5 bg-emerald-500 rounded-full shadow-[0_0_10px_#10b981]"></span> System Stable</span>
              <div className="text-emerald-500 group-hover:scale-110 transition-transform"><svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" /></svg></div>
            </div>
            <div className="absolute inset-0 bg-gradient-to-b from-emerald-500/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity"></div>
          </div>

        </div>

        {/* Flagship Projects - Carousel Implementation */}
        <div className="pt-24 border-t border-slate-800/80">
          <ProjectCarousel />
        </div>
      </div>
    </div>
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
        <div className="space-y-4">
          <div className="flex items-center gap-3">
            <div className="w-12 h-[2px] bg-cyan-500"></div>
            <span className="text-xs font-mono text-cyan-500 uppercase tracking-[0.4em] font-bold">Portfolio Exhibit</span>
          </div>
          <h2 className="text-4xl md:text-5xl font-black text-white tracking-tighter">
            Proyectos <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-blue-500 to-indigo-500">Destacados</span>
          </h2>
        </div>

        {/* Carousel Controls */}
        <div className="flex items-center gap-6">
          <div className="flex gap-2 mr-4">
            {projects.map((_, i) => (
              <button
                key={i}
                onClick={() => setActiveIndex(i)}
                className={`h-1.5 transition-all duration-500 rounded-full ${i === activeIndex ? 'w-12 bg-cyan-500 shadow-[0_0_10px_rgba(6,182,212,0.5)]' : 'w-3 bg-slate-800 hover:bg-slate-700'}`}
              />
            ))}
          </div>
          <div className="flex gap-3">
            <button onClick={prev} className="p-4 rounded-2xl border border-slate-700 text-slate-400 hover:text-white hover:border-cyan-500 transition-all bg-[#02040a]/80 backdrop-blur-xl shadow-xl hover:-translate-y-1">
              <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" /></svg>
            </button>
            <button onClick={next} className="p-4 rounded-2xl border border-slate-700 text-slate-400 hover:text-white hover:border-cyan-500 transition-all bg-[#02040a]/80 backdrop-blur-xl shadow-xl hover:-translate-y-1">
              <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" /></svg>
            </button>
          </div>
        </div>
      </div>

      {/* Active Project Card */}
      <div className="relative min-h-[450px] group">
        <div className="absolute inset-0 bg-cyan-500/10 blur-[150px] rounded-full pointer-events-none transition-colors"></div>

        <div className="relative bg-[#050810]/90 backdrop-blur-2xl border border-slate-700/80 rounded-[3rem] overflow-hidden shadow-[0_30px_100px_-20px_rgba(0,0,0,0.8)] flex flex-col lg:flex-row animate-in fade-in slide-in-from-right-8 duration-700">

          {/* Visual Side */}
          <div className="w-full lg:w-1/2 min-h-[400px] relative bg-[#02040a] flex items-center justify-center overflow-hidden border-b lg:border-b-0 lg:border-r border-slate-800/80">
            <div className="absolute inset-0 opacity-[0.2]" style={{ backgroundImage: 'radial-gradient(circle, #0e7490 1.5px, transparent 1.5px)', backgroundSize: '40px 40px' }}></div>

            <div className="relative z-10 transition-transform duration-700 group-hover:scale-105 flex flex-col items-center">
              {activeProject.img ? (
                <div className="relative w-2/3 max-w-[320px] h-[200px] drop-shadow-[0_0_50px_rgba(0,229,255,0.4)] transition-all">
                  <Image
                    src={activeProject.img}
                    alt={activeProject.title}
                    fill
                    className="object-contain"
                  />
                </div>
              ) : (
                <div className="text-[160px] drop-shadow-[0_0_50px_rgba(0,229,255,0.3)] group-hover:drop-shadow-[0_0_80px_rgba(0,229,255,0.5)] transition-all">
                  {activeProject.icon}
                </div>
              )}
            </div>

            {/* Scanning Line Effect */}
            <div className="absolute top-0 left-0 w-full h-[2px] bg-gradient-to-r from-transparent via-cyan-500 to-transparent shadow-[0_0_20px_cyan] animate-[scan_3s_ease-in-out_infinite] z-20"></div>
          </div>

          {/* Info Side */}
          <div className="w-full lg:w-1/2 p-12 lg:p-20 flex flex-col justify-center space-y-10 relative">
            <div className="flex justify-between items-center">
              <span className="font-mono text-[10px] text-cyan-500 tracking-[0.4em] uppercase font-bold">{activeProject.tag}</span>
              <div className="flex items-center gap-2 px-4 py-2 bg-emerald-500/10 border border-emerald-500/30 rounded-full shadow-[0_0_15px_rgba(16,185,129,0.2)]">
                <span className="w-2 h-2 bg-emerald-400 rounded-full animate-pulse"></span>
                <span className="text-[9px] font-black text-emerald-400 uppercase tracking-widest">{activeProject.status}</span>
              </div>
            </div>

            <div className="space-y-6">
              <h3 className="text-4xl lg:text-6xl font-black text-white tracking-tighter leading-[1.1] group-hover:text-cyan-400 transition-colors">
                {activeProject.title}
              </h3>
              <p className="text-xl text-slate-400 leading-relaxed font-light">
                {activeProject.desc}
              </p>
            </div>

            <div className="flex flex-wrap gap-3">
              {activeProject.tech.map((t, i) => (
                <span key={i} className="px-5 py-2.5 bg-[#02040a] border border-slate-700 text-[10px] font-mono text-slate-300 rounded-xl uppercase tracking-widest group-hover:border-cyan-500/50 group-hover:text-cyan-300 transition-all shadow-lg">
                  {t}
                </span>
              ))}
            </div>

            <div className="pt-8">
              <a
                href={activeProject.link}
                target="_blank"
                rel="noreferrer"
                className="group/btn relative inline-flex items-center justify-center px-12 py-5 bg-white text-black font-black text-xs rounded-2xl hover:bg-cyan-500 transition-all shadow-[0_0_30px_rgba(255,255,255,0.2)] hover:shadow-[0_0_40px_rgba(6,182,212,0.6)] uppercase tracking-[0.2em] overflow-hidden"
              >
                <span className="relative z-10 flex items-center gap-2">Explorar Nodo <svg className="w-4 h-4 group-hover/btn:translate-x-1 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" /></svg></span>
                <div className="absolute inset-0 bg-cyan-400 translate-y-full group-hover/btn:translate-y-0 transition-transform duration-300"></div>
              </a>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
}
