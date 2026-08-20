import type { NextConfig } from "next"

const nextConfig: NextConfig = {
  // Permitir origens de desenvolvimento incluindo IPs da rede local
  allowedDevOrigins: [
    "10.0.0.137", 
    "10.0.0.2", 
    "localhost", 
    "10.0.0.*", // Wildcard para IPs da rede local
  ],
  images: {
    remotePatterns: [
      {
        protocol: "http",
        hostname: "localhost",
        port: "1337",
        pathname: "/uploads/**",
      },
      {
        protocol: "http",
        hostname: "10.0.0.137",
        port: "1337",
        pathname: "/uploads/**",
      },
    ],
    unoptimized: process.env.NODE_ENV === "development",
  },
}

export default nextConfig