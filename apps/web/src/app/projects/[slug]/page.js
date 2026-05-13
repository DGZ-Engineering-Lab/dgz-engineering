"use client";
import { useParams } from "next/navigation";
import Link from "next/link";
import Logo from "../../../components/Logo";

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

           <div className="relative group">
              <div className="absolute -inset-4 bg-gradient-to-r from-cyan-500/20 to-purple-500/20 rounded-[3rem] blur-2xl opacity-50 group-hover:opacity-100 transition-opacity"></div>
              <div className="relative aspect-square bg-[#0a0f16] border border-slate-800 rounded-[3rem] flex items-center justify-center overflow-hidden shadow-2xl">
                 <div className="text-[200px] drop-shadow-[0_0_50px_rgba(0,229,255,0.3)] animate-float">
                    {project.visual}
                 </div>
                 {/* Visual Overlay - Dynamic Grid */}
                 <div className="absolute inset-0 opacity-10 pointer-events-none" style={{ backgroundImage: 'radial-gradient(#38BDF8 1px, transparent 1px)', backgroundSize: '30px 30px' }}></div>
                 <div className="absolute bottom-8 left-8 right-8 p-6 bg-black/60 backdrop-blur-xl border border-white/10 rounded-2xl">
                    <div className="text-[10px] font-mono text-slate-500 uppercase tracking-widest mb-1">Official Resource Link</div>
                    <div className="text-xs text-cyan-400 font-bold truncate uppercase">{project.realData}</div>
                 </div>
              </div>
           </div>
        </div>

        {/* Features / Details Section */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 pt-32 border-t border-slate-900">
           {project.features.map((f, i) => (
              <div key={i} className="space-y-4 p-8 rounded-3xl bg-slate-900/30 border border-slate-800/50 hover:border-cyan-500/30 transition-all">
                 <div className="w-12 h-12 rounded-2xl bg-cyan-500/10 flex items-center justify-center text-xl">✨</div>
                 <h3 className="text-xl font-bold text-white">{f.title}</h3>
                 <p className="text-slate-400 font-light leading-relaxed">{f.desc}</p>
              </div>
           ))}
        </div>

        {/* Branding Explanation for Non-Technical Users */}
        <div className="mt-40 p-12 bg-gradient-to-br from-slate-900 to-black border border-slate-800 rounded-[3rem] relative overflow-hidden">
           <div className="absolute top-0 right-0 p-8">
              <Logo className="w-16 h-16 opacity-20" />
           </div>
           <div className="max-w-3xl space-y-8 relative z-10">
              <div className="inline-flex items-center gap-2 px-3 py-1 bg-white/5 border border-white/10 rounded-full text-[10px] text-slate-400 font-mono uppercase tracking-[0.2em]">
                 Guía para Tomadores de Decisión
              </div>
              <h2 className="text-4xl font-black text-white tracking-tight">¿Qué significa esto para su organización?</h2>
              <p className="text-xl text-slate-400 leading-relaxed font-light">
                 En términos sencillos, esta solución actúa como un <span className="text-white font-bold">cerebro automatizado</span> para sus mapas y datos. En lugar de procesar información manualmente, nuestro sistema detecta errores, organiza la información y genera resultados listos para usar en segundos, ahorrando meses de trabajo técnico y garantizando que sus decisiones se basen en datos 100% verídicos.
              </p>
           </div>
        </div>

      </div>

      <style jsx global>{`
        @keyframes float {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-20px); }
        }
        .animate-float {
          animation: float 6s ease-in-out infinite;
        }
      `}</style>
    </div>
  );
}
