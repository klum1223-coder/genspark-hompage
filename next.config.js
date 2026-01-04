/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'cdn.sanity.io',
      },
      {
        protocol: 'https',
        hostname: 'images.unsplash.com',
      },
      {
        protocol: 'https',
        hostname: 'img.youtube.com',
      },
    ],
    formats: ['image/webp', 'image/avif'],
    deviceSizes: [640, 750, 828, 1080, 1200, 1920, 2048, 3840],
    imageSizes: [16, 32, 48, 64, 96, 128, 256, 384],
  },
  // 성능 최적화
  compress: true,
  poweredByHeader: false,
  // 프로덕션 빌드 최적화
  swcMinify: true,
  reactStrictMode: true,
  // 실험적 기능
  experimental: {
    optimizeCss: true,
  },
}

module.exports = nextConfig
