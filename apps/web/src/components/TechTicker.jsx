"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { 
  Globe, 
  Database, 
  Cpu, 
  Server, 
  Network, 
  Smartphone, 
  CheckCircle2
} from "lucide-react";

// Massive full catalog of technologies grouped by work area
const WORK_AREAS = [
  {
    id: "sig",
    title: "SIG & Geodesia",
    icon: Globe,
    desc: "Sistemas de Información Geográfica y procesamiento fotogramétrico con precisión centimétrica para catastro y ordenamiento.",
    color: "cyan",
    bgColor: "bg-cyan-500/10",
    textColor: "text-cyan-600",
    borderColor: "border-cyan-500/20",
    glowColor: "shadow-[0_0_20px_rgba(6,182,212,0.15)]",
    platforms: [
      { name: "QGIS", sub: "SIG Desktop", desc: "Software nuclear para análisis espacial, topologías prediales y mapeo catastral LADM-COL.", status: "Core Engine" },
      { name: "ArcGIS Pro", sub: "SIG Enterprise", desc: "Modelado geográfico avanzado, análisis 3D y estructuración de geodatabases corporativas.", status: "Enterprise" },
      { name: "ArcGIS Enterprise", sub: "Cloud GIS", desc: "Servidores geográficos y portales de datos espaciales para administración pública.", status: "Corporate" },
      { name: "GeoServer", sub: "OGC Server", desc: "Servidor de mapas de código abierto para publicación de capas WMS, WFS y WMTS.", status: "Standards" },
      { name: "GDAL/OGR", sub: "Data Translator", desc: "Procesamiento, reyección y traducción por consola de millones de geometrías ráster y vectoriales.", status: "Automated" },
      { name: "Pix4D / Agisoft", sub: "Fotogrametría", desc: "Procesamiento de imágenes tomadas por drones para ortofotomosaicos y modelos de elevación (DEM).", status: "Precision" }
    ]
  },
  {
    id: "data",
    title: "Bases de Datos & Big Data",
    icon: Database,
    desc: "Modelado relacional, indexación espacial de alto rendimiento y procesamiento paralelo de bases de datos de tierras.",
    color: "blue",
    bgColor: "bg-blue-500/10",
    textColor: "text-blue-600",
    borderColor: "border-blue-500/20",
    glowColor: "shadow-[0_0_20px_rgba(59,130,246,0.15)]",
    platforms: [
      { name: "PostGIS", sub: "Geo Database", desc: "Extensión espacial de PostgreSQL que almacena, consulta y valida toda la geometría catastral.", status: "SQL Standard" },
      { name: "PostgreSQL", sub: "Core Relational", desc: "Base de datos principal transaccional de alto rendimiento para el registro jurídico predial.", status: "Production" },
      { name: "Oracle Spatial", sub: "Corporate DB", desc: "Integraciones empresariales complejas para sistemas de información catastral nacional de gran escala.", status: "Legacy Connect" },
      { name: "DuckDB", sub: "In-Memory OLAP", desc: "Análisis instantáneo de millones de registros prediales georreferenciados en formato Parquet.", status: "Analytics" },
      { name: "Polars", sub: "Big Data Rust", desc: "Estructuración de datos geográficos masivos en Python impulsado por el motor paralelo de Rust.", status: "High Speed" },
      { name: "Google Earth Engine", sub: "Satellite Analytics", desc: "Cálculo multitemporal de índices de vegetación, deforestación e impacto agrícola nacional.", status: "Cloud Raster" }
    ]
  },
  {
    id: "web",
    title: "Geomática Web & Visores",
    icon: Server,
    desc: "Desarrollo de geoportales e interfaces interactivas para la visualización del territorio en tiempo real.",
    color: "indigo",
    bgColor: "bg-indigo-500/10",
    textColor: "text-indigo-600",
    borderColor: "border-indigo-500/20",
    glowColor: "shadow-[0_0_20px_rgba(99,102,241,0.15)]",
    platforms: [
      { name: "Leaflet", sub: "Map Library", desc: "Librería ligera para visores de mapas interactivos 2D ultrarrápidos y compatibles con móviles.", status: "WebGIS" },
      { name: "Mapbox GL JS", sub: "Map Canvas", desc: "Renderizado WebGL de alta densidad para visualización de millones de polígonos prediales fluidos.", status: "High Perf" },
      { name: "CesiumJS", sub: "3D Globe", desc: "Representación tridimensional interactiva y gemelos digitales de infraestructura y topografía real.", status: "Digital Twin" },
      { name: "React / Next.js", sub: "Modern Web", desc: "Frameworks para la creación de portales web catastrales seguros, veloces e indexables en buscadores.", status: "Frontend" },
      { name: "TypeScript", sub: "Robust Dev", desc: "Código robusto y estructurado con tipado estricto para evitar fallos catastróficos en producción.", status: "Enterprise" },
      { name: "TailwindCSS", sub: "Styling HUD", desc: "Interfaces premium responsivas y estilizadas con diseño glassmorphic de última generación.", status: "Design System" }
    ]
  },
  {
    id: "ai",
    title: "IA & Computación GeoAI",
    icon: Cpu,
    desc: "Modelado inteligente mediante redes neuronales aplicadas a avalúos masivos y delimitación automática predial.",
    color: "emerald",
    bgColor: "bg-emerald-500/10",
    textColor: "text-emerald-600",
    borderColor: "border-emerald-500/20",
    glowColor: "shadow-[0_0_20px_rgba(16,185,129,0.15)]",
    platforms: [
      { name: "TensorFlow / PyTorch", sub: "Deep Learning", desc: "Entrenamiento de modelos de visión artificial para clasificación de coberturas y detección de edificaciones.", status: "Computer Vision" },
      { name: "Segment Anything (SAM)", sub: "Geo-SAM Engine", desc: "Modelos fundacionales aplicados a la segmentación automática de cubiertas e linderos sobre ortofotos.", status: "AI Boundary" },
      { name: "Scikit-learn", sub: "Machine Learning", desc: "Modelación matemática y estadística para la tasación y valoración comercial predial masiva (AVM).", status: "Avalúos" },
      { name: "OpenAI / Gemini / Claude", sub: "GenAI & LLM", desc: "Modelos de lenguaje avanzados integrados para consultas semánticas de normatividad catastral y jurídica.", status: "Geo-LLM" },
      { name: "LLaMA", sub: "Private LLM", desc: "Modelos de inteligencia artificial locales autocontenidos para procesamiento documental confidencial sin fugas.", status: "On-Premise" },
      { name: "Python", sub: "GeoAI Core", desc: "El lenguaje de programación estándar utilizado para todos nuestros pipelines de ciencia de datos territoriales.", status: "Standard" }
    ]
  },
  {
    id: "cloud",
    title: "Cloud & DevOps",
    icon: Network,
    desc: "Infraestructura en la nube y orquestación escalable para portales gubernamentales con alta concurrencia.",
    color: "orange",
    bgColor: "bg-orange-500/10",
    textColor: "text-orange-600",
    borderColor: "border-orange-500/20",
    glowColor: "shadow-[0_0_20px_rgba(249,115,22,0.15)]",
    platforms: [
      { name: "AWS", sub: "Cloud Infrastructure", desc: "Alojamiento redundante, servidores escalables (EC2) y bases de datos cloud estables y veloces.", status: "Corporate Cloud" },
      { name: "Docker", sub: "Containers", desc: "Empaquetamiento modular que garantiza la portabilidad de nuestros servicios en cualquier entorno.", status: "Standard" },
      { name: "Kubernetes", sub: "Orchestration", desc: "Administración inteligente de microservicios para soportar picos masivos de usuarios en portales oficiales.", status: "Enterprise Scale" },
      { name: "Terraform", sub: "Infrastructure as Code", desc: "Creación y administración automatizada de toda nuestra infraestructura cloud mediante código seguro.", status: "IaC" },
      { name: "GitHub Actions", sub: "CI/CD Pipeline", desc: "Automatización de despliegues y validación de calidad de código catastral antes de pasar a producción.", status: "Continuous Sync" },
      { name: "Linux / Ubuntu", sub: "Server OS", desc: "El sistema operativo nuclear por excelencia que soporta la estabilidad del 100% de nuestros servidores.", status: "Security Standard" }
    ]
  },
  {
    id: "mobile",
    title: "Captura de Campo & Móvil",
    icon: Smartphone,
    desc: "Herramientas de captura digital en campo optimizadas para trabajar sin conexión a internet y georreferenciación sub-métrica.",
    color: "amber",
    bgColor: "bg-amber-500/10",
    textColor: "text-amber-600",
    borderColor: "border-amber-500/20",
    glowColor: "shadow-[0_0_20px_rgba(245,158,11,0.15)]",
    platforms: [
      { name: "Flutter", sub: "Mobile Dev", desc: "Desarrollo de aplicaciones móviles multiplataforma (iOS y Android) rápidas e interactivas.", status: "Native Map API" },
      { name: "QField / Mergin Maps", sub: "SIG offline", desc: "Digitalización predial física directa en campo con sincronización automática en la base de datos central.", status: "Field Work" },
      { name: "ArcGIS Field Maps", sub: "Esri Field Engine", desc: "Recolección de datos y georreferenciación en dispositivos integrados directamente al ecosistema ArcGIS.", status: "Corporate SIG" },
      { name: "Kotlin", sub: "Android Native", desc: "Integración nativa a bajo nivel con antenas GPS RTK externas para precisión catastral milimétrica.", status: "Hardware Lock" }
    ]
  }
];

// Combine all platforms for the dynamic sliding marquee footer
const TICKER_ITEMS = [
  "QGIS", "ArcGIS Pro", "PostGIS", "GeoServer", "GDAL/OGR", "Pix4D", "PostgreSQL", "DuckDB", 
  "Polars", "Google Earth Engine", "Leaflet", "Mapbox GL JS", "CesiumJS", "React", "Next.js", 
  "TypeScript", "TensorFlow", "PyTorch", "Geo-SAM", "Scikit-learn", "OpenAI", "Gemini", "Claude", 
  "LLaMA", "AWS", "Docker", "Kubernetes", "Terraform", "GitHub Actions", "Linux", "Flutter", 
  "QField", "Kotlin"
];

export default function TechTicker() {
  const [activeTab, setActiveTab] = useState("sig");

  const currentArea = WORK_AREAS.find(area => area.id === activeTab) || WORK_AREAS[0];
  const IconComponent = currentArea.icon;

  return (
    <div className="w-full space-y-12">
      
      {/* 1. Header & Tabs Control Panel */}
      <div className="max-w-7xl mx-auto px-6 relative">
        {/* Dynamic decorative backdrop blur behind tabs */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[250px] bg-gradient-to-r from-cyan-500/5 via-indigo-500/5 to-purple-500/5 blur-[80px] pointer-events-none rounded-full" />
        
        {/* Category Tab Selector Buttons */}
        <div className="flex flex-wrap justify-center gap-2 md:gap-3 p-2 bg-slate-100/80 backdrop-blur-md rounded-3xl border border-slate-200/50 max-w-5xl mx-auto relative z-10">
          {WORK_AREAS.map((area) => {
            const TabIcon = area.icon;
            const isTabActive = activeTab === area.id;
            
            return (
              <button
                key={area.id}
                type="button"
                aria-pressed={isTabActive}
                onClick={() => setActiveTab(area.id)}
                className={`px-5 py-3 rounded-2xl text-[10px] font-black uppercase tracking-wider transition-all duration-300 flex items-center gap-2
                  ${isTabActive 
                    ? `bg-white text-slate-900 shadow-md border border-slate-200/50 scale-102` 
                    : `text-slate-500 hover:text-slate-900 hover:bg-white/40`
                  }
                `}
              >
                <TabIcon className={`w-3.5 h-3.5 ${isTabActive ? currentArea.textColor : "text-slate-400"}`} />
                {area.title}
              </button>
            );
          })}
        </div>
      </div>

      {/* 2. Interactive Area Details Board */}
      <div className="max-w-7xl mx-auto px-6 relative z-10">
        <AnimatePresence mode="wait">
          <motion.div
            key={activeTab}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
            className={`w-full bg-white/70 backdrop-blur-xl border rounded-[2.5rem] p-8 md:p-10 relative overflow-hidden ring-1 ring-slate-200/50 transition-all duration-500 ${currentArea.glowColor} ${currentArea.borderColor}`}
          >
            {/* Grid pattern on card background */}
            <div className="absolute inset-0 opacity-[0.02] pointer-events-none bg-[radial-gradient(#000_1px,transparent_1px)] [background-size:16px_16px]" />
            <div className="absolute top-0 right-0 w-80 h-80 bg-gradient-to-br from-slate-100 via-slate-50/50 to-transparent rounded-full blur-3xl pointer-events-none" />

            {/* Description & Metrics Bar */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center border-b border-slate-200/50 pb-8 mb-8">
              <div className="lg:col-span-8 space-y-3 col-span-12">
                <div className="flex items-center gap-2.5">
                  <div className={`w-9 h-9 rounded-2xl ${currentArea.bgColor} flex items-center justify-center ${currentArea.textColor}`}>
                    <IconComponent className="w-4.5 h-4.5" />
                  </div>
                  <span className={`text-[10px] font-mono font-bold tracking-[0.2em] uppercase ${currentArea.textColor}`}>
                    ÁREA DE TRABAJO DGZ
                  </span>
                </div>
                <h3 className="text-3xl font-black text-slate-900 tracking-tight">
                  {currentArea.title}
                </h3>
                <p className="text-slate-600 text-sm font-light leading-relaxed max-w-4xl">
                  {currentArea.desc}
                </p>
              </div>

              {/* Performance Indicator */}
              <div className="lg:col-span-4 flex justify-start lg:justify-end col-span-12">
                <div className="flex bg-slate-50 border border-slate-200/50 p-4 rounded-2xl items-center gap-3">
                  <div className="flex h-3.5 w-3.5 relative">
                    <span className={`animate-ping absolute inline-flex h-full w-full rounded-full opacity-75
                      ${activeTab === 'sig' && 'bg-cyan-400'}
                      ${activeTab === 'data' && 'bg-blue-400'}
                      ${activeTab === 'web' && 'bg-indigo-400'}
                      ${activeTab === 'ai' && 'bg-emerald-400'}
                      ${activeTab === 'cloud' && 'bg-orange-400'}
                      ${activeTab === 'mobile' && 'bg-amber-400'}
                    `} />
                    <span className={`relative inline-flex rounded-full h-3.5 w-3.5 
                      ${activeTab === 'sig' && 'bg-cyan-500'}
                      ${activeTab === 'data' && 'bg-blue-500'}
                      ${activeTab === 'web' && 'bg-indigo-500'}
                      ${activeTab === 'ai' && 'bg-emerald-500'}
                      ${activeTab === 'cloud' && 'bg-orange-500'}
                      ${activeTab === 'mobile' && 'bg-amber-500'}
                    `} />
                  </div>
                  <div className="text-left">
                    <div className="text-[9.5px] font-mono font-bold text-slate-400 uppercase tracking-widest">NIVEL DE EXPERTISE</div>
                    <div className="text-[10px] font-black font-mono text-slate-800 tracking-wider">DOMINIO EXPERTO CATASTRAL</div>
                  </div>
                </div>
              </div>
            </div>

            {/* Interactive Grid of Platforms */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {currentArea.platforms.map((plat, idx) => (
                <motion.div
                  key={plat.name}
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.3, delay: idx * 0.05 }}
                  className="bg-white/90 rounded-2xl border border-slate-200/60 p-5 hover:border-slate-350 hover:shadow-md transition-all duration-300 relative group flex flex-col justify-between"
                >
                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <h4 className="text-sm font-black text-slate-900 tracking-tight group-hover:text-slate-950 transition-colors">
                        {plat.name}
                      </h4>
                      {plat.sub && (
                        <span className="text-[9.5px] font-mono font-bold uppercase tracking-wider text-slate-400 bg-slate-100 px-2 py-0.5 rounded">
                          {plat.sub}
                        </span>
                      )}
                    </div>
                    <p className="text-slate-650 text-xs font-light leading-normal pr-4">
                      {plat.desc}
                    </p>
                  </div>
                  
                  <div className="flex items-center justify-between pt-4 mt-4 border-t border-slate-100">
                    <div className="flex items-center gap-1.5">
                      <CheckCircle2 className={`w-3.5 h-3.5 ${currentArea.textColor}`} />
                      <span className="text-[9.5px] font-mono font-bold uppercase tracking-widest text-slate-500">PROPIEDAD DE PROCESO</span>
                    </div>
                    <span className={`text-[9.5px] font-mono font-black uppercase tracking-wider px-2 py-0.5 rounded-full ${currentArea.bgColor} ${currentArea.textColor}`}>
                      {plat.status}
                    </span>
                  </div>
                </motion.div>
              ))}
            </div>

          </motion.div>
        </AnimatePresence>
      </div>

      {/* 3. Dynamic Ticker Footer (Dynamic Movement) */}
      <div className="w-full bg-[#02040a] py-6 overflow-hidden border-y border-slate-800/30 relative ph-no-capture sentry-block" data-sentry-block>
        <div className="absolute inset-y-0 left-0 w-32 bg-gradient-to-r from-[#02040a] to-transparent z-10 pointer-events-none" />
        <div className="absolute inset-y-0 right-0 w-32 bg-gradient-to-l from-[#02040a] to-transparent z-10 pointer-events-none" />
        
        <motion.div 
          className="flex gap-12 items-center whitespace-nowrap ph-no-capture sentry-block"
          data-sentry-block
          animate={{ x: [0, -1500] }}
          transition={{ duration: 35, repeat: Infinity, ease: "linear" }}
        >
          {[...TICKER_ITEMS, ...TICKER_ITEMS, ...TICKER_ITEMS].map((name, i) => {
            // Find which area of work has this technology to assign color coding inside the ticker!
            const techArea = WORK_AREAS.find(area => area.platforms.some(p => p.name.toLowerCase() === name.toLowerCase())) || WORK_AREAS[0];
            const bulletColor = {
              sig: "bg-cyan-400",
              data: "bg-blue-400",
              web: "bg-indigo-400",
              ai: "bg-emerald-400",
              cloud: "bg-orange-400",
              mobile: "bg-amber-400"
            }[techArea.id] || "bg-cyan-400";

            return (
              <div key={i} className="flex items-center gap-2.5 group cursor-default">
                <span className={`w-1.5 h-1.5 rounded-full ${bulletColor}`} />
                <span className="text-sm font-black text-slate-300 group-hover:text-white transition-colors tracking-tighter">
                  {name}
                </span>
                <span className="text-[9.5px] font-mono text-slate-600 uppercase tracking-widest">
                  {techArea.title.split(" ")[0]}
                </span>
              </div>
            );
          })}
        </motion.div>
      </div>

    </div>
  );
}
