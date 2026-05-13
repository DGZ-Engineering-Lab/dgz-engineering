export default function OperatorProfileSection() {
  return (
    <section id="profile" className="relative w-full py-24 z-10 bg-[#05070a] border-t border-slate-800">
      <div className="max-w-7xl mx-auto px-6">

        {/* Header */}
        <div className="flex flex-col items-center text-center mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1 mb-6 border border-[#f3ca20]/30 bg-[#f3ca20]/10 rounded-full text-[#f3ca20] font-mono text-xs tracking-widest uppercase">
            <span className="w-2 h-2 bg-[#f3ca20] rounded-full animate-pulse"></span>
            MASTER BIO-NEURAL PROFILE
          </div>
          <h2 className="text-4xl md:text-5xl font-extrabold text-white tracking-tight">
            Lead <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#f3ca20] to-[#f39c12]">Architect</span>
          </h2>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">

          {/* Left Column: Core Identity & DNA */}
          <div className="col-span-1 lg:col-span-4 space-y-6">

            {/* Profile Core */}
            <div className="p-8 rounded-2xl bg-[#0a0f16] border border-slate-800 hover:border-[#f3ca20]/50 transition-colors">
              <div className="w-16 h-16 rounded-full bg-[#f3ca20]/10 flex items-center justify-center mb-6 border border-[#f3ca20]/30">
                <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="#f3ca20" strokeWidth="1.5">
                  <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path>
                  <circle cx="12" cy="7" r="4"></circle>
                </svg>
              </div>
              <h3 className="text-xl font-bold text-white mb-2 tracking-wide">ALBERT DANIEL<br />GAVIRIA ZAPATA</h3>
              <div className="font-mono text-[10px] text-slate-500 mb-4 leading-relaxed tracking-wider">
                ID: COLOMBIANO // HQ: MEDELLÍN<br />
                V5.2_SYSTEM // 25A<br />
                STATUS: <span className="text-emerald-400">ACTIVO</span> // DESPLIEGUE INMEDIATO
              </div>
              <p className="text-sm text-slate-400 leading-relaxed mb-6">
                Profesional SIG con una visión integral que fusiona la excelencia técnica en Sistemas de Información Geográfica con maestría en arquitectura de bases de datos y desarrollo de software.
              </p>

              <div className="space-y-2 mb-8">
                {["SIG + Python/SQL Technologist", "Expert: ArcGIS Pro, QGIS, Civil 3D", "QA/QC & Property Management", "LADM-COL & IGAC Standards"].map(skill => (
                  <div key={skill} className="flex items-center gap-2 text-xs font-mono text-slate-300">
                    <span className="text-emerald-400">✓</span> {skill}
                  </div>
                ))}
              </div>

              <a href="#" className="flex items-center justify-center gap-2 w-full py-3 bg-[#f3ca20]/10 text-[#f3ca20] border border-[#f3ca20]/30 rounded-lg hover:bg-[#f3ca20] hover:text-black transition-colors font-bold text-sm tracking-widest">
                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" /></svg>
                DOWNLOAD DATASHEET
              </a>
            </div>

            {/* Polyglot Stream */}
            <div className="p-8 rounded-2xl bg-[#0a0f16] border border-slate-800">
              <h4 className="text-[10px] text-slate-500 font-mono tracking-widest mb-6">IDIOMAS</h4>
              <div className="space-y-4">
                {[
                  { lang: "Español", lvl: "Native", color: "text-emerald-400" },
                  { lang: "English", lvl: "C1_ADV", color: "text-cyan-400" },
                  { lang: "Français", lvl: "B1_INT", color: "text-[#f3ca20]" },
                  { lang: "Deutsch", lvl: "B1_INT", color: "text-[#f3ca20]" }
                ].map(l => (
                  <div key={l.lang} className="flex justify-between items-center text-sm font-mono border-b border-slate-800/50 pb-2">
                    <span className="text-slate-300">{l.lang}</span>
                    <span className={l.color}>{l.lvl}</span>
                  </div>
                ))}
              </div>
            </div>

          </div>

          {/* Center Column: Experience Log */}
          <div className="col-span-1 lg:col-span-5 space-y-6">

            <div className="p-8 rounded-2xl bg-[#0a0f16] border border-slate-800 h-full">
              <h4 className="text-[10px] text-slate-500 font-mono tracking-widest mb-6">EXPERIENCIA PROFESIONAL</h4>

              <div className="relative border-l border-slate-800 ml-3 space-y-8 pb-4">

                {/* Current Mission */}
                <div className="relative pl-6">
                  <div className="absolute w-3 h-3 bg-[#f3ca20] rounded-full -left-[6.5px] top-1 shadow-[0_0_10px_#f3ca20]"></div>
                  <h5 className="text-lg font-bold text-white leading-tight">Analista Geográfico</h5>
                  <div className="text-xs font-mono text-[#f3ca20] my-2">GEOGRAFÍA SATELITAL GEOSAT S.A.S. // 09/2025 - 12/2025</div>
                  <p className="text-sm text-slate-400 leading-relaxed">
                    Procesamiento avanzado de información geoespacial mediante fotointerpretación, análisis de insumos 360° y restitución vectorial. Digitalización masiva para actualización catastral con validación topológica.
                  </p>
                </div>

                {/* History Items */}
                {[
                  { role: "Coordinador Profesional SIG", company: "UT SMART CITY", date: "2024 - ACTUAL" },
                  { role: "Control Calidad Catastral (QA/QC)", company: "ACCION DEL CAUCA", date: "2025" },
                  { role: "Coordinador & Líder de Campo", company: "ARBIRTRIUM S.A.S", date: "2024 - 2025" },
                  { role: "Profesional SIG (Drones & GIS)", company: "GRUPO EMPRESARIAL OD", date: "2023 - 2024" }
                ].map((exp, i) => (
                  <div key={i} className="relative pl-6">
                    <div className="absolute w-2 h-2 bg-slate-600 rounded-full -left-[4px] top-1.5"></div>
                    <h5 className="text-sm font-bold text-slate-200">{exp.role}</h5>
                    <div className="text-[10px] font-mono text-cyan-500 mt-1">{exp.company} // {exp.date}</div>
                  </div>
                ))}

              </div>
            </div>

          </div>

          {/* Right Column: Academic, DNA, Credentials */}
          <div className="col-span-1 lg:col-span-3 space-y-6">

            {/* Academic Trajectory */}
            <div className="p-6 rounded-2xl bg-[#0a0f16] border border-slate-800">
              <h4 className="text-[10px] text-slate-500 font-mono tracking-widest mb-4">FORMACIÓN ACADÉMICA</h4>
              <div className="space-y-4">
                <div>
                  <h5 className="text-sm font-bold text-white">Ingeniería de Sistemas (C)</h5>
                  <div className="text-[10px] font-mono text-emerald-400">EAFIT // 2024 - ACTUAL</div>
                </div>
                <div>
                  <h5 className="text-sm font-bold text-white">Técnico Conservación</h5>
                  <div className="text-[10px] font-mono text-emerald-400">SENA // 2019</div>
                </div>
              </div>
            </div>

            {/* Technical DNA (Bars) */}
            <div className="p-6 rounded-2xl bg-[#0a0f16] border border-slate-800">
              <h4 className="text-[10px] text-slate-500 font-mono tracking-widest mb-4">HERRAMIENTAS TÉCNICAS</h4>
              <div className="space-y-3">
                {[
                  { name: "QGIS / ArcGIS Pro", val: "100%" },
                  { name: "SQL Server / AutoCAD", val: "90%" },
                  { name: "Civil 3D / Photoshop", val: "90%" },
                  { name: "PostgreSQL / PostGIS", val: "85%" },
                  { name: "Python / Web Dev", val: "85%" },
                  { name: "Global Mapper", val: "80%" }
                ].map(dna => (
                  <div key={dna.name}>
                    <div className="flex justify-between text-[10px] font-mono mb-1">
                      <span className="text-slate-300">{dna.name}</span>
                      <span className="text-cyan-400">{dna.val}</span>
                    </div>
                    <div className="w-full h-1 bg-slate-800 rounded-full overflow-hidden">
                      <div className="h-full bg-gradient-to-r from-cyan-600 to-cyan-400" style={{ width: dna.val }}></div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Verified Recognitions */}
            <div className="p-6 rounded-2xl bg-[#0a0f16] border border-slate-800">
              <h4 className="text-[10px] text-slate-500 font-mono tracking-widest mb-4">RECONOCIMIENTOS</h4>
              <div className="space-y-3">
                {[
                  { icon: "⭐", title: "Sistemas de Gestión", date: "2023" },
                  { icon: "🌍", title: "Instituto Ambiental SIG", date: "2023" },
                  { icon: "⚡", title: "Diseño Eléctrico", date: "Training" },
                  { icon: "👷", title: "Seguridad y Salud", date: "SG-SST" }
                ].map((rec, i) => (
                  <div key={i} className="flex items-center gap-3">
                    <span className="text-sm bg-slate-800 p-1.5 rounded">{rec.icon}</span>
                    <div>
                      <div className="text-xs font-bold text-slate-200">{rec.title}</div>
                      <div className="text-[9px] font-mono text-slate-500 uppercase">{rec.date}</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

          </div>

        </div>
      </div>
    </section>
  );
}
