import type { NextConfig } from "next";

// STATIC_EXPORT=1 → fully static site (GitHub Pages / any static host).
// NEXT_PUBLIC_BASE_PATH=/<repo> → mounts the site under a sub-path (project pages).
const isStaticExport = process.env.STATIC_EXPORT === "1";
const basePath = process.env.NEXT_PUBLIC_BASE_PATH ?? "";

const nextConfig: NextConfig = {
  output: isStaticExport ? "export" : undefined,
  basePath: basePath || undefined,
  cacheComponents: !isStaticExport,
  // PPR cannot be enabled in export mode (GitHub Pages build)
  partialPrefetching: !isStaticExport,
  turbopack: {
    rules: {
      "*.css": {
        loaders: ["@tailwindcss/turbopack"],
        as: "*.css",
      },
    },
  },
};

export default nextConfig;
