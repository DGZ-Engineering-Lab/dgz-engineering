import { pageMetadata } from "../../lib/seo";

export const metadata = pageMetadata({
  title: "Política de Privacidad y Tratamiento de Datos",
  description:
    "Cómo DevGiz recolecta, usa y protege los datos personales y territoriales conforme a la Ley 1581 de 2012 de protección de datos en Colombia.",
  path: "/privacy",
});

export default function PrivacyLayout({ children }) {
  return children;
}
