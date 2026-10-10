"use client";
import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import { motion } from "framer-motion";

export default function NotFound() {
  const [glitchText, setGlitchText] = useState("404");
  const [particles, setParticles] = useState([]);
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });

  // Generate glitch effect on the 404 text
  useEffect(() => {
    const chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789@#$%&*!?";
    const interval = setInterval(() => {
      const shouldGlitch = Math.random() > 0.7;
      if (shouldGlitch) {
        const glitched = "404".split("").map(c => {
          return Math.random() > 0.5 ? chars[Math.floor(Math.random() * chars.length)] : c;
        }).join("");
        setGlitchText(glitched);
        setTimeout(() => setGlitchText("404"), 150);
      }
    }, 2000);
    return () => clearInterval(interval);
  }, []);

  // Generate floating particles
  useEffect(() => {
    let active = true;
    const generated = Array.from({ length: 20 }, (_, i) => ({
      id: i,
      x: Math.random() * 100,
      y: Math.random() * 100,
      size: Math.random() * 3 + 1,
      duration: Math.random() * 10 + 10,
      delay: Math.random() * 5,
    }));
    Promise.resolve().then(() => {
      if (active) {
        setParticles(generated);
      }
    });
    return () => {
      active = false;
    };
  }, []);

  // Track mouse
  useEffect(() => {
    const handleMouseMove = (e) => {
      setMousePos({
        x: (e.clientX / window.innerWidth - 0.5) * 20,
        y: (e.clientY / window.innerHeight - 0.5) * 20,
      });
    };
    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

  return (
    <div className="min-h-screen bg-[#080706] flex items-center justify-center p-6 font-mono selection:bg-red-500 selection:text-white overflow-hidden relative">
      
      {/* Grid Background */}
      <div className="absolute inset-0 opacity-[0.04] pointer-events-none">
        <div className="absolute top-0 left-0 w-full h-full" style={{ 
          backgroundImage: 'linear-gradient(rgba(239, 68, 68, 0.5) 1px, transparent 1px), linear-gradient(90deg, rgba(239, 68, 68, 0.5) 1px, transparent 1px)', 
          backgroundSize: '24px 24px'
        }}></div>
      </div>

      {/* Floating Particles */}
      {particles.map(p => (
        <motion.div
          key={p.id}
          className="absolute rounded-full bg-red-500/30"
          style={{
            left: `${p.x}%`,
            top: `${p.y}%`,
            width: p.size,
            height: p.size,
          }}
          animate={{
            y: [0, -30, 0],
            opacity: [0.2, 0.6, 0.2],
          }}
          transition={{
            duration: p.duration,
            delay: p.delay,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />
      ))}

      {/* Scanline effect */}
      <div className="absolute inset-0 pointer-events-none opacity-[0.015]" style={{
        backgroundImage: 'repeating-linear-gradient(0deg, transparent, transparent 2px, rgba(255,255,255,0.1) 2px, rgba(255,255,255,0.1) 4px)',
      }} />

      {/* Glitch lines */}
      <motion.div
        className="absolute left-0 w-full h-[2px] bg-red-500/20"
        animate={{ top: ["15%", "85%", "15%"] }}
        transition={{ duration: 8, repeat: Infinity, ease: "linear" }}
      />
      <motion.div
        className="absolute left-0 w-full h-[1px] bg-cyan-500/10"
        animate={{ top: ["80%", "20%", "80%"] }}
        transition={{ duration: 12, repeat: Infinity, ease: "linear" }}
      />

      <motion.div 
        className="max-w-2xl w-full space-y-12 relative z-10"
        style={{
          transform: `translate(${mousePos.x * 0.3}px, ${mousePos.y * 0.3}px)`,
        }}
      >
        {/* Header */}
        <motion.div 
          className="space-y-4"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <div className="flex items-center gap-4">
            <div className="w-3 h-3 rounded-full bg-red-500 animate-pulse shadow-[0_0_15px_#ef4444,0_0_40px_rgba(239,68,68,0.3)]"></div>
            <span className="text-red-500 font-black text-xs tracking-[0.4em] uppercase">SYSTEM_CRITICAL_FAILURE</span>
          </div>
          <h1 className="text-8xl md:text-[11rem] font-black text-white tracking-tighter leading-none relative">
            <span className="relative inline-block">
              {glitchText.split("").map((char, i) => (
                <span 
                  key={i} 
                  className={i === 2 ? "text-red-500" : "text-white"}
                  style={{
                    textShadow: i === 2 
                      ? '0 0 20px rgba(239,68,68,0.5), 0 0 40px rgba(239,68,68,0.2)' 
                      : '0 0 10px rgba(255,255,255,0.1)',
                  }}
                >
                  {char}
                </span>
              ))}
            </span>
          </h1>
        </motion.div>

        {/* Panic Description */}
        <motion.div 
          className="bg-red-500/5 border border-red-500/20 p-8 rounded-2xl space-y-6 backdrop-blur-xl shadow-[0_0_40px_rgba(239,68,68,0.05)]"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3, duration: 0.6 }}
        >
          <div className="space-y-2">
            <div className="text-[10px] text-red-400 font-bold uppercase tracking-widest flex items-center gap-2">
              <span className="w-1 h-1 rounded-full bg-red-400 animate-ping" />
              Error_Log: NODE_NOT_FOUND
            </div>
            <p className="text-slate-400 text-sm leading-relaxed">
              El nodo geoespacial solicitado no responde. La ruta ha sido corrompida o el sector territorial ya no existe en el kernel central de DevGiz.
            </p>
          </div>

          <div className="grid grid-cols-3 gap-4 pt-4 border-t border-red-500/10">
            <div>
              <div className="text-[8px] text-slate-500 uppercase mb-1 tracking-widest">Error_ID</div>
              <div className="text-xs text-white font-bold">0xDEADBEEF_404</div>
            </div>
            <div>
              <div className="text-[8px] text-slate-500 uppercase mb-1 tracking-widest">Process_State</div>
              <div className="text-xs text-red-500 font-bold animate-pulse">PANIC_HALT</div>
            </div>
            <div>
              <div className="text-[8px] text-slate-500 uppercase mb-1 tracking-widest">Recovery</div>
              <div className="text-xs text-emerald-400 font-bold">AVAILABLE</div>
            </div>
          </div>
        </motion.div>

        {/* Actions */}
        <motion.div 
          className="flex flex-col md:flex-row items-center gap-6"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6, duration: 0.6 }}
        >
          <Link 
            href="/"
            className="w-full md:w-auto px-10 py-5 bg-white text-black font-black text-[10px] rounded-xl hover:bg-red-500 hover:text-white transition-all uppercase tracking-widest text-center shadow-[0_0_30px_rgba(255,255,255,0.08)] hover:shadow-[0_0_40px_rgba(239,68,68,0.2)] group flex items-center justify-center gap-3"
          >
            Reiniciar Kernel (Home)
            <motion.span
              animate={{ x: [0, 4, 0] }}
              transition={{ repeat: Infinity, duration: 1.5 }}
            >
              →
            </motion.span>
          </Link>
          <button 
            onClick={() => window.history.back()}
            className="w-full md:w-auto px-10 py-5 bg-transparent border border-white/10 text-white font-black text-[10px] rounded-xl hover:bg-white/5 hover:border-white/20 transition-all uppercase tracking-widest cursor-pointer"
          >
            Volver a Zona Segura
          </button>
        </motion.div>

        {/* Footer Trace */}
        <motion.div 
          className="pt-12 text-[8px] text-slate-700 uppercase tracking-[0.5em] text-center"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1, duration: 0.5 }}
        >
          DevGiz Systems // Spatial Intelligence // Bogota_DC_V
        </motion.div>
      </motion.div>
    </div>
  );
}
