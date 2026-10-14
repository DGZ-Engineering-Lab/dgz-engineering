import { Suspense } from "react";
import Link from "next/link";
import Image from "next/image";
import { Shield, Settings, Brain, ArrowUpRight } from "lucide-react";
import HeroSection from "../components/HeroSection";
import SovereignMapWrapper from "../components/SovereignMapWrapper";
import ContactSection from "../components/ContactSection";
import FooterSection from "../components/FooterSection";
import TechTicker from "../components/TechTicker";
import GlobalPartners from "../components/GlobalPartners";
import ServicesSection from "../components/ServicesSection";

// Página de inicio: componente de servidor. Solo las piezas interactivas
// (hero, servicios, mapa, aliados, contacto) se hidratan en el cliente; cada
// una va en su propio <Suspense> para que React las hidrate en tareas
// separadas y no bloquee el hilo principal con una sola tarea larga.
export default function Home() {
  return (
    <div className="min-h-screen text-[var(--foreground)] overflow-x-hidden relative bg-transparent">
      <HeroSection />

      {/* Ecosistema Tecnológico de Elite */}
      <section className="py-28 border-t border-slate-100 bg-transparent relative overflow-hidden">
        <div className="absolute inset-0 opacity-[0.02] pointer-events-none bg-[radial-gradient(#000_1px,transparent_1px)] [background-size:16px_16px]"></div>
        
        <div className="max-w-7xl mx-auto px-6 mb-16 relative z-10">
          <div className="flex flex-col items-center text-center space-y-3">
            <div className="flex items-center gap-2">
              <span className="w-8 h-px bg-cyan-500/50"></span>
              <span className="text-[10px] font-mono uppercase tracking-[0.4em] text-cyan-600 font-bold">TECNOLOGÍA SIN LÍMITES</span>
              <span className="w-8 h-px bg-cyan-500/50"></span>
            </div>
            <h2 className="text-4xl md:text-5xl font-black text-slate-900 tracking-tight leading-none">
              Ecosistema de Plataformas <span className="text-slate-400 font-light italic">Multipropósito</span>
            </h2>
            <p className="text-slate-500 text-sm font-light leading-relaxed max-w-2xl">
              Herramientas líderes globales adaptadas para eliminar las tareas manuales y repetitivas, ahorrando tiempo y dinero en cada metro cuadrado de tus proyectos.
            </p>
          </div>
        </div>

        <div className="relative z-10">
          <Suspense><TechTicker /></Suspense>
        </div>
      </section>

      {/* Strategic Vision - 3 Pillars (Glassmorphic Cards) */}
      <section className="py-36 px-6 relative section-deferred bg-transparent">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-cyan-500/5 rounded-full blur-3xl pointer-events-none"></div>
        <div className="max-w-7xl mx-auto relative z-10">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Seguridad Legal */}
            <div 
              className="glass-card-premium p-12 rounded-[2rem] border-glow space-y-8 glow-cyan-hover scroll-reveal"
            >
              <div className="w-14 h-14 bg-slate-50 border border-slate-255/80 rounded-2xl flex items-center justify-center text-xl shadow-md relative group overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-br from-cyan-500/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity"></div>
                <Shield className="w-6 h-6 text-cyan-600" />
              </div>
              <h3 className="text-2xl font-black tracking-tight text-slate-900">Seguridad Legal</h3>
              <p className="text-slate-600 font-light leading-relaxed text-sm">
                Tranquilidad jurídica total. Validamos linderos y predios bajo las normativas colombianas oficiales para que compres, vendas o construyas sin sorpresas de última hora.
              </p>
            </div>

            {/* Eficiencia Máxima */}
            <div 
              className="glass-card-premium p-12 rounded-[2rem] border-glow space-y-8 glow-cyan-hover scroll-reveal"
            >
              <div className="w-14 h-14 bg-slate-50 border border-slate-255/80 rounded-2xl flex items-center justify-center text-xl shadow-md relative group overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-br from-blue-500/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity"></div>
                <Settings className="w-6 h-6 text-blue-600" />
              </div>
              <h3 className="text-2xl font-black tracking-tight text-slate-900">Eficiencia Máxima</h3>
              <p className="text-slate-600 font-light leading-relaxed text-sm">
                Automatización sin errores. Procesamos millones de datos geográficos y catastrales en segundos, eliminando papeleos y semanas de espera técnica.
              </p>
            </div>

            {/* Simulación Futura */}
            <div 
              className="glass-card-premium p-12 rounded-[2rem] border-glow space-y-8 glow-cyan-hover scroll-reveal"
            >
              <div className="w-14 h-14 bg-slate-50 border border-slate-255/80 rounded-2xl flex items-center justify-center text-xl shadow-md relative group overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-br from-emerald-500/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity"></div>
                <Brain className="w-6 h-6 text-emerald-600" />
              </div>
              <h3 className="text-2xl font-black tracking-tight text-slate-900">Simulación Futura</h3>
              <p className="text-slate-600 font-light leading-relaxed text-sm">
                Visión 3D del mañana. Simula riesgos de inundación, restricciones de construcción o cambios del POT antes de invertir un solo peso en el terreno.
              </p>
            </div>
          </div>
        </div>
      </section>

      <Suspense><ServicesSection /></Suspense>

      {/* Territorial Control - Interactive Section */}
      <section className="py-24 relative overflow-hidden section-deferred bg-transparent">
        <div className="max-w-7xl mx-auto px-6 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 items-center">
            
            <div 
              className="lg:col-span-5 space-y-8 relative z-10 scroll-reveal"
            >
              <div className="text-[10px] font-mono text-cyan-600 uppercase tracking-[0.5em] flex items-center gap-2 font-bold">
                <span className="w-1.5 h-1.5 bg-cyan-500 rounded-full animate-ping"></span>
                Live Intelligence Stream
              </div>
              <h2 className="text-4xl md:text-6xl font-black tracking-tighter leading-tight text-slate-950">
                Control Total del <br /> 
                <span className="text-slate-400 font-light italic">Activo Espacial.</span>
              </h2>
              <p className="text-slate-600 text-lg font-light leading-relaxed">
                Nuestra plataforma unificada te permite vigilar, auditar y actualizar tus lotes, terrenos o red vial en tiempo real, desde cualquier computador o celular con absoluta seguridad.
              </p>
              <div className="pt-4">
                <Link 
                  href="/standards" 
                  prefetch={false} 
                  className="inline-flex items-center gap-4 text-[10px] font-bold uppercase tracking-[0.2em] text-slate-900 hover:text-cyan-600 transition-colors group"
                >
                  Ver Protocolos de Seguridad
                  <span className="w-12 h-px bg-slate-900 group-hover:bg-cyan-600 transition-all group-hover:w-20"></span>
                </Link>
              </div>
            </div>
            
            <div 
              className="lg:col-span-7 h-[540px] bg-white border border-slate-200 rounded-[2.5rem] overflow-hidden relative group shadow-2xl hover:border-slate-350 transition-all"
            >
              <Suspense><SovereignMapWrapper /></Suspense>
              <div className="absolute top-6 left-6 p-4 glass-card-premium rounded-xl border border-slate-200/50 z-20 shadow-md">
                <div className="flex items-center gap-3">
                  <div className="w-2 h-2 bg-emerald-500 rounded-full animate-pulse shadow-[0_0_8px_#10b981]"></div>
                  <span className="text-[10px] font-mono text-slate-900 uppercase tracking-widest font-black">
                    Tactical View: Operational
                  </span>
                </div>
              </div>
              
              <div className="absolute top-6 right-6 z-20">
                <Link
                  href="/projects"
                  prefetch={false}
                  className="flex items-center gap-2 px-5 py-3 bg-slate-950 hover:bg-slate-900 border border-slate-800 hover:border-cyan-500/50 rounded-xl text-[10px] font-mono text-white uppercase tracking-[0.2em] font-black transition-all duration-300 hover:scale-105 shadow-2xl hover:shadow-[0_0_20px_rgba(207,167,88,0.3)] group/btn"
                >
                  <ArrowUpRight className="w-4 h-4 text-cyan-400 group-hover/btn:translate-x-0.5 group-hover/btn:-translate-y-0.5 transition-transform" />
                  <span>MÁXIMA RESOLUCIÓN</span>
                </Link>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* Featured Insights - Link to Journal */}
      <section className="py-32 px-6 relative section-deferred">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col md:flex-row justify-between items-end mb-20 gap-8">
            <div className="space-y-4">
              <div className="text-[10px] font-mono text-slate-400 uppercase tracking-widest font-bold">Engineering Journal</div>
              <h2 className="text-4xl md:text-5xl font-black tracking-tighter text-slate-950">
                Pensamiento <span className="text-slate-400 italic font-light">Estrategico</span>
              </h2>
            </div>
            <Link 
              href="/blog" 
              prefetch={false} 
              className="text-[10px] font-bold uppercase tracking-widest border-b border-slate-200 pb-1.5 text-slate-500 hover:text-cyan-600 hover:border-cyan-500/40 transition-all duration-300"
            >
              Ver todas las publicaciones
            </Link>
          </div>

          <div 
            className="grid grid-cols-1 lg:grid-cols-2 gap-12"
          >
            <div className="scroll-reveal">
              <Link href="/blog/1" prefetch={false} className="group space-y-6 block">
                <div className="aspect-video bg-slate-100 border border-slate-200 overflow-hidden rounded-[2rem] relative shadow-lg">
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-900/10 to-transparent opacity-40 z-10"></div>
                  <Image 
                    src="/assets/img/blog-ladm-col.webp" 
                    alt="LADM-COL" 
                    fill
                    sizes="(max-width: 768px) 100vw, 50vw"
                    className="object-cover grayscale group-hover:grayscale-0 group-hover:scale-[1.03] transition-all duration-700" 
                  />
                </div>
                <div className="space-y-2 pl-4">
                  <span className="text-[10px] font-mono text-cyan-600 uppercase tracking-widest font-bold">Caso de Exito // Valle</span>
                  <h3 className="text-2xl font-black tracking-tight text-slate-950 group-hover:text-cyan-600 transition-colors">
                    La Nueva Era del Catastro Multipropósito
                  </h3>
                  <p className="text-slate-600 font-light text-sm leading-relaxed line-clamp-2">
                    Análisis profundo sobre la implementación del estándar LADM-COL en el Valle del Cauca y su impacto en la soberanía tributaria.
                  </p>
                </div>
              </Link>
            </div>

            <div className="scroll-reveal">
              <Link href="/blog/2" prefetch={false} className="group space-y-6 block">
                <div className="aspect-video bg-slate-100 border border-slate-200 overflow-hidden rounded-[2rem] relative shadow-lg">
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-900/10 to-transparent opacity-40 z-10"></div>
                  <Image 
                    src="/assets/img/blog-cybersecurity.webp" 
                    alt="Cybersecurity" 
                    fill
                    sizes="(max-width: 768px) 100vw, 50vw"
                    className="object-cover grayscale group-hover:grayscale-0 group-hover:scale-[1.03] transition-all duration-700" 
                  />
                </div>
                <div className="space-y-2 pl-4">
                  <span className="text-[10px] font-mono text-emerald-600 uppercase tracking-widest font-bold">Ciberseguridad // Zero-Trust</span>
                  <h3 className="text-2xl font-black tracking-tight text-slate-950 group-hover:text-cyan-600 transition-colors">
                    Ciberseguridad Geográfica Nacional
                  </h3>
                  <p className="text-slate-600 font-light text-sm leading-relaxed line-clamp-2">
                    Cómo protegemos los activos territoriales soberanos mediante arquitecturas Zero Trust y cifrado de flujos vectoriales en tránsito.
                  </p>
                </div>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Global Partners - Ecosistema de Alianzas y Clientes */}
      <Suspense><GlobalPartners /></Suspense>

      <Suspense><ContactSection /></Suspense>
      <FooterSection />
    </div>
  );
}
