"use client";
import { useState, useEffect } from "react";
import Link from "next/link";
import Logo from "./Logo";

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navLinks = [
    { name: "Inicio", href: "/" },
    { name: "Nosotros", href: "/about" },
    { name: "Estándares", href: "/standards" },
    { name: "Proyectos", href: "/projects" },
    { name: "Journal", href: "/blog" },
    { name: "FAQ", href: "/faq" }
  ];

  return (
    <nav className={`fixed top-0 left-0 w-full z-[100] transition-all duration-500 ${scrolled ? 'py-4 bg-white/80 backdrop-blur-md border-b border-slate-100 shadow-sm' : 'py-8 bg-transparent'}`}>
      <div className="max-w-7xl mx-auto px-6 flex items-center justify-between">
        {/* Logo Section */}
        <Link href="/" className="flex items-center gap-3 group cursor-pointer">
          <Logo className="w-8 h-8 transition-transform group-hover:scale-110" />
          <div className="flex flex-col leading-none">
            <span className="text-xl font-black tracking-tighter text-[#1a1a1a]">DevGiz</span>
            <span className="text-[7px] font-mono uppercase tracking-[0.3em] text-slate-400 font-bold">Engineering</span>
          </div>
        </Link>

        {/* Desktop Links - Editorial Style */}
        <div className="hidden md:flex items-center gap-10">
          {navLinks.map((link) => (
            <Link
              key={link.name}
              href={link.href}
              className="text-[10px] font-bold tracking-[0.2em] uppercase text-slate-500 hover:text-[#1a1a1a] transition-all relative group"
            >
              {link.name}
              <span className="absolute -bottom-1 left-0 w-0 h-px bg-[#1a1a1a] transition-all group-hover:w-full"></span>
            </Link>
          ))}

          <Link
            href="/#contact"
            className="px-8 py-3 bg-[#1a1a1a] text-white text-[9px] font-black tracking-[0.2em] uppercase hover:bg-slate-800 transition-all shadow-xl"
          >
            Consultoría
          </Link>
        </div>

        {/* Mobile Indicator */}
        <div className="md:hidden text-[#1a1a1a]">
          <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16m-7 6h7" /></svg>
        </div>
      </div>
    </nav>
  );
}
