import postgres from "postgres";
import { choisirSoldes, type LigneCompte, type Soldes } from "./soldes";

/**
 * Lecture de la compta d'Harmonie Group : base Supabase « harmonie-group », tables compta_*,
 * avec le rôle `groupe_lecture` (lecture seule, 3 tables). La chaîne de connexion est dans Vercel
 * (COMPTA_LECTURE_URL, Production) : jamais dans un fichier. Aucune écriture ici, jamais.
 * Seuls les comptes de l'entreprise sont lus : le perso n'apparaît que sur l'onglet Perso.
 */
export type EtatSoldes = { etat: "pas_branche" } | { etat: "erreur" } | { etat: "ok"; soldes: Soldes };

type Ligne = { nom: string; role: LigneCompte["role"]; solde: string | null; solde_au: Date | null };

export async function lireSoldes(): Promise<EtatSoldes> {
  const url = process.env.COMPTA_LECTURE_URL;
  if (!url) return { etat: "pas_branche" };
  const sql = postgres(url, { max: 1, prepare: false, idle_timeout: 5, connect_timeout: 5, ssl: "require" });
  let minuterie: ReturnType<typeof setTimeout> | undefined;
  try {
    // Délai maximum : si la base répond trop lentement, la page affiche « Lecture impossible » au lieu de rester bloquée.
    const delai = new Promise<never>((_, refuse) => {
      minuterie = setTimeout(() => refuse(Object.assign(new Error("délai dépassé"), { name: "DelaiDepasse" })), 8000);
    });
    const lignes = await Promise.race([
      sql<Ligne[]>`
        select nom, role, solde, solde_au
        from public.compta_comptes
        where actif and portee = 'entreprise'
        order by solde_au desc nulls last`,
      delai,
    ]);
    return {
      etat: "ok",
      soldes: choisirSoldes(lignes.map((l) => ({ nom: l.nom, role: l.role, solde: l.solde === null ? null : Number(l.solde), soldeAu: l.solde_au }))),
    };
  } catch (e) {
    // Journal sans aucun secret : seulement le type d'erreur.
    console.error("[compta] lecture impossible", e instanceof Error ? e.name : "erreur");
    return { etat: "erreur" };
  } finally {
    clearTimeout(minuterie);
    await sql.end({ timeout: 2 }).catch(() => {});
  }
}
