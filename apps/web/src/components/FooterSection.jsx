import Link from "next/link";
import Logo from "./Logo";
import { Mail, MapPin, ArrowUpRight } from "lucide-react";

const CONTACT_EMAIL = "engineering@devgiz.com";

const FOOTER_LINKS = {
  Firma: [
    { name: "Nuestro Manifiesto", href: "/about" },
    { name: "Estándares Técnicos", href: "/standards" },
    { name: "Talento de Élite", href: "/careers" },
    { name: "Brochure Corporativo", href: "/brochure" },
  ],
  Ecosistema: [
    { name: "Casos de Ingeniería", href: "/projects" },
    { name: "Engineering Journal", href: "/blog" },
    { name: "Diagnóstico Territorial", href: "/diagnostic" },
    { name: "Centro de Conocimiento", href: "/faq" },
  ],
  Legal: [
    { name: "Privacidad de Datos", href: "/privacy" },
    { name: "Términos de Servicio", href: "/terms" },
    { name: "Documentación", href: "/docs" },
  ],
};

export default function FooterSection() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="surface-obsidian grain relative w-full z-10 overflow-hidden">
      <div className="hairline-gold" aria-hidden="true" />
      <div className="max-w-7xl mx-auto px-6 pt-24 pb-12">
        {/* Cierre editorial */}
        <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-10 pb-20 border-b border-white/10">
          <p className="font-display text-4xl md:text-6xl leading-[1.02] tracking-tight text-[#f6f1e6] max-w-3xl">
            El territorio es el activo más valioso.{" "}
            <span className="text-gold italic">Lo diseñamos con precisión.</span>
          </p>
          <Link
            href="/#contact"
            className="btn-gold group inline-flex items-center gap-3 self-start lg:self-auto px-9 py-4 rounded-full text-[11px] font-bold uppercase tracking-[0.28em]"
          >
            Agendar sesión técnica
            <ArrowUpRight className="h-4 w-4 transition-transform duration-500 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-14 py-20">
          <div className="lg:col-span-4 space-y-8">
            <Link href="/" className="flex items-center gap-3">
              <Logo className="w-10 h-10" />
              <div className="flex flex-col leading-none gap-1">
                <span className="font-display text-2xl tracking-tight text-[#f6f1e6]">DevGiz</span>
                <span className="text-[10px] font-mono uppercase tracking-[0.42em] text-cyan-300/80">Engineering Lab</span>
              </div>
            </Link>
            <p className="text-slate-400 font-light leading-relaxed text-sm max-w-xs">
              Líderes en infraestructura de datos territoriales y soberanía digital para el sector público y privado en
              Colombia.
            </p>
            <div className="space-y-3 text-sm text-slate-300">
              <a href={`mailto:${CONTACT_EMAIL}`} className="flex items-center gap-3 hover:text-cyan-300 transition-colors">
                <Mail className="w-4 h-4 text-cyan-400" aria-hidden="true" />
                {CONTACT_EMAIL}
              </a>
              <div className="flex items-center gap-3">
                <MapPin className="w-4 h-4 text-cyan-400" aria-hidden="true" />
                Bogotá · Medellín · Cali
              </div>
            </div>
          </div>

          <nav aria-label="Enlaces del sitio" className="lg:col-span-8 grid grid-cols-2 sm:grid-cols-3 gap-12">
            {Object.entries(FOOTER_LINKS).map(([group, links]) => (
              <div key={group}>
                <h2 className="text-[10px] font-mono text-cyan-300/70 uppercase tracking-[0.35em] mb-7">{group}</h2>
                <ul className="space-y-4">
                  {links.map((link) => (
                    <li key={link.name}>
                      <Link
                        href={link.href}
                        className="text-sm text-slate-300 hover:text-[#f6f1e6] transition-colors duration-300"
                      >
                        {link.name}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </nav>
        </div>

        <div className="pt-10 border-t border-white/10 flex flex-col md:flex-row justify-between items-center gap-6">
          <div className="text-[10px] font-mono text-slate-500 uppercase tracking-[0.3em]">
            © {currentYear} DevGiz Engineering Lab · Todos los derechos reservados
          </div>
          <div className="text-[10px] font-mono text-slate-500 uppercase tracking-[0.3em]">
            LADM-COL v3.0 · EPSG:9377
          </div>
        </div>
      </div>
    </footer>
  );
}
