export function EnTetePage({ rubrique, titre, sousTitre, children }: { rubrique: string; titre: string; sousTitre: string; children?: React.ReactNode }) {
  return (
    <div className="flex flex-wrap items-end justify-between gap-4">
      <div>
        <p className="text-[11px] font-semibold uppercase tracking-[0.16em] text-lien">
          {rubrique} <span className="mx-1 opacity-50">·</span> {titre}
        </p>
        <h1 className="mt-2 text-[34px] font-semibold leading-none tracking-tight sm:text-[42px]">{titre}</h1>
        <p className="mt-2 text-sm text-doux">{sousTitre}</p>
      </div>
      {children}
    </div>
  );
}

export function Absent({ texte }: { texte: string }) {
  return <div className="vitre-puits mt-6 rounded-2xl px-4 py-5 text-sm text-doux">{texte}</div>;
}
