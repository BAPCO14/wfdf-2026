import RevealSection from "@/components/home/RevealSection";
import { EVENT, SITE } from "@/lib/constants";
import faqData from "@/content/faq.json";
import type { Metadata } from "next";

export const metadata: Metadata = { title: "Infos pratiques" };

export default function InfosPratiquesPage({ params: { locale } }: { params: { locale: string } }) {
  const l = locale as "fr" | "en";

  const infos = [
    { icon: "📍", title: l === "fr" ? "Adresse" : "Address", content: `${EVENT.venue.name}\n${EVENT.venue.hall}\n${EVENT.venue.address}\n${EVENT.venue.zip} ${EVENT.venue.city}` },
    { icon: "🚗", title: l === "fr" ? "Parking" : "Parking", content: l === "fr" ? "2 000 places gratuites\nSortie autoroute A13 — Caen Centre\nGPS : 49.1859, -0.3632" : "2,000 free spaces\nA13 motorway exit — Caen Centre\nGPS: 49.1859, -0.3632" },
    { icon: "🚌", title: l === "fr" ? "Transports" : "Transport", content: l === "fr" ? "Tram ligne B — Parc des Expositions\nBus 20, 21, 22 depuis Caen centre\nGare SNCF Caen : 15 min en tram" : "Tram line B — Parc des Expositions\nBus 20, 21, 22 from Caen centre\nCaen station: 15 min by tram" },
    { icon: "🏨", title: "Hôtels", content: l === "fr" ? "Hotels partenaires à tarifs préférentiels :\nIbis Caen Centre (15% de réduction)\nNovotel Caen Côte de Nacre\n→ Code : WFDF2026" : "Partner hotels at preferential rates:\nIbis Caen Centre (15% discount)\nNovotel Caen Côte de Nacre\n→ Code: WFDF2026" },
    { icon: "♿", title: l === "fr" ? "Accessibilité" : "Accessibility", content: l === "fr" ? "Site entièrement accessible PMR\nPlaces de parking réservées\nEntrée dédiée Hall 3 Est\nContact : accessibility@frenchdartsfestival.fr" : "Fully accessible venue\nReserved parking spaces\nDedicated Hall 3 East entrance\nContact: accessibility@frenchdartsfestival.fr" },
    { icon: "🎟️", title: l === "fr" ? "Billets" : "Tickets", content: l === "fr" ? "Entrée gratuite pour le Village et les tournois ouverts\nSoirée de Gala : sur réservation\nVIP : contacter notre équipe" : "Free entry for the Village and open tournaments\nGala Evening: reservation required\nVIP: contact our team" },
  ];

  return (
    <div className="pt-20">
      <section className="bg-gray-900 text-white py-16">
        <div className="max-w-7xl mx-auto px-4">
          <h1 className="section-title text-white"><span className="text-[#cc00cc]">{l === "fr" ? "Infos pratiques" : "Practical info"}</span></h1>
        </div>
      </section>

      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-20">
            {infos.map((info, i) => (
              <RevealSection key={info.title} delay={i * 80}>
                <div className="p-6 border border-gray-100 hover:border-[#660066] transition-colors h-full">
                  <div className="text-3xl mb-3">{info.icon}</div>
                  <div className="font-[Oswald] uppercase text-sm tracking-widest text-[#660066] mb-2">{info.title}</div>
                  <p className="text-gray-600 text-sm leading-relaxed whitespace-pre-line">{info.content}</p>
                </div>
              </RevealSection>
            ))}
          </div>

          {/* FAQ */}
          <RevealSection>
            <h2 className="section-title mb-10">FAQ</h2>
            <div className="max-w-3xl space-y-4">
              {faqData.map((item, i) => (
                <RevealSection key={item.id} delay={i * 60}>
                  <details className="border border-gray-200 group">
                    <summary className="flex items-center justify-between p-5 cursor-pointer font-[Oswald] uppercase text-gray-900 hover:text-[#660066] transition-colors">
                      {item.question[l]}
                      <span className="text-[#660066] text-xl group-open:rotate-45 transition-transform duration-200">+</span>
                    </summary>
                    <div className="px-5 pb-5 text-gray-600 text-sm leading-relaxed">
                      {item.answer[l]}
                    </div>
                  </details>
                </RevealSection>
              ))}
            </div>
          </RevealSection>
        </div>
      </section>
    </div>
  );
}
