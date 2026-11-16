import type { MetadataRoute } from "next";
import { business } from "@/lib/business";

export default function sitemap(): MetadataRoute.Sitemap {
  return ["", "/services", "/about", "/book", "/contact"].map((path) => ({
    url: `${business.siteUrl}${path}`,
    lastModified: new Date(),
  }));
}
