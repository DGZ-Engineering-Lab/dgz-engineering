const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || "https://devgiz.vercel.app";

export default function robots() {
  return {
    rules: [{ userAgent: "*", allow: "/", disallow: ["/admin", "/api/"] }],
    sitemap: `${SITE_URL}/sitemap.xml`,
  };
}
