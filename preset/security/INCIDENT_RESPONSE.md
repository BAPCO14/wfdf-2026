# Procédures de réponse aux incidents — WFDF 2026

## Niveaux d'alerte
- **P1** : Fuite de données utilisateurs, injection réussie, accès non autorisé
- **P2** : Tentatives d'intrusion répétées, rate limit déclenché massivement
- **P3** : Bot crawling, formulaire spam

## Procédure P1
1. Couper l'API route concernée via feature flag `.env.local`
2. Notifier cormier.baptiste14@gmail.com dans les 30 min
3. Vérifier les logs Upstash Redis pour l'IP source
4. Invalider tous les tokens actifs si OAuth configuré
5. Rédiger rapport d'incident dans `/docs/incidents/`

## Procédure P2
1. Augmenter le rate limit dans `/app/api/[route]/route.ts`
2. Ajouter l'IP au blocklist dans `middleware.ts`
3. Vérifier les patterns dans les logs Vercel

## Procédure P3
1. Ajouter l'user-agent au blocklist dans `middleware.ts`
2. Renforcer les règles Cloudflare si nécessaire

## Contacts
- Dev : cormier.baptiste14@gmail.com
- Hébergement : Vercel dashboard
- Redis : Upstash console
- Emails : Resend dashboard
