"use client";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Plus, Minus, Search, Mail } from "lucide-react";
import Link from "next/link";
import Logo from "../../components/Logo";

const FAQS = [
  {
    category: "Gobernanza & Estándares",
    questions: [
      {
        q: "¿Qué es el estándar LADM-COL y por qué es vital?",
        a: "El LADM-COL (ISO 19152) es el pilar de la administración de tierras en Colombia. Garantiza que la información de propiedad, derechos y restricciones sea interoperable entre el IGAC, la SNR y los municipios, asegurando la soberanía jurídica del dato."
      },
      {
        q: "¿Cómo aseguran la interoperabilidad con el IGAC?",
        a: "Nuestra arquitectura consume y genera archivos .XTF basados en modelos INTERLIS oficiales. Estamos alineados con los protocolos de la ICDE, facilitando el intercambio de información sin pérdida de integridad semántica."
      }
    ]
  },
  {
    category: "Ingeniería & Datos",
    questions: [
      {
        q: "¿Qué tecnologías de alto rendimiento utilizan?",
        a: "Implementamos motores de procesamiento masivo basados en Polars y DuckDB sobre infraestructuras Cloud-Native. Esto nos permite realizar análisis espaciales y validaciones topológicas en segundos, donde otros tardan horas."
      },
      {
        q: "¿Qué precisión tienen sus levantamientos LiDAR?",
        a: "Nuestros pipelines de procesamiento LiDAR garantizan una precisión submétrica y de grado milimétrico para infraestructura crítica, cumpliendo con los estándares más exigentes de ingeniería civil y catastro."
      }
    ]
  },
  {
    category: "Estrategia & Consultoría",
    questions: [
      {
        q: "¿Cómo beneficia DevGiz a un Gestor Catastral?",
        a: "Reducimos la carga operativa mediante la automatización de procesos de validación, garantizamos la calidad del dato antes de la radicación oficial y optimizamos los tiempos de actualización del inventario predial."
      },
      {
        q: "¿Ofrecen soluciones para el sector privado?",
        a: "Sí. Apoyamos a empresas de infraestructura, energía y agroindustria en la gestión táctica de sus activos territoriales y en el cumplimiento de normativas ambientales y legales."
      }
    ]
  }
];

function FAQAccordion({ q, a }) {
  const [isOpen, setIsOpen] = useState(false);
  
  return (
    <div className="border-b border-slate-100 last:border-0">
      <button 
        onClick={() => setIsOpen(!isOpen)}
        className="w-full py-8 flex items-center justify-between text-left group"
      >
        <span className={`text-xl font-bold tracking-tight transition-colors ${isOpen ? 'text-[#1a1a1a]' : 'text-slate-500 group-hover:text-[#1a1a1a]'}`}>
          {q}
        </span>
        <div className={`transition-all ${isOpen ? 'rotate-180 text-[#1a1a1a]' : 'text-slate-300'}`}>
          {isOpen ? <Minus className="w-5 h-5" /> : <Plus className="w-5 h-5" />}
        </div>
      </button>
      <AnimatePresence>
        {isOpen && (
          <motion.div 
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            className="overflow-hidden"
          >
            <div className="pb-10 text-lg text-slate-500 font-light leading-relaxed max-w-3xl">
              {a}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

export default function FAQPage() {
  const [activeCategory, setActiveCategory] = useState(FAQS[0].category);

  return (
    <main className="bg-[#fcfcfc] min-h-screen text-[#1a1a1a] selection:bg-slate-200 pt-40 pb-32">
      
      <div className="max-w-7xl mx-auto px-6">
        <div className="flex flex-col lg:flex-row justify-between items-start lg:items-end gap-12 mb-32">
          <div className="space-y-8">
            <div className="flex items-center gap-3">
              <span className="w-12 h-px bg-[#1a1a1a]"></span>
              <span className="text-[10px] font-mono uppercase tracking-[0.4em] text-slate-500 font-bold">Expert Support // Knowledge Center</span>
            </div>
            <h1 className="text-6xl md:text-8xl font-black tracking-tighter leading-[0.9] text-[#1a1a1a]">
              Consultoría de <br /> <span className="text-slate-400 italic font-light">Conocimiento</span>
            </h1>
          </div>
          <div className="max-w-sm">
            <p className="text-slate-500 text-lg font-light leading-relaxed">
              Resolvemos los desafíos técnicos y estratégicos más complejos de la gestión territorial moderna.
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-20">
          {/* Sidebar Navigation */}
          <div className="lg:col-span-3">
            <div className="sticky top-32 space-y-4">
              <div className="text-[10px] font-mono text-slate-400 uppercase tracking-widest mb-8">Categorías</div>
              {FAQS.map(cat => (
                <button
                  key={cat.category}
                  onClick={() => setActiveCategory(cat.category)}
                  className={`block w-full text-left text-xs font-bold uppercase tracking-[0.2em] py-3 border-l-2 pl-6 transition-all ${activeCategory === cat.category ? 'border-[#1a1a1a] text-[#1a1a1a]' : 'border-slate-100 text-slate-400 hover:border-slate-300 hover:text-slate-600'}`}
                >
                  {cat.category}
                </button>
              ))}

              <div className="mt-16 p-8 bg-white border border-slate-100 rounded-sm space-y-6">
                <div className="text-[10px] font-mono text-slate-400 uppercase tracking-widest">Newsletter</div>
                <h3 className="text-sm font-black leading-tight uppercase">Territorial Intelligence Brief</h3>
                <p className="text-xs text-slate-500 font-light leading-relaxed">Reciba mensualmente análisis técnicos sobre el catastro en Colombia.</p>
                <div className="flex flex-col gap-3">
                  <input type="email" placeholder="Email institucional" className="bg-[#fafafa] border border-slate-100 p-3 text-[10px] font-mono focus:outline-none focus:border-slate-400" />
                  <button className="bg-[#1a1a1a] text-white text-[9px] font-bold py-3 uppercase tracking-widest hover:bg-slate-800 transition-all">Suscribirse</button>
                </div>
              </div>
            </div>
          </div>

          {/* Main Content */}
          <div className="lg:col-span-9">
            <div className="bg-white border border-slate-100 p-8 lg:p-16 shadow-sm min-h-[600px]">
              <div className="mb-12 flex items-center justify-between border-b border-slate-100 pb-8">
                <h2 className="text-3xl font-black tracking-tight">{activeCategory}</h2>
                <div className="relative">
                  <Search className="w-4 h-4 text-slate-300 absolute left-3 top-1/2 -translate-y-1/2" />
                  <input type="text" placeholder="Buscar solución..." className="pl-10 pr-4 py-2 bg-[#fafafa] border border-slate-100 text-xs font-mono rounded-full focus:outline-none focus:border-slate-400" />
                </div>
              </div>
              
              <div className="space-y-0">
                {FAQS.find(cat => cat.category === activeCategory).questions.map((faq, i) => (
                  <FAQAccordion key={i} q={faq.q} a={faq.a} />
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Footer Link */}
        <div className="mt-32 pt-20 border-t border-slate-100 flex flex-col md:flex-row justify-between items-center gap-8">
          <div className="flex items-center gap-4">
             <Logo className="w-12 h-12 opacity-80" />
             <div className="flex flex-col">
                <span className="text-xs font-black uppercase tracking-widest text-[#1a1a1a]">DevGiz Knowledge Board</span>
                <span className="text-[10px] text-slate-400 font-mono">Última actualización: Mayo 2026</span>
             </div>
          </div>
          <Link href="/#contact" className="px-12 py-5 bg-[#1a1a1a] text-white text-[10px] font-bold uppercase tracking-[0.2em] hover:bg-slate-800 transition-all shadow-xl">
             Iniciar Auditoría Técnica
          </Link>
        </div>
      </div>

    </main>
  );
}
