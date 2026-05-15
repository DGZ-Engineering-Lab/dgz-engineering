import Link from "next/link";
import Logo from "../../components/Logo";

export default function DocsPage() {
  return (
    <div className="min-h-screen bg-[#05070a] text-white pt-32 pb-20 selection:bg-cyan-500 selection:text-black">
      {/* HUD Background Overlay */}
      <div className="absolute inset-0 opacity-[0.03] pointer-events-none">
         <div className="absolute top-0 left-0 w-full h-full" style={{ backgroundImage: 'linear-gradient(rgba(0,229,255,0.2) 1px, transparent 1px), linear-gradient(90deg, rgba(0,229,255,0.2) 1px, transparent 1px)', backgroundSize: '40px 40px' }}></div>
      </div>

      <div className="max-w-7xl mx-auto px-6 relative z-10">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-24 gap-8">
           <div className="space-y-4">
              <Link href="/" className="text-slate-500 hover:text-cyan-400 transition-colors font-mono text-[10px] uppercase tracking-[0.4em] flex items-center gap-2">
                 ← System Kernel
              </Link>
              <h1 className="text-7xl md:text-8xl font-black tracking-tighter leading-none">
                Node <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-blue-600 italic">Documentation</span>
              </h1>
              <p className="text-slate-500 font-mono text-[10px] uppercase tracking-[0.4em]">Developer Access // API Endpoint v1.2.0-STABLE</p>
           </div>
           
           <div className="flex items-center gap-4 px-6 py-3 bg-slate-900/30 border border-slate-800 rounded-2xl backdrop-blur-xl">
              <div className="w-2 h-2 bg-emerald-500 rounded-full animate-pulse"></div>
              <span className="text-xs font-mono text-emerald-400 uppercase tracking-widest">Gateway Active</span>
           </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16">
           
           {/* Sidebar Navigation */}
           <div className="lg:col-span-3 space-y-8 sticky top-32 h-fit">
              <div className="space-y-2">
                 <div className="text-[10px] font-mono text-slate-500 uppercase tracking-widest mb-4">Core Sections</div>
                 <nav className="flex flex-col gap-1">
                    {["Introduction", "Authentication", "Spatial Queries", "LADM-COL Schema", "Webhooks", "Rate Limits"].map((item, i) => (
                       <button key={item} className={`text-left px-4 py-3 rounded-xl text-sm transition-all ${i === 0 ? 'bg-cyan-500/10 text-cyan-400 border border-cyan-500/20' : 'text-slate-400 hover:text-white hover:bg-white/5'}`}>
                          {item}
                       </button>
                    ))}
                 </nav>
              </div>
           </div>

           {/* Main Content */}
           <div className="lg:col-span-9 space-y-20">
              
              {/* Introduction */}
              <section id="introduction" className="space-y-6">
                 <h2 className="text-4xl font-black tracking-tight">Introduction</h2>
                 <p className="text-slate-400 text-lg font-light leading-relaxed">
                    La API de DevGiz permite a desarrolladores e instituciones gubernamentales interactuar de forma programática con el kernel de inteligencia espacial. Proporcionamos acceso a validaciones topológicas, consultas catastrales masivas y orquestación de pipelines ETL.
                 </p>
                 <div className="p-8 bg-slate-950 border border-slate-800 rounded-[2.5rem] space-y-6">
                    <div className="flex items-center justify-between">
                       <span className="text-[10px] font-mono text-cyan-500 uppercase tracking-widest">Base URL</span>
                       <span className="text-xs text-white bg-white/5 px-4 py-1 rounded-full">https://api.devgiz.com/v1</span>
                    </div>
                 </div>
              </section>

              {/* Spatial Queries */}
              <section id="spatial" className="space-y-8">
                 <div className="space-y-4">
                    <h2 className="text-4xl font-black tracking-tight">Spatial Queries</h2>
                    <p className="text-slate-400 font-light leading-relaxed">
                       Realice consultas SQL espaciales de alta complejidad directamente sobre nuestros nodos distribuidos de PostGIS.
                    </p>
                 </div>

                 <div className="space-y-4">
                    <div className="text-xs font-mono text-slate-500">GET /spatial/query</div>
                    <div className="relative group">
                       <div className="absolute -inset-1 bg-gradient-to-r from-cyan-500 to-blue-500 rounded-2xl blur opacity-20 group-hover:opacity-40 transition-opacity"></div>
                       <pre className="relative bg-[#0a0f16] p-8 rounded-2xl border border-slate-800 overflow-x-auto">
                          <code className="text-sm font-mono leading-relaxed">
<span className="text-purple-400">const</span> response = <span className="text-purple-400">await</span> fetch(&quot;https://api.devgiz.com/v1/spatial/query&quot;, &#123;{"\n"}
&nbsp;&nbsp;method: &quot;POST&quot;,{"\n"}
&nbsp;&nbsp;headers: &#123;{"\n"}
&nbsp;&nbsp;&nbsp;&nbsp;&quot;Authorization&quot;: &quot;Bearer $DEVGIZ_TOKEN&quot;,{"\n"}
&nbsp;&nbsp;&nbsp;&nbsp;&quot;Content-Type&quot;: &quot;application/json&quot;{"\n"}
&nbsp;&nbsp;&#125;,{"\n"}
&nbsp;&nbsp;body: JSON.stringify(&#123;{"\n"}
&nbsp;&nbsp;&nbsp;&nbsp;query: &quot;SELECT * FROM parcels WHERE ST_Intersects(geom, ST_MakeEnvelope(...))&quot;,{"\n"}
&nbsp;&nbsp;&nbsp;&nbsp;format: &quot;GeoJSON&quot;{"\n"}
&nbsp;&nbsp;&#125;){"\n"}
&#125;);
                          </code>
                       </pre>
                    </div>
                 </div>
              </section>

              {/* LADM-COL Validation */}
              <section id="ladm" className="space-y-8">
                 <div className="space-y-4">
                    <h2 className="text-4xl font-black tracking-tight">LADM-COL Validation</h2>
                    <p className="text-slate-400 font-light leading-relaxed">
                       Valide la conformidad técnica de sus datasets catastrales contra el modelo extendido colombiano V4 de forma automatizada.
                    </p>
                 </div>

                 <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    <div className="p-8 bg-slate-900/30 border border-slate-800 rounded-3xl space-y-4">
                       <div className="text-cyan-400 font-mono text-[10px] uppercase tracking-widest">Validación Topológica</div>
                       <p className="text-sm text-slate-400">Check de traslapes, slivers y auto-intersecciones en masa.</p>
                    </div>
                    <div className="p-8 bg-slate-900/30 border border-slate-800 rounded-3xl space-y-4">
                       <div className="text-emerald-400 font-mono text-[10px] uppercase tracking-widest">Integridad de Esquema</div>
                       <p className="text-sm text-slate-400">Asegure que cada atributo cumpla con la resolución oficial vigente.</p>
                    </div>
                 </div>
              </section>

           </div>
        </div>

        {/* Footer */}
        <div className="mt-40 pt-12 border-t border-slate-900 flex flex-col md:flex-row justify-between items-center gap-8">
           <Logo className="w-12 h-12 opacity-30" />
           <div className="flex gap-12 text-[10px] font-mono text-slate-600 uppercase tracking-widest">
              <span>Privacy Kernel</span>
              <span>Security Protocols</span>
              <span>&copy; 2026 DevGiz Hub</span>
           </div>
        </div>
      </div>
    </div>
  );
}
