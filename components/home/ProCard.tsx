"use client";
import { useRef, MouseEvent } from "react";

interface Pro {
  id: string;
  name: string;
  nickname: string;
  nationality: string;
  flag: string;
  ranking: number;
  average: number;
  bio: { fr: string; en: string };
  achievements: string[];
  photo: string;
  tournament: string;
}

const PLAYER_GRADIENTS: Record<string, string> = {
  "luke-littler": "linear-gradient(160deg, #0d0d1a 0%, #1a0535 40%, #660066 100%)",
  "michael-van-gerwen": "linear-gradient(160deg, #0d1a0d 0%, #003300 40%, #005B8E 100%)",
  "gerwyn-price": "linear-gradient(160deg, #0d1020 0%, #1a2040 40%, #003399 100%)",
};

interface ProCardProps { pro: Pro; locale: string; }

export default function ProCard({ pro, locale }: ProCardProps) {
  const cardRef = useRef<HTMLDivElement>(null);

  const onMouseMove = (e: MouseEvent<HTMLDivElement>) => {
    const card = cardRef.current;
    if (!card) return;
    const { left, top, width, height } = card.getBoundingClientRect();
    const x = ((e.clientX - left) / width - 0.5) * 2;
    const y = ((e.clientY - top) / height - 0.5) * 2;
    card.style.transform = `perspective(800px) rotateX(${y * -5}deg) rotateY(${x * 5}deg) scale(1.02)`;
  };
  const onMouseLeave = () => {
    if (cardRef.current) cardRef.current.style.transform = "perspective(800px) rotateX(0) rotateY(0) scale(1)";
  };

  const gradient = PLAYER_GRADIENTS[pro.id] ?? "linear-gradient(160deg, #1a1a2e 0%, #660066 100%)";

  return (
    <div
      ref={cardRef}
      onMouseMove={onMouseMove}
      onMouseLeave={onMouseLeave}
      className="relative bg-white overflow-hidden group cursor-pointer"
      style={{ transition: "transform 0.15s ease", transformStyle: "preserve-3d" }}
    >
      {/* Photo / Gradient area */}
      <div className="relative h-72 overflow-hidden" style={{ background: gradient }}>
        {/* Try real photo, fallback is gradient */}
        {pro.photo && (
          <div
            className="absolute inset-0 bg-cover bg-center bg-no-repeat transition-transform duration-500 group-hover:scale-105"
            style={{ backgroundImage: `url(${pro.photo})` }}
          />
        )}
        <div className="absolute inset-0 bg-gradient-to-t from-gray-900 via-gray-900/20 to-transparent" />

        {/* Decorative dart board ring */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-48 h-48 rounded-full border border-white/5" aria-hidden />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-32 h-32 rounded-full border border-white/5" aria-hidden />

        {/* Flag */}
        <div className="absolute top-4 left-4 text-3xl">{pro.flag}</div>

        {/* Ranking badge */}
        <div className="absolute top-4 right-4 font-[JetBrains_Mono,monospace] text-xs font-bold bg-[#660066] text-white px-2 py-1">
          #{pro.ranking} MONDIAL
        </div>

        {/* Name overlay at bottom */}
        <div className="absolute bottom-0 left-0 right-0 p-4">
          <div className="font-[Oswald] text-3xl uppercase tracking-wide text-white leading-tight">{pro.name}</div>
        </div>
      </div>

      {/* Info */}
      <div className="p-5 bg-white border-b-4 border-[#660066]">
        <div className="text-[#660066] font-[Oswald] text-sm uppercase tracking-widest">
          &ldquo;{pro.nickname}&rdquo;
        </div>
        <div className="text-xs text-gray-500 font-semibold mt-1">{pro.nationality}</div>

        <div className="flex items-center gap-4 mt-3 pb-3 border-b border-gray-100">
          <div className="text-center">
            <div className="font-[JetBrains_Mono,monospace] text-2xl font-bold text-[#660066]">{pro.average}</div>
            <div className="text-xs text-gray-400 uppercase tracking-wider font-semibold">Moyenne</div>
          </div>
          <div className="w-px h-10 bg-gray-200" />
          <div className="text-sm text-gray-700 font-semibold flex-1">{pro.tournament}</div>
        </div>

        <p className="text-sm text-gray-600 mt-3 leading-relaxed line-clamp-2 font-medium">
          {pro.bio[locale as "fr" | "en"]}
        </p>
      </div>
    </div>
  );
}
