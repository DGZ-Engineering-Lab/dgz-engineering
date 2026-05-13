export default function ChallengesSection() {
  const challenges = [
    {
      num: "01",
      problem: "QA manual lento y propenso a errores",
      solution: "Validación automática con Python + PostGIS"
    },
    {
      num: "02",
      problem: "Datos prediales inconsistentes",
      solution: "Modelado espacial LADM-COL estructurado"
    },
    {
      num: "03",
      problem: "Procesos de digitalización lentos",
      solution: "Pipelines SIG automatizados con GDAL/FME"
    },
    {
      num: "04",
      problem: "Topología catastral rota",
      solution: "Motores de validación topológica automatizados"
    },
    {
      num: "05",
      problem: "Sin visibilidad sobre cambios de cobertura",
      solution: "GeoAI: detección cambios con Sentinel + Rasterio"
    }
  ];

  return (
    <section id="challenges" className="relative w-full py-24 z-10 bg-gradient-to-b from-[#020406] to-[#05070a]">
      <div className="max-w-6xl mx-auto px-6">
        
        {/* Header */}
        <div className="flex flex-col items-center text-center mb-16">
          <div className="flex items-center gap-4 mb-6">
            <div className="w-8 h-[1px] bg-gradient-to-r from-transparent to-red-500"></div>
            <span className="text-red-400 font-mono text-sm tracking-widest uppercase">
              Desafíos Territoriales
            </span>
            <div className="w-8 h-[1px] bg-gradient-to-l from-transparent to-red-500"></div>
          </div>
          <h2 className="text-4xl md:text-5xl font-extrabold text-white tracking-tight max-w-3xl leading-tight mb-6">
            Lo que <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-400 to-orange-500">resuelvo</span> para su entidad
          </h2>
          <p className="text-slate-400 max-w-2xl leading-relaxed">
            Los gobiernos y entidades territoriales enfrentan desafíos críticos de datos espaciales. Estos son los problemas que transformo en soluciones automatizadas.
          </p>
        </div>

        {/* Challenge Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {challenges.map((c) => (
            <div
              key={c.num}
              className="group relative p-8 rounded-2xl bg-[#0a0f16] border border-slate-800 hover:border-red-500/40 transition-all duration-300 overflow-hidden"
            >
              {/* Glow backdrop */}
              <div className="absolute inset-0 bg-gradient-to-br from-red-500/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none"></div>
              
              <div className="relative z-10">
                <div className="flex items-center gap-3 mb-6">
                  <span className="text-red-500 font-mono text-2xl font-black opacity-50">{c.num}</span>
                  <svg className="w-5 h-5 text-red-400" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" /></svg>
                </div>
                
                <h4 className="text-white font-bold text-lg mb-6 leading-snug">{c.problem}</h4>
                
                <div className="w-full h-px bg-gradient-to-r from-slate-800 to-transparent mb-6"></div>
                
                <div className="flex items-start gap-3">
                  <svg className="w-5 h-5 text-emerald-400 mt-0.5 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" /></svg>
                  <p className="text-emerald-400 text-sm font-semibold leading-relaxed">{c.solution}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
