"use client";
import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu, Globe } from "lucide-react";
import { cn } from "@/lib/utils";
import { NAV_LINKS } from "@/lib/constants";
import MobileNav from "./MobileNav";

interface HeaderProps { locale: string; }

export default function Header({ locale }: HeaderProps) {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 60);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const otherLocale = locale === "fr" ? "en" : "fr";
  const newPath = pathname.replace(`/${locale}`, `/${otherLocale}`);

  return (
    <>
      <header
        className={cn(
          "fixed top-0 left-0 right-0 z-50 transition-all duration-300",
          scrolled
            ? "bg-white/95 backdrop-blur-md shadow-md py-2"
            : "bg-transparent py-4"
        )}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between">
          {/* Logo */}
          <Link href={`/${locale}`} className="flex-shrink-0 group" id="site-logo">
            <div className="flex flex-col leading-none transition-all duration-300">
              <span className="font-[Oswald] font-bold text-[#E40520] tracking-[0.25em] text-xs uppercase">Winamax</span>
              <span className={cn(
                "font-[Oswald] font-bold uppercase tracking-wider transition-colors",
                scrolled ? "text-[#660066]" : "text-white",
                "text-base md:text-lg leading-tight"
              )}>French Darts Festival</span>
              <span className={cn(
                "font-[JetBrains_Mono,monospace] text-[9px] tracking-[0.3em] transition-colors",
                scrolled ? "text-gray-400" : "text-white/50"
              )}>2026 · CAEN</span>
            </div>
          </Link>

          {/* Desktop nav */}
          <nav className="hidden lg:flex items-center gap-6">
            {NAV_LINKS.slice(0, 6).map((link) => (
              <Link
                key={link.href}
                href={`/${locale}${link.href === "/" ? "" : link.href}`}
                className={cn(
                  "font-[Oswald] uppercase text-sm tracking-widest transition-all duration-200",
                  "relative after:absolute after:bottom-0 after:left-0 after:h-0.5 after:bg-[#660066]",
                  "after:w-0 hover:after:w-full after:transition-all after:duration-300",
                  scrolled ? "text-gray-700 hover:text-[#660066]" : "text-white/90 hover:text-white"
                )}
              >
                {link.label[locale as "fr" | "en"]}
              </Link>
            ))}
          </nav>

          {/* Right: lang + CTA */}
          <div className="hidden lg:flex items-center gap-3">
            <Link
              href={newPath}
              className={cn(
                "flex items-center gap-1 text-xs font-[Oswald] uppercase tracking-widest transition-colors",
                scrolled ? "text-gray-500 hover:text-[#660066]" : "text-white/70 hover:text-white"
              )}
            >
              <Globe size={14} />
              {otherLocale.toUpperCase()}
            </Link>
            <Link
              href={`/${locale}/tournois`}
              className="btn-primary text-xs px-5 py-2"
            >
              {locale === "fr" ? "S'inscrire" : "Register"}
            </Link>
          </div>

          {/* Mobile menu button */}
          <button
            className={cn("lg:hidden p-2", scrolled ? "text-gray-900" : "text-white")}
            onClick={() => setMenuOpen(true)}
            aria-label="Menu"
          >
            <Menu size={24} />
          </button>
        </div>
      </header>

      <MobileNav open={menuOpen} onClose={() => setMenuOpen(false)} locale={locale} />
    </>
  );
}
