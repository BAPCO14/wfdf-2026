import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL ?? "https://frenchdartsfestival.fr"),
  title: { default: "Winamax French Darts Festival 2026", template: "%s | WFDF 2026" },
  description: "Le festival international de fléchettes à Caen — 4, 5 & 6 décembre 2026. 8 tournois, 3 pros mondiaux, soirée de gala.",
  keywords: ["fléchettes", "darts", "festival", "Caen", "Winamax", "tournoi", "2026"],
  authors: [{ name: "French Darts SAS" }],
  robots: { index: true, follow: true },
  openGraph: {
    type: "website",
    locale: "fr_FR",
    alternateLocale: "en_GB",
    siteName: "Winamax French Darts Festival",
    images: [{ url: "/og-image.jpg", width: 1200, height: 630, alt: "WFDF 2026" }],
  },
  twitter: { card: "summary_large_image", creator: "@FrenchDartsFest" },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html suppressHydrationWarning>
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Oswald:wght@400;500;600;700&family=Manrope:wght@300;400;500;600;700&family=JetBrains+Mono:wght@400;700&display=swap"
          rel="stylesheet"
        />
      </head>
      <body>{children}</body>
    </html>
  );
}
