import RevealSection from "@/components/home/RevealSection";
import Link from "next/link";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Soirée de Gala",
  description: "Dîner de gala, show en direct et remise des prix avec les pros — samedi 5 décembre 2026.",
};

export default function GalaPage({ params: { locale } }: { params: { locale: string } }) {
  const l = locale as "fr" | "en";

  const programme = [
    { time: "19:30", label: l === "fr" ? "Accueil cocktail" : "Welcome cocktail" },
    { time: "20:30", label: l === "fr" ? "Dîner de gala 3 services" : "3-course gala dinner" },
    { time: "21:30", label: l === "fr" ? "Show & démonstrations pros" : "Show & pro demonstrations" },
    { time: "22:30", label: l === "fr" ? "Remises de prix — Masters Invitational" : "Prize ceremony — Masters Invitational" },
    { time: "23:00", label: l === "fr" ? "Soirée & DJ" : "Party & DJ" },
  ];

  return (
    <div className="pt-20">
      {/* Hero */}
      <section className="relative min-h-[60vh] flex items-center bg-gray-900 overflow-hidden">
        <div
          className="absolute inset-0 bg-cover bg-center opacity-30"
          style={{ backgroundImage: "url('/assets/ambiance/gala.svg')", backgroundColor: "#1a1a2e" }}
        />
        <div className="absolute inset-0 bg-gradient-to-r from-gray-900 via-gray-900/80 to-transparent" />
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-white">
          <span className="font-[Oswald] uppercase tracking-[0.4em] text-[#cc00cc] text-sm border border-[#660066]/50 px-4 py-1 inline-block mb-6">
            {l === "fr" ? "Samedi 5 décembre 2026 — 19h30" : "Saturday 5 December 2026 — 7:30pm"}
          </span>
          <h1 className="section-title text-white">
            {l === "fr" ? "Soirée de " : "Gala "}<span className="text-[#cc00cc]">{l === "fr" ? "Gala" : "Evening"}</span>
          </h1>
          <p className="text-white/60 mt-4 text-lg max-w-lg">
            {l === "fr"
              ? "Une soirée d'exception pour couronner le festival dans une atmosphère électrique."
              : "An exceptional evening to crown the festival in an electric atmosphere."}
          </p>
        </div>
      </section>

      {/* Programme */}
      <section className="py-20 bg-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <RevealSection>
            <h2 className="section-title mb-12">
              <span className="accent">{l === "fr" ? "Programme" : "Schedule"}</span>
            </h2>
            <div className="relative">
              <div className="absolute left-16 top-0 bottom-0 w-px bg-[#660066]/20" aria-hidden />
              <div className="space-y-8">
                {programme.map(({ time, label }, i) => (
                  <RevealSection key={time} delay={i * 100} className="flex items-start gap-8">
                    <div className="w-16 shrink-0 font-[JetBrains_Mono,monospace] text-[#660066] font-bold text-lg text-right">{time}</div>
                    <div className="relative">
                      <div className="absolute -left-[25px] top-2 w-3 h-3 rounded-full bg-[#660066]" aria-hidden />
                      <div className="font-[Oswald] text-xl uppercase text-gray-900">{label}</div>
                    </div>
                  </RevealSection>
                ))}
              </div>
            </div>
          </RevealSection>
        </div>
      </section>

      {/* Tickets */}
      <section className="py-16 bg-gray-900 text-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <RevealSection className="text-center">
            <h2 className="section-title text-white mb-6">
              {l === "fr" ? "Réserver" : "Book"}
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-10">
              {[
                { type: l === "fr" ? "Place individuelle" : "Individual seat", price: "€85", desc: l === "fr" ? "Dîner + show + remises de prix" : "Dinner + show + prize ceremony" },
                { type: l === "fr" ? "Table VIP (10 pers.)" : "VIP table (10 pers.)", price: "€750", desc: l === "fr" ? "Table privatisée + bouteille bienvenue + photo avec les pros" : "Private table + welcome bottle + photo with pros" },
              ].map(({ type, price, desc }) => (
                <div key={type} className="bg-white/5 border border-white/10 p-6 text-left hover:border-[#660066] transition-colors">
                  <div className="font-[Oswald] text-xl uppercase text-white">{type}</div>
                  <div className="font-[JetBrains_Mono,monospace] text-3xl text-[#660066] font-bold mt-2">{price}</div>
                  <div className="text-white/50 text-sm mt-1">{desc}</div>
                </div>
              ))}
            </div>
            <Link href={`/${locale}/contact`} className="btn-primary px-10 py-4 text-sm border border-[#660066]">
              {l === "fr" ? "Réserver ma place" : "Book my seat"}
            </Link>
            <p className="text-white/30 text-xs mt-4">
              {l === "fr" ? "Places limitées. Règlement par virement ou chèque." : "Limited seats. Payment by bank transfer or cheque."}
            </p>
          </RevealSection>
        </div>
      </section>
    </div>
  );
}
