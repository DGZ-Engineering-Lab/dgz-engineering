"use client";
import { useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Send, MapPin, Mail, CheckCircle2, AlertTriangle, ShieldCheck, Check, AlertCircle, MessageCircle, Clock } from "lucide-react";
import { CONTACT } from "../lib/seo";
// Sentry is loaded on demand so it stays out of the home page bundle.
const withSentry = (fn) => import("@sentry/nextjs").then(fn).catch(() => {});

export default function ContactSection() {
  const [formData, setFormData] = useState({
    name: "",
    company: "",
    email: "",
    subject: "Catastro multipropósito / LADM-COL",
    description: ""
  });
  
  const [status, setStatus] = useState("idle"); // idle, sending, success, error
  const [errorMessage, setErrorMessage] = useState("");
  const successHeadingRef = useRef(null);
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

  // Lleva el foco al primer campo inválido para que teclado y lector de pantalla lleguen al error (WCAG 3.3.1).
  const failValidation = (fieldId, message) => {
    setErrorMessage(message);
    setStatus("error");
    document.getElementById(fieldId)?.focus();
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    // Set all fields to touched on submit
    setTouched({ name: true, email: true, company: true, description: true });

    if (!validateName(formData.name)) {
      failValidation("contact-name", "El nombre de contacto debe tener al menos 3 caracteres.");
      return;
    }

    if (!validateEmail(formData.email)) {
      failValidation("contact-email", "Ingresa un correo válido, por ejemplo nombre@entidad.gov.co.");
      return;
    }

    if (!validateDescription(formData.description)) {
      failValidation("contact-description", "Describe tu reto con al menos 30 caracteres para preparar una propuesta.");
      return;
    }

    setStatus("sending");
    setErrorMessage("");

    // Telemetry capture: Log submission event in Sentry for instant validation
    withSentry((Sentry) => Sentry.captureMessage("Lead Contact Session Request", {
      level: "info",
      extra: {
        subject: formData.subject,
        length: formData.description.length
      }
    }));

    try {

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

      const result = await response.json().catch(() => ({}));

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
        // Los errores del API vienen en inglés: se muestran mensajes en español al usuario
        throw new Error(
          response.status === 429
            ? "Demasiados envíos seguidos. Intenta de nuevo en un minuto."
            : "No pudimos enviar tu solicitud. Intenta de nuevo o escríbenos por WhatsApp."
        );
      }
    } catch (err) {
      console.error("Submission failed:", err);
      withSentry((Sentry) => Sentry.captureException(err));
      setErrorMessage(err instanceof TypeError ? "Fallo de red al enviar al servidor. Revisa tu conexión." : err.message);
      setStatus("error");
    }
  };

  return (
    <section id="contact" className="py-20 md:py-28 bg-gradient-to-b from-transparent via-white/60 to-white border-t border-slate-200/60 relative scroll-mt-20">
      <div className="container-dgz">
        <div className="grid grid-cols-1 lg:grid-cols-[0.9fr_1.1fr] gap-12 lg:gap-20 items-start">
          
          {/* Info Side */}
          <div className="space-y-10 lg:sticky lg:top-28">
            <div className="space-y-5">
              <span className="eyebrow">Contacto · Sesión técnica</span>
              <h2 className="text-4xl md:text-6xl font-black tracking-tighter leading-[1.02] text-[#0b1220]">
                Hablemos de <br /> <span className="text-gradient-brand font-light italic">ingeniería.</span>
              </h2>
              <p className="text-slate-600 text-lg font-light leading-relaxed max-w-md">
                Cuéntanos tu reto territorial y te proponemos una ruta técnica concreta, con alcance y tiempos claros.
              </p>
            </div>

            <ul className="space-y-3">
              <li>
                <a href={CONTACT.whatsappUrl} target="_blank" rel="noopener noreferrer" className="card-dgz card-hover flex items-center gap-4 p-4 !rounded-[var(--radius-md)]">
                  <span className="w-11 h-11 rounded-[var(--radius-sm)] bg-emerald-50 text-emerald-600 flex items-center justify-center flex-shrink-0"><MessageCircle className="w-5 h-5" /></span>
                  <span>
                    <span className="block text-[0.68rem] font-mono text-slate-500 uppercase tracking-[0.18em]">WhatsApp · respuesta más rápida</span>
                    <span className="block text-sm font-bold text-[#0b1220]">{CONTACT.whatsappDisplay}</span>
                  </span>
                </a>
              </li>
              <li>
                <a href={`mailto:${CONTACT.email}`} className="card-dgz card-hover flex items-center gap-4 p-4 !rounded-[var(--radius-md)]">
                  <span className="w-11 h-11 rounded-[var(--radius-sm)] bg-cyan-50 text-cyan-700 flex items-center justify-center flex-shrink-0"><Mail className="w-5 h-5" /></span>
                  <span>
                    <span className="block text-[0.68rem] font-mono text-slate-500 uppercase tracking-[0.18em]">Correo directo</span>
                    <span className="block text-sm font-bold text-[#0b1220] break-all">{CONTACT.email}</span>
                  </span>
                </a>
              </li>
              <li className="flex items-center gap-4 px-4 py-2 text-sm text-slate-600">
                <MapPin className="w-4 h-4 text-slate-400" aria-hidden="true" /> {CONTACT.city} · Proyectos en todo el país
              </li>
              <li className="flex items-center gap-4 px-4 py-2 text-sm text-slate-600">
                <Clock className="w-4 h-4 text-slate-400" aria-hidden="true" /> Respuesta en menos de 24 horas hábiles
              </li>
            </ul>
          </div>

          {/* Form Side */}
          <div className="bg-white p-6 sm:p-8 md:p-10 border border-slate-200/70 shadow-[0_30px_80px_-40px_rgba(15,23,42,0.35)] rounded-[var(--radius-lg)] relative overflow-hidden">
            <div aria-hidden="true" className="absolute inset-x-0 top-0 h-1 bg-gradient-to-r from-cyan-500 via-blue-600 to-indigo-600" />
            <AnimatePresence mode="wait">
              {status === "success" ? (
                <motion.div 
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0 }}
                  // AnimatePresence (mode="wait") monta este panel tras la salida del formulario:
                  // el foco pasa al título de confirmación cuando ya existe, para que se anuncie.
                  onAnimationComplete={() => successHeadingRef.current?.focus()}
                  role="status"
                  className="py-16 text-center space-y-6 flex flex-col items-center justify-center h-full"
                >
                  <CheckCircle2 aria-hidden="true" className="w-16 h-16 text-emerald-500 stroke-[1.5]" />
                  <div className="space-y-2">
                    <h3 ref={successHeadingRef} tabIndex={-1} className="text-2xl font-black tracking-tight text-[#1a1a1a]">Sesión solicitada</h3>
                    <p className="text-slate-600 text-sm font-light leading-relaxed max-w-sm">
                      Recibimos tu requerimiento. Te escribiremos en menos de 24 horas hábiles con una propuesta de siguiente paso.
                    </p>
                  </div>
                  <button 
                    type="button"
                    onClick={() => {
                      setStatus("idle");
                      setFormData({ name: "", company: "", email: "", subject: "Catastro multipropósito / LADM-COL", description: "" });
                      setTouched({ name: false, email: false, company: false, description: false });
                      // El panel de éxito se desmonta: devolvemos el foco al primer campo del formulario nuevo.
                      requestAnimationFrame(() => requestAnimationFrame(() => document.getElementById("contact-name")?.focus()));
                    }} 
                    className="btn btn-secondary btn-sm"
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
                  noValidate
                  aria-label="Solicitud de sesión técnica"
                  className="space-y-6"
                >
                  {status === "error" && (
                    <div role="alert" className="p-4 bg-red-50 border border-red-200 text-red-700 text-sm rounded-[var(--radius-sm)] flex items-center gap-3">
                      <AlertTriangle aria-hidden="true" className="w-4 h-4 flex-shrink-0" />
                      <span>{errorMessage}</span>
                    </div>
                  )}

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <div className="flex items-center justify-between pl-1">
                        <label htmlFor="contact-name" className="label-dgz !mb-0">Nombre Completo <span aria-hidden="true">*</span></label>
                        {touched.name && (
                          <span id="contact-name-status" className={`text-[11px] font-mono uppercase tracking-wider ${validateName(formData.name) ? "text-emerald-700" : "text-red-600"}`}>
                            {validateName(formData.name) ? "[ VÁLIDO ]" : "Mínimo 3 caracteres"}
                          </span>
                        )}
                      </div>
                      <div className="relative">
                        <input 
                          type="text" 
                          id="contact-name"
                          name="name"
                          autoComplete="name"
                          maxLength={120}
                          aria-invalid={touched.name && !validateName(formData.name)}
                          aria-describedby={touched.name ? "contact-name-status" : undefined}
                          value={formData.name}
                          onChange={handleChange}
                          onBlur={handleBlur}
                          required
                          placeholder="Ing. Carlos Pérez" 
                          className={`field-dgz ${
                            touched.name 
                              ? validateName(formData.name)
                                ? "border-emerald-500/50 focus:border-emerald-500"
                                : "border-red-500/50 focus:border-red-500"
                              : ""
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
                        <label htmlFor="contact-company" className="label-dgz !mb-0">Organización</label>
                        {touched.company && formData.company.trim() && (
                          <span className="text-[11px] font-mono uppercase tracking-wider text-emerald-700">
                            [ INGRESADO ]
                          </span>
                        )}
                      </div>
                      <input 
                        type="text" 
                        id="contact-company"
                        name="company"
                        autoComplete="organization"
                        value={formData.company}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        placeholder="Entidad / Empresa" 
                        className={`field-dgz ${
                          touched.company && formData.company.trim()
                            ? "border-emerald-500/30 focus:border-emerald-500"
                            : ""
                        }`}
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <div className="flex items-center justify-between pl-1">
                      <label htmlFor="contact-email" className="label-dgz !mb-0">Correo electrónico <span aria-hidden="true">*</span></label>
                      {touched.email && (
                        <span id="contact-email-status" className={`text-[11px] font-mono uppercase tracking-wider ${
                          !validateEmail(formData.email)
                            ? "text-red-600"
                            : isInstitutionalEmail(formData.email)
                              ? "text-emerald-700"
                              : "text-amber-700"
                        }`}>
                          {!validateEmail(formData.email) 
                            ? "Revisa el formato: nombre@dominio.com" 
                            : isInstitutionalEmail(formData.email)
                              ? "[ PRIORIDAD ALTA ]"
                              : "[ PERSONAL ]"}
                        </span>
                      )}
                    </div>
                    <div className="relative">
                      <input 
                        type="email" 
                        id="contact-email"
                        name="email"
                        autoComplete="email"
                        inputMode="email"
                        maxLength={254}
                        aria-invalid={touched.email && !validateEmail(formData.email)}
                        aria-describedby={touched.email ? "contact-email-status" : undefined}
                        value={formData.email}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        required
                        placeholder="cperez@organizacion.com" 
                        className={`field-dgz ${
                          touched.email 
                            ? !validateEmail(formData.email)
                              ? "border-red-500/50 focus:border-red-500"
                              : isInstitutionalEmail(formData.email)
                                ? "border-emerald-500/50 focus:border-emerald-500"
                                : "border-amber-500/50 focus:border-amber-500"
                            : ""
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
                          className="pt-1 text-xs text-amber-700 font-light flex items-center gap-1.5"
                        >
                          <AlertTriangle className="w-3.5 h-3.5 flex-shrink-0" />
                          <span>
                            Correo personal aceptado. Si tienes uno corporativo o institucional, úsalo para priorizar tu solicitud.
                          </span>
                        </motion.div>
                      )}
                      
                      {touched.email && validateEmail(formData.email) && isInstitutionalEmail(formData.email) && (
                        <motion.div
                          initial={{ opacity: 0, height: 0 }}
                          animate={{ opacity: 1, height: "auto" }}
                          exit={{ opacity: 0, height: 0 }}
                          className="pt-1 text-xs text-emerald-700 font-light flex items-center gap-1.5"
                        >
                          <ShieldCheck className="w-3.5 h-3.5 flex-shrink-0" />
                          <span>
                            Correo institucional detectado: tu solicitud se atiende con prioridad.
                          </span>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>

                  <div className="space-y-2">
                    <label htmlFor="contact-subject" className="label-dgz !mb-0">Asunto de la Sesión</label>
                    <select 
                      id="contact-subject"
                      name="subject"
                      value={formData.subject}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      className="field-dgz"
                    >
                      <option>Catastro multipropósito / LADM-COL</option>
                      <option>WebGIS y visores geográficos</option>
                      <option>Analítica de datos y tableros BI</option>
                      <option>Drones, fotogrametría y GNSS</option>
                      <option>Automatización e IA geoespacial</option>
                      <option>Otro requerimiento técnico</option>
                    </select>
                  </div>

                  <div className="space-y-2">
                    <div className="flex items-center justify-between pl-1">
                      <label htmlFor="contact-description" className="label-dgz !mb-0">Descripción del Desafío <span aria-hidden="true">*</span></label>
                      <span id="contact-description-count" className={`text-[11px] font-mono uppercase tracking-wider ${
                        formData.description.length >= 30 ? "text-emerald-700" : "text-slate-500"
                      }`}>
                        {formData.description.length} / 30 mín.
                      </span>
                    </div>
                    <div className="relative">
                      <textarea 
                        id="contact-description"
                        name="description"
                        aria-invalid={touched.description && !validateDescription(formData.description)}
                        aria-describedby={touched.description && !validateDescription(formData.description) ? "contact-description-count contact-description-error" : "contact-description-count"}
                        value={formData.description}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        required
                        rows="4" 
                        placeholder="Breve descripción del alcance del proyecto (por ejemplo, el área del levantamiento LiDAR, requisitos de precisión catastral)..." 
                        className={`field-dgz resize-none ${
                          touched.description
                            ? validateDescription(formData.description)
                              ? "border-emerald-500/50 focus:border-emerald-500"
                              : "border-red-500/50 focus:border-red-500"
                            : ""
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
                    {touched.description && !validateDescription(formData.description) && (
                      <p id="contact-description-error" className="text-xs text-red-700">
                        Describe tu reto con al menos 30 caracteres para poder preparar una propuesta.
                      </p>
                    )}
                  </div>

                  <button 
                    type="submit"
                    disabled={status === "sending"}
                    aria-busy={status === "sending"}
                    className="btn btn-primary w-full !min-h-[3.5rem] disabled:opacity-50 disabled:pointer-events-none cursor-pointer"
                  >
                    {status === "sending" ? "Enviando…" : "Agendar sesión técnica"}
                    <Send aria-hidden="true" className={`${status === "sending" ? "animate-pulse" : ""}`} />
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

