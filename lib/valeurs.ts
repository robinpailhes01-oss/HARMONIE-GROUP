import type { ValeurCarte } from "@/components/Tableau";
import type { EtatCompta } from "./compta";
import { euros2 } from "./format";
import { fraicheur, libelleDate } from "./soldes";

const jour = (iso: string) => new Intl.DateTimeFormat("fr-FR", { day: "numeric", month: "short", year: "numeric", timeZone: "UTC" }).format(new Date(`${iso}T00:00:00Z`));

function solde(s: { solde: number; au: Date } | null): ValeurCarte | undefined {
  if (!s) return undefined;
  return { etat: "ok", texte: euros2(s.solde), legende: `Relevé du ${libelleDate(s.au)}`, ancien: fraicheur(s.au) === "ancien" };
}

/** Valeurs des cartes lues dans la compta : une carte absente reste « Pas branché », une erreur est dite telle quelle. */
export function valeursCompta(r: EtatCompta): Record<string, ValeurCarte> {
  const ids = ["tresorerie", "tva", "compte-courant", "ca-luma", "ca-encaisse"];
  if (r.etat === "erreur") return Object.fromEntries(ids.map((i) => [i, { etat: "erreur" } as ValeurCarte]));
  if (r.etat !== "ok") return {};
  const { soldes, compteCourant: cc, caLuma } = r.compta;
  const v: Record<string, ValeurCarte> = {};
  const t = solde(soldes.tresorerie);
  const tva = solde(soldes.tva);
  if (t) v.tresorerie = t;
  if (tva) v.tva = tva;
  if (cc.nombre > 0) {
    const sens = cc.solde === 0 ? "Compte soldé" : cc.solde > 0 ? "L'entreprise lui doit" : "Elle doit à l'entreprise";
    v["compte-courant"] = { etat: "ok", texte: euros2(Math.abs(cc.solde)), legende: `${sens} · dernier mouvement le ${cc.dernier ? jour(cc.dernier) : "—"}` };
  }
  const ca: ValeurCarte = { etat: "ok", texte: euros2(caLuma.ttc), legende: `TTC · ${caLuma.nombre} encaissement${caLuma.nombre > 1 ? "s" : ""} en ${caLuma.annee}` };
  v["ca-luma"] = ca;
  v["ca-encaisse"] = ca;
  return v;
}
