import Link from "next/link";
import Logo from "../Logo";

// Plantilla común de los documentos legales (privacidad, cookies, términos).
// Server Component: el texto legal llega completo en el HTML, sin JS de cliente.
const LINK_CLASS =
  "inline-flex min-h-11 items-center text-[11px] font-mono uppercase tracking-[0.2em] text-slate-600 hover:text-[#1a1a1a] transition-colors focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-slate-900 rounded";

export const TEXT_LINK =
  "text-[#0b1220] font-medium underline underline-offset-4 break-words hover:text-cyan-700 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-slate-900 rounded";

const NAV = [
  { href: "/privacy", label: "Tratamiento de datos" },
  { href: "/cookies", label: "Cookies" },
  { href: "/terms", label: "Términos" },
];

export default function LegalPage({ eyebrow, title, intro, sections, updated, current }) {
  return (
    <div className="bg-[#fcfcfc] min-h-screen text-[#1a1a1a] selection:bg-slate-200 pt-28 md:pt-36 pb-24 md:pb-32">
      <div className="max-w-4xl mx-auto px-6">
        <nav
          aria-label="Documentos legales"
          className="flex flex-wrap items-center gap-x-6 gap-y-1 mb-12 pb-4 border-b border-slate-200"
        >
          <Link href="/" className={LINK_CLASS}>
            <span aria-hidden="true">←&nbsp;</span>Inicio
          </Link>
          {NAV.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              aria-current={item.href === current ? "page" : undefined}
              className={`${LINK_CLASS} ${item.href === current ? "text-[#1a1a1a] font-bold" : ""}`}
            >
              {item.label}
            </Link>
          ))}
        </nav>

        <header className="space-y-6 mb-12 md:mb-16">
          <div className="flex items-center gap-3">
            <span aria-hidden="true" className="w-12 h-px bg-[#1a1a1a]"></span>
            <span className="text-[11px] font-mono uppercase tracking-[0.24em] text-slate-600 font-bold">
              {eyebrow}
            </span>
          </div>
          <h1 className="text-4xl sm:text-5xl md:text-6xl font-black tracking-tighter leading-[1] text-[#1a1a1a]">
            {title}
          </h1>
          {intro && <div className="text-lg text-slate-700 leading-relaxed space-y-3">{intro}</div>}
        </header>

        {/* Índice: los documentos largos deben poder recorrerse sin leerlos completos */}
        <nav
          aria-label="Contenido del documento"
          className="mb-14 rounded-xl border border-slate-200 bg-white p-5"
        >
          <p className="font-mono text-[11px] font-bold uppercase tracking-[0.2em] text-slate-600 mb-3">
            Contenido
          </p>
          <ol className="grid gap-1.5 sm:grid-cols-2 text-sm">
            {sections.map((s, i) => (
              <li key={s.id}>
                <a
                  href={`#${s.id}`}
                  className="text-slate-700 hover:text-cyan-700 underline-offset-4 hover:underline"
                >
                  {String(i + 1).padStart(2, "0")}. {s.title}
                </a>
              </li>
            ))}
          </ol>
        </nav>

        <div className="space-y-12 text-slate-700 text-base md:text-[17px] leading-relaxed">
          {sections.map((s, i) => (
            <section
              key={s.id}
              id={s.id}
              aria-labelledby={`${s.id}-t`}
              className="space-y-4 scroll-mt-28"
            >
              <h2
                id={`${s.id}-t`}
                className="font-mono text-xs font-bold uppercase tracking-[0.22em] text-[#1a1a1a]"
              >
                {`${String(i + 1).padStart(2, "0")} // ${s.title}`}
              </h2>
              {s.body}
            </section>
          ))}

          <section className="border-t border-slate-200 pt-10">
            <p className="text-sm font-mono text-slate-600">{updated}</p>
          </section>
        </div>

        <div className="mt-16 pt-10 border-t border-slate-200 flex justify-between items-center">
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
