import { MetadataRoute } from "next";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: "*",
        allow: ["/auth", "/info/"],
        disallow: [
          "/admin",
          "/office",
          "/forgot-password",
          "/reset-password",
          "/confirmation"
        ]
      }
    ],
    sitemap: "https://rotazap.ru/sitemap.xml",
    host: "https://rotazap.ru"
  };
}
