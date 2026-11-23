/**
 * Ce que chaque onglet affichera, et d'où viendra chaque chiffre (inventaire du 22/11/2026, docs/etat.md).
 * Aucune valeur ici : la carapace affiche un état vide tant que la source n'est pas branchée.
 * Brancher une source = remplir `lire` côté serveur, avec un accès en lecture seule. Jamais de chiffre en dur.
 */

export type Espace = "groupe" | "luma" | "harmonie-yacht" | "perso";

export type Indicateur = {
  id: string;
  titre: string;
  /** Base ou service d'origine, affiché sous le chiffre. */
  source: string;
  /** Table, vue ou colonne prévue. */
  detail: string;
  /** Période affichée, si le chiffre en a une. */
  periode?: "annee" | "30j" | "jour";
  format: "euros" | "nombre" | "texte";
  /** Vrai quand la lecture de la source est en place. Tant que c'est faux : état vide. */
  branche?: boolean;
};

export type Liste = { id: string; titre: string; source: string; detail: string; vide: string; branche?: boolean };

export type Onglet = { espace: Espace; href: string; nom: string; rubrique: string; sousTitre: string; indicateurs: Indicateur[]; listes: Liste[] };

const LUMA = "Supabase luma-agence";
const HY = "Supabase Harmonie Yacht";
const QONTO = "Qonto (synchronisé par Harmonie Yacht)";

export const ONGLETS: Onglet[] = [
  {
    espace: "groupe",
    rubrique: "Pilotage",
    href: "/groupe",
    nom: "Groupe",
    sousTitre: "Harmonie Group : un SIREN, un compte Qonto, deux activités.",
    indicateurs: [
      { id: "tresorerie", titre: "Trésorerie Qonto", source: QONTO, detail: "financial_snapshots.bank_balance", periode: "jour", format: "euros" },
      { id: "ca-total", titre: "Chiffre d'affaires total", source: "Luma + Harmonie Yacht", detail: "Somme des deux CA ci-dessous", periode: "annee", format: "euros" },
      { id: "ca-luma", titre: "CA Luma", source: LUMA, detail: "luma_v_stats.ca_encaisse_ttc", periode: "annee", format: "euros" },
      { id: "ca-hy", titre: "CA Harmonie Yacht", source: HY, detail: "revenues.amount", periode: "annee", format: "euros" },
      { id: "depenses-perso", titre: "Dépenses perso", source: QONTO, detail: "Mouvements classés « Perso » par l'agent comptable", periode: "annee", format: "euros" },
      { id: "a-classer", titre: "Mouvements à classer", source: QONTO, detail: "Mouvements pas encore rangés par l'agent comptable", format: "nombre" },
    ],
    listes: [
      { id: "urgent", titre: "Tâches urgentes", source: `${LUMA} · ${HY}`, detail: "luma_taches (urgent) · leads.needs_human_intervention", vide: "Aucune tâche urgente remontée pour l'instant." },
      { id: "decision", titre: "Attend ta décision", source: LUMA, detail: "luma_taches (attend_robin) · luma_v_relais_ouverts (pour robin)", vide: "Rien n'attend ta décision pour l'instant." },
    ],
  },
  {
    espace: "luma",
    rubrique: "Activités",
    href: "/luma",
    nom: "Luma",
    sousTitre: "L'agence IA. Le détail reste dans le studio.",
    indicateurs: [
      { id: "ca-annee", titre: "CA de l'année", source: LUMA, detail: "encaissements datés (vue demandée au QG le 22/11)", periode: "annee", format: "euros" },
      { id: "mrr", titre: "MRR signé", source: LUMA, detail: "abonnements mensuels signés (champ à créer côté Luma, relais QG du 23/11)", format: "euros" },
      { id: "paiements-a-venir", titre: "Paiements à venir", source: LUMA, detail: "luma_v_pipeline : prix_facture_ttc − encaisse_ttc (affaires signées)", format: "euros" },
      { id: "clients", titre: "Clients signés", source: LUMA, detail: "luma_v_stats.clients_signes", format: "nombre" },
    ],
    listes: [
      { id: "chauds", titre: "Clients chauds et paiements à venir", source: LUMA, detail: "luma_v_pipeline (statut devis_envoye ou discussion ; reste à encaisser des signés)", vide: "Aucun client chaud affiché pour l'instant." },
      { id: "urgent", titre: "Tâches urgentes", source: LUMA, detail: "luma_taches (urgent, pas fait)", vide: "Aucune tâche urgente remontée pour l'instant." },
    ],
  },
  {
    espace: "harmonie-yacht",
    rubrique: "Activités",
    href: "/harmonie-yacht",
    nom: "Harmonie Yacht",
    sousTitre: "La location du yacht. Le détail reste dans son tableau de bord.",
    indicateurs: [
      { id: "ca", titre: "CA encaissé", source: HY, detail: "revenues.amount", periode: "annee", format: "euros" },
      { id: "recettes-30j", titre: "Recettes 30 jours", source: HY, detail: "financial_snapshots.revenue_30d", periode: "30j", format: "euros" },
      { id: "depenses-30j", titre: "Dépenses 30 jours", source: HY, detail: "financial_snapshots.expenses_30d", periode: "30j", format: "euros" },
      { id: "score", titre: "Score financier", source: HY, detail: "financial_snapshots.score_label", periode: "jour", format: "texte" },
      { id: "reservations", titre: "Réservations confirmées", source: HY, detail: "bookings (status confirmed)", format: "nombre" },
    ],
    listes: [
      { id: "reservations", titre: "Prochaines sorties", source: HY, detail: "bookings (date à venir, pas annulée)", vide: "Aucune sortie à venir affichée pour l'instant." },
      { id: "urgent", titre: "Leads à reprendre", source: HY, detail: "leads.needs_human_intervention", vide: "Aucun lead à reprendre pour l'instant." },
    ],
  },
  {
    espace: "perso",
    rubrique: "Personnel",
    href: "/perso",
    nom: "Perso",
    sousTitre: "Les dépenses perso passées sur le compte Qonto, à part.",
    indicateurs: [
      { id: "depenses", titre: "Dépenses perso", source: QONTO, detail: "Mouvements classés « Perso »", periode: "annee", format: "euros" },
      { id: "nombre", titre: "Mouvements perso", source: QONTO, detail: "Mouvements classés « Perso »", periode: "annee", format: "nombre" },
    ],
    listes: [{ id: "mouvements", titre: "Derniers mouvements perso", source: QONTO, detail: "Mouvements classés « Perso »", vide: "Aucun mouvement perso classé pour l'instant." }],
  },
];

export function onglet(espace: Espace) {
  return ONGLETS.find((o) => o.espace === espace)!;
}

/** « 1er janv. – 31 déc. 2026 » : l'année civile en cours (décision de Robin du 22/11/2026). */
export function libellePeriode(p: Indicateur["periode"], now = new Date()) {
  if (p === "annee") return `1er janv. – 31 déc. ${new Intl.DateTimeFormat("fr-FR", { year: "numeric", timeZone: "Europe/Paris" }).format(now)}`;
  if (p === "30j") return "30 derniers jours";
  if (p === "jour") return "Dernier relevé";
  return null;
}

/** Sources branchées sur le total : calculé depuis les définitions ci-dessus, jamais écrit à la main. */
export function etatSources() {
  const tout = ONGLETS.flatMap((o) => [...o.indicateurs, ...o.listes]);
  return { branchees: tout.filter((x) => x.branche).length, total: tout.length };
}
