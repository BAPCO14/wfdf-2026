import HeroSection from "@/components/home/HeroSection";
import RevealSection from "@/components/home/RevealSection";
import ProCard from "@/components/home/ProCard";
import NewsletterForm from "@/components/home/NewsletterForm";
import Link from "next/link";
import { formatCurrency } from "@/lib/utils";
import { EVENT } from "@/lib/constants";
import prosData from "@/content/pros.json";
import tournamentsData from "@/content/tournaments.json";
import partnersData from "@/content/partners.json";
import type { Metadata } from "next";

export async function generateMetadata({ params }: { params: { locale: string } }): Promise<Metadata> {
  return {
    title: "Winamax French Darts Festival 2026 — Caen",
    description:
      params.locale === "fr"
        ? "Le festival international de fléchettes à Caen. 8 tournois, 3 champions mondiaux, soirée de gala. 4-6 décembre 2026."
        : "The international darts festival in Caen. 8 tournaments, 3 world champions, gala evening. 4-6 December 2026.",
  };
}

export default function HomePage({ params: { locale } }: { params: { locale: string } }) {
  const l = locale as "fr" | "en";

  return (
    <>
      {/* Hero */}
      <HeroSection locale={locale} />

      {/* Stats bar */}
      <div className="bg-[#660066] text-white py-6">
        <div className="max-w-7xl mx-auto px-4 grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
          {[
            { value: "8", label: l === "fr" ? "Tournois" : "Tournaments" },
            { value: "3", label: l === "fr" ? "Pros mondiaux" : "World Pros" },
            { value: formatCurrency(EVENT.pricePool.total), label: "Prize Pool" },
            { value: "3", label: l === "fr" ? "Jours de fête" : "Festival Days" },
          ].map(({ value, label }) => (
            <div key={label}>
              <div className="font-[JetBrains_Mono,monospace] text-3xl md:text-4xl font-bold">{value}</div>
              <div className="font-[Oswald] uppercase text-xs tracking-widest text-white/70 mt-1">{label}</div>
            </div>
          ))}
        </div>
      </div>

      {/* Pros section */}
      <section className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <RevealSection className="text-center mb-16">
            <h2 className="section-title">
              {l === "fr" ? "Les pros à " : "The pros in "}<span className="accent">Caen</span>
            </h2>
            <p className="text-gray-500 mt-4 text-lg">
              {l === "fr" ? "3 champions mondiaux en lice" : "3 world champions competing"}
            </p>
          </RevealSection>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {prosData.map((pro, i) => (
              <RevealSection key={pro.id} delay={i * 150}>
                <ProCard pro={pro} locale={locale} />
              </RevealSection>
            ))}
          </div>
        </div>
      </section>

      {/* Tournaments preview */}
      <section className="py-24 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <RevealSection className="text-center mb-16">
            <h2 className="section-title">
              <span className="accent">8 </span>{l === "fr" ? "Tournois" : "Tournaments"}
            </h2>
            <p className="text-gray-500 mt-4 text-lg">
              {l === "fr" ? "Tous niveaux, toutes catégories" : "All levels, all categories"}
            </p>
          </RevealSection>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {tournamentsData.slice(0, 4).map((t, i) => (
              <RevealSection key={t.id} delay={i * 100}>
                <Link
                  href={`/${locale}/tournois/${t.slug}`}
                  className="block bg-white border border-gray-100 p-6 hover:border-[#660066] hover:shadow-lg transition-all duration-300 group"
                >
                  <div className="font-[Oswald] text-xl uppercase text-gray-900 group-hover:text-[#660066] transition-colors">
                    {t.name}
                  </div>
                  <div className="text-sm text-gray-500 mt-1">{t.subtitle[l]}</div>
                  <div className="mt-4 flex items-end justify-between">
                    <div>
                      <div className="font-[JetBrains_Mono,monospace] text-lg font-bold text-[#660066]">
                        {formatCurrency(t.prizePool)}
                      </div>
                      <div className="text-xs text-gray-400 uppercase tracking-wider">Prize pool</div>
                    </div>
                    <div className="text-xs text-gray-400">{t.maxPlayers} {l === "fr" ? "joueurs" : "players"}</div>
                  </div>
                </Link>
              </RevealSection>
            ))}
          </div>

          <RevealSection className="text-center mt-12">
            <Link href={`/${locale}/tournois`} className="btn-primary px-10 py-4">
              {l === "fr" ? "Voir tous les tournois" : "See all tournaments"}
            </Link>
          </RevealSection>
        </div>
      </section>

      {/* Village teaser */}
      <section className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <RevealSection>
              <h2 className="section-title">
                {l === "fr" ? "Le " : "The "}<span className="accent">Village</span>
              </h2>
              <p className="text-gray-600 mt-6 text-lg leading-relaxed">
                {l === "fr"
                  ? "Au cœur du Hall 3, le Village est l'espace de vie du festival : bars, restauration, animations, espace découverte des équipementiers, zone enfants. Un lieu pour tous, même sans jouer."
                  : "At the heart of Hall 3, the Village is the festival's living space: bars, food, activities, equipment discovery area, children's zone. A place for everyone, even non-players."}
              </p>
              <Link href={`/${locale}/le-village`} className="btn-primary mt-8 inline-flex px-8 py-3">
                {l === "fr" ? "Explorer le plan interactif" : "Explore the interactive map"}
              </Link>
            </RevealSection>

            <RevealSection delay={200}>
              <div className="relative bg-gray-900 h-80 overflow-hidden">
                <div
                  className="absolute inset-0 bg-cover bg-center"
                  style={{ backgroundImage: "url('/assets/ambiance/village.webp')", backgroundColor: "#1a1a2e" }}
                />
                <div className="absolute inset-0 bg-[#660066]/20" />
                <div className="absolute bottom-4 left-4 right-4 text-white">
                  <div className="font-[Oswald] text-2xl uppercase">{l === "fr" ? "Hall 3 — Plan interactif" : "Hall 3 — Interactive Map"}</div>
                  <div className="text-sm text-white/70">{l === "fr" ? "Explorez les zones en un clic" : "Explore zones with one click"}</div>
                </div>
              </div>
            </RevealSection>
          </div>
        </div>
      </section>

      {/* Gala teaser */}
      <section className="py-24 bg-gray-900 text-white relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-violet opacity-40" aria-hidden />
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <RevealSection>
            <span className="inline-block font-[Oswald] uppercase tracking-[0.4em] text-[#cc00cc] text-sm mb-4 border border-[#660066]/50 px-4 py-1">
              {l === "fr" ? "Samedi 5 décembre 2026" : "Saturday 5 December 2026"}
            </span>
            <h2 className="section-title text-white">
              {l === "fr" ? "Soirée de " : "Gala "}<span className="text-[#cc00cc]">{l === "fr" ? "Gala" : "Evening"}</span>
            </h2>
            <p className="text-white/60 mt-4 max-w-2xl mx-auto text-lg">
              {l === "fr"
                ? "Dîner de gala, show en direct, remises de prix avec les pros. Une soirée d'exception dans une atmosphère électrique."
                : "Gala dinner, live show, prize ceremony with the pros. An exceptional evening in an electric atmosphere."}
            </p>
            <Link href={`/${locale}/soiree-gala`} className="btn-primary mt-8 inline-flex px-10 py-4 border border-[#660066]">
              {l === "fr" ? "Réserver sa place" : "Book a seat"}
            </Link>
          </RevealSection>
        </div>
      </section>

      {/* Partners */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <RevealSection className="text-center mb-12">
            <h2 className="font-[Oswald] text-2xl uppercase tracking-widest text-gray-400">
              {l === "fr" ? "Ils nous font confiance" : "They trust us"}
            </h2>
          </RevealSection>
          <div className="flex flex-wrap items-center justify-center gap-8 md:gap-12">
            {partnersData.map((p, i) => (
              <RevealSection key={p.id} delay={i * 80}>
                <a href={p.url} target="_blank" rel="noopener noreferrer" className="block opacity-40 hover:opacity-100 transition-opacity duration-300">
                  <div
                    className="font-[Oswald] text-xl uppercase tracking-widest font-bold"
                    style={{ color: p.tier === "title" ? "#E40520" : "#333" }}
                  >
                    {p.name}
                  </div>
                </a>
              </RevealSection>
            ))}
          </div>
        </div>
      </section>

      {/* Newsletter */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-2xl mx-auto px-4 text-center">
          <RevealSection>
            <h2 className="section-title mb-3">
              {l === "fr" ? "Restez " : "Stay "}<span className="accent">{l === "fr" ? "informés" : "informed"}</span>
            </h2>
            <p className="text-gray-500 mb-8">
              {l === "fr" ? "Toute l'actualité du festival dans votre boîte mail" : "All festival news in your inbox"}
            </p>
            <NewsletterForm locale={locale} />
          </RevealSection>
        </div>
      </section>
    </>
  );
}
