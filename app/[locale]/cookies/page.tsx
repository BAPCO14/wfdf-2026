import type { Metadata } from "next";

export const metadata: Metadata = { title: "Politique de cookies" };

export default function CookiesPage() {
  return (
    <div className="pt-20 py-20">
      <div className="max-w-3xl mx-auto px-4 prose prose-gray">
        <h1 className="font-[Oswald] text-4xl uppercase text-gray-900 mb-8">Politique de cookies</h1>

        <h2>Cookies strictement nécessaires</h2>
        <p>Ce site utilise uniquement des cookies strictement nécessaires à son fonctionnement (session Next.js). Aucun cookie de tracking, publicité ou analytics n'est déposé sans votre consentement.</p>

        <h2>Cookies tiers</h2>
        <p>Le formulaire Work'N'Play utilise <strong>Cloudflare Turnstile</strong> pour la protection anti-spam. Ce service peut déposer un cookie technique le temps de la vérification.</p>

        <h2>Gestion des cookies</h2>
        <p>Vous pouvez configurer votre navigateur pour refuser les cookies. Cela n'affecte pas la navigation sur ce site.</p>

        <table>
          <thead><tr><th>Cookie</th><th>Origine</th><th>Durée</th><th>Finalité</th></tr></thead>
          <tbody>
            <tr><td>__cf_bm</td><td>Cloudflare</td><td>30 min</td><td>Protection anti-bot (formulaires uniquement)</td></tr>
          </tbody>
        </table>
      </div>
    </div>
  );
}
