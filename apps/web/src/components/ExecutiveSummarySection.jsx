"use client";

export default function ExecutiveSummarySection() {
  const pillars = [
    {
      title: "Automatización",
      subtitle: "Efficiency Uplink",
      desc: "Convertimos tareas repetitivas de fotogrametría y cartografía en procesos autónomos de alta velocidad.",
      icon: (
        <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M13 10V3L4 14h7v7l9-11h-7z" />
        </svg>
      )
    },
    {
      title: "Precisión",
      subtitle: "Geometric Integrity",
      desc: "Motores de validación que garantizan la consistencia topológica y alfanumérica de cada predio.",
      icon: (
        <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
        </svg>
      )
    },
    {
      title: "Visión",
      subtitle: "Territorial BI",
      desc: "Analítica geoespacial para transformar datos crudos en inteligencia operativa para tomadores de decisiones.",
      icon: (
        <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
        </svg>
      )
    }
  ];

  return (
    <section id="summary" className="relative w-full py-32 z-10 bg-[#05070a] overflow-hidden">
      {/* Subtle Grid Pattern Overlay */}
      <div className="absolute inset-0 opacity-[0.03] pointer-events-none bg-[url('https://www.transparenttextures.com/patterns/carbon-fibre.png')]"></div>
      
      <div className="max-w-7xl mx-auto px-6 relative z-10">
        
        <div className="flex flex-col lg:flex-row gap-24 items-start">
          {/* Left: Message */}
          <div className="w-full lg:w-1/2 space-y-10">
            <div className="inline-flex items-center gap-3 px-4 py-1.5 bg-cyan-500/10 border border-cyan-500/20 rounded-full text-cyan-400 font-mono text-[10px] tracking-[0.3em] uppercase font-bold">
              //_ESTRATEGIA_Y_MISIÓN
            </div>
            
            <div className="space-y-6">
              <h2 className="text-5xl md:text-6xl font-black text-white tracking-tighter leading-[1.1]">
                Inteligencia Territorial para la <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-blue-600">Era Digital.</span>
              </h2>
              <p className="text-2xl text-slate-400 font-light leading-relaxed">
                En DevGiz, transformamos el caos de datos geográficos en <span className="text-white">activos estratégicos</span>. Diseñamos el cerebro digital de su territorio para una gestión ágil, precisa y 100% auditable.
              </p>
            </div>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-8 pt-6 border-t border-slate-800/50">
              <div className="flex items-start gap-4">
                <div className="mt-1 w-6 h-6 rounded-lg bg-emerald-500/20 flex items-center justify-center text-emerald-400 text-[10px] border border-emerald-500/20">✓</div>
                <div>
                   <div className="text-white font-bold text-sm mb-1 tracking-tight">Compliance LADM-COL</div>
                   <div className="text-slate-500 text-xs">Alineación total con estándares IGAC.</div>
                </div>
              </div>
              <div className="flex items-start gap-4">
                <div className="mt-1 w-6 h-6 rounded-lg bg-emerald-500/20 flex items-center justify-center text-emerald-400 text-[10px] border border-emerald-500/20">✓</div>
                <div>
                   <div className="text-white font-bold text-sm mb-1 tracking-tight">Escalabilidad Cloud</div>
                   <div className="text-slate-500 text-xs">Infraestructura lista para el futuro.</div>
                </div>
              </div>
            </div>
          </div>

          {/* Right: Feature Matrix */}
          <div className="w-full lg:w-1/2 flex flex-col gap-6">
            {pillars.map((p, i) => (
              <div key={i} className="group relative p-10 rounded-[2rem] bg-slate-900/10 border border-slate-800/50 hover:border-cyan-500/30 transition-all duration-500 hover:bg-slate-900/30 flex gap-8 items-center">
                <div className="w-16 h-16 rounded-2xl bg-slate-800/50 flex items-center justify-center text-cyan-400 group-hover:scale-110 group-hover:bg-cyan-500 group-hover:text-black transition-all duration-500 shadow-xl border border-slate-700/50">
                  {p.icon}
                </div>
                <div className="flex-1 space-y-2">
                  <div className="flex items-center justify-between">
                    <h3 className="text-2xl font-bold text-white tracking-tight group-hover:text-cyan-400 transition-colors">{p.title}</h3>
                    <span className="text-[9px] font-mono text-slate-600 uppercase tracking-widest">{p.subtitle}</span>
                  </div>
                  <p className="text-slate-400 text-base leading-relaxed font-light">{p.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
