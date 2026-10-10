import { SERVICES_DATA } from "../data/servicesData";
import { SITE_URL, STATIC_ROUTES, BLOG_POSTS_SEO, PROJECTS_SEO } from "../lib/seo";

export default function sitemap() {
  const now = new Date();

  const staticEntries = STATIC_ROUTES.map(({ path, priority, changeFrequency }) => ({
    url: `${SITE_URL}${path === "/" ? "" : path}`,
    lastModified: now,
    changeFrequency,
    priority,
  }));

  const serviceEntries = Object.keys(SERVICES_DATA).map((slug) => ({
    url: `${SITE_URL}/services/${slug}`,
    lastModified: now,
    changeFrequency: "monthly",
    priority: 0.8,
  }));

  const projectEntries = Object.entries(PROJECTS_SEO).map(([id, project]) => ({
    url: `${SITE_URL}/projects/${id}`,
    lastModified: now,
    changeFrequency: "monthly",
    priority: 0.8,
    images: [`${SITE_URL}${project.image}`],
  }));

  const blogEntries = Object.entries(BLOG_POSTS_SEO).map(([id, post]) => ({
    url: `${SITE_URL}/blog/${id}`,
    lastModified: new Date(post.datePublished),
    changeFrequency: "yearly",
    priority: 0.7,
    images: [`${SITE_URL}${post.image}`],
  }));

  return [...staticEntries, ...serviceEntries, ...projectEntries, ...blogEntries];
}
