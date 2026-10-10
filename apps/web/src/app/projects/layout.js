import { pageMetadata } from "../../lib/seo";

export const metadata = pageMetadata({
  title: "Casos de Éxito en Catastro LADM-COL y Automatización GIS",
  description:
    "Proyectos de DevGiz en Catastro Multipropósito bajo LADM-COL, modelado INTERLIS, plugins de QGIS, pipelines ETL geoespaciales y GeoAI para entidades públicas y empresas en Colombia.",
  path: "/projects",
  keywords: [
    "Catastro Multipropósito Colombia",
    "LADM-COL",
    "ISO 19152",
    "INTERLIS Colombia",
    "Modelos de Intercambio XTF",
    "Plugins QGIS",
    "IGAC Colombia",
    "Ingeniería Territorial",
  ],
});

export default function ProjectsLayout({ children }) {
  return <>{children}</>;
}
