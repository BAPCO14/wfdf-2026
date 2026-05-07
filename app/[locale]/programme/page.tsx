"use client";
import { useState } from "react";
import RevealSection from "@/components/home/RevealSection";
import tournamentsData from "@/content/tournaments.json";
import Link from "next/link";
import { useParams } from "next/navigation";

const DAYS = [
  { id: "ven", date: "Vendredi 4 décembre", dateEn: "Friday 4 December", key: "Vendredi" },
  { id: "sam", date: "Samedi 5 décembre", dateEn: "Saturday 5 December", key: "Samedi" },
  { id: "dim", date: "Dimanche 6 décembre", dateEn: "Sunday 6 December", key: "Dimanche" },
];

const CODE_RULES = [
  {
    icon: "🎯",
    title: { fr: "Format 501 Double Out", en: "501 Double Out Format" },
    body: { fr: "Chaque joueur part de 501 points et doit atteindre exactement zéro. La dernière fléchette doit toucher un double. En cas de bust (dépassement), le tour est annulé.", en: "Each player starts from 501 points and must reach exactly zero. The final dart must hit a double. In case of a bust, the turn is cancelled." },
  },
  {
    icon: "🏆",
    title: { fr: "Système Best of", en: "Best of System" },
    body: { fr: "Les matchs se jouent en Best of 3, 5 ou 7 legs selon le tour. La finale du Winamax Open et du Grand Prix se joue en Best of 7.", en: "Matches are played Best of 3, 5 or 7 legs depending on the round. The Winamax Open and Grand Prix finals are Best of 7." },
  },
  {
    icon: "⏱️",
    title: { fr: "Temps de lancer", en: "Throwing Time" },
    body: { fr: "30 secondes maximum par tour de 3 fléchettes. Un avertissement verbal précède toute sanction. La pénalité est la perte du leg en cours.", en: "30 seconds maximum per 3-dart turn. A verbal warning precedes any penalty. The penalty is forfeiture of the current leg." },
  },
  {
    icon: "📏",
    title: { fr: "Distance & Hauteur", en: "Distance & Height" },
    body: { fr: "Distance de la ligne de lancer : 2,37 m. Hauteur du centre de la cible : 1,73 m du sol. Toutes les tables sont certifiées PDC.", en: "Throwing line distance: 2.37 m. Height of board centre: 1.73 m from the floor. All boards are PDC certified." },
  },
  {
    icon: "👔",
    title: { fr: "Code vestimentaire", en: "Dress Code" },
    body: { fr: "Tenue sportive correcte exigée pour les tournois avec prize money. Les slogans offensants ou inappropriés sont interdits.", en: "Appropriate sportswear required for prize money tournaments. Offensive or inappropriate slogans are prohibited." },
  },
  {
    icon: "📋",
    title: { fr: "Licences & Inscriptions", en: "Licences & Registration" },
    body: { fr: "Le numéro de licence FFD est requis uniquement pour les tournois classés. Les tournois open acceptent tous les niveaux sans licence.", en: "FFD licence number required only for ranked tournaments. Open tournaments accept all levels without a licence." },
  },
];

export default function ProgrammePage() {
  const params = useParams();
  const locale = (params?.locale as string) ?? "fr";
  const l = locale as "fr" | "en";
  const [activeTab, setActiveTab] = useState<string>("ven");

  const TABS = [
    ...DAYS.map((d) => ({ id: d.id, label: l === "fr" ? d.date : d.dateEn })),
    { id: "code", label: l === "fr" ? "Règlement" : "Rules & Code" },
  ];

  return (
    <div className="pt-20">
      <section className="bg-gray-900 text-white py-16">
        <div className="max-w-7xl mx-auto px-4">
          <h1 className="section-title text-white">
            <span className="text-[#cc00cc]">{l === "fr" ? "Programme" : "Schedule"}</span>
          </h1>
          <p className="text-white/60 mt-3 font-semibold">
            {l === "fr" ? "4, 5 & 6 décembre 2026 — Hall 3, Parc des Expositions de Caen" : "4, 5 & 6 December 2026 — Hall 3, Parc des Expositions de Caen"}
          </p>
        </div>
      </section>

      {/* Tabs */}
      <div className="bg-white border-b border-gray-200 sticky top-16 z-30">
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex overflow-x-auto">
            {TABS.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={[
                  "shrink-0 px-5 py-4 font-[Oswald] uppercase text-sm tracking-widest border-b-2 transition-all duration-200 whitespace-nowrap",
                  activeTab === tab.id
                    ? "border-[#660066] text-[#660066]"
                    : "border-transparent text-gray-500 hover:text-gray-900",
                  tab.id === "code" ? "ml-auto border-l border-gray-200" : "",
                ].join(" ")}
              >
                {tab.id === "code" ? "📋 " : ""}{tab.label}
              </button>
            ))}
          </div>
        </div>
      </div>

      <section className="py-16 bg-white min-h-[60vh]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

          {/* Day tabs */}
          {DAYS.map((day) => activeTab === day.id && (
            <RevealSection key={day.id}>
              <h2 className="font-[Oswald] text-3xl uppercase text-[#660066] mb-8">
                {l === "fr" ? day.date : day.dateEn}
                <span className="text-gray-400 text-xl ml-3">2026</span>
              </h2>
              <div className="space-y-3">
                {tournamentsData
                  .filter((t) => t.day.includes(day.key) || t.day.includes("Vendredi, Samedi"))
                  .map((t) => (
                    <Link
                      key={t.id}
                      href={`/${locale}/tournois/${t.slug}`}
                      className="flex items-center gap-4 p-5 bg-gray-50 hover:bg-[#660066]/5 border border-transparent hover:border-[#660066]/20 transition-all group"
                    >
                      <div className="font-[JetBrains_Mono,monospace] text-[#660066] font-bold w-16 shrink-0 text-lg">{t.time}</div>
                      <div className="flex-1 min-w-0">
                        <div className="font-[Oswald] uppercase text-lg text-gray-900 group-hover:text-[#660066] transition-colors">{t.name}</div>
                        <div className="text-sm text-gray-500 font-semibold">{t.hall} · {t.format}</div>
                      </div>
                      <div className="text-right hidden sm:block shrink-0">
                        <div className="font-[JetBrains_Mono,monospace] text-sm font-bold text-[#660066]">
                          {new Intl.NumberFormat(l === "fr" ? "fr-FR" : "en-GB", { style: "currency", currency: "EUR", maximumFractionDigits: 0 }).format(t.prizePool)}
                        </div>
                        <div className="text-xs text-gray-400 font-semibold uppercase tracking-wider">Prize Pool</div>
                      </div>
                      <div className="text-[#660066] text-xl hidden sm:block">→</div>
                    </Link>
                  ))}

                {day.id === "sam" && (
                  <div className="flex items-center gap-4 p-5 bg-[#660066] text-white mt-4">
                    <div className="font-[JetBrains_Mono,monospace] font-bold w-16 shrink-0 text-lg">19:30</div>
                    <div className="flex-1">
                      <div className="font-[Oswald] uppercase text-lg">{l === "fr" ? "Soirée de Gala" : "Gala Evening"}</div>
                      <div className="text-sm text-white/70 font-semibold">{l === "fr" ? "Scène principale · Dîner, show, remises de prix" : "Main stage · Dinner, show, prize ceremony"}</div>
                    </div>
                    <div className="font-[Oswald] uppercase text-xs tracking-widest bg-white/20 px-3 py-1">VIP</div>
                  </div>
                )}
              </div>
            </RevealSection>
          ))}

          {/* Rules / Code tab */}
          {activeTab === "code" && (
            <RevealSection>
              <h2 className="font-[Oswald] text-3xl uppercase text-[#660066] mb-2">
                {l === "fr" ? "Règlement & Code Sportif" : "Rules & Sporting Code"}
              </h2>
              <p className="text-gray-500 font-semibold mb-10">
                {l === "fr" ? "Winamax French Darts Festival 2026 — Règles officielles" : "Winamax French Darts Festival 2026 — Official rules"}
              </p>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {CODE_RULES.map((rule, i) => (
                  <RevealSection key={i} delay={i * 80}>
                    <div className="p-6 border border-gray-100 hover:border-[#660066] transition-colors h-full">
                      <div className="flex items-start gap-4">
                        <div className="text-3xl shrink-0">{rule.icon}</div>
                        <div>
                          <h3 className="font-[Oswald] uppercase text-lg text-gray-900 mb-2">{rule.title[l]}</h3>
                          <p className="text-sm text-gray-600 leading-relaxed font-medium">{rule.body[l]}</p>
                        </div>
                      </div>
                    </div>
                  </RevealSection>
                ))}
              </div>
              <RevealSection className="mt-8 bg-gray-50 p-6 border-l-4 border-[#660066]">
                <p className="text-sm text-gray-600 font-medium">
                  {l === "fr"
                    ? "Le règlement complet est disponible sur demande auprès de l'organisation. En cas de litige, la décision de l'arbitre désigné est définitive et sans appel."
                    : "The full rules are available on request from the organisation. In case of dispute, the decision of the appointed referee is final and binding."}
                </p>
              </RevealSection>
            </RevealSection>
          )}
        </div>
      </section>
    </div>
  );
}
