import type { MetadataRoute } from "next";
import { siteUrl } from "@/config/business";
import { services } from "@/content/en";

export default function sitemap(): MetadataRoute.Sitemap {
  const staticPages = ["", "/services", "/projects", "/about", "/contact"];

  return [
    ...staticPages.map((path) => ({
      url: `${siteUrl}${path}`,
      lastModified: new Date(),
      changeFrequency: path === "" ? ("monthly" as const) : ("yearly" as const),
      priority: path === "" ? 1 : path === "/contact" ? 0.9 : 0.8,
    })),
    ...services.map((service) => ({
      url: `${siteUrl}/services/${service.slug}`,
      lastModified: new Date(),
      changeFrequency: "yearly" as const,
      priority: 0.8,
      images: [`${siteUrl}${service.image}`],
    })),
  ];
}
