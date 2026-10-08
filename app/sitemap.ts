import type { MetadataRoute } from "next";
import { caseStudyList } from "@/data/case-studies";
import { absoluteUrl } from "@/lib/site";

// `output: export` requires metadata routes to declare how they are static.
// `dynamic = "force-static"` is banned while nextConfig.cacheComponents is on,
// but an exported generateStaticParams satisfies the same static-route check
// without being a route segment config.
export function generateStaticParams() {
  return [];
}

export default function sitemap(): MetadataRoute.Sitemap {
  const home = {
    url: absoluteUrl("/"),
    lastModified: new Date(),
    changeFrequency: "weekly" as const,
    priority: 1,
  };

  const projects = caseStudyList.map((study) => ({
    url: absoluteUrl(`/projects/${study.slug}`),
    lastModified: new Date(),
    changeFrequency: "monthly" as const,
    priority: 0.8,
  }));

  return [home, ...projects];
}
