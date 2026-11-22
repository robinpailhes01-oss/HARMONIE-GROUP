import { Bot, Plug, Workflow } from "lucide-react";
import { ETAT_AGENTS_DEMO, ETAT_OUTILS_DEMO, type EtatDemo } from "@/lib/demo";
import { agentsDe, outilsDe } from "@/lib/ecosysteme";
import type { Espace } from "@/lib/indicateurs";
import { TONS } from "./Lignes";

function Etat({ e, aCreer }: { e?: EtatDemo; aCreer?: boolean }) {
  if (aCreer) return <span className="pastille">À créer</span>;
  if (!e) return (
    <span className="pastille">
      <Plug className="size-3" aria-hidden /> Pas branché
    </span>
  );
  const t = TONS[e.ton];
  return (
    <span className={`inline-flex items-center gap-1 rounded-full px-2 py-0.5 text-[11px] font-medium ${t.classe}`}>
      <t.Icone className="size-3" strokeWidth={2.2} aria-hidden /> {e.etat}
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

export function Ecosysteme({ espace, demo }: { espace: Espace; demo: boolean }) {
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
            <p className="text-xs text-doux">{demo ? "Démo · états fictifs" : "Liste réelle · états pas encore branchés"}</p>
          </div>
        </div>
        <ul className="mt-4 space-y-1.5">
          {outils.map((o) => {
            const e = demo ? ETAT_OUTILS_DEMO[o.id] : undefined;
            return (
              <li key={o.id} className="ligne-verre flex items-center gap-3 rounded-2xl px-3 py-2.5">
                <span className="puce !size-8 text-[11px] font-semibold">{initiales(o.nom)}</span>
                <span className="min-w-0 flex-1">
                  <span className="block truncate text-[13px] font-medium">{o.nom}</span>
                  <span className="block truncate text-xs text-doux">{e?.detail ?? o.role}</span>
                </span>
                <Etat e={e} />
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
            <p className="text-xs text-doux">{demo ? "Démo · activité fictive" : "Liste réelle · activité pas encore branchée"}</p>
          </div>
        </div>
        <ul className="mt-4 space-y-1.5">
          {agents.map((a) => {
            const e = demo && !a.aCreer ? ETAT_AGENTS_DEMO[a.id] : undefined;
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
                  <span className="block truncate text-xs text-doux">{e?.detail ?? a.role}</span>
                </span>
                <Etat e={e} aCreer={a.aCreer} />
              </li>
            );
          })}
        </ul>
      </section>
    </div>
  );
}
