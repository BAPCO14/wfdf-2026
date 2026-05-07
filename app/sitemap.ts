import { MetadataRoute } from "next";
import tournamentsData from "@/content/tournaments.json";

const BASE = process.env.NEXT_PUBLIC_SITE_URL ?? "https://frenchdartsfestival.fr";

export default function sitemap(): MetadataRoute.Sitemap {
  const locales = ["fr", "en"];
  const staticPages = ["", "/tournois", "/soiree-gala", "/le-village", "/programme", "/infos-pratiques", "/worknplay", "/contact"];

  const pages = locales.flatMap((locale) =>
    staticPages.map((page) => ({
      url: `${BASE}/${locale}${page}`,
      lastModified: new Date(),
      changeFrequency: "weekly" as const,
      priority: page === "" ? 1 : 0.8,
    }))
  );

  const tournaments = locales.flatMap((locale) =>
    tournamentsData.map((t) => ({
      url: `${BASE}/${locale}/tournois/${t.slug}`,
      lastModified: new Date(),
      changeFrequency: "monthly" as const,
      priority: 0.6,
    }))
  );

  return [...pages, ...tournaments];
}
