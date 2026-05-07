"use client";
import Link from "next/link";
import { motion } from "framer-motion";
import Countdown from "./Countdown";

interface HeroSectionProps { locale: string; }

export default function HeroSection({ locale }: HeroSectionProps) {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden bg-gray-900">
      {/* Gradient background — no image dependency */}
      <div className="absolute inset-0" style={{
        background: "radial-gradient(ellipse at 60% 40%, #2d003a 0%, #0d0d1a 50%, #1a0005 100%)"
      }} />
      {/* Animated violet glow */}
      <div className="absolute inset-0" style={{
        background: "radial-gradient(ellipse at 30% 70%, rgba(102,0,102,0.35) 0%, transparent 60%)"
      }} />
      {/* Winamax red glow */}
      <div className="absolute inset-0" style={{
        background: "radial-gradient(ellipse at 80% 20%, rgba(228,5,32,0.2) 0%, transparent 50%)"
      }} />

      {/* Dart board decorative SVG */}
      <div className="absolute right-8 top-1/2 -translate-y-1/2 opacity-5 hidden lg:block" aria-hidden>
        <svg width="400" height="400" viewBox="0 0 400 400">
          {[180, 140, 100, 60, 30].map((r, i) => (
            <circle key={r} cx="200" cy="200" r={r} fill="none" stroke="white" strokeWidth={i === 0 ? 2 : 1} />
          ))}
          {Array.from({ length: 20 }, (_, i) => {
            const angle = (i * 18 * Math.PI) / 180;
            return <line key={i} x1="200" y1="200" x2={200 + 180 * Math.cos(angle)} y2={200 + 180 * Math.sin(angle)} stroke="white" strokeWidth="0.5" />;
          })}
        </svg>
      </div>

      {/* Content */}
      <div className="relative z-10 text-center px-4 max-w-5xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          {/* Winamax logo badge */}
          <div className="flex items-center justify-center gap-3 mb-6">
            <div className="flex items-center gap-2 bg-white/10 backdrop-blur-sm border border-white/20 px-5 py-2 rounded-none">
              <WinamaxLogo className="h-5" />
              <span className="text-white/50 text-xs">×</span>
              <span className="font-[Oswald] text-white/80 uppercase tracking-widest text-xs">French Darts Festival</span>
            </div>
          </div>
          <span className="inline-block font-[Oswald] uppercase tracking-[0.4em] text-[#cc00cc] text-sm mb-4 border border-[#660066]/50 px-4 py-1">
            {locale === "fr" ? "2ème édition · Caen" : "2nd edition · Caen"}
          </span>
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.15 }}
          className="font-[Oswald] text-5xl md:text-7xl lg:text-8xl uppercase text-white leading-tight tracking-wider mb-2"
        >
          <span className="text-[#E40520]">Winamax</span>
          <br />
          French Darts
          <br />
          Festival
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="font-[Oswald] text-xl md:text-2xl uppercase tracking-[0.2em] text-white/80 mt-4 mb-2"
        >
          {locale === "fr" ? "4, 5 & 6 décembre 2026" : "4, 5 & 6 December 2026"}
        </motion.p>
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="text-white/60 text-sm uppercase tracking-widest mb-10"
        >
          Caen — Parc des Expositions, Hall 3
        </motion.p>

        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6, delay: 0.5 }}
          className="flex justify-center mb-12"
        >
          <Countdown locale={locale} />
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.65 }}
          className="flex flex-col sm:flex-row gap-4 justify-center"
        >
          <Link href={`/${locale}/tournois`} className="btn-primary px-10 py-4 text-sm">
            {locale === "fr" ? "S'inscrire à un tournoi" : "Register for a tournament"}
          </Link>
          <Link href={`/${locale}/le-village`} className="btn-outline px-10 py-4 text-sm border-white text-white hover:bg-white hover:text-gray-900">
            {locale === "fr" ? "Découvrir le festival" : "Discover the festival"}
          </Link>
        </motion.div>
      </div>

      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 text-white/40">
        <span className="text-xs uppercase tracking-widest">Scroll</span>
        <div className="w-px h-12 bg-white/20 animate-[pulse-slow_2s_ease-in-out_infinite]" />
      </div>
    </section>
  );
}

function WinamaxLogo({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 120 28" fill="none" xmlns="http://www.w3.org/2000/svg">
      <rect width="120" height="28" rx="2" fill="#E40520" />
      <text x="60" y="20" textAnchor="middle" fontFamily="Arial, sans-serif" fontWeight="800" fontSize="14" fill="white" letterSpacing="1">WINAMAX</text>
    </svg>
  );
}
