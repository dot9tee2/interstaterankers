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
};

export default nextConfig;


