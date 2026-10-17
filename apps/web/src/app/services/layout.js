import { pageMetadata } from "../../lib/seo";

export const metadata = pageMetadata({
  title: "Servicios GIS, Catastro LADM-COL y WebGIS con Precios",
  description:
    "Catastro multipropósito LADM-COL, WebGIS, analítica territorial, drones y automatización GIS en Colombia. Paquetes con precio fijo y primera sesión sin costo.",
  path: "/services",
});

export default function ServicesLayout({ children }) {
  return <>{children}</>;
}
