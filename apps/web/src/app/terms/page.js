"use client";
import Link from "next/link";
import Logo from "../../components/Logo";

export default function TermsPage() {
  return (
    <main className="bg-[#fcfcfc] min-h-screen text-[#1a1a1a] selection:bg-slate-200 pt-40 pb-32">
      <div className="max-w-4xl mx-auto px-6">
        <div className="space-y-12 mb-20">
          <div className="flex items-center gap-3">
            <span className="w-12 h-px bg-[#1a1a1a]"></span>
            <span className="text-[10px] font-mono uppercase tracking-[0.4em] text-slate-500 font-bold">Legal Governance // 2026</span>
          </div>
          <h1 className="text-6xl md:text-8xl font-black tracking-tighter leading-[0.9] text-[#1a1a1a]">
            Términos de <br /> <span className="text-slate-400 italic font-light">Servicio</span>
          </h1>
        </div>

        <div className="prose prose-slate max-w-none space-y-12 text-slate-500 text-lg font-light leading-relaxed">
          <section className="space-y-4">
            <h2 className="text-2xl font-black tracking-tight text-[#1a1a1a] uppercase text-[10px] tracking-[0.3em]">01 // Marco Operativo</h2>
            <p>
              El uso de la plataforma DevGiz Engineering Lab y sus servicios asociados está condicionado a la aceptación total de estos términos. Nuestras soluciones están diseñadas exclusivamente para propósitos de ingeniería, planificación territorial y análisis de datos institucionales.
            </p>
          </section>

          <section className="space-y-4">
            <h2 className="text-2xl font-black tracking-tight text-[#1a1a1a] uppercase text-[10px] tracking-[0.3em]">02 // Propiedad Intelectual</h2>
            <p>
              Todos los algoritmos de procesamiento espacial, arquitecturas de datos y modelos de dominio (incluyendo adaptaciones de LADM-COL) son propiedad intelectual exclusiva de DevGiz. Queda estrictamente prohibida la ingeniería inversa o redistribución de nuestras herramientas sin autorización expresa.
            </p>
          </section>

          <section className="space-y-4">
            <h2 className="text-2xl font-black tracking-tight text-[#1a1a1a] uppercase text-[10px] tracking-[0.3em]">03 // Responsabilidad del Dato</h2>
            <p>
              DevGiz actúa como facilitador tecnológico. La veracidad y legalidad de la información primaria cargada en nuestros sistemas es responsabilidad única del cliente u organización usuaria. Nuestras auditorías se basan en la integridad técnica, no en la fe pública del documento original.
            </p>
          </section>

          <section className="space-y-4 border-t border-slate-100 pt-12">
            <p className="text-sm font-mono text-slate-400 italic">
              Última revisión: 15 de Mayo, 2026. <br />
              Sede Principal: Bogotá, Colombia.
            </p>
          </div>
        </div>

        <div className="mt-24 pt-12 border-t border-slate-100 flex justify-between items-center">
          <Logo className="w-12 h-12 opacity-20" />
          <Link href="/" className="text-[10px] font-black uppercase tracking-widest text-[#1a1a1a] border-b-2 border-[#1a1a1a] pb-1">
            Volver al Inicio
          </Link>
        </div>
      </div>
    </main>
  );
}
