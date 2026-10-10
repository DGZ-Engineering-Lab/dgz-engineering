import { pageMetadata } from "../../lib/seo";

export const metadata = pageMetadata({
  title: "Estándares y Normativa: LADM-COL, INTERLIS e ICDE",
  description:
    "Protocolos de gobernanza digital que aplica DevGiz: LADM-COL (ISO 19152), INTERLIS/XTF, metadatos ICDE (ISO 19115), MAGNA-SIRGAS CTM12 y la normativa catastral del IGAC y la SNR.",
  path: "/standards",
});

export default function StandardsLayout({ children }) {
  return children;
}
