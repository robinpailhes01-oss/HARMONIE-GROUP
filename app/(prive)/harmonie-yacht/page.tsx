import type { Metadata } from "next";
import { Tableau } from "@/components/Tableau";

export const metadata: Metadata = { title: "Harmonie Yacht" };

export default function Page() {
  return <Tableau espace="harmonie-yacht" />;
}
