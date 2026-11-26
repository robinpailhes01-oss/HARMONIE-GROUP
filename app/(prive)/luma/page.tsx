import type { Metadata } from "next";
import { Tableau } from "@/components/Tableau";
import { lireCompta } from "@/lib/compta";
import { valeursCompta } from "@/lib/valeurs";

export const metadata: Metadata = { title: "Luma" };
export const dynamic = "force-dynamic";

export default async function Page() {
  return <Tableau espace="luma" valeurs={valeursCompta(await lireCompta())} />;
}
