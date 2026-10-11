import { pageMetadata } from "../../lib/seo";

export const metadata = pageMetadata({
  title: "Blog Técnico: Catastro, LADM-COL y GeoAI",
  description:
    "Artículos técnicos de DevGiz sobre Catastro Multipropósito, interoperabilidad LADM-COL e INTERLIS, LiDAR, inteligencia artificial territorial y protección de datos catastrales en Colombia.",
  path: "/blog",
});

export default function BlogLayout({ children }) {
  return children;
}
