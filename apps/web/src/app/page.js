"use client";
import { motion } from "framer-motion";
import Link from "next/link";
import SovereignMapWrapper from "../components/SovereignMapWrapper";
import Image from "next/image";
import Logo from "../components/Logo";
import ContactSection from "../components/ContactSection";
import FooterSection from "../components/FooterSection";
import TechTicker from "../components/TechTicker";
import GlobalPartners from "../components/GlobalPartners";
import { Shield, Settings, Brain, ArrowUpRight, CheckCircle2, ChevronRight } from "lucide-react";
import ServicesSection from "../components/ServicesSection";

// Configuración de variantes de animación premium
const fadeInUp = {
  initial: { opacity: 0, y: 30 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: "-100px" },
  transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] }
};

const staggerContainer = {
  initial: {},
  whileInView: { transition: { staggerChildren: 0.15 } },
  viewport: { once: true }
};

export default function Home() {
  return (
    <main className="min-h-screen text-[var(--foreground)] selection:bg-cyan-500/20 overflow-x-hidden relative bg-transparent">
      
      {/* Hero Section - Elite Digital Sovereignty */}
      <section className="relative pt-52 pb-36 px-6 overflow-hidden">
        {/* Luces decorativas superiores */}
        <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-gradient-to-b from-cyan-500/5 to-transparent opacity-30 rounded-full blur-[120px] pointer-events-none z-0"></div>
        <div className="absolute top-1/3 left-0 w-[500px] h-[500px] bg-gradient-to-tr from-indigo-500/5 to-transparent opacity-20 rounded-full blur-[100px] pointer-events-none z-0"></div>

        <div className="max-w-7xl mx-auto relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 items-start">
            
            <motion.div 
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
              className="lg:col-span-8 space-y-12 animate-fade-in"
            >
              <div className="flex items-center gap-4">
                <span className="w-12 h-px bg-cyan-500/40 shadow-[0_0_8px_rgba(6,182,212,0.3)]"></span>
                <span className="text-[10px] font-mono uppercase tracking-[0.5em] text-cyan-600 font-semibold">
                  Engineering Sovereignty // 2026
                </span>
              </div>
              
              <h1 className="text-6xl md:text-8xl lg:text-[105px] font-black tracking-tighter leading-[0.95] text-slate-950">
                Arquitectura <br /> 
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-600 via-blue-600 to-indigo-600 font-light italic">Territorial</span> <br />
                Inteligente.
              </h1>

              <div className="max-w-2xl">
                <p className="text-lg md:text-xl text-slate-600 font-light leading-relaxed">
                  Transformamos la complejidad geográfica en infraestructura de datos soberana para el sector público y privado de alta escala, bajo estándares estrictos <span className="text-cyan-600 font-mono text-xs border border-cyan-500/20 bg-cyan-500/5 px-1.5 py-0.5 rounded">LADM-COL v3.0</span>.
                </p>
              </div>

              <div className="flex flex-col sm:flex-row items-center gap-6 pt-4">
                <Link
                  href="/projects"
                  prefetch={false}
                  className="w-full sm:w-auto px-10 py-5 bg-slate-950 text-white text-[10px] font-black uppercase tracking-[0.3em] hover:bg-cyan-500 hover:text-black transition-all duration-300 shadow-xl hover:shadow-[0_8px_30px_rgba(6,182,212,0.25)] rounded-sm text-center"
                >
                  Explorar Proyectos
                </Link>
                <Link
                  href="/about"
                  prefetch={false}
                  className="w-full sm:w-auto px-10 py-5 border border-slate-200 bg-white/70 text-slate-700 hover:text-slate-950 text-[10px] font-black uppercase tracking-[0.3em] hover:bg-slate-50 hover:border-slate-350 transition-all duration-300 backdrop-blur-md rounded-sm text-center"
                >
                  Nuestro Manifiesto
                </Link>
              </div>
            </motion.div>

            {/* Core Standards HUD Card (Lateral Hero) */}
            <motion.div 
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 1, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
              className="hidden lg:block lg:col-span-4 pt-20"
            >
               <div className="p-8 glass-card-premium rounded-[2rem] border-glow space-y-8 relative overflow-hidden">
                  <div className="absolute top-0 right-0 w-24 h-24 bg-cyan-500/5 rounded-full blur-3xl pointer-events-none"></div>
                  
                  <div className="space-y-2">
                    <div className="text-[9px] font-mono text-cyan-600 uppercase tracking-widest flex items-center gap-2">
                      <span className="w-1.5 h-1.5 bg-cyan-500 rounded-full animate-pulse"></span>
                      Core Standard
                    </div>
                    <div className="text-sm font-bold uppercase tracking-widest text-slate-900">LADM-COL v3.0 // ISO 19152</div>
                  </div>
                  
                  <div className="space-y-2">
                    <div className="text-[9px] font-mono text-slate-400 uppercase tracking-widest flex items-center gap-2">
                      <span className="w-1.5 h-1.5 bg-slate-400 rounded-full"></span>
                      Processing Engine
                    </div>
                    <div className="text-sm font-bold uppercase tracking-widest text-slate-700">High-Performance Geodata</div>
                  </div>
                  
                  <div className="space-y-2">
                    <div className="text-[9px] font-mono text-emerald-600 uppercase tracking-widest flex items-center gap-2">
                      <span className="w-1.5 h-1.5 bg-emerald-500 rounded-full animate-ping"></span>
                      Jurisdiction
                    </div>
                    <div className="text-sm font-bold uppercase tracking-widest text-slate-700">Colombia // LATAM Coverage</div>
                  </div>
               </div>
            </motion.div>

          </div>
        </div>
      </section>

      {/* Trust Bar - High Tech Ticker */}
      <section className="py-20 border-y border-slate-100 bg-white/50 backdrop-blur-md relative overflow-hidden">
        <div className="absolute inset-0 opacity-[0.03] pointer-events-none bg-[radial-gradient(#000_1px,transparent_1px)] [background-size:16px_16px]"></div>
        <div className="max-w-7xl mx-auto px-6 mb-10 relative z-10">
          <div className="text-[9px] font-mono text-slate-400 uppercase tracking-[0.4em] text-center font-bold">
            Trusted by Government & Industry Leaders
          </div>
        </div>
        <div className="relative z-10">
          <TechTicker />
        </div>
      </section>

      {/* Strategic Vision - 3 Pillars (Glassmorphic Cards) */}
      <section className="py-36 px-6 relative section-deferred bg-transparent">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-cyan-500/5 rounded-full blur-3xl pointer-events-none"></div>
        <div className="max-w-7xl mx-auto relative z-10">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Gobernanza */}
            <div 
              className="glass-card-premium p-12 rounded-[2rem] border-glow space-y-8 glow-cyan-hover scroll-reveal"
            >
              <div className="w-14 h-14 bg-slate-50 border border-slate-255/80 rounded-2xl flex items-center justify-center text-xl shadow-md relative group overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-br from-cyan-500/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity"></div>
                <Shield className="w-6 h-6 text-cyan-600" />
              </div>
              <h3 className="text-2xl font-black tracking-tight text-slate-900">Gobernanza</h3>
              <p className="text-slate-600 font-light leading-relaxed text-sm">
                Implementación rigurosa de estándares internacionales para la seguridad jurídica del territorio nacional bajo normativas oficiales.
              </p>
            </div>

            {/* Ingeniería */}
            <div 
              className="glass-card-premium p-12 rounded-[2rem] border-glow space-y-8 glow-cyan-hover scroll-reveal"
            >
              <div className="w-14 h-14 bg-slate-50 border border-slate-255/80 rounded-2xl flex items-center justify-center text-xl shadow-md relative group overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-br from-blue-500/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity"></div>
                <Settings className="w-6 h-6 text-blue-600" />
              </div>
              <h3 className="text-2xl font-black tracking-tight text-slate-900">Ingeniería</h3>
              <p className="text-slate-600 font-light leading-relaxed text-sm">
                Pipelines desatendidos de procesamiento paralelo (Polars, DuckDB) con precisión milimétrica y validación automática de topologías.
              </p>
            </div>

            {/* Inteligencia */}
            <div 
              className="glass-card-premium p-12 rounded-[2rem] border-glow space-y-8 glow-cyan-hover scroll-reveal"
            >
              <div className="w-14 h-14 bg-slate-50 border border-slate-255/80 rounded-2xl flex items-center justify-center text-xl shadow-md relative group overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-br from-emerald-500/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity"></div>
                <Brain className="w-6 h-6 text-emerald-600" />
              </div>
              <h3 className="text-2xl font-black tracking-tight text-slate-900">Inteligencia</h3>
              <p className="text-slate-600 font-light leading-relaxed text-sm">
                Visualización geoespacial táctica 3D interactiva y consultas semánticas Geo-LLM para el análisis de impacto fiscal predial.
              </p>
            </div>
          </div>
        </div>
      </section>

      <ServicesSection />

      {/* Territorial Control - Interactive Section */}
      <section className="py-24 relative overflow-hidden section-deferred bg-transparent">
        <div className="max-w-7xl mx-auto px-6 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 items-center">
            
            <div 
              className="lg:col-span-5 space-y-8 relative z-10 scroll-reveal"
            >
              <div className="text-[9px] font-mono text-cyan-600 uppercase tracking-[0.5em] flex items-center gap-2 font-bold">
                <span className="w-1.5 h-1.5 bg-cyan-500 rounded-full animate-ping"></span>
                Live Intelligence Stream
              </div>
              <h2 className="text-4xl md:text-6xl font-black tracking-tighter leading-tight text-slate-950">
                Control Total del <br /> 
                <span className="text-slate-400 font-light italic">Activo Espacial.</span>
              </h2>
              <p className="text-slate-600 text-lg font-light leading-relaxed">
                Nuestra plataforma unificada permite el monitoreo en tiempo real de la dinámica predial y la infraestructura crítica con protocolos criptográficos y auditoría distribuida.
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
              <SovereignMapWrapper />
              <div className="absolute top-6 left-6 p-4 glass-card-premium rounded-xl border border-slate-200/50 z-20 shadow-md">
                <div className="flex items-center gap-3">
                  <div className="w-2 h-2 bg-emerald-500 rounded-full animate-pulse shadow-[0_0_8px_#10b981]"></div>
                  <span className="text-[9px] font-mono text-slate-900 uppercase tracking-widest font-black">
                    Tactical View: Operational
                  </span>
                </div>
              </div>
              
              <div className="absolute top-6 right-6 z-20">
                <Link
                  href="/projects"
                  prefetch={false}
                  className="flex items-center gap-2 px-5 py-3 bg-slate-950 hover:bg-slate-900 border border-slate-800 hover:border-cyan-500/50 rounded-xl text-[9px] font-mono text-white uppercase tracking-[0.2em] font-black transition-all duration-300 hover:scale-105 shadow-2xl hover:shadow-[0_0_20px_rgba(6,182,212,0.3)] group/btn"
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
                    src="/assets/img/blog-ladm-col.png" 
                    alt="LADM-COL" 
                    fill
                    sizes="(max-width: 768px) 100vw, 50vw"
                    className="object-cover grayscale group-hover:grayscale-0 group-hover:scale-[1.03] transition-all duration-700" 
                  />
                </div>
                <div className="space-y-2 pl-4">
                  <span className="text-[9px] font-mono text-cyan-600 uppercase tracking-widest font-bold">Caso de Exito // Valle</span>
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
                    src="/assets/img/blog-cybersecurity.png" 
                    alt="Cybersecurity" 
                    fill
                    sizes="(max-width: 768px) 100vw, 50vw"
                    className="object-cover grayscale group-hover:grayscale-0 group-hover:scale-[1.03] transition-all duration-700" 
                  />
                </div>
                <div className="space-y-2 pl-4">
                  <span className="text-[9px] font-mono text-emerald-600 uppercase tracking-widest font-bold">Ciberseguridad // Zero-Trust</span>
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
      <GlobalPartners />

      <ContactSection />
      <FooterSection />
    </main>
  );
}
