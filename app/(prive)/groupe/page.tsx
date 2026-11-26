import type { Metadata } from "next";
import { Tableau } from "@/components/Tableau";
import { lireCompta } from "@/lib/compta";
import { valeursCompta } from "@/lib/valeurs";

export const metadata: Metadata = { title: "Groupe" };
// Les chiffres sont lus à chaque visite : jamais figés au moment du build.
export const dynamic = "force-dynamic";

export default async function Page() {
  return <Tableau espace="groupe" valeurs={valeursCompta(await lireCompta())} />;
}
