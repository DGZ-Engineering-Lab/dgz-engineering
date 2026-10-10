"use client";
import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { 
  Menu, 
  X, 
  ArrowRight, 
  ChevronDown, 
  Globe, 
  Shield, 
  FolderGit, 
  FileCheck2, 
  FlaskConical,
  BookOpen,
  HelpCircle,
  Activity
} from "lucide-react";
import Logo from "./Logo";

// Complete mapping of all dynamic sub-pages and sections within DevGiz
const DROPDOWNS_DATA = {
  Proyectos: {
    desc: "Casos de éxito aplicados con impacto real en infraestructura pública y privada.",
    icon: FolderGit,
    items: [
      { name: "Galería de Proyectos", desc: "Explora la totalidad de nuestro catálogo interactivo.", href: "/projects" },
      { name: "Catastro Valle del Cauca", desc: "Soberanía fiscal y LADM-COL predial.", href: "/projects/catastro-valle" },
      { name: "Validador QGIS Plugin", desc: "Control topológico nativo en tiempo real.", href: "/projects/qgis-plugin" },
      { name: "Data Pipelines & ETL", desc: "Orquestación masiva para gestores catastrales.", href: "/projects/automation-systems" },
      { name: "Inteligencia GeoAI", desc: "Procesamiento de lenguaje natural y motores GIS.", href: "/projects/geo-llm" }
    ]
  },
  Blogs: {
    desc: "Análisis rigurosos sobre ciberseguridad geoespacial, estándar LADM-COL e infraestructura digital.",
    icon: BookOpen,
    items: [
      { name: "Todos los Blogs", desc: "Ver el catálogo completo de publicaciones y análisis técnicos.", href: "/blog" },
      { name: "Soberanía Digital", desc: "Protección de activos territoriales y ciberseguridad.", href: "/blog/1" },
      { name: "El Estándar LADM-COL", desc: "Eje de interoperabilidad e integración de datos.", href: "/blog/2" },
      { name: "ConstruMetrix & Precisión", desc: "La digitalización del entorno construido en 3D.", href: "/blog/3" },
      { name: "Trazabilidad de Tierras", desc: "Auditoría digital en sistemas de gestión territorial.", href: "/blog/4" }
    ]
  }
};

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState(null); // 'Nosotros', 'Estándares', etc.
  const [expandedMobileSection, setExpandedMobileSection] = useState(null);
  const pathname = usePathname();
  const dropdownRef = useRef(null);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Close menus on path changes
  useEffect(() => {
    setIsMobileMenuOpen(false);
    setActiveDropdown(null);
  }, [pathname]);

  // La navegación es siempre "obsidiana": ancla visual de la marca en toda la plataforma.
  const isDarkPage = true;
  const isHome = pathname === "/";

  const navLinks = [
    { name: "Inicio", href: "/" },
    { name: "Nosotros", href: "/about" },
    { name: "Estándares", href: "/standards" },
    { name: "Proyectos", href: "/projects", dropdownKey: "Proyectos" },
    { name: "Diagnóstico", href: "/diagnostic" },
    { name: "Blogs", href: "/blog", dropdownKey: "Blogs" },
    { name: "Lab", href: "/lab/gesture-sandbox", isBeta: true },
    { name: "FAQ", href: "/faq" }
  ];

  // Dynamic Styles
  const navBackground = scrolled
    ? "py-3 bg-[#0b0a08]/90 backdrop-blur-xl border-b border-white/[0.06] shadow-[0_10px_40px_-10px_rgba(0,0,0,0.6)]"
    : isHome
      ? "py-6 bg-transparent border-b border-transparent"
      : "py-5 bg-[#0b0a08] border-b border-white/[0.06]";

  const logoTextColor = isDarkPage ? "text-white" : "text-[#1a1a1a]";
  
  const linkTextColor = isDarkPage
    ? "text-slate-300/80 hover:text-white"
    : "text-slate-500 hover:text-[#1a1a1a]";

  const activeLineColor = isDarkPage ? "bg-gradient-to-r from-transparent via-cyan-400 to-transparent" : "bg-[#1a1a1a]";
  
  const ctaBtnStyle = isDarkPage
    ? "btn-gold"
    : "bg-[#1a1a1a] text-white hover:bg-slate-800 shadow-xl";

  const burgerColor = isDarkPage ? "text-white" : "text-[#1a1a1a]";

  return (
    <>
      <nav 
        className={`fixed top-0 left-0 w-full z-[100] transition-all duration-500 ${navBackground}`}
        onMouseLeave={() => setActiveDropdown(null)}
      >
        <div className="max-w-7xl mx-auto px-6 flex items-center justify-between relative">
          
          {/* Logo Section */}
          <Link href="/" className="flex items-center gap-3 group cursor-pointer">
            <Logo className={`w-8 h-8 transition-transform duration-500 group-hover:scale-105 ${isDarkPage ? 'text-cyan-400' : 'text-[#1a1a1a]'}`} />
            <div className="flex flex-col leading-none gap-1">
              <span className={`font-display text-[22px] tracking-tight transition-colors duration-300 ${logoTextColor}`}>DevGiz</span>
              <span className="text-[7px] font-mono uppercase tracking-[0.42em] text-cyan-400/80 font-semibold">Engineering Lab</span>
            </div>
          </Link>

          {/* Desktop Links - Editorial Style with Mega-Submenus */}
          <div className="hidden lg:flex items-center gap-8 xl:gap-10">
            {navLinks.map((link) => (
              <div 
                key={link.name} 
                className="relative"
                onMouseEnter={() => {
                  if (link.dropdownKey) setActiveDropdown(link.dropdownKey);
                  else setActiveDropdown(null);
                }}
              >
                <Link
                  href={link.href}
                  className={`text-[10px] font-bold tracking-[0.2em] uppercase transition-all py-2.5 relative group flex items-center gap-1 cursor-pointer ${linkTextColor}`}
                >
                  <span>{link.name}</span>
                  {link.dropdownKey && (
                    <ChevronDown className={`w-3 h-3 transition-transform duration-300 ${activeDropdown === link.dropdownKey ? 'rotate-180 text-cyan-500' : 'text-slate-400'}`} />
                  )}
                  {link.isBeta && (
                    <span className="px-1.5 py-0.5 bg-cyan-500/10 border border-cyan-500/30 text-cyan-400 font-mono text-[7px] tracking-widest rounded-sm font-black scale-90">
                      BETA
                    </span>
                  )}
                  <span className={`absolute -bottom-1 left-0 w-0 h-px transition-all group-hover:w-full ${activeLineColor}`}></span>
                </Link>
              </div>
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
            className={`lg:hidden p-2 -mr-2 transition-colors rounded-full focus:outline-none hover:bg-slate-500/10 ${burgerColor}`}
            aria-label={isMobileMenuOpen ? "Cerrar menú" : "Abrir menú"}
            aria-expanded={isMobileMenuOpen}
          >
            {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>

        {/* ========================================================= */}
        {/* MEGA-DROPDOWN PANEL FOR DESKTOP VIEW                      */}
        {/* ========================================================= */}
        <AnimatePresence>
          {activeDropdown && (
            <motion.div
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 10 }}
              transition={{ duration: 0.22, ease: [0.16, 1, 0.3, 1] }}
              className={`absolute left-0 top-full w-full z-40 border-b shadow-2xl pointer-events-auto transition-colors duration-500 ${
                isDarkPage
                  ? "bg-[#060504]/98 border-slate-800/80 text-white"
                  : "bg-white/95 border-slate-100 shadow-xl"
              }`}
              onMouseEnter={() => setActiveDropdown(activeDropdown)}
              onMouseLeave={() => setActiveDropdown(null)}
            >
              {/* Technical Blueprint Underlay Grid */}
              <div className="absolute inset-0 opacity-[0.015] pointer-events-none bg-[linear-gradient(to_right,rgba(0,0,0,0.1)_1px,transparent_1px),linear-gradient(to_bottom,rgba(0,0,0,0.1)_1px,transparent_1px)] bg-[size:20px_20px]" />
              
              <div className="max-w-7xl mx-auto px-6 py-9 grid grid-cols-12 gap-8 items-stretch relative z-10">
                
                {/* Left Side: Summary Context */}
                <div className="col-span-4 border-r border-white/[0.06] pr-8 flex flex-col justify-between">
                  <div>
                    <div className="flex items-center gap-2 mb-3">
                      <span className="w-1.5 h-1.5 rounded-full bg-cyan-500 animate-pulse shadow-[0_0_6px_#ddbe7a]" />
                      <span className="text-[8px] font-mono tracking-[0.25em] text-cyan-600 font-black uppercase">DEVGIZ_ROUTING // HUD_INFO</span>
                    </div>
                    <h4 className="font-display text-2xl tracking-tight mb-2">{activeDropdown}</h4>
                    <p className="text-slate-500 text-xs font-light leading-relaxed">
                      {DROPDOWNS_DATA[activeDropdown]?.desc}
                    </p>
                  </div>
                  
                  {/* Micro telemetry footer */}
                  <div className="mt-4 pt-4 border-t border-white/[0.06] flex items-center justify-between text-[7px] font-mono text-slate-400">
                    <span>SYS_LOCK: SECURE</span>
                    <span>COINCIDENCIAS: {DROPDOWNS_DATA[activeDropdown]?.items.length} PÁGINAS</span>
                  </div>
                </div>

                {/* Right Side: Sub-links Interactive Grid */}
                <div className="col-span-8 grid grid-cols-2 gap-4">
                  {DROPDOWNS_DATA[activeDropdown]?.items.map((item, idx) => {
                    const DropdownIcon = DROPDOWNS_DATA[activeDropdown].icon;
                    return (
                      <Link
                        key={idx}
                        href={item.href}
                        onClick={() => setActiveDropdown(null)}
                        className={`p-4 rounded-2xl border border-transparent transition-all flex items-start gap-4 hover:-translate-y-0.5 group/item ${
                          isDarkPage
                            ? "hover:bg-slate-900/40 hover:border-slate-800"
                            : "hover:bg-slate-50/80 hover:border-slate-200/50"
                        }`}
                      >
                        {/* Interactive Left icon card */}
                        <div className={`w-9 h-9 rounded-xl flex items-center justify-center shrink-0 transition-transform group-hover/item:scale-105 ${
                          isDarkPage ? "bg-slate-900 border border-slate-800 text-cyan-400" : "bg-slate-100 border border-slate-200 text-cyan-600"
                        }`}>
                          {DropdownIcon && <DropdownIcon className="w-4.5 h-4.5" />}
                        </div>
                        
                        <div className="space-y-1 text-left">
                          <span className={`text-xs font-black tracking-tight flex items-center gap-1.5 transition-colors ${
                            isDarkPage ? "text-slate-200 group-hover/item:text-cyan-400" : "text-slate-800 group-hover/item:text-[#1a1a1a]"
                          }`}>
                            {item.name}
                            <ArrowRight className="w-3 h-3 opacity-0 -translate-x-1.5 group-hover/item:opacity-100 group-hover/item:translate-x-0 transition-all text-cyan-500 shrink-0" />
                          </span>
                          <p className="text-slate-400 text-[10px] font-light leading-snug">
                            {item.desc}
                          </p>
                        </div>
                      </Link>
                    );
                  })}
                </div>

              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </nav>

      {/* ========================================================= */}
      {/* MOBILE NAVIGATION DRAWER (ACCORDION STYLE)                */}
      {/* ========================================================= */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3 }}
            className={`fixed inset-0 z-[90] lg:hidden pt-28 pb-8 px-6 flex flex-col justify-between overflow-y-auto ${
              isDarkPage 
                ? "bg-[#060504] text-white border-b border-slate-800" 
                : "bg-white text-[#1a1a1a] border-b border-slate-200"
            }`}
          >
            {isDarkPage && (
              <div className="absolute inset-0 opacity-[0.02] pointer-events-none">
                <div className="absolute top-0 left-0 w-full h-full" style={{ backgroundImage: 'linear-gradient(rgba(221,190,122,0.2) 1px, transparent 1px), linear-gradient(90deg, rgba(221,190,122,0.2) 1px, transparent 1px)', backgroundSize: '30px 30px' }}></div>
              </div>
            )}

            <div className="flex flex-col gap-5 relative z-10">
              <div className="text-[9px] font-mono text-slate-400 uppercase tracking-[0.3em] mb-2 border-b border-slate-500/10 pb-2">
                MENÚ DE INTEGRACIÓN DE RED
              </div>
              
              <div className="flex flex-col gap-3">
                {navLinks.map((link) => {
                  const hasDropdown = !!link.dropdownKey;
                  const isExpanded = expandedMobileSection === link.dropdownKey;
                  
                  return (
                    <div key={link.name} className="flex flex-col border-b border-white/[0.06] pb-2">
                      <div className="flex items-center justify-between w-full">
                        <Link
                          href={link.href}
                          onClick={() => {
                            if (!hasDropdown) setIsMobileMenuOpen(false);
                          }}
                          className={`font-display text-2xl tracking-tight flex items-center gap-2 py-1.5 ${
                            isDarkPage ? 'text-slate-300 hover:text-cyan-400' : 'text-slate-700 hover:text-[#1a1a1a]'
                          }`}
                        >
                          <span>{link.name}</span>
                          {link.isBeta && (
                            <span className="px-1.5 py-0.5 bg-cyan-500/10 border border-cyan-500/30 text-cyan-400 font-mono text-[7px] tracking-widest rounded-sm font-black">
                              BETA
                            </span>
                          )}
                        </Link>
                        
                        {hasDropdown && (
                          <button
                            onClick={() => setExpandedMobileSection(isExpanded ? null : link.dropdownKey)}
                            className={`p-2 rounded-lg ${isDarkPage ? 'bg-slate-900/50' : 'bg-slate-100'} transition-all`}
                          >
                            <ChevronDown className={`w-4 h-4 transition-transform duration-350 ${isExpanded ? 'rotate-180 text-cyan-400' : 'text-slate-500'}`} />
                          </button>
                        )}
                      </div>

                      {/* Expanded mobile list sub-items */}
                      <AnimatePresence>
                        {hasDropdown && isExpanded && (
                          <motion.div
                            initial={{ height: 0, opacity: 0 }}
                            animate={{ height: "auto", opacity: 1 }}
                            exit={{ height: 0, opacity: 0 }}
                            transition={{ duration: 0.25 }}
                            className="overflow-hidden pl-4 flex flex-col gap-2 mt-2"
                          >
                            {DROPDOWNS_DATA[link.dropdownKey]?.items.map((subItem, sIdx) => (
                              <Link
                                key={sIdx}
                                href={subItem.href}
                                onClick={() => setIsMobileMenuOpen(false)}
                                className={`text-xs py-2 font-mono uppercase tracking-wider flex items-center gap-1.5 border-l border-slate-200/50 pl-3 ${
                                  isDarkPage ? 'text-slate-400 hover:text-cyan-400' : 'text-slate-500 hover:text-slate-900'
                                }`}
                              >
                                <span className="w-1 h-1 rounded-full bg-cyan-500" />
                                {subItem.name}
                              </Link>
                            ))}
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </div>
                  );
                })}
              </div>
            </div>

            <motion.div 
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="space-y-4 relative z-10"
            >
              <Link
                href="/#contact"
                onClick={() => setIsMobileMenuOpen(false)}
                className={`w-full py-4.5 text-[9px] font-black tracking-[0.2em] uppercase transition-all rounded-sm flex items-center justify-center gap-3 ${
                  isDarkPage
                    ? 'btn-gold font-black'
                    : 'bg-[#1a1a1a] text-white hover:bg-slate-800 shadow-md'
                }`}
              >
                <span>Solicitar Consultoría</span>
                <ArrowRight className="w-4 h-4" />
              </Link>
              <div className="text-center text-[7px] font-mono text-slate-400 uppercase tracking-widest">
                DevGiz Spatial Systems // 2026
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
