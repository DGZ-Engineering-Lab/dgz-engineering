"use client";

export default function TechnicalEcosystem() {
  const stack = [
    { 
      name: "Neon DB", 
      type: "PostGIS Core", 
      color: "text-emerald-400", 
      icon: <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5" /> 
    },
    { 
      name: "Vercel", 
      type: "Frontend Edge", 
      color: "text-white", 
      icon: <path d="M12 2L1 21h22L12 2z" /> 
    },
    { 
      name: "Cloudflare", 
      type: "Secure Uplink", 
      color: "text-[#F38020]", 
      icon: <path d="M17.5 19h-11a3.5 3.5 0 01-3.5-3.5c0-1.2.6-2.3 1.6-3a5.5 5.5 0 0110.4-1.5 4 4 0 012.5 8z" /> 
    },
    { 
      name: "FastAPI", 
      type: "Processing", 
      color: "text-cyan-400", 
      icon: <path d="M13 2L3 14h9l-1 8 10-12h-9l1-8z" /> 
    },
    { 
      name: "Supabase", 
      type: "Auth/Storage", 
      color: "text-emerald-500", 
      icon: <path d="M13.4 2L4 14.6h8.6L10.6 22l9.4-12.6h-8.6L13.4 2z" /> 
    }
  ];

  return (
    <section className="relative w-full py-12 lg:py-16 z-10 bg-[#05070a] overflow-hidden">
      {/* Background Decor */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-blue-500/5 rounded-full blur-[150px]"></div>
      </div>

      <div className="max-w-7xl mx-auto px-6 relative z-10">
        <div className="flex flex-col lg:flex-row gap-12 items-start">
          
          <div className="w-full lg:w-2/5 space-y-8">
             <div className="space-y-4">
               <div className="flex items-center gap-4">
                 <div className="w-12 h-[1px] bg-cyan-500/50"></div>
                 <span className="text-cyan-400 font-mono text-xs tracking-[0.3em] uppercase">Enterprise Ecosystem</span>
               </div>
               <h2 className="text-3xl lg:text-4xl font-black text-white tracking-tighter leading-tight">Infraestructura <br/><span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-blue-500 to-purple-600">Alta Disponibilidad</span></h2>
             </div>
             
             <p className="text-base lg:text-lg text-slate-400 leading-relaxed font-light">
               Nuestra matriz tecnológica está diseñada bajo principios de <span className="text-white">resiliencia extrema</span>. Cada nodo de nuestro ecosistema garantiza la integridad y velocidad de sus datos territoriales.
             </p>

             <div className="grid grid-cols-2 gap-8 pt-8 border-t border-slate-800/50">
               <div>
                 <div className="text-2xl font-black text-white tracking-tighter">99.9%</div>
                 <div className="text-[10px] font-mono text-slate-500 uppercase tracking-widest mt-1">Uptime Garantizado</div>
               </div>
               <div>
                 <div className="text-2xl font-black text-white tracking-tighter">&lt;200ms</div>
                 <div className="text-[10px] font-mono text-slate-500 uppercase tracking-widest mt-1">Latencia Global</div>
               </div>
             </div>
          </div>

          <div className="w-full lg:w-3/5 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
             {stack.map((item, i) => (
               <div key={i} className="group p-5 lg:p-6 rounded-2xl bg-slate-900/20 border border-slate-800/50 hover:border-cyan-500/30 hover:bg-slate-900/40 transition-all duration-500 shadow-xl">
                 <div className={`w-10 h-10 rounded-xl bg-slate-800/50 flex items-center justify-center mb-4 group-hover:scale-110 group-hover:bg-slate-800 transition-all ${item.color}`}>
                   <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.5">
                     {item.icon}
                   </svg>
                 </div>
                 <div className={`text-xl font-bold mb-1 tracking-tight ${item.color}`}>{item.name}</div>
                 <div className="text-[10px] font-mono text-slate-500 uppercase tracking-widest mb-4">{item.type}</div>
                 <div className="flex gap-1">
                   <div className="w-1.5 h-1.5 rounded-full bg-cyan-500/50"></div>
                   <div className="w-1.5 h-1.5 rounded-full bg-cyan-500/30"></div>
                   <div className="w-1.5 h-1.5 rounded-full bg-cyan-500/10"></div>
                 </div>
               </div>
             ))}
             
             {/* Decorative Slot */}
             <div className="hidden lg:flex p-8 rounded-3xl border border-dashed border-slate-800 items-center justify-center text-center group overflow-hidden relative">
                <div className="absolute inset-0 bg-cyan-500/5 opacity-0 group-hover:opacity-100 transition-opacity"></div>
                <div className="space-y-2 relative z-10">
                  <div className="text-[9px] font-mono text-slate-600 uppercase tracking-widest">Scalable Nodes</div>
                  <div className="text-xs font-bold text-slate-500 uppercase">Ready for Expansion</div>
                </div>
             </div>
          </div>

        </div>
      </div>
    </section>
  );
}
