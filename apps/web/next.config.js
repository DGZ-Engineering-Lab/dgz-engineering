import { withSentryConfig } from "@sentry/nextjs";

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
    return [{ source: "/assets/:path*", headers: [publicAssetCache] }];
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
