import SystemMonitor from "../components/SystemMonitor";
import AboutSection from "../components/AboutSection";
import ServicesSection from "../components/ServicesSection";
import TechMatrixSection from "../components/TechMatrixSection";
import MetricsSection from "../components/MetricsSection";
import ContactSection from "../components/ContactSection";
import FooterSection from "../components/FooterSection";

export default function Home() {
  return (
    <>
      <div className="flex flex-col items-center justify-center flex-1 px-6 text-center min-h-[90vh] relative z-10 pt-20">
        <div className="max-w-4xl mx-auto space-y-8 w-full">
          <div className="inline-flex items-center gap-2 px-4 py-2 border rounded-full border-cyan-500/30 bg-cyan-500/10 backdrop-blur-sm mx-auto">
            <span className="flex w-2 h-2 rounded-full bg-cyan-400 animate-pulse"></span>
            <span className="text-sm tracking-wider text-cyan-300 font-mono">DGZ_OS_V6.0 //_NOMINAL</span>
          </div>
          
          <h1 className="text-5xl md:text-7xl font-extrabold tracking-tight text-white drop-shadow-[0_0_15px_rgba(0,229,255,0.4)]">
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-purple-500">DevGiz</span>
          </h1>
          
          <p className="max-w-2xl mx-auto text-xl md:text-2xl font-light leading-relaxed text-slate-300">
            Smart Geospatial DevOps Systems — Building Digital Territories
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-8">
            <a
              href="#contact"
              className="px-8 py-4 text-sm font-semibold text-white transition-all bg-cyan-500 rounded-lg hover:bg-cyan-400 shadow-[0_0_20px_rgba(0,229,255,0.3)] hover:shadow-[0_0_30px_rgba(0,229,255,0.5)]"
            >
              INITIATE_HANDSHAKE
            </a>
            <a
              href="#architecture"
              className="px-8 py-4 text-sm font-semibold text-slate-300 transition-all border border-slate-700 rounded-lg hover:bg-slate-800 hover:text-white"
            >
              VIEW_ARCHITECTURE
            </a>
          </div>

          {/* Módulo de Telemetría que se conecta a Render y Neon */}
          <SystemMonitor />
        </div>
      </div>

      <AboutSection />
      <ServicesSection />
      <TechMatrixSection />
      <MetricsSection />
      <ContactSection />
      <FooterSection />
    </>
  );
}
