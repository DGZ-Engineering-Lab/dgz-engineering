import JsonLd from "../../../components/JsonLd";
import { SERVICES_DATA } from "../../../data/servicesData";
import { pageMetadata, serviceJsonLd, breadcrumbJsonLd } from "../../../lib/seo";

// "GIS & GEOINTELLIGENCE" -> "GIS & Geointelligence": conserva siglas cortas y normaliza el resto.
const KEEP_UPPER = new Set(["GIS", "BI", "IA", "&"]);
const LOWER = new Set(["DE", "Y"]);
function displayName(title) {
  return title
    .split(" ")
    .map((w) => {
      if (KEEP_UPPER.has(w)) return w;
      if (LOWER.has(w)) return w.toLowerCase();
      if (w === "DEVOPS") return "DevOps";
      return w.charAt(0) + w.slice(1).toLowerCase();
    })
    .join(" ");
}

// Títulos de ~60 caracteres para que no se trunquen en los resultados de búsqueda.
function serviceTitle(service) {
  const name = displayName(service.title);
  const full = `${name}: ${service.tagline}`;
  return full.length <= 60 ? full : `${name} | Servicios Geoespaciales`;
}

export function generateStaticParams() {
  return Object.keys(SERVICES_DATA).map((slug) => ({ slug }));
}

export async function generateMetadata({ params }) {
  const { slug } = await params;
  const service = SERVICES_DATA[slug];
  if (!service) return { title: "Servicio no encontrado", robots: { index: false, follow: true } };

  return pageMetadata({
    title: serviceTitle(service),
    description: service.concept,
    path: `/services/${slug}`,
  });
}

export default async function ServiceLayout({ children, params }) {
  const { slug } = await params;
  const service = SERVICES_DATA[slug];

  return (
    <>
      {service && (
        <>
          <JsonLd
            data={serviceJsonLd({
              slug,
              title: displayName(service.title),
              description: service.concept,
              category: service.tagline,
            })}
          />
          <JsonLd
            data={breadcrumbJsonLd([
              { name: "Inicio", path: "/" },
              { name: displayName(service.title), path: `/services/${slug}` },
            ])}
          />
        </>
      )}
      {children}
    </>
  );
}
