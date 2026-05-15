"use client";
import { motion } from "framer-motion";
import Link from "next/link";
import dynamic from "next/dynamic";
import Logo from "../components/Logo";
import ContactSection from "../components/ContactSection";
import FooterSection from "../components/FooterSection";
import TechTicker from "../components/TechTicker";

const SpatialIntelligenceDashboard = dynamic(
  () => import("../components/SpatialIntelligenceDashboard"),
  { ssr: false }
);

export default function Home() {
  return (
    <main className="bg-[#fcfcfc] min-h-screen text-[#1a1a1a] selection:bg-slate-200 overflow-x-hidden">
      
      {/* Hero Section - Institutional Power */}
      <section className="relative pt-48 pb-32 px-6 overflow-hidden">
        {/* Advanced Engineering Background - Dynamic Scanning */}
        <div className="absolute inset-0 z-0 pointer-events-none overflow-hidden">
          <div className="absolute inset-0 opacity-[0.03]" style={{ backgroundImage: `linear-gradient(#1a1a1a 1px, transparent 1px), linear-gradient(90deg, #1a1a1a 1px, transparent 1px)`, backgroundSize: '40px 40px' }}></div>
          <motion.div
            initial={{ top: "-10%" }}
            animate={{ top: "110%" }}
            transition={{ duration: 8, repeat: Infinity, ease: "linear" }}
            className="absolute left-0 w-full h-[2px] bg-gradient-to-r from-transparent via-slate-400 to-transparent shadow-[0_0_15px_rgba(148,163,184,0.5)]"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-[#fcfcfc] via-transparent to-[#fcfcfc]"></div>
        </div>

        <div className="max-w-7xl mx-auto relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 items-start">
            <div className="lg:col-span-8 space-y-12">
              <div className="flex items-center gap-4">
                <span className="w-12 h-px bg-[#1a1a1a]"></span>
                <span className="text-[10px] font-mono uppercase tracking-[0.5em] text-slate-500 font-bold">Engineering Sovereignty // 2026</span>
              </div>
              
              <h1 className="text-7xl md:text-9xl font-black tracking-tighter leading-[0.85] text-[#1a1a1a]">
                Arquitectura <br /> 
                <span className="text-slate-400 italic font-light">Territorial</span> <br />
                Inteligente.
              </h1>

              <div className="max-w-2xl">
                <p className="text-xl md:text-2xl text-slate-500 font-light leading-relaxed">
                  Transformamos la complejidad geográfica en infraestructura de datos soberana para el sector público y privado de alta escala.
                </p>
              </div>

              <div className="flex flex-col sm:flex-row items-center gap-6 pt-4">
                <Link
                  href="/projects"
                  className="px-10 py-5 bg-[#1a1a1a] text-white text-[10px] font-black uppercase tracking-[0.3em] hover:bg-slate-800 transition-all shadow-2xl"
                >
                  Explorar Proyectos
                </Link>
                <Link
                  href="/about"
                  className="px-10 py-5 border border-slate-200 text-[#1a1a1a] text-[10px] font-black uppercase tracking-[0.3em] hover:bg-slate-50 transition-all"
                >
                  Nuestro Manifiesto
                </Link>
              </div>
            </div>

            <div className="hidden lg:block lg:col-span-4 pt-20">
               <div className="p-8 border-l border-slate-100 space-y-10">
                  <div className="space-y-2">
                    <div className="text-[9px] font-mono text-slate-400 uppercase tracking-widest">Core Standard</div>
                    <div className="text-sm font-bold uppercase tracking-widest">LADM-COL v3.0 // ISO 19152</div>
                  </div>
                  <div className="space-y-2">
                    <div className="text-[9px] font-mono text-slate-400 uppercase tracking-widest">Processing Engine</div>
                    <div className="text-sm font-bold uppercase tracking-widest">High-Performance Geodata</div>
                  </div>
                  <div className="space-y-2">
                    <div className="text-[9px] font-mono text-slate-400 uppercase tracking-widest">Jurisdiction</div>
                    <div className="text-sm font-bold uppercase tracking-widest">Colombia // LATAM Coverage</div>
                  </div>
               </div>
            </div>
          </div>
        </div>
      </section>

      {/* Trust Bar - Institutional Ticker */}
      <section className="py-20 border-y border-slate-100 bg-white">
        <div className="max-w-7xl mx-auto px-6 mb-10">
          <div className="text-[9px] font-mono text-slate-400 uppercase tracking-[0.4em] text-center">Trusted by Government & Industry Leaders</div>
        </div>
        <TechTicker />
      </section>

      {/* Strategic Vision - 3 Pillars */}
      <section className="py-32 px-6">
        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-px bg-slate-100 border border-slate-100">
          <div className="bg-[#fcfcfc] p-16 space-y-8 hover:bg-white transition-colors">
            <div className="w-12 h-12 bg-slate-100 flex items-center justify-center text-xl">🏛️</div>
            <h3 className="text-2xl font-black tracking-tight">Gobernanza</h3>
            <p className="text-slate-500 font-light leading-relaxed text-sm">Implementación de estándares internacionales para la seguridad jurídica del territorio nacional.</p>
          </div>
          <div className="bg-[#fcfcfc] p-16 space-y-8 hover:bg-white transition-colors">
            <div className="w-12 h-12 bg-slate-100 flex items-center justify-center text-xl">⚙️</div>
            <h3 className="text-2xl font-black tracking-tight">Ingeniería</h3>
            <p className="text-slate-500 font-light leading-relaxed text-sm">Pipelines de procesamiento masivo desatendido con precisión milimétrica y validación automática.</p>
          </div>
          <div className="bg-[#fcfcfc] p-16 space-y-8 hover:bg-white transition-colors">
            <div className="w-12 h-12 bg-slate-100 flex items-center justify-center text-xl">🧠</div>
            <h3 className="text-2xl font-black tracking-tight">Inteligencia</h3>
            <p className="text-slate-500 font-light leading-relaxed text-sm">Visualización táctica de activos territoriales y simulación de escenarios de impacto fiscal.</p>
          </div>
        </div>
      </section>

      {/* Territorial Control - Interactive Section */}
      <section className="py-20 bg-[#1a1a1a] text-white overflow-hidden relative">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <div className="space-y-8 relative z-10">
              <div className="text-[9px] font-mono text-slate-500 uppercase tracking-[0.5em]">Live Intelligence Stream</div>
              <h2 className="text-4xl md:text-6xl font-black tracking-tighter leading-tight">
                Control Total del <br /> <span className="text-slate-500 font-light italic">Activo Espacial.</span>
              </h2>
              <p className="text-slate-400 text-lg font-light leading-relaxed">
                Nuestra plataforma unificada permite el monitoreo en tiempo real de la dinámica predial y la infraestructura crítica con protocolos de seguridad de alto nivel.
              </p>
              <div className="pt-4">
                <Link href="/standards" className="inline-flex items-center gap-4 text-[10px] font-bold uppercase tracking-[0.2em] text-white group">
                  Ver Protocolos de Seguridad
                  <span className="w-12 h-px bg-white transition-all group-hover:w-20"></span>
                </Link>
              </div>
            </div>
            
            <div className="h-[480px] bg-white/5 border border-white/10 rounded-sm overflow-hidden relative group shadow-2xl">
              <SpatialIntelligenceDashboard />
              <div className="absolute top-4 left-4 p-3 bg-white/10 backdrop-blur-md border border-white/5 rounded-sm">
                <div className="flex items-center gap-3">
                  <div className="w-1.5 h-1.5 bg-emerald-500 rounded-full animate-pulse"></div>
                  <span className="text-[8px] font-mono text-white uppercase tracking-widest font-black">Tactical View: Activated</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Insights - Link to Journal */}
      <section className="py-24 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col md:flex-row justify-between items-end mb-16 gap-8">
            <div className="space-y-4">
              <div className="text-[10px] font-mono text-slate-400 uppercase tracking-widest">Engineering Journal</div>
              <h2 className="text-4xl md:text-5xl font-black tracking-tighter text-[#1a1a1a]">Pensamiento <span className="text-slate-400 italic font-light">Estratégico</span></h2>
            </div>
            <Link href="/blog" className="text-[10px] font-black uppercase tracking-widest border-b-2 border-[#1a1a1a] pb-1 hover:text-slate-500 hover:border-slate-300 transition-all">
              Ver todas las publicaciones
            </Link>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            <Link href="/blog/1" className="group space-y-6">
              <div className="aspect-video bg-slate-100 overflow-hidden rounded-sm">
                <img src="https://images.unsplash.com/photo-1451187580459-43490279c0fa?auto=format&fit=crop&q=80&w=1200" className="w-full h-full object-cover grayscale-[0.5] group-hover:grayscale-0 group-hover:scale-105 transition-all duration-700" alt="LADM-COL" />
              </div>
              <div className="space-y-2">
                <h3 className="text-xl font-black tracking-tight group-hover:text-slate-600 transition-colors">La Nueva Era del Catastro Multipropósito</h3>
                <p className="text-slate-500 font-light text-sm line-clamp-2">Análisis profundo sobre la implementación del estándar LADM-COL en el Valle del Cauca y su impacto fiscal.</p>
              </div>
            </Link>
            <Link href="/blog/2" className="group space-y-6">
              <div className="aspect-video bg-slate-100 overflow-hidden rounded-sm">
                <img src="https://images.unsplash.com/photo-1558494949-ef010cbdcc51?auto=format&fit=crop&q=80&w=1200" className="w-full h-full object-cover grayscale-[0.5] group-hover:grayscale-0 group-hover:scale-105 transition-all duration-700" alt="Cybersecurity" />
              </div>
              <div className="space-y-2">
                <h3 className="text-xl font-black tracking-tight group-hover:text-slate-600 transition-colors">Ciberseguridad Geográfica</h3>
                <p className="text-slate-500 font-light text-sm line-clamp-2">Cómo protegemos los activos territoriales del país mediante arquitecturas Zero Trust y protocolos ICDE.</p>
              </div>
            </Link>
          </div>
        </div>
      </section>

      <ContactSection />

      <FooterSection />
    </main>
  );
}
