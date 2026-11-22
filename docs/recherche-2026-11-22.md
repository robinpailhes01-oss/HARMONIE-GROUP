# Recherche du 22/11/2026 — oublis, améliorations, outils

Trois recherches (documentation Anthropic, GitHub et Vercel, outils connectables). Prix vérifiés le 22/11/2026 sauf mention « à revérifier ». Rien n'a été installé ni modifié.

## 1. Risques à régler vite
| Risque | Pourquoi | Action | Coût |
|---|---|---|---|
| Rien n'empêche un agent de pousser sur `main` | Sur GitHub Free, les dépôts privés n'ont ni branche protégée ni règles : la règle n'existe que dans les CLAUDE.md | GitHub Pro : protéger `main` (PR obligatoire, « Do not allow bypassing »), CODEOWNERS sur Qonto, paiements, Léa, migrations | GitHub Pro (prix à vérifier sur github.com/pricing) |
| La production d'Harmonie Yacht suit `claude/keen-cray-IEgV8` | Tout push d'un agent sur cette branche part en production | Fusionner dans `main`, puis Vercel → Environments → Production → Branch Tracking = `main` | 0 |
| Vercel Hobby interdit l'usage commercial | Les deux activités font du chiffre d'affaires | Passer en Pro (20 $/mois par membre), qui débloque aussi les crons précis et l'historique de retour arrière | 20 $/mois |
| Les Previews tournent avec de vrais secrets | Une Preview pourrait encaisser ou écrire à un vrai client | Vérifier la « Standard Protection » ; clés de test sur Preview (Stripe test, numéro WhatsApp séparé) ; clés marquées « Secret » | 0 |
| Le MCP officiel Qonto a aussi des outils d'écriture (virements, cartes, factures) | Contraire à « Qonto en lecture seule » | Le brancher avec ses outils d'écriture interdits (règles `deny`), sauf l'ajout de justificatif | 0 |
| Facture électronique | Réception par une plateforme agréée (PA) obligatoire depuis le 01/09/2026 ; émission et e-reporting au 01/09/2027 pour les PME (à confirmer sur impots.gouv.fr) | Activer la PA de Qonto (annoncée gratuite) | 0 |

## 2. Ce que notre plan fait déjà bien (confirmé par la doc)
- Socle installé dans `~/.claude/CLAUDE.md` par le script d'environnement : méthode officielle (code.claude.com/docs/en/cloud-environments). À tester : un environnement mis en cache peut sauter le script.
- CLAUDE.md courts, contexte lu à la demande, skills, sous-agents, fichier d'état : conforme (code.claude.com/docs/en/memory, /context-window).
- Modèles actuels : Opus 5.5 (4/20 $ par million de jetons), Sonnet 5.5 (2/10 $), Haiku 5.5 (0,10/0,50 $), Fable 5.2 (8/40 $).

## 3. Pour le manager sur le VPS (étape 7-8)
- **Telegram officiel** : plugin `telegram@claude-plugins-official` (« channels », version de test). Liste blanche avec Robin seul : toute personne autorisée peut valider des actions. Voix et photos non confirmées (code.claude.com/docs/en/channels).
- **Agent SDK** : passer `settingSources: ["project"]` (sinon il lit aussi `~/.claude` du VPS) et couper la mémoire automatique (`CLAUDE_CODE_DISABLE_AUTO_MEMORY=1`) : la mémoire reste dans les fichiers du dépôt.
- **Les OK de Robin** : boutons OK / Non via `canUseTool` ; un hook `PreToolUse` qui refuse bloque toujours. Les hooks des dépôts ne tournent pas dans les « Projets » claude.ai : les vrais garde-fous du manager vivent dans le SDK.
- **Coûts** : plafond par session (nom exact de l'option à vérifier), Batch API -50 % pour le point du lundi et l'audit mensuel.
- **Sécurité** : aucune clé Qonto en écriture pour Léa ni le manager ; les mails et WhatsApp entrants peuvent contenir des instructions piégées (« prompt injection »).
- VPS : OVH VPS-1 (~3,81 € HT, France) ou Hetzner CX23 (~6 €).

## 4. Pour Léa (Claude API dans Supabase)
- Mise en cache des consignes (« prompt caching ») : lecture du cache à 10 % du prix sur Haiku, 5 % sur Sonnet et Opus. Grosse économie, Léa relit les mêmes consignes à chaque message.
- Sorties structurées (`json_schema`) : JSON garanti pour les actions de Léa et la lecture des tickets.

## 5. GitHub et Vercel, gratuit et utile
- Dependabot (gratuit) : mises à jour de sécurité Next.js et Supabase.
- Une GitHub Action : lint, types, build, recherche de clés (gitleaks). 12 $ de calcul offerts par mois.
- Modèle de PR avec « Preview à tester : lien + quoi cliquer » et « touche Qonto / paiements / WhatsApp : oui/non ».
- Commentaires de la barre d'outils Vercel sur les Previews : Robin annote, les agents lisent.
- Action Claude Code (`anthropics/claude-code-action`) : relecture des PR et audit mensuel planifié (coût de l'API).

## 6. Outils à ajouter (classés)
| # | Outil | À quoi ça sert | €/mois |
|---|---|---|---|
| 1 | Qonto MCP officiel (écritures interdites) | Trésorerie et justificatifs pour le comptable | 0 |
| 2 | PA Qonto | Obligation légale des factures électroniques | 0 |
| 3 | Playwright MCP | Captures desktop et mobile, tests des sites | 0 |
| 4 | Chrome DevTools MCP | Débogage et vitesse des sites | 0 |
| 5 | Exa MCP | Recherche web de qualité, prospection | 0 (10 $ de crédits/mois) |
| 6 | Resend MCP | Mails transactionnels et envois de test | 0 |
| 7 | Telegram channels + Groq Whisper ou Mistral Voxtral | Manager sur Telegram, notes vocales | ~0-1 |
| 8 | Context7 | Documentation à jour pour coder | 0 |
| 9 | Langfuse Hobby (UE) | Coût et qualité de Léa et des agents | 0 |
| 10 | VPS OVH + n8n auto-hébergé | Automatisations sans abonnement | ~4-6 |

À éviter : Perplexity Sonar (abandonnée), Brave API, Veryfi, Mindee (Claude lit les tickets lui-même), Mem0, Basic Memory (doublon des fichiers), Zapier et Make (doublons de n8n), MCP communautaires sur la banque ou Gmail.

**Sécurité des MCP** : un MCP voit tout ce qu'il manipule. Éditeurs officiels seulement, version fixée, clés limitées, outils d'écriture interdits.

## Sources principales
code.claude.com/docs (cloud-environments, memory, channels, agent-sdk/permissions, agent-sdk/claude-code-features, routines) · platform.claude.com/docs (pricing, prompt-caching, structured-outputs, batch-processing) · docs.github.com (plans, rulesets) · vercel.com/docs (plans/hobby, fair-use-policy, deployment-protection, cron-jobs) · docs.qonto.com/mcp/overview · exa.ai/docs/reference/pricing · langfuse.com/pricing · resend.com/docs/mcp-server · context7.com/plans · blog.ovhcloud.com/vps-2027
