"use client";

import { useState, useEffect } from "react";

export default function ContactSection() {
  const [isOpen, setIsOpen] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    service: "",
    message: ""
  });
  const [status, setStatus] = useState("idle");

  useEffect(() => {
    const checkHash = () => {
      if (window.location.hash === "#contact") {
        setIsOpen(true);
      } else {
        setIsOpen(false);
      }
    };
    
    checkHash();
    window.addEventListener("hashchange", checkHash);
    
    // Add global click listener for elements that might not be links but should open contact
    const handleGlobalClick = (e) => {
      const link = e.target.closest('a[href="#contact"]');
      const button = e.target.closest('button');
      
      const isContactTrigger = 
        link || 
        (button && (
          button.textContent.includes('Solicitar Auditoría') || 
          button.textContent.includes('Agendar Demo') || 
          button.textContent.includes('Consultoría') ||
          button.textContent.includes('SOLUCIONES ENTERPRISE')
        ));

      if (isContactTrigger) {
        if (link) e.preventDefault();
        window.location.hash = "contact";
      }
    };
    window.addEventListener("click", handleGlobalClick);
    
    return () => {
      window.removeEventListener("hashchange", checkHash);
      window.removeEventListener("click", handleGlobalClick);
    };
  }, []);

  const closeContact = () => {
    setIsOpen(false);
    window.history.replaceState(null, null, window.location.pathname + window.location.search);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus("loading");
    
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: formData.name,
          email: formData.email,
          message: formData.message,
          company: formData.service
        })
      });

      if (res.ok) {
        setStatus("success");
        setFormData({ name: "", email: "", service: "", message: "" });
        setTimeout(() => {
          setStatus("idle");
          closeContact();
        }, 3000);
      } else {
        setStatus("idle");
        alert("El envío falló. Por favor, inténtalo de nuevo.");
      }
    } catch (err) {
      setStatus("idle");
      console.error("Contact error:", err);
    }
  };

  return (
    <div className={`fixed inset-0 z-[100] flex items-center justify-center p-4 sm:p-6 transition-all duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] ${isOpen ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"}`}>
      {/* Backdrop */}
      <div 
        className={`absolute inset-0 bg-black/80 backdrop-blur-xl transition-opacity duration-700 ${isOpen ? "opacity-100" : "opacity-0"}`} 
        onClick={closeContact}
      ></div>

      {/* Modal Content */}
      <div className={`relative w-full max-w-6xl bg-[#02040a] border border-slate-800 rounded-[2.5rem] overflow-hidden shadow-[0_0_80px_rgba(6,182,212,0.15)] transition-all duration-700 delay-100 transform ${isOpen ? "scale-100 translate-y-0" : "scale-95 translate-y-12"}`}>
        
        {/* Close Button */}
        <button 
          onClick={closeContact} 
          className="absolute top-6 right-6 z-50 p-3 bg-slate-900/80 backdrop-blur border border-slate-800 rounded-full text-slate-400 hover:text-white hover:bg-red-500/20 hover:border-red-500/50 hover:rotate-90 transition-all duration-300"
        >
          <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"></path></svg>
        </button>

        <div className="h-full max-h-[85vh] overflow-y-auto scrollbar-hide p-8 md:p-12 relative">
          {/* Background Glow */}
          <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-cyan-900/10 rounded-full blur-[120px] pointer-events-none"></div>

          {/* Section Header */}
          <div className="flex flex-col items-center text-center mb-16 relative z-10">
            <div className="flex items-center gap-4 mb-4">
              <span className="text-cyan-400 font-mono text-sm tracking-widest uppercase">
                Iniciar Proyecto
              </span>
              <div className="w-12 h-[1px] bg-gradient-to-r from-cyan-500 to-transparent"></div>
            </div>
            <h2 className="text-4xl md:text-5xl font-extrabold text-white tracking-tight leading-tight">
              Impulsa tu <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-blue-500">Territorio</span>
            </h2>
            <p className="text-lg text-slate-400 font-light mt-4 max-w-2xl">
              Arquitectando la próxima generación de inteligencia espacial. Hablemos de tu proyecto, municipio o desafío SIG empresarial.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-start relative z-10">
            
            {/* Left Column: Contact Cards */}
            <div className="lg:col-span-5 grid grid-cols-1 sm:grid-cols-2 gap-4">
              <a href="https://wa.me/573106514707" target="_blank" rel="noreferrer" className="flex flex-col p-6 rounded-2xl bg-[#0a0f16] border border-slate-800 hover:border-emerald-500/50 hover:bg-emerald-500/5 transition-all duration-300 group shadow-lg">
                <div className="w-12 h-12 rounded-lg bg-emerald-500/10 flex items-center justify-center text-emerald-400 mb-4 group-hover:scale-110 transition-transform shadow-[0_0_15px_rgba(16,185,129,0.2)]">
                  <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"/></svg>
                </div>
                <div className="text-xs text-slate-400 font-medium mb-1 uppercase tracking-wider">WhatsApp Directo</div>
                <div className="text-sm font-bold text-white tracking-wide">+57 310 651 4707</div>
              </a>

              <a href="mailto:Albertg2109@gmail.com" className="flex flex-col p-6 rounded-2xl bg-[#0a0f16] border border-slate-800 hover:border-amber-500/50 hover:bg-amber-500/5 transition-all duration-300 group shadow-lg">
                <div className="w-12 h-12 rounded-lg bg-amber-500/10 flex items-center justify-center text-amber-400 mb-4 group-hover:scale-110 transition-transform shadow-[0_0_15px_rgba(245,158,11,0.2)]">
                  <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"/></svg>
                </div>
                <div className="text-xs text-slate-400 font-medium mb-1 uppercase tracking-wider">Correo Electrónico</div>
                <div className="text-sm font-bold text-white tracking-wide break-all">Albertg2109@gmail.com</div>
              </a>

              <a href="https://www.linkedin.com/in/soyalbertgz/" target="_blank" rel="noreferrer" className="flex flex-col p-6 rounded-2xl bg-[#0a0f16] border border-slate-800 hover:border-[#0A66C2]/50 hover:bg-[#0A66C2]/5 transition-all duration-300 group shadow-lg">
                <div className="w-12 h-12 rounded-lg bg-[#0A66C2]/10 flex items-center justify-center text-[#0A66C2] mb-4 group-hover:scale-110 transition-transform shadow-[0_0_15px_rgba(10,102,194,0.2)]">
                  <svg className="w-5 h-5 fill-current" viewBox="0 0 24 24"><path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/></svg>
                </div>
                <div className="text-xs text-slate-400 font-medium mb-1 uppercase tracking-wider">Red Profesional</div>
                <div className="text-sm font-bold text-white tracking-wide">soyalbertgz</div>
              </a>

              <a href="https://github.com/Daga21Gz" target="_blank" rel="noreferrer" className="flex flex-col p-6 rounded-2xl bg-[#0a0f16] border border-slate-800 hover:border-white/50 hover:bg-white/5 transition-all duration-300 group shadow-lg">
                <div className="w-12 h-12 rounded-lg bg-white/5 flex items-center justify-center text-white mb-4 group-hover:scale-110 transition-transform shadow-[0_0_15px_rgba(255,255,255,0.1)]">
                  <svg className="w-6 h-6 fill-current" viewBox="0 0 24 24"><path fillRule="evenodd" clipRule="evenodd" d="M12 2C6.477 2 2 6.477 2 12c0 4.42 2.865 8.166 6.839 9.489.5.092.682-.217.682-.482 0-.237-.008-.866-.013-1.7-2.782.603-3.369-1.34-3.369-1.34-.454-1.156-1.11-1.462-1.11-1.462-.908-.62.069-.608.069-.608 1.003.07 1.531 1.03 1.531 1.03.892 1.529 2.341 1.087 2.91.831.092-.646.35-1.086.636-1.336-2.22-.253-4.555-1.11-4.555-4.943 0-1.091.39-1.984 1.029-2.683-.103-.253-.446-1.27.098-2.647 0 0 .84-.269 2.75 1.025A9.578 9.578 0 0112 6.836c.85.004 1.705.114 2.504.336 1.909-1.294 2.747-1.025 2.747-1.025.546 1.377.203 2.394.1 2.647.64.699 1.028 1.592 1.028 2.683 0 3.842-2.339 4.687-4.566 4.935.359.309.678.919.678 1.852 0 1.336-.012 2.415-.012 2.743 0 .267.18.578.688.48C19.138 20.161 22 16.416 22 12c0-5.523-4.477-10-10-10z"/></svg>
                </div>
                <div className="text-xs text-slate-400 font-medium mb-1 uppercase tracking-wider">Repositorios</div>
                <div className="text-sm font-bold text-white tracking-wide">Daga21Gz</div>
              </a>
            </div>

            {/* Right Column: Transmission Form */}
            <div className="lg:col-span-7 bg-[#050810] p-8 md:p-10 rounded-3xl border border-slate-800 relative shadow-2xl overflow-hidden group">
              {/* Animated Glow Border Effect */}
              <div className="absolute top-0 left-0 w-full h-[2px] bg-gradient-to-r from-transparent via-cyan-500 to-transparent opacity-50 group-hover:opacity-100 transition-opacity duration-500"></div>
              <div className="absolute inset-0 bg-gradient-to-b from-cyan-500/5 to-transparent pointer-events-none"></div>
              
              <form onSubmit={handleSubmit} className="relative z-10 space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <label className="text-xs font-semibold text-slate-300 uppercase tracking-wider flex items-center gap-2">
                      <span className="w-1.5 h-1.5 bg-cyan-400 rounded-full"></span> Nombre / Empresa
                    </label>
                    <input 
                      type="text" 
                      required
                      value={formData.name}
                      onChange={(e) => setFormData({...formData, name: e.target.value})}
                      className="w-full bg-[#0a0f16] border border-slate-700 rounded-xl px-5 py-4 text-white focus:outline-none focus:border-cyan-500 focus:ring-1 focus:ring-cyan-500 transition-all placeholder:text-slate-600 text-sm shadow-inner"
                      placeholder="Ej. Juan Pérez / Alcaldía de Bogotá"
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-xs font-semibold text-slate-300 uppercase tracking-wider flex items-center gap-2">
                      <span className="w-1.5 h-1.5 bg-cyan-400 rounded-full"></span> Correo Electrónico
                    </label>
                    <input 
                      type="email" 
                      required
                      value={formData.email}
                      onChange={(e) => setFormData({...formData, email: e.target.value})}
                      className="w-full bg-[#0a0f16] border border-slate-700 rounded-xl px-5 py-4 text-white focus:outline-none focus:border-cyan-500 focus:ring-1 focus:ring-cyan-500 transition-all placeholder:text-slate-600 text-sm shadow-inner"
                      placeholder="usuario@empresa.com"
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <label className="text-xs font-semibold text-slate-300 uppercase tracking-wider flex items-center gap-2">
                    <span className="w-1.5 h-1.5 bg-cyan-400 rounded-full"></span> Servicio Requerido
                  </label>
                  <div className="relative">
                    <select 
                      required
                      value={formData.service}
                      onChange={(e) => setFormData({...formData, service: e.target.value})}
                      className="w-full bg-[#0a0f16] border border-slate-700 rounded-xl px-5 py-4 text-white focus:outline-none focus:border-cyan-500 focus:ring-1 focus:ring-cyan-500 transition-all appearance-none text-sm shadow-inner cursor-pointer"
                    >
                      <option value="" disabled>— Seleccione una opción —</option>
                      <option value="gis_automation">Automatización SIG y ETL</option>
                      <option value="cadastral_qa">Auditoría Catastral (LADM-COL)</option>
                      <option value="enterprise_dashboard">Dashboard Corporativo SIG</option>
                      <option value="consulting">Consultoría Especializada / Otros</option>
                    </select>
                    <div className="absolute inset-y-0 right-4 flex items-center pointer-events-none text-slate-500">
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"></path></svg>
                    </div>
                  </div>
                </div>

                <div className="space-y-2">
                  <label className="text-xs font-semibold text-slate-300 uppercase tracking-wider flex items-center gap-2">
                    <span className="w-1.5 h-1.5 bg-cyan-400 rounded-full"></span> Cuéntanos sobre tu Proyecto
                  </label>
                  <textarea 
                    required
                    rows="5"
                    value={formData.message}
                    onChange={(e) => setFormData({...formData, message: e.target.value})}
                    className="w-full bg-[#0a0f16] border border-slate-700 rounded-xl px-5 py-4 text-white focus:outline-none focus:border-cyan-500 focus:ring-1 focus:ring-cyan-500 transition-all placeholder:text-slate-600 resize-none text-sm shadow-inner"
                    placeholder="Describe brevemente los desafíos o necesidades de tu proyecto..."
                  ></textarea>
                </div>

                <button 
                  type="submit" 
                  disabled={status === "loading" || status === "success"}
                  className="w-full py-4 rounded-xl font-bold text-white uppercase tracking-widest transition-all flex justify-center items-center gap-3 bg-gradient-to-r from-cyan-600 to-blue-600 hover:from-cyan-500 hover:to-blue-500 disabled:opacity-50 disabled:cursor-not-allowed shadow-[0_0_20px_rgba(6,182,212,0.3)] hover:shadow-[0_0_30px_rgba(6,182,212,0.5)] active:scale-[0.98]"
                >
                  {status === "idle" && (
                    <>
                      <span>ENVIAR MENSAJE</span>
                      <svg className="w-5 h-5 group-hover:translate-x-1 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14 5l7 7m0 0l-7 7m7-7H3"/></svg>
                    </>
                  )}
                  {status === "loading" && (
                    <><span className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></span> ENVIANDO...</>
                  )}
                  {status === "success" && "¡MENSAJE ENVIADO!"}
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

