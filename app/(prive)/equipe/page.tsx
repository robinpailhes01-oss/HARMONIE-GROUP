import type { Metadata } from "next";
import { Absent, EnTetePage } from "@/components/EnTetePage";
import { Organigramme } from "@/components/Organigramme";
import { lireAgents, lireOutils } from "@/lib/hgdb";

export const metadata: Metadata = { title: "Équipe" };
export const dynamic = "force-dynamic";

export default async function Equipe() {
  const [agents, outils] = await Promise.all([lireAgents(), lireOutils()]);
  return (
    <div className="vitre-panneau rounded-[32px] p-4 sm:p-7">
      <EnTetePage rubrique="Organisation" titre="Équipe" sousTitre="Toute la structure : les agents, les sessions, les automatismes et les outils. Le statut se change d'un clic." />
      {agents && outils ? (
        <div className="mt-6">
          <Organigramme agents={agents} outils={outils} />
        </div>
      ) : (
        <Absent texte="La base Harmonie Group n'est pas encore branchée (variables HG_SUPABASE_URL et HG_SUPABASE_SERVICE_KEY dans Vercel)." />
      )}
    </div>
  );
}
