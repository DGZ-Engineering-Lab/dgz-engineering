import Link from "next/link";

export default function NotFound() {
  return (
    <div className="min-h-screen bg-[#05070a] flex items-center justify-center p-6 font-mono selection:bg-red-500 selection:text-white">
      {/* Glitch Background */}
      <div className="absolute inset-0 opacity-20 pointer-events-none">
        <div className="absolute top-0 left-0 w-full h-full" style={{ 
          backgroundImage: 'radial-gradient(rgba(239, 68, 68, 0.2) 1px, transparent 1px)', 
          backgroundSize: '24px 24px' 
        }}></div>
      </div>

      <div className="max-w-2xl w-full space-y-12 relative z-10">
        {/* Header */}
        <div className="space-y-4">
          <div className="flex items-center gap-4">
            <div className="w-3 h-3 rounded-full bg-red-500 animate-pulse shadow-[0_0_10px_#ef4444]"></div>
            <span className="text-red-500 font-black text-xs tracking-[0.4em] uppercase">SYSTEM_CRITICAL_FAILURE</span>
          </div>
          <h1 className="text-8xl md:text-9xl font-black text-white tracking-tighter leading-none">
            40<span className="text-red-500">4</span>
          </h1>
        </div>

        {/* Panic Description */}
        <div className="bg-red-500/5 border border-red-500/20 p-8 rounded-3xl space-y-6 backdrop-blur-xl">
          <div className="space-y-2">
            <div className="text-[10px] text-red-400 font-bold uppercase tracking-widest">Error_Log: NODE_NOT_FOUND</div>
            <p className="text-slate-400 text-sm leading-relaxed">
              El nodo geoespacial solicitado no responde. La ruta ha sido corrompida o el sector territorial ya no existe en el kernel central de DevGiz.
            </p>
          </div>

          <div className="grid grid-cols-2 gap-4 pt-4 border-t border-red-500/10">
            <div>
              <div className="text-[8px] text-slate-500 uppercase mb-1">Error_ID</div>
              <div className="text-xs text-white">0xDEADBEEF_404</div>
            </div>
            <div>
              <div className="text-[8px] text-slate-500 uppercase mb-1">Process_State</div>
              <div className="text-xs text-red-500 font-bold animate-pulse">PANIC_HALT</div>
            </div>
          </div>
        </div>

        {/* Actions */}
        <div className="flex flex-col md:flex-row items-center gap-6">
          <Link 
            href="/"
            className="w-full md:w-auto px-10 py-5 bg-white text-black font-black text-[10px] rounded-2xl hover:bg-red-500 transition-all uppercase tracking-widest text-center"
          >
            Reiniciar Kernel (Home)
          </Link>
          <button 
            onClick={() => window.history.back()}
            className="w-full md:w-auto px-10 py-5 bg-transparent border border-white/10 text-white font-black text-[10px] rounded-2xl hover:bg-white/5 transition-all uppercase tracking-widest"
          >
            Volver a Zona Segura
          </button>
        </div>

        {/* Footer Trace */}
        <div className="pt-12 text-[8px] text-slate-700 uppercase tracking-[0.5em] text-center">
          DevGiz Systems // Spatial Intelligence // Bogota_DC_V
        </div>
      </div>

      {/* Decorative Glitch Lines */}
      <div className="absolute top-[20%] left-0 w-full h-[1px] bg-red-500/10 animate-[glitch_4s_infinite]"></div>
      <div className="absolute bottom-[30%] left-0 w-full h-[1px] bg-red-500/10 animate-[glitch_7s_infinite]"></div>
    </div>
  );
}
