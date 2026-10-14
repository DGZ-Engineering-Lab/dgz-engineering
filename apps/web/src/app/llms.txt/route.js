import { SERVICES_DATA } from "../../data/servicesData";
import { SITE_URL, SITE_NAME, SITE_DESCRIPTION, FOUNDER, STATIC_ROUTES, PROJECTS_SEO, BLOG_POSTS_SEO } from "../../lib/seo";

// llms.txt (https://llmstxt.org): resumen en Markdown para asistentes y motores
// de respuesta con IA. Se genera desde los mismos datos que el sitio.
export const dynamic = "force-static";

export function GET() {
  const services = Object.values(SERVICES_DATA)
    .map((s) => `- [${s.tagline}](${SITE_URL}/services/${s.slug}): ${s.concept}`)
    .join("\n");
  const projects = Object.entries(PROJECTS_SEO)
    .map(([id, p]) => `- [${p.title}](${SITE_URL}/projects/${id}): ${p.description}`)
    .join("\n");
  const posts = Object.entries(BLOG_POSTS_SEO)
    .map(([id, p]) => `- [${p.title}](${SITE_URL}/blog/${id}) (${p.datePublished}): ${p.description}`)
    .join("\n");
  const pages = STATIC_ROUTES.filter((r) => r.path !== "/")
    .map((r) => `- [${r.title}](${SITE_URL}${r.path})`)
    .join("\n");

  const body = `# ${SITE_NAME}

> ${SITE_DESCRIPTION}

${SITE_NAME} es una firma de ingeniería geoespacial con sede en Medellín, Colombia, fundada por ${FOUNDER.name}. Se especializa en Catastro Multipropósito bajo el estándar LADM-COL (ISO 19152) e INTERLIS/XTF, automatización de flujos GIS con PostGIS, QGIS y Python, inteligencia artificial territorial (GeoAI) e infraestructura DevOps para datos espaciales. Trabaja con gestores catastrales, entidades públicas y empresas privadas en Colombia, alineada con la normativa del IGAC, la SNR y la ICDE.

## Servicios

${services}

## Proyectos

${projects}

## Artículos

${posts}

## Páginas

${pages}
`;

  return new Response(body, {
    headers: { "Content-Type": "text/plain; charset=utf-8" },
  });
}
