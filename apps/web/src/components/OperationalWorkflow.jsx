"use client";

export default function OperationalWorkflow() {
  const steps = [
    {
      id: "01",
      title: "Identificación de Nudos",
      subtitle: "El Problema",
      desc: "Detectamos procesos manuales lentos, inconsistencias en bases de datos y vacíos legales en estándares IGAC/LADM-COL.",
      color: "from-red-500/20 to-transparent",
      borderColor: "border-red-500/20"
    },
    {
      id: "02",
      title: "Arquitectura Espacial",
      subtitle: "La Solución",
      desc: "Diseñamos motores de validación automática, bases de datos PostGIS optimizadas y flujos de trabajo sin fricción.",
      color: "from-cyan-500/20 to-transparent",
      borderColor: "border-cyan-500/20"
    },
    {
      id: "03",
      title: "Despliegue & Valor",
      subtitle: "El Resultado",
      desc: "Entregamos plataformas que cualquier funcionario puede usar, garantizando precisión jurídica y técnica absoluta.",
      color: "from-emerald-500/20 to-transparent",
      borderColor: "border-emerald-500/20"
    }
  ];

  return (
    <section className="relative w-full py-20 z-10 bg-[#020406]">
      <div className="max-w-7xl mx-auto px-6">
        
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {steps.map((step, i) => (
            <div key={i} className={`p-8 rounded-2xl border ${step.borderColor} bg-gradient-to-br ${step.color} backdrop-blur-sm relative overflow-hidden group hover:scale-[1.02] transition-all`}>
              <div className="text-5xl font-black text-white/5 absolute -right-2 -top-2 font-mono">
                {step.id}
              </div>
              <div className="text-[10px] font-mono text-slate-500 uppercase tracking-widest mb-2">
                {step.subtitle}
              </div>
              <h3 className="text-2xl font-bold text-white mb-4">
                {step.title}
              </h3>
              <p className="text-slate-400 text-sm leading-relaxed">
                {step.desc}
              </p>
            </div>
          ))}
        </div>

        {/* Integration Callout */}
        <div className="mt-12 p-6 rounded-2xl border border-slate-800 bg-[#0a0f16] flex flex-col md:flex-row items-center gap-8">
           <div className="flex-1">
             <h4 className="text-white font-bold mb-2">Ingeniería que habla su idioma.</h4>
             <p className="text-slate-500 text-sm">Nuestra arquitectura no es solo técnica; es una respuesta directa a las necesidades operativas de los gestores territoriales modernos.</p>
           </div>
           <div className="flex gap-4">
             <div className="px-4 py-2 bg-slate-800 rounded text-[10px] font-mono text-slate-400">CI/CD PIPELINES</div>
             <div className="px-4 py-2 bg-slate-800 rounded text-[10px] font-mono text-slate-400">LADM_READY</div>
           </div>
        </div>
      </div>
    </section>
  );
}
