"use client";

export default function ProfessionalProfile() {
  const experiences = [
    {
      period: "2025",
      role: "Analista Geográfico",
      company: "GEOSAT S.A.S.",
      desc: "LADM-COL V3 & Restitución 360°.",
      tags: ["LADM-COL", "GIS", "QA/QC"]
    },
    {
      period: "2024",
      role: "Coordinador SIG",
      company: "UT SMART CITY",
      desc: "Despliegue Smart City & Catastro.",
      tags: ["Management", "Urban", "Data"]
    },
    {
      period: "2024",
      role: "Líder de Campo",
      company: "ARBIRTRIUM S.A.S.",
      desc: "Barrido Predial Masivo.",
      tags: ["Field Ops", "Land Administration"]
    }
  ];

  const tools = [
    { name: "GIS Suite", val: "100%", tools: ["QGIS", "ArcGIS Pro", "Civil 3D"], color: "from-emerald-600/20" },
    { name: "Data Science", val: "90%", tools: ["PostGIS", "SQL", "Python"], color: "from-blue-600/20" },
    { name: "Development", val: "85%", tools: ["React", "Node.js", "FastAPI"], color: "from-purple-600/20" }
  ];

  const badges = ["Cloud Native", "DevOps", "GeoAI", "LADM Expert", "FullStack"];

  return (
    <section id="profile" className="relative w-full py-32 z-10 bg-[#05070a] border-t border-slate-800/50 overflow-hidden">
      {/* Background Decor */}
      <div className="absolute top-0 right-0 w-1/2 h-full bg-cyan-500/5 blur-[120px] rounded-full -translate-y-1/2 translate-x-1/4 pointer-events-none"></div>
      
      <div className="max-w-7xl mx-auto px-6 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 items-start">
          
          {/* Bio Column */}
          <div className="lg:col-span-5 space-y-10">
            <div className="space-y-6">
              <div className="inline-flex items-center gap-3 px-4 py-2 border border-cyan-500/30 bg-cyan-500/5 rounded-full">
                <div className="w-2 h-2 rounded-full bg-cyan-400 animate-pulse"></div>
                <span className="text-cyan-400 font-mono text-[10px] tracking-[0.3em] uppercase">SYSTEM_ARCHITECT_ONLINE</span>
              </div>
              
              <div className="space-y-4">
                <h2 className="text-5xl font-black text-white tracking-tighter leading-tight">
                  Albert Daniel <br/>
                  <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-blue-500 to-purple-600">Gaviria Zapata</span>
                </h2>
                <p className="text-xl text-slate-400 font-light leading-relaxed">
                  Ingeniero SIG y Desarrollador de Software enfocado en la <span className="text-white font-medium">automatización territorial</span>. Fusiono la precisión cartográfica con arquitecturas de nube escalables.
                </p>
              </div>

              <div className="flex flex-wrap gap-2">
                {badges.map((b, i) => (
                  <span key={i} className="px-3 py-1 text-[10px] font-mono text-slate-500 border border-slate-800 rounded-md bg-slate-900/50 hover:border-cyan-500/50 hover:text-cyan-400 transition-all cursor-default">
                    {b}
                  </span>
                ))}
              </div>
            </div>

            <div className="grid grid-cols-1 gap-4">
              {tools.map((t, i) => (
                <div key={i} className={`group p-6 rounded-2xl bg-gradient-to-br ${t.color} to-transparent border border-slate-800 hover:border-cyan-500/30 transition-all duration-500 shadow-xl`}>
                  <div className="flex justify-between items-end mb-4">
                    <div>
                      <div className="text-[10px] font-mono text-slate-500 uppercase tracking-widest mb-1">{t.name}</div>
                      <div className="text-2xl font-black text-white tracking-tighter">{t.val}</div>
                    </div>
                    <div className="text-right">
                       <div className="flex gap-2 justify-end">
                         {t.tools.map((tool, j) => (
                           <span key={j} className="text-[10px] text-cyan-500 font-mono bg-cyan-500/10 px-2 py-0.5 rounded">
                             {tool}
                           </span>
                         ))}
                       </div>
                    </div>
                  </div>
                  <div className="w-full h-1 bg-slate-800 rounded-full overflow-hidden">
                    <div 
                      className="h-full bg-gradient-to-r from-cyan-500 to-blue-600 transition-all duration-1000 delay-300"
                      style={{ width: t.val }}
                    ></div>
                  </div>
                </div>
              ))}
            </div>
            
            <div className="pt-6 border-t border-slate-800/50 flex flex-wrap gap-8">
               <div className="flex flex-col gap-1">
                 <span className="text-[9px] font-mono text-slate-600 uppercase">Native Language</span>
                 <span className="text-xs font-bold text-white tracking-widest">ESPAÑOL (CO)</span>
               </div>
               <div className="flex flex-col gap-1">
                 <span className="text-[9px] font-mono text-slate-600 uppercase">Proficiency</span>
                 <span className="text-xs font-bold text-white tracking-widest">ENGLISH (C1)</span>
               </div>
            </div>
          </div>

          {/* Timeline Column */}
          <div className="lg:col-span-7">
            <div className="relative p-10 rounded-3xl bg-[#0a0f16]/80 backdrop-blur-xl border border-slate-800 shadow-2xl">
              <div className="absolute -top-10 -right-10 w-40 h-40 bg-purple-500/10 blur-[80px] rounded-full pointer-events-none"></div>
              
              <div className="flex items-center justify-between mb-12 border-b border-slate-800/50 pb-6">
                <h3 className="text-sm font-mono text-slate-500 uppercase tracking-[0.4em]">
                  Track Record // <span className="text-cyan-400">Logros Clave</span>
                </h3>
                <div className="flex gap-2">
                  <div className="w-1.5 h-1.5 rounded-full bg-red-500/50"></div>
                  <div className="w-1.5 h-1.5 rounded-full bg-yellow-500/50"></div>
                  <div className="w-1.5 h-1.5 rounded-full bg-green-500/50"></div>
                </div>
              </div>

              <div className="space-y-12">
                {experiences.map((exp, i) => (
                  <div key={i} className="relative pl-10 group">
                    {/* Vertical Line Connector */}
                    <div className="absolute left-0 top-2 bottom-0 w-[1px] bg-slate-800 group-last:bg-gradient-to-b group-last:from-slate-800 group-last:to-transparent"></div>
                    {/* Glowing Dot */}
                    <div className="absolute left-[-4px] top-2 w-2 h-2 rounded-full bg-slate-700 border border-slate-900 group-hover:bg-cyan-400 group-hover:scale-150 transition-all duration-300 shadow-[0_0_10px_rgba(6,182,212,0)] group-hover:shadow-[0_0_15px_rgba(6,182,212,0.5)]"></div>
                    
                    <div className="space-y-3">
                      <div className="flex items-center gap-4">
                        <span className="text-xs font-mono text-cyan-500 bg-cyan-500/5 px-2 py-1 rounded border border-cyan-500/20">{exp.period}</span>
                        <span className="text-xs font-mono text-slate-600 uppercase tracking-widest">{exp.company}</span>
                      </div>
                      <h4 className="text-2xl font-bold text-white group-hover:text-cyan-400 transition-colors">{exp.role}</h4>
                      <p className="text-slate-400 font-light max-w-md">{exp.desc}</p>
                      <div className="flex flex-wrap gap-2 pt-2">
                        {exp.tags.map((tag, j) => (
                          <span key={j} className="text-[9px] font-mono text-slate-500">#{tag}</span>
                        ))}
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              <div className="mt-16 p-6 rounded-2xl bg-slate-900/50 border border-dashed border-slate-700 flex flex-col sm:flex-row items-center justify-between gap-6">
                <div className="text-center sm:text-left">
                  <div className="text-xs font-mono text-slate-500 uppercase mb-1">Portafolio Técnico PDF</div>
                  <div className="text-sm font-bold text-white">Descargar Dossier de Ingeniería</div>
                </div>
                <button className="px-6 py-3 bg-white text-black text-[10px] font-black uppercase tracking-widest rounded-lg hover:bg-cyan-400 transition-colors">
                  Get Dossier
                </button>
              </div>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
