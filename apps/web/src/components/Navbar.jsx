"use client";
import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X, ArrowRight } from "lucide-react";
import Logo from "./Logo";

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Close mobile menu on path changes
  useEffect(() => {
    Promise.resolve().then(() => {
      setIsMobileMenuOpen(false);
    });
  }, [pathname]);

  const isDarkPage = pathname?.startsWith("/lab") || pathname?.startsWith("/diagnostic");

  const navLinks = [
    { name: "Inicio", href: "/" },
    { name: "Nosotros", href: "/about" },
    { name: "Estándares", href: "/standards" },
    { name: "Proyectos", href: "/projects" },
    { name: "Diagnóstico", href: "/diagnostic" },
    { name: "Journal", href: "/blog" },
    { name: "Lab", href: "/lab/gesture-sandbox", isBeta: true },
    { name: "FAQ", href: "/faq" }
  ];

  // Dynamic Styles
  const navBackground = scrolled
    ? isDarkPage
      ? "py-4 bg-[#02040a]/90 backdrop-blur-md border-b border-slate-800/80 shadow-lg shadow-black/20"
      : "py-4 bg-white/80 backdrop-blur-md border-b border-slate-100 shadow-sm"
    : "py-8 bg-transparent";

  const logoTextColor = isDarkPage ? "text-white" : "text-[#1a1a1a]";
  
  const linkTextColor = isDarkPage
    ? "text-slate-400 hover:text-white"
    : "text-slate-500 hover:text-[#1a1a1a]";

  const activeLineColor = isDarkPage ? "bg-cyan-400" : "bg-[#1a1a1a]";

  const ctaBtnStyle = isDarkPage
    ? "bg-white text-black hover:bg-cyan-500 hover:text-black shadow-[0_0_15px_rgba(255,255,255,0.1)]"
    : "bg-[#1a1a1a] text-white hover:bg-slate-800 shadow-xl";

  const burgerColor = isDarkPage ? "text-white" : "text-[#1a1a1a]";

  return (
    <>
      <nav className={`fixed top-0 left-0 w-full z-[100] transition-all duration-500 ${navBackground}`}>
        <div className="max-w-7xl mx-auto px-6 flex items-center justify-between">
          
          {/* Logo Section */}
          <Link href="/" className="flex items-center gap-3 group cursor-pointer">
            <Logo className={`w-8 h-8 transition-transform group-hover:scale-110 ${isDarkPage ? 'text-cyan-400' : 'text-[#1a1a1a]'}`} />
            <div className="flex flex-col leading-none">
              <span className={`text-xl font-black tracking-tighter transition-colors duration-300 ${logoTextColor}`}>DevGiz</span>
              <span className="text-[7px] font-mono uppercase tracking-[0.3em] text-slate-400 font-bold">Engineering</span>
            </div>
          </Link>

          {/* Desktop Links - Editorial Style */}
          <div className="hidden md:flex items-center gap-10">
            {navLinks.map((link) => (
              <Link
                key={link.name}
                href={link.href}
                className={`text-[10px] font-bold tracking-[0.2em] uppercase transition-all relative group flex items-center gap-1 ${linkTextColor}`}
              >
                {link.name}
                {link.isBeta && (
                  <span className="px-1.5 py-0.5 bg-cyan-500/10 border border-cyan-500/30 text-cyan-400 font-mono text-[7px] tracking-widest rounded-sm">
                    BETA
                  </span>
                )}
                <span className={`absolute -bottom-1 left-0 w-0 h-px transition-all group-hover:w-full ${activeLineColor}`}></span>
              </Link>
            ))}

            <Link
              href="/#contact"
              className={`px-8 py-3 text-[9px] font-black tracking-[0.2em] uppercase transition-all rounded-sm ${ctaBtnStyle}`}
            >
              Consultoría
            </Link>
          </div>

          {/* Mobile Toggle Button */}
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className={`md:hidden p-2 -mr-2 transition-colors rounded-full focus:outline-none hover:bg-slate-500/10 ${burgerColor}`}
            aria-label="Toggle Menu"
          >
            {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </nav>

      {/* Mobile Navigation Drawer */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3 }}
            className={`fixed inset-0 z-[90] md:hidden pt-32 pb-12 px-6 flex flex-col justify-between ${
              isDarkPage 
                ? "bg-[#02040a] text-white border-b border-slate-800" 
                : "bg-white text-[#1a1a1a] border-b border-slate-200"
            }`}
          >
            {/* Grid overlay for Dark Mode mobil background */}
            {isDarkPage && (
              <div className="absolute inset-0 opacity-[0.02] pointer-events-none">
                <div className="absolute top-0 left-0 w-full h-full" style={{ backgroundImage: 'linear-gradient(rgba(0,229,255,0.2) 1px, transparent 1px), linear-gradient(90deg, rgba(0,229,255,0.2) 1px, transparent 1px)', backgroundSize: '30px 30px' }}></div>
              </div>
            )}

            <div className="flex flex-col gap-6 relative z-10">
              <div className="text-[9px] font-mono text-slate-400 uppercase tracking-[0.3em] mb-4 border-b border-slate-500/10 pb-2">
                Menú de Navegación
              </div>
              <div className="flex flex-col gap-5">
                {navLinks.map((link, idx) => (
                  <motion.div
                    key={link.name}
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: idx * 0.05 }}
                  >
                    <Link
                      href={link.href}
                      className={`text-2xl font-black tracking-tight uppercase flex items-center gap-3 py-2 ${
                        isDarkPage ? 'text-slate-300 hover:text-cyan-400' : 'text-slate-700 hover:text-[#1a1a1a]'
                      }`}
                    >
                      <span>{link.name}</span>
                      {link.isBeta && (
                        <span className="px-2 py-0.5 bg-cyan-500/10 border border-cyan-500/30 text-cyan-400 font-mono text-[9px] tracking-widest rounded-sm font-bold">
                          BETA
                        </span>
                      )}
                    </Link>
                  </motion.div>
                ))}
              </div>
            </div>

            <motion.div 
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="space-y-6 relative z-10"
            >
              <Link
                href="/#contact"
                className={`w-full py-5 text-[10px] font-black tracking-[0.2em] uppercase transition-all rounded-sm flex items-center justify-center gap-3 ${
                  isDarkPage
                    ? 'bg-cyan-500 text-black hover:bg-cyan-400 font-black'
                    : 'bg-[#1a1a1a] text-white hover:bg-slate-800'
                }`}
              >
                <span>Solicitar Consultoría</span>
                <ArrowRight className="w-4 h-4" />
              </Link>
              <div className="text-center text-[8px] font-mono text-slate-400 uppercase tracking-widest">
                DevGiz Spatial Systems // 2026
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
