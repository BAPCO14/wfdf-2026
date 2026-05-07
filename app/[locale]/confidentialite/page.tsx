import { ORGANIZER } from "@/lib/constants";
import type { Metadata } from "next";

export const metadata: Metadata = { title: "Politique de confidentialité" };

export default function Confidentialite() {
  return (
    <div className="pt-20 py-20">
      <div className="max-w-3xl mx-auto px-4 prose prose-gray">
        <h1 className="font-[Oswald] text-4xl uppercase text-gray-900 mb-8">Politique de confidentialité</h1>

        <h2>Responsable du traitement</h2>
        <p>{ORGANIZER.name} — {ORGANIZER.email}</p>

        <h2>Données collectées</h2>
        <p>Nous collectons uniquement les données strictement nécessaires :</p>
        <ul>
          <li><strong>Formulaire de contact</strong> : nom, email, sujet, message</li>
          <li><strong>Inscription tournois</strong> : nom, prénom, email, téléphone, numéro de licence (facultatif)</li>
          <li><strong>Newsletter</strong> : email uniquement (double opt-in obligatoire)</li>
          <li><strong>Work'N'Play</strong> : raison sociale, contact, email, téléphone, nombre de participants</li>
        </ul>

        <h2>Finalités et bases légales</h2>
        <ul>
          <li>Gestion des inscriptions aux tournois (exécution du contrat)</li>
          <li>Communication par email (consentement explicite)</li>
          <li>Réponse aux demandes de contact (intérêt légitime)</li>
        </ul>

        <h2>Conservation des données</h2>
        <p>Les données sont conservées le temps nécessaire à la réalisation des finalités, et au maximum 3 ans après le dernier contact.</p>

        <h2>Cookies</h2>
        <p>Aucun cookie de tracking n'est déposé par défaut. Voir notre <a href="/fr/cookies">politique de cookies</a>.</p>

        <h2>Vos droits</h2>
        <p>Vous disposez d'un droit d'accès, de rectification, d'effacement, et d'opposition. Contactez : <a href={`mailto:${ORGANIZER.email}`}>{ORGANIZER.email}</a></p>

        <h2>Réclamation</h2>
        <p>Vous pouvez adresser une réclamation à la CNIL : <a href="https://www.cnil.fr" target="_blank" rel="noopener">www.cnil.fr</a></p>
      </div>
    </div>
  );
}
