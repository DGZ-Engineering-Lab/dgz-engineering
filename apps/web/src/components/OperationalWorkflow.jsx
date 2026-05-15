"use client";

export default function OperationalWorkflow() {
  const steps = [
    {
      id: "01",
      title: "Identificación de Nudos",
      subtitle: "El Problema",
      desc: "Detectamos procesos manuales lentos, inconsistencias en bases de datos y vacíos legales en estándares IGAC/LADM-COL.",
      color: "from-red-500/20 to-transparent",
      accent: "bg-red-500",
      glow: "shadow-[0_0_20px_rgba(239,68,68,0.2)]"
    },
    {
      id: "02",
      title: "Arquitectura Espacial",
      subtitle: "La Solución",
      desc: "Diseñamos motores de validación automática, bases de datos PostGIS optimizadas y flujos de trabajo sin fricción.",
      color: "from-cyan-500/20 to-transparent",
      accent: "bg-cyan-500",
      glow: "shadow-[0_0_20px_rgba(6,182,212,0.2)]"
    },
    {
      id: "03",
      title: "Despliegue & Valor",
      subtitle: "El Resultado",
      desc: "Entregamos plataformas que cualquier funcionario puede usar, garantizando precisión jurídica y técnica absoluta.",
      color: "from-emerald-500/20 to-transparent",
      accent: "bg-emerald-500",
      glow: "shadow-[0_0_20px_rgba(16,185,129,0.2)]"
    }
  ];

  return (
    <section className="relative w-full py-12 lg:py-16 z-10 bg-[#020406] overflow-hidden">
      {/* Connector Line Background */}
      <div className="absolute top-1/2 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-slate-800 to-transparent hidden lg:block"></div>
      
      <div className="max-w-7xl mx-auto px-6 relative z-10">
        
        <div className="text-center mb-12 space-y-4">
          <div className="text-[10px] font-mono text-slate-500 tracking-[0.5em] uppercase">Pipeline Operativo //_v2.0</div>
          <h2 className="text-3xl md:text-4xl font-black text-white tracking-tighter">De la Complejidad a la <span className="text-cyan-400">Eficiencia</span></h2>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {steps.map((step, i) => (
            <div key={i} className="relative group">
              {/* Connector Dot */}
              <div className={`absolute top-1/2 -left-4 w-8 h-8 rounded-full bg-black border border-slate-800 items-center justify-center hidden lg:flex -translate-y-1/2 z-20 group-first:hidden`}>
                <div className={`w-1 h-1 rounded-full ${step.accent}`}></div>
              </div>

              <div className={`h-full p-8 rounded-3xl border border-slate-800/50 bg-gradient-to-br ${step.color} backdrop-blur-xl relative overflow-hidden transition-all duration-500 hover:border-slate-700 hover:-translate-y-2 hover:shadow-2xl`}>
                <div className="absolute top-0 right-0 p-6 opacity-5 font-mono text-8xl font-black italic">
                  {step.id}
                </div>
                
                <div className="relative z-10 space-y-6">
                  <div className={`w-12 h-1 ${step.accent} ${step.glow} rounded-full`}></div>
                  
                  <div>
                    <div className="text-[10px] font-mono text-slate-500 uppercase tracking-widest mb-2">
                      {step.subtitle}
                    </div>
                    <h3 className="text-xl font-bold text-white tracking-tight">
                      {step.title}
                    </h3>
                  </div>
                  
                  <p className="text-slate-400 text-sm leading-relaxed font-light">
                    {step.desc}
                  </p>

                  <div className="pt-6 flex items-center gap-2">
                    <div className="w-1.5 h-1.5 rounded-full bg-slate-700"></div>
                    <div className="w-8 h-[1px] bg-slate-800"></div>
                    <span className="text-[9px] font-mono text-slate-600 uppercase tracking-widest">Protocolo Activo</span>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Integration Callout */}
        <div className="mt-12 p-8 rounded-3xl border border-slate-800 bg-slate-900/20 backdrop-blur-md flex flex-col lg:flex-row items-center gap-8 group">
           <div className="flex-1 space-y-4">
             <div className="inline-flex items-center gap-2 px-3 py-1 bg-emerald-500/10 rounded-md">
               <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse"></span>
               <span className="text-[10px] font-mono text-emerald-500 uppercase tracking-widest font-bold">Arquitectura Unificada</span>
             </div>
             <h4 className="text-2xl font-bold text-white tracking-tight">Ingeniería que Habla su Idioma.</h4>
             <p className="text-slate-500 text-sm lg:text-base font-light leading-relaxed">Nuestra metodología no es solo técnica; es una respuesta directa a las necesidades operativas de los gestores territoriales que buscan <span className="text-white">resultados sin burocracia</span>.</p>
           </div>
           
           <div className="grid grid-cols-2 gap-4 w-full lg:w-auto">
             <div className="p-6 rounded-2xl bg-black/40 border border-slate-800 flex flex-col items-center justify-center text-center group-hover:border-cyan-500/30 transition-colors">
                <span className="text-xs font-mono text-cyan-500 mb-2">CI/CD</span>
                <span className="text-xs font-bold text-white uppercase tracking-tighter">Pipelines</span>
             </div>
             <div className="p-6 rounded-2xl bg-black/40 border border-slate-800 flex flex-col items-center justify-center text-center group-hover:border-emerald-500/30 transition-colors">
                <span className="text-xs font-mono text-emerald-500 mb-2">LADM</span>
                <span className="text-xs font-bold text-white uppercase tracking-tighter">Ready</span>
             </div>
           </div>
        </div>
      </div>
    </section>
  );
}
