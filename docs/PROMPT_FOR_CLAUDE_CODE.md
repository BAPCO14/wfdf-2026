# PROMPT POUR CLAUDE CODE — WFDF 2026

Coller ce prompt au démarrage d'une nouvelle session Claude Code dans ce répertoire.

---

Bonjour Claude Code.

Tu vas continuer le développement du site Winamax French Darts Festival 2026 (WFDF).

## LECTURE OBLIGATOIRE (dans cet ordre)

1. `PROJECT_BRIEF.md` — contexte projet complet
2. `preset/README.md` — fichiers preset et règles de modification
3. `preset/security/SECURITY.md` — plan sécurité non-négociable
4. `preset/security/INCIDENT_RESPONSE.md` — procédures incident
5. `reference/design-reference-v08.html` — démo visuelle validée

## ARCHITECTURE ACTUELLE

```
app/
  layout.tsx              # Root layout
  page.tsx                # Redirection /fr ou /en
  sitemap.ts              # Sitemap automatique
  robots.ts               # robots.txt
  globals.css             # Styles globaux
  [locale]/
    layout.tsx            # Layout avec Header/Footer/Cursor/etc.
    page.tsx              # Page d'accueil
    tournois/
      page.tsx            # Hub 8 tournois
      [slug]/page.tsx     # Page tournoi individuelle
    soiree-gala/page.tsx
    le-village/page.tsx   # + VillageMap SVG interactif
    programme/page.tsx
    infos-pratiques/page.tsx
    worknplay/page.tsx    # + Cloudflare Turnstile
    contact/page.tsx
    mentions-legales/
    confidentialite/
    cookies/
  api/
    newsletter/route.ts   # Brevo double opt-in + rate limit + honeypot
    contact/route.ts      # Resend + rate limit + honeypot
    inscription/route.ts  # Resend + rate limit + honeypot
    worknplay/route.ts    # Resend + Turnstile + rate limit + honeypot

components/
  layout/   Header, Footer, MobileNav, CustomCursor, ScrollProgress, DartEasterEgg
  home/     HeroSection, Countdown, ProCard, RevealSection, NewsletterForm
  village/  VillageMap (SVG cliquable 8 zones)
  forms/    ContactForm, InscriptionForm, WorkNPlayForm

lib/
  constants.ts    # Données structurantes (SITE, EVENT, BRAND, ORGANIZER)
  utils.ts        # cn(), formatCurrency(), getCountdown()
  validations.ts  # Schémas Zod (contact, newsletter, inscription, worknplay)
  rate-limit.ts   # Upstash Redis rate limiter

content/          # JSONs modifiables par le client
  pros.json, tournaments.json, partners.json, faq.json

messages/         # i18n
  fr.json, en.json

preset/           # Sources à ne pas modifier directement
  styles/, content/, security/
```

## RÈGLES NON-NÉGOCIABLES

- Violet : `#660066` (extrait officiel)
- Rouge Winamax : `#E40520` (section partenaire + logo uniquement)
- Ratio 80% blanc / 20% violet
- TypeScript strict (zéro `any`)
- Validation Zod sur tous les inputs
- Rate limiting sur toutes les API routes
- Honeypot dans tous les formulaires
- Aucune clé API dans le code (`.env.local` uniquement)

## AVANT DE CODER

1. Confirme que tu as lu les 5 documents
2. Résume en 5 lignes ta compréhension
3. Présente ton plan avec alternatives techniques
4. Attends ma validation

**N'écris pas de code avant validation du plan.**
