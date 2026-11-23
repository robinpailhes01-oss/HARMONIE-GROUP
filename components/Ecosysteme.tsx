import { Bot, Plug, Workflow } from "lucide-react";
import { agentsDe, outilsDe, type Agent, type Outil } from "@/lib/ecosysteme";
import { lireAgents, lireOutils } from "@/lib/hgdb";
import { LIBELLE_STATUT } from "@/lib/statuts";
import type { Espace } from "@/lib/indicateurs";

function Etat({ aCreer, statut }: { aCreer?: boolean; statut?: string | null }) {
  if (statut !== undefined) return <span className={`statut statut-${statut || "vide"} rounded-full px-2.5 py-1 text-[11px] font-medium`}>{LIBELLE_STATUT[statut ?? ""]}</span>;
  if (aCreer) return <span className="pastille">À créer</span>;
  return (
    <span className="pastille">
      <Plug className="size-3" aria-hidden /> Pas branché
    </span>
  );
}

function initiales(nom: string) {
  return nom
    .split(/[\s·]+/)
    .filter(Boolean)
    .slice(0, 2)
    .map((m) => m[0])
    .join("")
    .toUpperCase();
}

type AgentAffiche = Agent & { statut?: string | null };

/** La liste vient du registre (base Harmonie Group, page Équipe) quand il est branché ; sinon de lib/ecosysteme.ts. */
export async function Ecosysteme({ espace }: { espace: Espace }) {
  const [reg, regOutils] = await Promise.all([lireAgents(), lireOutils()]);
  const garder = (e: string, id: string) => espace === "groupe" || (espace === "perso" ? id === "comptable" || id === "qonto" : e === espace);
  const agents: AgentAffiche[] = reg
    ? reg.filter((a) => garder(a.espace, a.id) && a.statut !== "prevu").map((a) => ({ id: a.id, nom: a.nom, role: a.role, espace: a.espace, type: a.type === "session" ? "agent" : a.type, statut: a.statut }))
    : agentsDe(espace);
  const outils: Outil[] = regOutils ? regOutils.filter((o) => garder(o.espace, o.id) || o.id === "qonto") : outilsDe(espace);
  return (
    <div className="grid grid-cols-1 gap-3 xl:grid-cols-2">
      <section className="vitre rounded-[24px] p-5">
        <div className="flex items-center gap-3">
          <span className="puce">
            <Plug className="size-4" strokeWidth={1.8} aria-hidden />
          </span>
          <div>
            <h2 className="text-[15px] font-semibold tracking-tight">Outils connectés</h2>
            <p className="text-xs text-doux">Liste réelle · états pas encore branchés</p>
          </div>
        </div>
        <ul className="mt-4 space-y-1.5">
          {outils.map((o) => {
            return (
              <li key={o.id} className="ligne-verre flex items-center gap-3 rounded-2xl px-3 py-2.5">
                <span className="puce !size-8 text-[11px] font-semibold">{initiales(o.nom)}</span>
                <span className="min-w-0 flex-1">
                  <span className="block truncate text-[13px] font-medium">{o.nom}</span>
                  <span className="block truncate text-xs text-doux">{o.role}</span>
                </span>
                <Etat />
              </li>
            );
          })}
        </ul>
      </section>
      <section className="vitre rounded-[24px] p-5">
        <div className="flex items-center gap-3">
          <span className="puce">
            <Bot className="size-4" strokeWidth={1.8} aria-hidden />
          </span>
          <div>
            <h2 className="text-[15px] font-semibold tracking-tight">Agents et automatismes</h2>
            <p className="text-xs text-doux">Statuts de la page Équipe · activité pas encore branchée</p>
          </div>
        </div>
        <ul className="mt-4 space-y-1.5">
          {agents.map((a) => {
            const Icone = a.type === "agent" ? Bot : Workflow;
            return (
              <li key={a.id} className="ligne-verre flex items-center gap-3 rounded-2xl px-3 py-2.5">
                <span className={`grid size-9 shrink-0 place-items-center rounded-full ${a.type === "agent" ? "bouton-plein" : "puce"}`}>
                  {a.type === "agent" ? <span className="text-xs font-semibold">{initiales(a.nom)}</span> : <Icone className="size-4" strokeWidth={1.8} aria-hidden />}
                </span>
                <span className="min-w-0 flex-1">
                  <span className="block truncate text-[13px] font-medium">
                    {a.nom} <span className="font-normal text-doux">· {a.type === "agent" ? "agent" : "automatisme"}</span>
                  </span>
                  <span className="block truncate text-xs text-doux">{a.role}</span>
                </span>
                <Etat aCreer={a.aCreer} statut={a.statut} />
              </li>
            );
          })}
        </ul>
      </section>
    </div>
  );
}
