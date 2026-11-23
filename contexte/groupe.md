# Le groupe : activités, comptes, dépôts

Mis à jour le 22/11/2026. Les chiffres ne vivent jamais ici : ils sont dans les bases.

## Les activités
| | Luma | Harmonie Yacht |
|---|---|---|
| Quoi | Agence IA pour dirigeants de PME (B2B) | Yacht de 12 m : nuits insolites et sorties en mer privatisées, 10 personnes au plus |
| Public | Dirigeants de PME | Familles, anniversaires, mariages, EVJF/EVG, petites entreprises |
| Lieu | Montpellier | Carnon, puis Sète à partir d'avril 2027. Fermé de début décembre à début avril |
| Instagram | @luma_agence | Compte propre, géré par la femme de Robin |
| Contexte détaillé | `robin-LP/luma-context/` | `IA-HY-INFRA-NEW/hy-context/` |

Une troisième activité est possible plus tard. Personne d'autre que Robin n'a d'accès pour l'instant.

## L'argent
| Compte | Rôle |
|---|---|
| Qonto | Le compte de l'entreprise (un SIREN pour les deux activités) + des dépenses perso. Synchronisé toutes les heures par Harmonie Yacht (table `bank_transactions`) |
| Revolut, DeBlock | Perso uniquement : onglet Perso, jamais la compta de l'entreprise |
| SumUp, Stripe | Encaissements d'Harmonie Yacht |

Logiciels partagés : 50/50 entre Luma et Harmonie Yacht. SIREN **991738733**, forme **SAS** (donnés par Robin le 23/11). Les ventes sont à 20 % de TVA selon Robin ; le régime exact et l'expert-comptable : voir `questions-ouvertes.md`.

## Dépôts, bases, mise en ligne
| Dépôt | Rôle | Base Supabase | Mise en ligne |
|---|---|---|---|
| `harmonie-group` | Le centre : tableau de pilotage, manager, comptable, ce contexte | Aucune (lit les deux autres) | Vercel |
| `robin-LP` | L'atelier Luma : site, studio, propositions, agents de Luma | `luma-agence` (`neuyffidnykfsabiqruy`) | Vercel |
| `IA-HY-INFRA-NEW` | L'atelier Harmonie Yacht : tableau de bord, Léa | `fscrhzxpmxvejrhppftc` (pas encore accessible au connecteur Supabase de Claude) | Vercel `ia-hy-infra-new`, production sur `main` |
| `TESTE-HYSITE` | Site public harmonie-yacht.fr | Celle d'Harmonie Yacht | Vercel `teste-hysite` |
| Un dépôt par client de Luma | Le projet livré au client | Propre au client | — |

`HY-SITE-` n'est pas le site en ligne. Les clés sont dans Vercel et les secrets Supabase, jamais ici.
