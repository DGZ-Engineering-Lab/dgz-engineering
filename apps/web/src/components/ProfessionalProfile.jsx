"use client";

export default function ProfessionalProfile() {
  const experiences = [
    {
      period: "2025",
      role: "Analista Geográfico",
      company: "GEOSAT S.A.S.",
      desc: "LADM-COL V3 & Restitución 360°."
    },
    {
      period: "2024",
      role: "Coordinador SIG",
      company: "UT SMART CITY",
      desc: "Despliegue Smart City & Catastro."
    },
    {
      period: "2024",
      role: "Líder de Campo",
      company: "ARBIRTRIUM S.A.S.",
      desc: "Barrido Predial Masivo."
    }
  ];

  const tools = [
    { name: "GIS Suite", val: "100%", tools: "QGIS, ArcGIS Pro, Civil 3D" },
    { name: "Data Science", val: "90%", tools: "PostGIS, SQL, Python" },
    { name: "Development", val: "85%", tools: "React, Node.js, FastAPI" }
  ];

  return (
    <section id="profile" className="relative w-full py-20 z-10 bg-[#05070a] border-t border-slate-800/50">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
          
          {/* Bio Column */}
          <div className="lg:col-span-5 space-y-8">
            <div className="inline-flex items-center gap-2 px-3 py-1 border border-cyan-500/30 bg-cyan-500/5 rounded-full text-cyan-400 font-mono text-[10px] tracking-widest uppercase">
              // ARCHITECT_PROFILE
            </div>
            <div className="space-y-4">
              <h2 className="text-4xl font-extrabold text-white tracking-tight">
                Albert Daniel <span className="text-cyan-400">Gaviria Zapata</span>
              </h2>
              <p className="text-slate-400 font-light leading-relaxed">
                Ingeniero SIG y Desarrollador con visión integral. Especialista en modernización de sistemas territoriales, fusionando cartografía de precisión con arquitectura de software de alto nivel.
              </p>
            </div>

            <div className="grid grid-cols-2 gap-4">
              {tools.map((t, i) => (
                <div key={i} className="p-4 rounded-xl bg-slate-900/50 border border-slate-800">
                  <div className="text-[10px] font-mono text-slate-500 uppercase mb-1">{t.name}</div>
                  <div className="text-lg font-bold text-white mb-2">{t.val}</div>
                  <div className="text-[9px] text-cyan-500 font-mono">{t.tools}</div>
                </div>
              ))}
            </div>
            
            <div className="pt-4 flex gap-4">
               <div className="flex items-center gap-2 text-xs font-mono text-slate-500">
                 <span className="w-2 h-2 rounded-full bg-emerald-500"></span> ESPAÑOL (NATIVE)
               </div>
               <div className="flex items-center gap-2 text-xs font-mono text-slate-500">
                 <span className="w-2 h-2 rounded-full bg-cyan-500"></span> ENGLISH (C1)
               </div>
            </div>
          </div>

          {/* Timeline Column */}
          <div className="lg:col-span-7">
            <div className="p-8 rounded-2xl bg-slate-900/30 border border-slate-800 relative overflow-hidden">
              <div className="absolute top-0 right-0 p-4 opacity-10">
                <svg width="120" height="120" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="0.5">
                  <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5" />
                </svg>
              </div>

              <h3 className="text-sm font-mono text-slate-500 uppercase tracking-[0.3em] mb-8 border-b border-slate-800 pb-4">
                Trayectoria Técnica // Track Record
              </h3>

              <div className="space-y-6">
                {experiences.map((exp, i) => (
                  <div key={i} className="flex gap-6 group">
                    <div className="flex flex-col items-center">
                      <div className="w-2 h-2 rounded-full bg-cyan-500 mt-2 shadow-[0_0_8px_rgba(6,182,212,0.5)]"></div>
                      <div className="w-[1px] h-full bg-slate-800 group-last:hidden"></div>
                    </div>
                    <div className="pb-6">
                      <div className="text-[10px] font-mono text-cyan-500 mb-1">{exp.period}</div>
                      <h4 className="text-white font-bold">{exp.role}</h4>
                      <div className="text-xs text-slate-500 font-mono mb-2 uppercase">{exp.company}</div>
                      <p className="text-xs text-slate-400 leading-relaxed">{exp.desc}</p>
                    </div>
                  </div>
                ))}
              </div>

              <a href="#" className="inline-flex items-center gap-2 text-[10px] font-bold text-cyan-400 hover:text-white transition-colors uppercase tracking-widest mt-4">
                <span>Descargar Dossier Completo</span>
                <svg className="w-3 h-3" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path d="M12 4v16m8-8H4" /></svg>
              </a>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
