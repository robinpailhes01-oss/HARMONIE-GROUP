---
name: facturer
description: Prépare un devis ou une facture (Luma ou Harmonie Yacht) dans Qonto, la fait relire, puis la finalise et l'envoie seulement après l'OK de Robin. À utiliser dès qu'un virement arrive, ou quand Robin demande une facture, un devis, un avoir ou le PDF d'une facture. Ne sert ni à classer un mouvement ni à payer quoi que ce soit.
---

# Facturer

Tu prépares, Robin valide. Rien n'est envoyé sans son OK.

## Les étapes
1. **Le fait** : le virement reçu (`list_transactions`, crédits) : montant TTC, date, libellé, référence. Jamais deviner. Si le montant est ambigu, demande « HT ou TTC ? ».
2. **Le client** : `list_clients` d'abord (pas de doublon), sinon `create_client` (nom, adresse, SIREN, e-mail). Un e-mail manquant empêche l'envoi : dis-le.
3. **L'activité** : Luma ou Harmonie Yacht. En cas de doute, demande.
4. **Le libellé** (titre + description de chaque ligne) :
   - **Luma** : tu le rédiges **d'après la proposition du client**. Lis seulement `robin-LP/content/propositions/<client>.ts` (ce qui est inclus, prix, plan de paiement) ; le guide est `robin-LP/docs/propositions/README.md`. Reprends ses mots, n'invente rien. Si la proposition prévoit des échéances (acompte, 50/50), une facture par échéance, avec le nom de l'échéance dans le titre. Pas de proposition trouvée : demande à Robin.
   - **Harmonie Yacht** : les mots de Robin (sortie en mer, nuit insolite…). Taux de TVA des nuits à bord : à confirmer avec l'expert-comptable.
5. **Montants** : TVA à 20 % (collectée). Vérifie que HT + TVA = TTC et que le TTC égale le virement.
6. **Numéro** : la suite unique de Qonto `F-AAAA-NNN` (dernière + 1, vérifiée avec `list_client_invoices` triée par numéro). Les avoirs : `A-AAAA-NNN`.
7. **Dates** : la date de la facture = **la date où le virement est reçu** (décision de Robin, 26/11/2026). Donc prépare et finalise la facture **le jour même** du virement. Une facture ne se date jamais dans le passé (la date est celle de son émission, et la suite des numéros suit l'ordre des dates) : si tu arrives en retard, préviens Robin avant de finaliser et mets la date du paiement dans la description (« Paiement reçu le … »). Échéance +15 jours ; paiement par virement sur le compte principal.
8. **Mentions** : **aucune pénalité de retard ni indemnité forfaitaire** (décision de Robin, 26/11/2026). Ne les ajoute pas.
9. **Brouillon seulement** (`status: draft`).
10. **Double contrôle** : un sous-agent neuf relit (montants, numéro, client, libellé). Un sous-agent ne peut pas en lancer un autre : c'est celui qui t'appelle qui le fait.
11. **Montre à Robin** le brouillon dans un tableau. Après son OK : finaliser (`change_client_invoice_status`). Si le virement est déjà reçu, Qonto rapproche seul ; sinon `mark_client_invoice_as_paid` avec la vraie date.
12. **Envoi** (`send_client_invoice`) : seulement avec l'OK de Robin et l'e-mail du client.
13. **PDF** : après finalisation, `get_attachment`, télécharge le fichier dans le dossier de travail et envoie-le à Robin. Une facture en brouillon n'a pas de PDF.

## Corriger une facture déjà finalisée
Elle ne se modifie pas. Chemin : avoir (`create_credit_note`) + nouvelle facture. Irréversible : OK de Robin d'abord. Si la facture date d'une année passée, la TVA de l'année est touchée : préviens Robin de le dire à l'expert-comptable.

## Interdits
Virement, carte, lien de paiement, membre. Supprimer ou annuler sans l'OK de Robin. Inventer un client, un montant ou un libellé.
