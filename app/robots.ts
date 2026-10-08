import type { MetadataRoute } from "next";
import { absoluteUrl } from "@/lib/site";

// `output: export` requires metadata routes to declare how they are static.
// `dynamic = "force-static"` is banned while nextConfig.cacheComponents is on,
// but an exported generateStaticParams satisfies the same static-route check
// without being a route segment config.
export function generateStaticParams() {
  return [];
}

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: "*",
      allow: "/",
    },
    sitemap: absoluteUrl("/sitemap.xml"),
  };
}
