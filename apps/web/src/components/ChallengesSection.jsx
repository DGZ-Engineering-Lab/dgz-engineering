"use client";

export default function ChallengesSection() {
  const challenges = [
    {
      num: "01",
      problem: "Obsolescencia en Procesos Manuales",
      impact: "Tiempos de respuesta superiores a 6 meses.",
      solution: "Motores de automatización GIS de alto rendimiento."
    },
    {
      num: "02",
      problem: "Inconsistencia en Datos Territoriales",
      impact: "Riesgos jurídicos por traslapes y errores de área.",
      solution: "Validación masiva bajo estándares LADM-COL V3."
    },
    {
      num: "03",
      problem: "Fragmentación de Información",
      impact: "Bases de datos aisladas e incomunicadas.",
      solution: "Arquitectura centralizada Cloud-Native (PostGIS)."
    },
    {
      num: "04",
      problem: "Baja Capacidad de Análisis",
      impact: "Toma de decisiones basada en datos desactualizados.",
      solution: "Inteligencia Geográfica con Dashboards en Tiempo Real."
    },
    {
      num: "05",
      problem: "Costos Operativos Elevados",
      impact: "Desperdicio de recursos en tareas repetitivas.",
      solution: "Implementación de pipelines de datos sin fricción."
    }
  ];

  return (
    <section id="challenges" className="relative w-full py-32 z-10 bg-[#020406] overflow-hidden border-t border-slate-900">
      {/* Background Radar Effect */}
      <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-red-500/5 rounded-full blur-[120px] -translate-y-1/2 translate-x-1/3"></div>
      
      <div className="max-w-7xl mx-auto px-6 relative z-10">
        
        <div className="flex flex-col lg:flex-row gap-16 mb-24 items-end">
          <div className="flex-1 space-y-6 text-left">
            <div className="flex items-center gap-4">
              <div className="w-12 h-[1px] bg-red-500/50"></div>
              <span className="text-red-500 font-mono text-xs tracking-[0.3em] uppercase">Status Analysis</span>
            </div>
            <h2 className="text-5xl md:text-6xl font-black text-white tracking-tighter leading-tight">
              Transformando Desafíos en <span className="text-transparent bg-clip-text bg-gradient-to-r from-red-500 to-orange-600">Activos Digitales</span>
            </h2>
          </div>
          <p className="flex-1 text-xl text-slate-500 font-light leading-relaxed">
            Las entidades territoriales operan sobre infraestructuras de datos críticas. Identificamos los nudos operativos y los resolvemos mediante <span className="text-white">ingeniería de precisión</span>.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {challenges.map((c) => (
            <div
              key={c.num}
              className="group relative p-10 rounded-[2.5rem] bg-slate-900/10 border border-slate-800/50 hover:border-red-500/30 transition-all duration-500 hover:shadow-2xl hover:bg-slate-900/30 overflow-hidden"
            >
              <div className="relative z-10 space-y-8">
                <div className="flex items-center justify-between">
                  <span className="text-[10px] font-mono text-red-500/50 uppercase tracking-[0.4em]">Protocol_{c.num}</span>
                  <div className="w-2 h-2 rounded-full bg-red-500 shadow-[0_0_10px_rgba(239,68,68,0.5)]"></div>
                </div>
                
                <div className="space-y-3">
                  <h4 className="text-xl font-bold text-white tracking-tight">{c.problem}</h4>
                  <p className="text-xs font-mono text-red-400/80 uppercase tracking-widest">{c.impact}</p>
                </div>

                <div className="h-px bg-slate-800/50 w-full"></div>
                
                <div className="flex items-start gap-4 group/sol">
                  <div className="mt-1 w-5 h-5 rounded-full border border-emerald-500/30 flex items-center justify-center flex-shrink-0 group-hover/sol:bg-emerald-500/10 transition-colors">
                    <svg className="w-3 h-3 text-emerald-500" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" /></svg>
                  </div>
                  <p className="text-slate-300 text-sm leading-relaxed group-hover:text-emerald-400 transition-colors">
                    <span className="block text-[10px] font-mono text-slate-600 uppercase mb-1">Implementación:</span>
                    {c.solution}
                  </p>
                </div>
              </div>
            </div>
          ))}

          {/* Call to Action Slot */}
          <div className="lg:col-span-1 p-10 rounded-[2.5rem] bg-gradient-to-br from-red-600/10 to-transparent border border-red-500/20 flex flex-col justify-between group hover:border-red-500/40 transition-all">
            <div className="space-y-4">
               <h3 className="text-2xl font-bold text-white tracking-tighter">¿Su entidad presenta estos nudos?</h3>
               <p className="text-slate-500 text-sm font-light">Realizamos diagnósticos técnicos profundos para modernizar su infraestructura SIG.</p>
            </div>
            <button className="mt-8 px-6 py-3 rounded-xl bg-red-600 text-white text-xs font-bold uppercase tracking-widest hover:bg-red-500 transition-colors self-start shadow-xl shadow-red-900/20">
              Solicitar Auditoría
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
