import { ImageResponse } from "next/og";
import { SocialCard, SOCIAL_SIZE } from "../components/seo/SocialCard";

export const alt = "DevGiz · Catastro LADM-COL, WebGIS y Analítica Geoespacial";
export const size = SOCIAL_SIZE;
export const contentType = "image/png";

export default function OpengraphImage() {
  return new ImageResponse(
    <SocialCard
      title="Arquitectura Territorial Inteligente"
      subtitle="Catastro LADM-COL · WebGIS · Analítica · Automatización GIS"
    />,
    size
  );
}
