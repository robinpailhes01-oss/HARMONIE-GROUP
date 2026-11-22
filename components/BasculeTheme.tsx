"use client";

import { useEffect, useState } from "react";
import { Moon, Sun } from "lucide-react";

/** Clair par défaut (choix de Robin, 22/11/2026). Sombre « crépuscule » au choix ; le choix reste sur cet appareil. */
export function BasculeTheme() {
  const [sombre, setSombre] = useState(false);

  useEffect(() => {
    setSombre(document.documentElement.dataset.theme === "dark");
  }, []);

  function changer() {
    const n = !sombre;
    setSombre(n);
    if (n) document.documentElement.dataset.theme = "dark";
    else delete document.documentElement.dataset.theme;
    try {
      if (n) localStorage.setItem("hg-theme", "dark");
      else localStorage.removeItem("hg-theme");
    } catch {}
  }

  const Icone = sombre ? Sun : Moon;
  const libelle = sombre ? "Passer en clair" : "Passer en sombre";
  return (
    <button type="button" onClick={changer} className="bouton-rond" aria-label={libelle} title={libelle}>
      <Icone className="size-[18px]" strokeWidth={1.8} aria-hidden />
    </button>
  );
}
