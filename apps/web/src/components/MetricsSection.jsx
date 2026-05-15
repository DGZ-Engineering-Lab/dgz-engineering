export default function MetricsSection() {
  const metrics = [
    {
      val: "50",
      symbol: "k+",
      label: "Registros Espaciales Procesados",
      sub: "Predios // Cartografía // Catastro",
      color: "from-emerald-400 to-emerald-600",
      glow: "shadow-[0_0_30px_rgba(16,185,129,0.2)]"
    },
    {
      val: "-30",
      symbol: "%",
      label: "Reducción del Margen de Error",
      sub: "QA/QC // Automatización // Validación",
      color: "from-cyan-400 to-blue-600",
      glow: "shadow-[0_0_30px_rgba(6,182,212,0.2)]"
    },
    {
      val: "115",
      symbol: "%",
      label: "Eficiencia Operativa",
      sub: "ROI // Automatización de Workflow",
      color: "from-amber-400 to-orange-600",
      glow: "shadow-[0_0_30px_rgba(245,158,11,0.2)]"
    },
    {
      val: "6",
      symbol: "+",
      label: "Proyectos de Catastro Multipropósito",
      sub: "LADM-COL // Estándares IGAC",
      color: "from-purple-400 to-pink-600",
      glow: "shadow-[0_0_30px_rgba(168,85,247,0.2)]"
    }
  ];

  return (
    <section id="metrics" className="relative w-full py-24 z-10 bg-black/30 border-y border-slate-800/50">
      {/* Background Grid Pattern */}
      <div className="absolute inset-0 bg-[url('/grid.svg')] bg-center [mask-image:linear-gradient(180deg,white,rgba(255,255,255,0))] opacity-5"></div>

      <div className="max-w-7xl mx-auto px-6 relative">
        <div className="flex flex-col items-center text-center mb-16">
          <div className="flex items-center gap-4 mb-4">
            <span className="text-emerald-400 font-mono text-sm tracking-widest uppercase flex items-center gap-2">
              <span className="w-2 h-2 bg-emerald-400 rounded-full animate-pulse"></span>
              Rendimiento Comprobado
            </span>
          </div>
          <h2 className="text-4xl md:text-5xl font-extrabold text-white tracking-tight">
            Métricas de Impacto
          </h2>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {metrics.map((m, idx) => (
            <div 
              key={idx}
              className={`relative flex flex-col p-8 rounded-2xl bg-[#0a0f16] border border-slate-800 hover:border-slate-600 transition-all duration-300 ${m.glow} group`}
            >
              <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:opacity-20 transition-opacity">
                <svg className="w-12 h-12 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1" d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
                </svg>
              </div>

              <div className="flex items-baseline gap-1 mb-4">
                <span className={`text-5xl font-extrabold text-transparent bg-clip-text bg-gradient-to-br ${m.color}`}>
                  {m.val}
                </span>
                <span className={`text-2xl font-bold text-transparent bg-clip-text bg-gradient-to-br ${m.color}`}>
                  {m.symbol}
                </span>
              </div>

              <h4 className="text-white font-semibold text-lg leading-tight mb-2">
                {m.label}
              </h4>
              
              <div className="mt-auto pt-4 border-t border-slate-800/50">
                <span className="text-xs font-mono text-slate-500 uppercase tracking-wider">
                  {m.sub}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
