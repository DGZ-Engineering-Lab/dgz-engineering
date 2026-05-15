"use client";
import { motion } from "framer-motion";
import { Send, MapPin, Phone, Mail } from "lucide-react";
import Logo from "./Logo";

export default function ContactSection() {
  return (
    <section id="contact" className="py-32 bg-[#fafafa] border-t border-slate-100">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-24">
          
          {/* Info Side */}
          <div className="space-y-12">
            <div className="space-y-6">
              <div className="flex items-center gap-3">
                <span className="w-12 h-px bg-[#1a1a1a]"></span>
                <span className="text-[10px] font-mono uppercase tracking-[0.4em] text-slate-500 font-bold">Contact // Technical Session</span>
              </div>
              <h2 className="text-5xl md:text-7xl font-black tracking-tighter leading-tight text-[#1a1a1a]">
                Hablemos de <br /> <span className="text-slate-400 font-light italic">Ingeniería.</span>
              </h2>
              <p className="text-slate-500 text-xl font-light leading-relaxed max-w-md">
                Estamos listos para desplegar soluciones de alta precisión para sus desafíos territoriales más complejos.
              </p>
            </div>

            <div className="space-y-8">
              <div className="flex items-start gap-6">
                <div className="w-12 h-12 bg-white border border-slate-100 flex items-center justify-center rounded-sm flex-shrink-0 shadow-sm">
                  <MapPin className="w-5 h-5 text-slate-400" />
                </div>
                <div>
                  <div className="text-[9px] font-mono text-slate-400 uppercase tracking-widest mb-1">Global Presence</div>
                  <div className="text-sm font-bold uppercase tracking-widest">Bogotá // Medellín // Cali</div>
                </div>
              </div>
              <div className="flex items-start gap-6">
                <div className="w-12 h-12 bg-white border border-slate-100 flex items-center justify-center rounded-sm flex-shrink-0 shadow-sm">
                  <Mail className="w-5 h-5 text-slate-400" />
                </div>
                <div>
                  <div className="text-[9px] font-mono text-slate-400 uppercase tracking-widest mb-1">Direct Inquiry</div>
                  <div className="text-sm font-bold uppercase tracking-widest">engineering@devgiz.com</div>
                </div>
              </div>
            </div>

            <div className="pt-10">
              <Logo className="w-12 h-12 opacity-10" />
            </div>
          </div>

          {/* Form Side */}
          <div className="bg-white p-8 md:p-12 border border-slate-100 shadow-2xl rounded-sm">
            <form className="space-y-8" onSubmit={(e) => e.preventDefault()}>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div className="space-y-2">
                  <label className="text-[9px] font-mono text-slate-400 uppercase tracking-widest pl-1">Nombre Completo</label>
                  <input type="text" placeholder="Ing. Carlos Pérez" className="w-full bg-[#fcfcfc] border-b border-slate-100 p-4 text-xs focus:outline-none focus:border-[#1a1a1a] transition-colors" />
                </div>
                <div className="space-y-2">
                  <label className="text-[9px] font-mono text-slate-400 uppercase tracking-widest pl-1">Organización</label>
                  <input type="text" placeholder="Entidad / Empresa" className="w-full bg-[#fcfcfc] border-b border-slate-100 p-4 text-xs focus:outline-none focus:border-[#1a1a1a] transition-colors" />
                </div>
              </div>

              <div className="space-y-2">
                <label className="text-[9px] font-mono text-slate-400 uppercase tracking-widest pl-1">Email Institucional</label>
                <input type="email" placeholder="cperez@organizacion.com" className="w-full bg-[#fcfcfc] border-b border-slate-100 p-4 text-xs focus:outline-none focus:border-[#1a1a1a] transition-colors" />
              </div>

              <div className="space-y-2">
                <label className="text-[9px] font-mono text-slate-400 uppercase tracking-widest pl-1">Asunto de la Sesión</label>
                <select className="w-full bg-[#fcfcfc] border-b border-slate-100 p-4 text-xs focus:outline-none focus:border-[#1a1a1a] transition-colors appearance-none">
                  <option>Auditoría de Datos LADM-COL</option>
                  <option>Implementación de Digital Twin</option>
                  <option>Consultoría en Estándares ICDE</option>
                  <option>Otros requerimientos técnicos</option>
                </select>
              </div>

              <div className="space-y-2">
                <label className="text-[9px] font-mono text-slate-400 uppercase tracking-widest pl-1">Descripción del Desafío</label>
                <textarea rows="4" placeholder="Breve descripción del alcance del proyecto..." className="w-full bg-[#fcfcfc] border-b border-slate-100 p-4 text-xs focus:outline-none focus:border-[#1a1a1a] transition-colors resize-none"></textarea>
              </div>

              <button className="w-full py-5 bg-[#1a1a1a] text-white text-[10px] font-black uppercase tracking-[0.3em] hover:bg-slate-800 transition-all flex items-center justify-center gap-4 shadow-xl">
                Agendar Sesión Técnica <Send className="w-3 h-3" />
              </button>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
}
