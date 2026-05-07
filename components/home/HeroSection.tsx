"use client";
import Link from "next/link";
import { motion } from "framer-motion";
import Countdown from "./Countdown";

interface HeroSectionProps { locale: string; }

export default function HeroSection({ locale }: HeroSectionProps) {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden bg-gray-900">
      {/* Parallax background */}
      <div
        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
        style={{
          backgroundImage: "url('/assets/ambiance/hero-bg.webp')",
          transform: "scale(1.1)",
        }}
      />
      {/* Gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-b from-black/30 via-black/50 to-[#660066]/80" />

      {/* Animated dart pattern */}
      <div className="absolute inset-0 opacity-5" aria-hidden>
        {["🎯"].map((_, i) => (
          <div
            key={i}
            className="absolute text-6xl"
            style={{
              top: `${20 + i * 30}%`,
              left: `${10 + i * 40}%`,
              animation: `pulse-slow ${3 + i}s ease-in-out infinite`,
              animationDelay: `${i * 0.5}s`,
            }}
          >
            🎯
          </div>
        ))}
      </div>

      {/* Content */}
      <div className="relative z-10 text-center px-4 max-w-5xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <span className="inline-block font-[Oswald] uppercase tracking-[0.4em] text-[#cc00cc] text-sm mb-4 border border-[#660066]/50 px-4 py-1">
            {locale === "fr" ? "2ème édition" : "2nd edition"}
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

        {/* Countdown */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6, delay: 0.5 }}
          className="flex justify-center mb-12"
        >
          <Countdown locale={locale} />
        </motion.div>

        {/* CTAs */}
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

      {/* Scroll indicator */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 text-white/40">
        <span className="text-xs uppercase tracking-widest">Scroll</span>
        <div className="w-px h-12 bg-white/20 animate-[pulse-slow_2s_ease-in-out_infinite]" />
      </div>
    </section>
  );
}
