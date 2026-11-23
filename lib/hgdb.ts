/**
 * La petite base d'Harmonie Group (Supabase « harmonie-group », créée le 23/11/2026 avec l'OK de Robin) :
 * le registre de l'équipe, les outils, les temps standards et les réglages. Elle n'appartient qu'à Harmonie Group.
 * Lecture et écriture côté serveur uniquement, avec la clé service (Vercel : HG_SUPABASE_URL, HG_SUPABASE_SERVICE_KEY).
 */
import "server-only";

export type StatutAgent = "actif" | "en_construction" | "prevu" | "en_pause";
export type AgentRegistre = {
  id: string;
  nom: string;
  role: string;
  espace: "groupe" | "luma" | "harmonie-yacht";
  equipe: string;
  type: "agent" | "session" | "automatisme";
  statut: StatutAgent | null;
  journal_id: string | null;
  source: string;
  note: string | null;
  ordre: number;
  maj_le: string;
};
export type OutilRegistre = { id: string; nom: string; role: string; espace: AgentRegistre["espace"]; ordre: number };
export type TempsStandard = { activite: string; libelle: string; minutes: number; valide_le: string };
export type Reglage = { cle: string; valeur: string | null; note: string | null };

function config() {
  const url = process.env.HG_SUPABASE_URL?.trim();
  const cle = process.env.HG_SUPABASE_SERVICE_KEY?.trim();
  return url && cle ? { url: url.replace(/\/$/, ""), cle } : null;
}

export const baseBranchee = () => config() !== null;

async function lire<T>(table: string, requete: string): Promise<T[] | null> {
  const c = config();
  if (!c) return null;
  const r = await fetch(`${c.url}/rest/v1/${table}?${requete}`, {
    headers: { apikey: c.cle, Authorization: `Bearer ${c.cle}` },
    cache: "no-store",
  });
  if (!r.ok) {
    console.error(`[hgdb] lecture ${table} : ${r.status}`);
    return null;
  }
  return (await r.json()) as T[];
}

export const lireAgents = () => lire<AgentRegistre>("hg_agents", "select=*&order=ordre.asc");
export const lireOutils = () => lire<OutilRegistre>("hg_outils", "select=*&order=ordre.asc");
export const lireTemps = () => lire<TempsStandard>("hg_temps_standard", "select=*&order=minutes.desc");
export const lireReglages = () => lire<Reglage>("hg_reglages", "select=cle,valeur,note");

/** Seule écriture de l'application : le statut d'un agent, choisi par Robin. */
export async function ecrireStatut(id: string, statut: StatutAgent | null) {
  const c = config();
  if (!c) throw new Error("Base Harmonie Group non branchée.");
  const r = await fetch(`${c.url}/rest/v1/hg_agents?id=eq.${encodeURIComponent(id)}`, {
    method: "PATCH",
    headers: { apikey: c.cle, Authorization: `Bearer ${c.cle}`, "Content-Type": "application/json", Prefer: "return=minimal" },
    body: JSON.stringify({ statut, maj_le: new Date().toISOString() }),
  });
  if (!r.ok) throw new Error(`Écriture refusée (${r.status}).`);
}
