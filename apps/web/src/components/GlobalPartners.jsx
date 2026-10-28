"use client";

// ============================================================================
// EXPERIENCIA PROFESIONAL DEL FUNDADOR (sección textual, sin logos)
// ----------------------------------------------------------------------------
// Antes esta sección mostraba logos de entidades y empresas de terceros
// presentados como "clientes". Se retiró por riesgo legal (uso de marcas de
// terceros y publicidad engañosa, Ley 1480 de 2011, art. 30): no todas esas
// organizaciones son clientes de DevGiz.
// Ahora solo se mencionan, en texto y sin imágenes remotas, las organizaciones
// que figuran como experiencia laboral en el CV del fundador
// (fuente única: MISSIONS en ProfessionalProfile.jsx).
// ============================================================================

import { Briefcase, MapPin } from "lucide-react";
import { MISSIONS } from "./ProfessionalProfile";

// Agrupa las misiones por organización conservando el orden del CV.
function groupByCompany(missions) {
  const map = new Map();
  for (const m of missions) {
    if (!map.has(m.company)) {
      map.set(m.company, { company: m.company, locations: new Set(), roles: [] });
    }
    const entry = map.get(m.company);
    entry.locations.add(m.location);
    entry.roles.push({ role: m.role, period: m.period });
  }
  return Array.from(map.values()).map((e) => ({ ...e, locations: Array.from(e.locations) }));
}

const EXPERIENCE = groupByCompany(MISSIONS);

export default function GlobalPartners() {
  return (
    <section
      id="experiencia-profesional"
      aria-labelledby="experiencia-profesional-title"
      className="py-24 bg-transparent border-t border-slate-100 overflow-hidden relative"
    >
      <div className="absolute inset-0 opacity-[0.015] pointer-events-none bg-[linear-gradient(to_right,rgba(0,0,0,0.1)_1px,transparent_1px),linear-gradient(to_bottom,rgba(0,0,0,0.1)_1px,transparent_1px)] bg-[size:24px_24px]" />

      <div className="max-w-7xl mx-auto px-6 relative z-10">
        {/* Encabezado */}
        <div className="space-y-4 mb-12">
          <div className="flex items-center gap-3">
            <span className="w-10 h-[2px] bg-gradient-to-r from-cyan-500 to-blue-500"></span>
            <span className="text-[10px] font-mono uppercase tracking-[0.32em] text-cyan-600 font-extrabold">
              EXPERIENCIA PROFESIONAL
            </span>
          </div>
          <h2
            id="experiencia-profesional-title"
            className="text-4xl md:text-6xl font-black text-slate-950 tracking-tighter leading-[0.95]"
          >
            Experiencia del fundador <br className="hidden md:inline" />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-slate-400 via-slate-600 to-slate-950 font-light italic">
              en el sector territorial
            </span>
          </h2>
          <p className="text-slate-500 text-sm font-light leading-relaxed max-w-3xl">
            Organizaciones en las que Albert Daniel Gaviria Zapata, fundador de DevGiz, ha trabajado
            como empleado o contratista. Se mencionan únicamente como experiencia laboral del
            fundador: no son clientes de DevGiz ni implican respaldo, alianza o patrocinio de esas
            organizaciones.
          </p>
        </div>

        {/* Listado textual (sin logos) */}
        <ul className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {EXPERIENCE.map((org) => (
            <li
              key={org.company}
              className="p-6 rounded-2xl bg-white border border-slate-200/80 shadow-sm hover:border-cyan-500/40 transition-colors"
            >
              <div className="flex items-start gap-3 mb-4">
                <div className="p-2 rounded-lg bg-cyan-500/10 text-cyan-600 shrink-0">
                  <Briefcase className="w-4 h-4" aria-hidden="true" />
                </div>
                <div>
                  <h3 className="text-sm font-black text-slate-950 leading-snug">
                    Experiencia del fundador en {org.company}
                  </h3>
                  <p className="mt-1 flex items-center gap-1.5 text-[11px] font-mono text-slate-500">
                    <MapPin className="w-3 h-3" aria-hidden="true" />
                    {org.locations.join(" · ")}
                  </p>
                </div>
              </div>
              <ul className="space-y-2 border-t border-slate-100 pt-3">
                {org.roles.map((r) => (
                  <li key={`${r.role}-${r.period}`} className="flex flex-col">
                    <span className="text-xs font-semibold text-slate-700">{r.role}</span>
                    <span className="text-[10px] font-mono tabular-nums text-slate-400">
                      {r.period}
                    </span>
                  </li>
                ))}
              </ul>
            </li>
          ))}
        </ul>

        <p className="mt-8 text-[11px] text-slate-400 font-light leading-relaxed max-w-3xl">
          Información tomada de la hoja de vida del fundador. Los nombres de las organizaciones
          pertenecen a sus respectivos titulares y se citan solo con fines descriptivos.
        </p>
      </div>
    </section>
  );
}
