import Link from "next/link";
import Logo from "../../components/Logo";
import { CONTACT } from "../../lib/seo";

// Página estática: se renderiza en servidor (sin JS de cliente).
const LINK_CLASS =
  "inline-flex min-h-11 items-center text-[11px] font-mono uppercase tracking-[0.2em] text-slate-600 hover:text-[#1a1a1a] transition-colors focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-slate-900 rounded";

export default function PrivacyPage() {
  return (
    <div className="bg-[#fcfcfc] min-h-screen text-[#1a1a1a] selection:bg-slate-200 pt-28 md:pt-36 pb-24 md:pb-32">
      <div className="max-w-4xl mx-auto px-6">

        {/* Navegación superior / migas */}
        <nav aria-label="Ruta de navegación" className="flex flex-wrap items-center justify-between gap-x-6 mb-12 pb-4 border-b border-slate-200">
          <Link href="/" className={LINK_CLASS}>
            <span aria-hidden="true">←&nbsp;</span>Volver al inicio
          </Link>
          <Link href="/terms" className={LINK_CLASS}>
            Términos de servicio<span aria-hidden="true">&nbsp;→</span>
          </Link>
        </nav>

        <header className="space-y-8 mb-16 md:mb-20">
          <div className="flex items-center gap-3">
            <span aria-hidden="true" className="w-12 h-px bg-[#1a1a1a]"></span>
            <span className="text-[11px] font-mono uppercase tracking-[0.24em] text-slate-600 font-bold">Privacidad de datos · 2026</span>
          </div>
          <h1 className="text-5xl sm:text-6xl md:text-8xl font-black tracking-tighter leading-[0.95] text-[#1a1a1a]">
            Privacidad de <br /> <span className="text-slate-600 italic font-light">Datos</span>
          </h1>
        </header>

        <div className="space-y-12 text-slate-600 text-lg font-light leading-relaxed">
          <section aria-labelledby="priv-1" className="space-y-4">
            <h2 id="priv-1" className="font-mono text-xs font-bold uppercase tracking-[0.25em] text-[#1a1a1a]">01 // Compromiso de Seguridad</h2>
            <p>
              En DevGiz Engineering, la seguridad de la información territorial es nuestra máxima prioridad. Implementamos protocolos de cifrado de grado institucional y arquitecturas Zero Trust para garantizar que los datos sensibles del país permanezcan protegidos y soberanos.
            </p>
          </section>

          <section aria-labelledby="priv-2" className="space-y-4">
            <h2 id="priv-2" className="font-mono text-xs font-bold uppercase tracking-[0.25em] text-[#1a1a1a]">02 // Gestión de Información Geoespacial</h2>
            <p>
              Cumplimos estrictamente con la Ley 1581 de 2012 de Protección de Datos Personales en Colombia. La información capturada mediante sensores LiDAR, ortofotografía y bases de datos catastrales se procesa bajo acuerdos de confidencialidad de nivel gubernamental.
            </p>
          </section>

          <section aria-labelledby="priv-3" className="space-y-4">
            <h2 id="priv-3" className="font-mono text-xs font-bold uppercase tracking-[0.25em] text-[#1a1a1a]">03 // Finalidad del Tratamiento</h2>
            <p>
              Los datos recolectados se utilizan exclusivamente para la optimización de procesos de ingeniería, validación de modelos LADM-COL y el fortalecimiento de la infraestructura de datos espaciales (ICDE). No comercializamos información técnica con terceros.
            </p>
          </section>

          <section aria-labelledby="priv-4" className="space-y-4">
            <h2 id="priv-4" className="font-mono text-xs font-bold uppercase tracking-[0.25em] text-[#1a1a1a]">04 // Derechos del Titular y Contacto</h2>
            <p>
              Como titular de datos personales puede conocer, actualizar, rectificar y solicitar la supresión de su información (Ley 1581 de 2012, Habeas Data). Escríbanos a{" "}
              <a href={`mailto:${CONTACT.email}`} className="text-[#0b1220] font-medium underline underline-offset-4 break-all hover:text-cyan-700 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-slate-900 rounded">
                {CONTACT.email}
              </a>{" "}
              y atenderemos su solicitud.
            </p>
          </section>

          <section className="space-y-4 border-t border-slate-200 pt-12">
            <p className="text-sm font-mono text-slate-600 italic">
              Este documento refleja nuestro compromiso con la transparencia institucional. <br />
              Última actualización: 15 de mayo de 2026.
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
