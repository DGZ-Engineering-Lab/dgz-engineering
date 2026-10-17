import NotFoundView from "../components/NotFoundView";

export const metadata = {
  title: { absolute: "Página no encontrada | DevGiz" },
  robots: { index: false, follow: true },
};

export default function NotFound() {
  return <NotFoundView />;
}
