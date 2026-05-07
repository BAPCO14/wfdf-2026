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

interface ProCardProps { pro: Pro; locale: string; }

export default function ProCard({ pro, locale }: ProCardProps) {
  const cardRef = useRef<HTMLDivElement>(null);

  const onMouseMove = (e: MouseEvent<HTMLDivElement>) => {
    const card = cardRef.current;
    if (!card) return;
    const { left, top, width, height } = card.getBoundingClientRect();
    const x = ((e.clientX - left) / width - 0.5) * 2;
    const y = ((e.clientY - top) / height - 0.5) * 2;
    const rotateX = y * -5;
    const rotateY = x * 5;
    card.style.transform = `perspective(800px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale(1.02)`;
  };
  const onMouseLeave = () => {
    const card = cardRef.current;
    if (card) card.style.transform = "perspective(800px) rotateX(0) rotateY(0) scale(1)";
  };

  return (
    <div
      ref={cardRef}
      onMouseMove={onMouseMove}
      onMouseLeave={onMouseLeave}
      className="relative bg-white rounded-none overflow-hidden group cursor-pointer"
      style={{ transition: "transform 0.15s ease", transformStyle: "preserve-3d" }}
    >
      {/* Photo */}
      <div className="relative h-72 bg-gray-900 overflow-hidden">
        <div
          className="absolute inset-0 bg-cover bg-center bg-no-repeat transition-transform duration-500 group-hover:scale-105"
          style={{ backgroundImage: `url(${pro.photo})`, backgroundColor: "#1a1a2e" }}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-gray-900 via-transparent to-transparent" />
        {/* Ranking badge */}
        <div className="absolute top-4 right-4 font-[JetBrains_Mono,monospace] text-xs font-bold bg-[#660066] text-white px-2 py-1">
          #{pro.ranking} MONDIAL
        </div>
        {/* Flag */}
        <div className="absolute top-4 left-4 text-2xl">{pro.flag}</div>
      </div>

      {/* Info */}
      <div className="p-6 bg-white border-b-4 border-[#660066]">
        <div className="font-[Oswald] text-2xl uppercase tracking-wide text-gray-900">{pro.name}</div>
        <div className="text-[#660066] font-[Oswald] text-sm uppercase tracking-widest mt-0.5">"{pro.nickname}"</div>
        <div className="text-xs text-gray-500 mt-2">{pro.nationality}</div>

        <div className="flex items-center gap-4 mt-3">
          <div className="text-center">
            <div className="font-[JetBrains_Mono,monospace] text-xl font-bold text-[#660066]">{pro.average}</div>
            <div className="text-xs text-gray-500 uppercase tracking-wider">Moyenne</div>
          </div>
          <div className="w-px h-8 bg-gray-200" />
          <div className="text-sm text-gray-600 flex-1">{pro.tournament}</div>
        </div>

        <p className="text-sm text-gray-600 mt-3 leading-relaxed line-clamp-2">
          {pro.bio[locale as "fr" | "en"]}
        </p>
      </div>
    </div>
  );
}
