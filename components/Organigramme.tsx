import { Anchor, Bot, Crown, LayoutGrid, Plug, Sparkles, Terminal, Workflow } from "lucide-react";
import type { AgentRegistre, OutilRegistre } from "@/lib/hgdb";
import { LIBELLE_STATUT } from "@/lib/statuts";
import { ChoixStatut } from "./ChoixStatut";

const ICONE_TYPE = { agent: Bot, session: Terminal, automatisme: Workflow };
const BRANCHES = [
  { espace: "groupe", nom: "Harmonie Group", sous: "Le groupe", Icone: LayoutGrid, couleur: "#9a6f3e" },
  { espace: "luma", nom: "Luma", sous: "L'agence IA", Icone: Sparkles, couleur: "#6b4fd8" },
  { espace: "harmonie-yacht", nom: "Harmonie Yacht", sous: "La location du yacht", Icone: Anchor, couleur: "#1a9bb5" },
] as const;

function Fiche({ a }: { a: AgentRegistre }) {
  const Icone = ICONE_TYPE[a.type];
  const prevu = a.statut === "prevu";
  return (
    <li className={`ligne-verre flex items-start gap-3 rounded-2xl px-3 py-2.5 ${prevu ? "opacity-75" : ""}`}>
      <span className={`grid size-9 shrink-0 place-items-center rounded-full ${a.type === "agent" && !prevu ? "bouton-plein" : "puce"}`}>
        {a.type === "agent" && !prevu ? <span className="text-xs font-semibold">{a.nom.slice(0, 1)}</span> : <Icone className="size-4" strokeWidth={1.8} aria-hidden />}
      </span>
      <span className="min-w-0 flex-1">
        <span className="block text-[13px] font-medium leading-tight">{a.nom}</span>
        <span className="block text-xs text-doux">{a.role}</span>
        {a.note && <span className="mt-0.5 block text-[11px] italic text-doux">{a.note}</span>}
        <span className="mt-1.5 block">
          <ChoixStatut id={a.id} statut={a.statut} />
        </span>
      </span>
    </li>
  );
}

export function Organigramme({ agents, outils }: { agents: AgentRegistre[]; outils: OutilRegistre[] }) {
  const compte = (s: string | null) => agents.filter((a) => (a.statut ?? "") === (s ?? "")).length;
  return (
    <div className="space-y-4">
      {/* Résumé */}
      <div className="grid grid-cols-2 gap-2 sm:grid-cols-5">
        {(["actif", "en_construction", "prevu", "en_pause", null] as const).map((s) => (
          <div key={s ?? "vide"} className="vitre rounded-2xl px-4 py-3">
            <p className="chiffre text-2xl font-semibold tracking-tight">{compte(s)}</p>
            <p className="text-xs text-doux">{LIBELLE_STATUT[s ?? ""]}</p>
          </div>
        ))}
      </div>

      {/* Sommet : Robin */}
      <div className="flex flex-col items-center">
        <div className="vitre flex items-center gap-3 rounded-full py-2 pl-2 pr-5">
          <span className="bouton-plein grid size-10 place-items-center rounded-full">
            <Crown className="size-4" strokeWidth={1.8} aria-hidden />
          </span>
          <span>
            <span className="block text-sm font-semibold">Robin</span>
            <span className="block text-xs text-doux">Fondateur · décide et valide</span>
          </span>
        </div>
        <span className="h-6 w-px bg-[color:var(--filet)]" aria-hidden />
      </div>

      {/* Branches */}
      <div className="grid grid-cols-1 items-start gap-3 xl:grid-cols-4">
        {BRANCHES.map((b) => {
          const membres = agents.filter((a) => a.espace === b.espace);
          const equipes = Array.from(new Set(membres.map((a) => a.equipe)));
          return (
            <section key={b.espace} className={`vitre rounded-[24px] p-4 sm:p-5 ${b.espace === "luma" ? "xl:col-span-2" : ""}`}>
              <div className="flex items-center gap-3 border-b border-filet pb-3">
                <span className="grid size-10 place-items-center rounded-2xl text-white" style={{ background: b.couleur }}>
                  <b.Icone className="size-5" strokeWidth={1.8} aria-hidden />
                </span>
                <div className="min-w-0 flex-1">
                  <h2 className="text-[15px] font-semibold tracking-tight">{b.nom}</h2>
                  <p className="text-xs text-doux">
                    {b.sous} · {membres.length} membres
                  </p>
                </div>
              </div>
              <div className={`mt-3 ${b.espace === "luma" ? "gap-4 md:columns-2 [&>div]:mb-4 [&>div]:break-inside-avoid" : "space-y-4"}`}>
                {equipes.map((e) => (
                  <div key={e}>
                    <p className="mb-1.5 px-1 text-[11px] font-semibold uppercase tracking-[0.12em] text-doux">{e}</p>
                    <ul className="space-y-1.5">
                      {membres
                        .filter((a) => a.equipe === e)
                        .map((a) => (
                          <Fiche key={a.id} a={a} />
                        ))}
                    </ul>
                  </div>
                ))}
              </div>
            </section>
          );
        })}
      </div>

      {/* Outils */}
      <section className="vitre rounded-[24px] p-5">
        <div className="flex items-center gap-3">
          <span className="puce">
            <Plug className="size-4" strokeWidth={1.8} aria-hidden />
          </span>
          <div>
            <h2 className="text-[15px] font-semibold tracking-tight">Outils connectés</h2>
            <p className="text-xs text-doux">{outils.length} outils · état en direct pas encore branché</p>
          </div>
        </div>
        <ul className="mt-4 grid grid-cols-1 gap-1.5 sm:grid-cols-2 xl:grid-cols-3">
          {outils.map((o) => (
            <li key={o.id} className="ligne-verre flex items-center gap-3 rounded-2xl px-3 py-2.5">
              <span className="size-2 shrink-0 rounded-full" style={{ background: BRANCHES.find((b) => b.espace === o.espace)?.couleur }} aria-hidden />
              <span className="min-w-0">
                <span className="block truncate text-[13px] font-medium">{o.nom}</span>
                <span className="block truncate text-xs text-doux">{o.role}</span>
              </span>
            </li>
          ))}
        </ul>
      </section>
    </div>
  );
}
