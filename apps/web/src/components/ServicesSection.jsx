export default function ServicesSection() {
  const services = [
    {
      id: "SVC-M-01",
      status: "CORE SYSTEM",
      statusColor: "text-emerald-400 bg-emerald-500/10 border-emerald-500/20",
      statusDot: "bg-emerald-400",
      icon: (
        <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M9 20l-5.447-2.724A1 1 0 013 16.382V5.618a1 1 0 011.447-.894L9 7m0 13l6-3m-6 3V7m6 10l4.553 2.276A1 1 0 0021 18.382V7.618a1 1 0 00-.553-.894L15 4m0 13V4m0 0L9 7" />
        </svg>
      ),
      title: "Actualización Territorial (LADM-COL)",
      desc: "Implementación del modelo LADM-COL V3 para procesos catastrales masivos. Garantizamos integridad topológica y jurídica.",
      metrics: [
        { val: "+500", lbl: "Predios/Día" },
        { val: "100%", lbl: "Legal Ready" }
      ],
      tags: ["Interoperabilidad", "Catastro Multipropósito", "IGAC Standard"]
    },
    {
      id: "SVC-Q-02",
      status: "AUTOMATED",
      statusColor: "text-emerald-400 bg-emerald-500/10 border-emerald-500/20",
      statusDot: "bg-emerald-400",
      icon: (
        <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
        </svg>
      ),
      title: "Control de Calidad (QA/QC)",
      desc: "Motores de validación automática para detectar inconsistencias espaciales y alfanuméricas antes de la entrega final.",
      metrics: [
        { val: "0.01%", lbl: "Error Margin" },
        { val: "Auto", lbl: "Validation" }
      ],
      tags: ["Precisión", "Auditoría", "GIS Compliance"]
    },
    {
      id: "SVC-E-03",
      status: "UPLINK LIVE",
      statusColor: "text-blue-400 bg-blue-500/10 border-blue-500/20",
      statusDot: "bg-blue-400",
      icon: (
        <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M13 10V3L4 14h7v7l9-11h-7z" />
        </svg>
      ),
      title: "ETL & GIS Pipelines",
      desc: "Automatización completa del flujo de datos desde sensores de campo hasta bases de datos PostGIS centralizadas.",
      metrics: [
        { val: "Real-time", lbl: "Sync" },
        { val: "FastAPI", lbl: "Backend" }
      ],
      tags: ["DevOps", "Python", "Spatial Data"]
    },
    {
      id: "SVC-A-04",
      status: "BETA ACCESS",
      statusColor: "text-purple-400 bg-purple-500/10 border-purple-500/20",
      statusDot: "bg-purple-400 animate-pulse",
      icon: (
        <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z" />
        </svg>
      ),
      title: "GeoAI & Computer Vision",
      desc: "Extracción automática de coberturas y construcciones mediante modelos de deep learning aplicados a imágenes satelitales.",
      metrics: [
        { val: "CNN", lbl: "Models" },
        { val: "95%", lbl: "Confidence" }
      ],
      tags: ["Remote Sensing", "GeoAI", "Satellite"]
    },
    {
      id: "SVC-D-05",
      status: "CORE SYSTEM",
      statusColor: "text-emerald-400 bg-emerald-500/10 border-emerald-500/20",
      statusDot: "bg-emerald-400",
      icon: (
        <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M11 3.055A9.001 9.001 0 1020.945 13H11V3.055z" />
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M20.488 9H15V3.512A9.025 9.025 0 0120.488 9z" />
        </svg>
      ),
      title: "Enterprise Dashboards",
      desc: "Plataformas de visualización interactiva para la toma de decisiones gerenciales basadas en inteligencia geográfica.",
      metrics: [
        { val: "Visual", lbl: "BI" },
        { val: "Mobile", lbl: "Ready" }
      ],
      tags: ["BI", "WebGIS", "Stakeholders"]
    },
    {
      id: "SVC-C-06",
      status: "FIELD OPS",
      statusColor: "text-amber-400 bg-amber-500/10 border-amber-500/20",
      statusDot: "bg-amber-400",
      icon: (
        <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
        </svg>
      ),
      title: "Gestión de Equipos de Campo",
      desc: "Coordinación técnica y logística para el levantamiento de información predial con altos estándares de calidad.",
      metrics: [
        { val: "100%", lbl: "Traceability" },
        { val: "Sync", lbl: "Offline" }
      ],
      tags: ["Campo", "Logística", "Gestión"]
    }
  ];

  return (
    <section id="capabilities" className="relative w-full py-32 z-10 bg-black/40 border-t border-slate-800/50">
      <div className="max-w-7xl mx-auto px-6">
        <div className="flex flex-col items-center text-center mb-24">
          <div className="flex items-center gap-4 mb-6">
            <div className="w-12 h-[1px] bg-gradient-to-r from-transparent to-cyan-500"></div>
            <span className="text-cyan-400 font-mono text-xs tracking-[0.4em] uppercase">Capacidades Técnicas</span>
            <div className="w-12 h-[1px] bg-gradient-to-l from-transparent to-cyan-500"></div>
          </div>

          <h2 className="text-5xl md:text-6xl font-black text-white tracking-tighter leading-tight max-w-4xl">
            Sistemas de <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-blue-500 to-purple-600">Misión Crítica</span> para el Territorio
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {services.map((svc) => (
            <div
              key={svc.id}
              className="group relative flex flex-col p-10 rounded-3xl bg-[#0a0f16] border border-slate-800 hover:border-cyan-500/30 transition-all duration-500 hover:-translate-y-2 shadow-2xl overflow-hidden"
            >
              {/* Animated Glow on hover */}
              <div className="absolute -top-24 -right-24 w-48 h-48 bg-cyan-500/10 blur-[60px] group-hover:bg-cyan-500/20 transition-all duration-700 rounded-full"></div>

              <div className="flex justify-between items-start mb-8 relative z-10">
                <span className="font-mono text-[10px] text-slate-500 tracking-[0.2em]">{svc.id}</span>
                <div className={`flex items-center gap-2 px-3 py-1 rounded-full border text-[9px] font-black tracking-[0.1em] ${svc.statusColor}`}>
                  <span className={`w-1.5 h-1.5 rounded-full ${svc.statusDot}`}></span>
                  {svc.status}
                </div>
              </div>

              <div className="mb-8 p-5 rounded-2xl bg-slate-900/50 border border-slate-800 group-hover:border-cyan-500/30 group-hover:bg-slate-800 transition-all duration-500 inline-flex items-center justify-center text-cyan-400">
                {svc.icon}
              </div>

              <h3 className="text-2xl font-bold text-white mb-4 tracking-tight group-hover:text-cyan-400 transition-colors">{svc.title}</h3>
              <p className="text-slate-400 text-base font-light leading-relaxed mb-10 flex-1">
                {svc.desc}
              </p>

              <div className="grid grid-cols-2 gap-4 py-6 border-t border-slate-800/50 mb-8">
                {svc.metrics.map((metric, idx) => (
                  <div key={idx} className="flex flex-col">
                    <span className="text-xl font-black text-white tracking-tighter">{metric.val}</span>
                    <span className="text-[9px] text-slate-500 font-mono uppercase tracking-widest">{metric.lbl}</span>
                  </div>
                ))}
              </div>

              <div className="flex flex-wrap gap-2 relative z-10">
                {svc.tags.map((tag, idx) => (
                  <span key={idx} className="px-3 py-1.5 text-[9px] font-mono text-slate-500 border border-slate-800 rounded-md group-hover:border-cyan-500/30 group-hover:text-cyan-400 transition-all">
                    {tag}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
