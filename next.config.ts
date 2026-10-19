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
        // X-Content-Type-Options prevents MIME sniff issues on older Safari
        { key: "X-Content-Type-Options", value: "nosniff" },
      ],
    },
    {
      // HTML documents: no cache (always fresh)
      source: "/:path*",
      headers: [
        // Allows SharedArrayBuffer on Safari 15.2+ (needed by some Wasm libs)
        { key: "Cross-Origin-Opener-Policy", value: "same-origin" },
        { key: "Cross-Origin-Embedder-Policy", value: "require-corp" },
      ],
    },
  ],
};

export default nextConfig;
