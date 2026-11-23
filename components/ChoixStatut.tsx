"use client";

import { useTransition } from "react";
import { changerStatut } from "@/app/actions";
import { LIBELLE_STATUT } from "@/lib/statuts";


/** Le statut d'un agent, modifiable par Robin. */
export function ChoixStatut({ id, statut }: { id: string; statut: string | null }) {
  const [enCours, demarrer] = useTransition();
  const v = statut ?? "";
  return (
    <select
      aria-label="Statut"
      value={v}
      disabled={enCours}
      onChange={(e) => {
        const n = e.target.value;
        demarrer(() => changerStatut(id, n));
      }}
      className={`statut statut-${v || "vide"} w-fit cursor-pointer appearance-none rounded-full px-2.5 py-1 text-center text-[11px] font-medium outline-none disabled:opacity-60`}
    >
      {Object.entries(LIBELLE_STATUT).map(([k, l]) => (
        <option key={k} value={k}>
          {l}
        </option>
      ))}
    </select>
  );
}
