import Link from "next/link";
import "./hero-motion.css";
import SovereignMapWrapper from "../components/SovereignMapWrapper";
import Image from "next/image";
import HeroCad from "../components/HeroCad";
import ContactSection from "../components/ContactSection";
import GlobalPartners from "../components/GlobalPartners";
import { Shield, Settings, Brain, ArrowUpRight, ChevronRight } from "lucide-react";
import ServicesSection from "../components/ServicesSection";
import OffersSection from "../components/OffersSection";
import ProfessionalProfile from "../components/ProfessionalProfile";
import { CONTACT, pageMetadata } from "../lib/seo";

// Título con la intención de búsqueda principal (servicio + país) antes de la marca.
export const metadata = pageMetadata({
  title: "Catastro Multipropósito LADM-COL y WebGIS en Colombia",
  description:
    "Ingeniería geoespacial en Medellín: catastro multipropósito LADM-COL, WebGIS y automatización GIS para municipios, constructoras y empresas. Primera sesión sin costo.",
  path: "/",
});

export default function Home() {
  return (
    <div className="min-h-screen text-[var(--foreground)] selection:bg-cyan-500/20 overflow-x-hidden relative bg-transparent">
      
      {/* Hero Section - Elite Digital Sovereignty */}
      <section className="relative pt-28 md:pt-36 pb-16 md:pb-24 px-5 md:px-6 overflow-hidden">
        {/* Luces decorativas superiores */}
        <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-gradient-to-b from-cyan-500/5 to-transparent opacity-30 rounded-full blur-[120px] pointer-events-none z-0"></div>
        <div className="absolute top-1/3 left-0 w-[500px] h-[500px] bg-gradient-to-tr from-indigo-500/5 to-transparent opacity-20 rounded-full blur-[100px] pointer-events-none z-0"></div>

        <div className="max-w-7xl mx-auto relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 items-center">
            
            <div className="lg:col-span-7 space-y-9 hero-enter-left">
              <span className="eyebrow">Ingeniería geoespacial · Colombia</span>

              <h1 className="text-[2.6rem] leading-[1.02] sm:text-5xl md:text-6xl lg:text-[4.1rem] font-black tracking-tighter text-slate-950">
                Datos territoriales <br className="hidden sm:block" />
                <span className="text-gradient-brand font-light italic">precisos</span> para decidir <br className="hidden sm:block" />
                con certeza.
              </h1>

              <p className="max-w-2xl text-lg md:text-xl text-slate-600 font-light leading-relaxed">
                Catastro multipropósito bajo <span className="text-cyan-700 font-mono text-[0.8em] border border-cyan-500/25 bg-cyan-500/5 px-1.5 py-0.5 rounded-md font-bold whitespace-nowrap">LADM-COL v3.0</span>, WebGIS, analítica y automatización geoespacial para municipios, constructoras y empresas que necesitan resultados verificables.
              </p>

              <div className="flex flex-col sm:flex-row sm:flex-wrap items-stretch sm:items-center gap-3">
                <a href="#contact" className="btn btn-primary">
                  Agendar consultoría <ArrowUpRight aria-hidden="true" />
                </a>
                <Link href="/services" prefetch={false} className="btn btn-secondary">
                  Ver servicios
                </Link>
                <a href={CONTACT.whatsappUrl} target="_blank" rel="noopener noreferrer" className="btn btn-whatsapp">
                  WhatsApp directo
                </a>
              </div>

              <p className="-mt-4 text-sm text-slate-500">
                Primera sesión sin costo · Respuesta en menos de 24 horas hábiles ·{" "}
                <a href="#ofertas" className="inline-block py-2 -my-2 font-semibold text-slate-800 underline decoration-cyan-500/40 underline-offset-4 hover:text-cyan-700">Ver precios</a>
              </p>

              <dl className="grid grid-cols-3 max-w-xl gap-4 pt-6 border-t border-slate-200/80">
                <div>
                  <dt className="text-[0.68rem] font-mono uppercase tracking-[0.16em] text-slate-500">Experiencia SIG</dt>
                  <dd className="mt-1 text-2xl md:text-3xl font-black tracking-tight text-slate-950 tabular-nums">2021+</dd>
                </div>
                <div>
                  <dt className="text-[0.68rem] font-mono uppercase tracking-[0.16em] text-slate-500">Metodología</dt>
                  <dd className="mt-1 text-2xl md:text-3xl font-black tracking-tight text-emerald-700 tabular-nums">LADM-COL</dd>
                </div>
                <div>
                  <dt className="text-[0.68rem] font-mono uppercase tracking-[0.16em] text-slate-500">Matrícula profesional</dt>
                  <dd className="mt-1 text-2xl md:text-3xl font-black tracking-tight text-cyan-700 tabular-nums">COPNIA</dd>
                </div>
              </dl>

              <p className="flex items-center gap-3 text-sm text-slate-500">
                <span className="inline-flex h-8 w-8 items-center justify-center rounded-full bg-slate-950 text-[0.7rem] font-black text-cyan-300">AG</span>
                <span>
                  Dirigido por <a href="#portfolio-dossier" className="font-semibold text-slate-800 underline decoration-cyan-500/40 underline-offset-4 hover:text-cyan-700">Albert Daniel Gaviria Zapata</a>, profesional SIG y fundador de DevGiz.
                </span>
              </p>
            </div>
            {/* Core Standards HUD Card (Lateral Hero) - Ultra premium 3D Digital Twin CAD Console */}
            <div className="hidden lg:block lg:col-span-5 hero-enter-right">
              <div aria-hidden="true" className="relative mx-auto aspect-square w-full max-w-md">
                {/* 3D ambient space back-glow */}
                <div className="pointer-events-none absolute -inset-6 rounded-[2.5rem] bg-gradient-to-br from-cyan-500/20 via-indigo-500/10 to-orange-500/5 blur-3xl animate-pulse-soft" aria-hidden="true"></div>
                
                {/* Premium Glassmorphic CAD Frame */}
                <div className="absolute inset-0 overflow-hidden rounded-[2rem] border border-white/10 bg-slate-950/95 shadow-[0_35px_90px_-15px_rgba(0,0,0,0.85)] backdrop-blur-xl ring-1 ring-white/20">
                  
                  {/* Outer Glass Shine Overlay */}
                  <div className="absolute inset-0 pointer-events-none bg-gradient-to-tr from-white/0 via-white/5 to-white/0 opacity-40 mix-blend-overlay"></div>
                  
                  {/* Top status bar (System HUD) */}
                  <div className="absolute inset-x-0 top-0 z-20 flex items-center justify-between border-b border-white/10 bg-gradient-to-b from-slate-950 via-slate-950/90 to-transparent px-5 py-3.5">
                    <div className="flex items-center gap-2">
                      <span className="h-2 w-2 rounded-full bg-cyan-400 shadow-[0_0_12px_rgba(6,182,212,0.95)] animate-pulse"></span>
                      <span className="font-mono text-[10px] uppercase tracking-[0.2em] text-cyan-300 font-bold">SOVEREIGN GRAPH CORE v3.1</span>
                    </div>
                    <div className="flex items-center gap-1.5 rounded-full bg-cyan-500/10 px-2.5 py-0.5 ring-1 ring-cyan-500/20">
                      <svg xmlns="http://www.w3.org/2000/svg" width="9" height="9" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-layers text-cyan-400 animate-pulse">
                        <path d="M12.83 2.18a2 2 0 0 0-1.66 0L2.6 6.08a1 1 0 0 0 0 1.83l8.58 3.91a2 2 0 0 0 1.66 0l8.58-3.9a1 1 0 0 0 0-1.83z"></path>
                        <path d="M2 12a1 1 0 0 0 .58.91l8.6 3.91a2 2 0 0 0 1.65 0l8.58-3.9A1 1 0 0 0 22 12"></path>
                        <path d="M2 17a1 1 0 0 0 .58.91l8.6 3.91a2 2 0 0 0 1.65 0l8.58-3.9A1 1 0 0 0 22 17"></path>
                      </svg>
                      <span className="text-[10px] font-black text-cyan-200 uppercase tracking-widest">4K DWIN</span>
                    </div>
                  </div>

                  {/* Real-time Dynamic Status Tag */}
                  <div className="pointer-events-none absolute left-1/2 top-14 z-30 flex -translate-x-1/2 items-center gap-2 rounded-full border border-cyan-500/20 bg-slate-900/90 px-4 py-1.5 text-[10px] font-black text-cyan-400 shadow-xl backdrop-blur-md">
                    <svg xmlns="http://www.w3.org/2000/svg" width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-activity text-orange-400 animate-pulse">
                      <path d="M22 12h-2.48a2 2 0 0 0-1.93 1.46l-2.35 8.36a.25.25 0 0 1-.48 0L9.24 2.18a.25.25 0 0 0-.48 0l-2.35 8.36A2 2 0 0 1 4.49 12H2"></path>
                    </svg>
                    LIDAR SCANNING ACTIVE
                  </div>

                  {/* SVG CAD Space Engine */}
                  {/* Motor CAD SVG: carga diferida solo en lg+ (ver HeroCad) */}
                  <HeroCad />

                  {/* Bottom HUD: Dynamic land metrics & cadastral coordinates */}
                  <div className="absolute inset-x-0 bottom-0 z-20 border-t border-white/10 bg-gradient-to-t from-slate-950 via-slate-950/80 to-transparent px-5 py-3.5">
                    <div className="grid grid-cols-3 gap-3 text-center">
                      <div>
                        <div className="font-mono text-[11px] md:text-sm font-bold text-white tracking-tight">1.245.310</div>
                        <div className="mt-0.5 text-[9.5px] uppercase tracking-wider text-slate-400 font-semibold">PREDIOS</div>
                      </div>
                      <div className="border-x border-white/10">
                        <div className="font-mono text-[11px] md:text-sm font-bold text-cyan-400 tracking-tight">5 cm/px</div>
                        <div className="mt-0.5 text-[9.5px] uppercase tracking-wider text-slate-400 font-semibold">RESOLUCIÓN</div>
                      </div>
                      <div>
                        <div className="font-mono text-[11px] md:text-sm font-bold text-white tracking-tight">EPSG:9377</div>
                        <div className="mt-0.5 text-[9.5px] uppercase tracking-wider text-slate-400 font-semibold">CTM12</div>
                      </div>
                    </div>
                  </div>

                </div>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* Por qué DevGiz: bento asimétrico (un argumento principal + dos de apoyo) */}
      <section aria-labelledby="why-title" className="py-16 md:py-24 relative section-deferred">
        <div className="container-dgz">
          <div className="max-w-2xl mb-10 md:mb-12 space-y-3">
            <span className="eyebrow">Por qué DevGiz</span>
            <h2 id="why-title" className="text-3xl md:text-5xl font-black tracking-tighter leading-[1.04] text-slate-950">Menos incertidumbre, <span className="text-slate-500 font-light italic">más decisiones.</span></h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-6 gap-5 md:gap-6">
            <article className="md:col-span-4 md:row-span-2 card-dgz card-hover p-7 sm:p-10 relative overflow-hidden flex flex-col">
              <div aria-hidden="true" className="pointer-events-none absolute -bottom-10 -right-10 h-64 w-64 opacity-[0.5] [background-image:linear-gradient(rgba(8,145,178,0.14)_1px,transparent_1px),linear-gradient(90deg,rgba(8,145,178,0.14)_1px,transparent_1px)] [background-size:24px_24px] [mask-image:radial-gradient(circle,black_30%,transparent_70%)]" />
              <span className="w-12 h-12 rounded-[var(--radius-sm)] bg-cyan-50 text-cyan-700 ring-1 ring-cyan-600/15 flex items-center justify-center">
                <Shield className="w-6 h-6" aria-hidden="true" />
              </span>
              <h3 className="mt-8 md:mt-auto md:pt-10 text-2xl md:text-3xl font-black tracking-tight text-slate-950 max-w-md">Datos preparados para revisión técnica</h3>
              <p className="mt-4 max-w-xl text-slate-600 font-light leading-relaxed">
                Estructuramos y validamos la información con una metodología alineada con LADM-COL v3.0 (ISO 19152) e INTERLIS, con controles topológicos en cada entrega, para reducir hallazgos de última hora al comprar, vender, construir o actualizar catastro.
              </p>
              <ul className="mt-8 flex flex-wrap gap-2 relative">
                {["LADM-COL v3.0", "INTERLIS / XTF", "ISO 19152", "Res. 1040 de 2023"].map((tag) => (
                  <li key={tag} className="rounded-md border border-slate-200 bg-white px-2.5 py-1 font-mono text-[0.7rem] font-semibold text-slate-700">{tag}</li>
                ))}
              </ul>
            </article>

            <article className="md:col-span-2 card-dgz card-hover p-7 sm:p-8">
              <span className="w-11 h-11 rounded-[var(--radius-sm)] bg-blue-50 text-blue-700 ring-1 ring-blue-600/15 flex items-center justify-center">
                <Settings className="w-5 h-5" aria-hidden="true" />
              </span>
              <h3 className="mt-6 text-xl font-black tracking-tight text-slate-950">Procesos automatizados</h3>
              <p className="mt-3 text-sm text-slate-600 font-light leading-relaxed">
                Scripts en Python y PostGIS que procesan miles de predios con el mismo criterio, sin depender de tareas manuales.
              </p>
            </article>

            <article className="md:col-span-2 card-dgz card-hover p-7 sm:p-8">
              <span className="w-11 h-11 rounded-[var(--radius-sm)] bg-emerald-50 text-emerald-700 ring-1 ring-emerald-600/15 flex items-center justify-center">
                <Brain className="w-5 h-5" aria-hidden="true" />
              </span>
              <h3 className="mt-6 text-xl font-black tracking-tight text-slate-950">Escenarios antes de invertir</h3>
              <p className="mt-3 text-sm text-slate-600 font-light leading-relaxed">
                Modelos 3D y análisis de inundación, restricciones o cambios del POT antes de comprometer un peso en el terreno.
              </p>
            </article>
          </div>
        </div>
      </section>

      <OffersSection />

      <ServicesSection />

      {/* Territorial Control - Interactive Section */}
      <section className="py-14 md:py-16 relative overflow-hidden section-deferred bg-transparent">
        <div className="max-w-7xl mx-auto px-6 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 items-center">
            
            <div 
              className="lg:col-span-5 space-y-8 relative z-10 scroll-reveal"
            >
              <span className="eyebrow">Plataforma de monitoreo</span>
              <h2 className="text-2xl sm:text-3xl md:text-4xl font-black tracking-tighter leading-tight text-slate-950">
                Tus predios y redes, <br />
                <span className="text-slate-500 font-light italic">en un solo mapa.</span>
              </h2>
              <p className="text-slate-600 text-lg font-light leading-relaxed">
                Vigila, audita y actualiza lotes, terrenos o red vial desde cualquier computador o celular, con acceso controlado por usuario.
              </p>
              <div className="pt-4">
                <Link 
                  href="/standards" 
                  prefetch={false} 
                  className="btn btn-secondary group"
                >
                  Ver protocolos de seguridad
                  <ChevronRight aria-hidden="true" />
                </Link>
              </div>
            </div>
            
            <div 
              className="lg:col-span-7 h-[420px] md:h-[540px] bg-white border border-slate-200 rounded-[var(--radius-lg)] overflow-hidden relative group shadow-2xl hover:border-slate-350 transition-all"
            >
              <SovereignMapWrapper />
              <div className="absolute top-4 left-4 sm:top-6 sm:left-6 p-3 sm:p-4 glass-card-premium rounded-xl border border-slate-200/50 z-20 shadow-md">
                <div className="flex items-center gap-3">
                  <div className="w-2 h-2 bg-emerald-500 rounded-full animate-pulse shadow-[0_0_8px_#10b981]"></div>
                  <span className="text-[0.68rem] font-mono text-slate-900 uppercase tracking-widest font-bold">
                    Vista operativa en línea
                  </span>
                </div>
              </div>
              
              <div className="absolute top-16 left-4 sm:top-6 sm:left-auto sm:right-6 z-20">
                <Link
                  href="/projects"
                  prefetch={false}
                  className="btn btn-primary btn-sm group/btn"
                >
                  <span>Ver proyectos</span>
                  <ArrowUpRight aria-hidden="true" className="text-cyan-300 group-hover/btn:translate-x-0.5 group-hover/btn:-translate-y-0.5 transition-transform" />
                </Link>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* Experiencia profesional del fundador (texto, sin logos de terceros) */}
      <GlobalPartners />

      {/* ========================================================= */}
      {/* DOSSIER MAESTRO DE INGENIERÍA: ALBERT DANIEL GAVIRIA ZAPATA */}
      {/* ========================================================= */}
      <ProfessionalProfile />

      {/* Featured Insights - Link to Journal */}
      <section className="py-14 md:py-16 px-6 relative section-deferred">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col md:flex-row justify-between items-end mb-10 gap-6">
            <div className="space-y-4">
              <span className="eyebrow">Blog técnico</span>
              <h2 className="text-4xl md:text-5xl font-black tracking-tighter text-slate-950">
                Pensamiento <span className="text-slate-500 italic font-light">estratégico</span>
              </h2>
            </div>
            <Link 
              href="/blog" 
              prefetch={false} 
              className="btn btn-secondary btn-sm"
            >
              Ver todas las publicaciones
            </Link>
          </div>

          <div 
            className="grid grid-cols-1 lg:grid-cols-2 gap-12"
          >
            <div className="scroll-reveal">
              <Link href="/blog/1" prefetch={false} className="group space-y-6 block">
                <div className="aspect-video bg-slate-100 border border-slate-200 overflow-hidden rounded-[var(--radius-lg)] relative shadow-lg">
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-900/10 to-transparent opacity-40 z-10"></div>
                  <Image 
                    src="/assets/img/blog-ladm-col.webp" 
                    alt="" 
                    fill
                    sizes="(max-width: 768px) 100vw, 50vw"
                    className="object-cover grayscale group-hover:grayscale-0 group-hover:scale-[1.03] transition-all duration-700" 
                  />
                </div>
                <div className="space-y-2 pl-4">
                  <span className="text-[0.68rem] font-mono text-cyan-700 uppercase tracking-widest font-bold">Caso ilustrativo · Datos ficticios</span>
                  <h3 className="text-2xl font-black tracking-tight text-slate-950 group-hover:text-cyan-600 transition-colors">
                    La Nueva Era del Catastro Multipropósito
                  </h3>
                  <p className="text-slate-600 font-light text-sm leading-relaxed line-clamp-2">
                    Demostración técnica con datos ficticios sobre cómo aplicar el estándar LADM-COL en un catastro multipropósito departamental.
                  </p>
                </div>
              </Link>
            </div>

            <div className="scroll-reveal">
              <Link href="/blog/2" prefetch={false} className="group space-y-6 block">
                <div className="aspect-video bg-slate-100 border border-slate-200 overflow-hidden rounded-[var(--radius-lg)] relative shadow-lg">
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-900/10 to-transparent opacity-40 z-10"></div>
                  <Image 
                    src="/assets/img/blog-cybersecurity.webp" 
                    alt="" 
                    fill
                    sizes="(max-width: 768px) 100vw, 50vw"
                    className="object-cover grayscale group-hover:grayscale-0 group-hover:scale-[1.03] transition-all duration-700" 
                  />
                </div>
                <div className="space-y-2 pl-4">
                  <span className="text-[0.68rem] font-mono text-emerald-700 uppercase tracking-widest font-bold">Ciberseguridad · Zero Trust</span>
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

      <ContactSection />
    </div>
  );
}
