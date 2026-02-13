import type { NextConfig } from "next";
import path from "path";

const nextConfig: NextConfig = {
  turbopack: { root: path.resolve(process.cwd()) },
  images: {
    formats: ['image/avif', 'image/webp'],
    deviceSizes: [640, 750, 828, 1080, 1200, 1920, 2048, 3840],
    imageSizes: [16, 32, 48, 64, 96, 128, 256, 384],
    minimumCacheTTL: 60,
    remotePatterns: [
      { protocol: 'https', hostname: 'plotcenter.com.ar', pathname: '/**' },
      { protocol: 'http', hostname: 'plotcenter.com.ar', pathname: '/**' },
      { protocol: 'https', hostname: 'blog.safaritraslassierras.com.ar', pathname: '/**' },
      { protocol: 'http', hostname: 'blog.safaritraslassierras.com.ar', pathname: '/**' },
    ],
  },
  compress: true,
  poweredByHeader: false,
  reactStrictMode: true,
};

export default nextConfig;
