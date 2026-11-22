# Harmonie Group — la tour de contrôle

Application web privée de Robin : l'essentiel de toute l'entreprise sur 4 onglets. On répond **en français**, brièvement, en tableau quand c'est possible.

## Ce qu'est Harmonie Group
- Un seul SIREN, un seul compte Qonto. Deux activités : **Luma** (agence IA) et **Harmonie Yacht** (location de yacht). Des dépenses perso passent aussi sur le compte Qonto.
- Ce dépôt ne remplace rien : le studio Luma et le tableau de bord d'Harmonie Yacht restent les outils de travail détaillé. Ici, l'essentiel seulement.

| Onglet | Contenu | Couleurs |
|---|---|---|
| Groupe | Trésorerie Qonto, CA total et par activité, dépenses perso, tâches urgentes, ce qui attend Robin | Neutres chauds (crème, sable) |
| Luma | Chiffres clés, affaires en cours, tâches urgentes | Verre du studio Luma (lavande, violet) |
| Harmonie Yacht | Chiffres clés, tâches urgentes | « Verre glacier » d'Harmonie Yacht |
| Perso | Dépenses perso, à part | Neutres |

La liste des indicateurs et leur source est dans `lib/indicateurs.ts`. Chaque chiffre affiche sa source (table ou Qonto) et sa date.

## Qui possède quoi
| Quoi | Propriétaire |
|---|---|
| Ce dépôt (`robinpailhes01-oss/harmonie-group`) | Session HARMONIE GROUP |
| Dépôt `robinpailhes01-oss/robin-lp`, base Supabase `luma-agence` | Sessions Luma (voir leur `CLAUDE.md`). On ne les modifie **jamais** : relais au propriétaire (`docs/relais.md` de Luma, `studio` ou `qg`) |
| Dépôt `robinpailhes01-oss/IA-HY-INFRA-NEW`, base Supabase Harmonie Yacht | Harmonie Yacht. On ne les modifie **jamais** : on écrit à Robin ce qu'il faut changer |
| Qonto | Lecture seule, via les transactions déjà synchronisées par Harmonie Yacht. Jamais d'appel d'écriture |

## Règles
- Une PR par étape, sur une branche. **Jamais de push sur `main`.** Code qui touche Qonto : Robin teste la Preview Vercel avant la fusion.
- Connexion obligatoire : mot de passe + code à 6 chiffres (`lib/auth.ts`, `lib/totp.ts`). Session de 7 jours.
- Lecture des bases : côté serveur uniquement, avec un accès en lecture seule (rôle ou vues dédiées).
- **Pas de chiffre en dur.** Une donnée manque → état vide clair (« Pas encore branché »).
- Mobile, mode clair et mode sombre obligatoires.
- **Jamais de clé dans un fichier ni dans le chat** : les clés vont dans Vercel (Production et Preview). `.env.example` ne contient que des noms.
- OK explicite de Robin pour : créer un rôle ou une migration en production, toute écriture dans Qonto, supprimer quoi que ce soit.
- N'invente jamais un chiffre, un statut ou une règle : pose une question courte.
- 3 essais maximum sur une même erreur, puis stop et explication.

## Avant de dire « fini »
Build qui passe (`npm run build`, `npm test`) · captures desktop et mobile de chaque onglet, en clair et en sombre · chaque chiffre vérifié contre sa source, requête montrée · relecture par un sous-agent neuf · Preview testée par Robin.

## En fin de session
Mettre à jour `docs/etat.md`.

## Code Next.js
Next 16 : lire le guide concerné dans `node_modules/next/dist/docs/` avant d'écrire du code (le middleware s'appelle `proxy.ts`).

## Design (validé dans l'esprit par Robin le 22/11/2026, d'après ses exemples)
Barre latérale de verre avec icônes (lucide-react), barre du haut en pilule avec boutons ronds, un grand panneau de verre qui porte la page, cartes avec pastille d'icône + badge + emplacement de courbe, barre d'onglets flottante en bas sur mobile. Classes : `.vitre`, `.vitre-coque`, `.vitre-panneau`, `.vitre-puits`, `.puce`, `.pastille`, `.bouton-rond`, `.carte-levee` (`app/globals.css`). Jamais de fausse courbe ni de faux chiffre : pointillés et « Pas branché » tant que la source manque.
