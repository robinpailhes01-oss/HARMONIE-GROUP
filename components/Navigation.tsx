"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { BasculeTheme } from "./BasculeTheme";

const ONGLETS = [
  { href: "/groupe", nom: "Groupe" },
  { href: "/luma", nom: "Luma" },
  { href: "/harmonie-yacht", nom: "Harmonie Yacht" },
  { href: "/perso", nom: "Perso" },
];

export function espaceDe(pathname: string) {
  const o = ONGLETS.find((x) => pathname === x.href || pathname.startsWith(`${x.href}/`));
  return (o?.href.slice(1) ?? "groupe") as "groupe" | "luma" | "harmonie-yacht" | "perso";
}

/** Toute la page prend les couleurs de l'onglet ouvert. */
export function Coquille({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const espace = espaceDe(pathname);
  return (
    <div data-espace={espace} className="espace min-h-dvh">
      <header className="sticky top-0 z-10 border-b border-filet bg-fond/90 backdrop-blur">
        <div className="mx-auto flex max-w-6xl items-center justify-between gap-3 px-4 pt-3 sm:px-6">
          <span className="titre text-lg">Harmonie Group</span>
          <div className="flex items-center gap-2">
            <BasculeTheme />
            <form action="/api/deconnexion" method="post">
              <button type="submit" className="rounded-full border border-filet px-3 py-1.5 text-xs text-doux hover:text-texte">
                Déconnexion
              </button>
            </form>
          </div>
        </div>
        <nav aria-label="Onglets" className="mx-auto max-w-6xl overflow-x-auto px-4 sm:px-6">
          <ul className="flex gap-1 py-2">
            {ONGLETS.map((o) => {
              const actif = espace === o.href.slice(1);
              return (
                <li key={o.href}>
                  <Link
                    href={o.href}
                    aria-current={actif ? "page" : undefined}
                    className={`block whitespace-nowrap rounded-full px-4 py-2 text-sm transition-colors ${
                      actif ? "bg-accent text-accent-texte" : "text-doux hover:bg-repere hover:text-texte"
                    }`}
                  >
                    {o.nom}
                  </Link>
                </li>
              );
            })}
          </ul>
        </nav>
      </header>
      <main className="mx-auto max-w-6xl px-4 py-6 sm:px-6 sm:py-8">{children}</main>
    </div>
  );
}
