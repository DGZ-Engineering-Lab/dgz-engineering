import { pageMetadata } from "../../lib/seo";

export const metadata = pageMetadata({
  title: "Diagnóstico Territorial y Calculadora de ROI Catastral",
  description:
    "Evalúa el estado de tu información territorial y estima el retorno de inversión de modernizar tu catastro, tus procesos GIS y tu infraestructura de datos espaciales.",
  path: "/diagnostic",
});

// La consola de diagnóstico está diseñada sobre fondo oscuro (igual que /lab):
// este contenedor aporta el lienzo y redefine los tokens de cristal para modo oscuro.
export default function DiagnosticLayout({ children }) {
  return (
    <div className="theme-dark relative w-full flex-grow flex flex-col overflow-x-clip">
      {children}
    </div>
  );
}
