import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  reactCompiler: true,

  // Ensure proper routing for client-side navigation
  trailingSlash: false,

  // Enable static optimization for better performance
  output: "standalone",

  // Configure redirects if needed
  async redirects() {
    return [];
  },

  // Configure rewrites if needed
  async rewrites() {
    return [];
  },

  // Optimize images
  images: {
    domains: ["localhost"],
    formats: ["image/webp", "image/avif"],
  },
};

export default nextConfig;
