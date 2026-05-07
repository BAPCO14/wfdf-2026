import WorkNPlayForm from "@/components/forms/WorkNPlayForm";
import RevealSection from "@/components/home/RevealSection";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Work'N'Play",
  description: "Programme entreprises du WFDF 2026 — séminaire, team building et expérience VIP à Caen.",
};

export default function WorkNPlayPage({ params: { locale } }: { params: { locale: string } }) {
  const l = locale as "fr" | "en";
  const offers = [
    { title: l === "fr" ? "Découverte" : "Discovery", participants: "10–20", price: l === "fr" ? "Sur devis" : "On quote", features: [l === "fr" ? "Accès Village 1 jour" : "Village access 1 day", l === "fr" ? "Session initiation" : "Initiation session", l === "fr" ? "Goodies WFDF" : "WFDF goodies"] },
    { title: l === "fr" ? "Team Building" : "Team Building", participants: "20–50", price: l === "fr" ? "Sur devis" : "On quote", features: [l === "fr" ? "Accès 2 jours" : "2-day access", l === "fr" ? "Tournoi privatisé" : "Private tournament", l === "fr" ? "Déjeuner inclus" : "Lunch included", l === "fr" ? "Photo souvenir" : "Group photo"] },
    { title: "VIP Experience", participants: "50+", price: l === "fr" ? "Sur devis" : "On quote", features: [l === "fr" ? "Pass 3 jours" : "3-day pass", l === "fr" ? "Loge VIP" : "VIP box", l === "fr" ? "Rencontre avec les pros" : "Meet the pros", l === "fr" ? "Soirée de Gala incluse" : "Gala Evening included", "Branding sur site"] },
  ];

  return (
    <div className="pt-20">
      <section className="bg-gray-900 text-white py-20 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-violet opacity-40" aria-hidden />
        <div className="relative max-w-7xl mx-auto px-4">
          <h1 className="section-title text-white">Work<span className="text-[#cc00cc]">'N'</span>Play</h1>
          <p className="text-white/60 mt-4 max-w-2xl text-lg">
            {l === "fr"
              ? "Organisez votre séminaire ou team building au cœur du festival. Une expérience corporate unique."
              : "Organize your seminar or team building at the heart of the festival. A unique corporate experience."}
          </p>
        </div>
      </section>

      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <RevealSection className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-20">
            {offers.map((o, i) => (
              <div key={o.title} className={`p-8 border-2 ${i === 2 ? "border-[#660066] bg-[#660066]/5" : "border-gray-200"}`}>
                {i === 2 && <div className="font-[Oswald] text-xs uppercase tracking-widest text-[#660066] mb-2">{l === "fr" ? "Recommandé" : "Recommended"}</div>}
                <div className="font-[Oswald] text-2xl uppercase">{o.title}</div>
                <div className="text-gray-500 text-sm mt-1">{o.participants} {l === "fr" ? "participants" : "participants"}</div>
                <div className="font-[JetBrains_Mono,monospace] text-lg font-bold text-[#660066] mt-3">{o.price}</div>
                <ul className="mt-4 space-y-2">
                  {o.features.map((f) => <li key={f} className="text-sm flex gap-2"><span className="text-[#660066]">✓</span>{f}</li>)}
                </ul>
              </div>
            ))}
          </RevealSection>

          <RevealSection>
            <h2 className="section-title mb-8">
              {l === "fr" ? "Demande de " : "Request "}<span className="accent">{l === "fr" ? "devis" : "quote"}</span>
            </h2>
            <div className="max-w-2xl">
              <WorkNPlayForm locale={locale} />
            </div>
          </RevealSection>
        </div>
      </section>
    </div>
  );
}
