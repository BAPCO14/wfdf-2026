import RevealSection from "@/components/home/RevealSection";
import tournamentsData from "@/content/tournaments.json";
import type { Metadata } from "next";

export const metadata: Metadata = { title: "Programme" };

const DAYS = [
  { date: "Vendredi 4 décembre 2026", dateEn: "Friday 4 December 2026", key: "Vendredi" },
  { date: "Samedi 5 décembre 2026", dateEn: "Saturday 5 December 2026", key: "Samedi" },
  { date: "Dimanche 6 décembre 2026", dateEn: "Sunday 6 December 2026", key: "Dimanche" },
];

export default function ProgrammePage({ params: { locale } }: { params: { locale: string } }) {
  const l = locale as "fr" | "en";

  return (
    <div className="pt-20">
      <section className="bg-gray-900 text-white py-16">
        <div className="max-w-7xl mx-auto px-4">
          <h1 className="section-title text-white"><span className="text-[#cc00cc]">{l === "fr" ? "Programme" : "Schedule"}</span></h1>
          <p className="text-white/60 mt-3">{l === "fr" ? "4, 5 & 6 décembre 2026 — Hall 3" : "4, 5 & 6 December 2026 — Hall 3"}</p>
        </div>
      </section>

      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {DAYS.map((day, di) => {
            const dayTournaments = tournamentsData.filter((t) => t.day.includes(day.key) || t.day.includes("Vendredi, Samedi"));
            return (
              <RevealSection key={day.key} delay={di * 100} className="mb-16">
                <h2 className="font-[Oswald] text-2xl uppercase text-[#660066] mb-6 pb-2 border-b-2 border-[#660066]/20">
                  {l === "fr" ? day.date : day.dateEn}
                </h2>
                <div className="space-y-3">
                  {dayTournaments.map((t) => (
                    <div key={t.id} className="flex items-center gap-4 p-4 bg-gray-50 hover:bg-gray-100 transition-colors">
                      <div className="font-[JetBrains_Mono,monospace] text-[#660066] font-bold w-16 shrink-0">{t.time}</div>
                      <div className="flex-1">
                        <div className="font-[Oswald] uppercase text-gray-900">{t.name}</div>
                        <div className="text-xs text-gray-500">{t.hall}</div>
                      </div>
                      <div className="text-xs text-gray-400 hidden sm:block">{t.format}</div>
                    </div>
                  ))}
                  {di === 1 && (
                    <div className="flex items-center gap-4 p-4 bg-[#660066]/5 border border-[#660066]/20">
                      <div className="font-[JetBrains_Mono,monospace] text-[#660066] font-bold w-16 shrink-0">19:30</div>
                      <div className="flex-1">
                        <div className="font-[Oswald] uppercase text-gray-900">{l === "fr" ? "Soirée de Gala" : "Gala Evening"}</div>
                        <div className="text-xs text-gray-500">{l === "fr" ? "Scène principale" : "Main stage"}</div>
                      </div>
                      <div className="text-xs font-[Oswald] uppercase text-[#660066]">VIP</div>
                    </div>
                  )}
                </div>
              </RevealSection>
            );
          })}
        </div>
      </section>
    </div>
  );
}
