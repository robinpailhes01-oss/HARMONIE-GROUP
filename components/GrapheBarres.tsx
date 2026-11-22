"use client";

import { useState } from "react";
import { COULEUR_SERIE, euros, eurosCourt } from "@/lib/format";

type Serie = { id: keyof typeof COULEUR_SERIE; nom: string; valeurs: number[] };

/**
 * Barres groupées par mois (1 ou 2 séries, une seule échelle). Survol d'un mois : info-bulle avec les valeurs.
 * Légende dès 2 séries ; les étiquettes restent dans les couleurs du texte, la couleur ne porte que l'identité.
 */
export function GrapheBarres({ mois, series }: { mois: string[]; series: Serie[] }) {
  const [survol, setSurvol] = useState<number | null>(null);
  const max = Math.max(1, ...series.flatMap((s) => s.valeurs));
  const pas = Math.pow(10, Math.floor(Math.log10(max)));
  const haut = Math.ceil(max / pas) * pas;
  const graduations = [0, haut / 2, haut];

  return (
    <div>
      {series.length > 1 && (
        <ul className="mb-3 flex flex-wrap gap-x-4 gap-y-1 text-xs text-doux">
          {series.map((s) => (
            <li key={s.id} className="inline-flex items-center gap-1.5">
              <span className="size-2.5 rounded-[3px]" style={{ background: COULEUR_SERIE[s.id] }} />
              {s.nom}
            </li>
          ))}
        </ul>
      )}
      <div className="relative mt-4 h-52 pl-10">
        {graduations.map((g) => (
          <div key={g} className="absolute inset-x-0 flex items-center gap-2" style={{ bottom: `${(g / haut) * 100}%` }}>
            <span className="chiffre w-8 -translate-y-1/2 text-right text-[10px] text-doux">{eurosCourt(g)}</span>
            <span className="h-px flex-1 -translate-y-1/2 bg-[color:var(--filet)]" />
          </div>
        ))}
        <div className="absolute inset-y-0 left-10 right-0 flex items-end gap-1 sm:gap-2" onMouseLeave={() => setSurvol(null)}>
          {mois.map((m, i) => (
            <button
              type="button"
              key={m}
              onMouseEnter={() => setSurvol(i)}
              onFocus={() => setSurvol(i)}
              onBlur={() => setSurvol(null)}
              aria-label={`${m} : ${series.map((s) => `${s.nom} ${euros(s.valeurs[i])}`).join(", ")}`}
              className={`relative flex h-full flex-1 items-end justify-center gap-[2px] rounded-lg transition-colors ${survol === i ? "bg-[rgb(var(--teinte)/0.07)]" : ""}`}
            >
              {series.map((s) => (
                <span
                  key={s.id}
                  className="w-full max-w-4 rounded-t-[4px] transition-opacity"
                  style={{ height: `${(s.valeurs[i] / haut) * 100}%`, minHeight: s.valeurs[i] ? 2 : 0, background: COULEUR_SERIE[s.id], opacity: survol === null || survol === i ? 1 : 0.45 }}
                />
              ))}
              {survol === i && (
                <span className="vitre pointer-events-none absolute bottom-full z-10 mb-2 w-max rounded-xl px-3 py-2 text-left text-xs shadow-lg">
                  <span className="block font-medium">
                    {m}
                  </span>
                  {series.map((s) => (
                    <span key={s.id} className="mt-0.5 flex items-center gap-1.5">
                      <span className="size-2 rounded-[2px]" style={{ background: COULEUR_SERIE[s.id] }} />
                      <span className="text-doux">{s.nom}</span>
                      <span className="chiffre ml-auto pl-3 font-medium">{euros(s.valeurs[i])}</span>
                    </span>
                  ))}
                </span>
              )}
            </button>
          ))}
        </div>
      </div>
      <div className="ml-10 mt-2 flex gap-1 sm:gap-2">
        {mois.map((m, i) => (
          <span key={m} className={`flex-1 text-center text-[10px] text-doux ${i % 2 ? "max-sm:invisible" : ""}`}>
            {m}
          </span>
        ))}
      </div>
    </div>
  );
}
