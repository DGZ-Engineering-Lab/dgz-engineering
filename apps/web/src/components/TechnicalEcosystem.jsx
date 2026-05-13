"use client";

export default function TechnicalEcosystem() {
  const stack = [
    { name: "Neon DB", type: "PostGIS Core", color: "text-emerald-400" },
    { name: "Vercel", type: "Frontend Edge", color: "text-white" },
    { name: "Cloudflare", type: "Secure Uplink", color: "text-[#F38020]" },
    { name: "FastAPI", type: "Processing", color: "text-cyan-400" },
    { name: "Supabase", type: "Auth/Storage", color: "text-emerald-500" }
  ];

  return (
    <section className="relative w-full py-20 z-10 bg-[#05070a]">
      <div className="max-w-7xl mx-auto px-6">
        <div className="flex flex-col lg:flex-row gap-16 items-center">
          
          <div className="w-full lg:w-1/3">
             <div className="flex items-center gap-4 mb-6">
               <div className="w-8 h-[1px] bg-cyan-500"></div>
               <span className="text-cyan-400 font-mono text-sm uppercase">Cloud Ops</span>
             </div>
             <h2 className="text-4xl font-extrabold text-white mb-6">Ecosistema <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-blue-500">Resiliente</span></h2>
             <p className="text-slate-400 leading-relaxed font-light">
               Utilizamos una matriz de tecnologías nativas de la nube para garantizar que sus datos estén siempre disponibles, seguros y procesados al instante.
             </p>
          </div>

          <div className="w-full lg:w-2/3 grid grid-cols-2 md:grid-cols-3 gap-4">
             {stack.map((item, i) => (
               <div key={i} className="p-6 rounded-2xl bg-slate-900/50 border border-slate-800 hover:border-cyan-500/30 transition-all group">
                 <div className={`text-xl font-bold mb-1 ${item.color}`}>{item.name}</div>
                 <div className="text-[10px] font-mono text-slate-500 uppercase tracking-widest">{item.type}</div>
               </div>
             ))}
             <div className="p-6 rounded-2xl bg-cyan-500/10 border border-cyan-500/20 flex items-center justify-center text-center">
                <div className="text-xs font-mono text-cyan-400">99.9% UPTIME GUARANTEE</div>
             </div>
          </div>

        </div>
      </div>
    </section>
  );
}
