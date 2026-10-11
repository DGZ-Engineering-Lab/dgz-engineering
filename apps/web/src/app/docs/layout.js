import { pageMetadata } from "../../lib/seo";

export const metadata = pageMetadata({
  title: "Documentación de la API Geoespacial",
  description:
    "Referencia técnica de la API de DevGiz para consultas espaciales, validación LADM-COL e integración de datos catastrales mediante endpoints REST y webhooks.",
  path: "/docs",
});

export default function DocsLayout({ children }) {
  return children;
}
