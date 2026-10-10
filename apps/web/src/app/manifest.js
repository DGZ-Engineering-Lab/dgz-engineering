import { SITE_NAME, SITE_DESCRIPTION, SITE_LANG } from "../lib/seo";

export default function manifest() {
  return {
    name: `${SITE_NAME} | Ingeniería Geoespacial`,
    short_name: SITE_NAME,
    description: SITE_DESCRIPTION,
    lang: SITE_LANG,
    start_url: "/",
    display: "standalone",
    background_color: "#f8fafc",
    theme_color: "#f8fafc",
    icons: [{ src: "/icon.svg", sizes: "any", type: "image/svg+xml" }],
  };
}
