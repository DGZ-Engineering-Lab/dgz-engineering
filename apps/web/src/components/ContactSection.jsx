"use client";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Send, MapPin, Mail, CheckCircle2, AlertTriangle, ShieldCheck, Bug, Check, AlertCircle } from "lucide-react";
import Logo from "./Logo";
import * as Sentry from "@sentry/nextjs";

export default function ContactSection() {
  const [formData, setFormData] = useState({
    name: "",
    company: "",
    email: "",
    subject: "Auditoría de Datos LADM-COL",
    description: ""
  });
  
  const [status, setStatus] = useState("idle"); // idle, sending, success, error
  const [errorMessage, setErrorMessage] = useState("");
  const [touched, setTouched] = useState({
    name: false,
    email: false,
    company: false,
    description: false
  });

  const validateEmail = (email) => {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(String(email).toLowerCase());
  };

  const isInstitutionalEmail = (email) => {
    if (!validateEmail(email)) return false;
    const domain = email.split("@")[1].toLowerCase();
    const genericDomains = ["gmail.com", "yahoo.com", "hotmail.com", "outlook.com", "live.com", "icloud.com", "protonmail.com", "aol.com", "gmx.com", "mail.com"];
    return !genericDomains.includes(domain);
  };

  const validateName = (name) => {
    return name.trim().length >= 3;
  };

  const validateDescription = (desc) => {
    return desc.trim().length >= 30;
  };

  const handleBlur = (e) => {
    const { name } = e.target;
    setTouched(prev => ({ ...prev, [name]: true }));
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    // Set all fields to touched on submit
    setTouched({ name: true, email: true, company: true, description: true });

    if (!validateName(formData.name)) {
      setErrorMessage("El nombre de contacto debe tener al menos 3 caracteres.");
      setStatus("error");
      return;
    }

    if (!validateEmail(formData.email)) {
      setErrorMessage("Ingrese una dirección de correo institucional o corporativo válido.");
      setStatus("error");
      return;
    }

    if (!validateDescription(formData.description)) {
      setErrorMessage("Por favor describa su desafío de forma más detallada (mínimo 30 caracteres).");
      setStatus("error");
      return;
    }

    setStatus("sending");
    setErrorMessage("");

    // Telemetry capture: Log submission event in Sentry for instant validation
    Sentry.captureMessage("Lead Contact Session Request", {
      level: "info",
      extra: {
        name: formData.name,
        company: formData.company,
        email: formData.email,
        subject: formData.subject,
        length: formData.description.length
      }
    });

    try {
      // Deliberate test error triggers if "error" or "debug" is in the email address
      if (formData.email.toLowerCase().includes("error") || formData.email.toLowerCase().includes("sentry")) {
        const deliberateError = new Error(`Sentry Lead Debugger: Deliberate crash triggered by lead email (${formData.email})`);
        Sentry.captureException(deliberateError);
        throw deliberateError;
      }

      const response = await fetch("/api/contact", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          name: formData.name,
          email: formData.email,
          company: formData.company,
          message: `[Asunto: ${formData.subject}] ${formData.description}`
        })
      });

      const result = await response.json();

      if (response.ok) {
        setStatus("success");
        // Record in PostHog if available
        if (typeof window !== "undefined" && window.posthog) {
          window.posthog.capture("lead_form_submitted", {
            subject: formData.subject,
            company: formData.company
          });
        }
      } else {
        throw new Error(result.error || "Ocurrió un error al enviar el formulario.");
      }
    } catch (err) {
      console.error("Submission failed:", err);
      Sentry.captureException(err);
      setErrorMessage(err.message || "Fallo de red al enviar al servidor.");
      setStatus("error");
    }
  };

  const triggerMockSentryException = () => {
    const errorMsg = "DGZ_SYSTEM_SIMULATED_EXCEPTION: Sentry integration active check triggered by user button.";
    addSentryLog(errorMsg);
  };

  const addSentryLog = (msg) => {
    try {
      // Create a division-by-zero style error to force Sentry to record a critical stack trace
      const testErr = new Error(msg);
      testErr.name = "SentryTestError";
      Sentry.captureException(testErr);
      
      // Also trigger a window error event to verify global catchers
      console.error(msg, testErr);
      alert("🚨 ¡Excepción simulada enviada a Sentry! Revisa tu panel en sentry.io para ver la actividad.");
    } catch (e) {
      console.error(e);
    }
  };

  return (
    <section id="contact" className="py-32 bg-[#fafafa] border-t border-slate-100 relative">
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

            <div className="pt-10 flex items-center gap-6">
              <Logo className="w-12 h-12 opacity-10" />
              <button 
                type="button"
                onClick={triggerMockSentryException}
                className="inline-flex items-center gap-2 px-4 py-2 border border-dashed border-red-200 text-red-500 text-[9px] font-mono uppercase rounded-lg hover:bg-red-50/50 transition-all cursor-pointer"
              >
                <Bug className="w-3.5 h-3.5" />
                Simular Error (Test Sentry)
              </button>
            </div>
          </div>

          {/* Form Side */}
          <div className="bg-white p-8 md:p-12 border border-slate-100 shadow-2xl rounded-sm relative overflow-hidden">
            <AnimatePresence mode="wait">
              {status === "success" ? (
                <motion.div 
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0 }}
                  className="py-16 text-center space-y-6 flex flex-col items-center justify-center h-full"
                >
                  <CheckCircle2 className="w-16 h-16 text-emerald-500 stroke-[1.5] animate-bounce" />
                  <div className="space-y-2">
                    <h3 className="text-2xl font-black tracking-tight text-[#1a1a1a]">¡Sesión Solicitada!</h3>
                    <p className="text-slate-500 text-xs font-light leading-relaxed max-w-sm">
                      Su requerimiento técnico ha sido procesado y guardado en nuestra capa de datos distribuida. Nos comunicaremos de inmediato.
                    </p>
                  </div>
                  <button 
                    onClick={() => {
                      setStatus("idle");
                      setFormData({ name: "", company: "", email: "", subject: "Auditoría de Datos LADM-COL", description: "" });
                    }} 
                    className="px-6 py-2.5 border border-slate-200 text-[9px] font-black uppercase tracking-wider text-slate-500 hover:bg-slate-50 transition-all"
                  >
                    Agendar otra sesión
                  </button>
                </motion.div>
              ) : (
                <motion.form 
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  onSubmit={handleSubmit} 
                  className="space-y-8"
                >
                  {status === "error" && (
                    <div className="p-4 bg-red-50 border-l-4 border-red-500 text-red-700 text-xs font-mono rounded flex items-center gap-3">
                      <AlertTriangle className="w-4 h-4 flex-shrink-0" />
                      <span>{errorMessage}</span>
                    </div>
                  )}

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    <div className="space-y-2">
                      <div className="flex items-center justify-between pl-1">
                        <label className="text-[9px] font-mono text-slate-400 uppercase tracking-widest">Nombre Completo *</label>
                        {touched.name && (
                          <span className={`text-[8px] font-mono uppercase tracking-widest ${validateName(formData.name) ? "text-emerald-500" : "text-red-500"}`}>
                            {validateName(formData.name) ? "[ VÁLIDO ]" : "[ CORTO ]"}
                          </span>
                        )}
                      </div>
                      <div className="relative">
                        <input 
                          type="text" 
                          name="name"
                          value={formData.name}
                          onChange={handleChange}
                          onBlur={handleBlur}
                          required
                          placeholder="Ing. Carlos Pérez" 
                          className={`w-full bg-[#fcfcfc] border-b p-4 text-xs text-[#1a1a1a] font-medium placeholder:text-slate-400 focus:outline-none transition-colors ${
                            touched.name 
                              ? validateName(formData.name)
                                ? "border-emerald-500/50 focus:border-emerald-500"
                                : "border-red-500/50 focus:border-red-500"
                              : "border-slate-100 focus:border-[#1a1a1a]"
                          }`}
                        />
                        {touched.name && (
                          <div className="absolute right-4 top-1/2 -translate-y-1/2 flex items-center pointer-events-none">
                            {validateName(formData.name) ? (
                              <Check className="w-4 h-4 text-emerald-500" />
                            ) : (
                              <AlertCircle className="w-4 h-4 text-red-500" />
                            )}
                          </div>
                        )}
                      </div>
                    </div>
                    <div className="space-y-2">
                      <div className="flex items-center justify-between pl-1">
                        <label className="text-[9px] font-mono text-slate-400 uppercase tracking-widest">Organización</label>
                        {touched.company && formData.company.trim() && (
                          <span className="text-[8px] font-mono uppercase tracking-widest text-emerald-500">
                            [ INGRESADO ]
                          </span>
                        )}
                      </div>
                      <input 
                        type="text" 
                        name="company"
                        value={formData.company}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        placeholder="Entidad / Empresa" 
                        className={`w-full bg-[#fcfcfc] border-b p-4 text-xs text-[#1a1a1a] font-medium placeholder:text-slate-400 focus:outline-none transition-colors ${
                          touched.company && formData.company.trim()
                            ? "border-emerald-500/30 focus:border-emerald-500"
                            : "border-slate-100 focus:border-[#1a1a1a]"
                        }`}
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <div className="flex items-center justify-between pl-1">
                      <label className="text-[9px] font-mono text-slate-400 uppercase tracking-widest">Email Institucional *</label>
                      {touched.email && (
                        <span className={`text-[8px] font-mono uppercase tracking-widest ${
                          !validateEmail(formData.email)
                            ? "text-red-500"
                            : isInstitutionalEmail(formData.email)
                              ? "text-emerald-500"
                              : "text-amber-500"
                        }`}>
                          {!validateEmail(formData.email) 
                            ? "[ INVÁLIDO ]" 
                            : isInstitutionalEmail(formData.email)
                              ? "[ PRIORIDAD ALTA ]"
                              : "[ CORREO PERSONAL ]"}
                        </span>
                      )}
                    </div>
                    <div className="relative">
                      <input 
                        type="email" 
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        required
                        placeholder="cperez@organizacion.com" 
                        className={`w-full bg-[#fcfcfc] border-b p-4 text-xs text-[#1a1a1a] font-medium placeholder:text-slate-400 focus:outline-none transition-colors ${
                          touched.email 
                            ? !validateEmail(formData.email)
                              ? "border-red-500/50 focus:border-red-500"
                              : isInstitutionalEmail(formData.email)
                                ? "border-emerald-500/50 focus:border-emerald-500"
                                : "border-amber-500/50 focus:border-amber-500"
                            : "border-slate-100 focus:border-[#1a1a1a]"
                        }`}
                      />
                      {touched.email && (
                        <div className="absolute right-4 top-1/2 -translate-y-1/2 flex items-center pointer-events-none">
                          {!validateEmail(formData.email) ? (
                            <AlertCircle className="w-4 h-4 text-red-500" />
                          ) : isInstitutionalEmail(formData.email) ? (
                            <Check className="w-4 h-4 text-emerald-500" />
                          ) : (
                            <AlertCircle className="w-4 h-4 text-amber-500" />
                          )}
                        </div>
                      )}
                    </div>
                    
                    <AnimatePresence>
                      {touched.email && validateEmail(formData.email) && !isInstitutionalEmail(formData.email) && (
                        <motion.div
                          initial={{ opacity: 0, height: 0 }}
                          animate={{ opacity: 1, height: "auto" }}
                          exit={{ opacity: 0, height: 0 }}
                          className="pt-1 text-[10px] text-amber-600 font-light flex items-center gap-1.5"
                        >
                          <AlertTriangle className="w-3.5 h-3.5 flex-shrink-0" />
                          <span>
                            <strong>Recomendación:</strong> Utilice su correo corporativo o gubernamental para priorizar su solicitud en nuestra cola de ingeniería de misión crítica.
                          </span>
                        </motion.div>
                      )}
                      
                      {touched.email && validateEmail(formData.email) && isInstitutionalEmail(formData.email) && (
                        <motion.div
                          initial={{ opacity: 0, height: 0 }}
                          animate={{ opacity: 1, height: "auto" }}
                          exit={{ opacity: 0, height: 0 }}
                          className="pt-1 text-[10px] text-emerald-600 font-light flex items-center gap-1.5"
                        >
                          <ShieldCheck className="w-3.5 h-3.5 flex-shrink-0" />
                          <span>
                            <strong>¡Excelente!</strong> Correo institucional detectado. Su solicitud recibirá procesamiento prioritario Nivel 1.
                          </span>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>

                  <div className="space-y-2">
                    <label className="text-[9px] font-mono text-slate-400 uppercase tracking-widest pl-1">Asunto de la Sesión</label>
                    <select 
                      name="subject"
                      value={formData.subject}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      className="w-full bg-[#fcfcfc] border-b border-slate-100 p-4 text-xs text-[#1a1a1a] font-medium focus:outline-none focus:border-[#1a1a1a] transition-colors appearance-none"
                    >
                      <option>Auditoría de Datos LADM-COL</option>
                      <option>Implementación de Digital Twin</option>
                      <option>Consultoría en Estándares ICDE</option>
                      <option>Otros requerimientos técnicos</option>
                    </select>
                  </div>

                  <div className="space-y-2">
                    <div className="flex items-center justify-between pl-1">
                      <label className="text-[9px] font-mono text-slate-400 uppercase tracking-widest">Descripción del Desafío *</label>
                      <span className={`text-[8px] font-mono uppercase tracking-widest ${
                        formData.description.length >= 30 ? "text-emerald-500" : "text-slate-400"
                      }`}>
                        {formData.description.length} / 30 mín.
                      </span>
                    </div>
                    <div className="relative">
                      <textarea 
                        name="description"
                        value={formData.description}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        required
                        rows="4" 
                        placeholder="Breve descripción del alcance del proyecto (por ejemplo, el área del levantamiento LiDAR, requisitos de precisión catastral)..." 
                        className={`w-full bg-[#fcfcfc] border-b p-4 text-xs text-[#1a1a1a] font-medium placeholder:text-slate-400 focus:outline-none transition-colors resize-none ${
                          touched.description
                            ? validateDescription(formData.description)
                              ? "border-emerald-500/50 focus:border-emerald-500"
                              : "border-red-500/50 focus:border-red-500"
                            : "border-slate-100 focus:border-[#1a1a1a]"
                        }`}
                      />
                      {touched.description && (
                        <div className="absolute right-4 bottom-4 flex items-center pointer-events-none">
                          {validateDescription(formData.description) ? (
                            <Check className="w-4 h-4 text-emerald-500" />
                          ) : (
                            <AlertCircle className="w-4 h-4 text-red-500" />
                          )}
                        </div>
                      )}
                    </div>
                  </div>

                  <button 
                    type="submit"
                    disabled={status === "sending"}
                    className="w-full py-5 bg-[#1a1a1a] text-white text-[10px] font-black uppercase tracking-[0.3em] hover:bg-slate-800 transition-all flex items-center justify-center gap-4 shadow-xl disabled:opacity-50 cursor-pointer"
                  >
                    {status === "sending" ? "PROCESANDO..." : "Agendar Sesión Técnica"} 
                    <Send className={`w-3 h-3 ${status === "sending" ? "animate-pulse" : ""}`} />
                  </button>
                </motion.form>
              )}
            </AnimatePresence>
          </div>
        </div>
      </div>
    </section>
  );
}

