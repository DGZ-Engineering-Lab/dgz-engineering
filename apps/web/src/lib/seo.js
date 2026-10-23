// Fuente única de verdad para SEO: URL canónica, metadatos por defecto,
// helpers de Metadata API y constructores de datos estructurados (JSON-LD).

export const SITE_URL = (process.env.NEXT_PUBLIC_SITE_URL || "https://devgiz.vercel.app").replace(/\/$/, "");
export const SITE_NAME = "DevGiz";
export const SITE_LOCALE = "es_CO";
export const SITE_LANG = "es-CO";
export const SITE_TAGLINE = "Catastro LADM-COL, WebGIS y Analítica Geoespacial";
export const SITE_DESCRIPTION =
  "Catastro multipropósito LADM-COL, WebGIS y automatización geoespacial para municipios, constructoras y empresas en Colombia. Primera sesión sin costo.";

export const FOUNDER = {
  name: "Albert Daniel Gaviria Zapata",
  jobTitle: "Ingeniero Geoespacial y Arquitecto de Sistemas GIS",
};

// Perfiles verificables de la marca y del fundador (refuerzan la entidad y E-E-A-T).
export const SAME_AS = ["https://github.com/DGZ-Engineering-Lab", "https://github.com/gaviriaz", "https://www.linkedin.com/in/soyalbertgz"];

// Canales de contacto reales (fuente única para navbar, footer y formularios).
export const CONTACT = {
  email: "Albertg2109@gmail.com",
  whatsapp: "573053261466",
  whatsappDisplay: "+57 305 326 1466",
  // Mensaje precargado: el cliente no tiene que pensar cómo empezar la conversación.
  whatsappUrl: "https://wa.me/573053261466?text=" + encodeURIComponent("Hola DevGiz, vi su sitio web y quiero información sobre un proyecto."),
  linkedin: "https://www.linkedin.com/in/soyalbertgz",
  github: "https://github.com/gaviriaz",
  city: "Medellín, Colombia",
};

export const SITE_KEYWORDS = [
  "Catastro Multipropósito",
  "LADM-COL",
  "ISO 19152",
  "INTERLIS",
  "XTF",
  "GIS Colombia",
  "PostGIS",
  "QGIS",
  "GeoAI",
  "automatización GIS",
  "ingeniería geoespacial",
  "inteligencia territorial",
  "DevOps geoespacial",
  "IGAC",
  "SNR",
  "Medellín",
];

export const DEFAULT_OG_IMAGE = "/opengraph-image";

export const absoluteUrl = (path = "/") => `${SITE_URL}${path.startsWith("/") ? path : `/${path}`}`;

/**
 * Metadatos de una ruta con canonical, Open Graph y Twitter coherentes.
 * El título final es "<title> | DevGiz".
 */
export function pageMetadata({ title, description, path, image, type = "website", keywords, noIndex = false, publishedTime, authors }) {
  // Sin imagen propia se usa la imagen social generada en app/opengraph-image.js:
  // al definir openGraph en una ruta, Next deja de heredar la del layout raíz.
  const images = image
    ? [{ url: image, alt: title }]
    : [{ url: DEFAULT_OG_IMAGE, width: 1200, height: 630, alt: `${SITE_NAME} · ${SITE_TAGLINE}` }];
  return {
    // Absoluto para no depender de la plantilla del layout padre (un layout
    // intermedio con título propio la anula para sus hijos).
    title: { absolute: `${title} | ${SITE_NAME}` },
    description,
    ...(keywords ? { keywords } : {}),
    alternates: { canonical: path },
    openGraph: {
      title: `${title} | ${SITE_NAME}`,
      description,
      url: path,
      siteName: SITE_NAME,
      locale: SITE_LOCALE,
      type,
      images,
      ...(publishedTime ? { publishedTime } : {}),
      ...(authors ? { authors } : {}),
    },
    twitter: {
      card: "summary_large_image",
      title: `${title} | ${SITE_NAME}`,
      description,
      // Sin imagen propia, X/Twitter recurre a og:image (que puede venir de un opengraph-image por ruta).
      ...(image ? { images: [image] } : {}),
    },
    ...(noIndex ? { robots: { index: false, follow: false } } : {}),
  };
}

// ---------------------------------------------------------------------------
// Contenido indexable de rutas dinámicas cuyas páginas son componentes cliente
// (no pueden exportar metadata). Mantener sincronizado con las páginas.
// ---------------------------------------------------------------------------

export const BLOG_POSTS_SEO = {
  "1": {
    title: "Soberanía Digital y la Protección de Activos Territoriales",
    description: "Ransomware, ICDE y la nueva era de la seguridad jurídica en Colombia: cómo proteger la información catastral como activo crítico.",
    category: "Ciberseguridad",
    datePublished: "2026-05-12",
    image: "/assets/img/blog-cybersecurity.png",
  },
  "2": {
    title: "El Estándar LADM-COL como Eje de Interoperabilidad",
    description: "Cómo el Valle del Cauca y Villavicencio están transformando el Catastro Multipropósito con LADM-COL (ISO 19152) e INTERLIS.",
    category: "Interoperabilidad",
    datePublished: "2026-05-10",
    image: "/assets/img/blog-ladm-col.png",
  },
  "3": {
    title: "ConstruMetrix: La Precisión LiDAR en la Ciudad Inteligente",
    description: "Del gemelo digital a la toma de decisiones basada en realidades físicas: LiDAR y digitalización del entorno construido.",
    category: "Ingeniería",
    datePublished: "2026-05-05",
    image: "/assets/img/geoai_after.png",
  },
  "4": {
    title: "Inteligencia Artificial Territorial: De la Detección al Saneamiento",
    description: "Cómo los modelos de visión computacional están revolucionando la gestión predial y el saneamiento catastral en Colombia.",
    category: "Inteligencia Artificial",
    datePublished: "2026-05-01",
    image: "/assets/img/topo-bg.png",
  },
};

export const PROJECTS_SEO = {
  "catastro-valle": {
    title: "Catastro Multipropósito Valle del Cauca",
    description: "Soberanía fiscal y seguridad jurídica predial mediante la implementación nativa del estándar LADM-COL e INTERLIS en el Valle del Cauca.",
    category: "Infraestructura Territorial",
    image: "/assets/img/blog-ladm-col.png",
  },
  "qgis-plugin": {
    title: "Validador LADM-COL QGIS Plugin",
    description: "Plugin de QGIS para control de calidad topológico y validación instantánea de bases de datos territoriales bajo el estándar LADM-COL.",
    category: "Software de Ingeniería",
    image: "/assets/img/geoai_before.png",
  },
  "automation-systems": {
    title: "Territorial ETL & Data Pipelines",
    description: "Pipelines ETL geoespaciales para migrar, transformar y validar GML, GeoJSON, KML e INTERLIS (XTF) a escala para gestores catastrales.",
    category: "Infraestructura de Datos",
    image: "/assets/img/topo-bg.png",
  },
  "geo-llm": {
    title: "Inteligencia GeoAI & Geo-LLM",
    description: "IA generativa aplicada al territorio: consultas en lenguaje natural en español traducidas a Spatial SQL sobre bases catastrales PostGIS.",
    category: "Inteligencia Artificial",
    image: "/assets/img/blog-cybersecurity.png",
  },
};

// Fecha de la última revisión de contenido. Actualizarla solo cuando cambie el
// contenido: un lastmod que cambia en cada build hace que Google lo ignore.
export const CONTENT_UPDATED = "2026-10-23";

// Rutas estáticas públicas para sitemap.xml y llms.txt.
export const STATIC_ROUTES = [
  { path: "/", title: "Inicio", priority: 1.0, changeFrequency: "weekly" },
  { path: "/about", title: "Sobre DevGiz", priority: 0.8, changeFrequency: "monthly" },
  { path: "/projects", title: "Proyectos y casos de éxito", priority: 0.9, changeFrequency: "monthly" },
  { path: "/blog", title: "Blog técnico", priority: 0.8, changeFrequency: "weekly" },
  { path: "/faq", title: "Preguntas frecuentes", priority: 0.7, changeFrequency: "monthly" },
  { path: "/standards", title: "Estándares y normativa", priority: 0.7, changeFrequency: "monthly" },
  { path: "/docs", title: "Documentación de la API", priority: 0.6, changeFrequency: "monthly" },
  { path: "/diagnostic", title: "Diagnóstico territorial", priority: 0.6, changeFrequency: "monthly" },
  { path: "/brochure", title: "Brochure de servicios", priority: 0.6, changeFrequency: "monthly" },
  { path: "/careers", title: "Trabaja con nosotros", priority: 0.5, changeFrequency: "monthly" },
  { path: "/lab/gesture-sandbox", title: "Laboratorio de gestos GIS", priority: 0.4, changeFrequency: "yearly" },
  { path: "/privacy", title: "Política de privacidad", priority: 0.2, changeFrequency: "yearly" },
  { path: "/terms", title: "Términos y condiciones", priority: 0.2, changeFrequency: "yearly" },
];

// ---------------------------------------------------------------------------
// JSON-LD (schema.org)
// ---------------------------------------------------------------------------

const ORG_ID = `${SITE_URL}/#organization`;
const PERSON_ID = `${SITE_URL}/#founder`;
const WEBSITE_ID = `${SITE_URL}/#website`;

export function siteJsonLd() {
  return {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": ["Organization", "ProfessionalService"],
        "@id": ORG_ID,
        name: SITE_NAME,
        alternateName: ["DGZ Engineering", "DevGiz Smart Geospatial DevOps Systems"],
        url: SITE_URL,
        logo: absoluteUrl("/apple-icon"),
        image: absoluteUrl("/opengraph-image"),
        description: SITE_DESCRIPTION,
        slogan: "Building Digital Territories",
        founder: { "@id": PERSON_ID },
        address: {
          "@type": "PostalAddress",
          addressLocality: "Medellín",
          addressRegion: "Antioquia",
          addressCountry: "CO",
        },
        areaServed: { "@type": "Country", name: "Colombia" },
        email: CONTACT.email,
        telephone: `+${CONTACT.whatsapp}`,
        contactPoint: {
          "@type": "ContactPoint",
          contactType: "sales",
          email: CONTACT.email,
          telephone: `+${CONTACT.whatsapp}`,
          areaServed: "CO",
          availableLanguage: ["es", "en"],
        },
        knowsAbout: [
          "Catastro Multipropósito",
          "LADM-COL (ISO 19152)",
          "INTERLIS",
          "Sistemas de Información Geográfica",
          "PostGIS",
          "QGIS",
          "GeoAI",
          "Teledetección",
          "LiDAR",
          "DevOps",
        ],
        sameAs: SAME_AS,
      },
      {
        "@type": "Person",
        "@id": PERSON_ID,
        name: FOUNDER.name,
        jobTitle: FOUNDER.jobTitle,
        url: absoluteUrl("/about"),
        sameAs: [CONTACT.linkedin, CONTACT.github],
        worksFor: { "@id": ORG_ID },
        address: { "@type": "PostalAddress", addressLocality: "Medellín", addressCountry: "CO" },
        knowsAbout: ["GIS", "LADM-COL", "PostGIS", "Python", "Catastro Multipropósito", "Ingeniería de datos geoespaciales"],
      },
      {
        "@type": "WebSite",
        "@id": WEBSITE_ID,
        url: SITE_URL,
        name: SITE_NAME,
        description: SITE_DESCRIPTION,
        inLanguage: SITE_LANG,
        publisher: { "@id": ORG_ID },
      },
    ],
  };
}

export function breadcrumbJsonLd(items) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, i) => ({
      "@type": "ListItem",
      position: i + 1,
      name: item.name,
      item: absoluteUrl(item.path),
    })),
  };
}

export function articleJsonLd({ id, title, description, datePublished, image, category }) {
  const url = absoluteUrl(`/blog/${id}`);
  return {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    "@id": `${url}#article`,
    mainEntityOfPage: url,
    headline: title,
    description,
    datePublished,
    dateModified: datePublished,
    image: absoluteUrl(image),
    articleSection: category,
    inLanguage: SITE_LANG,
    author: { "@id": PERSON_ID, "@type": "Person", name: FOUNDER.name, url: absoluteUrl("/about") },
    publisher: { "@id": ORG_ID },
    isPartOf: { "@id": WEBSITE_ID },
  };
}

export function serviceJsonLd({ slug, title, description, category }) {
  const url = absoluteUrl(`/services/${slug}`);
  return {
    "@context": "https://schema.org",
    "@type": "Service",
    "@id": `${url}#service`,
    url,
    name: title,
    description,
    serviceType: category,
    provider: { "@id": ORG_ID },
    areaServed: { "@type": "Country", name: "Colombia" },
    inLanguage: SITE_LANG,
  };
}

export function projectJsonLd({ id, title, description, image, category }) {
  const url = absoluteUrl(`/projects/${id}`);
  return {
    "@context": "https://schema.org",
    "@type": "CreativeWork",
    "@id": `${url}#project`,
    url,
    name: title,
    description,
    genre: category,
    image: absoluteUrl(image),
    inLanguage: SITE_LANG,
    creator: { "@id": ORG_ID },
  };
}

export function faqJsonLd(questions) {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: questions.map(({ q, a }) => ({
      "@type": "Question",
      name: q,
      acceptedAnswer: { "@type": "Answer", text: a },
    })),
  };
}
