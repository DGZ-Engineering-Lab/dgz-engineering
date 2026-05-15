/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    allowedDevOrigins: ["192.168.1.14"],
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

export default nextConfig;
