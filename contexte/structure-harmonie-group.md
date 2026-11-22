# Harmonie Group : la structure voulue par Robin

> Source : la dictée de Robin du 22/11/2026 (« Cadrage manager Telegram Harmonie Yacht », 19 min), et la conversation de cadrage du même jour.
> Attention : la dictée m'a été rendue **reformulée**, pas mot pour mot. Robin relit ce fichier et corrige. Tout ce qui est marqué **[À CONFIRMER]** vient de la dictée mais n'a pas été vérifié ; **[À COMPLÉTER]** n'a pas été dit.
> À donner à la session qui range le contexte : elle le découpe en fichiers (`contexte/`, `CLAUDE.md`, `docs/etat.md`, agents et skills).

## 1. La vision

- Robin pilote **tout depuis Telegram**, avec **un seul manager** qui distribue le travail à des agents par métier.
- Robin ne veut plus faire lui-même : **la compta, les factures, les tickets, le montage vidéo.**
- Les réponses aux clients sont déjà gérées par un agent WhatsApp.
- Ce qui lui prend du temps :
  - Harmonie Yacht : la création de contenu (photos et vidéos tournées par sa femme).
  - Luma : trouver des clients, et la veille sur l'IA, qui le détourne du travail.
- Robin n'aime pas être face caméra.

## 2. Les activités

**Harmonie Group** : un SIREN, un compte Qonto. Orthographe : Harmonie, avec « ie ».

| | Luma | Harmonie Yacht |
|---|---|---|
| Quoi | Agence IA pour dirigeants de PME (B2B) | Yacht de 12 m : nuits insolites et sorties en mer privatisées (paddle, plateforme), jusqu'à 10 personnes **[À CONFIRMER]** |
| Public | Dirigeants de PME | B2C et événements privés : familles, anniversaires, mariages, EVJF/EVG, petites entreprises jusqu'à 10 personnes |
| Prix | Voir `luma-context/` | Nuits à 200 à 400 € **[À CONFIRMER]** |
| Lieu et dates | Montpellier | Actuellement à Carnon, prévu à Sète en avril 2027. Fermeture de début décembre à début avril **[À CONFIRMER]** |
| Réseaux | @luma_agence | Compte Instagram propre, géré par sa femme |
| Dépôt, base | `robin-lp`, `luma-agence` | `ia-hy-infra-new`, projet Supabase `fscrhzxpmxvejrhppftc` |

Une troisième activité est possible plus tard. Aucun accès pour un tiers ou un associé pour l'instant.

## 3. L'organisation

- **Un manager global**, qui reçoit tout, distribue et **n'exécute rien lui-même**.
- **Des agents par métier**, qui servent les deux activités (compta, ventes, prospection, pub, contenu, réalisation).
- Le tableau de pilotage affiche une vue « équipe Luma » et une vue « équipe Harmonie Yacht », sans dupliquer les agents.
- Les trois dépôts : `harmonie-group` (pilotage, manager, comptable), `robin-lp` (atelier Luma), `ia-hy-infra-new` (atelier Harmonie Yacht).
- Chaque client a son propre dépôt, auquel le manager peut accéder, notamment pour y transmettre des résumés d'appels.

## 4. Le manager sur Telegram

| Sujet | Règle voulue |
|---|---|
| Messages | Vocal (pratique en voiture), texte, photo de ticket |
| Réponses | Courtes ; détaillées si utile ; **boutons OK / Non** |
| Doute sur l'agent | Il **demande** à Robin, il ne choisit pas |
| Messages spontanés | **Seulement** en cas d'urgence : un prospect très chaud, ou un bug sur un projet client. **Jamais le week-end.** |
| Erreur d'un agent, bug | Robin est prévenu **tout de suite** |
| Modifier un projet | Le manager **ne modifie rien lui-même** : il transmet la tâche à la session qui possède le projet |
| Mise en ligne | **Toujours l'accord de Robin** |

## 5. Le tableau de pilotage

- Un tableau « Harmonie Group » avec des onglets **Luma** et **Harmonie Yacht** (plus un onglet Perso, voir §6), couleurs adaptées à chaque onglet. Style verre, très haute qualité.
- **Ce que Robin veut voir le matin :** chiffre d'affaires, marge, bénéfice, un **curseur d'objectif**, et une case « prospects très chauds ».
- Il doit pouvoir **agir** depuis ce tableau (valider une facture, répondre), même si le but reste Telegram.
- Les deux tableaux existants restent des outils de détail. Le tableau du groupe les lit en lecture seule.

## 6. Compta et argent

- **Le comptable** est un seul agent, pour les deux activités et le perso.
- Il **catégorise** les dépenses récurrentes entre Harmonie Yacht et Luma, **demande en cas de doute** et **apprend** au fil du temps.
- Les **logiciels partagés** sont répartis **50/50**.
- Les **photos de tickets** sont ajoutées directement dans Qonto, rattachées à leur transaction.
- **Factures clients :** préparées dès qu'un virement arrive, **validées par Robin d'un bouton avant l'envoi** (décision du 19/11 : aucun envoi automatique).
- **Point financier chaque lundi matin sur Telegram :** un résumé par activité, avec un schéma statistique et des axes d'amélioration.
- **Charges fixes à suivre :** abonnements, impôts, URSSAF.
- **Autres comptes à intégrer :** Robin enverra chaque semaine les relevés **Revolut** et **DeBlock** pour les statistiques de dépenses. **[À COMPLÉTER : ces comptes sont-ils perso, Luma, Harmonie Yacht ? Comment les relevés arrivent-ils ?]**
- **Formation du comptable :** Robin fournira des liens de vidéos d'une chaîne YouTube de comptabilité.
- **Accompagnement demandé :** répartir chaque revenu entre un investissement long terme (l'or, par exemple) et la publicité. À cadrer plus tard avec l'expert-comptable, sans conseil d'investissement de l'agent.
- **[À COMPLÉTER]** : SIREN, forme juridique, TVA, expert-comptable et ce qu'il attend.
- Comment reconnaître un mouvement perso : **[À COMPLÉTER]**.

## 7. Contenu

- Harmonie Yacht a son compte Instagram, géré par sa femme.
- **Deux calendriers de publication séparés**, un par activité.
- Les fichiers de contenu d'Harmonie Yacht sont triés dans Google Drive. L'objectif est d'**automatiser la création de contenu** à partir de là.
- Le **montage vidéo** doit être délégué : Robin n'est pas satisfait du rendu actuel.
- Voix et public d'Harmonie Yacht : à écrire dans sa fiche de marque. **[À COMPLÉTER]**

## 8. Garde-fous

- **Rien ne part sans l'OK de Robin :** facture, mail, paiement, publication, mise en ligne, migration en production, suppression.
- **Plafond de dépenses publicitaires :** une limite par jour ou par mois pour Luma, **[À COMPLÉTER par Robin]**. La dictée évoque un plafond de **5 € par jour** pour Harmonie Yacht **[À CONFIRMER : c'est peut-être celui de Luma, qui existe déjà dans `luma_pub_garde_fous`]**.
- Pas d'action « à ne jamais faire seul » citée en plus de celles ci-dessus.
- Le perso est privé : il ne sort jamais du tableau de pilotage ni des échanges avec Robin.
- Les clés restent dans Vercel, jamais dans un fichier.
- 3 essais maximum sur une même erreur, puis l'agent s'arrête et explique.

## 9. Ce que Robin doit encore fournir

1. Les relevés Revolut et DeBlock chaque semaine, et leur rôle.
2. Les liens des vidéos YouTube de compta.
3. Le plafond de dépenses pub de Luma.
4. SIREN, forme juridique, TVA, expert-comptable.
5. La fiche de marque d'Harmonie Yacht : voix, public, couleurs.
6. Les vérifications marquées **[À CONFIRMER]** ci-dessus.

## 10. L'ordre de construction

1. Contexte et fichiers de base dans `harmonie-group`, puis le même squelette pour `ia-hy-infra-new`.
2. Le comptable.
3. Le tableau de pilotage (maquette, puis construction).
4. Le manager, une fois ses agents connus.
5. Le VPS et Telegram.
6. Plus tard : le ménage des fichiers de Luma, la fiche de marque d'Harmonie Yacht et l'agent contenu partagé.
