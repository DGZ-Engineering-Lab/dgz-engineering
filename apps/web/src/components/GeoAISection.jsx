"use client";

export default function GeoAISection() {
  return (
    <section id="geoai" className="relative w-full py-24 z-10 bg-gradient-to-b from-[#05070a] to-[#020406] overflow-hidden">

      {/* Background Decor */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="w-[800px] h-[800px] bg-emerald-500/5 rounded-full blur-[120px] absolute -top-1/4 -right-1/4"></div>
        <div className="w-full h-px bg-gradient-to-r from-transparent via-emerald-500/20 to-transparent absolute top-0"></div>
      </div>

      <div className="max-w-7xl mx-auto px-6 relative z-10">

        {/* Header */}
        <div className="flex flex-col items-start mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1 mb-6 border border-emerald-500/30 bg-emerald-500/10 rounded-full text-emerald-400 font-mono text-xs tracking-widest uppercase">
            <span className="w-2 h-2 bg-emerald-400 rounded-full animate-pulse"></span>
            // GEOAI_MODULE
          </div>
          <h2 className="text-4xl md:text-5xl font-extrabold text-white tracking-tight">
            Soberanía de Datos con GeoAI
          </h2>
        </div>

        <div className="flex flex-col lg:flex-row gap-12">

          {/* Left Column: Text & Steps */}
          <div className="w-full lg:w-1/2 space-y-10">
            <div>
              <h3 className="text-2xl font-bold text-emerald-300 mb-4">
                Detección de Construcciones <br /> No Autorizadas
              </h3>
              <p className="text-slate-400 leading-relaxed">
                Implementamos algoritmos de visión artificial sobre imagenería Sentinel-2 para el monitoreo dinámico del territorio, permitiendo identificar crecimientos urbanos informales y optimizar el recaudo fiscal.
              </p>
            </div>

            {/* Steps */}
            <div className="space-y-6">
              {[
                { num: "01", title: "Adquisición Multiespectral", desc: "Monitoreo constante vía constelación Sentinel // resolución 10m" },
                { num: "02", title: "Análisis de Cobertura Vegetal (NDVI)", desc: "Identificación de remoción de capa vegetal para nuevas obras" },
                { num: "03", title: "Segmentación con Machine Learning", desc: "Clasificación automática de cambios en el tejido urbano" },
                { num: "04", title: "Alerta de Impacto Catastral", desc: "Notificación automática a sistemas de planeación y hacienda" }
              ].map((step, i) => (
                <div key={i} className="flex gap-6 group">
                  <div className="flex flex-col items-center">
                    <div className="w-10 h-10 rounded-full bg-[#0a0f16] border border-emerald-500/30 flex items-center justify-center text-emerald-400 font-mono text-sm group-hover:bg-emerald-500/20 group-hover:border-emerald-500 transition-colors">
                      {step.num}
                    </div>
                    {i < 3 && <div className="w-px h-16 bg-slate-800 my-2 group-hover:bg-emerald-500/30 transition-colors"></div>}
                  </div>
                  <div className="pt-2">
                    <h4 className="text-white font-bold text-lg mb-1">{step.title}</h4>
                    <p className="text-slate-500 text-sm font-mono">{step.desc}</p>
                  </div>
                </div>
              ))}
            </div>

            {/* Tech Stack Pills */}
            <div className="flex flex-wrap gap-3 pt-6 border-t border-slate-800">
              {['Rasterio', 'GeoPandas', 'NumPy', 'Scikit-learn', 'Sentinel-2', 'Shapely'].map(tech => (
                <span key={tech} className="px-3 py-1.5 bg-[#0a0f16] border border-slate-700 text-slate-300 rounded text-sm font-mono hover:border-emerald-500 hover:text-emerald-400 cursor-default transition-colors">
                  {tech}
                </span>
              ))}
            </div>
          </div>

          {/* Right Column: Interactive Visualization */}
          <div className="w-full lg:w-1/2">
            <div className="bg-[#0a0f16] border border-slate-800 rounded-2xl overflow-hidden shadow-[0_0_40px_rgba(16,185,129,0.05)]">

              <div className="bg-[#05070a] px-4 py-3 border-b border-slate-800 font-mono text-xs text-emerald-500 flex justify-between items-center">
                <span>[CHANGE_DETECTION_ENGINE]</span>
                <span className="flex items-center gap-2"><span className="w-1.5 h-1.5 bg-emerald-500 rounded-full animate-pulse"></span> PROCESSING_DEMO</span>
              </div>

              {/* Satellite Simulation Window */}
              <div className="h-64 md:h-80 w-full relative bg-slate-900 overflow-hidden flex items-center justify-center">
                {/* Fake satellite background grid */}
                <div className="absolute inset-0" style={{ backgroundImage: 'linear-gradient(rgba(16,185,129,0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(16,185,129,0.1) 1px, transparent 1px)', backgroundSize: '20px 20px' }}></div>

                {/* Animated Scanner line */}
                <div className="absolute top-0 left-0 w-full h-1 bg-emerald-400 shadow-[0_0_10px_rgba(52,211,153,1)] animate-[scan_3s_ease-in-out_infinite]"></div>

                {/* Simulated detected polygons */}
                <div className="absolute w-12 h-12 border-2 border-red-500 bg-red-500/20 top-1/4 left-1/4 animate-pulse rounded-sm"></div>
                <div className="absolute w-24 h-16 border-2 border-red-500 bg-red-500/20 bottom-1/3 right-1/4 animate-pulse rounded-sm" style={{ animationDelay: '0.5s' }}></div>
                <div className="absolute w-8 h-8 border-2 border-red-500 bg-red-500/20 top-1/2 left-2/3 animate-pulse rounded-sm" style={{ animationDelay: '1s' }}></div>
              </div>

              {/* Metrics Row */}
              <div className="grid grid-cols-3 divide-x divide-slate-800 border-b border-slate-800 bg-[#05070a]">
                <div className="p-4 text-center">
                  <div className="text-2xl font-bold text-white mb-1">94%</div>
                  <div className="text-[10px] uppercase tracking-wider text-slate-500 font-mono">Accuracy</div>
                </div>
                <div className="p-4 text-center">
                  <div className="text-2xl font-bold text-white mb-1">2.3<span className="text-sm text-slate-400">km²</span></div>
                  <div className="text-[10px] uppercase tracking-wider text-slate-500 font-mono">Area Detected</div>
                </div>
                <div className="p-4 text-center">
                  <div className="text-2xl font-bold text-white mb-1">847</div>
                  <div className="text-[10px] uppercase tracking-wider text-slate-500 font-mono">Polygons</div>
                </div>
              </div>

              {/* Console Output */}
              <div className="p-6 bg-[#0a0f16] font-mono text-xs leading-relaxed text-slate-400">
                <div className="text-emerald-500">&gt;&gt;&gt; ENGINE_STATUS: MONITORING_ACTIVE</div>
                <div>&gt;&gt;&gt; TARGET: URBAN_GROWTH_CONTROL</div>
                <div>&gt;&gt;&gt; DETECTED: <span className="text-red-400">NEW_CONSTRUCTION</span> // ACTION: UPDATE_CADASTRE</div>
                <div>&gt;&gt;&gt; IMPACT: <span className="text-emerald-400">REVENUE_OPTIMIZATION</span></div>
              </div>

            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
