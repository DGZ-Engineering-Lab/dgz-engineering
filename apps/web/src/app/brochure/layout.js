import { pageMetadata } from "../../lib/seo";

export const metadata = pageMetadata({
  title: "Brochure de Servicios GIS, Catastro y Automatización",
  description:
    "Protege tus terrenos y acelera tus proyectos: servicios de DevGiz en GIS, Catastro Multipropósito, automatización geoespacial, drones, DevOps y bases de datos espaciales.",
  path: "/brochure",
});

export default function BrochureLayout({ children }) {
  return children;
}
