export default function AboutSection() {
  return (
    <section id="about" className="relative w-full py-24 z-10 overflow-hidden">
      {/* Glow background effect */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-3/4 h-3/4 bg-cyan-500/5 blur-[120px] rounded-full pointer-events-none"></div>

      <div className="max-w-6xl mx-auto px-6 relative">
        <div className="flex items-center gap-4 mb-12">
          <div className="w-12 h-[1px] bg-gradient-to-r from-transparent to-cyan-500"></div>
          <span className="text-cyan-400 font-mono text-sm tracking-widest uppercase">
            Núcleo de Ingeniería
          </span>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          {/* Text Column */}
          <div className="space-y-8">
            <h2 className="text-4xl md:text-5xl font-extrabold text-white tracking-tight leading-tight">
              Excelencia GIS & <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-emerald-400">
                Arquitectura de Software
              </span>
            </h2>
            <p className="text-lg text-slate-400 leading-relaxed font-light">
              Cerramos la brecha entre el mapeo SIG tradicional y la arquitectura
              de software escalable. Enfocados en flujos de datos de alta
              precisión y automatización técnica. Nuestro núcleo transforma datos
              geográficos sin estructura en inteligencia territorial automatizada
              y soberana.
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-6 border-t border-slate-800">
              <div className="flex items-center gap-3">
                <div className="flex items-center justify-center w-10 h-10 rounded-lg bg-emerald-500/10 border border-emerald-500/20">
                  <svg className="w-5 h-5 text-emerald-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10"></path></svg>
                </div>
                <span className="text-sm font-semibold text-slate-200">LADM-COL Autónoma</span>
              </div>
              <div className="flex items-center gap-3">
                <div className="flex items-center justify-center w-10 h-10 rounded-lg bg-cyan-500/10 border border-cyan-500/20">
                  <svg className="w-5 h-5 text-cyan-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 10V3L4 14h7v7l9-11h-7z"></path></svg>
                </div>
                <span className="text-sm font-semibold text-slate-200">Pipeline ETL Desatendido</span>
              </div>
            </div>
          </div>

          {/* Skills Column */}
          <div className="space-y-6 bg-black/40 border border-slate-800 p-8 rounded-2xl backdrop-blur-xl shadow-[0_0_40px_rgba(0,0,0,0.5)]">
            <SkillBar title="Spatial Data Engineering" percentage={95} color="bg-cyan-500" />
            <SkillBar title="Python Automatization (GDAL/PyQGIS)" percentage={90} color="bg-emerald-500" />
            <SkillBar title="PostGIS & Database Architecture" percentage={85} color="bg-purple-500" />
            <SkillBar title="Frontend Web GIS (React/MapLibre)" percentage={80} color="bg-amber-500" />
          </div>
        </div>
      </div>
    </section>
  );
}

function SkillBar({ title, percentage, color }) {
  return (
    <div className="space-y-2">
      <div className="flex justify-between items-center text-sm font-mono">
        <span className="text-slate-300">{title}</span>
        <span className="text-slate-500">{percentage}%</span>
      </div>
      <div className="h-1.5 w-full bg-slate-800 rounded-full overflow-hidden">
        <div 
          className={`h-full ${color} rounded-full transition-all duration-1000 ease-out`}
          style={{ width: `${percentage}%` }}
        />
      </div>
    </div>
  );
}
