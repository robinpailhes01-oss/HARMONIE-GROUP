"use client";

import { AnimatePresence, motion, useAnimationControls } from "motion/react";
import { ArrowLeft, ArrowRight, Check, KeyRound, Loader2, LockKeyhole, ShieldCheck, Timer } from "lucide-react";
import { useCallback, useEffect, useRef, useState } from "react";

/**
 * Connexion en deux temps, inspirée de l'exemple « Glassy OTP » envoyé par Robin le 22/11/2026 :
 * 1. le mot de passe ; 2. le code à 6 chiffres dans des cases de verre. Au 6ᵉ chiffre, la vérification part seule.
 * Le serveur vérifie les deux ensemble et ne dit jamais lequel est faux (app/api/connexion).
 * À la place du « renvoyer le code » de l'exemple : un anneau qui montre quand le code de l'application change (30 s).
 */

type Etape = "motdepasse" | "code" | "fini";
type Statut = "saisie" | "verif" | "ok" | "erreur";

const N = 6;
const PAS = 30;
const CASE = 44; // largeur d'une case (px) : 6 cases tiennent sur un téléphone de 360 px
const ECART = 6;

const ease = [0.32, 0.72, 0, 1] as const;

function useSecondesRestantes() {
  const [s, setS] = useState(PAS);
  useEffect(() => {
    const maj = () => setS(PAS - ((Date.now() / 1000) % PAS));
    maj();
    const t = setInterval(maj, 200);
    return () => clearInterval(t);
  }, []);
  return s;
}

/** L'icône dans un anneau : l'anneau se vide au rythme du code (étape 2). */
function Medaillon({ etape, statut, secondes }: { etape: Etape; statut: Statut; secondes: number }) {
  const R = 38;
  const C = 2 * Math.PI * R;
  const ok = statut === "ok" || etape === "fini";
  const Icone = ok ? Check : etape === "code" ? KeyRound : LockKeyhole;
  return (
    <div className="relative mx-auto grid size-[92px] place-items-center">
      {etape === "code" && !ok && (
        <svg className="absolute inset-0 -rotate-90" viewBox="0 0 92 92" aria-hidden>
          <circle cx="46" cy="46" r={R} fill="none" stroke="rgb(255 255 255 / 0.5)" strokeWidth="2" />
          <circle
            cx="46"
            cy="46"
            r={R}
            fill="none"
            stroke="var(--lien)"
            strokeWidth="2.5"
            strokeLinecap="round"
            strokeDasharray={C}
            strokeDashoffset={C * (1 - secondes / PAS)}
            style={{ transition: "stroke-dashoffset 0.2s linear" }}
          />
        </svg>
      )}
      <motion.span
        key={ok ? "ok" : etape}
        initial={{ scale: 0.6, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ type: "spring", stiffness: 320, damping: 20 }}
        className={`grid size-16 place-items-center rounded-full ${ok ? "medaillon-ok" : "bouton-plein"}`}
      >
        <Icone className="size-6" strokeWidth={ok ? 2.6 : 1.8} aria-hidden />
      </motion.span>
    </div>
  );
}

export function ConnexionAnimee({ next }: { next: string }) {
  const [etape, setEtape] = useState<Etape>("motdepasse");
  const [statut, setStatut] = useState<Statut>("saisie");
  const [motDePasse, setMotDePasse] = useState("");
  const [chiffres, setChiffres] = useState<string[]>(Array(N).fill(""));
  const [message, setMessage] = useState("");
  const cases = useRef<(HTMLInputElement | null)[]>([]);
  const champMdp = useRef<HTMLInputElement | null>(null);
  const carte = useAnimationControls();
  const secondes = useSecondesRestantes();

  useEffect(() => {
    if (etape === "motdepasse") champMdp.current?.focus();
    if (etape === "code") cases.current[0]?.focus();
  }, [etape]);

  const verifier = useCallback(
    async (code: string) => {
      setStatut("verif");
      setMessage("");
      const depart = Date.now();
      let ok = false;
      let erreur = "refus";
      try {
        const r = await fetch("/api/connexion", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ motDePasse, code, next }),
        });
        const d = (await r.json().catch(() => ({}))) as { ok?: boolean; erreur?: string };
        ok = Boolean(d.ok);
        erreur = d.erreur ?? "refus";
      } catch {
        erreur = "reseau";
      }
      // Laisse le temps de voir l'animation de vérification.
      await new Promise((r) => setTimeout(r, Math.max(0, 900 - (Date.now() - depart))));
      if (ok) {
        setStatut("ok");
        setTimeout(() => setEtape("fini"), 1300);
        setTimeout(() => window.location.assign(next), 3200);
        return;
      }
      setStatut("erreur");
      setMessage(
        erreur === "config"
          ? "La connexion n'est pas encore configurée."
          : erreur === "reseau"
            ? "Pas de réseau. Réessaie."
            : "Mot de passe ou code incorrect.",
      );
      await carte.start({ x: [0, -14, 12, -9, 7, -4, 0], transition: { duration: 0.5 } });
      setChiffres(Array(N).fill(""));
      setStatut("saisie");
      cases.current[0]?.focus();
    },
    [motDePasse, next, carte],
  );

  function saisir(i: number, valeur: string) {
    const v = valeur.replace(/\D/g, "");
    if (!v) {
      const c = [...chiffres];
      c[i] = "";
      setChiffres(c);
      return;
    }
    // Collage ou remplissage automatique : on répartit sur les cases.
    const c = [...chiffres];
    let j = i;
    for (const ch of v) {
      if (j >= N) break;
      c[j++] = ch;
    }
    setChiffres(c);
    if (c.every(Boolean)) {
      cases.current[N - 1]?.blur();
      void verifier(c.join(""));
    } else cases.current[Math.min(j, N - 1)]?.focus();
  }

  function touche(i: number, e: React.KeyboardEvent<HTMLInputElement>) {
    if (e.key === "Backspace" && !chiffres[i] && i > 0) {
      const c = [...chiffres];
      c[i - 1] = "";
      setChiffres(c);
      cases.current[i - 1]?.focus();
      e.preventDefault();
    }
    if (e.key === "ArrowLeft" && i > 0) cases.current[i - 1]?.focus();
    if (e.key === "ArrowRight" && i < N - 1) cases.current[i + 1]?.focus();
  }

  const occupe = statut === "verif" || statut === "ok";
  const sec = Math.ceil(secondes);

  return (
    <motion.div animate={carte} className="vitre-panneau relative w-full max-w-[420px] overflow-hidden rounded-[36px] px-6 pb-6 pt-8 text-center sm:px-8">
      <Medaillon etape={etape} statut={statut} secondes={secondes} />

      <AnimatePresence mode="wait" initial={false}>
        {etape === "motdepasse" && (
          <motion.form
            key="mdp"
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -12 }}
            transition={{ duration: 0.35, ease }}
            onSubmit={(e) => {
              e.preventDefault();
              if (motDePasse) setEtape("code");
            }}
          >
            <p className="mt-5 text-[11px] font-semibold uppercase tracking-[0.16em] text-lien">Harmonie Group</p>
            <h1 className="mt-1 text-[28px] font-semibold tracking-tight">Bon retour</h1>
            <p className="mt-1.5 text-sm text-doux">Ton mot de passe, puis le code de ton application.</p>
            <label className="mt-6 block text-left">
              <span className="text-[13px] font-medium text-doux">Mot de passe</span>
              <input
                ref={champMdp}
                type="password"
                autoComplete="current-password"
                value={motDePasse}
                onChange={(e) => setMotDePasse(e.target.value)}
                className="case-verre mt-1.5 block h-14 w-full rounded-2xl px-4 text-base outline-none"
              />
            </label>
            <button type="submit" disabled={!motDePasse} className="bouton-plein mt-4 flex h-13 w-full items-center justify-center gap-2 rounded-2xl text-sm font-medium transition-opacity disabled:opacity-50">
              Continuer <ArrowRight className="size-4" aria-hidden />
            </button>
          </motion.form>
        )}

        {etape === "code" && (
          <motion.div key="code" initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -12 }} transition={{ duration: 0.35, ease }}>
            <h1 className="mt-5 text-[28px] font-semibold tracking-tight">Ton code</h1>
            <p className="mt-1.5 text-sm text-doux">
              Les 6 chiffres de <span className="pastille align-middle">Google Authenticator</span>
            </p>

            <div className="relative mx-auto mt-7 h-16" style={{ width: N * CASE + (N - 1) * ECART }}>
              {chiffres.map((ch, i) => {
                const vers = ((N - 1) / 2 - i) * (CASE + ECART);
                return (
                  <motion.input
                    key={i}
                    ref={(el) => {
                      cases.current[i] = el;
                    }}
                    value={ch}
                    onChange={(e) => saisir(i, e.target.value)}
                    onKeyDown={(e) => touche(i, e)}
                    onFocus={(e) => e.currentTarget.select()}
                    inputMode="numeric"
                    autoComplete={i === 0 ? "one-time-code" : "off"}
                    aria-label={`Chiffre ${i + 1} sur ${N}`}
                    maxLength={i === 0 ? N : 1}
                    disabled={occupe}
                    className={`case-verre chiffre absolute top-0 h-16 rounded-[16px] text-center text-[24px] font-semibold outline-none ${
                      statut === "erreur" ? "case-erreur" : statut === "ok" ? "case-ok" : ch ? "case-pleine" : ""
                    }`}
                    style={{ width: CASE, left: i * (CASE + ECART) }}
                    animate={
                      statut === "verif"
                        ? { y: [0, i % 2 ? -7 : 6, 0], rotate: [0, i % 2 ? -4 : 4, 0], transition: { duration: 1.1, repeat: Infinity, delay: i * 0.08 } }
                        : statut === "ok"
                          ? { x: vers, scale: 0.7, opacity: 0, rotate: 0, y: 0, transition: { duration: 0.55, ease, delay: 0.15 } }
                          : ch
                            ? { scale: [0.86, 1.06, 1], y: 0, rotate: 0, x: 0, opacity: 1, transition: { duration: 0.3 } }
                            : { scale: 1, y: 0, rotate: 0, x: 0, opacity: 1 }
                    }
                  />
                );
              })}
              <AnimatePresence>
                {statut === "ok" && (
                  <motion.span
                    initial={{ scale: 0.3, opacity: 0, rotate: -20 }}
                    animate={{ scale: 1, opacity: 1, rotate: 0 }}
                    transition={{ type: "spring", stiffness: 300, damping: 16, delay: 0.55 }}
                    className="medaillon-ok absolute left-1/2 top-0 grid size-16 -translate-x-1/2 place-items-center rounded-[18px]"
                  >
                    <Check className="size-8" strokeWidth={3} aria-hidden />
                  </motion.span>
                )}
              </AnimatePresence>
            </div>

            <div className="mt-7">
              <motion.div
                layout
                className={`flex h-13 w-full items-center justify-center gap-2 rounded-2xl text-sm font-medium transition-colors duration-300 ${
                  statut === "ok" ? "bouton-ok" : statut === "verif" ? "bouton-blanc" : "case-verre text-doux"
                }`}
                role="status"
                aria-live="polite"
              >
                {statut === "verif" && (
                  <>
                    <Loader2 className="size-4 animate-spin" aria-hidden /> Vérification…
                  </>
                )}
                {statut === "ok" && (
                  <>
                    <Check className="size-4" strokeWidth={2.6} aria-hidden /> Vérifié
                  </>
                )}
                {(statut === "saisie" || statut === "erreur") && (message || "Le code se vérifie tout seul")}
              </motion.div>
              <p className="mt-4 flex items-center justify-center gap-3 text-[13px] text-doux">
                <button type="button" onClick={() => { setEtape("motdepasse"); setChiffres(Array(N).fill("")); setMessage(""); }} disabled={occupe} className="inline-flex items-center gap-1 hover:text-texte disabled:opacity-50">
                  <ArrowLeft className="size-3.5" aria-hidden /> Mot de passe
                </button>
                <span className="opacity-40">·</span>
                <span className="chiffre inline-flex items-center gap-1">
                  <Timer className="size-3.5" aria-hidden /> Nouveau code dans 0:{String(sec).padStart(2, "0")}
                </span>
              </p>
            </div>
          </motion.div>
        )}

        {etape === "fini" && (
          <motion.div key="fini" initial={{ opacity: 0, y: 12, filter: "blur(6px)" }} animate={{ opacity: 1, y: 0, filter: "blur(0px)" }} transition={{ duration: 0.5, ease }}>
            <h1 className="mt-5 text-[28px] font-semibold tracking-tight">Tu es connecté</h1>
            <p className="mt-1.5 text-sm text-doux">Ta tour de contrôle s&apos;ouvre.</p>
            <ul className="mt-6 space-y-2 text-left">
              {[
                { Icone: LockKeyhole, titre: "Mot de passe vérifié", detail: "Avec le code, jamais seul" },
                { Icone: ShieldCheck, titre: "Code à 6 chiffres vérifié", detail: "Google Authenticator" },
                { Icone: Timer, titre: "Session ouverte", detail: "Valable 7 jours sur cet appareil" },
              ].map(({ Icone, titre, detail }, k) => (
                <motion.li
                  key={titre}
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.15 + k * 0.12, duration: 0.35, ease }}
                  className="case-verre flex items-center gap-3 rounded-2xl px-3 py-2.5"
                >
                  <span className="puce">
                    <Icone className="size-4" strokeWidth={1.8} aria-hidden />
                  </span>
                  <span className="min-w-0 flex-1">
                    <span className="block text-[13px] font-medium">{titre}</span>
                    <span className="block text-xs text-doux">{detail}</span>
                  </span>
                  <span className="medaillon-ok grid size-5 place-items-center rounded-full">
                    <Check className="size-3" strokeWidth={3} aria-hidden />
                  </span>
                </motion.li>
              ))}
            </ul>
            <a href={next} className="bouton-blanc mt-5 flex h-13 w-full items-center justify-center gap-2 rounded-2xl text-sm font-medium">
              Continuer <ArrowRight className="size-4" aria-hidden />
            </a>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}
