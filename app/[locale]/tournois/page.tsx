import Link from "next/link";
import RevealSection from "@/components/home/RevealSection";
import { formatCurrency } from "@/lib/utils";
import tournamentsData from "@/content/tournaments.json";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Tournois",
  description: "8 tournois ouverts à tous les niveaux — Winamax Open, Grand Prix de Normandie, Ladies Cup, Youth Championship et plus.",
};

const levelColors: Record<string, string> = {
  open: "#660066",
  regional: "#005B8E",
  city: "#00843D",
  ladies: "#C41230",
  youth: "#FF6600",
  pairs: "#1A1A2E",
  invitational: "#660066",
  fun: "#333333",
};

export default function TournamentsPage({ params: { locale } }: { params: { locale: string } }) {
  const l = locale as "fr" | "en";

  return (
    <div className="pt-20">
      {/* Header */}
      <section className="bg-gray-900 text-white py-20 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-violet opacity-50" aria-hidden />
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <span className="font-[Oswald] uppercase tracking-[0.4em] text-[#cc00cc] text-sm">
            {l === "fr" ? "4, 5 & 6 décembre 2026" : "4, 5 & 6 December 2026"}
          </span>
          <h1 className="section-title text-white mt-2">
            {l === "fr" ? "Les " : "The "}<span className="text-[#cc00cc]">Tournois</span>
          </h1>
          <p className="text-white/60 mt-4 text-lg max-w-2xl">
            {l === "fr"
              ? "8 compétitions pour tous les niveaux. Du débutant au professionnel, trouvez votre tournoi."
              : "8 competitions for all levels. From beginner to professional, find your tournament."}
          </p>
        </div>
      </section>

      {/* Tournaments grid */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-8">
            {tournamentsData.map((t, i) => (
              <RevealSection key={t.id} delay={i * 80}>
                <Link
                  href={`/${locale}/tournois/${t.slug}`}
                  className="block group bg-white border border-gray-100 hover:border-[#660066] hover:shadow-xl transition-all duration-300 overflow-hidden"
                >
                  {/* Color bar */}
                  <div className="h-1" style={{ backgroundColor: levelColors[t.level] ?? "#660066" }} />

                  <div className="p-6">
                    {/* Name */}
                    <div className="flex items-start justify-between gap-4">
                      <div>
                        <h2 className="font-[Oswald] text-2xl uppercase group-hover:text-[#660066] transition-colors">
                          {t.name}
                        </h2>
                        <p className="text-gray-500 text-sm mt-0.5">{t.subtitle[l]}</p>
                      </div>
                      <span
                        className="text-xs font-[Oswald] uppercase tracking-wider px-2 py-1 text-white shrink-0"
                        style={{ backgroundColor: levelColors[t.level] ?? "#660066" }}
                      >
                        {t.level}
                      </span>
                    </div>

                    {/* Details */}
                    <div className="mt-4 space-y-1.5 text-sm text-gray-600">
                      <div className="flex gap-2"><span className="text-gray-400 w-20">Format</span><span>{t.format}</span></div>
                      <div className="flex gap-2"><span className="text-gray-400 w-20">{l === "fr" ? "Date" : "Date"}</span><span>{t.day}</span></div>
                      <div className="flex gap-2"><span className="text-gray-400 w-20">{l === "fr" ? "Heure" : "Time"}</span><span>{t.time}</span></div>
                      <div className="flex gap-2"><span className="text-gray-400 w-20">{l === "fr" ? "Lieu" : "Hall"}</span><span>{t.hall}</span></div>
                    </div>

                    {/* Prize & players */}
                    <div className="mt-5 pt-4 border-t border-gray-100 flex items-center justify-between">
                      <div>
                        <div className="font-[JetBrains_Mono,monospace] text-xl font-bold text-[#660066]">
                          {formatCurrency(t.prizePool)}
                        </div>
                        <div className="text-xs text-gray-400 uppercase tracking-wider">Prize pool</div>
                      </div>
                      <div className="text-right">
                        <div className="font-[JetBrains_Mono,monospace] text-xl font-bold text-gray-900">
                          {t.maxPlayers}
                        </div>
                        <div className="text-xs text-gray-400 uppercase tracking-wider">
                          {l === "fr" ? "joueurs max" : "max players"}
                        </div>
                      </div>
                    </div>

                    {t.registration && (
                      <div className="mt-4">
                        <span className="inline-block text-xs font-[Oswald] uppercase tracking-wider text-[#660066] border border-[#660066] px-3 py-1 group-hover:bg-[#660066] group-hover:text-white transition-colors">
                          {l === "fr" ? "Inscriptions ouvertes →" : "Registration open →"}
                        </span>
                      </div>
                    )}
                  </div>
                </Link>
              </RevealSection>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
