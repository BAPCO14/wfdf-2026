import ContactForm from "@/components/forms/ContactForm";
import RevealSection from "@/components/home/RevealSection";
import { SITE, EVENT } from "@/lib/constants";
import type { Metadata } from "next";

export const metadata: Metadata = { title: "Contact" };

export default function ContactPage({ params: { locale } }: { params: { locale: string } }) {
  const l = locale as "fr" | "en";
  return (
    <div className="pt-20">
      <section className="bg-gray-900 text-white py-16">
        <div className="max-w-7xl mx-auto px-4">
          <h1 className="section-title text-white"><span className="text-[#cc00cc]">Contact</span></h1>
        </div>
      </section>
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-1 lg:grid-cols-2 gap-16">
          <RevealSection>
            <ContactForm locale={locale} />
          </RevealSection>
          <RevealSection delay={150}>
            <div className="space-y-6">
              {[
                { label: "Email", value: SITE.email, href: `mailto:${SITE.email}` },
                { label: l === "fr" ? "Téléphone" : "Phone", value: SITE.phone, href: `tel:${SITE.phone}` },
                { label: l === "fr" ? "Lieu" : "Venue", value: `${EVENT.venue.name}, ${EVENT.venue.hall}, ${EVENT.venue.zip} ${EVENT.venue.city}`, href: EVENT.venue.googleMapsUrl },
              ].map(({ label, value, href }) => (
                <div key={label} className="border-b border-gray-100 pb-4">
                  <div className="font-[Oswald] uppercase text-xs text-gray-400 tracking-widest mb-1">{label}</div>
                  <a href={href} className="text-gray-900 hover:text-[#660066] transition-colors">{value}</a>
                </div>
              ))}
            </div>
          </RevealSection>
        </div>
      </section>
    </div>
  );
}
