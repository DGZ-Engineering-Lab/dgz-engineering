"use client";

export default function TrustSection() {
  const entities = [
    { name: "IGAC", label: "Estándar Nacional", color: "from-blue-500/20 to-transparent" },
    { name: "LADM-COL", label: "Protocolo ISO", color: "from-cyan-500/20 to-transparent" },
    { name: "ANT", label: "Gestión Tierras", color: "from-emerald-500/20 to-transparent" },
    { name: "SNR", label: "Registro Jurídico", color: "from-purple-500/20 to-transparent" }
  ];

  return (
    <section className="py-12 border-y border-slate-800/50 bg-black/40 relative overflow-hidden">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(0,229,255,0.05),transparent)] pointer-events-none"></div>
      
      <div className="max-w-6xl mx-auto px-6 relative flex flex-wrap justify-center items-center gap-12 md:gap-24 opacity-60 grayscale hover:grayscale-0 transition-all duration-500">
        <div className="w-full text-center mb-4">
          <span className="text-[10px] font-mono text-slate-500 tracking-[0.3em] uppercase">Sistemas compatibles con estándares de:</span>
        </div>
        
        {entities.map((ent, i) => (
          <div key={i} className="flex flex-col items-center group cursor-default">
            <div className={`text-2xl font-black tracking-tighter text-white mb-1 group-hover:text-cyan-400 transition-colors`}>
              {ent.name}
            </div>
            <div className="text-[9px] font-mono text-slate-500 uppercase tracking-widest">
              {ent.label}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
