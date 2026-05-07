# Plan de sécurité WFDF 2026

## Principes fondamentaux
- Zéro base SQL — données chez Resend / Brevo uniquement
- Validation Zod côté client ET serveur sur tous les inputs
- Sanitization HTML via isomorphic-dompurify
- Aucun cookie tracking par défaut

## Couche API
- Rate limiting Upstash Redis : 5 req/min par IP
- CSRF : validation Origin header sur toutes les méthodes mutantes (POST/PUT/DELETE)
- Honeypot dans tous les formulaires (`<input name="website" type="text" style="display:none" />`)
- Cloudflare Turnstile sur le formulaire Work'N'Play uniquement

## Headers HTTP (via next.config.ts)
- Content-Security-Policy strict
- HSTS max-age=63072000
- X-Frame-Options: DENY
- X-Content-Type-Options: nosniff
- Referrer-Policy: strict-origin-when-cross-origin
- Permissions-Policy: camera=(), microphone=(), geolocation=()

## Blocage bots malveillants
- Middleware : blocage user-agents (sqlmap, nikto, masscan, zgrab, dirbuster, nuclei)

## Secrets
- Toutes les clés dans .env.local (jamais committé)
- .env.example commité avec placeholders
- Pre-commit hook husky + lint-staged scan secrets (AKIA, sk-, ghp_, xoxb-)

## Objectifs audit
- Mozilla Observatory : grade A ou A+
- Lighthouse Best Practices ≥ 95
