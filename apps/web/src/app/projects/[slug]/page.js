"use client";
import { useParams } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import Logo from "../../../components/Logo";
import OfficialGISDemo from "../../../components/OfficialGISDemo";
import RealDataSimulator from "../../../components/RealDataSimulator";

const PROJECTS_DATA = {
  "qgis-plugin": {
    title: "LADM-COL QGIS Plugin",
    subtitle: "Validación Topológica Nativa de Siguiente Generación",
    status: "STABLE_TOOL",
    tag: "PYQGIS_PLUGIN",
    description: "Herramienta industrial diseñada para la validación instantánea de bases de datos territoriales bajo el estándar LADM-COL. Optimiza el flujo de trabajo de gestores catastrales eliminando errores manuales.",
    features: [
      { title: "Topología Avanzada", desc: "Detección de traslapes y huecos (slivers) en tiempo real." },
      { title: "Sincronización Cloud", desc: "Push directo a bases de datos PostGIS centralizadas." },
      { title: "Reportes Automáticos", desc: "Generación de informes de conformidad técnica en PDF." }
    ],
    tech: ["PyQGIS", "Python 3.10", "Qt5", "PostGIS"],
    realData: "Conectado a IGAC Object Catalog 2024",
    demoType: "CONSOLE",
    visual: "🔌"
  },
  "automation-systems": {
    title: "Territorial ETL Pipelines",
    subtitle: "Automatización Geoespacial Desatendida",
    status: "ACTIVE_PIPELINE",
    tag: "AUTOMATION_01",
    description: "Sistemas de orquestación de datos para la migración y transformación masiva de archivos GML, GeoJSON y XTF. Diseñado para alta disponibilidad en entornos gubernamentales.",
    features: [
      { title: "Orquestación GDAL", desc: "Pipelines de alto rendimiento para miles de registros." },
      { title: "Validación de Esquema", desc: "Check automático contra modelos INTERLIS oficiales." },
      { title: "Logs de Auditoría", desc: "Traceability completa de cada transformación de datos." }
    ],
    tech: ["Python", "Docker", "GDAL/OGR", "FME"],
    realData: "Protocolos ICDE / LADM-COL V3",
    demoType: "PIPELINE",
    visual: "⚙️"
  },
  "gis-dashboard": {
    title: "Enterprise GIS Dashboard",
    subtitle: "Inteligencia Territorial en Tiempo Real",
    status: "LIVE_NODE",
    tag: "DASHBOARD_02",
    description: "Panel de control ejecutivo para la visualización de indicadores territoriales, densidades prediales y telemetría de activos IoT en una sola interfaz unificada.",
    features: [
      { title: "Mapas de Calor", desc: "Análisis dinámico de valorización y densidad urbana." },
      { title: "Filtrado Espacial", desc: "Consultas SQL espaciales directas desde la UI." },
      { title: "Exportación Multi-formato", desc: "Descarga de datasets filtrados en GeoJSON/CSV." }
    ],
    tech: ["React", "MapLibre GL", "PostGIS", "Node.js"],
    realData: "Feeds de Colombia en Mapas (WMS/WFS)",
    demoType: "MAP",
    visual: "📊"
  },
  "geo-llm": {
    title: "Geo-LLM Intelligence",
    subtitle: "IA Generativa para Análisis Espacial",
    status: "R&D KERNEL",
    tag: "GEO_LLM_05",
    description: "Motor de IA que permite interactuar con bases de datos geográficas mediante lenguaje natural. Convierte preguntas complejas en consultas espaciales precisas.",
    features: [
      { title: "Natural Language to SQL", desc: "Traduce texto a consultas PostGIS complejas." },
      { title: "Análisis Predictivo", desc: "Modelado de crecimiento urbano mediante IA." },
      { title: "Insights Automáticos", desc: "Resúmenes técnicos de tendencias territoriales." }
    ],
    tech: ["LLMs", "Vector DBs", "Spatial SQL", "Python"],
    realData: "Base Catastral Pública (Datos Abiertos CO)",
    demoType: "CHAT",
    visual: "🤖"
  }
};

export default function ProjectPage() {
  const { slug } = useParams();
  const project = PROJECTS_DATA[slug];

  if (!project) return <div className="min-h-screen flex items-center justify-center text-white">Project Not Found</div>;

  return (
    <div className="min-h-screen bg-[#02040a] pt-32 pb-20 relative overflow-hidden">
      {/* Background Decor */}
      <div className="absolute top-0 left-0 w-full h-full pointer-events-none opacity-20">
         <div className="absolute top-1/4 left-1/4 w-[600px] h-[600px] bg-cyan-500/20 rounded-full blur-[150px]"></div>
         <div className="absolute bottom-1/4 right-1/4 w-[600px] h-[600px] bg-purple-500/20 rounded-full blur-[150px]"></div>
      </div>

      <div className="max-w-7xl mx-auto px-6 relative z-10">
        <Link href="/" className="inline-flex items-center gap-2 text-slate-500 hover:text-cyan-400 transition-colors mb-12 font-mono text-xs uppercase tracking-widest">
           ← Volver al Ecosistema
        </Link>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 items-center mb-32">
           <div className="space-y-8">
              <div className="flex items-center gap-4">
                 <span className="px-3 py-1 bg-cyan-500/10 border border-cyan-500/20 text-cyan-400 font-mono text-[10px] tracking-widest rounded uppercase">
                    {project.tag}
                 </span>
                 <div className="flex items-center gap-2 px-3 py-1 bg-emerald-500/10 border border-emerald-500/20 rounded uppercase">
                    <span className="w-1.5 h-1.5 bg-emerald-500 rounded-full animate-pulse"></span>
                    <span className="text-[9px] font-black text-emerald-400 tracking-widest">{project.status}</span>
                 </div>
              </div>

              <div className="space-y-4">
                 <h1 className="text-6xl md:text-8xl font-black text-white tracking-tighter leading-tight">
                    {project.title.split(' ')[0]} <br/>
                    <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-blue-500 to-purple-600">
                       {project.title.split(' ').slice(1).join(' ')}
                    </span>
                 </h1>
                 <p className="text-2xl font-light text-slate-400 italic">{project.subtitle}</p>
              </div>

              <p className="text-xl text-slate-300 leading-relaxed max-w-xl font-light">
                 {project.description}
              </p>

              <div className="flex flex-wrap gap-3">
                 {project.tech.map(t => (
                    <span key={t} className="px-4 py-2 bg-slate-900 border border-slate-800 text-xs font-mono text-slate-400 rounded-xl uppercase tracking-widest">
                       {t}
                    </span>
                 ))}
              </div>
           </div>

           {/* Dynamic Demo Visualizer */}
           <div className="relative group">
              <div className="absolute -inset-4 bg-gradient-to-r from-cyan-500/20 to-purple-500/20 rounded-[3rem] blur-2xl opacity-50 group-hover:opacity-100 transition-opacity"></div>
              <div className="relative aspect-square bg-[#0a0f16] border border-slate-800 rounded-[3rem] overflow-hidden shadow-2xl">
                 <InteractiveDemo type={project.demoType} slug={slug} />
                 
                 <div className="absolute bottom-8 left-8 right-8 p-6 bg-black/60 backdrop-blur-xl border border-white/10 rounded-2xl z-20">
                    <div className="text-[10px] font-mono text-slate-500 uppercase tracking-widest mb-1">Official Dataset Source</div>
                    <div className="text-xs text-cyan-400 font-bold truncate uppercase">{project.realData}</div>
                 </div>
              </div>
           </div>
        </div>

        {/* Features Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 pt-32 border-t border-slate-900">
           {project.features.map((f, i) => (
              <div key={i} className="space-y-4 p-8 rounded-3xl bg-slate-900/30 border border-slate-800/50 hover:border-cyan-500/30 transition-all group">
                 <div className="w-12 h-12 rounded-2xl bg-cyan-500/10 flex items-center justify-center text-xl group-hover:bg-cyan-500 group-hover:text-black transition-all">✨</div>
                 <h3 className="text-xl font-bold text-white">{f.title}</h3>
                 <p className="text-slate-400 font-light leading-relaxed">{f.desc}</p>
              </div>
           ))}
        </div>

        {/* Simplified Branding Section */}
        <div className="mt-40 p-12 lg:p-20 bg-gradient-to-br from-slate-900 to-black border border-slate-800 rounded-[4rem] relative overflow-hidden group">
           <div className="absolute top-0 right-0 p-12">
              <Logo className="w-32 h-32 opacity-5 group-hover:opacity-10 transition-opacity" />
           </div>
           <div className="max-w-4xl space-y-10 relative z-10">
              <div className="inline-flex items-center gap-2 px-4 py-1.5 bg-white/5 border border-white/10 rounded-full text-[10px] text-slate-400 font-mono uppercase tracking-[0.3em] font-black">
                 Guía Ejecutiva de Valor
              </div>
              <h2 className="text-5xl md:text-6xl font-black text-white tracking-tight leading-none">
                 ¿Qué significa esto para su organización?
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-12 pt-4">
                 <div className="space-y-4">
                    <div className="text-cyan-400 font-black text-xs uppercase tracking-widest">El Problema Común</div>
                    <p className="text-slate-400 font-light leading-relaxed">
                       La mayoría de las organizaciones pierden el 40% de su tiempo corrigiendo datos geográficos manualmente o esperando a que sistemas lentos procesen información territorial crítica.
                    </p>
                 </div>
                 <div className="space-y-4">
                    <div className="text-emerald-400 font-black text-xs uppercase tracking-widest">Nuestra Solución</div>
                    <p className="text-slate-200 font-medium leading-relaxed">
                       Esta tecnología actúa como un <span className="text-white font-bold">auditor digital infalible</span>. En lugar de procesar expedientes uno por uno, nuestro motor lo hace en masa, garantizando que cada metro cuadrado esté correctamente registrado bajo la ley colombiana.
                    </p>
                 </div>
              </div>
           </div>
        </div>

      </div>
    </div>
  );
}

function InteractiveDemo({ type, slug }) {
  const [logs, setLogs] = useState([]);
  const mapRef = useRef(null);

  useEffect(() => {
    if (type === "CONSOLE" || type === "PIPELINE") {
      const interval = setInterval(() => {
        const samples = {
          "CONSOLE": ["[CHECK] LADM-COL V3 Topology...", "[ERROR] Overlap detected at Parcel #001", "[FIX] Auto-adjusting geometry...", "[OK] Record validated."],
          "PIPELINE": ["[ETL] Ingesting GML file...", "[PARSE] Extracting 500 features...", "[TRANSFORM] Reprojecting to MAGNA-SIRGAS...", "[SUCCESS] Data exported to PostGIS."]
        }[type];
        setLogs(prev => [samples[Math.floor(Math.random() * samples.length)], ...prev.slice(0, 8)]);
      }, 2000);
      return () => clearInterval(interval);
    }

    if (type === "MAP") {
       // Load dynamic map preview
       const link = document.createElement("link");
       link.rel = "stylesheet";
       link.href = "https://unpkg.com/leaflet@1.9.4/dist/leaflet.css";
       document.head.appendChild(link);

       const script = document.createElement("script");
       script.src = "https://unpkg.com/leaflet@1.9.4/dist/leaflet.js";
       script.onload = () => {
         if (window.L && mapRef.current) {
           const L = window.L;
           const map = L.map(mapRef.current).setView([4.6486, -74.0592], 15);
           L.tileLayer("https://mt1.google.com/vt/lyrs=s&x={x}&y={y}&z={z}").addTo(map);
           L.circle([4.6486, -74.0592], { radius: 200, color: '#38BDF8', fillOpacity: 0.2 }).addTo(map);
         }
       };
       document.head.appendChild(script);
    }
  }, [type]);

  if (slug === "gis-dashboard") {
    return <OfficialGISDemo />;
  }

  if (slug === "qgis-plugin") {
    return <RealDataSimulator />;
  }

  if (type === "CONSOLE" || type === "PIPELINE") {
    return (
      <div className="w-full h-full p-10 font-mono text-[11px] bg-slate-950/50 flex flex-col gap-2">
         <div className="text-slate-500">// {type}_STREAM_ACTIVE</div>
         {logs.map((log, i) => (
           <div key={i} className="text-cyan-400 animate-in fade-in slide-in-from-left-4">
              <span className="text-slate-700 mr-4">[{i}]</span> {log}
           </div>
         ))}
      </div>
    );
  }

  if (type === "MAP") {
    return <div ref={mapRef} className="w-full h-full grayscale contrast-125"></div>;
  }

  if (type === "CHAT") {
    return (
      <div className="w-full h-full p-8 flex flex-col gap-6 bg-slate-950/50">
         <div className="flex gap-4">
            <div className="w-10 h-10 rounded-full bg-cyan-500 flex items-center justify-center text-xl">👤</div>
            <div className="p-4 bg-slate-900 rounded-2xl rounded-tl-none text-sm font-light text-slate-300">
               ¿Cuántos predios en Bogotá tienen un área mayor a 500m2?
            </div>
         </div>
         <div className="flex gap-4 self-end flex-row-reverse">
            <div className="w-10 h-10 rounded-full bg-purple-600 flex items-center justify-center text-xl">🤖</div>
            <div className="p-4 bg-purple-900/30 border border-purple-500/30 rounded-2xl rounded-tr-none text-sm">
               <div className="text-xs font-mono text-purple-400 mb-2">GENERATING_SPATIAL_SQL...</div>
               <code className="text-xs text-white">SELECT COUNT(*) FROM predios WHERE st_area(geom) &gt; 500;</code>
               <div className="mt-4 text-slate-200">Encontrados 4,215 registros en la base catastral actual.</div>
            </div>
         </div>
      </div>
    );
  }

  return null;
}
