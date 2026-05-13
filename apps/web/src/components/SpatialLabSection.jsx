<<<<<<< HEAD
"use client";
import { useState } from "react";

=======
>>>>>>> origin/main
export default function SpatialLabSection() {
  return (
    <section id="lab" className="relative w-full py-24 z-10 bg-[#05070a]">
      <div className="max-w-7xl mx-auto px-6">
        
        {/* Header */}
        <div className="flex flex-col items-center text-center mb-16">
          <div className="flex items-center gap-4 mb-4">
            <span className="text-cyan-500 font-mono text-sm tracking-widest uppercase">
              DGZ SPATIAL LAB · LIVE DEMOS
            </span>
          </div>
          <h2 className="text-4xl md:text-5xl font-extrabold text-white tracking-tight mb-6">
            Spatial Intelligence <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-blue-500">Laboratory</span>
          </h2>
          <p className="text-lg text-slate-400 font-light max-w-3xl">
            High-performance geospatial nodes demonstrating territorial automation, multipurpose cadastral
            engines, and advanced spatial systems engineering.
          </p>
          <a href="lab/gesture_sandbox.html" className="mt-8 inline-flex items-center gap-2 px-6 py-3 bg-cyan-500/10 border border-cyan-500/30 text-cyan-400 rounded-lg hover:bg-cyan-500 hover:text-white transition-all">
            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 15l-2 5L9 9l11 4-5 2zm0 0l5 5M7.188 2.239l.777 2.897M5.136 7.965l-2.898-.777M13.95 4.05l-2.122 2.122m-5.657 5.656l-2.12 2.122" /></svg>
            <span className="font-semibold tracking-wide">Sandbox IA Gestual (BETA)</span>
          </a>
        </div>

        {/* Spatial Lab Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-24">
          
          {/* Card 1 */}
          <div className="flex flex-col p-8 rounded-2xl bg-[#0a0f16] border border-slate-800 hover:border-cyan-500/50 transition-colors group">
            <div className="flex justify-between items-start mb-6">
              <span className="text-xs font-mono text-slate-500">SYS_NODE: VIEWER_01</span>
              <div className="p-2 rounded bg-cyan-500/10 text-cyan-400 group-hover:scale-110 transition-transform">
                <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 20l-5.447-2.724A1 1 0 013 16.382V5.618a1 1 0 011.447-.894L9 7m0 13l6-3m-6 3V7m6 10l4.553 2.276A1 1 0 0021 18.382V7.618a1 1 0 00-.553-.894L15 4m0 13V4m0 0L9 7" /></svg>
              </div>
            </div>
            <h3 className="text-xl font-bold text-white mb-3">Interactive Spatial Node</h3>
            <p className="text-slate-400 text-sm mb-6 flex-1">
              High-precision GIS viewer with real-time parcel rendering. Interacting with local datasets exported from QGIS with deep topology attributes.
            </p>
            <div className="flex flex-wrap gap-2 mb-6">
              <span className="px-2 py-1 text-[10px] font-mono text-cyan-300 bg-cyan-500/10 rounded">MapLibre GL</span>
              <span className="px-2 py-1 text-[10px] font-mono text-cyan-300 bg-cyan-500/10 rounded">Vector Tiles</span>
              <span className="px-2 py-1 text-[10px] font-mono text-cyan-300 bg-cyan-500/10 rounded">PostGIS</span>
            </div>
            <div className="flex items-center justify-between pt-4 border-t border-slate-800">
              <span className="text-xs text-emerald-500 font-mono flex items-center gap-2"><span className="w-1.5 h-1.5 bg-emerald-500 rounded-full animate-pulse"></span> Node Operational</span>
              <a href="lab/map.html" className="text-sm text-white hover:text-cyan-400 transition-colors">Launch →</a>
            </div>
          </div>

          {/* Card 2 */}
          <div className="flex flex-col p-8 rounded-2xl bg-[#0a0f16] border border-slate-800 hover:border-[#f3ca20]/50 transition-colors group">
            <div className="flex justify-between items-start mb-6">
              <span className="text-xs font-mono text-slate-500">SYS_NODE: VALIDATOR_02</span>
              <div className="p-2 rounded bg-[#f3ca20]/10 text-[#f3ca20] group-hover:scale-110 transition-transform">
                <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" /></svg>
              </div>
            </div>
            <h3 className="text-xl font-bold text-white mb-3">Cadastral Intelligence</h3>
            <p className="text-slate-400 text-sm mb-6 flex-1">
              Automated LADM-COL V3 validator. Detecting overlaps, slivers, and topological inconsistencies using high-fidelity Python kernels.
            </p>
            <div className="flex flex-wrap gap-2 mb-6">
              <span className="px-2 py-1 text-[10px] font-mono text-[#f3ca20] bg-[#f3ca20]/10 rounded">FastAPI</span>
              <span className="px-2 py-1 text-[10px] font-mono text-[#f3ca20] bg-[#f3ca20]/10 rounded">Shapely</span>
              <span className="px-2 py-1 text-[10px] font-mono text-[#f3ca20] bg-[#f3ca20]/10 rounded">Topology</span>
            </div>
            <div className="flex items-center justify-between pt-4 border-t border-slate-800">
              <span className="text-xs text-[#f3ca20] font-mono">Kernel Beta</span>
              <button className="text-sm text-white hover:text-[#f3ca20] transition-colors">Initialize →</button>
            </div>
          </div>

          {/* Card 3 */}
          <div className="flex flex-col p-8 rounded-2xl bg-[#0a0f16] border border-slate-800 hover:border-emerald-500/50 transition-colors group">
            <div className="flex justify-between items-start mb-6">
              <span className="text-xs font-mono text-slate-500">SYS_NODE: PIPELINE_03</span>
              <div className="p-2 rounded bg-emerald-500/10 text-emerald-500 group-hover:scale-110 transition-transform">
                <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7v8a2 2 0 002 2h6M8 7V5a2 2 0 012-2h4.586a1 1 0 01.707.293l4.414 4.414a1 1 0 01.293.707V15a2 2 0 01-2 2h-2M8 7H6a2 2 0 00-2 2v10a2 2 0 002 2h8a2 2 0 002-2v-2" /></svg>
              </div>
            </div>
            <h3 className="text-xl font-bold text-white mb-3">Sovereign Data Pipelines</h3>
            <p className="text-slate-400 text-sm mb-6 flex-1">
              Unattended ETL architecture for massive geospatial ingestion, ensuring data integrity across distributed GIS nodes.
            </p>
            <div className="flex flex-wrap gap-2 mb-6">
              <span className="px-2 py-1 text-[10px] font-mono text-emerald-400 bg-emerald-500/10 rounded">GDAL/OGR</span>
              <span className="px-2 py-1 text-[10px] font-mono text-emerald-400 bg-emerald-500/10 rounded">ETL</span>
              <span className="px-2 py-1 text-[10px] font-mono text-emerald-400 bg-emerald-500/10 rounded">CI/CD</span>
            </div>
            <div className="flex items-center justify-between pt-4 border-t border-slate-800">
              <span className="text-xs text-emerald-500 font-mono">System Stable</span>
              <div className="text-emerald-500"><svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 9l3 3-3 3m5 0h3M5 20h14a2 2 0 002-2V6a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" /></svg></div>
            </div>
          </div>

        </div>

<<<<<<< HEAD
        {/* Flagship Projects - Carousel Implementation */}
        <div className="pt-20 border-t border-slate-800">
          <ProjectCarousel />
=======
        {/* Flagship Projects */}
        <div className="pt-20 border-t border-slate-800">
          <div className="flex items-center gap-4 mb-12">
            <div className="w-8 h-[1px] bg-cyan-500"></div>
            <h2 className="text-3xl font-bold text-white">Proyectos Destacados</h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            
            {/* ConstruMetrix (Large) */}
            <div className="col-span-1 md:col-span-2 lg:col-span-2 flex flex-col md:flex-row bg-gradient-to-br from-slate-900 to-[#05070a] border border-slate-800 rounded-2xl overflow-hidden group hover:border-cyan-500/50 transition-colors">
              <div className="w-full md:w-1/2 p-8 flex items-center justify-center bg-[#0a0f16] border-r border-slate-800">
                <img src="/assets/img/logo-construmetrix.svg" alt="ConstruMetrix" className="w-3/4 max-w-[200px] opacity-80 group-hover:opacity-100 group-hover:scale-105 transition-all" />
              </div>
              <div className="w-full md:w-1/2 p-8 flex flex-col justify-center">
                <div className="flex justify-between items-center mb-4">
                  <span className="text-[10px] text-cyan-400 font-mono tracking-widest">FLAGSHIP_NODE</span>
                  <span className="px-2 py-1 bg-emerald-500/10 text-emerald-400 text-[10px] font-bold rounded">PRODUCTION STABLE</span>
                </div>
                <h3 className="text-2xl font-bold text-white mb-3">ConstruMetrix GIS</h3>
                <p className="text-slate-400 text-sm mb-6">
                  Enterprise-level GIS monitoring for modern urban infrastructure. Synchronizing real-time telemetry across distributed nodes.
                </p>
                <div className="flex gap-2 mb-8">
                  <span className="px-2 py-1 bg-slate-800 text-slate-300 text-[10px] font-mono rounded">POSTGIS_9.4</span>
                  <span className="px-2 py-1 bg-slate-800 text-slate-300 text-[10px] font-mono rounded">PYQGIS_V3</span>
                  <span className="px-2 py-1 bg-slate-800 text-slate-300 text-[10px] font-mono rounded">REST_API</span>
                </div>
                <a href="https://daga21gz.github.io/ConstruMetrix/" target="_blank" rel="noreferrer" className="inline-flex items-center justify-center px-6 py-3 bg-white text-black font-bold text-sm rounded-lg hover:bg-cyan-400 hover:text-black transition-colors w-max">
                  Launch Dashboard
                </a>
              </div>
            </div>

            {/* Geo-LLM */}
            <a href="projects/geo-llm/index.html" className="flex flex-col p-8 bg-[#0a0f16] border border-[#f3ca20]/30 hover:border-[#f3ca20] rounded-2xl transition-colors group relative overflow-hidden">
              <div className="absolute top-0 right-0 w-32 h-32 bg-[#f3ca20]/10 rounded-full blur-[40px] -mr-10 -mt-10"></div>
              <div className="flex justify-between items-center mb-4 relative z-10">
                <span className="text-[10px] text-[#f3ca20] font-mono tracking-widest">GEO_LLM_05</span>
                <span className="px-2 py-1 bg-[#f3ca20]/10 text-[#f3ca20] text-[10px] font-bold rounded">R&D KERNEL</span>
              </div>
              <h3 className="text-xl font-bold text-white mb-3 relative z-10">Geo-LLM Intelligence</h3>
              <p className="text-slate-400 text-sm mb-6 flex-1 relative z-10">
                Agente de IA que traduce lenguaje natural a Spatial SQL y genera informes catastrales estadísticos en tiempo real.
              </p>
              <div className="flex flex-wrap gap-2 relative z-10">
                <span className="px-2 py-1 bg-slate-800 text-[#f3ca20] text-[10px] font-mono rounded">LLM</span>
                <span className="px-2 py-1 bg-slate-800 text-[#f3ca20] text-[10px] font-mono rounded">PostGIS AI</span>
              </div>
            </a>

            {/* Dashboards */}
            <a href="projects/gis-dashboard/index.html" className="flex flex-col p-8 bg-[#0a0f16] border border-slate-800 hover:border-cyan-500/50 rounded-2xl transition-colors group">
              <div className="flex justify-between items-center mb-4">
                <span className="text-[10px] text-slate-500 font-mono tracking-widest">DASHBOARD_02</span>
                <span className="w-2 h-2 bg-emerald-500 rounded-full"></span>
              </div>
              <h3 className="text-xl font-bold text-white mb-3">Enterprise GIS Dashboard</h3>
              <p className="text-slate-400 text-sm mb-6 flex-1">
                Interfaz interactiva conectada a PostGIS para análisis territorial y telemetría en tiempo real.
              </p>
              <div className="flex flex-wrap gap-2">
                <span className="px-2 py-1 bg-slate-800 text-slate-300 text-[10px] font-mono rounded">React</span>
                <span className="px-2 py-1 bg-slate-800 text-slate-300 text-[10px] font-mono rounded">PostGIS</span>
              </div>
            </a>

            {/* ETL Pipelines */}
            <a href="projects/automation-systems/index.html" className="flex flex-col p-8 bg-[#0a0f16] border border-slate-800 hover:border-blue-500/50 rounded-2xl transition-colors group">
              <div className="flex justify-between items-center mb-4">
                <span className="text-[10px] text-slate-500 font-mono tracking-widest">AUTOMATION_01</span>
                <span className="w-2 h-2 bg-emerald-500 rounded-full"></span>
              </div>
              <h3 className="text-xl font-bold text-white mb-3">Territorial ETL Pipelines</h3>
              <p className="text-slate-400 text-sm mb-6 flex-1">
                Automatización desatendida de transformaciones de datos geográficos para evitar procesos manuales lentos.
              </p>
              <div className="flex flex-wrap gap-2">
                <span className="px-2 py-1 bg-slate-800 text-slate-300 text-[10px] font-mono rounded">Python</span>
                <span className="px-2 py-1 bg-slate-800 text-slate-300 text-[10px] font-mono rounded">FME</span>
              </div>
            </a>

            {/* PyQGIS Plugin */}
            <a href="projects/qgis-plugin/index.html" className="flex flex-col p-8 bg-[#0a0f16] border border-slate-800 hover:border-purple-500/50 rounded-2xl transition-colors group">
              <div className="flex justify-between items-center mb-4">
                <span className="text-[10px] text-slate-500 font-mono tracking-widest">PYQGIS_PLUGIN</span>
                <span className="w-2 h-2 bg-[#f3ca20] rounded-full"></span>
              </div>
              <h3 className="text-xl font-bold text-white mb-3">LADM-COL QGIS Plugin</h3>
              <p className="text-slate-400 text-sm mb-6 flex-1">
                Scripts insertados como herramientas nativas en la UI de QGIS para validación topológica instantánea.
              </p>
              <div className="flex flex-wrap gap-2">
                <span className="px-2 py-1 bg-slate-800 text-slate-300 text-[10px] font-mono rounded">PyQGIS</span>
                <span className="px-2 py-1 bg-slate-800 text-slate-300 text-[10px] font-mono rounded">LADM-COL</span>
              </div>
            </a>

          </div>
>>>>>>> origin/main
        </div>
      </div>
    </section>
  );
}
<<<<<<< HEAD

function ProjectCarousel() {
  const [activeIndex, setActiveIndex] = useState(0);

  const projects = [
    {
      id: "PROJ-CM-01",
      tag: "FLAGSHIP_NODE",
      status: "PRODUCTION STABLE",
      title: "ConstruMetrix GIS",
      desc: "Enterprise-level GIS monitoring for modern urban infrastructure. Synchronizing real-time telemetry across distributed nodes.",
      img: "/assets/img/logo-construmetrix.svg",
      link: "https://daga21gz.github.io/ConstruMetrix/",
      tech: ["POSTGIS_9.4", "PYQGIS_V3", "REST_API"],
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
      link: "projects/geo-llm/index.html",
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
      link: "projects/gis-dashboard/index.html",
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
      link: "projects/automation-systems/index.html",
      tech: ["Python", "FME", "GDAL"],
      accent: "blue"
    },
    {
      id: "PROJ-QGIS-03",
      tag: "PYQGIS_PLUGIN",
      status: "STABLE_TOOL",
      title: "LADM-COL QGIS Plugin",
      desc: "Scripts insertados como herramientas nativas en la UI de QGIS para validación topológica instantánea.",
      img: null,
      icon: "🔌",
      link: "projects/qgis-plugin/index.html",
      tech: ["PyQGIS", "LADM-COL", "Python"],
      accent: "purple"
    }
  ];

  const next = () => setActiveIndex((prev) => (prev + 1) % projects.length);
  const prev = () => setActiveIndex((prev) => (prev - 1 + projects.length) % projects.length);

  const activeProject = projects[activeIndex];

  return (
    <div className="relative">
      <div className="flex flex-col md:flex-row items-center justify-between mb-12 gap-8">
        <div className="flex items-center gap-4">
          <div className="w-8 h-[1px] bg-cyan-500"></div>
          <h2 className="text-3xl font-bold text-white tracking-tight">Proyectos <span className="text-cyan-400">Destacados</span></h2>
        </div>
        
        {/* Carousel Controls */}
        <div className="flex items-center gap-4">
          <div className="flex gap-1 mr-4">
            {projects.map((_, i) => (
              <div 
                key={i} 
                className={`h-1 transition-all duration-500 rounded-full ${i === activeIndex ? 'w-8 bg-cyan-500' : 'w-2 bg-slate-800'}`}
              />
            ))}
          </div>
          <button onClick={prev} className="p-3 rounded-full border border-slate-800 text-slate-400 hover:text-white hover:border-cyan-500 transition-all bg-black/40">
            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" /></svg>
          </button>
          <button onClick={next} className="p-3 rounded-full border border-slate-800 text-slate-400 hover:text-white hover:border-cyan-500 transition-all bg-black/40">
            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" /></svg>
          </button>
        </div>
      </div>

      {/* Active Project Card */}
      <div className="relative min-h-[400px] group">
        {/* Animated Background Glow */}
        <div className="absolute inset-0 bg-cyan-500/5 blur-[100px] rounded-full pointer-events-none group-hover:bg-cyan-500/10 transition-colors"></div>
        
        <div className="relative bg-[#0a0d14]/80 backdrop-blur-md border border-slate-800 rounded-3xl overflow-hidden shadow-2xl flex flex-col lg:flex-row animate-in fade-in slide-in-from-right-8 duration-700">
          
          {/* Visual Side */}
          <div className="w-full lg:w-1/2 min-h-[300px] relative bg-[#05070a] flex items-center justify-center overflow-hidden border-b lg:border-b-0 lg:border-r border-slate-800">
            {/* Cyber Grid Background */}
            <div className="absolute inset-0 opacity-10" style={{ backgroundImage: 'radial-gradient(circle, #0e7490 1px, transparent 1px)', backgroundSize: '24px 24px' }}></div>
            
            {activeProject.img ? (
              <img 
                src={activeProject.img} 
                alt={activeProject.title} 
                className="w-2/3 max-w-[250px] relative z-10 transition-all duration-700 group-hover:scale-110 grayscale group-hover:grayscale-0 drop-shadow-[0_0_30px_rgba(0,229,255,0.2)]" 
              />
            ) : (
              <div className="text-[120px] relative z-10 animate-pulse">
                {activeProject.icon}
              </div>
            )}

            {/* Scanning Line Effect */}
            <div className="absolute top-0 left-0 w-full h-[2px] bg-cyan-500/50 shadow-[0_0_15px_cyan] animate-scan z-20"></div>
          </div>

          {/* Info Side */}
          <div className="w-full lg:w-1/2 p-8 lg:p-12 flex flex-col justify-center">
            <div className="flex justify-between items-center mb-6">
              <span className="font-mono text-[10px] text-cyan-500 tracking-[0.3em] uppercase">{activeProject.tag}</span>
              <div className="flex items-center gap-2 px-3 py-1 bg-emerald-500/10 border border-emerald-500/20 rounded-full">
                <span className="w-1.5 h-1.5 bg-emerald-500 rounded-full animate-pulse"></span>
                <span className="text-[9px] font-bold text-emerald-400 uppercase tracking-wider">{activeProject.status}</span>
              </div>
            </div>

            <h3 className="text-3xl lg:text-4xl font-black text-white mb-6 tracking-tight leading-none">
              {activeProject.title}
            </h3>

            <p className="text-slate-400 text-lg leading-relaxed mb-8 font-light">
              {activeProject.desc}
            </p>

            <div className="flex flex-wrap gap-2 mb-10">
              {activeProject.tech.map((t, i) => (
                <span key={i} className="px-3 py-1 bg-slate-900 border border-slate-800 text-[10px] font-mono text-slate-400 rounded uppercase tracking-wider">
                  {t}
                </span>
              ))}
            </div>

            <a 
              href={activeProject.link} 
              target="_blank" 
              rel="noreferrer" 
              className="inline-flex items-center justify-center px-10 py-4 bg-cyan-600 text-white font-black text-sm rounded-xl hover:bg-cyan-500 transition-all shadow-[0_10px_20px_-10px_rgba(0,229,255,0.4)] hover:shadow-[0_15px_30px_-5px_rgba(0,229,255,0.6)] hover:-translate-y-1 w-max uppercase tracking-widest"
            >
              Explorar Nodo
            </a>
          </div>
        </div>

        {/* Node ID indicator at bottom right */}
        <div className="absolute -bottom-4 -right-4 font-mono text-[60px] font-black text-white/[0.03] pointer-events-none select-none">
          {activeProject.id}
        </div>
      </div>
    </div>
  );
}

=======
>>>>>>> origin/main
