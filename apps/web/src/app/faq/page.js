"use client";
import { useState, useRef, useMemo } from "react";
import { motion, AnimatePresence, useInView } from "framer-motion";
import { Plus, Minus, Search, Mail, ArrowRight } from "lucide-react";
import Link from "next/link";
import Logo from "../../components/Logo";
import { FAQS } from "../../data/faqData";

function FAQAccordion({ q, a, index }) {
  const [isOpen, setIsOpen] = useState(false);
  
  return (
    <motion.div 
      className="border-b border-slate-100 last:border-0"
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.08 }}
    >
      <button 
        onClick={() => setIsOpen(!isOpen)}
        className="w-full py-8 flex items-center justify-between text-left group cursor-pointer"
      >
        <span className={`text-xl font-bold tracking-tight transition-colors duration-300 ${isOpen ? 'text-[#1a1a1a]' : 'text-slate-500 group-hover:text-[#1a1a1a]'}`}>
          {q}
        </span>
        <div className={`w-8 h-8 rounded-full flex items-center justify-center transition-all duration-300 flex-shrink-0 ml-4 ${
          isOpen ? 'bg-[#1a1a1a] text-white rotate-0' : 'bg-slate-100 text-slate-400 group-hover:bg-slate-200'
        }`}>
          {isOpen ? <Minus className="w-4 h-4" /> : <Plus className="w-4 h-4" />}
        </div>
      </button>
      <AnimatePresence>
        {isOpen && (
          <motion.div 
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
            className="overflow-hidden"
          >
            <div className="pb-10 text-lg text-slate-500 font-light leading-relaxed max-w-3xl pl-0 border-l-2 border-slate-200 ml-1 pl-6">
              {a}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}

export default function FAQPage() {
  const [activeCategory, setActiveCategory] = useState(FAQS[0].category);
  const [searchQuery, setSearchQuery] = useState("");
  const headerRef = useRef(null);
  const headerInView = useInView(headerRef, { once: true });

  const activeFAQs = useMemo(() => {
    const cat = FAQS.find(cat => cat.category === activeCategory);
    if (!searchQuery.trim()) return cat?.questions || [];
    return cat?.questions.filter(
      faq => faq.q.toLowerCase().includes(searchQuery.toLowerCase()) || 
             faq.a.toLowerCase().includes(searchQuery.toLowerCase())
    ) || [];
  }, [activeCategory, searchQuery]);

  const totalQuestions = FAQS.reduce((acc, cat) => acc + cat.questions.length, 0);

  return (
    <main className="bg-[#fcfcfc] min-h-screen text-[#1a1a1a] selection:bg-slate-200 pt-40 pb-32">
      
      <div className="max-w-7xl mx-auto px-6" ref={headerRef}>
        <motion.div 
          className="flex flex-col lg:flex-row justify-between items-start lg:items-end gap-12 mb-32"
          initial="hidden"
          animate={headerInView ? "visible" : "hidden"}
          variants={{ hidden: {}, visible: { transition: { staggerChildren: 0.1 } } }}
        >
          <motion.div 
            className="space-y-8"
            variants={{ hidden: { opacity: 0, y: 20 }, visible: { opacity: 1, y: 0, transition: { duration: 0.6 } } }}
          >
            <div className="flex items-center gap-3">
              <span className="w-12 h-px bg-[#1a1a1a]"></span>
              <span className="text-[10px] font-mono uppercase tracking-[0.4em] text-slate-500 font-bold">Expert Support // Knowledge Center</span>
            </div>
            <h1 className="text-6xl md:text-8xl font-black tracking-tighter leading-[0.9] text-[#1a1a1a]">
              Consultoría de <br /> <span className="text-slate-400 italic font-light">Conocimiento</span>
            </h1>
          </motion.div>
          <motion.div 
            className="max-w-sm"
            variants={{ hidden: { opacity: 0, x: 20 }, visible: { opacity: 1, x: 0, transition: { duration: 0.6, delay: 0.2 } } }}
          >
            <p className="text-slate-500 text-lg font-light leading-relaxed">
              Resolvemos los desafíos técnicos y estratégicos más complejos de la gestión territorial moderna.
            </p>
            <div className="mt-4 flex items-center gap-4 text-[10px] font-mono text-slate-400">
              <span className="px-3 py-1.5 bg-slate-100 rounded-full font-bold">{totalQuestions} Respuestas</span>
              <span className="px-3 py-1.5 bg-slate-100 rounded-full font-bold">{FAQS.length} Categorías</span>
            </div>
          </motion.div>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-20">
          {/* Sidebar Navigation */}
          <div className="lg:col-span-3">
            <div className="sticky top-32 space-y-4">
              <div className="text-[10px] font-mono text-slate-400 uppercase tracking-widest mb-8">Categorías</div>
              {FAQS.map(cat => {
                const Icon = cat.icon;
                return (
                  <button
                    key={cat.category}
                    onClick={() => { setActiveCategory(cat.category); setSearchQuery(""); }}
                    className={`block w-full text-left text-xs font-bold uppercase tracking-[0.15em] py-4 px-6 border-l-2 transition-all duration-300 flex items-center gap-3 cursor-pointer ${
                      activeCategory === cat.category 
                        ? 'border-[#1a1a1a] text-[#1a1a1a] bg-white shadow-sm rounded-r-lg' 
                        : 'border-slate-100 text-slate-400 hover:border-slate-300 hover:text-slate-600 hover:bg-white/50'
                    }`}
                  >
                    <Icon className={`w-4 h-4 flex-shrink-0 ${activeCategory === cat.category ? 'text-[#1a1a1a]' : 'text-slate-300'}`} />
                    {cat.category}
                  </button>
                );
              })}

              <div className="mt-16 p-8 bg-white border border-slate-100 rounded-xl space-y-6 shadow-sm hover:shadow-lg transition-shadow duration-300">
                <div className="text-[10px] font-mono text-slate-400 uppercase tracking-widest">Newsletter</div>
                <h3 className="text-sm font-black leading-tight uppercase">Territorial Intelligence Brief</h3>
                <p className="text-xs text-slate-500 font-light leading-relaxed">Reciba mensualmente análisis técnicos sobre el catastro en Colombia.</p>
                <div className="flex flex-col gap-3">
                  <input type="email" placeholder="Email institucional" className="bg-[#fafafa] border border-slate-100 p-3 text-[10px] font-mono focus:outline-none focus:border-slate-400 rounded-lg transition-colors" />
                  <button className="bg-[#1a1a1a] text-white text-[10px] font-bold py-3 uppercase tracking-widest hover:bg-slate-800 transition-all rounded-lg cursor-pointer flex items-center justify-center gap-2">
                    <Mail className="w-3 h-3" />
                    Suscribirse
                  </button>
                </div>
              </div>
            </div>
          </div>

          {/* Main Content */}
          <div className="lg:col-span-9">
            <div className="bg-white border border-slate-100 p-8 lg:p-16 shadow-sm min-h-[600px] rounded-xl">
              <div className="mb-12 flex flex-col sm:flex-row items-start sm:items-center justify-between border-b border-slate-100 pb-8 gap-6">
                <h2 className="text-3xl font-black tracking-tight">{activeCategory}</h2>
                <div className="relative">
                  <Search className="w-4 h-4 text-slate-300 absolute left-3 top-1/2 -translate-y-1/2" />
                  <input 
                    type="text" 
                    placeholder="Buscar solución..." 
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="pl-10 pr-4 py-2.5 bg-[#fafafa] border border-slate-100 text-xs font-mono rounded-full focus:outline-none focus:border-slate-400 focus:ring-2 focus:ring-slate-100 transition-all w-48" 
                  />
                </div>
              </div>
              
              <AnimatePresence mode="wait">
                <motion.div 
                  key={activeCategory + searchQuery}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.2 }}
                  className="space-y-0"
                >
                  {activeFAQs.length > 0 ? (
                    activeFAQs.map((faq, i) => (
                      <FAQAccordion key={i} q={faq.q} a={faq.a} index={i} />
                    ))
                  ) : (
                    <div className="py-20 text-center space-y-4">
                      <div className="w-16 h-16 rounded-full bg-slate-100 mx-auto flex items-center justify-center">
                        <Search className="w-6 h-6 text-slate-300" />
                      </div>
                      <p className="text-slate-400 font-light">No se encontraron resultados para “{searchQuery}”</p>
                      <button onClick={() => setSearchQuery("")} className="text-[10px] font-bold text-[#1a1a1a] uppercase tracking-widest hover:text-slate-500 transition-colors cursor-pointer">
                        Limpiar Búsqueda
                      </button>
                    </div>
                  )}
                </motion.div>
              </AnimatePresence>
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
          <Link href="/#contact" className="px-12 py-5 bg-[#1a1a1a] text-white text-[10px] font-bold uppercase tracking-[0.2em] hover:bg-slate-800 transition-all shadow-xl group flex items-center gap-3">
             Iniciar Auditoría Técnica
             <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </Link>
        </div>
      </div>

    </main>
  );
}
