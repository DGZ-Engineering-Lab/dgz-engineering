"use client";

export default function TimelineSection() {
  const experiences = [
    {
      period: "2025 Q4 — Actual",
      role: "Analista Geográfico",
      company: "GEOGRAFÍA SATELITAL GEOSAT S.A.S. // Medellín",
      desc: "Procesamiento geoespacial avanzado, análisis de insumos 360° y restitución vectorial. Digitalización masiva para actualización catastral con validación topográfica bajo LADM-COL V3.",
      tags: ["LADM-COL V3", "360° Survey", "PyQGIS", "Restitución"],
      current: true
    },
    {
      period: "2025 Q2",
      role: "Control de Calidad Catastral (QA/QC)",
      company: "ACCION DEL CAUCA S.A.S. // Solita, Caquetá",
      desc: "Auditoría técnica de calidad para reconocimiento predial masivo. Control de estándares IGAC, consistencia topográfica y validación de reportes técnicos de campo.",
      tags: ["IGAC QA", "Audit", "Topología"],
      current: false
    },
    {
      period: "2024 — 2025",
      role: "Coordinador & Líder de Campo SIG",
      company: "ARBIRTRIUM S.A.S. // Urabá, Antioquia",
      desc: "Liderazgo de cuadrillas de campo para nivelación topográfica urbana/rural y barrido predial masivo. Coordinación SIG para misiones catastrales en terrenos complejos.",
      tags: ["Barrido Predial", "Coordinación", "QGIS", "GPS RTK"],
      current: false
    },
    {
      period: "2024 — Actual",
      role: "Coordinador Profesional SIG",
      company: "UT SMART CITY // Barranquilla",
      desc: "Implementación de estándares LADM-COL y digitalización masiva para el despliegue de ciudades inteligentes. Aseguramiento de calidad en nodos distribuidos.",
      tags: ["LADM-COL", "Smart City", "Mass Digit."],
      current: false
    },
    {
      period: "2023 — 2024",
      role: "Profesional SIG (Drones & GIS)",
      company: "GRUPO EMPRESARIAL OD // Barranquilla",
      desc: "Operación de sistemas RPAS para levantamientos fotogramétricos. Procesamiento de ortomosaicos y generación de MDE para proyectos de infraestructura vial.",
      tags: ["Drones", "Fotogrametría", "ArcGIS Pro"],
      current: false
    },
    {
      period: "2021 — 2022",
      role: "Digitalizador / Topógrafo",
      company: "CINTELI / Consorcio Vial BAQ // Barranquilla",
      desc: "Levantamientos topográficos viales y digitalización SIG para proyectos de infraestructura. Operación de sistemas GPS y producción cartográfica profesional.",
      tags: ["Topografía", "GPS", "AutoCAD"],
      current: false
    }
  ];

  return (
    <section id="timeline" className="relative w-full py-24 z-10 bg-gradient-to-b from-[#05070a] to-[#020406] overflow-hidden">

      {/* Background decor */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="w-[600px] h-[600px] bg-purple-500/5 rounded-full blur-[120px] absolute -bottom-1/4 -left-1/4"></div>
      </div>

      <div className="max-w-7xl mx-auto px-6 relative z-10">
        <div className="flex flex-col lg:flex-row gap-16">

          {/* Left: Sticky header */}
          <div className="w-full lg:w-2/5 lg:sticky lg:top-32 lg:self-start">
            <div className="flex items-center gap-4 mb-6">
              <div className="w-8 h-[1px] bg-gradient-to-r from-transparent to-purple-500"></div>
              <span className="text-purple-400 font-mono text-sm tracking-widest uppercase">
                Professional Chronology
              </span>
            </div>
            <h2 className="text-4xl md:text-5xl font-extrabold text-white tracking-tight mb-6">
              Trayectoria <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-500">Técnica</span>
            </h2>
            <p className="text-slate-400 leading-relaxed text-lg">
              +6 años de ingeniería GIS especializada y territorial en los proyectos catastrales y de infraestructura más complejos de Colombia.
            </p>
          </div>

          {/* Right: Timeline cards */}
          <div className="w-full lg:w-3/5">
            <div className="relative border-l-2 border-slate-800 ml-4 space-y-10">
              {experiences.map((exp, i) => (
                <div key={i} className="relative pl-10 group">

                  {/* Timeline dot */}
                  <div className={`absolute -left-[9px] top-2 w-4 h-4 rounded-full border-2 ${exp.current
                      ? "bg-[#f3ca20] border-[#f3ca20] shadow-[0_0_12px_rgba(243,202,32,0.5)]"
                      : "bg-slate-900 border-slate-600 group-hover:border-cyan-500 transition-colors"
                    }`}></div>

                  <div className={`p-8 rounded-2xl bg-[#0a0f16] border transition-all duration-300 ${exp.current
                      ? "border-[#f3ca20]/30 hover:border-[#f3ca20]/60 shadow-[0_0_30px_rgba(243,202,32,0.05)]"
                      : "border-slate-800 hover:border-cyan-500/40"
                    }`}>

                    <div className="font-mono text-xs text-slate-500 tracking-widest mb-2">{exp.period}</div>
                    <h3 className="text-xl font-bold text-white mb-1">{exp.role}</h3>
                    <div className={`font-mono text-xs mb-4 ${exp.current ? "text-[#f3ca20]" : "text-cyan-500"}`}>
                      {exp.company}
                    </div>
                    <p className="text-sm text-slate-400 leading-relaxed mb-6">{exp.desc}</p>

                    <div className="flex flex-wrap gap-2">
                      {exp.tags.map((tag, j) => (
                        <span key={j} className="px-2 py-1 text-[10px] font-mono text-slate-300 bg-slate-800 rounded">
                          {tag}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
