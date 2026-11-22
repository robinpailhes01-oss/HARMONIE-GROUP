import { cookies } from "next/headers";
import { COOKIE_DEMO } from "./demo";
import { etatSources } from "./indicateurs";

/**
 * Mode démo : activé par défaut tant qu'aucune source n'est branchée (demande de Robin du 22/11/2026),
 * désactivable d'un clic (cookie). Dès qu'une source est branchée, il faut l'activer à la main.
 */
export async function estDemo() {
  const v = (await cookies()).get(COOKIE_DEMO)?.value;
  if (v === "1") return true;
  if (v === "0") return false;
  return etatSources().branchees === 0;
}
