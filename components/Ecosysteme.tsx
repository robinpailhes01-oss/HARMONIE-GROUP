import { Bot, Plug, Workflow } from "lucide-react";
import { agentsDe, outilsDe } from "@/lib/ecosysteme";
import type { Espace } from "@/lib/indicateurs";

function Etat({ aCreer }: { aCreer?: boolean }) {
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

export function Ecosysteme({ espace }: { espace: Espace }) {
  const outils = outilsDe(espace);
  const agents = agentsDe(espace);
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
            <p className="text-xs text-doux">Liste réelle · activité pas encore branchée</p>
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
                <Etat aCreer={a.aCreer} />
              </li>
            );
          })}
        </ul>
      </section>
    </div>
  );
}
