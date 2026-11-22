import type { Metadata } from "next";
import { Bouton, Cadre, Champ } from "@/components/Formulaire";
import { etatConfig, safeNext } from "@/lib/auth";

export const metadata: Metadata = { title: "Connexion" };

const MESSAGES: Record<string, string> = {
  refus: "Mot de passe ou code incorrect.",
  config: "La connexion n'est pas encore configurée dans Vercel.",
};

export default async function Connexion({ searchParams }: { searchParams: Promise<{ erreur?: string; next?: string }> }) {
  const { erreur, next } = await searchParams;
  const e = etatConfig();
  const manque = [
    e.motDePasse === "absent" && "HG_PASSWORD",
    e.motDePasse === "court" && "HG_PASSWORD (16 caractères minimum)",
    !e.secret && "HG_SESSION_SECRET (32 caractères minimum)",
    !e.code && "HG_TOTP_SECRET",
  ].filter(Boolean);

  return (
    <Cadre titre="Connexion">
      {manque.length > 0 ? (
        <div className="rounded-xl border border-filet bg-repere p-4 text-sm">
          {/* Les noms des variables manquantes ne sont pas montrés aux visiteurs : voir .env.example. */}
          <p>La connexion n'est pas encore configurée.</p>
        </div>
      ) : (
        <form action="/api/connexion" method="post" className="space-y-4">
          <input type="hidden" name="next" value={safeNext(next)} />
          <Champ nom="motDePasse" label="Mot de passe" type="password" autoComplete="current-password" />
          <Champ nom="code" label="Code à 6 chiffres (application d'authentification)" autoComplete="one-time-code" inputMode="numeric" pattern="[0-9 ]{6,7}" maxLength={7} />
          {erreur && MESSAGES[erreur] && (
            <p role="alert" className="text-sm text-doux">
              {MESSAGES[erreur]}
            </p>
          )}
          <Bouton>Se connecter</Bouton>
        </form>
      )}
    </Cadre>
  );
}
