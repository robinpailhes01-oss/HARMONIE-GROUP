import type { Metadata } from "next";
import { Tableau } from "@/components/Tableau";

export const metadata: Metadata = { title: "Groupe" };

export default function Page() {
  return <Tableau espace="groupe" />;
}
