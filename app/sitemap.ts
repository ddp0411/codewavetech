import type { MetadataRoute } from "next";
import { detailServices } from "@/content/services";
import { absoluteUrl } from "@/lib/seo";

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();
  const pages: [string, number][] = [
    ["/", 1],
    ["/services", 0.9],
    ["/industries", 0.8],
    ["/government-solutions", 0.8],
    ["/how-we-work", 0.7],
    ["/about", 0.6],
    ["/contact", 0.9],
    ["/privacy", 0.2],
    ["/terms", 0.2],
  ];
  return [
    ...pages.map(([path, priority]) => ({
      url: absoluteUrl(path),
      lastModified: now,
      changeFrequency: "monthly" as const,
      priority,
    })),
    ...detailServices.map((s) => ({
      url: absoluteUrl(`/services/${s.slug}`),
      lastModified: now,
      changeFrequency: "monthly" as const,
      priority: 0.8,
    })),
  ];
}
