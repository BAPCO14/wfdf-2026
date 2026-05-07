import { MetadataRoute } from "next";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      { userAgent: "*", allow: "/", disallow: ["/api/", "/_next/"] },
      { userAgent: ["sqlmap", "nikto", "masscan"], disallow: "/" },
    ],
    sitemap: `${process.env.NEXT_PUBLIC_SITE_URL ?? "https://frenchdartsfestival.fr"}/sitemap.xml`,
  };
}
