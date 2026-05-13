"use client";

import { useRef, useState, useEffect } from "react";
import OfficialGISDemo from "./OfficialGISDemo";
import RealDataSimulator from "./RealDataSimulator";
import OperationalWorkflow from "./OperationalWorkflow";
import SpatialLabSection from "./SpatialLabSection";

export default function InteractiveCarousel() {
  const scrollRef = useRef(null);
  const [activeIndex, setActiveIndex] = useState(0);

  const sections = [
    { id: "gis", component: <OfficialGISDemo />, label: "GIS Engine" },
    { id: "igac", component: <RealDataSimulator />, label: "Integración IGAC" },
    { id: "pipeline", component: <OperationalWorkflow />, label: "Pipeline" },
    { id: "lab", component: <SpatialLabSection />, label: "Laboratorio" },
  ];

  const scrollTo = (index) => {
    if (scrollRef.current) {
      const scrollAmount = scrollRef.current.offsetWidth * index;
      scrollRef.current.scrollTo({
        left: scrollAmount,
        behavior: "smooth",
      });
      setActiveIndex(index);
    }
  };

  const handleScroll = () => {
    if (scrollRef.current) {
      const index = Math.round(scrollRef.current.scrollLeft / scrollRef.current.offsetWidth);
      setActiveIndex(index);
    }
  };

  return (
    <section className="relative w-full bg-[#02040a] py-24 lg:py-32 overflow-hidden border-t border-slate-900">
      {/* Navigation HUD */}
      <div className="max-w-[1400px] mx-auto px-6 mb-16 flex flex-col md:flex-row justify-between items-start md:items-end gap-8 relative z-20">
        <div className="space-y-4">
          <div className="flex items-center gap-3">
            <div className="w-12 h-[2px] bg-gradient-to-r from-cyan-500 to-transparent"></div>
            <span className="text-xs font-mono text-cyan-400 uppercase tracking-[0.4em] font-bold">Interactive_Labs // v2.0</span>
          </div>
          <h2 className="text-5xl md:text-6xl lg:text-7xl font-black text-white tracking-tighter leading-none">
            Ecosistema <br className="hidden md:block"/> <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-blue-500 to-indigo-500 drop-shadow-[0_0_30px_rgba(6,182,212,0.3)]">Dinámico</span>
          </h2>
        </div>

        <div className="flex flex-wrap items-center gap-3 bg-slate-900/60 p-2.5 rounded-2xl border border-slate-800/80 backdrop-blur-xl shadow-2xl">
          {sections.map((s, i) => (
            <button
              key={s.id}
              onClick={() => scrollTo(i)}
              className={`px-5 py-3 rounded-xl text-[10px] sm:text-xs font-mono uppercase tracking-[0.15em] transition-all duration-300 ${
                activeIndex === i
                  ? "bg-cyan-500 text-black font-black shadow-[0_0_20px_rgba(6,182,212,0.5)] transform scale-[1.02]"
                  : "text-slate-400 hover:text-white hover:bg-slate-800/50"
              }`}
            >
              {s.label}
            </button>
          ))}
        </div>
      </div>

      {/* Carousel Container */}
      <div 
        ref={scrollRef}
        onScroll={handleScroll}
        className="flex overflow-x-auto snap-x snap-mandatory scrollbar-hide pb-16 pt-8 items-center"
        style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
      >
        {/* Spacer for proper centering of first item */}
        <div className="w-[5vw] lg:w-[calc(50vw-650px)] flex-shrink-0"></div>

        {sections.map((s, i) => (
          <div key={s.id} className="w-[90vw] lg:w-[1300px] flex-shrink-0 snap-center px-4 md:px-8">
             <div 
               onClick={() => activeIndex !== i && scrollTo(i)}
               className={`w-full mx-auto transform transition-all duration-1000 ease-[cubic-bezier(0.25,1,0.5,1)] origin-center rounded-[3rem] overflow-hidden shadow-2xl border border-slate-800/80 bg-[#050810] relative ${
                 activeIndex === i 
                   ? "scale-100 opacity-100 shadow-[0_30px_100px_-20px_rgba(6,182,212,0.4)] translate-y-0" 
                   : "scale-[0.85] opacity-40 blur-[3px] grayscale-[70%] translate-y-12 hover:scale-[0.88] hover:opacity-60 cursor-pointer hover:blur-[1px]"
               }`}
             >
                {/* Premium Inner Glow */}
                <div className="pointer-events-none absolute inset-0 rounded-[3rem] shadow-[inset_0_0_0_1px_rgba(255,255,255,0.05),inset_0_20px_40px_rgba(255,255,255,0.02)] z-50"></div>
                
                {/* Wrapper to control component size and clipping */}
                <div className={`transition-all duration-700 w-full h-full ${activeIndex === i ? 'pointer-events-auto' : 'pointer-events-none'}`}>
                   {s.component}
                </div>
             </div>
          </div>
        ))}

        {/* Spacer for proper centering of last item */}
        <div className="w-[5vw] lg:w-[calc(50vw-650px)] flex-shrink-0"></div>
      </div>

      {/* Scroll Indicators */}
      <div className="flex justify-center gap-3 mt-8">
        {sections.map((_, i) => (
          <div 
            key={i}
            className={`h-1.5 rounded-full transition-all duration-500 cursor-pointer ${
              activeIndex === i ? "w-16 bg-cyan-500 shadow-[0_0_10px_rgba(6,182,212,0.5)]" : "w-3 bg-slate-800 hover:bg-slate-700"
            }`}
            onClick={() => scrollTo(i)}
          ></div>
        ))}
      </div>
    </section>
  );
}
