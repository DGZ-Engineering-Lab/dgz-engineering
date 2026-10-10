"use client";
import Link from "next/link";
import { motion, useReducedMotion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import HeroDigitalTwin from "./HeroDigitalTwin";

const EASE = [0.16, 1, 0.3, 1];

const CREDENTIALS = [
  { value: "1,2 M+", label: "Predios procesados", detail: "Catastro multipropósito" },
  { value: "5 cm/px", label: "Resolución ortofoto", detail: "Precisión centimétrica" },
  { value: "LADM-COL", label: "Conformidad v3.0", detail: "Res. 1040/2023 IGAC" },
  { value: "27", label: "Entidades aliadas", detail: "Sector público y privado" },
];

// Curvas de nivel decorativas (topografía) en trazo dorado muy tenue.
function ContourField() {
  const rings = Array.from({ length: 11 }, (_, i) => i);
  return (
    <svg
      className="absolute -right-[20%] top-[-10%] h-[130%] w-[90%] opacity-[0.22]"
      viewBox="0 0 800 800"
      fill="none"
      aria-hidden="true"
    >
      <defs>
        <linearGradient id="contour-gold" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0" stopColor="#e9d5a6" />
          <stop offset="1" stopColor="#8a6825" />
        </linearGradient>
      </defs>
      {rings.map((i) => (
        <path
          key={i}
          d={`M ${400 - 40 - i * 32} 400 C ${400 - 40 - i * 32} ${250 - i * 20}, ${520 + i * 18} ${220 - i * 28}, ${560 + i * 26} ${380 - i * 6} S ${470 + i * 14} ${600 + i * 26}, ${400 - 40 - i * 32} 400 Z`}
          stroke="url(#contour-gold)"
          strokeWidth={i % 5 === 0 ? 1.2 : 0.6}
        />
      ))}
    </svg>
  );
}

// El texto entra con CSS (.hero-rise), sin esperar a que hidrate JS: el titular
// se pinta en el primer frame y mejora el LCP en móvil.
export default function HeroSection() {
  const reduce = useReducedMotion();

  return (
    <section className="surface-obsidian grain relative overflow-hidden isolate">
      {/* Atmósfera */}
      <div className="pointer-events-none absolute inset-0 -z-10" aria-hidden="true">
        <ContourField />
        <div className="absolute inset-0 bg-[linear-gradient(rgba(207,167,88,0.05)_1px,transparent_1px),linear-gradient(90deg,rgba(207,167,88,0.05)_1px,transparent_1px)] bg-[size:96px_96px] [mask-image:radial-gradient(ellipse_70%_60%_at_30%_40%,#000_20%,transparent_75%)]" />
        <div className="absolute -top-40 left-1/3 h-[520px] w-[520px] rounded-full bg-cyan-400/10 blur-[140px]" />
      </div>

      <div className="max-w-7xl mx-auto px-6 pt-40 md:pt-48 pb-20 md:pb-24">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 items-center">
          <div className="lg:col-span-7 space-y-10">
            <div className="hero-rise flex items-center gap-4" style={{ animationDelay: "0s" }}>
              <span className="h-px w-14 bg-gradient-to-r from-transparent to-cyan-400" />
              <span className="text-[10px] font-mono uppercase tracking-[0.45em] text-cyan-300">
                Inteligencia Territorial · Colombia
              </span>
            </div>

            <h1 className="hero-rise-solid text-[13vw] sm:text-7xl md:text-8xl lg:text-[104px] leading-[0.92] text-[#f6f1e6]" style={{ animationDelay: "0.08s" }}>
              Arquitectura
              <br />
              <span className="text-gold text-gold-animated italic">Territorial</span>
              <br />
              Inteligente.
            </h1>

            <p className="hero-rise max-w-xl text-lg md:text-xl text-slate-300 font-light leading-relaxed" style={{ animationDelay: "0.18s" }}>
              Hacemos simple lo geográfico. Aseguramos la legalidad de tus linderos, evitamos retrasos costosos en
              licencias de construcción y optimizamos tus terrenos en minutos, cumpliendo al 100% con los estándares de
              ordenamiento territorial colombiano{" "}
              <span className="whitespace-nowrap font-mono text-xs text-cyan-300 border border-cyan-400/30 bg-cyan-400/5 px-1.5 py-0.5 rounded">
                LADM-COL v3.0
              </span>
              .
            </p>

            <div className="hero-rise flex flex-col sm:flex-row items-stretch sm:items-center gap-4 pt-2" style={{ animationDelay: "0.28s" }}>
              <Link
                href="/projects"
                prefetch={false}
                className="btn-gold group inline-flex items-center justify-center gap-3 px-9 py-4 rounded-full text-[11px] font-bold uppercase tracking-[0.28em]"
              >
                Explorar Proyectos
                <ArrowUpRight className="h-4 w-4 transition-transform duration-500 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
              </Link>
              <Link
                href="/about"
                prefetch={false}
                className="inline-flex items-center justify-center px-9 py-4 rounded-full border border-cyan-300/30 text-[11px] font-semibold uppercase tracking-[0.28em] text-[#f6f1e6] hover:border-cyan-300/70 hover:bg-cyan-300/5 transition-colors duration-500"
              >
                Nuestro Manifiesto
              </Link>
            </div>
          </div>

          <motion.div
            {...(reduce
              ? {}
              : {
                  initial: { opacity: 0, scale: 0.96, y: 20 },
                  animate: { opacity: 1, scale: 1, y: 0 },
                  transition: { duration: 1.3, delay: 0.25, ease: EASE },
                })}
            className="hidden lg:block lg:col-span-5"
          >
            <div className="relative">
              <div className="pointer-events-none absolute -inset-px rounded-[2.1rem] bg-gradient-to-b from-cyan-300/40 via-cyan-300/5 to-transparent" aria-hidden="true" />
              <HeroDigitalTwin />
            </div>
          </motion.div>
        </div>

        {/* Credenciales */}
        <dl className="hero-rise mt-20 md:mt-28 grid grid-cols-2 lg:grid-cols-4 border-t border-white/10" style={{ animationDelay: "0.4s" }}>
          {CREDENTIALS.map((c, i) => (
            <div
              key={c.label}
              className={`py-8 pr-6 ${i > 0 ? "lg:pl-8 lg:border-l lg:border-white/10" : ""} ${i % 2 === 1 ? "pl-6 border-l border-white/10 lg:pl-8" : ""}`}
            >
              <dt className="text-[10px] font-mono uppercase tracking-[0.3em] text-slate-400">{c.label}</dt>
              <dd className="mt-3 font-display text-[28px] sm:text-4xl md:text-5xl whitespace-nowrap text-[#f6f1e6] tracking-tight">{c.value}</dd>
              <dd className="mt-2 text-xs text-cyan-300/80">{c.detail}</dd>
            </div>
          ))}
        </dl>
      </div>

      <div className="hairline-gold" aria-hidden="true" />
    </section>
  );
}
