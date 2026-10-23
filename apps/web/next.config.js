import { withSentryConfig } from "@sentry/nextjs/config";

// Directives that are safe to enforce today: they block clickjacking, plugin
// content, <base> hijacking and off-site form posts without touching assets.
const enforcedCsp = [
  "frame-ancestors 'none'",
  "base-uri 'self'",
  "object-src 'none'",
  "form-action 'self'",
  "upgrade-insecure-requests",
].join("; ");

const isDev = process.env.NODE_ENV !== "production";

// Origen de una URL de entorno (ignora valores vacíos o inválidos).
function envOrigin(value) {
  try {
    return value ? new URL(value).origin : null;
  } catch {
    return null;
  }
}

// Allowlist de conexiones (fetch/XHR/WebSocket). Inventario de src/ y public/:
// PostHog, Sentry, Mapbox GL, GeoAPI (Render), Vercel Blob/Analytics y las capas
// que Mapbox GL descarga por fetch en public/assets/js (USGS, SGC WMS, Carto,
// ArcGIS, GitHub raw) más MediaPipe (jsDelivr). Las teselas de Leaflet son <img>.
const connectSources = [
  "'self'",
  "blob:",
  "data:",
  "https://*.posthog.com",
  "https://*.ingest.sentry.io",
  "https://*.ingest.us.sentry.io",
  "https://api.mapbox.com",
  "https://events.mapbox.com",
  "https://*.tiles.mapbox.com",
  "https://devgiz-api.onrender.com",
  "https://dgz-engineering.onrender.com",
  "https://*.public.blob.vercel-storage.com",
  "https://vitals.vercel-insights.com",
  "https://earthquake.usgs.gov",
  "https://srvags.sgc.gov.co",
  "https://mapas.igac.gov.co",
  "https://basemaps.cartocdn.com",
  "https://*.basemaps.cartocdn.com",
  "https://server.arcgisonline.com",
  "https://raw.githubusercontent.com",
  "https://cdn.jsdelivr.net",
  envOrigin(process.env.NEXT_PUBLIC_GEOAPI_URL),
  envOrigin(process.env.NEXT_PUBLIC_POSTHOG_HOST),
];

// Full policy in report-only mode so violations show up in the browser console
// before it is enforced. Tighten and promote to Content-Security-Policy once clean.
// Sin 'unsafe-eval' en producción ('wasm-unsafe-eval' cubre MediaPipe/WebAssembly).
const reportOnlyCsp = [
  "default-src 'self'",
  `script-src 'self' 'unsafe-inline' 'wasm-unsafe-eval'${isDev ? " 'unsafe-eval'" : ""} https://cdnjs.cloudflare.com https://*.posthog.com https://va.vercel-scripts.com https://cdn.jsdelivr.net`,
  "style-src 'self' 'unsafe-inline' https://fonts.googleapis.com https://api.mapbox.com https://cdnjs.cloudflare.com",
  "img-src 'self' data: blob: https:",
  "font-src 'self' data: https://fonts.gstatic.com",
  `connect-src ${[...new Set(connectSources.filter(Boolean))].join(" ")}`,
  "worker-src 'self' blob:",
  "child-src 'self' blob:",
  "media-src 'self' blob: data:",
  "frame-src 'self'",
  "frame-ancestors 'none'",
  "base-uri 'self'",
  "object-src 'none'",
  "form-action 'self'",
].join("; ");

// Ninguna página usa geolocalización ni pagos; cámara y micrófono solo en el lab de gestos.
// Cámara y micrófono solo para el propio origen (nunca terceros/iframes). No se
// restringe por ruta: en una navegación cliente con <Link> el documento conserva
// la política de la página de origen y el lab de gestos perdería la cámara.
const permissionsPolicy = "camera=(self), microphone=(self), geolocation=(), payment=(), usb=()";

const securityHeaders = [
  { key: "Strict-Transport-Security", value: "max-age=63072000; includeSubDomains" },
  { key: "X-Content-Type-Options", value: "nosniff" },
  { key: "X-Frame-Options", value: "DENY" },
  { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
  { key: "Permissions-Policy", value: permissionsPolicy },
  { key: "Cross-Origin-Opener-Policy", value: "same-origin" },
  { key: "X-DNS-Prefetch-Control", value: "on" },
  { key: "Content-Security-Policy", value: enforcedCsp },
  { key: "Content-Security-Policy-Report-Only", value: reportOnlyCsp },
];

const nextConfig = {
  poweredByHeader: false,
  images: {
    // Serve AVIF first (≈20% smaller than WebP), then WebP.
    formats: ["image/avif", "image/webp"],
    // Optimized variants are keyed by URL; keep them cached for 30 days.
    minimumCacheTTL: 60 * 60 * 24 * 30,
  },
  experimental: {
    optimizePackageImports: ["lucide-react", "framer-motion", "animejs"],
  },
  async headers() {
    // Files under /public are not content-hashed, so cache them for a week and
    // revalidate in the background instead of marking them immutable.
    const publicAssetCache = {
      key: "Cache-Control",
      value: "public, max-age=604800, stale-while-revalidate=86400",
    };
    return [
      { source: "/:path*", headers: securityHeaders },
      { source: "/assets/:path*", headers: [publicAssetCache] },
      // Las respuestas de la API no se incrustan desde otros orígenes.
      {
        source: "/api/:path*",
        headers: [{ key: "Cross-Origin-Resource-Policy", value: "same-origin" }],
      },
      // Sin caché para la API salvo las lecturas públicas cacheables (parcels, telemetry).
      {
        source: "/api/:path((?!parcels|telemetry).*)",
        headers: [{ key: "Cache-Control", value: "no-store" }],
      },
    ];
  },
  async redirects() {
    return [
      {
        source: '/lab/gesture_sandbox.html',
        destination: '/lab/gesture-sandbox',
        permanent: true,
      },
      {
        source: '/lab/map.html',
        destination: '/projects',
        permanent: true,
      },
      {
        source: '/projects/qgis-plugin/index.html',
        destination: '/projects/qgis-plugin',
        permanent: true,
      },
      {
        source: '/projects/automation-systems/index.html',
        destination: '/projects/automation-systems',
        permanent: true,
      },
      {
        source: '/projects/gis-dashboard/index.html',
        destination: '/projects',
        permanent: true,
      },
      // Rutas del sitio estático legado que ya no tienen página propia.
      { source: '/projects/gis-dashboard', destination: '/projects', permanent: true },
      { source: '/projects/research', destination: '/blog', permanent: true },
      { source: '/projects/research/index.html', destination: '/blog', permanent: true },
      { source: '/lab/validator.html', destination: '/projects/qgis-plugin', permanent: true },
      { source: '/lab/geoai.html', destination: '/projects/geo-llm', permanent: true },
      { source: '/lab/colombia_biomatrix.html', destination: '/projects', permanent: true },
      { source: '/index.html', destination: '/', permanent: true },
      {
        source: '/projects/geo-llm/index.html',
        destination: '/projects/geo-llm',
        permanent: true,
      }
    ]
  }
};

export default withSentryConfig(nextConfig, {
  // Suppresses source map uploading logs during build
  silent: true,
  org: process.env.SENTRY_ORG,
  project: process.env.SENTRY_PROJECT,

  // Upload source maps for better error debugging
  widenClientFileUpload: true,

  // Automatically tree-shake Sentry logger in production
  disableLogger: true,

  // Hides source maps from generated client bundles
  hideSourceMaps: true,
});
