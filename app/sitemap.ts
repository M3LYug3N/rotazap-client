// app/sitemap.ts
import { MetadataRoute } from "next";

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = "https://rotazap.ru";

  const publicUrls = [
    "/",
    "/auth",
    "/info/about-company",
    "/info/contacts",
    "/info/delivery",
    "/info/provider",
    "/info/warranty-refund",
    "/info/wholesale",
    "/info/workflow"
  ];

  return publicUrls.map(path => ({
    url: `${baseUrl}${path}`,
    lastModified: new Date().toISOString(),
    changeFrequency: "weekly",
    priority: 0.7
  }));
}
