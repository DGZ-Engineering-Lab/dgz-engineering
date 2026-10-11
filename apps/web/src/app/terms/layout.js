import { pageMetadata } from "../../lib/seo";

export const metadata = pageMetadata({
  title: "Términos y Condiciones del Servicio",
  description:
    "Términos y condiciones de uso de los servicios, plataformas y herramientas geoespaciales de DevGiz.",
  path: "/terms",
});

export default function TermsLayout({ children }) {
  return children;
}
