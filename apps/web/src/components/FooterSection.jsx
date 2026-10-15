"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import Logo from "./Logo";
import { Mail, MapPin, ExternalLink, MessageCircle, ArrowUpRight, Code2 } from "lucide-react";
import { CONTACT } from "../lib/seo";
import useDarkSurface from "./useDarkSurface";

const COLUMNS = [
  {
    title: "Servicios",
    links: [
      { name: "Catálogo de servicios", href: "/services" },
      { name: "GIS & Geointeligencia", href: "/services/gis-geointelligence" },
      { name: "Data Analytics & BI", href: "/services/data-analytics-bi" },
      { name: "IA & Automatización", href: "/services/ia-automatizacion" },
      { name: "Drones & Earth Data", href: "/services/drones-earth-data" },
    ],
  },
  {
    title: "Firma",
    links: [
      { name: "Nosotros", href: "/about" },
      { name: "Proyectos", href: "/projects" },
      { name: "Estándares técnicos", href: "/standards" },
      { name: "Brochure", href: "/brochure" },
      { name: "Trabaja con nosotros", href: "/careers" },
    ],
  },
  {
    title: "Recursos",
    links: [
      { name: "Diagnóstico catastral", href: "/diagnostic" },
      { name: "Blog", href: "/blog" },
      { name: "Preguntas frecuentes", href: "/faq" },
      { name: "Documentación", href: "/docs" },
      { name: "Lab de gestos", href: "/lab/gesture-sandbox" },
    ],
  },
];

// Rutas que no muestran el pie global (panel interno).
const HIDDEN_ON = ["/admin"];

export default function FooterSection() {
  const pathname = usePathname() || "/";
  const isDark = useDarkSurface();
  if (HIDDEN_ON.some((p) => pathname.startsWith(p))) return null;
  const currentYear = new Date().getFullYear();

  return (
    <footer
      className={`relative z-10 w-full print:hidden ${
        isDark ? "bg-[#02040a] text-slate-300 border-t border-slate-800/70" : "bg-white text-slate-600 border-t border-slate-200/70"
      }`}
    >
      {/* Banda de conversión */}
      <div className="container-dgz pt-14 md:pt-16">
        <div className="relative overflow-hidden rounded-[var(--radius-lg)] bg-[#0b1220] px-6 py-10 md:px-12 md:py-12 text-white ring-1 ring-white/10">
          <div aria-hidden="true" className="pointer-events-none absolute -right-24 -top-24 h-72 w-72 rounded-full bg-cyan-500/25 blur-3xl" />
          <div aria-hidden="true" className="pointer-events-none absolute -bottom-28 left-1/3 h-72 w-72 rounded-full bg-indigo-500/20 blur-3xl" />
          <div aria-hidden="true" className="pointer-events-none absolute inset-0 opacity-[0.06] bg-[linear-gradient(to_right,#fff_1px,transparent_1px),linear-gradient(to_bottom,#fff_1px,transparent_1px)] bg-[size:32px_32px]" />
          <div className="relative grid gap-8 lg:grid-cols-[1.4fr_1fr] lg:items-center">
            <div className="space-y-3">
              <p className="font-mono text-[0.7rem] font-semibold uppercase tracking-[0.24em] text-cyan-300">Primera sesión sin costo</p>
              <h2 className="text-2xl md:text-3xl font-black tracking-tight leading-tight">
                ¿Tienes un reto territorial? <span className="font-light italic text-slate-300">Lo resolvemos con datos.</span>
              </h2>
              <p className="max-w-xl text-sm md:text-base text-slate-300 font-light leading-relaxed">
                Catastro LADM-COL, WebGIS, analítica y automatización geoespacial. Respuesta en menos de 24 horas hábiles.
              </p>
            </div>
            <div className="flex flex-col sm:flex-row gap-3 lg:justify-end">
              <a href={CONTACT.whatsappUrl} target="_blank" rel="noopener noreferrer" className="btn btn-whatsapp">
                <MessageCircle aria-hidden="true" /> WhatsApp
              </a>
              <Link href="/#contact" className="btn btn-ghost-dark">
                Agendar sesión <ArrowUpRight aria-hidden="true" />
              </Link>
            </div>
          </div>
        </div>
      </div>

      <div className="container-dgz pt-14 pb-10">
        <div className="grid grid-cols-2 gap-10 md:grid-cols-12">
          <div className="col-span-2 md:col-span-12 lg:col-span-5 space-y-6">
            <Link href="/" aria-label="DevGiz Engineering, ir al inicio" className="inline-flex items-center gap-3">
              <Logo className={`w-10 h-10 ${isDark ? "text-cyan-400" : "text-[#0b1220]"}`} />
              <span className="flex flex-col leading-none">
                <span className={`text-2xl font-black tracking-tighter ${isDark ? "text-white" : "text-[#0b1220]"}`}>DevGiz</span>
                <span className="text-[9.5px] font-mono uppercase tracking-[0.3em] text-slate-400 font-bold">Engineering Lab</span>
              </span>
            </Link>
            <p className="max-w-sm text-sm font-light leading-relaxed">
              Ingeniería geoespacial, catastro multipropósito y datos territoriales para entidades públicas y empresas en Colombia.
            </p>
            <ul className="space-y-3 text-sm">
              <li>
                <a href={`mailto:${CONTACT.email}`} className="inline-flex items-center gap-3 hover:text-cyan-600 transition-colors">
                  <Mail className="w-4 h-4 text-cyan-600" aria-hidden="true" /> {CONTACT.email}
                </a>
              </li>
              <li>
                <a href={CONTACT.whatsappUrl} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-3 hover:text-emerald-600 transition-colors">
                  <MessageCircle className="w-4 h-4 text-emerald-600" aria-hidden="true" /> {CONTACT.whatsappDisplay}
                </a>
              </li>
              <li className="inline-flex items-center gap-3">
                <MapPin className="w-4 h-4 text-slate-400" aria-hidden="true" /> {CONTACT.city}
              </li>
            </ul>
          </div>

          {COLUMNS.map((col) => (
            <nav key={col.title} aria-label={col.title} className="col-span-1 md:col-span-4 lg:col-span-2 last:col-span-2 md:last:col-span-4 lg:last:col-span-3">
              <h3 className="mb-5 font-mono text-[0.68rem] font-semibold uppercase tracking-[0.24em] text-slate-400">{col.title}</h3>
              <ul className="space-y-3">
                {col.links.map((link) => (
                  <li key={link.href}>
                    <Link
                      href={link.href}
                      className={`text-sm transition-colors ${isDark ? "text-slate-300 hover:text-cyan-300" : "text-slate-700 hover:text-cyan-700"}`}
                    >
                      {link.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </nav>
          ))}
        </div>

        <div className={`mt-14 pt-8 border-t flex flex-col-reverse gap-6 md:flex-row md:items-center md:justify-between ${isDark ? "border-slate-800" : "border-slate-200/70"}`}>
          <p className="font-mono text-[0.68rem] uppercase tracking-[0.18em] text-slate-400">
            © {currentYear} DevGiz Engineering Lab · Hecho en Colombia
          </p>
          <div className="flex items-center gap-6">
            <Link href="/privacy" className="text-xs text-slate-500 hover:text-cyan-700">Privacidad</Link>
            <Link href="/terms" className="text-xs text-slate-500 hover:text-cyan-700">Términos</Link>
            <a href={CONTACT.linkedin} target="_blank" rel="noopener noreferrer" aria-label="LinkedIn" className="text-slate-400 hover:text-cyan-600">
              <ExternalLink className="w-4 h-4" />
            </a>
            <a href={CONTACT.github} target="_blank" rel="noopener noreferrer" aria-label="GitHub" className="text-slate-400 hover:text-cyan-600">
              <Code2 className="w-4 h-4" />
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
