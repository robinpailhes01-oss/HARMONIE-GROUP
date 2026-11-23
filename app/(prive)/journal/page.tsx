import type { Metadata } from "next";
import { Calculator, Clock, Euro, Plug, ScrollText } from "lucide-react";
import { Absent, EnTetePage } from "@/components/EnTetePage";
import { lireReglages, lireTemps } from "@/lib/hgdb";
import { euros } from "@/lib/format";

export const metadata: Metadata = { title: "Journal" };
export const dynamic = "force-dynamic";

/**
 * Journal de tout ce que font les agents + estimation du temps et de l'argent économisés.
 * Méthode (validée par Robin le 23/11/2026) :
 *   temps = Σ (actions du journal × minutes standard du type) − actions × minutes de validation de Robin
 *   argent = temps × valeur d'une heure de Robin (si réglée) − coût des outils (luma_v_charges)
 * Toujours affiché comme une ESTIMATION, calcul visible. Le journal source (Luma : studio_activity, hermes.activite,
 * jarvis_journal ; Harmonie Yacht : à définir) n'est pas encore lisible : en attente de l'accès en lecture seule.
 */
export default async function Journal() {
  const [temps, reglages] = await Promise.all([lireTemps(), lireReglages()]);
  const r = (cle: string) => reglages?.find((x) => x.cle === cle);
  const valeurHeure = r("valeur_heure")?.valeur ? Number(r("valeur_heure")!.valeur) : null;
  const validation = r("minutes_validation")?.valeur ?? null;

  return (
    <div className="vitre-panneau rounded-[32px] p-4 sm:p-7">
      <EnTetePage rubrique="Organisation" titre="Journal" sousTitre="Tout ce que les agents ont fait, et le temps que ça t'a fait gagner." />

      <div className="mt-6 grid grid-cols-1 gap-3 sm:grid-cols-3">
        {[
          { Icone: ScrollText, titre: "Actions des agents", valeur: "—" },
          { Icone: Clock, titre: "Heures économisées (estimation)", valeur: "—" },
          { Icone: Euro, titre: "Argent économisé (estimation)", valeur: valeurHeure === null ? "Heure à régler" : "—" },
        ].map(({ Icone, titre, valeur }) => (
          <article key={titre} className="vitre rounded-[24px] p-4">
            <div className="flex items-center justify-between gap-2">
              <span className="flex items-center gap-2 text-[13px] font-medium">
                <span className="puce">
                  <Icone className="size-4" strokeWidth={1.8} aria-hidden />
                </span>
                {titre}
              </span>
              <span className="pastille">
                <Plug className="size-3" aria-hidden /> Pas branché
              </span>
            </div>
            <p className={`chiffre mt-4 font-semibold tracking-tight ${valeur === "—" ? "text-[30px] text-doux/60" : "text-base text-doux"}`}>{valeur}</p>
          </article>
        ))}
      </div>

      <div className="mt-3 grid grid-cols-1 gap-3 lg:grid-cols-3">
        <section className="vitre rounded-[24px] p-5 lg:col-span-2">
          <h2 className="flex items-center gap-2 text-[15px] font-semibold tracking-tight">
            <span className="puce">
              <ScrollText className="size-4" strokeWidth={1.8} aria-hidden />
            </span>
            Fil d&apos;activité
          </h2>
          <Absent texte="En attente de l'accès en lecture seule au journal de Luma (studio_activity, Hermes, Jarvis) et à la base d'Harmonie Yacht." />
        </section>

        <section className="vitre rounded-[24px] p-5">
          <h2 className="flex items-center gap-2 text-[15px] font-semibold tracking-tight">
            <span className="puce">
              <Calculator className="size-4" strokeWidth={1.8} aria-hidden />
            </span>
            Le calcul
          </h2>
          <p className="mt-3 text-xs leading-relaxed text-doux">
            Temps = actions × minutes à la main − actions × {validation ?? "?"} min de validation.
            <br />
            Argent = temps × {valeurHeure === null ? "valeur d'une heure (à régler)" : `${euros(valeurHeure)} de l'heure`} − coût des outils.
          </p>
          {temps ? (
            <ul className="mt-3 space-y-1.5">
              {temps.map((t) => (
                <li key={t.activite} className="ligne-verre flex items-center justify-between gap-2 rounded-xl px-3 py-2 text-[13px]">
                  <span>{t.libelle}</span>
                  <span className="chiffre shrink-0 font-semibold">{t.minutes} min</span>
                </li>
              ))}
            </ul>
          ) : (
            <Absent texte="La base Harmonie Group n'est pas encore branchée." />
          )}
          {r("valeur_heure")?.note && <p className="mt-3 text-[11px] text-doux">{r("valeur_heure")!.note}</p>}
        </section>
      </div>
    </div>
  );
}
