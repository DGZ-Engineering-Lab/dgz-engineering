"use client";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Code, Map, Shield, Zap, ArrowRight, ChevronDown, ChevronUp, Send, Terminal, CheckCircle2 } from "lucide-react";
import Link from "next/link";
import Logo from "../../components/Logo";

const POSITIONS = [
  {
    id: "gis-eng",
    title: "Senior GIS Engineer",
    type: "Full-time // Remote",
    team: "Spatial Architecture",
    desc: "Liderar el desarrollo de algoritmos de procesamiento masivo para bases de datos catastrales de escala nacional.",
    responsibilities: [
      "Diseñar y optimizar pipelines de datos espaciales paralelos utilizando Polars y DuckDB.",
      "Desarrollar algoritmos avanzados de validación topológica para millones de parcelas en tiempo real.",
      "Garantizar la correcta transformación de coordenadas a la proyección de Origen Único Nacional CTM12.",
      "Colaborar en el mantenimiento y evolución del LADM-COL QGIS Plugin oficial."
    ],
    requirements: [
      "5+ años de experiencia en desarrollo de software geoespacial y administración de tierras.",
      "Dominio avanzado de Python, C++ o Rust aplicado a análisis de datos vectoriales y raster.",
      "Experiencia profunda con PostGIS, GDAL/OGR, y optimización de índices espaciales GIST.",
      "Comprensión absoluta del estándar ISO 19152 (LADM) y su perfil LADM-COL."
    ],
    perks: [
      "Compensación premium en USD con esquemas flexibles.",
      "Esquema 100% remoto con subsidio de equipamiento de oficina.",
      "Presupuesto anual dedicado para capacitaciones, certificaciones y eventos GIS internacionales.",
      "Oportunidad única de impactar la soberanía territorial y digital de Colombia."
    ]
  },
  {
    id: "ladm-legal",
    title: "LADM-COL Legal Expert",
    type: "Contract // Hybrid",
    team: "Legal Governance",
    desc: "Garantizar la armonización normativa de nuestros sistemas con la legislación de tierras vigente en Colombia.",
    responsibilities: [
      "Asesorar técnicamente al equipo de ingeniería en la codificación de reglas jurídicas de tenencia de la tierra.",
      "Garantizar el pleno cumplimiento de resoluciones catastrales clave (Resoluciones 1040/2020 y 1149/2021 del IGAC).",
      "Modelar e implementar el registro de restricciones de linderos, servidumbres y derechos de ocupación informal.",
      "Dirigir las mesas de trabajo normativo y acompañar a los gestores catastrales durante las entregas oficiales."
    ],
    requirements: [
      "Profesional en Derecho o Ingeniería Catastral con especialización en Derecho de Tierras o Catastro Multipropósito.",
      "3+ años de experiencia trabajando directamente con el IGAC, la SNR o Oficinas de Registro (ORIP).",
      "Dominio práctico del estándar LADM-COL v2.x y v3.0, así como del lenguaje de modelado INTERLIS.",
      "Experiencia comprobada en procesos de saneamiento predial e informalidad territorial."
    ],
    perks: [
      "Modalidad de contratación flexible de alta escala.",
      "Entorno colaborativo con ingenieros de software y expertos en datos de clase mundial.",
      "Participación directa en proyectos de consultoría territorial de impacto nacional.",
      "Acceso ilimitado a nuestros programas de formación y certificación interna."
    ]
  },
  {
    id: "backend-arch",
    title: "Backend Architect (Spatial Data)",
    type: "Full-time // Remote",
    team: "Infrastructure",
    desc: "Diseñar infraestructuras de alta disponibilidad basadas en PostGIS, DuckDB y protocolos de seguridad Zero Trust.",
    responsibilities: [
      "Diseñar la arquitectura cloud geoespacial (Vercel, AWS, PostGIS gestionado) escalable horizontalmente.",
      "Implementar microservicios seguros y APIs de alto rendimiento con validación topológica y caching.",
      "Configurar políticas de seguridad Zero-Trust y encriptación robusta para datos catastrales sensibles (Ley 1581).",
      "Establecer pipelines de despliegue continuo (CI/CD) atómicos y reversibles para infraestructuras distribuidas."
    ],
    requirements: [
      "6+ años de experiencia como Arquitecto Backend o Ingeniero Principal de Infraestructura.",
      "Experiencia especializada en almacenamiento y persistencia espacial con PostgreSQL/PostGIS a gran escala.",
      "Conocimiento práctico de Docker, Kubernetes, bases de datos en memoria (Redis) y balanceadores de carga.",
      "Familiaridad con normativas de seguridad de la información del MINTIC para el sector público."
    ],
    perks: [
      "Salario altamente competitivo con revisiones de desempeño semestrales.",
      "Seguro médico internacional privado de cobertura completa.",
      "Horario flexible orientado a objetivos y cultura basada en la confianza absoluta.",
      "Soporte corporativo para patentes y contribuciones al ecosistema Open Source."
    ]
  }
];

export default function CareersPage() {
  const [expandedJob, setExpandedJob] = useState(null);
  
  // Application Form State
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    portfolio: "",
    pitch: ""
  });
  const [formSubmitted, setFormSubmitted] = useState(false);
  const [formLoading, setFormLoading] = useState(false);
  const [consoleLogs, setConsoleLogs] = useState([]);

  const toggleExpand = (jobId) => {
    if (expandedJob === jobId) {
      setExpandedJob(null);
    } else {
      setExpandedJob(jobId);
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const submitApplication = (e, jobTitle) => {
    e.preventDefault();
    if (!formData.name || !formData.email) return;

    setFormLoading(true);
    setConsoleLogs([]);

    const logs = [
      `📡  [Gateway] Ingestando datos de postulación para: ${jobTitle}...`,
      "🔒  [Crypto] Generando hash de integridad del candidato...",
      "🔬  [Parser] Extrayendo metadatos de perfil profesional...",
      "💾  [Registry] Escribiendo credenciales en nodo de talentos cifrado...",
      "✨  [LADM-COL Agent] Registro completado de forma segura."
    ];

    let logIndex = 0;
    const interval = setInterval(() => {
      if (logIndex < logs.length) {
        setConsoleLogs(prev => [...prev, logs[logIndex]]);
        logIndex++;
      } else {
        clearInterval(interval);
        setFormLoading(false);
        setFormSubmitted(true);
      }
    }, 600);
  };

  const resetForm = () => {
    setFormData({ name: "", email: "", portfolio: "", pitch: "" });
    setFormSubmitted(false);
    setConsoleLogs([]);
  };

  return (
    <main className="bg-[#fcfcfc] min-h-screen text-[#1a1a1a] selection:bg-slate-200 pt-40 pb-32 overflow-x-hidden">
      
      {/* Header Section */}
      <section className="max-w-7xl mx-auto px-6 mb-32">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-end">
          <div className="lg:col-span-8 space-y-8">
            <div className="flex items-center gap-3">
              <span className="w-12 h-px bg-[#1a1a1a]"></span>
              <span className="text-[10px] font-mono uppercase tracking-[0.4em] text-slate-500 font-bold">Talent Acquisition // Join the Elite</span>
            </div>
            <h1 className="text-6xl md:text-8xl font-black tracking-tighter leading-[0.9] text-[#1a1a1a]">
              Ingeniería de <br /> <span className="text-slate-400 italic font-light">Misión Crítica</span>
            </h1>
          </div>
          <div className="lg:col-span-4 border-l border-slate-200 pl-8 pb-2">
            <p className="text-slate-500 text-lg font-light leading-relaxed">
              Buscamos a las mentes más brillantes en geociencias, derecho de tierras y desarrollo de software espacial para liderar los procesos de modernización territorial del país.
            </p>
          </div>
        </div>
      </section>

      {/* Core Values Section */}
      <section className="max-w-7xl mx-auto px-6 mb-40">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 border-y border-slate-100 py-20">
          <div className="space-y-6">
            <div className="w-10 h-10 bg-slate-100 flex items-center justify-center rounded-sm"><Code className="w-5 h-5" /></div>
            <h3 className="text-xl font-black tracking-tight">Stack Moderno</h3>
            <p className="text-sm text-slate-500 font-light leading-relaxed">Operamos con motores de datos espaciales paralelos basados en Polars, DuckDB y PostGIS de alto rendimiento.</p>
          </div>
          <div className="space-y-6">
            <div className="w-10 h-10 bg-slate-100 flex items-center justify-center rounded-sm"><Shield className="w-5 h-5" /></div>
            <h3 className="text-xl font-black tracking-tight">Soberanía Real</h3>
            <p className="text-sm text-slate-500 font-light leading-relaxed">Su trabajo impactará directamente en la seguridad jurídica territorial y la autonomía digital de municipios y departamentos.</p>
          </div>
          <div className="space-y-6">
            <div className="w-10 h-10 bg-slate-100 flex items-center justify-center rounded-sm"><Zap className="w-5 h-5" /></div>
            <h3 className="text-xl font-black tracking-tight">Cultura de Élite</h3>
            <p className="text-sm text-slate-500 font-light leading-relaxed">Fomentamos un entorno de aprendizaje continuo, excelencia técnica rigurosa y responsabilidad absoluta sobre los resultados.</p>
          </div>
        </div>
      </section>

      {/* Open Positions Grid */}
      <section className="max-w-7xl mx-auto px-6">
        <div className="flex justify-between items-end mb-16">
          <div className="space-y-2">
            <div className="text-[10px] font-mono text-slate-400 uppercase tracking-widest">Active Search</div>
            <h2 className="text-4xl font-black tracking-tighter">Posiciones <span className="text-slate-400 italic font-light">Abiertas</span></h2>
          </div>
          <div className="text-xs font-bold text-[#1a1a1a] uppercase tracking-widest">{POSITIONS.length} Oportunidades</div>
        </div>

        <div className="space-y-6">
          {POSITIONS.map((job) => {
            const isExpanded = expandedJob === job.id;
            return (
              <div 
                key={job.id} 
                className={`group p-8 lg:p-12 bg-white border border-slate-100 hover:border-slate-300 transition-all duration-500 rounded-2xl relative overflow-hidden ${
                  isExpanded ? 'shadow-2xl border-slate-350 bg-slate-50/50' : 'hover:shadow-lg'
                }`}
              >
                <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-8 relative z-10">
                  <div className="space-y-3 lg:max-w-2xl">
                    <div className="flex flex-wrap items-center gap-3">
                      <span className="text-[10px] font-mono text-slate-400 uppercase tracking-widest">{job.team}</span>
                      <span className="w-1.5 h-1.5 bg-slate-200 rounded-full"></span>
                      <span className="text-[10px] font-mono text-emerald-500 uppercase tracking-widest font-black">{job.type}</span>
                    </div>
                    <h3 className="text-3xl font-black tracking-tight group-hover:text-slate-700 transition-colors">{job.title}</h3>
                    <p className="text-slate-500 font-light leading-relaxed text-sm lg:text-base">{job.desc}</p>
                  </div>
                  
                  <button 
                    onClick={() => toggleExpand(job.id)}
                    className="w-full lg:w-auto px-10 py-5 bg-[#1a1a1a] hover:bg-slate-800 text-white text-[10px] font-black uppercase tracking-[0.2em] transition-all flex items-center justify-center gap-4 rounded-xl cursor-pointer"
                  >
                     {isExpanded ? 'Cerrar Detalles' : 'Ver Detalles'} 
                     {isExpanded ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
                  </button>
                </div>

                {/* Staggered Expandable Details Section */}
                <AnimatePresence>
                  {isExpanded && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
                      className="overflow-hidden"
                    >
                      <div className="pt-12 mt-8 border-t border-slate-200 grid grid-cols-1 lg:grid-cols-12 gap-12">
                         
                         {/* Left Details lists */}
                         <div className="lg:col-span-7 space-y-8">
                            <div className="space-y-3">
                               <h4 className="text-xs font-mono uppercase tracking-widest text-[#1a1a1a] font-bold">Responsabilidades clave</h4>
                               <ul className="space-y-2.5">
                                  {job.responsibilities.map((item, idx) => (
                                     <li key={idx} className="text-xs text-slate-500 font-light leading-relaxed flex items-start gap-2.5">
                                        <span className="w-1.5 h-1.5 bg-slate-300 rounded-full mt-1.5 flex-shrink-0"></span>
                                        {item}
                                     </li>
                                  ))}
                               </ul>
                            </div>

                            <div className="space-y-3">
                               <h4 className="text-xs font-mono uppercase tracking-widest text-[#1a1a1a] font-bold">Requisitos del Nodo</h4>
                               <ul className="space-y-2.5">
                                  {job.requirements.map((item, idx) => (
                                     <li key={idx} className="text-xs text-slate-500 font-light leading-relaxed flex items-start gap-2.5">
                                        <span className="w-1.5 h-1.5 bg-[#1a1a1a] rounded-full mt-1.5 flex-shrink-0"></span>
                                        {item}
                                     </li>
                                  ))}
                               </ul>
                            </div>

                            <div className="space-y-3">
                               <h4 className="text-xs font-mono uppercase tracking-widest text-emerald-600 font-bold">Beneficios & Compensación</h4>
                               <ul className="space-y-2.5">
                                  {job.perks.map((item, idx) => (
                                     <li key={idx} className="text-xs text-slate-500 font-light leading-relaxed flex items-start gap-2.5">
                                        <span className="w-1.5 h-1.5 bg-emerald-500 rounded-full mt-1.5 flex-shrink-0"></span>
                                        {item}
                                     </li>
                                  ))}
                               </ul>
                            </div>
                         </div>

                         {/* Right Interactive Application Form (Business Plus) */}
                         <div className="lg:col-span-5 bg-[#fafafa] border border-slate-200/60 p-8 rounded-2xl space-y-6">
                            <h4 className="text-sm font-black uppercase tracking-wider flex items-center gap-2">
                               <Send className="w-4 h-4" /> Enviar Postulación Express
                            </h4>
                            
                            {!formSubmitted ? (
                               <form onSubmit={(e) => submitApplication(e, job.title)} className="space-y-4">
                                  <div className="space-y-1.5">
                                     <label className="text-[9px] font-mono text-slate-400 uppercase tracking-widest font-bold">Nombre Completo</label>
                                     <input 
                                       required
                                       type="text" 
                                       name="name"
                                       value={formData.name}
                                       onChange={handleInputChange}
                                       placeholder="Juan Pérez" 
                                       className="w-full bg-white border border-slate-200/80 p-3 text-[11px] font-mono focus:outline-none focus:border-slate-500 rounded-lg transition-colors" 
                                     />
                                  </div>
                                  <div className="space-y-1.5">
                                     <label className="text-[9px] font-mono text-slate-400 uppercase tracking-widest font-bold">Email Institucional / Personal</label>
                                     <input 
                                       required
                                       type="email" 
                                       name="email"
                                       value={formData.email}
                                       onChange={handleInputChange}
                                       placeholder="juan.perez@devgiz.com" 
                                       className="w-full bg-white border border-slate-200/80 p-3 text-[11px] font-mono focus:outline-none focus:border-slate-500 rounded-lg transition-colors" 
                                     />
                                  </div>
                                  <div className="space-y-1.5">
                                     <label className="text-[9px] font-mono text-slate-400 uppercase tracking-widest font-bold">GitHub / LinkedIn / Portfolio URL</label>
                                     <input 
                                       type="url" 
                                       name="portfolio"
                                       value={formData.portfolio}
                                       onChange={handleInputChange}
                                       placeholder="https://github.com/juanperez" 
                                       className="w-full bg-white border border-slate-200/80 p-3 text-[11px] font-mono focus:outline-none focus:border-slate-500 rounded-lg transition-colors" 
                                     />
                                  </div>
                                  <div className="space-y-1.5">
                                     <label className="text-[9px] font-mono text-slate-400 uppercase tracking-widest font-bold">¿Por qué es el nodo idóneo?</label>
                                     <textarea 
                                       name="pitch"
                                       value={formData.pitch}
                                       onChange={handleInputChange}
                                       rows="3"
                                       placeholder="Describa brevemente su trayectoria geoespacial o de software..." 
                                       className="w-full bg-white border border-slate-200/80 p-3 text-[11px] font-mono focus:outline-none focus:border-slate-500 rounded-lg transition-colors resize-none" 
                                     />
                                  </div>

                                  {/* Cyber-processing console during submit */}
                                  {consoleLogs.length > 0 && (
                                     <div className="bg-black p-4 rounded-lg font-mono text-[9px] text-cyan-400 space-y-1 max-h-[120px] overflow-y-auto">
                                        {consoleLogs.map((log, i) => (
                                           <div key={i}>{log}</div>
                                        ))}
                                        {formLoading && (
                                           <div className="animate-pulse text-slate-500">Procesando metadatos...</div>
                                        )}
                                     </div>
                                  )}

                                  <button
                                    type="submit"
                                    disabled={formLoading}
                                    className="w-full bg-[#1a1a1a] hover:bg-slate-800 text-white text-[9px] font-bold py-3.5 uppercase tracking-widest transition-all rounded-lg flex items-center justify-center gap-2 cursor-pointer disabled:opacity-50"
                                  >
                                     <Send className="w-3 h-3" /> Registrar Postulación
                                  </button>
                               </form>
                            ) : (
                               <motion.div 
                                 initial={{ scale: 0.95, opacity: 0 }}
                                 animate={{ scale: 1, opacity: 1 }}
                                 className="text-center py-10 space-y-6"
                               >
                                  <div className="w-14 h-14 bg-emerald-50 rounded-full flex items-center justify-center mx-auto text-emerald-500">
                                     <CheckCircle2 className="w-8 h-8" />
                                  </div>
                                  <div className="space-y-2">
                                     <h5 className="font-black text-sm uppercase tracking-wide">¡Registro Exitoso!</h5>
                                     <p className="text-xs text-slate-500 font-light leading-relaxed">
                                        Sus credenciales han sido cifradas y almacenadas en nuestro nodo de recursos humanos.
                                     </p>
                                  </div>
                                  <div className="p-4 bg-white border border-slate-200 rounded-lg font-mono text-[9px] text-slate-500">
                                     CANDIDATE_HASH: 0x8a7f92023d8c1c4f
                                  </div>
                                  <button
                                    onClick={resetForm}
                                    className="text-[9px] font-black uppercase tracking-widest text-[#1a1a1a] hover:text-slate-600 transition-colors cursor-pointer"
                                  >
                                     Postular a otro nodo
                                  </button>
                               </motion.div>
                            )}
                         </div>

                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>

              </div>
            );
          })}
        </div>
      </section>

      {/* Manifest Banner */}
      <section className="max-w-7xl mx-auto px-6 mt-40">
        <div className="bg-[#1a1a1a] text-white p-12 lg:p-24 rounded-3xl text-center space-y-10 relative overflow-hidden shadow-2xl">
          <div className="absolute top-0 left-0 p-12 opacity-5 pointer-events-none">
             <Logo className="w-64 h-64" />
          </div>
          <h2 className="text-4xl md:text-6xl font-black tracking-tighter leading-tight relative z-10">
            No buscamos empleados. <br /> <span className="text-slate-500 font-light italic">Buscamos Arquitectos del Territorio.</span>
          </h2>
          <p className="max-w-2xl mx-auto text-slate-400 text-lg font-light leading-relaxed relative z-10">
            Si cree que tiene lo necesario para integrarse en una de las firmas de ingeniería geoespacial más avanzadas del país, queremos conocerle.
          </p>
          <div className="pt-8 relative z-10">
            <a href="mailto:careers@devgiz.com" className="text-[11px] font-black uppercase tracking-[0.3em] border-b-2 border-white pb-2 hover:text-slate-400 hover:border-slate-400 transition-all">
              careers@devgiz.com
            </a>
          </div>
        </div>
      </section>

      {/* Footer link */}
      <div className="max-w-7xl mx-auto px-6 mt-32 flex flex-col md:flex-row justify-between items-center border-t border-slate-100 pt-20 gap-8">
        <div className="flex items-center gap-4">
           <Logo className="w-12 h-12 opacity-80" />
           <div className="flex flex-col">
              <span className="text-xs font-black uppercase tracking-widest text-[#1a1a1a]">DevGiz Talent Portal</span>
              <span className="text-[10px] text-slate-400 font-mono">Build with Purpose // 2026</span>
           </div>
        </div>
        <Link href="/" className="text-[10px] font-bold uppercase tracking-[0.2em] text-slate-500 hover:text-[#1a1a1a] transition-all">
           Volver al Inicio
        </Link>
      </div>

    </main>
  );
}
