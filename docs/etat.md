# État d'Harmonie Group

**Dernière mise à jour : 23/11/2026 — session HARMONIE GROUP (reconfiguration du contexte)**

## Où on en est
- **Contexte commun** : en place dans `contexte/` (socle, groupe, organisation, voix, décisions, questions ouvertes, index). Le socle est installé dans chaque nouvelle session de l'environnement cloud « Robin » par son script de démarrage (à confirmer à la prochaine session neuve).
- **Tableau de pilotage** : la carapace est en ligne sur harmoniegroup.vercel.app (connexion validée par Robin le 22/11). Aucune donnée branchée ; pas de mode démo.
- **Prochain agent** : le comptable (nouvelle conversation, message de démarrage prêt).

## À faire
1. **Production du tableau de pilotage** : Vercel `harmoniegroup` met en ligne depuis `claude/vibrant-goodall-4hnpna`, pas depuis `main`. Même bascule que pour Harmonie Yacht : Robin règle Vercel → Settings → Environments → Production → `main`.
2. Sécurité de la connexion avant de brancher des données : limite d'essais par IP (pare-feu Vercel), refus d'un code déjà utilisé, retirer `HG_TOTP_ENROLL` après le scan. Couper toutes les sessions : changer `HG_SESSION_SECRET`.
3. Accès en lecture seule aux bases : relais envoyé au QG le 22/11 (id f8bbdcb9-80c5-4991-b10b-2c5fb56a71d5) pour un schéma `groupe` + rôle `groupe_lecture` sur `luma-agence` et une vue datée des encaissements. Base Harmonie Yacht : inviter le compte Supabase de Claude dans l'organisation `harmonieyacht` (rôle Developer), quand Robin le décide.
4. Ouvrir la PR de la reconfiguration du contexte (branche `claude/optimistic-bohr-3h5fye`).

## Points d'attention
- Qonto : la décision Luma du 10/11 cite `lib/qonto/`, qui n'existe pas (le code est dans `robin-lp/lib/studio/qonto.ts`). Le groupe lit les transactions synchronisées par Harmonie Yacht.
- La compta d'Harmonie Yacht contient aussi les mouvements Luma et perso (même compte Qonto).
- Restauration Harmonie Yacht incomplète (4 820 / 4 880 lignes) : ses chiffres peuvent être faux d'ici là.
- Luma n'a pas de CA daté (`luma_v_stats` est un cumul) : il faudra une vue datée pour l'année 2027.
- Période du CA : année civile (décision du 22/11).
