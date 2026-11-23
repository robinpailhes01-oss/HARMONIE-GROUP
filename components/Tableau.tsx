import { CalendarRange, Database, Lightbulb, Plug } from "lucide-react";
import { libellePeriode, onglet, type Espace, type Indicateur, type Liste } from "@/lib/indicateurs";
import { Ecosysteme } from "./Ecosysteme";
import { iconeDe } from "./Icones";

/**
 * Une carte = un chiffre, avec sa source et sa date. Tant que la source n'est pas branchée,
 * la carte le dit clairement : « — » et « Pas branché ». Jamais de chiffre inventé, jamais de fausse courbe.
 * Pour brancher une source : lire la donnée côté serveur, en lecture seule, puis afficher la valeur, sa
 * courbe (components/Sparkline), le graphique (components/GrapheBarres) et les listes (components/Lignes).
 */

function Carte({ ind }: { ind: Indicateur }) {
  const Icone = iconeDe(ind.id);
  const periode = libellePeriode(ind.periode);
  return (
    <article className="vitre carte-levee flex flex-col rounded-[24px] p-4">
      <div className="flex items-center justify-between gap-2">
        <div className="flex min-w-0 items-center gap-2">
          <span className="puce">
            <Icone className="size-4" strokeWidth={1.8} aria-hidden />
          </span>
          <h3 className="truncate text-[13px] font-medium">{ind.titre}</h3>
        </div>
        <span className="pastille shrink-0">
          <Plug className="size-3" strokeWidth={2} aria-hidden />
          Pas branché
        </span>
      </div>
      <p className="chiffre mt-4 text-[30px] font-semibold leading-none tracking-tight text-doux/60" aria-label="Pas encore de donnée">
        —
      </p>
      <p className="mt-1.5 text-xs text-doux">{periode ?? "Total"}</p>
      <svg className="mt-3 h-9 w-full text-doux/40" viewBox="0 0 200 32" preserveAspectRatio="none" aria-hidden>
        <line x1="0" y1="24" x2="200" y2="24" stroke="currentColor" strokeWidth="1.5" strokeDasharray="3 5" vectorEffect="non-scaling-stroke" />
      </svg>
      <p className="mt-2 flex items-start gap-1.5 border-t border-filet pt-2.5 text-[11px] leading-snug text-doux">
        <Database className="mt-px size-3 shrink-0" strokeWidth={1.8} aria-hidden />
        <span>
          {ind.source} · <code className="font-mono text-[10.5px]">{ind.detail}</code>
        </span>
      </p>
    </article>
  );
}

function EnTeteBloc({ Icone, titre, sousTitre }: { Icone: ReturnType<typeof iconeDe>; titre: string; sousTitre: string }) {
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

function Bloc({ liste }: { liste: Liste }) {
  return (
    <section className="vitre rounded-[24px] p-5">
      <EnTeteBloc Icone={iconeDe(liste.id)} titre={liste.titre} sousTitre={`${liste.source} · ${liste.detail}`} />
      <Vide texte={liste.vide} />
    </section>
  );
}

const TITRE_GRAPHE: Record<Espace, string> = {
  groupe: "Chiffre d'affaires par mois",
  luma: "CA mensuel",
  "harmonie-yacht": "Recettes et dépenses par mois",
  perso: "Dépenses perso par mois",
};

export function Tableau({ espace }: { espace: Espace }) {
  const o = onglet(espace);
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
        <span className="pastille pastille-grande">
          <CalendarRange className="size-3.5" strokeWidth={1.8} aria-hidden />
          {libellePeriode("annee")}
        </span>
      </div>

      <div className="mt-6 grid grid-cols-1 gap-3 min-[460px]:grid-cols-2 xl:grid-cols-3">
        {o.indicateurs.map((i) => (
          <Carte key={i.id} ind={i} />
        ))}
      </div>

      <div className="mt-3 grid grid-cols-1 gap-3 lg:grid-cols-3">
        <section className="vitre rounded-[24px] p-5 lg:col-span-2">
          <EnTeteBloc Icone={iconeDe("ca-total")} titre={TITRE_GRAPHE[espace]} sousTitre="Pas encore branché" />
          <Vide texte="Le graphique s'affichera quand la source sera branchée." />
        </section>
        <section className="vitre rounded-[24px] p-5">
          <EnTeteBloc Icone={Lightbulb} titre="À retenir" sousTitre="Tiré des chiffres, quand ils seront branchés" />
          <Vide texte="Rien à retenir tant qu'aucune source n'est branchée." />
        </section>
      </div>

      <div className={`mt-3 grid grid-cols-1 gap-3 ${o.listes.length > 1 ? "lg:grid-cols-2" : ""}`}>
        {o.listes.map((l) => (
          <Bloc key={l.id} liste={l} />
        ))}
      </div>

      <div className="mt-3">
        <Ecosysteme espace={espace} />
      </div>
    </div>
  );
}
