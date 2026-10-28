import { pageMetadata } from "../../lib/seo";

export const metadata = pageMetadata({
  title: "Política de Cookies",
  description:
    "Qué cookies y almacenamiento local usa el sitio de DevGiz, para qué sirven, cuánto duran y cómo aceptar, rechazar o cambiar su decisión.",
  path: "/cookies",
});

export default function CookiesLayout({ children }) {
  return children;
}
