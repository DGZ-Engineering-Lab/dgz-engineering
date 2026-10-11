import { ImageResponse } from "next/og";
import { SERVICES_DATA } from "../../../data/servicesData";
import { SocialCard, SOCIAL_SIZE } from "../../../components/seo/SocialCard";
import { displayName } from "./serviceName";

export const alt = "Servicio de DevGiz";
export const size = SOCIAL_SIZE;
export const contentType = "image/png";

export function generateStaticParams() {
  return Object.keys(SERVICES_DATA).map((slug) => ({ slug }));
}

export default async function ServiceOpengraphImage({ params }) {
  const { slug } = await params;
  const service = SERVICES_DATA[slug];
  return new ImageResponse(
    <SocialCard
      eyebrow={service ? "Servicio" : undefined}
      title={service ? displayName(service.title) : "DevGiz"}
      subtitle={service ? service.tagline : "Ingeniería Geoespacial"}
    />,
    size
  );
}
