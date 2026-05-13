export default function ArchitectureSection() {
  const nodes = [
    {
      icon: (
        <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M8.111 16.404a5.5 5.5 0 017.778 0M12 20h.01m-7.08-7.071c3.904-3.905 10.236-3.905 14.141 0M1.394 9.393c5.857-5.858 15.355-5.858 21.213 0" /></svg>
      ),
      title: "Recolección Inteligente",
      desc: "Capturamos datos precisos en el mundo real usando drones y tecnología satelital de punta.",
      accent: "cyan"
    },
    {
      icon: (
        <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M8 9l3 3-3 3m5 0h3M5 20h14a2 2 0 002-2V6a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" /></svg>
      ),
      title: "Cerebro de Validación",
      desc: "Nuestros algoritmos revisan automáticamente que cada dato cumpla con las leyes y normas vigentes.",
      accent: "amber"
    },
    {
      icon: (
        <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4 7v10c0 2.21 3.582 4 8 4s8-1.79 8-4V7M4 7c0 2.21 3.582 4 8 4s8-1.79 8-4M4 7c0-2.21 3.582-4 8-4s8 1.79 8 4m0 5c0 2.21-3.582 4-8 4s-8-1.79-8-4" /></svg>
      ),
      title: "Base de Datos Segura",
      desc: "Guardamos la información en bóvedas digitales seguras, listas para ser consultadas en cualquier momento.",
      accent: "cyan"
    },
    {
      icon: (
        <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M13 10V3L4 14h7v7l9-11h-7z" /></svg>
      ),
      title: "Entrega de Resultados",
      desc: "Convertimos todo el proceso en mapas interactivos y reportes fáciles de entender para su equipo.",
      accent: "cyan"
    }
  ];

  const accentMap = {
    cyan: { border: "border-cyan-500/30", bg: "bg-cyan-500/10", text: "text-cyan-400", hoverBorder: "hover:border-cyan-500/60" },
    amber: { border: "border-[#f3ca20]/30", bg: "bg-[#f3ca20]/10", text: "text-[#f3ca20]", hoverBorder: "hover:border-[#f3ca20]/60" }
  };

  return (
    <section id="architecture" className="relative w-full py-24 z-10 bg-[#05070a]">
      <div className="max-w-6xl mx-auto px-6">
        
        {/* Header */}
        <div className="flex flex-col items-center text-center mb-16">
          <div className="flex items-center gap-4 mb-6">
            <div className="w-8 h-[1px] bg-gradient-to-r from-transparent to-blue-500"></div>
            <span className="text-blue-400 font-mono text-sm tracking-widest uppercase">
              Arquitectura de Sistemas
            </span>
            <div className="w-8 h-[1px] bg-gradient-to-l from-transparent to-blue-500"></div>
          </div>
          <h2 className="text-4xl md:text-5xl font-extrabold text-white tracking-tight mb-6">
            Ecosistema <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-blue-500">Territorial</span>
          </h2>
          <p className="text-slate-400 max-w-2xl leading-relaxed">
            Arquitectura integral para la gestión de datos espaciales a gran escala, desde la captura masiva en campo hasta la analítica avanzada en la nube.
          </p>
        </div>

        {/* Architecture Flow */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {nodes.map((node, i) => {
            const a = accentMap[node.accent];
            return (
              <div key={i} className="relative group">
                {/* Connector line (hidden on last) */}
                {i < nodes.length - 1 && (
                  <div className="hidden lg:block absolute top-1/2 -right-3 w-6 h-px bg-slate-700 z-0"></div>
                )}
                <div className={`relative z-10 flex flex-col items-center text-center p-8 rounded-2xl bg-[#0a0f16] border ${a.border} ${a.hoverBorder} transition-all duration-300`}>
                  
                  {/* Step number */}
                  <div className="absolute -top-3 left-6 px-2 py-0.5 bg-[#05070a] text-slate-600 font-mono text-[10px] tracking-widest">
                    STEP_{String(i + 1).padStart(2, "0")}
                  </div>

                  <div className={`p-4 rounded-xl ${a.bg} ${a.text} mb-6 group-hover:scale-110 transition-transform`}>
                    {node.icon}
                  </div>
                  <h3 className="text-lg font-bold text-white mb-3">{node.title}</h3>
                  <p className="text-sm text-slate-400 leading-relaxed">{node.desc}</p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
