import { pageMetadata } from "../../lib/seo";

export const metadata = pageMetadata({
  title: "Diagnóstico Territorial y Calculadora de ROI Catastral",
  description:
    "Evalúa el estado de tu información territorial y estima el retorno de inversión de modernizar tu catastro, tus procesos GIS y tu infraestructura de datos espaciales.",
  path: "/diagnostic",
});

export default function DiagnosticLayout({ children }) {
  return children;
}
