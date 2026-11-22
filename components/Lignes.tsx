import { CircleAlert, CircleCheck, CircleDot, TriangleAlert } from "lucide-react";
import type { LigneDemo, Ton } from "@/lib/demo";
import { COULEUR_SERIE } from "@/lib/format";

/** État : toujours une icône + un mot, jamais la couleur seule. */
export const TONS: Record<Ton, { Icone: typeof CircleCheck; classe: string; mot: string }> = {
  ok: { Icone: CircleCheck, classe: "ton-ok", mot: "OK" },
  attention: { Icone: TriangleAlert, classe: "ton-attention", mot: "À surveiller" },
  alerte: { Icone: CircleAlert, classe: "ton-alerte", mot: "Urgent" },
  neutre: { Icone: CircleDot, classe: "ton-neutre", mot: "Info" },
};

const TAGS = {
  luma: { nom: "Luma", couleur: COULEUR_SERIE.luma },
  hy: { nom: "Yacht", couleur: COULEUR_SERIE.hy },
  perso: { nom: "Perso", couleur: COULEUR_SERIE.perso },
  groupe: { nom: "Groupe", couleur: "#6b6259" },
};

export function Tag({ tag }: { tag: keyof typeof TAGS }) {
  const t = TAGS[tag];
  return (
    <span className="pastille !py-0.5">
      <span className="size-1.5 rounded-full" style={{ background: t.couleur }} aria-hidden />
      {t.nom}
    </span>
  );
}

export function Lignes({ lignes }: { lignes: LigneDemo[] }) {
  return (
    <ul className="space-y-1.5">
      {lignes.map((l, k) => {
        const t = l.ton ? TONS[l.ton] : null;
        return (
          <li key={k} className="ligne-verre flex items-center gap-3 rounded-2xl px-3 py-2.5">
            {t && (
              <span className={`grid size-8 shrink-0 place-items-center rounded-xl ${t.classe}`} title={t.mot}>
                <t.Icone className="size-4" strokeWidth={2} aria-hidden />
                <span className="sr-only">{t.mot}</span>
              </span>
            )}
            <span className="min-w-0 flex-1">
              <span className="block truncate text-[13px] font-medium">{l.titre}</span>
              <span className="block truncate text-xs text-doux">{l.detail}</span>
            </span>
            {l.tag && <Tag tag={l.tag} />}
            {l.droite && <span className="chiffre shrink-0 text-[13px] font-semibold">{l.droite}</span>}
          </li>
        );
      })}
    </ul>
  );
}
