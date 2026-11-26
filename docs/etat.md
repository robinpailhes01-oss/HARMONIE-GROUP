# État d'Harmonie Group

**Dernière mise à jour : 22/11/2026 (soir) — session HARMONIE GROUP**

## Où on en est
- **Étape 1 (inventaire)** : faite le 22/11, en lecture seule. Résultat résumé plus bas.
- **Étape 2 (proposition)** : faite ; réponses de Robin le 22/11 (ci-dessous).
- **Étape 3, PR 1 : la carapace** — en ligne sur harmoniegroup.vercel.app (projet Vercel `harmoniegroup`, créé par Robin le 22/11, branche `claude/vibrant-goodall-4hnpna`). Design verre v3 + connexion animée (mot de passe puis 6 cases de verre, d’après l’exemple « Glassy OTP »). **Aucune donnée branchée.**

## Fait le 22/11 (soir)
- Connexion testée en production par Robin (mot de passe + code Google Authenticator) : elle marche. Cause du premier échec : la clé du code dans Vercel n'était pas celle de l'application ; corrigée en rescannant le QR de la clé déjà enregistrée.
- Journal serveur des refus de connexion (`[connexion] refus`, sans aucun secret) : lisible dans les journaux Vercel.

- Mode démo ajouté puis **supprimé à la demande de Robin** (22/11). Restent : la structure réelle (graphique par mois, « À retenir », listes, outils et agents réels) en état vide « Pas branché », et les composants graphiques (`GrapheBarres`, `Sparkline`, `Lignes`) prêts pour les vraies données.
- Relais envoyé au QG (id f8bbdcb9-80c5-4991-b10b-2c5fb56a71d5, expéditeur `robin` car « harmonie-group » n'est pas un nom accepté) : schéma `groupe` + rôle `groupe_lecture` sur luma-agence, vue datée des encaissements pour 2027.

## Fait le 23/11
- Base Supabase **harmonie-group** (`khmnmpyyjootyfiaywzp`, Paris, organisation LUMA AGENCE, gratuite) créée avec l'OK de Robin : `hg_agents` (35 lignes), `hg_outils` (16), `hg_temps_standard` (5 temps validés), `hg_reglages`. RLS sans policy : seule la clé service (serveur) lit et écrit.
- Pages **Équipe** (organigramme, statut modifiable d'un clic) et **Journal** (méthode de calcul visible ; fil et gains en attente de l'accès Luma/HY).
- Onglet Luma : CA de l'année, MRR signé, paiements à venir, clients signés, CA mensuel, clients chauds et paiements à venir. Icônes refaites (galets colorés).
- Relais QG n°2 (ac7b0e4d) : champ MRR, règle « clients chauds », échéancier des paiements.
- Valeur d'une heure de Robin : non réglée (repère : 225 €/h sur 2 affaires Luma, 4 h).

## Décidé (Robin, 26/11/2026)
| Sujet | Décision |
|---|---|
| Supabase | Rester gratuit pour l'instant (2 comptes). Regrouper les 3 projets coûterait ≈ 45 $/mois (Pro) : à revoir quand Harmonie Yacht passera en Pro. |
| Qonto | Appartient à Harmonie Group : copie et classement Luma / Harmonie Yacht / Perso dans la base du groupe uniquement. |
| Organisation des agents | Activités indépendantes en dessous, tout centralisé au-dessus : un **Directeur général** (point d'entrée Telegram unique) → managers par activité. |
| Jarvis | Simple test, abandonné. Le Directeur général part de zéro. |

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
6. `main` créée le 22/11 avec l'accord de Robin (depuis la branche de travail, commit f0649b3). Reste à Robin : branche par défaut GitHub = `main`, branche de production Vercel = `main`. Ensuite : une PR par étape vers `main`.
7. Projet Vercel : Robin met `HG_PASSWORD` et `HG_TOTP_ENROLL=1`, ouvre /connexion/activer-code, scanne le QR, colle la clé affichée dans `HG_TOTP_SECRET`, supprime `HG_TOTP_ENROLL`, redéploie.

8. Sécurité de la connexion à renforcer avant d'y brancher les données : limite d'essais par IP (pare-feu Vercel), refus d'un code TOTP déjà utilisé, `HG_TOTP_ENROLL` à retirer juste après le scan (tant qu'il vaut 1, le mot de passe seul montre le QR code). Couper toutes les sessions : changer `HG_SESSION_SECRET`.

## Reste à faire
- PR 1 : Preview testée par Robin.
- Ensuite : agent comptable, accès lecture seule (avec OK), branchement des chiffres un par un avec la requête montrée.
