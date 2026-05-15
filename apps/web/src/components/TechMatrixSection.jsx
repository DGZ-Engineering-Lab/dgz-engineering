export default function TechMatrixSection() {
  const matrixData = [
    {
      id: "ID_GIS_SPATIAL_INFRA",
      title: "Infraestructura Espacial",
      desc: "Matriz de topología PostGIS, cumplimiento LADM-COL V3 y arquitectura vectorial de alta fidelidad.",
      icon: (
        <svg className="w-8 h-8 text-cyan-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M4 7v10c0 2.21 3.582 4 8 4s8-1.79 8-4V7M4 7c0 2.21 3.582 4 8 4s8-1.79 8-4M4 7c0-2.21 3.582-4 8-4s8 1.79 8 4m0 5c0 2.21-3.582 4-8 4s-8-1.79-8-4" />
        </svg>
      ),
      tags: ["PostGIS", "QGIS", "Supabase", "LADM-COL"]
    },
    {
      id: "ID_SYSTEMS_ENGINEERING",
      title: "Ingeniería de Sistemas",
      desc: "Sistemas backend para inteligencia espacial, arquitectura Node/Python RESTful y lógica automatizada.",
      icon: (
        <svg className="w-8 h-8 text-emerald-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4" />
        </svg>
      ),
      tags: ["Python", "FastAPI", "TypeScript", "Node.js", "React"]
    },
    {
      id: "ID_AUTOMATION_DEVOPS",
      title: "Automatización & DevOps",
      desc: "Pipelines CI/CD para activos geoespaciales, nodos espaciales en contenedores y optimización de kernel.",
      icon: (
        <svg className="w-8 h-8 text-purple-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M13 10V3L4 14h7v7l9-11h-7z" />
        </svg>
      ),
      tags: ["GitHub Actions", "Docker", "Vercel", "Linux Kernel"]
    }
  ];

  return (
    <section id="tech-dna" className="relative w-full py-24 z-10">
      <div className="max-w-5xl mx-auto px-6">
        <div className="flex flex-col mb-16">
          <div className="flex items-center gap-4 mb-4">
            <div className="w-12 h-[1px] bg-gradient-to-r from-transparent to-cyan-500"></div>
            <span className="text-cyan-400 font-mono text-sm tracking-widest uppercase">
              Stack Tecnológico
            </span>
          </div>
          <h2 className="text-4xl md:text-5xl font-extrabold text-white tracking-tight leading-tight">
            La <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-purple-500">Matriz</span> de Ingeniería
          </h2>
        </div>

        <div className="space-y-6">
          {matrixData.map((row, idx) => (
            <div 
              key={idx} 
              className="group flex flex-col md:flex-row items-start md:items-center gap-6 p-6 md:p-8 rounded-2xl bg-black/40 border border-slate-800 hover:border-cyan-500/50 transition-all duration-300 hover:bg-slate-900/50 relative overflow-hidden"
            >
              {/* Animated left border on hover */}
              <div className="absolute left-0 top-0 w-1 h-full bg-gradient-to-b from-cyan-500 to-purple-500 opacity-0 group-hover:opacity-100 transition-opacity"></div>
              
              <div className="flex-shrink-0 p-4 rounded-xl bg-slate-900/80 border border-slate-700 group-hover:border-cyan-500/30 transition-colors">
                {row.icon}
              </div>

              <div className="flex-1 space-y-2">
                <h3 className="text-xl font-bold text-white font-mono flex items-center gap-3">
                  {row.id} 
                  <span className="text-xs px-2 py-1 bg-cyan-500/10 text-cyan-400 border border-cyan-500/20 rounded-full">ACTIVE</span>
                </h3>
                <p className="text-slate-400 text-sm leading-relaxed max-w-2xl">
                  {row.desc}
                </p>
              </div>

              <div className="flex flex-wrap md:justify-end gap-2 w-full md:w-auto mt-4 md:mt-0">
                {row.tags.map((tag, tIdx) => (
                  <span 
                    key={tIdx} 
                    className="px-3 py-1.5 text-[11px] font-mono text-slate-300 bg-slate-800/50 border border-slate-700 rounded shadow-sm group-hover:border-slate-600 transition-colors"
                  >
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
