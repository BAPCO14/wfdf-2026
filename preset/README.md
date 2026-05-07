# Fichiers Preset — WFDF 2026

## Contenu modifiable sans toucher au code

| Fichier | Destination | Ce que vous pouvez modifier |
|---------|-------------|---------------------------|
| `content/constants.ts` | `lib/constants.ts` | Dates, lieu, réseaux sociaux, email |
| `content/pros.json` | `content/pros.json` | Noms, bios, stats, photos des pros |
| `content/tournaments.json` | `content/tournaments.json` | Tournois : dates, prize pool, description |
| `content/partners.json` | `content/partners.json` | Partenaires, logos, URLs |
| `content/faq.json` | `content/faq.json` | Questions/réponses FAQ |
| `styles/globals.css` | `app/globals.css` | Variables CSS, animations |
| `styles/tailwind.config.ts` | `tailwind.config.ts` | Couleurs, polices, keyframes |

## Règles structurantes — NE PAS MODIFIER sans validation

- Couleur violet : `#660066` (extraite du site officiel)
- Couleur Winamax : `#E40520` (uniquement section partenaire + logo officiel)
- Polices : Oswald (titres), Manrope (corps), JetBrains Mono (chiffres)
- Ratio : 80% blanc / 20% violet

## Sécurité

Voir `security/SECURITY.md` et `security/INCIDENT_RESPONSE.md`.
Les clés API vont dans `.env.local` (jamais committé).
Copier `.env.example` → `.env.local` et remplir les valeurs.
