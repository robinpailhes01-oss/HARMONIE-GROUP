# État d'Harmonie Group

**Dernière mise à jour : 23/11/2026 — session HARMONIE GROUP (reconfiguration du contexte)**

## Où on en est
- **Contexte fusionné** dans `main` le 23/11 (PR #2). La production du tableau de pilotage suit `main`.
- **Contexte commun** : en place dans `contexte/` (socle, groupe, organisation, voix, décisions, questions ouvertes, index). Le socle est installé dans chaque nouvelle session de l'environnement cloud « Robin » par son script de démarrage (à confirmer à la prochaine session neuve).
- **Tableau de pilotage** : la carapace est en ligne sur harmoniegroup.vercel.app (connexion validée par Robin le 22/11). Aucune donnée branchée ; pas de mode démo.
- **Prochain agent** : le comptable (nouvelle conversation, message de démarrage prêt).

## À faire
2. Sécurité de la connexion avant de brancher des données : limite d'essais par IP (pare-feu Vercel), refus d'un code déjà utilisé, retirer `HG_TOTP_ENROLL` après le scan. Couper toutes les sessions : changer `HG_SESSION_SECRET`.
3. Accès en lecture seule aux bases : relais envoyé au QG le 22/11 (id f8bbdcb9-80c5-4991-b10b-2c5fb56a71d5) pour un schéma `groupe` + rôle `groupe_lecture` sur `luma-agence` et une vue datée des encaissements. Base Harmonie Yacht : inviter le compte Supabase de Claude dans l'organisation `harmonieyacht` (rôle Developer), quand Robin le décide.

## Points d'attention
- Qonto : la décision Luma du 10/11 cite `lib/qonto/`, qui n'existe pas (le code est dans `robin-lp/lib/studio/qonto.ts`). Le groupe lit les transactions synchronisées par Harmonie Yacht.
- La compta d'Harmonie Yacht contient aussi les mouvements Luma et perso (même compte Qonto).
- Restauration Harmonie Yacht incomplète (4 820 / 4 880 lignes) : ses chiffres peuvent être faux d'ici là.
- Luma n'a pas de CA daté (`luma_v_stats` est un cumul) : il faudra une vue datée pour l'année 2027.
- Période du CA : année civile (décision du 22/11).

## À vérifier (26/11/2026)
- **Avoir `A-2026-001` (−490 €) + facture `F-2026-012` (490 €) sur LAYONN INVEST** : faits sur la base d'un virement du 31/10/**2025** (« PAIEMENT LOGICIEL IA », facture `F-2025-001` « prospection commerciale »). Or la base Luma dit que la V1 de Lovexplorer (agent Céleste) vaut **450 € TTC, encaissés**, et sa proposition la date du 16/10/**2026**. L'identification V1 = F-2025-001 est donc probablement fausse. Les factures ont déjà été envoyées au client. À trancher avec Robin avant toute autre écriture.
- Mot de passe du rôle `groupe_lecture` : tapé dans le chat par Robin (donc à changer) ; variable `COMPTA_LECTURE_URL` pas encore posée dans Vercel.
