import { libellePeriode, onglet, type Espace, type Indicateur, type Liste } from "@/lib/indicateurs";

/**
 * Une carte = un chiffre, avec sa source et sa date. Tant que la source n'est pas branchée,
 * la carte dit clairement qu'il n'y a pas encore de donnée : jamais de chiffre inventé.
 */
function Carte({ ind }: { ind: Indicateur }) {
  const periode = libellePeriode(ind.periode);
  return (
    <article className="flex min-h-36 flex-col justify-between rounded-2xl border border-filet bg-surface p-4 sm:p-5">
      <div>
        <h3 className="text-sm text-doux">{ind.titre}</h3>
        {periode && <p className="mt-0.5 text-xs text-doux">{periode}</p>}
      </div>
      <p className="chiffre mt-3 text-3xl text-doux" aria-label="Pas encore de donnée">
        —
      </p>
      <p className="mt-2 text-xs text-doux">
        <span className="rounded bg-repere px-1.5 py-0.5">Pas encore branché</span>
        <span className="mt-1 block">
          Source : {ind.source} · <code className="text-[11px]">{ind.detail}</code>
        </span>
      </p>
    </article>
  );
}

function Bloc({ liste }: { liste: Liste }) {
  return (
    <section className="rounded-2xl border border-filet bg-surface p-4 sm:p-5">
      <h2 className="titre text-xl">{liste.titre}</h2>
      <p className="mt-4 rounded-xl border border-dashed border-filet px-4 py-6 text-center text-sm text-doux">{liste.vide}</p>
      <p className="mt-3 text-xs text-doux">
        Source : {liste.source} · <code className="text-[11px]">{liste.detail}</code>
      </p>
    </section>
  );
}

export function Tableau({ espace }: { espace: Espace }) {
  const o = onglet(espace);
  return (
    <div className="space-y-6">
      <div>
        <h1 className="titre text-3xl sm:text-4xl">{o.nom}</h1>
        <p className="mt-1 text-sm text-doux">{o.sousTitre}</p>
      </div>
      <div className="grid grid-cols-1 gap-3 min-[420px]:grid-cols-2 lg:grid-cols-3">
        {o.indicateurs.map((i) => (
          <Carte key={i.id} ind={i} />
        ))}
      </div>
      <div className="grid grid-cols-1 gap-3 lg:grid-cols-2">
        {o.listes.map((l) => (
          <Bloc key={l.id} liste={l} />
        ))}
      </div>
    </div>
  );
}
