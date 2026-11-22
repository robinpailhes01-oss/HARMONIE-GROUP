/** Champs et bouton partagés par la connexion et l'activation du code. */
export function Champ(props: { nom: string; label: string; type?: string; autoComplete?: string; inputMode?: "numeric"; pattern?: string; maxLength?: number }) {
  return (
    <label className="block">
      <span className="text-sm text-doux">{props.label}</span>
      <input
        name={props.nom}
        type={props.type ?? "text"}
        required
        autoComplete={props.autoComplete}
        inputMode={props.inputMode}
        pattern={props.pattern}
        maxLength={props.maxLength}
        className="mt-1 block w-full rounded-xl border border-filet bg-fond px-3 py-3 text-base text-texte outline-none focus:border-accent"
      />
    </label>
  );
}

export function Bouton({ children }: { children: React.ReactNode }) {
  return (
    <button type="submit" className="w-full rounded-full bg-accent px-4 py-3 text-sm font-medium text-accent-texte hover:opacity-90">
      {children}
    </button>
  );
}

export function Cadre({ titre, children }: { titre: string; children: React.ReactNode }) {
  return (
    <div data-espace="groupe" className="espace flex min-h-dvh items-center justify-center px-4 py-10">
      <div className="w-full max-w-sm rounded-2xl border border-filet bg-surface p-6 sm:p-8">
        <p className="text-xs uppercase tracking-widest text-doux">Harmonie Group</p>
        <h1 className="titre mt-1 text-3xl">{titre}</h1>
        <div className="mt-6">{children}</div>
      </div>
    </div>
  );
}
