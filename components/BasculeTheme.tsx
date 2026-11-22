"use client";

import { useEffect, useState } from "react";

type Choix = "auto" | "light" | "dark";
const LIBELLES: Record<Choix, string> = { auto: "Auto", light: "Clair", dark: "Sombre" };
const SUIVANT: Record<Choix, Choix> = { auto: "light", light: "dark", dark: "auto" };

/** Auto (suit l'appareil) → Clair → Sombre. Le choix reste sur cet appareil seulement. */
export function BasculeTheme() {
  const [choix, setChoix] = useState<Choix>("auto");

  useEffect(() => {
    const t = document.documentElement.dataset.theme;
    if (t === "light" || t === "dark") setChoix(t);
  }, []);

  function changer() {
    const n = SUIVANT[choix];
    setChoix(n);
    if (n === "auto") delete document.documentElement.dataset.theme;
    else document.documentElement.dataset.theme = n;
    try {
      if (n === "auto") localStorage.removeItem("hg-theme");
      else localStorage.setItem("hg-theme", n);
    } catch {}
  }

  return (
    <button
      type="button"
      onClick={changer}
      className="rounded-full border border-filet px-3 py-1.5 text-xs text-doux hover:text-texte"
      aria-label={`Thème : ${LIBELLES[choix]}. Changer`}
    >
      {LIBELLES[choix]}
    </button>
  );
}
