import { withSentryConfig } from "@sentry/nextjs";

// Directives that are safe to enforce today: they block clickjacking, plugin
// content, <base> hijacking and off-site form posts without touching assets.
const enforcedCsp = [
  "frame-ancestors 'none'",
  "base-uri 'self'",
  "object-src 'none'",
  "form-action 'self'",
  "upgrade-insecure-requests",
].join("; ");

// Full policy in report-only mode so violations show up in the browser console
// before it is enforced. Tighten and promote to Content-Security-Policy once clean.
const reportOnlyCsp = [
  "default-src 'self'",
  "script-src 'self' 'unsafe-inline' 'unsafe-eval' https://cdnjs.cloudflare.com https://*.posthog.com https://va.vercel-scripts.com",
  "style-src 'self' 'unsafe-inline' https://fonts.googleapis.com https://api.mapbox.com https://cdnjs.cloudflare.com",
  "img-src 'self' data: blob: https:",
  "font-src 'self' data: https://fonts.gstatic.com",
  "connect-src 'self' https: wss:",
  "worker-src 'self' blob:",
  "child-src 'self' blob:",
  "media-src 'self' blob: data:",
  "frame-src 'self' https:",
  "frame-ancestors 'none'",
  "base-uri 'self'",
  "object-src 'none'",
  "form-action 'self'",
].join("; ");

const securityHeaders = [
  { key: "Strict-Transport-Security", value: "max-age=63072000; includeSubDomains" },
  { key: "X-Content-Type-Options", value: "nosniff" },
  { key: "X-Frame-Options", value: "DENY" },
  { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
  // Camera/microphone stay available to this origin for the gesture sandbox lab.
  { key: "Permissions-Policy", value: "camera=(self), microphone=(self), geolocation=(self), payment=(), usb=()" },
  { key: "Cross-Origin-Opener-Policy", value: "same-origin" },
  { key: "X-DNS-Prefetch-Control", value: "on" },
  { key: "Content-Security-Policy", value: enforcedCsp },
  { key: "Content-Security-Policy-Report-Only", value: reportOnlyCsp },
];

const nextConfig = {
  poweredByHeader: false,
  async headers() {
    return [{ source: "/:path*", headers: securityHeaders }];
  },
  experimental: {
    optimizePackageImports: ["lucide-react", "framer-motion"],
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
        destination: '/projects/gis-dashboard',
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
        destination: '/projects/gis-dashboard',
        permanent: true,
      },
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
