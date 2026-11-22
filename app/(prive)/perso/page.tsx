import type { Metadata } from "next";
import { Tableau } from "@/components/Tableau";

export const metadata: Metadata = { title: "Perso" };

export default function Page() {
  return <Tableau espace="perso" />;
}
