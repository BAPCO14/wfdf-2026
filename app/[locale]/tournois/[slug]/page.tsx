import { notFound } from "next/navigation";
import Link from "next/link";
import RevealSection from "@/components/home/RevealSection";
import InscriptionForm from "@/components/forms/InscriptionForm";
import { formatCurrency } from "@/lib/utils";
import tournamentsData from "@/content/tournaments.json";
import prosData from "@/content/pros.json";
import type { Metadata } from "next";

export async function generateStaticParams() {
  const locales = ["fr", "en"];
  return locales.flatMap((locale) =>
    tournamentsData.map((t) => ({ locale, slug: t.slug }))
  );
}

export async function generateMetadata({ params }: { params: { slug: string; locale: string } }): Promise<Metadata> {
  const t = tournamentsData.find((t) => t.slug === params.slug);
  if (!t) return {};
  return { title: t.name, description: t.description[params.locale as "fr" | "en"] };
}

export default function TournamentPage({ params: { slug, locale } }: { params: { slug: string; locale: string } }) {
  const t = tournamentsData.find((t) => t.slug === slug);
  if (!t) notFound();

  const l = locale as "fr" | "en";
  const pro = t.pro ? prosData.find((p) => p.id === t.pro) : null;

  return (
    <div className="pt-20">
      {/* Hero */}
      <section className="bg-gray-900 text-white py-20 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-violet opacity-40" aria-hidden />
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <Link href={`/${locale}/tournois`} className="text-white/50 hover:text-white text-sm font-[Oswald] uppercase tracking-widest transition-colors mb-6 inline-block">
            ← {l === "fr" ? "Tous les tournois" : "All tournaments"}
          </Link>
          <h1 className="section-title text-white mt-2">
            {t.name}
          </h1>
          <p className="text-[#cc00cc] font-[Oswald] uppercase tracking-widest text-sm mt-2">{t.subtitle[l]}</p>
        </div>
      </section>

      {/* Content */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
            {/* Main info */}
            <div className="lg:col-span-2">
              <RevealSection>
                <h2 className="font-[Oswald] text-2xl uppercase text-gray-900 mb-4">
                  {l === "fr" ? "À propos" : "About"}
                </h2>
                <p className="text-gray-600 leading-relaxed text-lg">{t.description[l]}</p>
              </RevealSection>

              {/* Rules */}
              <RevealSection className="mt-10">
                <h2 className="font-[Oswald] text-2xl uppercase text-gray-900 mb-4">
                  {l === "fr" ? "Format & Règles" : "Format & Rules"}
                </h2>
                <ul className="space-y-2">
                  {t.rules.map((rule, i) => (
                    <li key={i} className="flex gap-3 text-gray-700">
                      <span className="text-[#660066] font-bold">▶</span>
                      {rule}
                    </li>
                  ))}
                </ul>
              </RevealSection>

              {/* Pro guest */}
              {pro && (
                <RevealSection className="mt-10 bg-gray-50 p-6 border-l-4 border-[#660066]">
                  <h2 className="font-[Oswald] text-xl uppercase text-gray-900 mb-3">
                    {l === "fr" ? "Pro invité" : "Pro guest"}
                  </h2>
                  <div className="flex items-center gap-4">
                    <div className="text-4xl">{pro.flag}</div>
                    <div>
                      <div className="font-[Oswald] text-2xl uppercase text-[#660066]">{pro.name}</div>
                      <div className="text-gray-500">"{pro.nickname}" · {pro.nationality}</div>
                      <div className="text-sm text-gray-600 mt-1">{pro.bio[l].slice(0, 120)}…</div>
                    </div>
                  </div>
                </RevealSection>
              )}

              {/* Registration form */}
              {t.registration && (
                <RevealSection className="mt-16">
                  <h2 className="font-[Oswald] text-2xl uppercase text-gray-900 mb-6">
                    {l === "fr" ? "S'inscrire" : "Register"}
                  </h2>
                  <InscriptionForm locale={locale} tournamentId={t.id} tournamentName={t.name} />
                </RevealSection>
              )}
            </div>

            {/* Sidebar */}
            <div className="space-y-6">
              <RevealSection delay={100}>
                <div className="bg-gray-50 p-6 border border-gray-100">
                  <h3 className="font-[Oswald] uppercase text-sm tracking-widest text-gray-400 mb-4">
                    {l === "fr" ? "Informations" : "Info"}
                  </h3>
                  <div className="space-y-4">
                    {[
                      { label: "Format", value: t.format },
                      { label: l === "fr" ? "Date" : "Date", value: t.day },
                      { label: l === "fr" ? "Heure" : "Time", value: t.time },
                      { label: l === "fr" ? "Salle" : "Hall", value: t.hall },
                      { label: l === "fr" ? "Joueurs max" : "Max players", value: String(t.maxPlayers) },
                    ].map(({ label, value }) => (
                      <div key={label} className="flex justify-between text-sm border-b border-gray-200 pb-2">
                        <span className="text-gray-500">{label}</span>
                        <span className="font-medium text-gray-900">{value}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </RevealSection>

              <RevealSection delay={200}>
                <div className="bg-[#660066] text-white p-6 text-center">
                  <div className="font-[JetBrains_Mono,monospace] text-4xl font-bold">{formatCurrency(t.prizePool)}</div>
                  <div className="font-[Oswald] uppercase text-sm tracking-widest mt-1 text-white/70">Prize Pool</div>
                </div>
              </RevealSection>

              {t.registration && t.registrationDeadline && (
                <RevealSection delay={300}>
                  <div className="bg-yellow-50 border border-yellow-200 p-4 text-sm text-yellow-800">
                    <span className="font-bold">{l === "fr" ? "Date limite :" : "Deadline:"}</span>{" "}
                    {new Date(t.registrationDeadline).toLocaleDateString(locale === "fr" ? "fr-FR" : "en-GB", { day: "numeric", month: "long", year: "numeric" })}
                  </div>
                </RevealSection>
              )}
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
