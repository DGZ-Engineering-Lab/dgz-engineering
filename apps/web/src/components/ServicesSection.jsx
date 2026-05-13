export default function ServicesSection() {
  const services = [
    {
      id: "SVC-M-01",
      status: "SISTEMA ACTIVO",
      statusColor: "text-emerald-400 bg-emerald-500/10 border-emerald-500/20",
      statusDot: "bg-emerald-400",
      icon: (
        <svg className="w-8 h-8 text-cyan-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M9 20l-5.447-2.724A1 1 0 013 16.382V5.618a1 1 0 011.447-.894L9 7m0 13l6-3m-6 3V7m6 10l4.553 2.276A1 1 0 0021 18.382V7.618a1 1 0 00-.553-.894L15 4m0 13V4m0 0L9 7" />
        </svg>
      ),
      title: "Actualización Catastral Masiva",
      desc: "Gestión y validación de +500 predios por ciclo. Automatización completa del flujo de reconocimiento predial bajo estándares IGAC y LADM-COL V3.",
      metrics: [
        { val: "+500", lbl: "Predios/Ciclo" },
        { val: "99.8%", lbl: "Precisión SIG" }
      ],
      tags: ["ArcGIS Pro", "LADM-COL", "PostGIS"]
    },
    {
      id: "SVC-Q-02",
      status: "SISTEMA ACTIVO",
      statusColor: "text-emerald-400 bg-emerald-500/10 border-emerald-500/20",
      statusDot: "bg-emerald-400",
      icon: (
        <svg className="w-8 h-8 text-cyan-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
        </svg>
      ),
      title: "QA/QC Catastral (Control de Calidad)",
      desc: "Auditorías técnicas con Python y QGIS. Detección automática de solapamientos, huecos y errores topológicos. Reportes certificados.",
      metrics: [
        { val: "100%", lbl: "Integridad Topo" },
        { val: "Automated", lbl: "Engine" }
      ],
      tags: ["Python", "Shapely", "QGIS"]
    },
    {
      id: "SVC-E-03",
      status: "SISTEMA ACTIVO",
      statusColor: "text-emerald-400 bg-emerald-500/10 border-emerald-500/20",
      statusDot: "bg-emerald-400",
      icon: (
        <svg className="w-8 h-8 text-cyan-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
        </svg>
      ),
      title: "Pipelines ETL Geoespaciales",
      desc: "Arquitectura de transformación desatendida para ingesta masiva de datos GIS. De campo a base de datos sin intervención manual.",
      metrics: [
        { val: "Headless", lbl: "Processing" },
        { val: "Real-time", lbl: "Sync Status" }
      ],
      tags: ["GDAL/OGR", "FME", "FastAPI"]
    },
    {
      id: "SVC-A-04",
      status: "EN DESARROLLO",
      statusColor: "text-cyan-400 bg-cyan-500/10 border-cyan-500/20",
      statusDot: "bg-cyan-400 animate-pulse",
      icon: (
        <svg className="w-8 h-8 text-cyan-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M14 10l-2 1m0 0l-2-1m2 1v2.5M20 7l-2 1m2-1l-2-1m2 1v2.5M14 4l-2-1-2 1M4 7l2-1M4 7l2 1M4 7v2.5M12 21l-2-1m2 1l2-1m-2 1v-2.5M6 18l-2-1v-2.5M18 18l2-1v-2.5" />
        </svg>
      ),
      title: "GeoAI — Detección de Cambios",
      desc: "Machine Learning sobre imagenería Sentinel-2 para detectar expansión urbana, cambios de cobertura y mutaciones territoriales.",
      metrics: [
        { val: "Sentinel-2", lbl: "Multitemporal" },
        { val: "Deep L.", lbl: "Engine" }
      ],
      tags: ["Scikit-learn", "Rasterio", "Sentinel-2"]
    },
    {
      id: "SVC-D-05",
      status: "SISTEMA ACTIVO",
      statusColor: "text-emerald-400 bg-emerald-500/10 border-emerald-500/20",
      statusDot: "bg-emerald-400",
      icon: (
        <svg className="w-8 h-8 text-cyan-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
        </svg>
      ),
      title: "Dashboards GIS Empresariales",
      desc: "Interfaces interactivas conectadas a PostGIS para análisis territorial en tiempo real. Visualización de indicadores catastrales.",
      metrics: [
        { val: "WebMap", lbl: "Rendering" },
        { val: "Cloud", lbl: "Deployment" }
      ],
      tags: ["MapLibre GL", "React", "REST API"]
    },
    {
      id: "SVC-C-06",
      status: "SISTEMA ACTIVO",
      statusColor: "text-emerald-400 bg-emerald-500/10 border-emerald-500/20",
      statusDot: "bg-emerald-400",
      icon: (
        <svg className="w-8 h-8 text-cyan-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
        </svg>
      ),
      title: "Coordinación de Campo GIS",
      desc: "Liderazgo de equipos técnicos en terrenos complejos. Nivelación topográfica, digitalización masiva y coordinación normativa.",
      metrics: [
        { val: "RTK", lbl: "Hardware" },
        { val: "NSR-10", lbl: "Compliance" }
      ],
      tags: ["GPS RTK", "Civil 3D", "AutoCAD"]
    }
  ];

  return (
    <section id="capabilities" className="relative w-full py-24 z-10 bg-black/20">
      <div className="max-w-6xl mx-auto px-6">
        <div className="flex flex-col items-center text-center mb-16">
          <div className="flex items-center gap-4 mb-6">
            <div className="w-8 h-[1px] bg-gradient-to-r from-transparent to-purple-500"></div>
            <span className="text-purple-400 font-mono text-sm tracking-widest uppercase">
              Servicios Especializados
            </span>
            <div className="w-8 h-[1px] bg-gradient-to-l from-transparent to-purple-500"></div>
          </div>
          
          <h2 className="text-4xl md:text-5xl font-extrabold text-white tracking-tight max-w-3xl leading-tight">
            Soluciones <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-400 to-orange-500">especializadas</span> para cada desafío territorial
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {services.map((svc) => (
            <div 
              key={svc.id}
              className="group relative flex flex-col p-8 rounded-2xl bg-[#0a0d14] border border-slate-800 hover:border-cyan-500/50 transition-all duration-300 hover:shadow-[0_0_30px_rgba(0,229,255,0.1)] overflow-hidden"
            >
              {/* Top gradient glow on hover */}
              <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-cyan-500 to-purple-500 opacity-0 group-hover:opacity-100 transition-opacity"></div>
              
              <div className="flex justify-between items-start mb-6">
                <span className="font-mono text-xs text-slate-500 tracking-wider">{svc.id}</span>
                <div className={`flex items-center gap-2 px-3 py-1 rounded-full border text-[10px] font-bold tracking-wider ${svc.statusColor}`}>
                  <span className={`w-1.5 h-1.5 rounded-full ${svc.statusDot}`}></span>
                  {svc.status}
                </div>
              </div>

              <div className="mb-6 p-4 rounded-xl bg-slate-900/50 inline-table w-max border border-slate-800 group-hover:border-cyan-500/30 transition-colors">
                {svc.icon}
              </div>

              <h3 className="text-xl font-bold text-white mb-3">{svc.title}</h3>
              <p className="text-slate-400 text-sm leading-relaxed mb-8 flex-1">
                {svc.desc}
              </p>

              <div className="flex justify-between items-center py-4 border-t border-b border-slate-800/50 mb-6">
                {svc.metrics.map((metric, idx) => (
                  <div key={idx} className="flex flex-col">
                    <span className="text-white font-mono font-bold">{metric.val}</span>
                    <span className="text-xs text-slate-500 font-mono uppercase">{metric.lbl}</span>
                  </div>
                ))}
              </div>

              <div className="flex flex-wrap gap-2">
                {svc.tags.map((tag, idx) => (
                  <span key={idx} className="px-3 py-1 text-[10px] font-mono text-cyan-400 bg-cyan-500/5 border border-cyan-500/20 rounded">
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
