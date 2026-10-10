import { pageMetadata } from "../../lib/seo";

export const metadata = pageMetadata({
  title: "Panel de Administración",
  description:
    "Acceso restringido al panel interno de DevGiz.",
  path: "/admin",
  noIndex: true,
});

export default function AdminLayout({ children }) {
  return children;
}
