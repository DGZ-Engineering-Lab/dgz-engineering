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
        <div className="absolute bottom-0 right-1/4 w-[600px] h-[600px] bg-indigo-500/10 rounded-full blur-[150px]"></div>
      </div>

      <div className="max-w-[1400px] mx-auto px-6 relative z-10">

        {/* Header */}
        <div className="flex flex-col items-center text-center mb-24 space-y-8">
          <div className="inline-flex items-center gap-4 px-6 py-3 bg-[#050810]/80 border border-cyan-500/30 rounded-full text-cyan-400 font-mono text-[11px] sm:text-xs tracking-[0.4em] uppercase font-bold shadow-[0_0_30px_rgba(6,182,212,0.15)] backdrop-blur-xl">
            <span className="w-2.5 h-2.5 rounded-full bg-cyan-400 animate-pulse shadow-[0_0_10px_cyan]"></span>
            DGZ Engineering / Innovation Lab
          </div>
          <h2 className="text-6xl md:text-8xl font-black text-white tracking-tighter leading-[0.95]">
            Laboratorio de <br className="hidden md:block"/> <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-blue-500 to-indigo-500 drop-shadow-[0_0_30px_rgba(6,182,212,0.4)]">Inteligencia Espacial</span>
          </h2>
          <p className="text-xl md:text-2xl text-slate-400 font-light max-w-4xl leading-relaxed">
            Explora nuestros <strong className="text-white font-medium">nodos geoespaciales de alto rendimiento</strong>. Desde automatización territorial desatendida hasta agentes de Inteligencia Artificial que escriben Spatial SQL en tiempo real.
          </p>
        </div>

        {/* Flagship Projects - Super Premium Carousel Implementation */}
        <div className="mt-10">
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
      desc: "Plataforma de monitoreo urbano para infraestructura a nivel empresarial. Sincronización de telemetría en tiempo real y gemelos digitales 3D.",
      img: "/assets/img/logo-construmetrix.svg",
      link: "https://daga21gz.github.io/ConstruMetrix/",
      tech: ["POSTGIS", "PYQGIS", "MAPBOX GL"],
      color: "cyan",
      glow: "shadow-[0_0_80px_rgba(6,182,212,0.3)]",
      border: "border-cyan-500/50"
    },
    {
      id: "PROJ-EVA-01",
      tag: "AI_CORE_SYSTEM",
      status: "STABLE_PRODUCTION",
      title: "E.V.A. Framework",
      desc: "Engineering Virtual Assistant. Agente cognitivo especializado en automatización de ingeniería, soporte técnico avanzado y generación de insights.",
      img: null,
      icon: "🧠",
      link: "https://dgz-engineering-lab.github.io/E.V.A/",
      tech: ["AI_AGENT", "LLM CORE", "NODE.JS"],
      color: "indigo",
      glow: "shadow-[0_0_80px_rgba(99,102,241,0.3)]",
      border: "border-indigo-500/50"
    },
    {
      id: "PROJ-GLLM-05",
      tag: "GEO_LLM_05",
      status: "R&D KERNEL",
      title: "Geo-LLM Intelligence",
      desc: "Motor de procesamiento natural que traduce consultas humanas a Spatial SQL, ejecutando análisis territoriales complejos de forma autónoma.",
      img: null,
      icon: "🤖",
      link: "/projects/geo-llm",
      tech: ["LLM", "POSTGIS AI", "VECTOR DB"],
      color: "amber",
      glow: "shadow-[0_0_80px_rgba(245,158,11,0.3)]",
      border: "border-amber-500/50"
    },
    {
      id: "PROJ-DASH-02",
      tag: "DASHBOARD_02",
      status: "LIVE_NODE",
      title: "Enterprise GIS Dashboard",
      desc: "Interfaz interactiva conectada a PostGIS para análisis territorial, telemetría IoT y tableros de control estadístico en tiempo real.",
      img: null,
      icon: "📊",
      link: "/projects/gis-dashboard",
      tech: ["REACT 19", "POSTGIS", "MAPLIBRE"],
      color: "blue",
      glow: "shadow-[0_0_80px_rgba(59,130,246,0.3)]",
      border: "border-blue-500/50"
    },
    {
      id: "PROJ-QGIS-03",
      tag: "PYQGIS_PLUGIN",
      status: "STABLE_TOOL",
      title: "LADM-COL QGIS Plugin",
      desc: "Suite de herramientas nativas para QGIS diseñadas para la validación topológica y consistencia del modelo LADM-COL en entornos productivos.",
      img: null,
      icon: "🔌",
      link: "/projects/qgis-plugin",
      tech: ["PYQGIS", "LADM-COL", "PYTHON"],
      color: "emerald",
      glow: "shadow-[0_0_80px_rgba(16,185,129,0.3)]",
      border: "border-emerald-500/50"
    }
  ];

  const next = () => setActiveIndex((prev) => (prev + 1) % projects.length);
  const prev = () => setActiveIndex((prev) => (prev - 1 + projects.length) % projects.length);

  const activeProject = projects[activeIndex];

  return (
    <div className="relative">
      
      {/* Carousel Navigation Header */}
      <div className="flex flex-col md:flex-row items-center justify-between mb-12 gap-8 relative z-20">
        <div className="space-y-2 text-center md:text-left">
          <h2 className="text-4xl md:text-5xl font-black text-white tracking-tighter uppercase">
            Ecosistema de <span className={`text-transparent bg-clip-text bg-gradient-to-r from-${activeProject.color}-400 to-blue-500`}>Soluciones</span>
          </h2>
          <p className="text-slate-400 font-mono text-sm tracking-widest">SELECCIONA UN NODO PARA INICIAR LA SECUENCIA</p>
        </div>

        {/* Carousel Controls */}
        <div className="flex flex-col sm:flex-row items-center gap-6 bg-[#050810]/80 p-3 rounded-3xl border border-slate-800 backdrop-blur-xl shadow-xl">
          <div className="flex gap-2 px-4">
            {projects.map((_, i) => (
              <button
                key={i}
                onClick={() => setActiveIndex(i)}
                className={`h-2 transition-all duration-500 rounded-full ${i === activeIndex ? `w-12 bg-${projects[i].color}-500 shadow-[0_0_15px_currentColor]` : 'w-4 bg-slate-800 hover:bg-slate-600'}`}
                aria-label={`Ir al proyecto ${i + 1}`}
              />
            ))}
          </div>
          <div className="flex gap-2">
            <button onClick={prev} className={`p-4 rounded-2xl bg-slate-900 border border-slate-700 text-slate-400 hover:text-white hover:border-${activeProject.color}-500 hover:bg-slate-800 transition-all shadow-lg hover:-translate-x-1`}>
              <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M15 19l-7-7 7-7" /></svg>
            </button>
            <button onClick={next} className={`p-4 rounded-2xl bg-slate-900 border border-slate-700 text-slate-400 hover:text-white hover:border-${activeProject.color}-500 hover:bg-slate-800 transition-all shadow-lg hover:translate-x-1`}>
              <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M9 5l7 7-7 7" /></svg>
            </button>
          </div>
        </div>
      </div>

      {/* Main Cinematic Showcase Card */}
      <div className="relative min-h-[500px] lg:min-h-[600px] group perspective-1000">
        
        {/* Dynamic Background Glow matching active project color */}
        <div className={`absolute inset-0 ${activeProject.glow} opacity-40 blur-[100px] rounded-[3rem] transition-all duration-1000 pointer-events-none`}></div>

        <div className={`relative w-full h-full bg-[#03060d]/90 backdrop-blur-3xl border ${activeProject.border} rounded-[3rem] overflow-hidden flex flex-col lg:flex-row transform transition-all duration-700 ease-out`}>
          
          {/* Top/Left Visual Area */}
          <div className="w-full lg:w-[45%] min-h-[350px] lg:min-h-full relative flex items-center justify-center overflow-hidden bg-gradient-to-br from-[#050810] to-[#02040a] border-b lg:border-b-0 lg:border-r border-slate-800">
            {/* Grid Pattern */}
            <div className="absolute inset-0 opacity-[0.15]" style={{ backgroundImage: 'linear-gradient(#334155 1px, transparent 1px), linear-gradient(90deg, #334155 1px, transparent 1px)', backgroundSize: '30px 30px' }}></div>
            
            {/* Scanning Line */}
            <div className={`absolute top-0 left-0 w-full h-[2px] bg-gradient-to-r from-transparent via-${activeProject.color}-500 to-transparent animate-[scan_3s_ease-in-out_infinite] z-20`}></div>

            <div className="relative z-10 transition-transform duration-700 group-hover:scale-[1.03] flex justify-center items-center p-10 w-full h-full">
              {activeProject.img ? (
                <div className={`relative w-full max-w-[300px] aspect-video drop-shadow-[0_0_40px_rgba(6,182,212,0.4)]`}>
                  <Image src={activeProject.img} alt={activeProject.title} fill className="object-contain" />
                </div>
              ) : (
                <div className="text-[140px] md:text-[200px] filter drop-shadow-[0_0_60px_rgba(255,255,255,0.1)] group-hover:drop-shadow-[0_0_80px_currentColor] transition-all duration-500" style={{ color: `var(--tw-colors-${activeProject.color}-400)` }}>
                  {activeProject.icon}
                </div>
              )}
            </div>
            
            {/* Overlay Gradient for visual depth */}
            <div className="absolute inset-0 bg-gradient-to-t from-[#02040a] via-transparent to-transparent opacity-80 z-10 pointer-events-none"></div>
          </div>

          {/* Bottom/Right Information Area */}
          <div className="w-full lg:w-[55%] p-10 md:p-16 lg:p-20 flex flex-col justify-center relative z-20 bg-gradient-to-br from-[#050810]/50 to-transparent">
            
            {/* Tags and Status */}
            <div className="flex flex-wrap items-center justify-between gap-4 mb-8">
              <span className={`px-4 py-1.5 bg-slate-900 border border-slate-700 rounded-full font-mono text-[10px] sm:text-xs text-${activeProject.color}-400 tracking-[0.3em] uppercase font-bold shadow-lg`}>
                {activeProject.tag}
              </span>
              <div className="flex items-center gap-2">
                <span className={`w-2.5 h-2.5 bg-emerald-500 rounded-full animate-pulse shadow-[0_0_10px_#10b981]`}></span>
                <span className="text-[10px] sm:text-xs font-black text-slate-300 uppercase tracking-widest">{activeProject.status}</span>
              </div>
            </div>

            {/* Title & Description */}
            <div className="space-y-6 mb-12">
              <h3 className="text-5xl md:text-6xl lg:text-7xl font-black text-white tracking-tighter leading-[1.05]">
                {activeProject.title}
              </h3>
              <p className="text-xl md:text-2xl text-slate-400 font-light leading-relaxed max-w-2xl">
                {activeProject.desc}
              </p>
            </div>

            {/* Tech Stack Pills */}
            <div className="flex flex-wrap gap-3 mb-14">
              {activeProject.tech.map((t, i) => (
                <span key={i} className={`px-5 py-2.5 bg-[#02040a] border border-slate-800 text-xs font-mono text-slate-300 rounded-xl uppercase tracking-widest hover:border-${activeProject.color}-500 hover:text-${activeProject.color}-300 hover:-translate-y-1 transition-all shadow-lg cursor-default`}>
                  {t}
                </span>
              ))}
            </div>

            {/* Call to Action */}
            <div className="mt-auto">
              <a
                href={activeProject.link}
                target="_blank"
                rel="noreferrer"
                className={`group/btn relative inline-flex items-center justify-center gap-4 px-12 py-5 bg-white text-black font-black text-sm rounded-2xl hover:bg-${activeProject.color}-500 hover:text-white transition-all duration-300 shadow-[0_0_30px_rgba(255,255,255,0.1)] hover:shadow-[0_0_50px_currentColor] uppercase tracking-[0.2em] overflow-hidden`}
              >
                <span className="relative z-10 flex items-center gap-3">
                  INICIALIZAR SECUENCIA 
                  <svg className="w-5 h-5 group-hover/btn:translate-x-2 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M14 5l7 7m0 0l-7 7m7-7H3" /></svg>
                </span>
                <div className={`absolute inset-0 bg-${activeProject.color}-500 translate-y-full group-hover/btn:translate-y-0 transition-transform duration-300 ease-out`}></div>
              </a>
            </div>

          </div>
        </div>
      </div>

    </div>
  );
}
