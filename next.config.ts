import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  experimental: {
    // reactCompiler: true, // Disabled as it's not supported in current type definition
  },
  // Optimization: Allow image optimization for common storage providers if needed later
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'img.clerk.com', // Allow Clerk user images
      },
    ],
    // Optimization: Cache images for longer
    minimumCacheTTL: 60,
  },
  // Scalability: Ensure headers allow for proper caching strategies where applicable
  async headers() {
    return [
      {
        source: '/:all*(svg|jpg|png)',
        locale: false,
        headers: [
          {
            key: 'Cache-Control',
            value: 'public, max-age=31536000, immutable',
          },
        ],
      },
    ];
  },
};

export default nextConfig;
