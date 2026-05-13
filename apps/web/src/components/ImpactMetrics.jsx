"use client";

export default function ImpactMetrics() {
  const metrics = [
    { val: "50k+", label: "Registros Procesados", sub: "Predios // Catastro" },
    { val: "-30%", label: "Margen de Error", sub: "QA/QC Automático" },
    { val: "115%", label: "Eficiencia Operativa", sub: "ROI Workflow" }
  ];

  const entities = ["IGAC", "LADM-COL", "ANT", "SNR"];

  return (
    <section className="relative w-full py-16 z-10 bg-black/50 border-t border-slate-800/50">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-12 items-center">
          
          <div className="lg:col-span-1 space-y-4">
             <div className="text-[10px] font-mono text-emerald-400 uppercase tracking-widest flex items-center gap-2">
               <span className="w-1.5 h-1.5 bg-emerald-400 rounded-full"></span> IMPACTO REAL
             </div>
             <h2 className="text-3xl font-bold text-white">Resultados <br/>Tangibles</h2>
          </div>

          <div className="lg:col-span-3 grid grid-cols-1 md:grid-cols-3 gap-6">
             {metrics.map((m, i) => (
               <div key={i} className="p-6 rounded-2xl bg-slate-900/40 border border-slate-800/50">
                 <div className="text-3xl font-black text-white mb-1">{m.val}</div>
                 <div className="text-sm font-bold text-slate-300 mb-2">{m.label}</div>
                 <div className="text-[10px] font-mono text-slate-500 uppercase">{m.sub}</div>
               </div>
             ))}
          </div>

        </div>

        {/* Entities bar - very compact */}
        <div className="mt-12 pt-8 border-t border-slate-800/30 flex flex-wrap justify-center gap-12 opacity-40 grayscale">
           {entities.map((ent, i) => (
             <span key={i} className="text-xl font-black text-white font-mono tracking-tighter">{ent}</span>
           ))}
        </div>
      </div>
    </section>
  );
}
