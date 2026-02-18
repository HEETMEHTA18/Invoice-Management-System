import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  experimental: {
    serverActions: {
      allowedOrigins: ["172.16.104.66:3000", "localhost:3000"],
    },
  },
};

export default nextConfig;
