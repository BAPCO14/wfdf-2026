"use client";
import { useEffect } from "react";
import Link from "next/link";
import { X } from "lucide-react";
import { cn } from "@/lib/utils";
import { NAV_LINKS } from "@/lib/constants";

interface MobileNavProps {
  open: boolean;
  onClose: () => void;
  locale: string;
}

export default function MobileNav({ open, onClose, locale }: MobileNavProps) {
  useEffect(() => {
    if (open) document.body.style.overflow = "hidden";
    else document.body.style.overflow = "";
    return () => { document.body.style.overflow = ""; };
  }, [open]);

  return (
    <>
      {/* Backdrop */}
      <div
        className={cn("fixed inset-0 bg-black/60 z-[60] transition-opacity duration-300 lg:hidden",
          open ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none")}
        onClick={onClose}
        aria-hidden
      />
      {/* Panel */}
      <aside
        className={cn(
          "fixed top-0 right-0 h-full w-72 bg-white z-[70] transition-transform duration-300 ease-out lg:hidden",
          "flex flex-col",
          open ? "translate-x-0" : "translate-x-full"
        )}
      >
        <div className="flex items-center justify-between px-6 py-4 border-b">
          <span className="font-[Oswald] text-[#660066] text-xl uppercase tracking-widest">Menu</span>
          <button onClick={onClose} aria-label="Fermer"><X size={24} /></button>
        </div>
        <nav className="flex flex-col flex-1 px-6 py-6 gap-2 overflow-y-auto">
          {NAV_LINKS.map((link) => (
            <Link
              key={link.href}
              href={`/${locale}${link.href === "/" ? "" : link.href}`}
              onClick={onClose}
              className="font-[Oswald] uppercase text-lg tracking-widest text-gray-800 hover:text-[#660066] py-2 border-b border-gray-100 transition-colors"
            >
              {link.label[locale as "fr" | "en"]}
            </Link>
          ))}
        </nav>
        <div className="px-6 py-4 border-t">
          <Link
            href={`/${locale}/tournois`}
            onClick={onClose}
            className="btn-primary w-full text-center text-sm py-3"
          >
            {locale === "fr" ? "S'inscrire" : "Register"}
          </Link>
        </div>
      </aside>
    </>
  );
}
