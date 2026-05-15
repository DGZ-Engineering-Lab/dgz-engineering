"use client";
import Link from "next/link";
import Logo from "../../components/Logo";

export default function PrivacyPage() {
  return (
    <main className="bg-[#fcfcfc] min-h-screen text-[#1a1a1a] selection:bg-slate-200 pt-40 pb-32">
      <div className="max-w-4xl mx-auto px-6">
        <div className="space-y-12 mb-20">
          <div className="flex items-center gap-3">
            <span className="w-12 h-px bg-[#1a1a1a]"></span>
            <span className="text-[10px] font-mono uppercase tracking-[0.4em] text-slate-500 font-bold">Data Privacy // 2026</span>
          </div>
          <h1 className="text-6xl md:text-8xl font-black tracking-tighter leading-[0.9] text-[#1a1a1a]">
            Privacidad de <br /> <span className="text-slate-400 italic font-light">Datos</span>
          </h1>
        </div>

        <div className="prose prose-slate max-w-none space-y-12 text-slate-500 text-lg font-light leading-relaxed">
          <section className="space-y-4">
            <h2 className="text-2xl font-black tracking-tight text-[#1a1a1a] uppercase text-[10px] tracking-[0.3em]">01 // Compromiso de Seguridad</h2>
            <p>
              En DevGiz Engineering, la seguridad de la información territorial es nuestra máxima prioridad. Implementamos protocolos de cifrado de grado institucional y arquitecturas Zero Trust para garantizar que los datos sensibles del país permanezcan protegidos y soberanos.
            </p>
          </section>

          <section className="space-y-4">
            <h2 className="text-2xl font-black tracking-tight text-[#1a1a1a] uppercase text-[10px] tracking-[0.3em]">02 // Gestión de Información Geoespacial</h2>
            <p>
              Cumplimos estrictamente con la Ley 1581 de 2012 de Protección de Datos Personales en Colombia. La información capturada mediante sensores LiDAR, ortofotografía y bases de datos catastrales se procesa bajo acuerdos de confidencialidad de nivel gubernamental.
            </p>
          </section>

          <section className="space-y-4">
            <h2 className="text-2xl font-black tracking-tight text-[#1a1a1a] uppercase text-[10px] tracking-[0.3em]">03 // Finalidad del Tratamiento</h2>
            <p>
              Los datos recolectados se utilizan exclusivamente para la optimización de procesos de ingeniería, validación de modelos LADM-COL y el fortalecimiento de la infraestructura de datos espaciales (ICDE). No comercializamos información técnica con terceros.
            </p>
          </section>

          <section className="space-y-4 border-t border-slate-100 pt-12">
            <p className="text-sm font-mono text-slate-400 italic">
              Este documento refleja nuestro compromiso con la transparencia institucional. <br />
              Última actualización: Mayo 15, 2026.
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
