import { pageMetadata } from "../../lib/seo";

export const metadata = pageMetadata({
  title: "Quiénes Somos: Ingeniería Geoespacial en Colombia",
  description:
    "Conoce al equipo y la trayectoria de DevGiz: ingeniería geoespacial, Catastro Multipropósito LADM-COL, automatización GIS y arquitectura de datos territoriales desde Medellín para toda Colombia.",
  path: "/about",
});

export default function AboutLayout({ children }) {
  return children;
}
