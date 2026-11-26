/**
 * Soldes bancaires : logique pure (sans base de données), testée dans tests/soldes.test.mts.
 * La lecture de la base est dans lib/compta.ts.
 */

export type LigneCompte = { nom: string; role: "principal" | "tva" | "autre"; solde: number | null; soldeAu: Date | null };

export type Soldes = {
  tresorerie: { solde: number; au: Date } | null;
  tva: { solde: number; au: Date } | null;
};

/** Trésorerie = le compte principal ; TVA = l'argent à reverser, jamais additionné à la trésorerie (décision de Robin, 26/11/2026). */
export function choisirSoldes(lignes: LigneCompte[]): Soldes {
  const trouve = (role: LigneCompte["role"]) => {
    const l = lignes.find((x) => x.role === role && x.solde !== null && x.soldeAu !== null);
    return l ? { solde: l.solde as number, au: l.soldeAu as Date } : null;
  };
  return { tresorerie: trouve("principal"), tva: trouve("tva") };
}

/** « à jour » si le relevé a moins de 36 h, sinon « ancien » : on le dit, on n'affiche jamais un vieux chiffre comme s'il était frais. */
export function fraicheur(au: Date, now = new Date()): "a-jour" | "ancien" {
  return now.getTime() - au.getTime() <= 36 * 3600 * 1000 ? "a-jour" : "ancien";
}

export function libelleDate(au: Date): string {
  return new Intl.DateTimeFormat("fr-FR", { day: "numeric", month: "short", hour: "2-digit", minute: "2-digit", timeZone: "Europe/Paris" }).format(au);
}
