# PROJECT BRIEF — Winamax French Darts Festival 2026

## 1. Identité du projet
**Nom officiel :** Winamax French Darts Festival 2026 (WFDF)  
**Édition :** 2ème  
**Dates :** 4, 5 & 6 décembre 2026  
**Lieu :** Parc des Expositions de Caen, Hall 3  
**Organisateur :** French Darts SAS  
**Contact :** contact@frenchdartsfestival.fr  

## 2. Objectifs du site
- Vitrine du festival (innovante, mémorable)
- Hub d'inscription aux tournois
- Outil de communication FR/EN
- Programme Work'N'Play entreprises
- Vente de places Soirée de Gala

## 3. Features prioritaires
Voir section INNOVATION ATTENDUE dans PROMPT_FOR_CLAUDE_CODE.md

## 4. Identité visuelle
- Ratio : 80% blanc / 20% violet (#660066)
- Rouge Winamax (#E40520) : section partenaire UNIQUEMENT + logo officiel
- Polices : Oswald (titres) / Manrope (corps) / JetBrains Mono (chiffres)
- Logo officiel WFDF : assets/logos/wfdf-official.png (nav + footer)
- Logo organisateur French Darts : assets/logos/french-darts-organizer.png (mentions légales uniquement)

## 5. Structure des pages
- `/` → redirection vers `/fr` ou `/en`
- `/[locale]` → Page d'accueil
- `/[locale]/tournois` → Hub 8 tournois
- `/[locale]/tournois/[slug]` → Page tournoi individuelle
- `/[locale]/soiree-gala` → Soirée de Gala
- `/[locale]/le-village` → Village + plan SVG interactif
- `/[locale]/programme` → Planning 3 jours
- `/[locale]/infos-pratiques` → FAQ + accès + parking
- `/[locale]/worknplay` → Programme entreprises
- `/[locale]/contact` → Formulaire de contact
- `/[locale]/mentions-legales` → Légal
- `/[locale]/confidentialite` → RGPD
- `/[locale]/cookies` → Cookies

## 6. Tournois (8 au total)
1. Winamax Open (open, 10 000€, 128 joueurs)
2. Grand Prix de Normandie (régional, 5 000€, 64 joueurs)
3. Coupe de Caen (ville, 2 000€, 64 joueurs)
4. Ladies Cup (féminin, 3 000€, 32 joueurs)
5. Youth Championship (moins de 21 ans, 1 500€, 32 joueurs)
6. Doubles Challenge (paires, 4 000€, 32 équipes)
7. Masters Invitational (sur invitation, 8 000€, 16 joueurs)
8. Fun & Amateur (tous niveaux, 500€, 256 joueurs)

## 7. Pros invités 2026
1. Luke Littler (Anglais, #1 mondial)
2. Michael van Gerwen (Néerlandais, #3 mondial)
3. Gerwyn Price (Gallois, #6 mondial)

## 8. Partenaires (8)
1. Winamax (titre) — #E40520
2. Ville de Caen (institutionnel)
3. Normandie Tourisme (institutionnel)
4. BTV Bretagne (média)
5. Target Darts (équipementier)
6. Red Dragon Darts (équipementier)
7. Unicorn Darts (équipementier)
8. Département du Calvados (institutionnel)
⚠️ Twisto n'est PAS partenaire 2026

## 9. Sécurité
Voir preset/security/SECURITY.md

## 10. Plan de travail (9 étapes)
1. Setup Next.js 14 + Tailwind + shadcn
2. Intégration preset
3. Couche sécurité
4. Layout global
5. Page d'accueil
6. Pages tournois
7. Gala + Village
8. Pages secondaires + API
9. SEO + déploiement

## 11. Stack technique
- Next.js 14 (App Router)
- TypeScript strict
- Tailwind CSS
- Framer Motion
- next-intl (i18n FR/EN)
- Zod + react-hook-form
- Resend (emails)
- Brevo (newsletter double opt-in)
- Upstash Redis (rate limiting)
- Cloudflare Turnstile (anti-spam WnP)
- Vercel (hébergement)

## 12. Critères de livraison
- Lighthouse ≥ 95 (perf, accessibilité, SEO, Best Practices)
- Mozilla Observatory grade A ou A+
- Mobile-first responsive
- i18n FR/EN fonctionnel
- TypeScript strict (zéro any)
- Zéro secret committé
