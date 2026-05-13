"use client";
import { useState, useEffect } from "react";
import Logo from "./Logo";
export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navLinks = [
    { name: "Inicio", href: "#" },
    { name: "Qué hacemos", href: "#summary" },
    { name: "Servicios", href: "#capabilities" },
    { name: "Laboratorio", href: "#lab" },
    { name: "Contacto", href: "#contact" }
  ];

  return (
    <nav className={`fixed top-0 left-0 w-full z-[100] transition-all duration-300 ${scrolled ? 'py-4 bg-[#02040a]/80 backdrop-blur-xl border-b border-white/5 shadow-2xl' : 'py-8 bg-transparent'}`}>
      <div className="max-w-7xl mx-auto px-6 flex items-center justify-between">
        {/* Logo */}
        <div className="flex items-center gap-3 group cursor-pointer" onClick={() => window.scrollTo({top: 0, behavior: 'smooth'})}>
          <Logo className="w-9 h-9" />
          <span className="text-2xl font-black tracking-tighter text-white">Dev<span className="text-cyan-400">Giz</span></span>
        </div>

        {/* Desktop Links */}
        <div className="hidden md:flex items-center gap-8">
          {navLinks.map((link) => (
            <a 
              key={link.name} 
              href={link.href}
              className="text-xs font-mono tracking-widest uppercase text-slate-400 hover:text-cyan-400 transition-colors"
            >
              {link.name}
            </a>
          ))}
          <a 
            href="#contact" 
            className="px-5 py-2 text-[10px] font-mono tracking-[0.2em] uppercase border border-cyan-500/50 text-cyan-400 rounded-full hover:bg-cyan-500 hover:text-white transition-all shadow-[0_0_10px_rgba(0,229,255,0.2)]"
          >
            Consultoría
          </a>
        </div>

        {/* Mobile Indicator */}
        <div className="md:hidden text-cyan-500">
           <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16m-7 6h7" /></svg>
        </div>
      </div>
    </nav>
  );
}
