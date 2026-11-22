# État d'Harmonie Group

**Dernière mise à jour : 22/11/2026 — session HARMONIE GROUP**

## Où on en est
- **Étape 1 (inventaire)** : faite le 22/11, en lecture seule. Résultat résumé plus bas.
- **Étape 2 (proposition)** : faite ; réponses de Robin le 22/11 (ci-dessous).
- **Étape 3, PR 1 : la carapace** — en cours : connexion mot de passe + code, 4 onglets aux couleurs de chaque espace, clair/sombre, mobile, états vides. **Aucune donnée branchée.**

## Décidé (Robin, 22/11/2026)
| Sujet | Décision |
|---|---|
| Classement Luma / Harmonie Yacht / Perso des mouvements Qonto | Fait par un **agent comptable** (à créer), Robin ne valide que les cas douteux |
| Période du CA | Année civile, du 1er janvier au 31 décembre |
| Connexion | Mot de passe + code à 6 chiffres qui change (Google Authenticator) |
| Accès aux bases (rôles, vues lecture seule) | Plus tard, quand on créera les agents |
| Pour l'instant | Construire seulement la carapace |
| Obsidian (2ᵉ cerveau) | Idée retenue pour plus tard ; les notes du dépôt sont en Markdown, ouvrables telles quelles |

## Inventaire (22/11/2026)
| | Luma | Harmonie Yacht |
|---|---|---|
| Dépôt | `robin-lp` (Next 16) | `IA-HY-INFRA-NEW` (Next 15), prod sur la branche `claude/keen-cray-IEgV8` |
| Base | `luma-agence` (`neuyffidnykfsabiqruy`) | `fscrhzxpmxvejrhppftc` (pas accessible au connecteur Supabase de Claude) |
| Chiffres | `luma_v_stats`, `luma_v_pipeline`, `luma_v_actions_dues`, `luma_taches`, `luma_v_relais_ouverts` | `financial_snapshots` (quotidien), `revenues`, `bookings`, `leads` |
| Qonto | `lib/studio/qonto.ts` (factures, encaissements) ; pas de table de transactions | Synchronise **tout** le compte : `bank_transactions`, règles comptables |
| Lecture seule | Seulement `hermes_lecture` (ne voit pas les stats) | Aucune |

## Points ouverts
1. **Conflit avec `luma-context/decisions.md`** : la décision du 10/11 parle de `lib/qonto/` (PROPOSITION) ; ce dossier n'existe pas, le code est dans `lib/studio/qonto.ts`, et Harmonie Yacht a sa propre synchro Qonto. Harmonie Group n'ajoutera pas de 3ᵉ code Qonto : il lira les transactions synchronisées par Harmonie Yacht. Relais au QG à envoyer quand on branchera les données.
2. La compta d'Harmonie Yacht contient probablement aussi les mouvements Luma et perso (même compte Qonto).
3. Restauration Harmonie Yacht incomplète (4 820 / 4 880 lignes) : ses chiffres peuvent être faux d'ici là.
4. Luma n'a pas de CA daté (`luma_v_stats` est un cumul) : pour l'année civile 2027, il faudra une vue datée (relais au QG).
5. Accès de Claude à la base Harmonie Yacht : invitation de l'adresse du compte Supabase de Luma dans l'organisation `harmonieyacht` (rôle Developer), quand Robin le décidera.
6. `main` n'existe pas encore dans ce dépôt (il était vide) : OK de Robin nécessaire pour la créer et ouvrir la PR.
7. Projet Vercel à créer, puis variables `HG_PASSWORD`, `HG_SESSION_SECRET`, `HG_TOTP_SECRET`, `HG_TOTP_ENROLL` (Production et Preview).

8. Sécurité de la connexion à renforcer avant d'y brancher les données : limite d'essais par IP (pare-feu Vercel), refus d'un code TOTP déjà utilisé, `HG_TOTP_ENROLL` à retirer juste après le scan (tant qu'il vaut 1, le mot de passe seul montre le QR code). Couper toutes les sessions : changer `HG_SESSION_SECRET`.

## Reste à faire
- PR 1 : Preview testée par Robin.
- Ensuite : agent comptable, accès lecture seule (avec OK), branchement des chiffres un par un avec la requête montrée.
