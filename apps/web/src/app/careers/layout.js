import { pageMetadata } from "../../lib/seo";

export const metadata = pageMetadata({
  title: "Trabaja con Nosotros: Empleos en Ingeniería Geoespacial",
  description:
    "Únete a DevGiz: vacantes en ingeniería GIS, desarrollo de software geoespacial, ciencia de datos territoriales y DevOps para proyectos de misión crítica en Colombia.",
  path: "/careers",
});

export default function CareersLayout({ children }) {
  return children;
}
