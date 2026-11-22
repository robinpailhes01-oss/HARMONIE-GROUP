"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { LogOut } from "lucide-react";
import { ONGLETS, etatSources, type Espace } from "@/lib/indicateurs";
import { BasculeDemo } from "./BasculeDemo";
import { BasculeTheme } from "./BasculeTheme";
import { ICONE_ESPACE } from "./Icones";

export function espaceDe(pathname: string): Espace {
  const o = ONGLETS.find((x) => pathname === x.href || pathname.startsWith(`${x.href}/`));
  return o?.espace ?? "groupe";
}

const RUBRIQUES = ["Pilotage", "Activités", "Personnel"];

function Marque() {
  return (
    <div className="flex items-center gap-3">
      <span className="bouton-plein grid size-10 place-items-center rounded-2xl">
        <span className="titre text-base">HG</span>
      </span>
      <span className="leading-tight">
        <span className="block text-[15px] font-semibold tracking-tight">Harmonie Group</span>
        <span className="block text-xs text-doux">Tour de contrôle</span>
      </span>
    </div>
  );
}

function BarreLaterale({ espace }: { espace: Espace }) {
  const { branchees, total } = etatSources();
  return (
    <aside className="vitre-coque cadre sticky top-4 hidden h-[calc(100dvh-2rem)] w-64 shrink-0 flex-col rounded-[28px] p-4 lg:flex">
      <div className="px-2 pt-1">
        <Marque />
      </div>
      <nav aria-label="Onglets" className="mt-7 flex-1 space-y-6">
        {RUBRIQUES.map((r) => (
          <div key={r}>
            <p className="px-3 text-[11px] font-medium uppercase tracking-[0.14em] text-doux">{r}</p>
            <ul className="mt-2 space-y-1">
              {ONGLETS.filter((o) => o.rubrique === r).map((o) => {
                const Icone = ICONE_ESPACE[o.espace];
                const actif = o.espace === espace;
                return (
                  <li key={o.href}>
                    <Link
                      href={o.href}
                      aria-current={actif ? "page" : undefined}
                      className={`flex items-center gap-3 rounded-2xl px-3 py-2.5 text-sm transition-all duration-200 ${
                        actif
                          ? "bouton-plein font-medium"
                          : "text-doux hover:bg-repere hover:text-texte"
                      }`}
                    >
                      <Icone className="size-[18px]" strokeWidth={1.8} aria-hidden />
                      {o.nom}
                    </Link>
                  </li>
                );
              })}
            </ul>
          </div>
        ))}
      </nav>
      <div className="vitre-puits rounded-2xl p-3">
        <div className="flex items-center justify-between text-xs">
          <span className="font-medium">Sources branchées</span>
          <span className="chiffre text-doux">
            {branchees} sur {total}
          </span>
        </div>
        <div className="mt-2 h-1.5 overflow-hidden rounded-full bg-repere">
          <div className="bouton-plein h-full rounded-full" style={{ width: `${total ? (branchees / total) * 100 : 0}%` }} />
        </div>
      </div>
    </aside>
  );
}

function BarreHaut({ espace, demo }: { espace: Espace; demo: boolean }) {
  const o = ONGLETS.find((x) => x.espace === espace)!;
  return (
    <header className="vitre-coque cadre relative flex items-center justify-between gap-3 rounded-full py-2 pl-4 pr-2 sm:pl-5">
      <div className="flex min-w-0 items-center gap-2 text-sm">
        <span className="lg:hidden">
          <Marque />
        </span>
        <span className="hidden truncate text-doux lg:inline">
          {o.rubrique} <span className="mx-1.5 opacity-50">/</span> <span className="text-texte">{o.nom}</span>
        </span>
      </div>
      <div className="flex items-center gap-2">
        <BasculeDemo actif={demo} />
        <BasculeTheme />
        <form action="/api/deconnexion" method="post">
          <button type="submit" className="bouton-rond" aria-label="Déconnexion" title="Déconnexion">
            <LogOut className="size-[18px]" strokeWidth={1.8} aria-hidden />
          </button>
        </form>
        <span className="bouton-plein hidden size-10 place-items-center rounded-full text-sm font-semibold sm:grid" aria-hidden>
          R
        </span>
      </div>
    </header>
  );
}

/** Mobile : barre d'onglets flottante en bas. */
function BarreBas({ espace }: { espace: Espace }) {
  return (
    <nav aria-label="Onglets" className="vitre-coque cadre barre-bas fixed inset-x-3 bottom-3 z-20 rounded-full p-1.5 lg:hidden" style={{ paddingBottom: "max(0.375rem, env(safe-area-inset-bottom))" }}>
      <ul className="grid grid-cols-4">
        {ONGLETS.map((o) => {
          const Icone = ICONE_ESPACE[o.espace];
          const actif = o.espace === espace;
          return (
            <li key={o.href}>
              <Link
                href={o.href}
                aria-current={actif ? "page" : undefined}
                className={`flex flex-col items-center gap-0.5 rounded-full px-1 py-2 text-[11px] leading-none transition-all ${
                  actif ? "bouton-plein" : "text-doux"
                }`}
              >
                <Icone className="size-5" strokeWidth={1.8} aria-hidden />
                <span className="truncate">{o.nom === "Harmonie Yacht" ? "Yacht" : o.nom}</span>
              </Link>
            </li>
          );
        })}
      </ul>
    </nav>
  );
}

/** La scène lumineuse derrière le verre (dégradé, trois orbes qui dérivent, grain). */
export function Scene() {
  return (
    <div className="scene" aria-hidden>
      <i />
      <i />
      <i />
    </div>
  );
}

/** Toute la page prend les couleurs de l'onglet ouvert. */
export function Coquille({ children, demo }: { children: React.ReactNode; demo: boolean }) {
  const espace = espaceDe(usePathname());
  return (
    <div data-espace={espace} className="espace min-h-dvh">
      <Scene />
      <div className="mx-auto flex max-w-[1440px] gap-4 p-3 sm:p-4">
        <BarreLaterale espace={espace} />
        <div className="min-w-0 flex-1 space-y-4 pb-24 lg:pb-0">
          <BarreHaut espace={espace} demo={demo} />
          <main>{children}</main>
        </div>
      </div>
      <BarreBas espace={espace} />
    </div>
  );
}
