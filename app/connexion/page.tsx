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
  const manque = e.motDePasse !== "ok" || !e.secret || !e.code;
  const activer = e.motDePasse === "ok" && e.secret && !e.code && process.env.HG_TOTP_ENROLL === "1";

  return (
    <Cadre titre="Connexion">
      {activer ? (
        <p className="text-sm">
          Dernière étape : <a className="text-lien underline" href="/connexion/activer-code">active ton code à 6 chiffres</a>.
        </p>
      ) : manque ? (
        <div className="rounded-xl border border-filet bg-repere p-4 text-sm">
          {/* Les noms des variables manquantes ne sont pas montrés aux visiteurs : voir .env.example. */}
          <p>La connexion n'est pas encore configurée.</p>
        </div>
      ) : (
        <form action="/api/connexion" method="post" className="space-y-4">
          <input type="hidden" name="next" value={safeNext(next)} />
          <Champ nom="motDePasse" label="Mot de passe" type="password" autoComplete="current-password" />
          <Champ nom="code" label="Code à 6 chiffres (Google Authenticator)" autoComplete="one-time-code" inputMode="numeric" pattern="[0-9 ]{6,7}" maxLength={7} code />
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
