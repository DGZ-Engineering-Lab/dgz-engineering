// Fuente única de los datos legales del sitio (Ley 1581 de 2012 y Decreto 1074 de 2015).
// Cualquier texto legal, aviso de privacidad o casilla de autorización debe leer de aquí,
// para que una actualización de la política cambie todo el sitio a la vez.

import { CONTACT } from "./seo";

// Responsable del tratamiento: persona natural. Los campos [COMPLETAR] los debe llenar el
// titular antes de considerar el sitio plenamente conforme (Decreto 1074, art. 2.2.2.25.3.1).
export const RESPONSABLE = {
  nombre: "Albert Daniel Gaviria Zapata",
  tipo: "Persona natural",
  documento: process.env.NEXT_PUBLIC_RESPONSABLE_DOCUMENTO || "C.C. [COMPLETAR]",
  direccion:
    process.env.NEXT_PUBLIC_RESPONSABLE_DIRECCION ||
    "[COMPLETAR dirección física de notificaciones], Medellín, Antioquia, Colombia",
  ciudad: "Medellín, Antioquia, Colombia",
  email: CONTACT.email,
  telefono: CONTACT.whatsappDisplay,
  marca: "DevGiz",
  matriculaProfesional:
    process.env.NEXT_PUBLIC_MATRICULA_COPNIA || "[COMPLETAR número de matrícula COPNIA]",
};

// Versión vigente de la política. Al cambiar el texto de la política o de la autorización,
// subir la versión: queda registrada junto a cada consentimiento como prueba de la autorización.
export const POLICY_VERSION = "2026-10-28";
export const POLICY_EFFECTIVE_DATE = "28 de octubre de 2026";

export const LEGAL_PATHS = {
  privacy: "/privacy",
  cookies: "/cookies",
  terms: "/terms",
};

// Finalidades por formulario: la autorización debe indicar la finalidad concreta.
export const FINALIDADES = {
  contacto:
    "responder su solicitud, preparar propuestas y cotizaciones y hacer seguimiento comercial de la misma",
  diagnostico:
    "elaborar el diagnóstico solicitado y contactarle para presentar los resultados y propuestas relacionadas",
  cotizacion: "preparar y enviar la cotización solicitada y gestionar la eventual contratación",
  seleccion:
    "evaluar su perfil en procesos de selección y contactarle sobre vacantes o colaboraciones",
  boletin:
    "enviarle el boletín técnico y novedades de DevGiz por correo electrónico (puede darse de baja en cualquier momento)",
};

// Texto de la autorización previa, expresa e informada (Ley 1581, arts. 9 y 12).
export function authorizationText(finalidad) {
  const fin = FINALIDADES[finalidad] || FINALIDADES.contacto;
  return (
    `Autorizo a ${RESPONSABLE.nombre} (${RESPONSABLE.marca}), responsable del tratamiento (${RESPONSABLE.email}, ` +
    `${RESPONSABLE.telefono}), a recolectar, almacenar, usar y suprimir mis datos personales para ${fin}, conforme a la ` +
    `Política de Tratamiento de Datos Personales. Entiendo que suministrar mis datos es voluntario, que no debo incluir ` +
    `datos sensibles y que mis datos pueden ser procesados por proveedores ubicados en Estados Unidos. Puedo conocer, ` +
    `actualizar, rectificar y suprimir mis datos, solicitar prueba de esta autorización, revocarla y presentar quejas ` +
    `ante la Superintendencia de Industria y Comercio, escribiendo a ${RESPONSABLE.email}.`
  );
}

// Encargados y proveedores tecnológicos (transmisión/transferencia internacional, Ley 1581 art. 26).
export const PROVEEDORES = [
  {
    nombre: "Vercel Inc.",
    pais: "Estados Unidos",
    uso: "Alojamiento del sitio y analítica de visitas sin cookies (Vercel Web Analytics y Speed Insights)",
  },
  {
    nombre: "Upstash Inc.",
    pais: "Estados Unidos",
    uso: "Base de datos de los mensajes recibidos y control de abuso (límites de uso)",
  },
  {
    nombre: "Resend Inc.",
    pais: "Estados Unidos",
    uso: "Envío de correos electrónicos de notificación y boletín",
  },
  {
    nombre: "PostHog Inc.",
    pais: "Estados Unidos",
    uso: "Analítica de uso del sitio, solo si usted acepta las cookies de analítica",
  },
  {
    nombre: "Functional Software Inc. (Sentry)",
    pais: "Estados Unidos",
    uso: "Registro de errores técnicos del sitio",
  },
  {
    nombre: "Groq Inc.",
    pais: "Estados Unidos",
    uso: "Procesamiento del texto que usted escribe en el asistente de IA",
  },
  {
    nombre: "Render Services Inc.",
    pais: "Estados Unidos",
    uso: "Alojamiento de la API geoespacial",
  },
  { nombre: "Mapbox Inc.", pais: "Estados Unidos", uso: "Mapas base interactivos, solo cuando usted activa el mapa" },
  {
    nombre: "Meta Platforms, Inc. (WhatsApp)",
    pais: "Estados Unidos",
    uso: "Canal de mensajería cuando usted decide escribirnos por WhatsApp",
  },
  {
    nombre: "Google LLC (Gmail)",
    pais: "Estados Unidos",
    uso: "Buzón de correo del responsable donde se reciben las notificaciones y solicitudes",
  },
  {
    nombre: "OpenStreetMap Foundation",
    pais: "Reino Unido",
    uso: "Teselas de mapa base en las demostraciones (recibe la dirección IP al cargar el mapa)",
  },
];
