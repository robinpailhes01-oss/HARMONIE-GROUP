import { LockKeyhole } from "lucide-react";
import { Scene } from "./Navigation";

/** Champs et bouton partagés par la connexion et l'activation du code. */
export function Champ(props: { nom: string; label: string; type?: string; autoComplete?: string; inputMode?: "numeric"; pattern?: string; maxLength?: number; code?: boolean }) {
  return (
    <label className="block">
      <span className="text-[13px] font-medium text-doux">{props.label}</span>
      <input
        name={props.nom}
        type={props.type ?? "text"}
        required
        autoComplete={props.autoComplete}
        inputMode={props.inputMode}
        pattern={props.pattern}
        maxLength={props.maxLength}
        className={`vitre-puits mt-1.5 block w-full rounded-2xl px-4 py-3 text-texte outline-none focus:border-accent ${props.code ? "chiffre text-center text-2xl font-semibold tracking-[0.5em]" : "text-base"}`}
      />
    </label>
  );
}

export function Bouton({ children }: { children: React.ReactNode }) {
  return (
    <button type="submit" className="bouton-plein w-full rounded-full px-4 py-3.5 text-sm font-medium hover:opacity-95">
      {children}
    </button>
  );
}

export function Cadre({ titre, children }: { titre: string; children: React.ReactNode }) {
  return (
    <div data-espace="groupe" className="espace flex min-h-dvh items-center justify-center px-4 py-10">
      <Scene />
      <div className="vitre-panneau w-full max-w-sm rounded-[32px] p-6 text-center sm:p-8">
        <span className="bouton-plein mx-auto grid size-16 place-items-center rounded-full">
          <LockKeyhole className="size-6" strokeWidth={1.8} aria-hidden />
        </span>
        <p className="mt-5 text-[11px] font-semibold uppercase tracking-[0.16em] text-lien">Harmonie Group</p>
        <h1 className="mt-1 text-3xl font-semibold tracking-tight">{titre}</h1>
        <div className="mt-6 text-left">{children}</div>
      </div>
    </div>
  );
}
