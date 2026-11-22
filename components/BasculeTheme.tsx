"use client";

import { useEffect, useState } from "react";
import { Monitor, Moon, Sun } from "lucide-react";

type Choix = "auto" | "light" | "dark";
const LIBELLES: Record<Choix, string> = { auto: "Auto (suit l'appareil)", light: "Clair", dark: "Sombre" };
const SUIVANT: Record<Choix, Choix> = { auto: "light", light: "dark", dark: "auto" };
const ICONES = { auto: Monitor, light: Sun, dark: Moon };

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

  const Icone = ICONES[choix];
  return (
    <button type="button" onClick={changer} className="bouton-rond" aria-label={`Thème : ${LIBELLES[choix]}. Changer`} title={`Thème : ${LIBELLES[choix]}`}>
      <Icone className="size-[18px]" strokeWidth={1.8} aria-hidden />
    </button>
  );
}
