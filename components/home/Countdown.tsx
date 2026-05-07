"use client";
import { useState, useEffect } from "react";
import { getCountdown } from "@/lib/utils";
import { EVENT } from "@/lib/constants";

interface CountdownProps { locale: string; }

const labels = {
  fr: { days: "Jours", hours: "Heures", minutes: "Minutes", seconds: "Secondes" },
  en: { days: "Days", hours: "Hours", minutes: "Minutes", seconds: "Seconds" },
};

export default function Countdown({ locale }: CountdownProps) {
  const [time, setTime] = useState(getCountdown(EVENT.startDate));

  useEffect(() => {
    const id = setInterval(() => setTime(getCountdown(EVENT.startDate)), 1000);
    return () => clearInterval(id);
  }, []);

  const t = labels[locale as "fr" | "en"];
  const units = [
    { value: time.days, label: t.days },
    { value: time.hours, label: t.hours },
    { value: time.minutes, label: t.minutes },
    { value: time.seconds, label: t.seconds },
  ];

  return (
    <div className="flex items-center gap-4 md:gap-8">
      {units.map(({ value, label }, i) => (
        <div key={label} className="flex items-center gap-4 md:gap-8">
          <div className="text-center">
            <div
              className="font-[JetBrains_Mono,monospace] text-4xl md:text-6xl font-bold text-white tabular-nums"
              style={{ animation: "pulse-slow 3s ease-in-out infinite", animationDelay: `${i * 0.2}s` }}
            >
              {String(value).padStart(2, "0")}
            </div>
            <div className="font-[Oswald] uppercase text-xs md:text-sm tracking-widest text-white/60 mt-1">
              {label}
            </div>
          </div>
          {i < 3 && <span className="text-2xl md:text-4xl text-[#660066] font-bold">:</span>}
        </div>
      ))}
    </div>
  );
}
