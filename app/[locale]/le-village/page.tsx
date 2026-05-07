import VillageMap from "@/components/village/VillageMap";
import RevealSection from "@/components/home/RevealSection";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Le Village",
  description: "Explorez le plan interactif du Hall 3 — bars, restauration, espace découverte, zone enfants et tribune.",
};

export default function VillagePage({ params: { locale } }: { params: { locale: string } }) {
  const l = locale as "fr" | "en";

  const features = [
    { icon: "🍺", title: l === "fr" ? "Bar principal" : "Main bar", desc: l === "fr" ? "Bières pression, cocktails, ambiance DJ" : "Draught beers, cocktails, DJ nights" },
    { icon: "🍔", title: l === "fr" ? "Restauration" : "Food", desc: l === "fr" ? "Food trucks & cuisine normande" : "Food trucks & Norman cuisine" },
    { icon: "🔍", title: l === "fr" ? "Équipementiers" : "Equipment", desc: l === "fr" ? "Essais & conseils Target, Red Dragon, Unicorn" : "Try & advice from Target, Red Dragon, Unicorn" },
    { icon: "👧", title: l === "fr" ? "Zone enfants" : "Children", desc: l === "fr" ? "Initiation velcro, animations" : "Velcro initiation, activities" },
    { icon: "⭐", title: l === "fr" ? "Espace Pros" : "Pros Area", desc: l === "fr" ? "Dédicaces & rencontres avec les champions" : "Signing sessions & meetings with champions" },
    { icon: "👁️", title: "Tribune", desc: l === "fr" ? "500 places assises face à la scène" : "500 seated places facing the stage" },
  ];

  return (
    <div className="pt-20">
      {/* Hero */}
      <section className="bg-gray-900 text-white py-20 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-violet opacity-40" aria-hidden />
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h1 className="section-title text-white">
            {l === "fr" ? "Le " : "The "}<span className="text-[#cc00cc]">Village</span>
          </h1>
          <p className="text-white/60 mt-4 text-lg max-w-2xl">
            {l === "fr"
              ? "Au cœur du Hall 3, un espace de vie conçu pour tous — joueurs, accompagnants, familles."
              : "At the heart of Hall 3, a living space designed for everyone — players, companions, families."}
          </p>
        </div>
      </section>

      {/* Features */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6 mb-20">
            {features.map((f, i) => (
              <RevealSection key={f.title} delay={i * 80} className="text-center">
                <div className="text-4xl mb-3">{f.icon}</div>
                <div className="font-[Oswald] uppercase text-sm tracking-wide text-gray-900">{f.title}</div>
                <div className="text-xs text-gray-500 mt-1">{f.desc}</div>
              </RevealSection>
            ))}
          </div>

          {/* Interactive map */}
          <RevealSection>
            <h2 className="section-title mb-8">
              <span className="accent">Plan </span>{l === "fr" ? "interactif" : "interactive"}
            </h2>
            <VillageMap locale={locale} />
          </RevealSection>
        </div>
      </section>

      {/* Practical info */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <RevealSection>
            <h2 className="section-title mb-8">
              {l === "fr" ? "Infos " : "Practical "}<span className="accent">{l === "fr" ? "pratiques" : "info"}</span>
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-sm">
              {[
                { title: l === "fr" ? "Accès" : "Access", content: "Parc des Expositions de Caen, Hall 3, Rue Joseph Philippon, 14000 Caen" },
                { title: l === "fr" ? "Parking" : "Parking", content: l === "fr" ? "Parking gratuit sur place (2000 places)" : "Free on-site parking (2000 spaces)" },
                { title: l === "fr" ? "Transports" : "Transport", content: l === "fr" ? "Tram ligne B — arrêt Parc des Expositions. Bus 20/21/22." : "Tram line B — Parc des Expositions stop. Bus 20/21/22." },
                { title: l === "fr" ? "Accessibilité" : "Accessibility", content: l === "fr" ? "Site entièrement accessible PMR. Places réservées disponibles." : "Fully accessible venue. Reserved spaces available." },
              ].map(({ title, content }) => (
                <div key={title} className="bg-white p-4 border border-gray-100">
                  <div className="font-[Oswald] uppercase text-sm text-[#660066] mb-1">{title}</div>
                  <p className="text-gray-600">{content}</p>
                </div>
              ))}
            </div>
          </RevealSection>
        </div>
      </section>
    </div>
  );
}
