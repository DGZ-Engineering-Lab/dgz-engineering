import Link from "next/link";
import Logo from "../../components/Logo";
import { CONTACT } from "../../lib/seo";

// Página estática: se renderiza en servidor (sin JS de cliente).
const LINK_CLASS =
  "inline-flex min-h-11 items-center text-[11px] font-mono uppercase tracking-[0.2em] text-slate-600 hover:text-[#1a1a1a] transition-colors focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-slate-900 rounded";

export default function TermsPage() {
  return (
    <div className="bg-[#fcfcfc] min-h-screen text-[#1a1a1a] selection:bg-slate-200 pt-28 md:pt-36 pb-24 md:pb-32">
      <div className="max-w-4xl mx-auto px-6">

        {/* Navegación superior / migas */}
        <nav aria-label="Ruta de navegación" className="flex flex-wrap items-center justify-between gap-x-6 mb-12 pb-4 border-b border-slate-200">
          <Link href="/" className={LINK_CLASS}>
            <span aria-hidden="true">←&nbsp;</span>Volver al inicio
          </Link>
          <Link href="/privacy" className={LINK_CLASS}>
            Privacidad de datos<span aria-hidden="true">&nbsp;→</span>
          </Link>
        </nav>

        <header className="space-y-8 mb-16 md:mb-20">
          <div className="flex items-center gap-3">
            <span aria-hidden="true" className="w-12 h-px bg-[#1a1a1a]"></span>
            <span className="text-[11px] font-mono uppercase tracking-[0.24em] text-slate-600 font-bold">Marco legal · 2026</span>
          </div>
          <h1 className="text-5xl sm:text-6xl md:text-8xl font-black tracking-tighter leading-[0.95] text-[#1a1a1a]">
            Términos de <br /> <span className="text-slate-600 italic font-light">Servicio</span>
          </h1>
        </header>

        <div className="space-y-12 text-slate-600 text-lg font-light leading-relaxed">
          <section aria-labelledby="terms-1" className="space-y-4">
            <h2 id="terms-1" className="font-mono text-xs font-bold uppercase tracking-[0.25em] text-[#1a1a1a]">01 // Marco Operativo</h2>
            <p>
              El uso de la plataforma DevGiz Engineering Lab y sus servicios asociados está condicionado a la aceptación total de estos términos. Nuestras soluciones están diseñadas exclusivamente para propósitos de ingeniería, planificación territorial y análisis de datos institucionales.
            </p>
          </section>

          <section aria-labelledby="terms-2" className="space-y-4">
            <h2 id="terms-2" className="font-mono text-xs font-bold uppercase tracking-[0.25em] text-[#1a1a1a]">02 // Propiedad Intelectual</h2>
            <p>
              Todos los algoritmos de procesamiento espacial, arquitecturas de datos y modelos de dominio (incluyendo adaptaciones de LADM-COL) son propiedad intelectual exclusiva de DevGiz. Queda estrictamente prohibida la ingeniería inversa o redistribución de nuestras herramientas sin autorización expresa.
            </p>
          </section>

          <section aria-labelledby="terms-3" className="space-y-4">
            <h2 id="terms-3" className="font-mono text-xs font-bold uppercase tracking-[0.25em] text-[#1a1a1a]">03 // Responsabilidad del Dato</h2>
            <p>
              DevGiz actúa como facilitador tecnológico. La veracidad y legalidad de la información primaria cargada en nuestros sistemas es responsabilidad única del cliente u organización usuaria. Nuestras auditorías se basan en la integridad técnica, no en la fe pública del documento original.
            </p>
          </section>

          <section className="space-y-4 border-t border-slate-200 pt-12">
            <p className="text-sm font-mono text-slate-600 italic">
              Última revisión: 15 de mayo de 2026. <br />
              Sede principal: {CONTACT.city}.
            </p>
          </section>
        </div>

        <div className="mt-20 pt-10 border-t border-slate-200 flex justify-between items-center">
          <Logo className="w-12 h-12 opacity-30" />
          <Link
            href="/"
            className="inline-flex min-h-11 items-center text-[11px] font-black uppercase tracking-widest text-[#1a1a1a] border-b-2 border-[#1a1a1a] hover:text-slate-600 transition-colors focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-slate-900"
          >
            Volver al inicio
          </Link>
        </div>
      </div>
    </div>
  );
}
