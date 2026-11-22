import { ArrowDownRight, ArrowUpRight, CalendarRange, Database, FlaskConical, Lightbulb, Plug } from "lucide-react";
import { DEMO, MOIS, type KpiDemo } from "@/lib/demo";
import { COULEUR_SERIE, euros, nombre, pourcent } from "@/lib/format";
import { libellePeriode, onglet, type Espace, type Indicateur, type Liste } from "@/lib/indicateurs";
import { estDemo } from "@/lib/mode";
import { Ecosysteme } from "./Ecosysteme";
import { GrapheBarres } from "./GrapheBarres";
import { iconeDe } from "./Icones";
import { Lignes, Tag } from "./Lignes";
import { Sparkline } from "./Sparkline";

/**
 * Une carte = un chiffre, avec sa source et sa date.
 * - Mode réel : tant que la source n'est pas branchée, « — » et « Pas branché ». Jamais de chiffre inventé.
 * - Mode démo : valeurs FICTIVES de lib/demo.ts, toujours étiquetées « Démo · données fictives ».
 */

const COULEUR_ESPACE: Record<Espace, string> = { groupe: "#9a6f3e", luma: COULEUR_SERIE.luma, "harmonie-yacht": COULEUR_SERIE.hy, perso: COULEUR_SERIE.perso };
const COULEUR_PAR_ID: Record<string, string> = { "ca-luma": COULEUR_SERIE.luma, "ca-hy": COULEUR_SERIE.hy, "depenses-perso": COULEUR_SERIE.perso };

function valeurAffichee(ind: Indicateur, k: KpiDemo) {
  if (typeof k.valeur === "string") return k.valeur;
  return ind.format === "euros" ? euros(k.valeur) : nombre(k.valeur);
}

function Variation({ k }: { k: KpiDemo }) {
  if (k.variation === undefined) return null;
  const bien = k.sens === "baisse-bien" ? k.variation <= 0 : k.variation >= 0;
  const Fleche = k.variation >= 0 ? ArrowUpRight : ArrowDownRight;
  return (
    <span className={`inline-flex items-center gap-0.5 rounded-full px-1.5 py-0.5 text-[11px] font-semibold ${k.sens ? (bien ? "hausse" : "baisse") : "ton-neutre"}`}>
      <Fleche className="size-3" strokeWidth={2.4} aria-hidden />
      {pourcent(k.variation)}
    </span>
  );
}

function Carte({ ind, espace, demo }: { ind: Indicateur; espace: Espace; demo: boolean }) {
  const Icone = iconeDe(ind.id);
  const periode = libellePeriode(ind.periode);
  const k = demo ? DEMO[espace].kpis[ind.id] : undefined;
  return (
    <article className="vitre carte-levee flex flex-col rounded-[24px] p-4">
      <div className="flex items-center justify-between gap-2">
        <div className="flex min-w-0 items-center gap-2">
          <span className="puce">
            <Icone className="size-4" strokeWidth={1.8} aria-hidden />
          </span>
          <h3 className="truncate text-[13px] font-medium">{ind.titre}</h3>
        </div>
        {k ? (
          <Variation k={k} />
        ) : (
          <span className="pastille shrink-0">
            <Plug className="size-3" strokeWidth={2} aria-hidden />
            Pas branché
          </span>
        )}
      </div>
      {k ? (
        <p className="chiffre mt-4 text-[30px] font-semibold leading-none tracking-tight">{valeurAffichee(ind, k)}</p>
      ) : (
        <p className="chiffre mt-4 text-[30px] font-semibold leading-none tracking-tight text-doux/60" aria-label="Pas encore de donnée">
          —
        </p>
      )}
      <p className="mt-1.5 text-xs text-doux">{periode ?? "Total"}</p>
      {k?.serie ? (
        <Sparkline valeurs={k.serie} couleur={COULEUR_PAR_ID[ind.id] ?? COULEUR_ESPACE[espace]} id={`${espace}-${ind.id}`} />
      ) : (
        <svg className="mt-3 h-9 w-full text-doux/40" viewBox="0 0 200 32" preserveAspectRatio="none" aria-hidden>
          <line x1="0" y1="24" x2="200" y2="24" stroke="currentColor" strokeWidth="1.5" strokeDasharray="3 5" vectorEffect="non-scaling-stroke" />
        </svg>
      )}
      <p className="mt-2 flex items-start gap-1.5 border-t border-filet pt-2.5 text-[11px] leading-snug text-doux">
        {k ? <FlaskConical className="mt-px size-3 shrink-0" strokeWidth={1.8} aria-hidden /> : <Database className="mt-px size-3 shrink-0" strokeWidth={1.8} aria-hidden />}
        <span>
          {k ? "Démo · données fictives · source prévue : " : `${ind.source} · `}
          <code className="font-mono text-[10.5px]">{ind.detail}</code>
        </span>
      </p>
    </article>
  );
}

function EnTeteBloc({ id, titre, sousTitre }: { id: string; titre: string; sousTitre: string }) {
  const Icone = iconeDe(id);
  return (
    <div className="flex items-start gap-3">
      <span className="puce">
        <Icone className="size-4" strokeWidth={1.8} aria-hidden />
      </span>
      <div className="min-w-0">
        <h2 className="text-[15px] font-semibold tracking-tight">{titre}</h2>
        <p className="mt-0.5 text-xs text-doux">{sousTitre}</p>
      </div>
    </div>
  );
}

function Vide({ texte }: { texte: string }) {
  return (
    <div className="vitre-puits mt-4 flex items-center gap-3 rounded-2xl px-4 py-5 text-sm text-doux">
      <Plug className="size-4 shrink-0" strokeWidth={1.8} aria-hidden />
      {texte}
    </div>
  );
}

function Bloc({ liste, espace, demo }: { liste: Liste; espace: Espace; demo: boolean }) {
  const lignes = demo ? DEMO[espace].listes[liste.id] : undefined;
  return (
    <section className="vitre rounded-[24px] p-5">
      <EnTeteBloc
        id={liste.id}
        titre={liste.titre}
        sousTitre={lignes ? `Démo · données fictives · source prévue : ${liste.detail}` : `${liste.source} · ${liste.detail}`}
      />
      {lignes ? (
        <div className="mt-4">
          <Lignes lignes={lignes} />
        </div>
      ) : (
        <Vide texte={liste.vide} />
      )}
    </section>
  );
}

function Repartition({ espace }: { espace: Espace }) {
  const r = DEMO[espace].repartition;
  if (!r) return null;
  const total = r.parts.reduce((a, p) => a + p.valeur, 0);
  return (
    <div className="mt-6 border-t border-filet pt-5">
      <div className="flex items-baseline justify-between">
        <h3 className="text-[13px] font-semibold">{r.titre}</h3>
        <span className="chiffre text-xs text-doux">{euros(total)} de dépenses</span>
      </div>
      <div className="mt-3 flex h-3 gap-[2px] overflow-hidden rounded-full" role="img" aria-label={r.parts.map((p) => `${p.nom} ${euros(p.valeur)}`).join(", ")}>
        {r.parts.map((p) => (
          <span key={p.id} className="h-full first:rounded-l-full last:rounded-r-full" style={{ width: `${(p.valeur / total) * 100}%`, background: COULEUR_SERIE[p.id] }} />
        ))}
      </div>
      <ul className="mt-3 grid grid-cols-3 gap-2 text-xs">
        {r.parts.map((p) => (
          <li key={p.id}>
            <span className="flex items-center gap-1.5 text-doux">
              <span className="size-2 rounded-[2px]" style={{ background: COULEUR_SERIE[p.id] }} aria-hidden />
              {p.nom}
            </span>
            <span className="chiffre mt-0.5 block font-semibold">{euros(p.valeur)}</span>
            <span className="chiffre text-[11px] text-doux">{Math.round((p.valeur / total) * 100)} %</span>
          </li>
        ))}
      </ul>
    </div>
  );
}

export async function Tableau({ espace }: { espace: Espace }) {
  const demo = await estDemo();
  const o = onglet(espace);
  const d = DEMO[espace];
  return (
    <div className="vitre-panneau rounded-[32px] p-4 sm:p-7">
      <div className="flex flex-wrap items-end justify-between gap-4">
        <div>
          <p className="text-[11px] font-semibold uppercase tracking-[0.16em] text-lien">
            {o.rubrique} <span className="mx-1 opacity-50">·</span> {o.nom}
          </p>
          <h1 className="mt-2 text-[34px] font-semibold leading-none tracking-tight sm:text-[42px]">{o.nom}</h1>
          <p className="mt-2 text-sm text-doux">{o.sousTitre}</p>
        </div>
        <div className="flex flex-wrap items-center gap-2">
          {demo && (
            <span className="pastille-demo inline-flex items-center gap-1.5 rounded-full px-3 py-1.5 text-xs font-medium">
              <FlaskConical className="size-3.5" aria-hidden /> Démo · données fictives
            </span>
          )}
          <span className="pastille pastille-grande">
            <CalendarRange className="size-3.5" strokeWidth={1.8} aria-hidden />
            {libellePeriode("annee")}
          </span>
        </div>
      </div>

      <div className="mt-6 grid grid-cols-1 gap-3 min-[460px]:grid-cols-2 xl:grid-cols-3">
        {o.indicateurs.map((i) => (
          <Carte key={i.id} ind={i} espace={espace} demo={demo} />
        ))}
      </div>

      <div className="mt-3 grid grid-cols-1 gap-3 lg:grid-cols-3">
        <section className="vitre rounded-[24px] p-5 lg:col-span-2">
          <EnTeteBloc id="ca-total" titre={d.graphe.titre} sousTitre={demo ? `Démo · données fictives · ${d.graphe.sousTitre}` : "Pas encore branché"} />
          {demo ? (
            <div className="mt-5">
              <GrapheBarres mois={MOIS} series={d.graphe.series} demo />
              {espace === "groupe" && <Repartition espace={espace} />}
            </div>
          ) : (
            <Vide texte="La courbe s'affichera quand la source sera branchée." />
          )}
        </section>
        <section className="vitre rounded-[24px] p-5">
          <div className="flex items-start gap-3">
            <span className="puce">
              <Lightbulb className="size-4" strokeWidth={1.8} aria-hidden />
            </span>
            <div>
              <h2 className="text-[15px] font-semibold tracking-tight">À retenir</h2>
              <p className="mt-0.5 text-xs text-doux">{demo ? "Démo · données fictives" : "Tiré des chiffres, quand ils seront branchés"}</p>
            </div>
          </div>
          {demo ? (
            <ul className="mt-4 space-y-3">
              {d.aRetenir.map((l, k) => (
                <li key={k} className="flex gap-3 border-b border-filet pb-3 last:border-0 last:pb-0">
                  <span className="mt-1 size-1.5 shrink-0 rounded-full bg-[color:var(--lien)]" aria-hidden />
                  <span className="min-w-0 flex-1">
                    <span className="flex items-center gap-2 text-[13px] font-medium">
                      {l.titre} {l.tag && <Tag tag={l.tag} />}
                    </span>
                    <span className="block text-xs text-doux">{l.detail}</span>
                  </span>
                </li>
              ))}
            </ul>
          ) : (
            <Vide texte="Rien à retenir tant qu'aucune source n'est branchée." />
          )}
        </section>
      </div>

      <div className={`mt-3 grid grid-cols-1 gap-3 ${o.listes.length > 1 ? "lg:grid-cols-2" : ""}`}>
        {o.listes.map((l) => (
          <Bloc key={l.id} liste={l} espace={espace} demo={demo} />
        ))}
      </div>

      <div className="mt-3">
        <Ecosysteme espace={espace} demo={demo} />
      </div>
    </div>
  );
}
