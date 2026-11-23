# Harmonie Group — le centre

Ce dépôt est le centre de tout ce que fait Robin. Il contient :
- **le contexte commun** (`contexte/`) : lis `contexte/INDEX.md` pour savoir quoi lire. Le socle est déjà chargé dans ta session ;
- **le tableau de pilotage** : application web privée, l'essentiel de l'entreprise sur 4 onglets (Groupe, Luma, Harmonie Yacht, Perso) ;
- **les agents communs** (à venir dans `.claude/agents/` et `.claude/skills/`) : le manager, le comptable, le contenu.

## Au début de chaque conversation
Lis `contexte/decisions.md` et `docs/etat.md`. Une décision de Robin va tout de suite dans `contexte/decisions.md` (ou dans le fichier de décisions de l'activité qu'elle concerne).

## Le tableau de pilotage
- Il ne remplace rien : le studio Luma et le tableau de bord d'Harmonie Yacht restent les outils de détail. Ici, l'essentiel seulement, en lecture seule.
- Les indicateurs et leur source : `lib/indicateurs.ts`. Chaque chiffre affiche sa source (table ou Qonto) et sa date.
- Connexion obligatoire : mot de passe + code à 6 chiffres (`lib/auth.ts`, `lib/totp.ts`), session de 7 jours.
- Design : `docs/design.md`, à lire avant de toucher l'interface. Mobile, mode clair et mode sombre obligatoires.

## Pièges
- **Pas de chiffre en dur, pas de données fictives.** Une donnée manque → état vide « Pas branché ».
- Next 16 : lire le guide concerné dans `node_modules/next/dist/docs/` avant d'écrire du code. Le middleware s'appelle `proxy.ts`.
- Lecture des bases : côté serveur uniquement, avec un accès en lecture seule (rôle ou vues dédiées). La base d'Harmonie Yacht n'est pas encore accessible au connecteur Supabase de Claude.
- Qonto : on lit les transactions déjà synchronisées par Harmonie Yacht (`bank_transactions`). Pas de 3ᵉ code Qonto.
- **La production du tableau de pilotage suit encore `claude/vibrant-goodall-4hnpna`** (pas `main`) : n'y pousse rien tant que Robin n'a pas basculé Vercel sur `main` (`docs/etat.md`).
- Le nom `harmonie-group` n'est pas accepté comme expéditeur dans les relais de Luma : utiliser `robin`.

## Qui possède quoi
| Quoi | Propriétaire |
|---|---|
| Ce dépôt | Session HARMONIE GROUP |
| `robin-lp`, base `luma-agence` | Sessions Luma : on ne les modifie pas, on leur envoie un relais (`robin-lp/docs/relais.md`) |
| `IA-HY-INFRA-NEW`, base Harmonie Yacht | Session HARMONIE YACHT : on ne les modifie pas, on lui transmet la tâche |

## Fusions
- Une PR par étape, sur une branche. Jamais de push direct sur `main`.
- Contexte et docs : fusion libre si le build passe. Code qui touche Qonto ou l'argent : Robin teste la Preview avant.

## Avant de dire « fini »
`npm run build` et `npm test` qui passent · captures desktop et mobile de chaque onglet touché, en clair et en sombre · chaque chiffre vérifié contre sa source, requête montrée · relecture par un sous-agent neuf · Preview testée par Robin · `docs/etat.md` réécrit.
