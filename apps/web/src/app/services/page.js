"use client";

import { useState, useMemo, useRef } from "react";
import { motion, useInView } from "framer-motion";
import Link from "next/link";
import { 
  Globe, 
  BarChart3, 
  Brain, 
  Building, 
  Route, 
  Sprout, 
  Wind, 
  Cloud, 
  Plane, 
  Code,
  ArrowUpRight,
  Search,
  Layers,
  Sparkles,
  ShieldCheck,
  Cpu,
  ArrowRight
} from "lucide-react";
import { SERVICES_DATA } from "../../data/servicesData";

const ICON_MAP = {
  Globe,
  BarChart3,
  Brain,
  Building,
  Route,
  Sprout,
  Wind,
  Cloud,
  Plane,
  Code
};

const CAPAS = [
  { id: "ALL", label: "Todos los Servicios" },
  { id: "capa-1", label: "Inteligencia (Core)" },
  { id: "capa-2", label: "Software & Datos" },
  { id: "capa-3", label: "Hardware & Terreno" }
];

export default function ServicesPage() {
  const [selectedCapa, setSelectedCapa] = useState("ALL");
  const [searchQuery, setSearchQuery] = useState("");
  const headerRef = useRef(null);
  const headerInView = useInView(headerRef, { once: true });

  const allServices = useMemo(() => Object.values(SERVICES_DATA), []);

  const filteredServices = useMemo(() => {
    return allServices.filter(svc => {
      const matchesCapa = selectedCapa === "ALL" || svc.capa === selectedCapa;
      const q = searchQuery.toLowerCase().trim();
      const matchesSearch = !q || 
        svc.title.toLowerCase().includes(q) ||
        svc.tagline.toLowerCase().includes(q) ||
        svc.concept.toLowerCase().includes(q) ||
        svc.specs?.compliance?.some(c => c.toLowerCase().includes(q)) ||
        svc.specs?.inputs?.some(i => i.toLowerCase().includes(q));
      return matchesCapa && matchesSearch;
    });
  }, [allServices, selectedCapa, searchQuery]);

  return (
    <div className="flex flex-col w-full bg-[#fcfcfc] text-[#1a1a1a] min-h-screen pt-24 md:pt-28">
      
      {/* Header Editorial */}
      <section className="px-6 pb-10 border-b border-slate-200 overflow-hidden" ref={headerRef}>
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-end">
            <motion.div 
              className="lg:col-span-8 space-y-6"
              initial={{ opacity: 0, y: 30 }}
              animate={headerInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.7 }}
            >
              <div className="flex items-center gap-3">
                <span className="w-12 h-px bg-[#1a1a1a]"></span>
                <span className="text-[10px] font-mono uppercase tracking-[0.28em] text-slate-500 font-bold">
                  Catálogo de Ingeniería Espacial // 10 Soluciones Especializadas
                </span>
              </div>
              <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-black tracking-tighter leading-[1.02] text-[#1a1a1a]">
                Servicios & <br />
                <span className="text-slate-500 italic font-light">Capacidades Técnicas</span>
              </h1>
              <p className="text-slate-600 text-lg font-light leading-relaxed max-w-2xl">
                Portafolio integral de ingeniería geoespacial, orquestación de datos catastrales bajo estándar LADM-COL (ISO 19152) y analítica territorial de precisión.
              </p>
            </motion.div>

            <motion.div 
              className="lg:col-span-4 flex flex-col gap-4 border-l border-slate-200 pl-8 pb-2"
              initial={{ opacity: 0, x: 20 }}
              animate={headerInView ? { opacity: 1, x: 0 } : {}}
              transition={{ delay: 0.3, duration: 0.6 }}
            >
              <div className="bg-white p-5 rounded-xl border border-slate-200 shadow-sm space-y-2">
                <div className="flex items-center gap-2 text-cyan-600 font-mono text-[10px] font-bold uppercase tracking-wider">
                  <ShieldCheck className="w-4 h-4" />
                  Soberanía Tecnológica
                </div>
                <div className="text-2xl font-black text-[#1a1a1a]">100% Interoperable</div>
                <p className="text-xs text-slate-500 leading-relaxed font-light">
                  Alineado a especificaciones del IGAC, SNR, ICDE y modelos de intercambio INTERLIS (.XTF).
                </p>
              </div>
            </motion.div>
          </div>

          {/* Filter & Search Bar */}
          <div className="mt-12 pt-8 border-t border-slate-200/60 flex flex-col md:flex-row items-stretch md:items-center justify-between gap-4">
            {/* Category tabs */}
            <div 
              role="group"
              aria-label="Filtro por capas estratégicas"
              className="flex flex-wrap items-center gap-2"
            >
              {CAPAS.map((capa) => {
                const isSelected = selectedCapa === capa.id;
                const count = capa.id === "ALL" 
                  ? allServices.length 
                  : allServices.filter(s => s.capa === capa.id).length;

                return (
                  <button
                    key={capa.id}
                    type="button"
                    aria-pressed={isSelected}
                    onClick={() => setSelectedCapa(capa.id)}
                    className={`px-4 py-2 min-h-9 rounded-full font-mono text-[11px] uppercase tracking-wider transition-all duration-200 cursor-pointer active:scale-95 focus-visible:ring-2 focus-visible:ring-cyan-500 focus:outline-none flex items-center gap-2 ${
                      isSelected 
                        ? "bg-[#1a1a1a] text-white shadow-md"
                        : "bg-slate-100 text-slate-600 hover:bg-slate-200 hover:text-black"
                    }`}
                  >
                    <span>{capa.label}</span>
                    <span className={`text-[10px] px-1.5 py-0.2 rounded-full font-bold tabular-nums ${
                      isSelected ? "bg-white/20 text-white" : "bg-white text-slate-500"
                    }`}>
                      {count}
                    </span>
                  </button>
                );
              })}
            </div>

            {/* Live Search input */}
            <div className="relative min-w-[260px] md:w-80">
              <Search className="w-4 h-4 text-slate-500 absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none" aria-hidden="true" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Buscar servicio, norma o tecnología..."
                aria-label="Buscar en el catálogo de servicios"
                className="w-full pl-10 pr-4 py-2 bg-white border border-slate-200 rounded-full text-xs text-slate-900 placeholder:text-slate-500 focus:outline-none focus:ring-2 focus:ring-cyan-500 focus:border-cyan-500 transition-all font-mono"
              />
              {searchQuery && (
                <button
                  type="button"
                  onClick={() => setSearchQuery("")}
                  aria-label="Limpiar búsqueda"
                  className="absolute right-1 top-1/2 -translate-y-1/2 inline-flex h-8 w-8 items-center justify-center text-slate-600 hover:text-slate-900 text-xs font-mono rounded-full focus-visible:ring-2 focus-visible:ring-cyan-500 focus-visible:outline-none"
                >
                  ✕
                </button>
              )}
            </div>
          </div>

        </div>
      </section>

      {/* Services Grid Showcase */}
      <section className="px-6 py-16 bg-[#fcfcfc]">
        <div className="max-w-7xl mx-auto">
          {filteredServices.length === 0 ? (
            <div className="text-center py-24 bg-white border border-slate-200 rounded-2xl p-8 space-y-4">
              <Layers className="w-10 h-10 text-slate-300 mx-auto" />
              <h2 className="text-xl font-bold text-slate-800">No se encontraron servicios</h2>
              <p className="text-sm text-slate-500 max-w-md mx-auto">
                No hay resultados para los criterios seleccionados. Prueba limpiando el término de búsqueda.
              </p>
              <button
                type="button"
                onClick={() => { setSelectedCapa("ALL"); setSearchQuery(""); }}
                className="px-6 py-2.5 bg-[#1a1a1a] text-white font-mono text-xs rounded-full uppercase tracking-wider hover:bg-slate-800 transition-all cursor-pointer"
              >
                Restablecer Filtros
              </button>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {filteredServices.map((svc, idx) => {
                const IconComponent = ICON_MAP[svc.iconName] || Globe;
                return (
                  <motion.div
                    key={svc.slug}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: idx * 0.05, duration: 0.4 }}
                    className="h-full"
                  >
                    <Link
                      href={`/services/${svc.slug}`}
                      aria-label={`Ver especificaciones del servicio: ${svc.title}`}
                      className="group flex flex-col justify-between h-full bg-white border border-slate-200 hover:border-cyan-500/50 rounded-2xl p-8 transition-all duration-300 hover:shadow-xl hover:-translate-y-1 relative overflow-hidden focus-visible:ring-2 focus-visible:ring-cyan-500 focus:outline-none"
                    >
                      {/* Top bar */}
                      <div>
                        <div className="flex items-center justify-between mb-6">
                          <div className="w-12 h-12 rounded-xl bg-slate-900 text-cyan-400 flex items-center justify-center shadow-md group-hover:scale-105 transition-transform">
                            <IconComponent className="w-6 h-6" />
                          </div>
                          <div className="flex flex-col items-end">
                            <span className="font-mono text-[10px] text-slate-400 uppercase tracking-widest font-bold">
                              {svc.id}
                            </span>
                            <span className="font-mono text-[9.5px] text-cyan-600 uppercase tracking-widest font-bold">
                              {svc.capaLabel}
                            </span>
                          </div>
                        </div>

                        <h2 className="text-xl font-black tracking-tight text-slate-900 group-hover:text-cyan-600 transition-colors mb-2">
                          {svc.title}
                        </h2>
                        <p className="text-xs font-mono text-cyan-700/80 mb-4 line-clamp-1 font-semibold">
                          {svc.tagline}
                        </p>
                        <p className="text-xs text-slate-500 font-light leading-relaxed line-clamp-3 mb-6">
                          {svc.concept}
                        </p>
                      </div>

                      {/* Bottom Metrics & Action */}
                      <div className="pt-6 border-t border-slate-100 space-y-4">
                        <div className="grid grid-cols-2 gap-3">
                          {svc.metrics?.slice(0, 2).map((m, mIdx) => (
                            <div key={mIdx} className="bg-slate-50 p-2.5 rounded-lg border border-slate-100">
                              <span className="text-[9.5px] font-mono text-slate-400 uppercase tracking-wider block truncate">
                                {m.label}
                              </span>
                              <span className="text-xs font-black text-slate-900 tabular-nums">
                                {m.value}
                              </span>
                            </div>
                          ))}
                        </div>

                        <div className="flex items-center justify-between pt-2 text-[10px] font-mono font-bold uppercase tracking-wider text-slate-700 group-hover:text-cyan-600">
                          <span>Ver Ficha Técnica & Simulador</span>
                          <ArrowRight className="w-3.5 h-3.5 transition-transform group-hover:translate-x-1 text-slate-400 group-hover:text-cyan-600" />
                        </div>
                      </div>

                    </Link>
                  </motion.div>
                );
              })}
            </div>
          )}
        </div>
      </section>

      {/* Interactive Bottom Banner */}
      <section className="py-14 md:py-18 bg-[#111827] text-white border-t border-slate-900">
        <div className="max-w-5xl mx-auto px-6 text-center space-y-8">
          <div className="inline-flex items-center gap-2 px-3 py-1 bg-cyan-500/10 border border-cyan-500/20 rounded-full font-mono text-[10px] text-cyan-400 uppercase tracking-widest">
            <Sparkles className="w-3 h-3 text-cyan-400" />
            Auditoría Territorial Inmediata
          </div>
          <h2 className="text-3xl md:text-5xl font-black tracking-tight leading-tight">
            ¿Necesitas una Evaluación Catastral para tu Municipio?
          </h2>
          <p className="text-slate-400 text-base font-light leading-relaxed max-w-2xl mx-auto">
            Utiliza nuestra consola de diagnóstico institucional para calcular la consistencia topológica, interoperabilidad LADM-COL y potencial de recaudo predial de tus predios.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-4">
            <Link
              href="/diagnostic"
              className="px-8 py-4 bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-mono text-xs font-black uppercase tracking-widest rounded-lg transition-all shadow-lg shadow-cyan-500/20 active:scale-95"
            >
              Iniciar Diagnóstico Catastral
            </Link>
            <Link
              href="/#contact"
              className="px-8 py-4 bg-slate-800 hover:bg-slate-700 text-white font-mono text-xs font-bold uppercase tracking-widest rounded-lg border border-slate-700 transition-all active:scale-95"
            >
              Solicitar Reunión Técnica
            </Link>
          </div>
        </div>
      </section>

    </div>
  );
}
