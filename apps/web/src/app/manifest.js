import { SITE_NAME, SITE_DESCRIPTION, SITE_LANG } from "../lib/seo";

export default function manifest() {
  return {
    name: `${SITE_NAME} | Ingeniería Geoespacial`,
    short_name: SITE_NAME,
    description: SITE_DESCRIPTION,
    lang: SITE_LANG,
    start_url: "/",
    display: "standalone",
    background_color: "#0b0a08",
    theme_color: "#0b0a08",
    icons: [{ src: "/icon.svg", sizes: "any", type: "image/svg+xml" }],
  };
}
