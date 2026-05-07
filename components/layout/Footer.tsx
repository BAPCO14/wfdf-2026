import Link from "next/link";
import { Instagram, Facebook, Youtube } from "lucide-react";
import { SITE, EVENT, ORGANIZER } from "@/lib/constants";

interface FooterProps { locale: string; }

export default function Footer({ locale }: FooterProps) {
  const l = locale as "fr" | "en";
  const labels = {
    fr: { legal: "Mentions légales", privacy: "Confidentialité", cookies: "Cookies", contact: "Contact", rights: "Tous droits réservés" },
    en: { legal: "Legal", privacy: "Privacy", cookies: "Cookies", contact: "Contact", rights: "All rights reserved" },
  };
  const t = labels[l];

  return (
    <footer className="bg-gray-900 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-10">
          {/* Brand */}
          <div className="md:col-span-2">
            <div className="font-[Oswald] text-2xl uppercase tracking-widest mb-3">
              <span className="text-[#E40520]">WFDF</span> 2026
            </div>
            <p className="text-gray-400 text-sm leading-relaxed max-w-xs">
              {locale === "fr"
                ? "Le festival international de fléchettes à Caen. 4, 5 & 6 décembre 2026."
                : "The international darts festival in Caen. 4, 5 & 6 December 2026."}
            </p>
            <div className="flex gap-4 mt-4">
              <a href={SITE.social.instagram} target="_blank" rel="noopener noreferrer" aria-label="Instagram" className="text-gray-400 hover:text-[#660066] transition-colors">
                <Instagram size={20} />
              </a>
              <a href={SITE.social.facebook} target="_blank" rel="noopener noreferrer" aria-label="Facebook" className="text-gray-400 hover:text-[#660066] transition-colors">
                <Facebook size={20} />
              </a>
              <a href={SITE.social.youtube} target="_blank" rel="noopener noreferrer" aria-label="YouTube" className="text-gray-400 hover:text-[#660066] transition-colors">
                <Youtube size={20} />
              </a>
            </div>
          </div>

          {/* Liens */}
          <div>
            <h3 className="font-[Oswald] uppercase tracking-widest text-sm mb-4 text-gray-300">
              {locale === "fr" ? "Navigation" : "Navigation"}
            </h3>
            <ul className="space-y-2 text-sm">
              {[
                { href: "/tournois", label: locale === "fr" ? "Tournois" : "Tournaments" },
                { href: "/soiree-gala", label: locale === "fr" ? "Soirée Gala" : "Gala Evening" },
                { href: "/le-village", label: locale === "fr" ? "Le Village" : "The Village" },
                { href: "/programme", label: locale === "fr" ? "Programme" : "Schedule" },
                { href: "/worknplay", label: "Work'N'Play" },
              ].map((link) => (
                <li key={link.href}>
                  <Link href={`/${locale}${link.href}`} className="text-gray-400 hover:text-white transition-colors">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Lieu */}
          <div>
            <h3 className="font-[Oswald] uppercase tracking-widest text-sm mb-4 text-gray-300">
              {locale === "fr" ? "Lieu" : "Venue"}
            </h3>
            <address className="not-italic text-gray-400 text-sm leading-relaxed">
              {EVENT.venue.name}<br />
              {EVENT.venue.hall}<br />
              {EVENT.venue.address}<br />
              {EVENT.venue.zip} {EVENT.venue.city}
            </address>
            <a
              href={EVENT.venue.googleMapsUrl}
              target="_blank" rel="noopener noreferrer"
              className="text-[#660066] hover:text-[#cc00cc] text-sm mt-2 inline-block transition-colors"
            >
              {locale === "fr" ? "Voir sur la carte →" : "View on map →"}
            </a>
          </div>
        </div>

        <div className="border-t border-gray-800 mt-12 pt-6 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-gray-500">
          <p>© 2026 {ORGANIZER.name}. {t.rights}.</p>
          <nav className="flex gap-4">
            <Link href={`/${locale}/mentions-legales`} className="hover:text-white transition-colors">{t.legal}</Link>
            <Link href={`/${locale}/confidentialite`} className="hover:text-white transition-colors">{t.privacy}</Link>
            <Link href={`/${locale}/cookies`} className="hover:text-white transition-colors">{t.cookies}</Link>
            <Link href={`/${locale}/contact`} className="hover:text-white transition-colors">{t.contact}</Link>
          </nav>
        </div>
      </div>
    </footer>
  );
}
