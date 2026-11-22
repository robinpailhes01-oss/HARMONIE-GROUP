import type { Metadata } from "next";
import { Bouton, Cadre, Champ } from "@/components/Formulaire";
import { etatConfig } from "@/lib/auth";

export const metadata: Metadata = { title: "Activer le code" };
export const dynamic = "force-dynamic";

/**
 * Étape unique : scanner le QR code dans Google Authenticator. Ouverte seulement quand HG_TOTP_ENROLL=1 dans Vercel,
 * et seulement avec le bon mot de passe. Une fois le code scanné : supprimer HG_TOTP_ENROLL et redéployer.
 */
export default async function ActiverCode({ searchParams }: { searchParams: Promise<{ erreur?: string }> }) {
  const { erreur } = await searchParams;
  if (process.env.HG_TOTP_ENROLL !== "1" || etatConfig().motDePasse !== "ok") {
    return (
      <Cadre titre="Activer le code">
        <p className="text-sm text-doux">Cette page est fermée.</p>
      </Cadre>
    );
  }
  return (
    <Cadre titre="Activer le code">
      <form action="/api/activer-code" method="post" className="space-y-4">
        <Champ nom="motDePasse" label="Mot de passe" type="password" autoComplete="current-password" />
        {erreur && (
          <p role="alert" className="text-sm text-doux">
            Mot de passe incorrect.
          </p>
        )}
        <Bouton>Afficher le QR code</Bouton>
      </form>
    </Cadre>
  );
}
