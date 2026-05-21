import { withSentryConfig } from "@sentry/nextjs";

const nextConfig = {
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
