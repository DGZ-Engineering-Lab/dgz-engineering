import dynamic from "next/dynamic";
import Logo from "../components/Logo";
import ExecutiveSummarySection from "../components/ExecutiveSummarySection";
import ChallengesSection from "../components/ChallengesSection";
import ProfessionalProfile from "../components/ProfessionalProfile";
import TechnicalEcosystem from "../components/TechnicalEcosystem";
import ImpactMetrics from "../components/ImpactMetrics";
import SimpleValueSection from "../components/SimpleValueSection";

import ContactSection from "../components/ContactSection";
import FooterSection from "../components/FooterSection";
import UnifiedCapabilities from "../components/UnifiedCapabilities";
import InteractiveCarousel from "../components/InteractiveCarousel";

import ScrambleText from "../components/ScrambleText";

const SpatialIntelligenceDashboard = dynamic(
  () => import("../components/SpatialIntelligenceDashboard"),
  { ssr: false }
);

export default function Home() {
  return (
    <>
      <div className="flex flex-col items-center justify-center flex-1 px-6 text-center min-h-[95vh] relative z-10 pt-32 pb-20 overflow-hidden">
        <div className="absolute inset-0 pointer-events-none flex items-center justify-center">
          <div className="w-[1000px] h-[1000px] bg-cyan-500/5 rounded-full blur-[150px] mix-blend-screen opacity-50 animate-pulse"></div>
          <div className="w-[800px] h-[800px] bg-purple-500/5 rounded-full blur-[120px] mix-blend-screen opacity-40 absolute top-1/4 right-1/4"></div>
        </div>

        <div className="max-w-5xl mx-auto space-y-12 w-full relative z-10">
          {/* Logo Centerpiece */}
          <div className="flex justify-center mb-4">
            <Logo className="w-32 h-32 md:w-40 md:h-40 drop-shadow-[0_0_50px_rgba(0,229,255,0.2)]" />
          </div>
          
          {/* Main Title */}
          <div className="space-y-4">
            <h1 className="text-7xl md:text-[8rem] font-black tracking-tighter text-white leading-none">
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-white via-slate-200 to-white">
                Dev
              </span>
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-blue-500 to-purple-600">
                Giz
              </span>
            </h1>
            <div className="text-xl md:text-2xl font-mono text-cyan-500 tracking-[0.5em] uppercase opacity-80 font-bold">
              <ScrambleText text="Arquitectura Territorial Inteligente" />
            </div>
          </div>
          
          {/* Subtitle */}
          <p className="max-w-3xl mx-auto text-lg md:text-xl font-light leading-relaxed text-slate-300">
            Transformamos datos territoriales complejos en <span className="text-cyan-400 font-bold">soluciones automáticas y precisas</span> para el sector público y privado.
          </p>

          {/* Call to Actions */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-6 pt-4">
            <a
              href="#lab"
              className="px-8 py-4 text-sm font-bold text-white uppercase tracking-widest transition-all bg-gradient-to-r from-cyan-600 to-blue-600 rounded-lg hover:from-cyan-500 hover:to-blue-500 shadow-[0_0_20px_rgba(0,229,255,0.3)] hover:shadow-[0_0_40px_rgba(0,229,255,0.6)] hover:-translate-y-1"
            >
              🚀 VER ECOSISTEMA
            </a>
            <a
              href="#contact"
              className="px-8 py-4 text-sm font-bold text-slate-300 uppercase tracking-widest transition-all border border-slate-700 bg-slate-900/50 rounded-lg hover:bg-slate-800 hover:text-white hover:border-slate-500 hover:-translate-y-1"
            >
              SOLUCIONES ENTERPRISE
            </a>
          </div>
        </div>
      </div>

      <div className="reveal" style={{ animationDelay: '0.2s' }}>
        <ExecutiveSummarySection />
      </div>
      <div className="reveal" style={{ animationDelay: '0.3s' }}>
        <ChallengesSection />
      </div>
      <div className="reveal" style={{ animationDelay: '0.4s' }}>
        <ImpactMetrics />
      </div>
      <div className="reveal">
        <SpatialIntelligenceDashboard />
      </div>
      <div className="reveal" style={{ animationDelay: '0.5s' }}>
        <ProfessionalProfile />
      </div>

      
      {/* Unified Enterprise Layer */}
      <div className="reveal">
        <UnifiedCapabilities />
      </div>
      
      {/* Interactive Labs Layer */}
      <div id="lab" className="reveal">
        <InteractiveCarousel />
      </div>

      <div className="reveal">
        <TechnicalEcosystem />
      </div>
      <div className="reveal">
        <SimpleValueSection />
      </div>
      <ContactSection />
      <FooterSection />
    </>
  );
}
