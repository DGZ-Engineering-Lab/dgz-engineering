import ExecutiveSummarySection from "../components/ExecutiveSummarySection";
import ProfessionalProfile from "../components/ProfessionalProfile";
import ServicesSection from "../components/ServicesSection";
import OperationalWorkflow from "../components/OperationalWorkflow";
import SpatialLabSection from "../components/SpatialLabSection";
import TechnicalEcosystem from "../components/TechnicalEcosystem";
import ImpactMetrics from "../components/ImpactMetrics";
import ContactSection from "../components/ContactSection";
import FooterSection from "../components/FooterSection";

export default function Home() {
  return (
    <>
      <div className="flex flex-col items-center justify-center flex-1 px-6 text-center min-h-[90vh] relative z-10 pt-32 pb-20 overflow-hidden">
        <div className="absolute inset-0 pointer-events-none flex items-center justify-center">
          <div className="w-[800px] h-[800px] bg-cyan-500/10 rounded-full blur-[150px] mix-blend-screen opacity-50 animate-pulse"></div>
          <div className="w-[600px] h-[600px] bg-purple-500/10 rounded-full blur-[120px] mix-blend-screen opacity-40 absolute top-1/4 right-1/4"></div>
        </div>

        <div className="max-w-5xl mx-auto space-y-10 w-full relative z-10">
          
          {/* Status Badge */}
          <div className="inline-flex items-center gap-3 px-5 py-2.5 border rounded-full border-cyan-500/30 bg-[#0a0f16]/80 backdrop-blur-md mx-auto shadow-[0_0_20px_rgba(0,229,255,0.15)] group hover:border-cyan-400/50 transition-colors">
            <span className="relative flex h-2.5 w-2.5">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-cyan-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-cyan-500"></span>
            </span>
            <span className="text-xs md:text-sm tracking-[0.2em] text-cyan-300 font-mono font-bold">
              SISTEMA_OPERATIVO //_ÓPTIMO
            </span>
          </div>
          
          {/* Main Title */}
          <div className="space-y-4">
            <h1 className="text-6xl md:text-8xl lg:text-[7rem] font-extrabold tracking-tighter text-white drop-shadow-[0_0_15px_rgba(0,229,255,0.2)]">
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-white via-cyan-100 to-white">
                Dev
              </span>
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-blue-500 to-purple-600">
                Giz
              </span>
            </h1>
            <p className="text-xl md:text-2xl font-mono text-cyan-500 tracking-widest uppercase opacity-80">
              Arquitectura Territorial Inteligente
            </p>
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

      <ExecutiveSummarySection />
      <ImpactMetrics />
      <ProfessionalProfile />
      <ServicesSection />
      <OperationalWorkflow />
      <SpatialLabSection />
      <TechnicalEcosystem />
      <ContactSection />
      <FooterSection />
    </>
  );
}
