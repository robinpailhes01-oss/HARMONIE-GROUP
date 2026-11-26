import type { Metadata } from "next";
import { Tableau, type ValeurCarte } from "@/components/Tableau";
import { lireSoldes } from "@/lib/compta";
import { euros2 } from "@/lib/format";
import { fraicheur, libelleDate } from "@/lib/soldes";

export const metadata: Metadata = { title: "Groupe" };
// Les soldes sont lus à chaque visite : jamais figés au moment du build.
export const dynamic = "force-dynamic";

function carte(s: { solde: number; au: Date } | null): ValeurCarte | undefined {
  if (!s) return undefined;
  return { etat: "ok", texte: euros2(s.solde), date: libelleDate(s.au), ancien: fraicheur(s.au) === "ancien" };
}

export default async function Page() {
  const r = await lireSoldes();
  const valeurs: Record<string, ValeurCarte> = {};
  if (r.etat === "erreur") {
    valeurs.tresorerie = { etat: "erreur" };
    valeurs.tva = { etat: "erreur" };
  } else if (r.etat === "ok") {
    const t = carte(r.soldes.tresorerie);
    const v = carte(r.soldes.tva);
    if (t) valeurs.tresorerie = t;
    if (v) valeurs.tva = v;
  }
  return <Tableau espace="groupe" valeurs={valeurs} />;
}
