import { ImageResponse } from "next/og";
import { SocialCard, SOCIAL_SIZE } from "../components/seo/SocialCard";

export const alt = "DevGiz · Ingeniería Geoespacial, Catastro Multipropósito y DevOps";
export const size = SOCIAL_SIZE;
export const contentType = "image/png";

export default function OpengraphImage() {
  return new ImageResponse(
    <SocialCard
      title="Arquitectura Territorial Inteligente"
      subtitle="Catastro LADM-COL · Automatización GIS · GeoAI · DevOps"
    />,
    size
  );
}
