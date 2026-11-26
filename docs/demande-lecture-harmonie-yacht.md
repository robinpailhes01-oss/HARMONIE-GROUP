# Demande à la session HARMONIE YACHT : lecture seule des encaissements

À coller dans la session qui possède `IA-HY-INFRA-NEW` (écrite le 26/11/2026 par la session HARMONIE GROUP, avec l'accord de Robin sur le principe).

**Besoin.** Le tableau de pilotage d'Harmonie Group (`harmoniegroup.vercel.app`) doit afficher le CA d'Harmonie Yacht et l'encaissement SumUp d'un paiement de 200 € que Robin a reçu. Harmonie Group n'écrit **rien** dans votre base et ne recode pas la synchro SumUp : il lit ce que `sumup-sync` et la table des recettes (`revenues`) ont déjà rangé.

**À faire (côté Harmonie Yacht)**
1. Créer un schéma `groupe` avec des **vues en lecture seule** : (a) les encaissements (date, montant TTC, moyen : SumUp, Stripe, virement…, identifiant de la transaction, statut) ; (b) rien d'autre. **Aucune donnée personnelle de client** (ni nom, ni téléphone, ni e-mail).
2. Créer un rôle `groupe_lecture_hy` (LOGIN, sans contournement RLS) avec USAGE sur le schéma `groupe` et SELECT sur ces vues **seulement**. **Sans mot de passe dans un fichier ni dans le chat** : Robin le définit lui-même dans Supabase.
3. Dire à Robin le nom exact des vues et des colonnes, pour qu'il pose la chaîne de connexion dans Vercel (projet `harmoniegroup`, variable `HY_LECTURE_URL`, Production seulement).

**Garde-fous.** Migration en production : OK explicite de Robin d'abord. Même erreur 3 fois : stop et explication. Ne rien modifier d'autre.

**Fini quand.** Les vues et le rôle existent, Robin a posé la variable, et un `select` sur les vues avec le rôle renvoie les encaissements de 2026, dont le paiement SumUp de 200 €.
