import { pageMetadata } from "../../../lib/seo";

export const metadata = pageMetadata({
  title: "Gesture Sandbox: Control de Mapas GIS con Visión Artificial",
  description:
    "Laboratorio experimental de DevGiz: controla cartografía en 3D con gestos de la mano usando MediaPipe y Mapbox GL, con capas del SGC, IGAC y sismos de USGS.",
  path: "/lab/gesture-sandbox",
});

export default function GestureLayout({ children }) {
  return children;
}
