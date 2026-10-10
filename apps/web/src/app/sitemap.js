import { SERVICES_DATA } from "../data/servicesData";

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || "https://devgiz.vercel.app";

const STATIC_ROUTES = [
  ["", 1.0],
  ["/about", 0.8],
  ["/projects", 0.9],
  ["/standards", 0.7],
  ["/diagnostic", 0.7],
  ["/blog", 0.8],
  ["/docs", 0.5],
  ["/faq", 0.5],
  ["/careers", 0.4],
  ["/brochure", 0.6],
  ["/lab/gesture-sandbox", 0.4],
  ["/privacy", 0.2],
  ["/terms", 0.2],
];

const PROJECTS = ["catastro-valle", "qgis-plugin", "automation-systems", "geo-llm"];
const POSTS = ["1", "2", "3", "4"];

export default function sitemap() {
  const now = new Date();
  return [
    ...STATIC_ROUTES.map(([path, priority]) => ({ url: `${SITE_URL}${path}`, lastModified: now, priority })),
    ...PROJECTS.map((id) => ({ url: `${SITE_URL}/projects/${id}`, lastModified: now, priority: 0.7 })),
    ...POSTS.map((id) => ({ url: `${SITE_URL}/blog/${id}`, lastModified: now, priority: 0.6 })),
    ...Object.keys(SERVICES_DATA).map((slug) => ({ url: `${SITE_URL}/services/${slug}`, lastModified: now, priority: 0.7 })),
  ];
}
