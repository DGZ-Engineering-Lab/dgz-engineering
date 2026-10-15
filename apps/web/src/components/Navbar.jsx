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
  FolderGit, 
  BookOpen,
  Layers,
  MessageCircle
} from "lucide-react";
import { CONTACT } from "../lib/seo";
import Logo from "./Logo";
import useDarkSurface from "./useDarkSurface";

// Complete mapping of all dynamic sub-pages and sections within DevGiz
const DROPDOWNS_DATA = {
  Servicios: {
    desc: "Soluciones geoespaciales de punta a punta: desde la captura en campo hasta la decisión basada en datos.",
    icon: Layers,
    items: [
      { name: "Catálogo completo", desc: "Las 10 líneas de servicio con fichas técnicas.", href: "/services" },
      { name: "GIS & Geointeligencia", desc: "Catastro LADM-COL, WebGIS y análisis espacial.", href: "/services/gis-geointelligence" },
      { name: "Data Analytics & BI", desc: "Tableros y analítica territorial para decidir.", href: "/services/data-analytics-bi" },
      { name: "IA & Automatización", desc: "GeoAI y flujos que eliminan trabajo manual.", href: "/services/ia-automatizacion" },
      { name: "Drones & Earth Data", desc: "Fotogrametría RPAS, LiDAR y GNSS RTK.", href: "/services/drones-earth-data" },
      { name: "Desarrollo de Software", desc: "Plataformas WebGIS y APIs a la medida.", href: "/services/desarrollo-software" }
    ]
  },
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
  Recursos: {
    desc: "Conocimiento técnico, normativa y herramientas abiertas sobre gestión territorial en Colombia.",
    icon: BookOpen,
    items: [
      { name: "Blog técnico", desc: "Análisis sobre LADM-COL, catastro y datos.", href: "/blog" },
      { name: "Estándares", desc: "ISO 19152, INTERLIS y normativa IGAC.", href: "/standards" },
      { name: "Preguntas frecuentes", desc: "Respuestas claras para entidades y empresas.", href: "/faq" },
      { name: "Documentación", desc: "Guías técnicas y referencias de la plataforma.", href: "/docs" },
      { name: "Dossier del fundador", desc: "Trayectoria, arsenal técnico y certificaciones.", href: "/#portfolio-dossier" },
      { name: "Lab de gestos (beta)", desc: "Navegación SIG con visión por computador.", href: "/lab/gesture-sandbox" }
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
  const dropdownTriggerRefs = useRef({});
  const mobileToggleRef = useRef(null);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Close menus on path changes without cascading effect renders
  const [prevPathname, setPrevPathname] = useState(pathname);
  if (prevPathname !== pathname) {
    setPrevPathname(pathname);
    if (isMobileMenuOpen) setIsMobileMenuOpen(false);
    if (activeDropdown) setActiveDropdown(null);
  }

  // Teclado: Escape cierra el submenú o el menú móvil y devuelve el foco a su disparador
  useEffect(() => {
    if (!activeDropdown && !isMobileMenuOpen) return;
    const handleKeyDown = (e) => {
      if (e.key !== "Escape") return;
      if (activeDropdown) {
        dropdownTriggerRefs.current[activeDropdown]?.focus();
        setActiveDropdown(null);
      } else if (isMobileMenuOpen) {
        setIsMobileMenuOpen(false);
        mobileToggleRef.current?.focus();
      }
    };
    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, [activeDropdown, isMobileMenuOpen]);

  // Bloquea el scroll del fondo mientras el menú móvil (pantalla completa) está abierto
  useEffect(() => {
    if (!isMobileMenuOpen) return;
    const previous = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    // El menú cubre toda la pantalla: el contenido detrás no debe recibir foco
    const behind = [document.getElementById("main-content"), document.querySelector("body > footer, footer")].filter(Boolean);
    behind.forEach((el) => el.setAttribute("inert", ""));
    return () => {
      document.body.style.overflow = previous;
      behind.forEach((el) => el.removeAttribute("inert"));
    };
  }, [isMobileMenuOpen]);

  // Cierra el submenú de escritorio cuando el foco sale de la barra de navegación
  const handleNavBlur = (e) => {
    if (activeDropdown && !e.currentTarget.contains(e.relatedTarget)) {
      setActiveDropdown(null);
    }
  };

  // Abre/cierra el submenú desde teclado y lleva el foco al primer enlace
  const toggleDropdownFromKeyboard = (key) => {
    if (activeDropdown === key) {
      setActiveDropdown(null);
      return;
    }
    setActiveDropdown(key);
    requestAnimationFrame(() => {
      dropdownRef.current?.querySelector("a")?.focus();
    });
  };

  // El panel se renderiza al final de la barra: al salir con Tab se devuelve el foco
  // a la secuencia natural de enlaces (después o antes del disparador).
  const handleDropdownKeyDown = (e) => {
    if (e.key !== "Tab" || !dropdownRef.current) return;
    const links = Array.from(dropdownRef.current.querySelectorAll("a"));
    const trigger = dropdownTriggerRefs.current[activeDropdown];
    if (!trigger || links.length === 0) return;
    const isFirst = document.activeElement === links[0];
    const isLast = document.activeElement === links[links.length - 1];
    if (e.shiftKey && isFirst) {
      e.preventDefault();
      setActiveDropdown(null);
      trigger.focus();
    } else if (!e.shiftKey && isLast) {
      const focusables = Array.from(
        e.currentTarget.closest("nav").querySelectorAll("[data-nav-focusable]")
      );
      const next = focusables[focusables.indexOf(trigger) + 1];
      if (next) {
        e.preventDefault();
        setActiveDropdown(null);
        next.focus();
      }
    }
  };

  const isActive = (href) =>
    href === "/" ? pathname === "/" : pathname === href || pathname?.startsWith(`${href}/`);

  const isDarkPage = useDarkSurface();

  const navLinks = [
    { name: "Servicios", href: "/services", dropdownKey: "Servicios" },
    { name: "Proyectos", href: "/projects", dropdownKey: "Proyectos" },
    { name: "Diagnóstico", href: "/diagnostic", isNew: true },
    { name: "Nosotros", href: "/about" },
    { name: "Recursos", href: "/blog", dropdownKey: "Recursos" }
  ];

  // Dynamic Styles
  const navBackground = scrolled
    ? isDarkPage
      ? "py-3 bg-[#02040a]/85 backdrop-blur-xl border-b border-slate-800/80 shadow-lg shadow-black/20"
      : "py-3 bg-white/80 backdrop-blur-xl border-b border-slate-200/70 shadow-[0_8px_30px_-18px_rgba(15,23,42,0.25)]"
    : "py-5 md:py-6 bg-transparent border-b border-transparent";

  const logoTextColor = isDarkPage ? "text-white" : "text-[#1a1a1a]";
  
  const linkTextColor = isDarkPage
    ? "text-slate-300 hover:text-white"
    : "text-slate-600 hover:text-[#0b1220]";

  const activeLineColor = isDarkPage ? "bg-cyan-400" : "bg-cyan-600";
  
  const ctaBtnStyle = isDarkPage
    ? "btn bg-white text-black hover:bg-cyan-400"
    : "btn btn-primary";

  const burgerColor = isDarkPage ? "text-white" : "text-[#1a1a1a]";

  return (
    <>
      <nav 
        aria-label="Navegación principal"
        className={`fixed top-0 left-0 w-full z-[100] transition-all duration-500 ${navBackground}`}
        onMouseLeave={() => setActiveDropdown(null)}
        onBlur={handleNavBlur}
      >
        <div className="max-w-7xl mx-auto px-6 flex items-center justify-between relative">
          
          {/* Logo Section */}
          <Link href="/" aria-label="DevGiz Engineering, ir al inicio" className="flex items-center gap-3 group cursor-pointer">
            <Logo className={`w-8 h-8 transition-transform group-hover:scale-110 ${isDarkPage ? 'text-cyan-400' : 'text-[#1a1a1a]'}`} />
            <div className="flex flex-col leading-none">
              <span className={`text-xl font-black tracking-tighter transition-colors duration-300 ${logoTextColor}`}>DevGiz</span>
              <span className="text-[9.5px] font-mono uppercase tracking-[0.3em] text-slate-500 font-bold">Engineering</span>
            </div>
          </Link>

          {/* Desktop Links - Editorial Style with Mega-Submenus */}
          <div className="hidden lg:flex items-center gap-7 xl:gap-9">
            {navLinks.map((link) => (
              <div 
                key={link.name} 
                className="relative flex items-center"
                onMouseEnter={() => {
                  if (link.dropdownKey) setActiveDropdown(link.dropdownKey);
                  else setActiveDropdown(null);
                }}
              >
                <Link
                  href={link.href}
                  data-nav-focusable
                  aria-current={isActive(link.href) ? "page" : undefined}
                  className={`text-[11.5px] font-bold tracking-[0.14em] uppercase transition-colors py-2.5 relative group flex items-center gap-1.5 cursor-pointer ${isActive(link.href) ? (isDarkPage ? "text-white" : "text-[#0b1220]") : linkTextColor}`}
                >
                  <span>{link.name}</span>
                  {link.isNew && (
                    <span className="px-1.5 py-0.5 bg-emerald-500/10 border border-emerald-500/30 text-emerald-800 font-mono text-[10px] tracking-widest rounded-full font-black">
                      ROI
                    </span>
                  )}
                  <span className={`absolute bottom-0.5 left-0 h-[2px] rounded-full transition-all duration-300 ${isActive(link.href) ? "w-full" : "w-0 group-hover:w-full"} ${activeLineColor}`}></span>
                </Link>
                {link.dropdownKey && (
                  <button
                    type="button"
                    data-nav-focusable
                    ref={(el) => { dropdownTriggerRefs.current[link.dropdownKey] = el; }}
                    onClick={() => toggleDropdownFromKeyboard(link.dropdownKey)}
                    aria-expanded={activeDropdown === link.dropdownKey}
                    aria-controls={activeDropdown === link.dropdownKey ? "nav-mega-dropdown" : undefined}
                    aria-label={`Submenú de ${link.name}`}
                    className="ml-0.5 p-2 -m-1 rounded-md cursor-pointer"
                  >
                    <ChevronDown className={`w-3 h-3 transition-transform duration-300 ${activeDropdown === link.dropdownKey ? 'rotate-180 text-cyan-500' : 'text-slate-400'}`} />
                  </button>
                )}
              </div>
            ))}

            <div className="flex items-center gap-2 pl-2">
              <a
                href={CONTACT.whatsappUrl}
                target="_blank"
                rel="noopener noreferrer"
                data-nav-focusable
                aria-label="Escribir por WhatsApp"
                className={`w-11 h-11 rounded-[var(--radius-sm)] flex items-center justify-center border transition-colors ${
                  isDarkPage ? "border-slate-700 text-emerald-400 hover:bg-emerald-500/10" : "border-slate-200 bg-white/70 text-emerald-600 hover:bg-emerald-50 hover:border-emerald-300"
                }`}
              >
                <MessageCircle className="w-[18px] h-[18px]" />
              </a>
              <Link
                href="/#contact"
                data-nav-focusable
                className={`btn-sm ${ctaBtnStyle}`}
              >
                Agendar consultoría
                <ArrowRight aria-hidden="true" />
              </Link>
            </div>
          </div>

          {/* Mobile Toggle Button */}
          <button
            type="button"
            ref={mobileToggleRef}
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className={`lg:hidden p-2 -mr-2 transition-colors rounded-full hover:bg-slate-500/10 ${burgerColor}`}
            aria-label={isMobileMenuOpen ? "Cerrar menú" : "Abrir menú"}
            aria-expanded={isMobileMenuOpen}
            aria-controls="mobile-menu"
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
              id="nav-mega-dropdown"
              ref={dropdownRef}
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 10 }}
              transition={{ duration: 0.22, ease: [0.16, 1, 0.3, 1] }}
              className={`absolute left-0 top-full w-full z-40 border-b shadow-2xl pointer-events-auto transition-colors duration-500 ${
                isDarkPage
                  ? "bg-[#02040a]/98 border-slate-800/80 text-white"
                  : "bg-white/95 border-slate-100 shadow-xl"
              }`}
              onMouseEnter={() => setActiveDropdown(activeDropdown)}
              onMouseLeave={() => setActiveDropdown(null)}
              onKeyDown={handleDropdownKeyDown}
            >
              {/* Technical Blueprint Underlay Grid */}
              <div aria-hidden="true" className="absolute inset-0 opacity-[0.015] pointer-events-none bg-[linear-gradient(to_right,rgba(0,0,0,0.1)_1px,transparent_1px),linear-gradient(to_bottom,rgba(0,0,0,0.1)_1px,transparent_1px)] bg-[size:20px_20px]" />
              
              <div className="max-w-7xl mx-auto px-6 py-9 grid grid-cols-12 gap-8 items-stretch relative z-10">
                
                {/* Left Side: Summary Context */}
                <div className="col-span-4 border-r border-slate-200/50 pr-8 flex flex-col justify-between">
                  <div>
                    <div aria-hidden="true" className="flex items-center gap-2 mb-3">
                      <span className="w-1.5 h-1.5 rounded-full bg-cyan-500 animate-pulse shadow-[0_0_6px_#22d3ee]" />
                      <span className="text-[10px] font-mono tracking-[0.25em] text-cyan-600 font-black uppercase">DevGiz · Navegación</span>
                    </div>
                    <p className="text-lg font-black tracking-tight mb-2 uppercase">{activeDropdown}</p>
                    <p className="text-slate-500 text-xs font-light leading-relaxed">
                      {DROPDOWNS_DATA[activeDropdown]?.desc}
                    </p>
                  </div>
                  
                  {/* Micro telemetry footer */}
                  <div aria-hidden="true" className="mt-4 pt-4 border-t border-slate-100 flex items-center justify-between text-[9.5px] font-mono text-slate-400">
                    <span>{DROPDOWNS_DATA[activeDropdown]?.items.length} páginas</span>
                    <span>DevGiz Engineering</span>
                  </div>
                </div>

                {/* Right Side: Sub-links Interactive Grid */}
                <div className="col-span-8 grid grid-cols-2 gap-2">
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
                          <span className={`text-sm font-bold tracking-tight flex items-center gap-1.5 transition-colors ${
                            isDarkPage ? "text-slate-200 group-hover/item:text-cyan-400" : "text-slate-900 group-hover/item:text-cyan-700"
                          }`}>
                            {item.name}
                            <ArrowRight className="w-3 h-3 opacity-0 -translate-x-1.5 group-hover/item:opacity-100 group-hover/item:translate-x-0 transition-all text-cyan-500 shrink-0" />
                          </span>
                          <p className="text-slate-500 text-xs font-light leading-snug">
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
          <motion.nav
            id="mobile-menu"
            aria-label="Menú móvil"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3 }}
            className={`fixed inset-0 z-[90] lg:hidden pt-24 pb-8 px-6 flex flex-col justify-between overflow-y-auto ${
              isDarkPage 
                ? "bg-[#02040a] text-white border-b border-slate-800" 
                : "bg-white text-[#1a1a1a] border-b border-slate-200"
            }`}
          >
            {isDarkPage && (
              <div className="absolute inset-0 opacity-[0.02] pointer-events-none">
                <div className="absolute top-0 left-0 w-full h-full" style={{ backgroundImage: 'linear-gradient(rgba(0,229,255,0.2) 1px, transparent 1px), linear-gradient(90deg, rgba(0,229,255,0.2) 1px, transparent 1px)', backgroundSize: '30px 30px' }}></div>
              </div>
            )}

            <div className="flex flex-col gap-5 relative z-10">
              <div aria-hidden="true" className="text-[10px] font-mono text-slate-400 uppercase tracking-[0.3em] mb-2 border-b border-slate-500/10 pb-2">
                Menú
              </div>
              
              <div className="flex flex-col gap-3">
                {navLinks.map((link) => {
                  const hasDropdown = !!link.dropdownKey;
                  const isExpanded = expandedMobileSection === link.dropdownKey;
                  
                  return (
                    <div key={link.name} className="flex flex-col border-b border-slate-100/50 pb-2">
                      <div className="flex items-center justify-between w-full">
                        <Link
                          href={link.href}
                          aria-current={isActive(link.href) ? "page" : undefined}
                          onClick={() => {
                            if (!hasDropdown) setIsMobileMenuOpen(false);
                          }}
                          className={`text-xl font-black tracking-tight uppercase flex items-center gap-2 py-1.5 ${
                            isDarkPage ? 'text-slate-300 hover:text-cyan-400' : 'text-slate-700 hover:text-[#1a1a1a]'
                          }`}
                        >
                          <span>{link.name}</span>
                          {link.isNew && (
                            <span className="px-1.5 py-0.5 bg-emerald-500/10 border border-emerald-500/30 text-emerald-800 font-mono text-[10px] tracking-widest rounded-full font-black">
                              ROI
                            </span>
                          )}
                        </Link>
                        
                        {hasDropdown && (
                          <button
                            type="button"
                            onClick={() => setExpandedMobileSection(isExpanded ? null : link.dropdownKey)}
                            aria-expanded={isExpanded}
                            aria-controls={`mobile-submenu-${link.dropdownKey}`}
                            aria-label={`${isExpanded ? "Ocultar" : "Mostrar"} subpáginas de ${link.name}`}
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
                            id={`mobile-submenu-${link.dropdownKey}`}
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
                                className={`text-sm py-2 flex items-center gap-2 border-l border-slate-200/70 pl-3 ${
                                  isDarkPage ? 'text-slate-400 hover:text-cyan-400' : 'text-slate-500 hover:text-slate-900'
                                }`}
                              >
                                <span aria-hidden="true" className="w-1 h-1 rounded-full bg-cyan-500" />
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
              <a
                href={CONTACT.whatsappUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="btn btn-whatsapp w-full"
              >
                <MessageCircle aria-hidden="true" /> WhatsApp directo
              </a>
              <Link
                href="/#contact"
                onClick={() => setIsMobileMenuOpen(false)}
                className={`btn w-full ${isDarkPage ? 'bg-cyan-500 text-black hover:bg-cyan-400' : 'btn-primary'}`}
              >
                <span>Solicitar Consultoría</span>
                <ArrowRight className="w-4 h-4" />
              </Link>
              <div className="text-center text-[9.5px] font-mono text-slate-400 uppercase tracking-widest">
                DevGiz Spatial Systems // 2026
              </div>
            </motion.div>
          </motion.nav>
        )}
      </AnimatePresence>
    </>
  );
}
