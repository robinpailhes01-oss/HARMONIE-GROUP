import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { Coquille } from "@/components/Navigation";
import { SESSION_COOKIE, verifySession } from "@/lib/auth";
import { estDemo } from "@/lib/mode";

/** Deuxième contrôle de la session (le premier est dans proxy.ts). */
export default async function PriveLayout({ children }: { children: React.ReactNode }) {
  const jar = await cookies();
  if (!(await verifySession(jar.get(SESSION_COOKIE)?.value))) redirect("/connexion");
  return <Coquille demo={await estDemo()}>{children}</Coquille>;
}
