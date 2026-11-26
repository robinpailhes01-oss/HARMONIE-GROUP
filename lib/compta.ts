import postgres from "postgres";
import { bornesAnnee, choisirSoldes, type CaLuma, type CompteCourant, type LigneCompte, type Soldes } from "./soldes";

/**
 * Lecture de la compta d'Harmonie Group : base Supabase « harmonie-group », tables compta_*,
 * avec le rôle `groupe_lecture` (lecture seule, 3 tables). La chaîne de connexion est dans Vercel
 * (COMPTA_LECTURE_URL, Production) : jamais dans un fichier. Aucune écriture ici, jamais.
 * Seuls les comptes de l'entreprise sont lus : le perso n'apparaît que sur l'onglet Perso.
 */
export type Compta = { soldes: Soldes; compteCourant: CompteCourant; caLuma: CaLuma };
export type EtatCompta = { etat: "pas_branche" } | { etat: "erreur" } | { etat: "ok"; compta: Compta };

type LigneSolde = { nom: string; role: LigneCompte["role"]; solde: string | null; solde_au: Date | null };
type LigneCc = { solde: string; dernier: string | null; nombre: string };
type LigneCa = { ttc: string; nombre: string };

export async function lireCompta(): Promise<EtatCompta> {
  const url = process.env.COMPTA_LECTURE_URL;
  if (!url) return { etat: "pas_branche" };
  const sql = postgres(url, { max: 1, prepare: false, idle_timeout: 5, connect_timeout: 5, ssl: "require" });
  let minuterie: ReturnType<typeof setTimeout> | undefined;
  try {
    const { annee, debut, fin } = bornesAnnee();
    // Délai maximum : si la base répond trop lentement, la page affiche « Lecture impossible » au lieu de rester bloquée.
    const delai = new Promise<never>((_, refuse) => {
      minuterie = setTimeout(() => refuse(Object.assign(new Error("délai dépassé"), { name: "DelaiDepasse" })), 8000);
    });
    const [comptes, cc, ca] = await Promise.race([
      Promise.all([
        sql<LigneSolde[]>`
          select nom, role, solde, solde_au
          from public.compta_comptes
          where actif and portee = 'entreprise'
          order by solde_au desc nulls last`,
        // Compte courant de Mme Cadot : apports (+) moins remboursements (−), depuis le début.
        sql<LigneCc[]>`
          select coalesce(sum(montant), 0) as solde, max(date_operation)::text as dernier, count(*) as nombre
          from public.compta_mouvements
          where nature = 'compte_courant'`,
        // CA encaissé de Luma, TTC, par date d'encaissement, sur l'année civile.
        sql<LigneCa[]>`
          select coalesce(sum(montant), 0) as ttc, count(*) as nombre
          from public.compta_mouvements
          where nature = 'vente' and classement = 'luma' and date_operation between ${debut}::date and ${fin}::date`,
      ]),
      delai,
    ]);
    return {
      etat: "ok",
      compta: {
        soldes: choisirSoldes(comptes.map((l) => ({ nom: l.nom, role: l.role, solde: l.solde === null ? null : Number(l.solde), soldeAu: l.solde_au }))),
        compteCourant: { solde: Number(cc[0].solde), dernier: cc[0].dernier, nombre: Number(cc[0].nombre) },
        caLuma: { ttc: Number(ca[0].ttc), nombre: Number(ca[0].nombre), annee },
      },
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
