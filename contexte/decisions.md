# Décisions — Harmonie Group (tout le groupe)

Une ligne par décision de Robin, la plus récente en haut : la date, la décision, la raison.
Écrite dès que Robin tranche. Relue au début de chaque conversation.
Les décisions propres à une activité restent dans son dépôt (`luma-context/decisions.md`, `hy-context/decisions.md`).

| Date | Décision | Raison |
|---|---|---|
| 2026-11-23 | Numérotation des factures : deux suites continues, `LUMA-AAAA-001` et `HY-AAAA-001` (à confronter à la numérotation de Qonto avant de figer) | Chaque activité se lit seule ; la loi veut une suite chronologique sans trou |
| 2026-11-23 | Comptable : toute facture ou tout devis préparé passe par un double contrôle, sans seuil de montant (forme exacte à confirmer par Robin) | Pas de document financier sans relecture, pour commencer |
| 2026-11-23 | Robin branche le MCP officiel de Qonto (outils d'écriture interdits). Les relevés Revolut et DeBlock sont donnés par Robin lui-même | Accès Qonto sans risque sur l'argent ; le perso reste à part |
| 2026-11-22 | Chiffre d'affaires compté sur l'année civile (1er janvier – 31 décembre) | Décidé lors de l'inventaire du tableau de pilotage |
| 2026-11-23 | Le manager global remplace Hermes (VPS Hostinger, Telegram) et le plan des « bureaux » ; ils sont arrêtés une fois le manager en place. Choix du VPS et sort des relais (`luma_relais`) : à l'étape du manager | Un seul agent sur Telegram, construit avec nos fichiers |
| 2026-11-22 | Socle installé dans l'environnement cloud « Robin » (script de démarrage qui écrit `~/.claude/CLAUDE.md`). **Toute modification de `socle.md` doit être recopiée dans le script de l'environnement** (proposée à Robin, qui l'approuve) | Une seule source, installée partout ; l'audit mensuel vérifie que les deux sont identiques |
| 2026-11-22 | Ton des agents avec Robin : comme un associé, amical et humain, tutoiement, franc | Demandé par Robin |
| 2026-11-22 | Socle commun validé (`contexte/socle.md`) | Base lue par toutes les sessions |
| 2026-11-22 | Les agents s'adressent à Robin par « Robin » | Demandé par Robin |
| 2026-11-22 | Le manager peut écrire à Robin à **toute heure**, week-end compris, dès qu'il y a une urgence (bug sur un projet client, prospect très chaud). Le reste attend le prochain point | Ne rater aucune urgence (remplace la règle « jamais le week-end ») |
| 2026-11-22 | Connecteur officiel Qonto : le comptable lit tout (dépenses, recettes, relevés), crée devis et factures (envoyés seulement après l'OK de Robin) et joint les tickets aux transactions. **Interdit** : virements, cartes, liens de paiement, toute sortie d'argent | Déléguer la compta sans aucun risque sur l'argent (remplace la règle « lecture seule + tickets ») |
| 2026-11-22 | Factures électroniques : la plateforme agréée de Qonto | Déjà dans Qonto, pas d'outil de plus |
| 2026-11-22 | Les Previews Vercel n'ont jamais de vraies clés : clés de test, ou pas de clé du tout | Une version de test ne doit jamais toucher un vrai client ni de l'argent |
| 2026-11-22 | On suit exactement la documentation d'Anthropic : fichiers courts, contexte lu à la demande, fichier d'état, une conversation par tâche | Méthode officielle, la plus efficace dans la durée |
| 2026-11-22 | Outils retenus : Exa (recherche), Context7 (doc à jour pour coder), Resend (déjà en place), Playwright (déjà installé dans les sessions cloud). Langfuse : à étudier. VPS : Robin s'en occupe | Gratuits ou presque, gain net de qualité |
| 2026-11-22 | Luma : on remet à jour **tous** les fichiers (ménage complet), après le comptable | Repartir sur de bonnes bases partout |
| 2026-11-22 | Prochain agent construit : le comptable | Priorité de Robin pendant la basse saison |
| 2026-11-22 | Harmonie Yacht : création de la branche `main` au même point que la production (`claude/keen-cray-IEgV8`) ; Robin bascule la production de Vercel et la branche par défaut de GitHub sur `main` | Plus aucun agent ne met en ligne par erreur en poussant sur une branche `claude/...` |
| 2026-11-22 | Structure validée pour `harmonie-group` : `CLAUDE.md` court, `contexte/` (INDEX, socle, groupe, organisation, voix-robin, decisions, questions-ouvertes), `docs/etat.md`, `.claude/agents` et `.claude/skills` | Lire seulement ce qui sert, et rester efficace dans la durée |
| 2026-11-22 | Style : en session de travail, pas à pas (fait / pourquoi / à toi) ; sur Telegram, court avec boutons OK / Non, détaillé si Robin le demande | Apprendre en session, aller vite sur le téléphone |
| 2026-11-22 | Pas de prénom pour les nouveaux agents : « le manager », « le comptable » | Le rôle se lit dans le nom |
| 2026-11-22 | `voix-robin.md` devient commun au groupe et vit dans `harmonie-group/contexte/`. La voix de Léa reste à part, dans la fiche de marque d'Harmonie Yacht. Le retrait de la copie de Luma passe par un relais (on ne modifie pas `robin-lp`) | La façon d'écrire de Robin sert aux deux activités |
| 2026-11-22 | Dépense perso sur Qonto : en cas de doute, le comptable demande sur Telegram (boutons Luma / Harmonie Yacht / Perso / 50-50) et retient la réponse pour ce marchand | Robin ne valide que les cas douteux ; le comptable apprend au fil du temps |
| 2026-11-22 | Revolut et DeBlock sont des comptes **perso uniquement** : ils alimentent l'onglet Perso, jamais la compta de l'entreprise | Garder le perso à part |
| 2026-11-22 | Aucune dépense pub pour Harmonie Yacht pendant la fermeture ; un plafond sera fixé avant la reprise d'avril. Le plafond de Luma reste celui de `luma_pub_garde_fous` | Bateau fermé de début décembre à début avril |
| 2026-11-22 | La femme de Robin (Instagram et photos d'Harmonie Yacht) aura un accès plus tard : à préciser | Elle produit le contenu ; son accès sera cadré avec l'agent contenu |
| 2026-11-22 | Le manager ne dépose rien lui-même dans un dépôt client : il transmet le résumé d'appel à la session qui possède le projet, et c'est elle qui l'écrit | Le manager n'écrit jamais dans un projet, sans exception |
| 2026-11-22 | Le comptable du groupe prépare **toutes** les factures (Luma et Harmonie Yacht) dès qu'un virement arrive ; Robin valide d'un bouton avant l'envoi. La session PROPOSITION de Luma ne garde que les propositions commerciales | Un seul propriétaire pour les factures |
| 2026-11-22 | Les agents communs aux deux activités (manager, comptable, contenu) vivent dans `harmonie-group`. Les métiers propres à une activité restent chez elle : Simon, Jordan et Don chez Luma ; Léa chez Harmonie Yacht | Pas de doublon d'agents, et chaque dépôt garde ce qui lui est propre |
| 2026-11-22 | Le manager tourne sur le VPS avec Claude Code (Agent SDK) et lit les mêmes fichiers (`CLAUDE.md`, agents, skills) que les sessions | Un seul contexte à tenir à jour, pour les sessions comme pour le manager |
| 2026-11-22 | Un seul manager global sur Telegram. Il remplace la session QG de Luma, l'agent `manager-luma` et le Manager Telegram d'Harmonie Yacht | Un seul cerveau qui reçoit tout et distribue, au lieu de trois |
| 2026-11-22 | Structure voulue : `contexte/structure-harmonie-group.md` (dictée du 22/11, à découper en fichiers) | Point de départ de la reconfiguration |
