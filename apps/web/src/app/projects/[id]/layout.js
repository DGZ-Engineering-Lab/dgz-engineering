import { notFound } from "next/navigation";
import JsonLd from "../../../components/JsonLd";
import { PROJECTS_SEO, pageMetadata, projectJsonLd, breadcrumbJsonLd } from "../../../lib/seo";

// Solo existen las rutas generadas: cualquier otro valor responde 404 real
// (antes devolvía 200 con un aviso en pantalla, un "soft 404" para Google).
export const dynamicParams = false;

export function generateStaticParams() {
  return Object.keys(PROJECTS_SEO).map((id) => ({ id }));
}

export async function generateMetadata({ params }) {
  const { id } = await params;
  const project = Object.hasOwn(PROJECTS_SEO, id) ? PROJECTS_SEO[id] : undefined;
  if (!project) return { title: "Proyecto no encontrado", robots: { index: false, follow: true } };

  return pageMetadata({
    title: project.title,
    description: project.description,
    path: `/projects/${id}`,
    image: project.image,
  });
}

export default async function ProjectLayout({ children, params }) {
  const { id } = await params;
  const project = Object.hasOwn(PROJECTS_SEO, id) ? PROJECTS_SEO[id] : undefined;
  if (!project) notFound();

  return (
    <>
      <JsonLd data={projectJsonLd({ id, ...project })} />
      <JsonLd
        data={breadcrumbJsonLd([
          { name: "Inicio", path: "/" },
          { name: "Proyectos", path: "/projects" },
          { name: project.title, path: `/projects/${id}` },
        ])}
      />
      {children}
    </>
  );
}
