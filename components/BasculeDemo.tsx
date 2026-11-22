"use client";

import { FlaskConical } from "lucide-react";
import { useRouter } from "next/navigation";
import { useTransition } from "react";

/** Active ou coupe les données fictives (cookie, sur cet appareil). */
export function BasculeDemo({ actif }: { actif: boolean }) {
  const router = useRouter();
  const [enCours, demarrer] = useTransition();
  function changer() {
    document.cookie = `hg_demo=${actif ? "0" : "1"}; path=/; max-age=31536000; samesite=lax`;
    demarrer(() => router.refresh());
  }
  return (
    <button
      type="button"
      onClick={changer}
      disabled={enCours}
      aria-pressed={actif}
      title={actif ? "Couper les données fictives" : "Afficher des données fictives"}
      className={`inline-flex h-10 items-center gap-1.5 rounded-full px-3.5 text-xs font-medium transition-all ${actif ? "pastille-demo" : "bouton-rond !w-auto"}`}
    >
      <FlaskConical className="size-4" strokeWidth={1.8} aria-hidden />
      <span className="hidden sm:inline">{actif ? "Démo activée" : "Démo"}</span>
    </button>
  );
}
