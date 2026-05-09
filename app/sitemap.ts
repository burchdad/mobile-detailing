import type { MetadataRoute } from "next";
import { cityLandingData } from "@/lib/landingData";
import { siteUrl, staticMarketingRoutes } from "@/lib/site";

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();

  const staticRoutes: MetadataRoute.Sitemap = staticMarketingRoutes.map((route) => ({
    url: `${siteUrl}${route}`,
    lastModified: now,
    changeFrequency: route === "/" ? "weekly" : "monthly",
    priority: route === "/" ? 1 : 0.8,
  }));

  const cityRoutes: MetadataRoute.Sitemap = cityLandingData.map((city) => ({
    url: `${siteUrl}/mobile-detailing/${city.slug}`,
    lastModified: now,
    changeFrequency: "monthly",
    priority: 0.75,
  }));

  return [...staticRoutes, ...cityRoutes];
}
