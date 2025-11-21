import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    formats: ["image/avif", "image/webp"],
    deviceSizes: [360, 640, 768, 1024, 1280, 1536, 1920],
    imageSizes: [16, 32, 48, 64, 96, 128, 256, 384],
    remotePatterns: [
      { protocol: 'https', hostname: 'cdn.sanity.io' },
      // Add other remote patterns later if you switch to remote screenshot URLs
      // { protocol: 'https', hostname: 'image.thum.io' },
      // { protocol: 'https', hostname: 'api.screenshotapi.net' }
    ]
  },
  async redirects() {
    return [
      {
        source: '/insights/category/:slug',
        destination: '/insights',
        permanent: true,
      },
    ];
  },
  webpack: (config) => {
    // Ensure '@' alias always points to the repo's src directory
    config.resolve = config.resolve || {};
    config.resolve.alias = config.resolve.alias || {};
    config.resolve.alias['@'] = config.resolve.alias['@'] || path.join(__dirname, 'src');
    return config;
  },
  async headers() {
    return [
      {
        source: '/studio/:path*',
        headers: [
          { key: 'X-Robots-Tag', value: 'noindex, nofollow' },
        ],
      },
    ];
  },
};

export default nextConfig;


