"use client";
import { useState, useRef, useMemo, useId } from "react";
import { motion, AnimatePresence, useInView } from "framer-motion";
import { Plus, Minus, Search, Mail, ArrowRight } from "lucide-react";
import Link from "next/link";
import Logo from "../../components/Logo";
import { FAQS } from "../../data/faqData";
import { POLICY_VERSION, RESPONSABLE } from "../../lib/legal";
import ConsentCheckbox from "../../components/ConsentCheckbox";

function FAQAccordion({ q, a, index }) {
  const [isOpen, setIsOpen] = useState(false);
  const panelId = useId();
  
  return (
    <motion.div 
      className="border-b border-slate-100 last:border-0"
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.08 }}
    >
      <button 
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        aria-expanded={isOpen}
        aria-controls={panelId}
        className="w-full py-8 flex items-center justify-between text-left group cursor-pointer focus-visible:ring-2 focus-visible:ring-slate-900 focus-visible:outline-none rounded-lg"
      >
        <span className={`text-lg sm:text-xl font-bold tracking-tight transition-colors duration-300 ${isOpen ? 'text-[#1a1a1a]' : 'text-slate-600 group-hover:text-[#1a1a1a]'}`}>
          {q}
        </span>
        <div className={`w-8 h-8 rounded-full flex items-center justify-center transition-all duration-300 flex-shrink-0 ml-4 ${
          isOpen ? 'bg-[#1a1a1a] text-white rotate-0' : 'bg-slate-100 text-slate-600 group-hover:bg-slate-200'
        }`}>
          {isOpen ? <Minus aria-hidden="true" className="w-4 h-4" /> : <Plus aria-hidden="true" className="w-4 h-4" />}
        </div>
      </button>
      <AnimatePresence>
        {isOpen && (
          <motion.div 
            id={panelId}
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
            className="overflow-hidden"
          >
            <div className="pb-10 text-lg text-slate-600 font-light leading-relaxed max-w-3xl pl-0 border-l-2 border-slate-200 ml-1 pl-6">
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
  const [newsletterEmail, setNewsletterEmail] = useState("");
  const [subscribed, setSubscribed] = useState(false);
  const headerRef = useRef(null);
  const headerInView = useInView(headerRef, { once: true });

  const [subscribeStatus, setSubscribeStatus] = useState("idle"); // idle | sending | error
  // Autorización Ley 1581 para el boletín (nunca premarcada)
  const [newsletterConsent, setNewsletterConsent] = useState(false);
  const [consentInvalid, setConsentInvalid] = useState(false);

  // Envío real por el pipeline de leads (antes solo se simulaba la confirmación y el correo se perdía)
  const handleSubscribe = async (e) => {
    e.preventDefault();
    if (!newsletterEmail || !newsletterEmail.includes("@") || subscribeStatus === "sending") return;
    if (!newsletterConsent) {
      setConsentInvalid(true);
      document.getElementById("faq-newsletter-consent")?.focus();
      return;
    }
    setSubscribeStatus("sending");
    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: "Suscripción boletín",
          email: newsletterEmail,
          company: "N/A",
          message: "[Suscripción al boletín Territorial Intelligence Brief desde /faq]",
          // Solo con la casilla marcada se da de alta en la lista de correo.
          consent: newsletterConsent === true,
          privacyConsent: true,
          policyVersion: POLICY_VERSION,
          consentSource: "newsletter-faq",
        }),
      });
      if (!response.ok) throw new Error("subscribe_failed");
      setSubscribed(true);
      setSubscribeStatus("idle");
      setNewsletterEmail("");
      setNewsletterConsent(false);
    } catch {
      setSubscribeStatus("error");
    }
  };

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
    <div className="bg-[#fcfcfc] min-h-screen text-[#1a1a1a] selection:bg-slate-200 pt-24 md:pt-28 pb-16">
      
      <div className="max-w-7xl mx-auto px-6" ref={headerRef}>
        <motion.div 
          className="flex flex-col lg:flex-row justify-between items-start lg:items-end gap-8 mb-10"
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
              <span className="text-[10px] font-mono uppercase tracking-[0.28em] text-slate-500 font-bold">Expert Support // Knowledge Center</span>
            </div>
            <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-black tracking-tighter leading-[1.02] text-[#1a1a1a]">
              Consultoría de <br /> <span className="text-slate-500 italic font-light">Conocimiento</span>
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
              <span className="px-3 py-1.5 bg-slate-100 rounded-full font-bold tabular-nums">{totalQuestions} Respuestas</span>
              <span className="px-3 py-1.5 bg-slate-100 rounded-full font-bold tabular-nums">{FAQS.length} Categorías</span>
            </div>
          </motion.div>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12">
          {/* Sidebar Navigation */}
          <div className="lg:col-span-3">
            <div className="sticky top-32 space-y-4">
              <h2 id="faq-categories" className="text-[11px] font-mono text-slate-600 uppercase tracking-widest mb-8">Categorías</h2>
              {/* Botones con aria-pressed: no hay paneles ni navegación con flechas, así que no se usa role="tablist" */}
              <div role="group" aria-labelledby="faq-categories" className="space-y-2">
                {FAQS.map(cat => {
                  const Icon = cat.icon;
                  return (
                    <button
                      key={cat.category}
                      type="button"
                      aria-pressed={activeCategory === cat.category}
                      onClick={() => { setActiveCategory(cat.category); setSearchQuery(""); }}
                      className={`block w-full text-left text-xs font-bold uppercase tracking-[0.15em] py-4 px-6 border-l-2 transition-all duration-300 flex items-center gap-3 cursor-pointer focus-visible:ring-2 focus-visible:ring-slate-900 focus-visible:outline-none ${
                        activeCategory === cat.category 
                          ? 'border-[#1a1a1a] text-[#1a1a1a] bg-white shadow-sm rounded-r-lg' 
                          : 'border-slate-200 text-slate-600 hover:border-slate-400 hover:text-[#1a1a1a] hover:bg-white/50'
                      }`}
                    >
                      <Icon aria-hidden="true" className={`w-4 h-4 flex-shrink-0 ${activeCategory === cat.category ? 'text-[#1a1a1a]' : 'text-slate-500'}`} />
                      {cat.category}
                    </button>
                  );
                })}
              </div>

              <div className="mt-16 p-8 bg-white border border-slate-100 rounded-xl space-y-6 shadow-sm hover:shadow-lg transition-shadow duration-300">
                <div className="text-[10px] font-mono text-slate-400 uppercase tracking-widest">Newsletter</div>
                <h3 className="text-sm font-black leading-tight uppercase">Territorial Intelligence Brief</h3>
                <p className="text-xs text-slate-500 font-light leading-relaxed">Reciba mensualmente análisis técnicos sobre el catastro en Colombia.</p>
                
                {subscribed ? (
                  <div role="status" className="p-3 bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs font-mono rounded-lg flex items-center gap-2">
                    <span aria-hidden="true" className="w-2 h-2 rounded-full bg-emerald-500"></span>
                    Solicitud recibida. Te escribiremos pronto.
                  </div>
                ) : (
                  <form onSubmit={handleSubscribe} className="flex flex-col gap-3">
                    <input
                      type="email"
                      required
                      name="email"
                      value={newsletterEmail}
                      onChange={(e) => setNewsletterEmail(e.target.value)}
                      aria-label="Email institucional para el newsletter"
                      aria-invalid={subscribeStatus === "error"}
                      aria-describedby={subscribeStatus === "error" ? "newsletter-error" : undefined}
                      autoComplete="email"
                      inputMode="email"
                      placeholder="Email institucional"
                      className="bg-[#fafafa] border border-slate-300 p-3 min-h-11 text-xs font-mono placeholder:text-slate-500 focus:outline-none focus:border-slate-500 focus-visible:ring-2 focus-visible:ring-slate-900 rounded-lg transition-colors"
                    />
                    <ConsentCheckbox
                      id="faq-newsletter-consent"
                      finalidad="boletin"
                      checked={newsletterConsent}
                      onChange={(value) => {
                        setNewsletterConsent(value);
                        if (value) setConsentInvalid(false);
                      }}
                      invalid={consentInvalid}
                    />
                    {subscribeStatus === "error" && (
                      <p id="newsletter-error" role="alert" className="text-xs text-red-700">
                        No pudimos registrar tu correo. Intenta de nuevo en unos minutos.
                      </p>
                    )}
                    <button
                      type="submit"
                      disabled={subscribeStatus === "sending"}
                      className="bg-[#1a1a1a] text-white text-[11px] font-bold py-3 min-h-11 uppercase tracking-widest hover:bg-slate-800 transition-all rounded-lg cursor-pointer flex items-center justify-center gap-2 disabled:opacity-60 focus-visible:ring-2 focus-visible:ring-cyan-500 focus-visible:outline-none"
                    >
                      <Mail aria-hidden="true" className="w-3 h-3" />
                      {subscribeStatus === "sending" ? "Enviando…" : "Suscribirse"}
                    </button>
                    <p className="text-[11px] text-slate-500 leading-snug break-words">
                      Puede darse de baja en cualquier momento escribiendo a{" "}
                      <a href={`mailto:${RESPONSABLE.email}`} className="underline underline-offset-2 hover:text-slate-800">{RESPONSABLE.email}</a>.
                    </p>
                  </form>
                )}
              </div>
            </div>
          </div>

          {/* Main Content */}
          <div className="lg:col-span-9">
            <div className="bg-white border border-slate-100 p-6 lg:p-10 shadow-sm min-h-[400px] rounded-xl">
              <div className="mb-12 flex flex-col sm:flex-row items-start sm:items-center justify-between border-b border-slate-100 pb-8 gap-6">
                <h2 className="text-3xl font-black tracking-tight">{activeCategory}</h2>
                <div className="relative w-full sm:w-auto">
                  <Search aria-hidden="true" className="w-4 h-4 text-slate-500 absolute left-3 top-1/2 -translate-y-1/2" />
                  <input
                    type="search"
                    aria-label="Buscar en las preguntas frecuentes"
                    placeholder="Buscar solución..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="pl-10 pr-4 py-2.5 min-h-11 bg-[#fafafa] border border-slate-300 text-xs font-mono placeholder:text-slate-500 rounded-full focus:outline-none focus:border-slate-500 focus:ring-2 focus:ring-slate-900 focus-visible:outline-none transition-all w-full sm:w-56"
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
                      <p role="status" className="text-slate-600 font-light">No se encontraron resultados para “{searchQuery}”</p>
                      <button 
                        type="button"
                        onClick={() => setSearchQuery("")} 
                        className="text-[10px] font-bold text-[#1a1a1a] uppercase tracking-widest hover:text-slate-500 transition-colors cursor-pointer focus-visible:ring-2 focus-visible:ring-slate-900 focus-visible:outline-none p-1 rounded"
                      >
                        Limpiar Búsqueda
                      </button>
                    </div>
                  )}
                </motion.div>
              </AnimatePresence>
            </div>
          </div>
        </div>

      </div>

    </div>
  );
}
