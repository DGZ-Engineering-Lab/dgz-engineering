import Link from "next/link";
import { ArrowUpRight, Check, Clock, MessageCircle } from "lucide-react";
import { AUDIT_OFFER } from "../data/auditOffer";
import { SERVICES_DATA } from "../data/servicesData";
import { CONTACT } from "../lib/seo";

const PILOT = SERVICES_DATA["gis-geointelligence"].marketplace[0];

const STEPS = [
  { n: "01", title: "Diagnóstico", body: "Revisamos tus datos y el problema real en una sesión técnica sin costo." },
  { n: "02", title: "Propuesta cerrada", body: "Alcance, entregables, precio y fechas por escrito antes de empezar." },
  { n: "03", title: "Ejecución", body: "Avances semanales que puedes revisar en un visor o en un informe." },
  { n: "04", title: "Entrega y soporte", body: "Datos, código y documentación quedan en tu poder. Capacitamos a tu equipo." },
];

/**
 * Productized offers with public prices, plus the four-step way of working.
 * Prices come from the same data files the /diagnostic and service pages use.
 */
export default function OffersSection() {
  return (
    <section id="ofertas" aria-labelledby="ofertas-title" className="pt-16 md:pt-24 pb-6 md:pb-10 relative scroll-mt-24">
      <div className="container-dgz">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-10 items-end mb-10 md:mb-14">
          <div className="lg:col-span-7 space-y-4">
            <span className="eyebrow">Precios publicados</span>
            <h2 id="ofertas-title" className="text-3xl md:text-5xl font-black tracking-tighter leading-[1.04] text-slate-950">
              Empieza con un alcance cerrado. <span className="block text-slate-500 font-light italic">Sin sorpresas en la factura.</span>
            </h2>
          </div>
          <p className="lg:col-span-5 text-slate-600 text-base md:text-lg font-light leading-relaxed">
            Dos puntos de entrada con precio fijo para validar resultados antes de comprometer un proyecto grande.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-5 md:gap-6">
          {/* Oferta de entrada: auditoría (panel HUD oscuro de la marca) */}
          <article className="lg:col-span-7 relative overflow-hidden rounded-[var(--radius-lg)] bg-[#050b18] text-slate-100 p-7 sm:p-10 shadow-[0_40px_90px_-40px_rgba(8,47,73,0.8)] ring-1 ring-white/10 flex flex-col">
            <div
              aria-hidden="true"
              className="pointer-events-none absolute inset-0 opacity-60 [background-image:linear-gradient(rgba(34,211,238,0.06)_1px,transparent_1px),linear-gradient(90deg,rgba(34,211,238,0.06)_1px,transparent_1px)] [background-size:40px_40px] [mask-image:radial-gradient(ellipse_at_top_right,black_20%,transparent_70%)]"
            />
            <div aria-hidden="true" className="pointer-events-none absolute -top-24 -right-24 h-72 w-72 rounded-full bg-cyan-500/20 blur-3xl" />

            <div className="relative flex flex-wrap items-center justify-between gap-3">
              <span className="inline-flex items-center gap-2 rounded-md bg-cyan-400/10 px-2.5 py-1 font-mono text-[0.68rem] font-semibold uppercase tracking-[0.18em] text-cyan-300 ring-1 ring-cyan-400/25">
                Recomendado para municipios
              </span>
              <span className="inline-flex items-center gap-1.5 font-mono text-[0.72rem] uppercase tracking-[0.14em] text-slate-300">
                <Clock className="h-3.5 w-3.5 text-cyan-300" aria-hidden="true" />
                {AUDIT_OFFER.delivery}
              </span>
            </div>

            <h3 className="relative mt-6 text-2xl md:text-3xl font-black tracking-tight text-white">{AUDIT_OFFER.name}</h3>
            <p className="relative mt-3 max-w-lg text-slate-300 font-light leading-relaxed">
              Medimos cuánto recaudo predial se está perdiendo por una base catastral desactualizada, con sus propios datos.
            </p>

            <p className="relative mt-7 flex flex-wrap items-baseline gap-x-3 gap-y-1">
              <span className="text-4xl md:text-5xl font-black tracking-tight text-white tabular-nums">{AUDIT_OFFER.price}</span>
              <span className="text-sm text-slate-400">{AUDIT_OFFER.priceNote}</span>
            </p>

            <ul className="relative mt-7 grid gap-3 sm:grid-cols-2 text-sm text-slate-200">
              {AUDIT_OFFER.deliverables.map((item) => (
                <li key={item} className="flex items-start gap-2.5">
                  <Check className="mt-0.5 h-4 w-4 flex-shrink-0 text-cyan-300" aria-hidden="true" />
                  <span>{item}</span>
                </li>
              ))}
            </ul>

            <div className="relative mt-auto pt-9 flex flex-col sm:flex-row gap-3">
              <Link href="/diagnostic" prefetch={false} className="btn btn-accent">
                Calcular mi fuga de recaudo <ArrowUpRight aria-hidden="true" />
              </Link>
              <a href={CONTACT.whatsappUrl} target="_blank" rel="noopener noreferrer" className="btn btn-ghost-dark">
                <MessageCircle aria-hidden="true" /> Preguntar por WhatsApp
              </a>
            </div>
          </article>

          {/* Piloto WebGIS */}
          <article className="lg:col-span-5 card-dgz p-7 sm:p-9 flex flex-col">
            <div className="flex flex-wrap items-center justify-between gap-3">
              <span className="font-mono text-[0.68rem] font-semibold uppercase tracking-[0.18em] text-blue-700">
                Para entidades y empresas
              </span>
              <span className="inline-flex items-center gap-1.5 font-mono text-[0.72rem] uppercase tracking-[0.14em] text-slate-500">
                <Clock className="h-3.5 w-3.5 text-blue-600" aria-hidden="true" />
                {PILOT.duration}
              </span>
            </div>

            <h3 className="mt-6 text-2xl font-black tracking-tight text-slate-950">{PILOT.name}</h3>
            <p className="mt-3 text-slate-600 font-light leading-relaxed">
              Un visor web con tus predios y capas listo para usar, para probar el valor antes de escalar.
            </p>

            <p className="mt-7 flex flex-wrap items-baseline gap-x-3 gap-y-1">
              <span className="text-3xl md:text-4xl font-black tracking-tight text-slate-950 tabular-nums">{PILOT.price}</span>
              <span className="text-sm text-slate-500">{PILOT.priceNote}</span>
            </p>
            {PILOT.deposit?.amount && (
              <p className="mt-1 text-sm text-slate-500">
                Anticipo del {PILOT.deposit.percent}%: <span className="font-semibold text-slate-700 tabular-nums">{PILOT.deposit.amount}</span>
              </p>
            )}

            <ul className="mt-7 space-y-3 text-sm text-slate-700">
              {PILOT.deliverables.map((item) => (
                <li key={item} className="flex items-start gap-2.5">
                  <Check className="mt-0.5 h-4 w-4 flex-shrink-0 text-blue-600" aria-hidden="true" />
                  <span>{item}</span>
                </li>
              ))}
            </ul>

            <div className="mt-auto pt-9">
              <Link href="/services/gis-geointelligence" prefetch={false} className="btn btn-primary w-full">
                Ver el piloto WebGIS <ArrowUpRight aria-hidden="true" />
              </Link>
            </div>
          </article>
        </div>

        <p className="mt-6 text-sm text-slate-600">
          ¿Tu proyecto no encaja en estos paquetes?{" "}
          <a href="#contact" className="font-semibold text-slate-900 underline decoration-cyan-500/50 underline-offset-4 hover:text-cyan-700">
            Cuéntanos el alcance y cotizamos a la medida
          </a>
          .
        </p>

        {/* Cómo trabajamos */}
        <div className="mt-16 md:mt-20">
          <h3 className="sr-only">Cómo trabajamos</h3>
          <ol className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-px overflow-hidden rounded-[var(--radius-lg)] border border-[var(--line)] bg-[var(--line)]">
            {STEPS.map((step) => (
              <li key={step.n} className="bg-white/90 p-6 md:p-7">
                <span className="font-mono text-sm font-semibold text-cyan-700 tabular-nums" aria-hidden="true">{step.n}</span>
                <p className="mt-3 text-base font-black tracking-tight text-slate-950">{step.title}</p>
                <p className="mt-2 text-sm text-slate-600 leading-relaxed">{step.body}</p>
              </li>
            ))}
          </ol>
        </div>
      </div>
    </section>
  );
}
