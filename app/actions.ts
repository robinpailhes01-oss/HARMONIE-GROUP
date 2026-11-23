"use server";

import { cookies } from "next/headers";
import { revalidatePath } from "next/cache";
import { SESSION_COOKIE, verifySession } from "@/lib/auth";
import { ecrireStatut, type StatutAgent } from "@/lib/hgdb";

const STATUTS: (StatutAgent | null)[] = ["actif", "en_construction", "prevu", "en_pause", null];

/** Change le statut d'un agent (page Équipe). Session vérifiée ici aussi : une action serveur est une route publique. */
export async function changerStatut(id: string, statut: string) {
  if (!(await verifySession((await cookies()).get(SESSION_COOKIE)?.value))) throw new Error("Non connecté.");
  const s = (statut === "" ? null : statut) as StatutAgent | null;
  if (!STATUTS.includes(s) || !/^[a-z0-9-]{1,40}$/.test(id)) throw new Error("Valeur refusée.");
  await ecrireStatut(id, s);
  revalidatePath("/equipe");
}
