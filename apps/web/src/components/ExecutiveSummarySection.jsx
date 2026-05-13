"use client";

export default function ExecutiveSummarySection() {
  const pillars = [
    {
      title: "Automatización",
      subtitle: "Menos trabajo manual",
      desc: "Convertimos tareas repetitivas de mapas en procesos automáticos que ahorran semanas de trabajo.",
      icon: "⚡"
    },
    {
      title: "Precisión",
      subtitle: "Cero errores",
      desc: "Nuestros sistemas encuentran errores que el ojo humano no ve, asegurando que cada dato sea correcto.",
      icon: "🎯"
    },
    {
      title: "Visión",
      subtitle: "Datos que hablan",
      desc: "Transformamos bases de datos complejas en mapas fáciles de leer para tomar mejores decisiones.",
      icon: "👁️"
    }
  ];

  return (
    <section id="summary" className="relative w-full py-24 z-10 bg-[#05070a]">
      <div className="max-w-7xl mx-auto px-6">
        
        <div className="flex flex-col lg:flex-row gap-16 items-center">
          {/* Left: Simplified Message */}
          <div className="w-full lg:w-1/2 space-y-8">
            <div className="inline-flex items-center gap-2 px-3 py-1 bg-blue-500/10 border border-blue-500/30 rounded-full text-blue-400 font-mono text-[10px] tracking-widest uppercase">
              // CONCEPT_MISSION
            </div>
            <h2 className="text-4xl md:text-5xl font-extrabold text-white tracking-tight leading-tight">
              Hacemos que los datos territoriales sean <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-cyan-400">inteligentes y útiles.</span>
            </h2>
            <p className="text-xl text-slate-400 font-light leading-relaxed">
              En DevGiz, no solo hacemos mapas. Construimos el cerebro digital de su territorio, 
              automatizando la gestión de tierras para que sea más rápida, precisa y transparente.
            </p>
            
            <div className="space-y-4 pt-4">
              <div className="flex items-center gap-4 text-slate-300">
                <div className="w-6 h-6 rounded-full bg-emerald-500/20 flex items-center justify-center text-emerald-400 text-xs">✓</div>
                <span>Ideal para Alcaldías, Catastros y Empresas de Ingeniería.</span>
              </div>
              <div className="flex items-center gap-4 text-slate-300">
                <div className="w-6 h-6 rounded-full bg-emerald-500/20 flex items-center justify-center text-emerald-400 text-xs">✓</div>
                <span>No necesita ser un experto para usar nuestras herramientas.</span>
              </div>
            </div>
          </div>

          {/* Right: Icon Grid */}
          <div className="w-full lg:w-1/2 grid grid-cols-1 sm:grid-cols-2 gap-6">
            {pillars.map((p, i) => (
              <div key={i} className={`p-8 rounded-2xl border border-slate-800 bg-[#0a0f16] hover:border-blue-500/30 transition-all group ${i === 2 ? 'sm:col-span-2' : ''}`}>
                <div className="text-4xl mb-4 group-hover:scale-110 transition-transform">{p.icon}</div>
                <h3 className="text-xl font-bold text-white mb-1">{p.title}</h3>
                <div className="text-blue-400 text-xs font-mono mb-4 uppercase tracking-wider">{p.subtitle}</div>
                <p className="text-slate-400 text-sm leading-relaxed">{p.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
