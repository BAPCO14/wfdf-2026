"use client";
import { useState } from "react";
import RevealSection from "./RevealSection";

interface VideoSectionProps {
  locale: string;
  videoId?: string; // YouTube video ID — e.g. "dQw4w9WgXcQ"
}

// ← CHANGE THIS to the real YouTube video ID when available
const YOUTUBE_VIDEO_ID = "";

export default function VideoSection({ locale, videoId = YOUTUBE_VIDEO_ID }: VideoSectionProps) {
  const [playing, setPlaying] = useState(false);
  const l = locale as "fr" | "en";

  return (
    <section className="py-24 bg-gray-950 relative overflow-hidden">
      {/* Background glow */}
      <div className="absolute inset-0 opacity-20 pointer-events-none" style={{ background: "radial-gradient(ellipse at 50% 50%, #660066 0%, transparent 70%)" }} aria-hidden />

      <div className="relative max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        <RevealSection className="text-center mb-10">
          <span className="inline-block font-[Oswald] uppercase tracking-[0.4em] text-[#cc00cc] text-xs border border-[#660066]/50 px-4 py-1 mb-4">
            {l === "fr" ? "Revivez l'édition précédente" : "Relive the previous edition"}
          </span>
          <h2 className="font-[Oswald] text-4xl md:text-5xl uppercase text-white tracking-wide">
            {l === "fr" ? "Le film du " : "The "}<span className="text-[#cc00cc]">Festival</span>
          </h2>
          <p className="text-white/50 mt-3 font-semibold">
            {l === "fr" ? "25 minutes d'ambiance, de compétition et d'émotions" : "25 minutes of atmosphere, competition and emotions"}
          </p>
        </RevealSection>

        <RevealSection>
          {videoId ? (
            <div className="relative w-full" style={{ paddingBottom: "56.25%" }}>
              {!playing ? (
                <button
                  onClick={() => setPlaying(true)}
                  className="absolute inset-0 w-full h-full group"
                  aria-label={l === "fr" ? "Lancer la vidéo" : "Play video"}
                >
                  {/* Thumbnail */}
                  <div
                    className="absolute inset-0 bg-cover bg-center"
                    style={{ backgroundImage: `url(https://img.youtube.com/vi/${videoId}/maxresdefault.jpg)` }}
                  />
                  <div className="absolute inset-0 bg-black/40 group-hover:bg-black/30 transition-colors" />
                  {/* Play button */}
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="w-20 h-20 bg-[#E40520] rounded-full flex items-center justify-center group-hover:scale-110 transition-transform shadow-2xl">
                      <svg className="w-8 h-8 text-white ml-1" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M8 5v14l11-7z"/>
                      </svg>
                    </div>
                  </div>
                  {/* Duration badge */}
                  <div className="absolute bottom-4 right-4 bg-black/80 text-white font-[JetBrains_Mono,monospace] text-sm px-3 py-1">
                    25:00
                  </div>
                </button>
              ) : (
                <iframe
                  className="absolute inset-0 w-full h-full"
                  src={`https://www.youtube.com/embed/${videoId}?autoplay=1&rel=0`}
                  title={l === "fr" ? "Winamax French Darts Festival — Film officiel" : "Winamax French Darts Festival — Official film"}
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                />
              )}
            </div>
          ) : (
            /* Placeholder when no video ID yet */
            <div className="relative w-full bg-gray-900 border border-[#660066]/30 flex flex-col items-center justify-center py-20 gap-6">
              <div className="w-20 h-20 bg-[#660066]/30 rounded-full flex items-center justify-center border border-[#660066]">
                <svg className="w-8 h-8 text-[#cc00cc] ml-1" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M8 5v14l11-7z"/>
                </svg>
              </div>
              <div className="text-center">
                <div className="font-[Oswald] text-white text-xl uppercase tracking-widest mb-2">
                  {l === "fr" ? "Vidéo disponible prochainement" : "Video coming soon"}
                </div>
                <div className="text-white/40 text-sm font-medium">
                  {l === "fr" ? "Film officiel — 25 minutes" : "Official film — 25 minutes"}
                </div>
              </div>
              <div className="font-[JetBrains_Mono,monospace] text-[#660066] text-xs tracking-widest border border-[#660066]/40 px-4 py-2">
                WINAMAX FRENCH DARTS FESTIVAL
              </div>
            </div>
          )}
        </RevealSection>
      </div>
    </section>
  );
}
