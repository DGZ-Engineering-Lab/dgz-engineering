import { SITE_URL } from "../lib/seo";

// Todo el contenido público es indexable, incluidos los rastreadores de motores
// de respuesta con IA (GPTBot, ClaudeBot, PerplexityBot, Google-Extended...).
export default function robots() {
  return {
    rules: [
      {
        userAgent: "*",
        allow: "/",
        disallow: ["/admin", "/api/"],
      },
    ],
    sitemap: `${SITE_URL}/sitemap.xml`,
    host: SITE_URL,
  };
}
