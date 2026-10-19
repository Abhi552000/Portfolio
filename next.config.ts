import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  reactStrictMode: true,
  compress: true,
  poweredByHeader: false,

  experimental: {
    optimizePackageImports: ["lucide-react", "framer-motion"],
  },

  // Cache static assets aggressively (fonts, images, js chunks)
  headers: async () => [
    {
      source: "/:all*(svg|jpg|png|webp|avif|woff2|woff)",
      headers: [
        { key: "Cache-Control", value: "public, max-age=31536000, immutable" },
      ],
    },
    {
      // JS and CSS chunks from Next.js build: cache for 1 year (content-hashed)
      source: "/_next/static/:path*",
      headers: [
        { key: "Cache-Control", value: "public, max-age=31536000, immutable" },
        { key: "X-Content-Type-Options", value: "nosniff" },
      ],
    },
  ],
};

export default nextConfig;
