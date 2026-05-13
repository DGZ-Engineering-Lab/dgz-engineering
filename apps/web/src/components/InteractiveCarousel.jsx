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
    <section className="relative w-full bg-[#02040a] py-20 overflow-hidden">
      {/* Navigation HUD */}
      <div className="max-w-7xl mx-auto px-6 mb-12 flex flex-col md:flex-row justify-between items-center gap-8">
        <div className="space-y-2">
          <div className="flex items-center gap-3">
            <div className="w-8 h-[1px] bg-cyan-500"></div>
            <span className="text-[10px] font-mono text-cyan-500 uppercase tracking-[0.4em]">Interactive_Labs // v2.0</span>
          </div>
          <h2 className="text-4xl md:text-5xl font-black text-white tracking-tighter">
            Ecosistema <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-blue-600">Dinámico</span>
          </h2>
        </div>

        <div className="flex items-center gap-4 bg-slate-900/40 p-2 rounded-2xl border border-white/5 backdrop-blur-xl">
          {sections.map((s, i) => (
            <button
              key={s.id}
              onClick={() => scrollTo(i)}
              className={`px-4 py-2 rounded-xl text-[10px] font-mono uppercase tracking-widest transition-all ${
                activeIndex === i
                  ? "bg-cyan-500 text-black font-black shadow-[0_0_20px_rgba(6,182,212,0.4)]"
                  : "text-slate-500 hover:text-white"
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
        className="flex overflow-x-auto snap-x snap-mandatory scrollbar-hide no-scrollbar pb-16 pt-8 items-center"
        style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
      >
        {/* Spacer for proper centering of first item */}
        <div className="w-[5vw] lg:w-[calc(50vw-550px)] flex-shrink-0"></div>

        {sections.map((s, i) => (
          <div key={s.id} className="w-[90vw] lg:w-[1100px] flex-shrink-0 snap-center px-3 md:px-6">
             <div 
               onClick={() => activeIndex !== i && scrollTo(i)}
               className={`w-full mx-auto transform transition-all duration-1000 ease-[cubic-bezier(0.25,1,0.5,1)] origin-center rounded-[2.5rem] md:rounded-[3rem] overflow-hidden shadow-2xl border border-slate-800/80 bg-[#05070a] relative ${
                 activeIndex === i 
                   ? "scale-100 opacity-100 shadow-[0_20px_70px_-15px_rgba(6,182,212,0.3)] translate-y-0" 
                   : "scale-[0.85] opacity-40 blur-[2px] grayscale-[60%] translate-y-8 hover:scale-[0.88] hover:opacity-60 cursor-pointer"
               }`}
             >
                {/* Premium Inner Glow */}
                <div className="pointer-events-none absolute inset-0 rounded-[2.5rem] md:rounded-[3rem] shadow-[inset_0_0_0_1px_rgba(255,255,255,0.05),inset_0_20px_40px_rgba(255,255,255,0.02)] z-50"></div>
                
                {/* Wrapper to control component size and clipping */}
                <div className={`transition-all duration-700 ${activeIndex === i ? 'pointer-events-auto' : 'pointer-events-none'}`}>
                   {s.component}
                </div>
             </div>
          </div>
        ))}

        {/* Spacer for proper centering of last item */}
        <div className="w-[5vw] lg:w-[calc(50vw-550px)] flex-shrink-0"></div>
      </div>

      {/* Scroll Indicators */}
      <div className="flex justify-center gap-2 mt-12">
        {sections.map((_, i) => (
          <div 
            key={i}
            className={`h-1 rounded-full transition-all duration-500 ${
              activeIndex === i ? "w-12 bg-cyan-500" : "w-2 bg-slate-800"
            }`}
          ></div>
        ))}
      </div>
    </section>
  );
}
