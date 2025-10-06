import { loadEnvConfig } from "@next/env";
import type { NextConfig } from "next";

const isDev = process.env.NODE_ENV === "development";

// Явно загружаем только нужные переменные (опционально)
loadEnvConfig(process.cwd(), isDev);

// Анализатор подключаем только по требованию (ANALYZE=true)
const withBundleAnalyzer = require("@next/bundle-analyzer")({ enabled: true });

const nextConfig: NextConfig = {
  async redirects() {
    return [
      {
        source: "/icons/favicon-dark.ico",
        destination: "/icons/favicon-light.ico",
        permanent: false
      }
    ];
  },
  async rewrites() {
    return [
      {
        source: "/opengraph-image.png",
        destination: "/opengraph-image"
      }
    ];
  },
  reactStrictMode: true,
  productionBrowserSourceMaps: true,
  generateBuildId: () => String(Date.now()),
  images: {
    formats: ["image/avif", "image/webp"],
    remotePatterns: [
      {
        protocol: "https",
        hostname: "pubimg.nodacdn.net",
        port: "",
        pathname: "/**" // разрешить все пути
      }
    ]
  }
};

module.exports =
  process.env.ANALYZE === "true"
    ? withBundleAnalyzer(nextConfig) // включаем только для анализа бандла
    : nextConfig;
