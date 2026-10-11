import JsonLd from "../../../components/JsonLd";
import { PROJECTS_SEO, pageMetadata, projectJsonLd, breadcrumbJsonLd } from "../../../lib/seo";

export function generateStaticParams() {
  return Object.keys(PROJECTS_SEO).map((id) => ({ id }));
}

export async function generateMetadata({ params }) {
  const { id } = await params;
  const project = PROJECTS_SEO[id];
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
  const project = PROJECTS_SEO[id];

  return (
    <>
      {project && (
        <>
          <JsonLd data={projectJsonLd({ id, ...project })} />
          <JsonLd
            data={breadcrumbJsonLd([
              { name: "Inicio", path: "/" },
              { name: "Proyectos", path: "/projects" },
              { name: project.title, path: `/projects/${id}` },
            ])}
          />
        </>
      )}
      {children}
    </>
  );
}
