"use client";

import { useState } from "react";

export default function ContactSection() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    service: "",
    message: ""
  });
  const [status, setStatus] = useState("idle");

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
          company: formData.service // Using service as company for context
        })
      });

      if (res.ok) {
        setStatus("success");
        setFormData({ name: "", email: "", service: "", message: "" });
        setTimeout(() => setStatus("idle"), 5000);
      } else {
        setStatus("idle");
        alert("Transmission failed. Re-initiating handshake...");
      }
    } catch (err) {
      setStatus("idle");
      console.error("Handshake error:", err);
    }
  };

  return (
    <section id="contact" className="relative w-full py-32 z-10 bg-black/40 border-t border-slate-800/50">
      <div className="max-w-7xl mx-auto px-6">
        
        {/* Section Header */}
        <div className="flex flex-col items-center text-center mb-16">
          <div className="flex items-center gap-4 mb-4">
            <span className="text-cyan-400 font-mono text-sm tracking-widest uppercase">
              Iniciar Proyecto
            </span>
            <div className="w-12 h-[1px] bg-gradient-to-r from-cyan-500 to-transparent"></div>
          </div>
          <h2 className="text-4xl md:text-5xl font-extrabold text-white tracking-tight leading-tight">
            Territorial Intelligence Hub
          </h2>
          <p className="text-lg text-slate-400 font-light mt-4 max-w-2xl">
            Arquitectando la próxima generación de inteligencia espacial. Hablemos de su proyecto, municipio o desafío SIG empresarial.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-start">
          
          {/* Left Column: Contact Cards */}
          <div className="lg:col-span-5 grid grid-cols-1 sm:grid-cols-2 gap-4">
            <a href="https://wa.me/573106514707" target="_blank" rel="noreferrer" className="flex flex-col p-6 rounded-xl bg-[#0a0f16] border border-slate-800 hover:border-emerald-500/50 hover:shadow-[0_0_30px_rgba(16,185,129,0.15)] transition-all group">
              <div className="w-12 h-12 rounded-lg bg-emerald-500/10 flex items-center justify-center text-emerald-400 mb-4 group-hover:scale-110 transition-transform">
                <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"/></svg>
              </div>
              <div className="text-xs text-slate-500 font-mono mb-1">WhatsApp</div>
              <div className="text-sm font-bold text-white tracking-wide">+57 310 651 4707</div>
            </a>

            <a href="mailto:Albertg2109@gmail.com" className="flex flex-col p-6 rounded-xl bg-[#0a0f16] border border-slate-800 hover:border-amber-500/50 hover:shadow-[0_0_30px_rgba(245,158,11,0.15)] transition-all group">
              <div className="w-12 h-12 rounded-lg bg-amber-500/10 flex items-center justify-center text-amber-400 mb-4 group-hover:scale-110 transition-transform">
                <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"/></svg>
              </div>
              <div className="text-xs text-slate-500 font-mono mb-1">Email Uplink</div>
              <div className="text-sm font-bold text-white tracking-wide break-all">Albertg2109@gmail.com</div>
            </a>

            <a href="https://www.linkedin.com/in/soyalbertgz/" target="_blank" rel="noreferrer" className="flex flex-col p-6 rounded-xl bg-[#0a0f16] border border-slate-800 hover:border-[#0A66C2]/50 hover:shadow-[0_0_30px_rgba(10,102,194,0.15)] transition-all group">
              <div className="w-12 h-12 rounded-lg bg-[#0A66C2]/10 flex items-center justify-center text-[#0A66C2] mb-4 group-hover:scale-110 transition-transform">
                <svg className="w-5 h-5 fill-current" viewBox="0 0 24 24"><path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/></svg>
              </div>
              <div className="text-xs text-slate-500 font-mono mb-1">LinkedIn Network</div>
              <div className="text-sm font-bold text-white tracking-wide">soyalbertgz</div>
            </a>

            <a href="https://github.com/Daga21Gz" target="_blank" rel="noreferrer" className="flex flex-col p-6 rounded-xl bg-[#0a0f16] border border-slate-800 hover:border-white/50 hover:shadow-[0_0_30px_rgba(255,255,255,0.1)] transition-all group">
              <div className="w-12 h-12 rounded-lg bg-white/5 flex items-center justify-center text-white mb-4 group-hover:scale-110 transition-transform">
                <svg className="w-6 h-6 fill-current" viewBox="0 0 24 24"><path fillRule="evenodd" clipRule="evenodd" d="M12 2C6.477 2 2 6.477 2 12c0 4.42 2.865 8.166 6.839 9.489.5.092.682-.217.682-.482 0-.237-.008-.866-.013-1.7-2.782.603-3.369-1.34-3.369-1.34-.454-1.156-1.11-1.462-1.11-1.462-.908-.62.069-.608.069-.608 1.003.07 1.531 1.03 1.531 1.03.892 1.529 2.341 1.087 2.91.831.092-.646.35-1.086.636-1.336-2.22-.253-4.555-1.11-4.555-4.943 0-1.091.39-1.984 1.029-2.683-.103-.253-.446-1.27.098-2.647 0 0 .84-.269 2.75 1.025A9.578 9.578 0 0112 6.836c.85.004 1.705.114 2.504.336 1.909-1.294 2.747-1.025 2.747-1.025.546 1.377.203 2.394.1 2.647.64.699 1.028 1.592 1.028 2.683 0 3.842-2.339 4.687-4.566 4.935.359.309.678.919.678 1.852 0 1.336-.012 2.415-.012 2.743 0 .267.18.578.688.48C19.138 20.161 22 16.416 22 12c0-5.523-4.477-10-10-10z"/></svg>
              </div>
              <div className="text-xs text-slate-500 font-mono mb-1">GitHub Repos</div>
              <div className="text-sm font-bold text-white tracking-wide">Daga21Gz</div>
            </a>
          </div>

          {/* Right Column: Transmission Form */}
          <div className="lg:col-span-7 bg-[#05070a] p-8 md:p-10 rounded-2xl border border-slate-800 relative">
            <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-cyan-500 to-purple-500"></div>
            
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label className="text-xs font-mono text-cyan-400 uppercase tracking-wider flex items-center gap-2">
                    <span className="w-1.5 h-1.5 bg-cyan-400 rounded-full"></span> Full_Name
                  </label>
                  <input 
                    type="text" 
                    required
                    value={formData.name}
                    onChange={(e) => setFormData({...formData, name: e.target.value})}
                    className="w-full bg-[#0a0f16] border border-slate-700 rounded-lg px-4 py-3.5 text-white focus:outline-none focus:border-cyan-500 focus:ring-1 focus:ring-cyan-500 transition-all placeholder:text-slate-600 font-mono text-sm"
                    placeholder="Organization / Lead Architect"
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-xs font-mono text-cyan-400 uppercase tracking-wider flex items-center gap-2">
                    <span className="w-1.5 h-1.5 bg-cyan-400 rounded-full"></span> Email_Uplink
                  </label>
                  <input 
                    type="email" 
                    required
                    value={formData.email}
                    onChange={(e) => setFormData({...formData, email: e.target.value})}
                    className="w-full bg-[#0a0f16] border border-slate-700 rounded-lg px-4 py-3.5 text-white focus:outline-none focus:border-cyan-500 focus:ring-1 focus:ring-cyan-500 transition-all placeholder:text-slate-600 font-mono text-sm"
                    placeholder="user@secure-domain.com"
                  />
                </div>
              </div>

              <div className="space-y-2">
                <label className="text-xs font-mono text-cyan-400 uppercase tracking-wider flex items-center gap-2">
                  <span className="w-1.5 h-1.5 bg-cyan-400 rounded-full"></span> Service_Type
                </label>
                <div className="relative">
                  <select 
                    required
                    value={formData.service}
                    onChange={(e) => setFormData({...formData, service: e.target.value})}
                    className="w-full bg-[#0a0f16] border border-slate-700 rounded-lg px-4 py-3.5 text-white focus:outline-none focus:border-cyan-500 focus:ring-1 focus:ring-cyan-500 transition-all appearance-none font-mono text-sm"
                  >
                    <option value="" disabled>— Select Service —</option>
                    <option value="gis_automation">GIS Automation & ETL Pipeline</option>
                    <option value="cadastral_qa">Cadastral QA/QC (LADM-COL)</option>
                    <option value="enterprise_dashboard">Enterprise GIS Dashboard</option>
                    <option value="consulting">Other / Consulting</option>
                  </select>
                  <div className="absolute inset-y-0 right-4 flex items-center pointer-events-none text-slate-500">
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"></path></svg>
                  </div>
                </div>
              </div>

              <div className="space-y-2">
                <label className="text-xs font-mono text-cyan-400 uppercase tracking-wider flex items-center gap-2">
                  <span className="w-1.5 h-1.5 bg-cyan-400 rounded-full"></span> Mission_Brief
                </label>
                <textarea 
                  required
                  rows="5"
                  value={formData.message}
                  onChange={(e) => setFormData({...formData, message: e.target.value})}
                  className="w-full bg-[#0a0f16] border border-slate-700 rounded-lg px-4 py-3.5 text-white focus:outline-none focus:border-cyan-500 focus:ring-1 focus:ring-cyan-500 transition-all placeholder:text-slate-600 resize-none font-mono text-sm"
                  placeholder="Define mission parameters & objectives..."
                ></textarea>
              </div>

              <button 
                type="submit" 
                disabled={status === "loading" || status === "success"}
                className="w-full py-4 rounded-lg font-bold text-white font-mono uppercase tracking-widest transition-all flex justify-center items-center gap-3 bg-cyan-600 hover:bg-cyan-500 disabled:opacity-50 disabled:cursor-not-allowed shadow-[0_0_20px_rgba(6,182,212,0.2)] hover:shadow-[0_0_30px_rgba(6,182,212,0.4)] group"
              >
                {status === "idle" && (
                  <>
                    <span>INITIATE_HANDSHAKE</span>
                    <svg className="w-5 h-5 group-hover:translate-x-1 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14 5l7 7m0 0l-7 7m7-7H3"/></svg>
                  </>
                )}
                {status === "loading" && (
                  <><span className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></span> TRANSMITTING...</>
                )}
                {status === "success" && "HANDSHAKE SUCCESSFUL"}
              </button>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
}
