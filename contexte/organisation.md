# Organisation : qui fait quoi

Mis à jour le 22/11/2026. Cible voulue par Robin, puis ce qui existe aujourd'hui.

## La cible
- **Le manager** (global, sur Telegram) reçoit tout de Robin (vocal, texte, photo de ticket), distribue aux agents et **n'exécute rien lui-même**. Il ne modifie aucun projet : il transmet la tâche à la session qui le possède. En cas de doute sur l'agent, il demande à Robin.
- **Les agents par métier** servent les deux activités, sans doublon. Le tableau de pilotage affiche une vue « équipe Luma » et une vue « équipe Harmonie Yacht ».
- Messages spontanés du manager : seulement les urgences (prospect très chaud, bug sur un projet client), à toute heure. Erreur d'un agent : Robin est prévenu tout de suite. Mise en ligne : toujours l'OK de Robin.

## Les agents
| Agent | Rôle | Vit dans | État au 22/11 |
|---|---|---|---|
| Le manager | Reçoit, distribue, suit, prévient | `harmonie-group` | À construire. Remplace QG, `manager-luma` et le Manager Telegram d'Harmonie Yacht |
| Le comptable | Classe les dépenses (Luma / HY / Perso / 50-50), factures et devis, justificatifs, point du lundi | `harmonie-group` | **Prochain agent à construire** |
| Le contenu | Contenu des deux activités, deux calendriers séparés | `harmonie-group` | Plus tard |
| Simon | Prospection à froid de Luma | `robin-lp` | Existe, à remettre à jour |
| Jordan | Ventes de Luma : RDV, relances, propositions | `robin-lp` | Existe, à remettre à jour |
| Don (+ créatif, analyste, stratège, design) | Pub Meta de Luma | `robin-lp` | Existe, à remettre à jour |
| Lecteur-avatar, critique vidéo, montage | Relecture et vidéo de Luma | `robin-lp` | Existe, à remettre à jour |
| Léa | Ventes d'Harmonie Yacht : WhatsApp, Instagram, mail, relances | `IA-HY-INFRA-NEW` (fonctions Supabase) | En production |

## Qui possède quoi
| Quoi | Propriétaire |
|---|---|
| `harmonie-group` (contexte commun, tableau de pilotage, manager, comptable) | Session HARMONIE GROUP |
| `robin-lp` | Sessions Luma (voir `robin-lp/CLAUDE.md`) |
| `IA-HY-INFRA-NEW` | Session HARMONIE YACHT |
| Les factures (Luma et Harmonie Yacht) | Le comptable |
| Un dépôt client | La session de ce client. Le manager lui transmet les résumés d'appels |

## Comment le travail circule
- Aujourd'hui chez Luma : les **relais** (table `luma_relais`, `robin-lp/docs/relais.md`) et les tâches (`luma_taches`), tenus par QG.
- **À trancher** : ce que deviennent les relais quand le manager remplace QG, et le rôle d'Hermes (voir `questions-ouvertes.md`).
