import { ORGANIZER } from "@/lib/constants";
import type { Metadata } from "next";

export const metadata: Metadata = { title: "Mentions légales" };

export default function MentionsLegales() {
  return (
    <div className="pt-20 py-20">
      <div className="max-w-3xl mx-auto px-4 prose prose-gray">
        <h1 className="font-[Oswald] text-4xl uppercase text-gray-900 mb-8">Mentions légales</h1>

        <h2>Éditeur du site</h2>
        <p>
          <strong>{ORGANIZER.name}</strong><br />
          {ORGANIZER.legalForm}<br />
          SIRET : {ORGANIZER.siret}<br />
          Adresse : {ORGANIZER.address}<br />
          Email : {ORGANIZER.email}<br />
          Directeur de publication : {ORGANIZER.director}
        </p>

        <h2>Hébergeur</h2>
        <p>
          {ORGANIZER.hostProvider.name}<br />
          {ORGANIZER.hostProvider.address}
        </p>

        <h2>Propriété intellectuelle</h2>
        <p>
          L'ensemble du contenu de ce site (textes, images, logos, vidéos) est la propriété exclusive de {ORGANIZER.name} ou de ses partenaires. Toute reproduction, totale ou partielle, est interdite sans autorisation préalable.
        </p>

        <h2>Liens hypertextes</h2>
        <p>
          {ORGANIZER.name} décline toute responsabilité concernant les contenus des sites externes accessibles via les liens hypertextes présents sur ce site.
        </p>

        <h2>Contact</h2>
        <p>Pour toute question : <a href={`mailto:${ORGANIZER.email}`}>{ORGANIZER.email}</a></p>
      </div>
    </div>
  );
}
