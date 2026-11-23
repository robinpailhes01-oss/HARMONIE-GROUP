/** Petite courbe de tendance (une seule série) : trait de 2 px, aire très légère, dernier point marqué. */
export function Sparkline({ valeurs, couleur, id }: { valeurs: number[]; couleur: string; id: string }) {
  if (valeurs.length < 2) return null;
  const max = Math.max(...valeurs);
  const min = Math.min(...valeurs);
  const plage = max - min || 1;
  const pts = valeurs.map((v, i) => [(i / (valeurs.length - 1)) * 100, 28 - ((v - min) / plage) * 24] as const);
  const ligne = pts.map(([x, y], i) => `${i ? "L" : "M"}${x.toFixed(2)},${y.toFixed(2)}`).join(" ");
  const [dx, dy] = pts[pts.length - 1];
  return (
    <div className="relative mt-3 h-9 w-full" aria-hidden>
      <svg className="absolute inset-0 h-full w-full overflow-visible" viewBox="0 0 100 32" preserveAspectRatio="none">
        <defs>
          <linearGradient id={`g-${id}`} x1="0" x2="0" y1="0" y2="1">
            <stop offset="0" stopColor={couleur} stopOpacity="0.22" />
            <stop offset="1" stopColor={couleur} stopOpacity="0" />
          </linearGradient>
        </defs>
        <path d={`${ligne} L100,32 L0,32 Z`} fill={`url(#g-${id})`} />
        <path d={ligne} fill="none" stroke={couleur} strokeWidth="2" strokeLinejoin="round" strokeLinecap="round" vectorEffect="non-scaling-stroke" />
      </svg>
      <span className="absolute size-2 -translate-x-1/2 -translate-y-1/2 rounded-full ring-2 ring-white" style={{ left: `${dx}%`, top: `${(dy / 32) * 100}%`, background: couleur }} />
    </div>
  );
}
