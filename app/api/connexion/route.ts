import { NextResponse, type NextRequest } from "next/server";
import { SESSION_COOKIE, SESSION_DAYS, checkCode, checkPassword, configure, createSession, safeNext } from "@/lib/auth";

/** Connexion : mot de passe ET code à 6 chiffres, vérifiés ensemble (on ne dit jamais lequel est faux). */
export async function POST(req: NextRequest) {
  const form = await req.formData();
  const pw = String(form.get("motDePasse") ?? "");
  const code = String(form.get("code") ?? "");
  const next = safeNext(String(form.get("next") ?? ""));
  const retour = (erreur: string) => {
    const url = new URL("/connexion", req.url);
    url.searchParams.set("erreur", erreur);
    if (next !== "/groupe") url.searchParams.set("next", next);
    return NextResponse.redirect(url, 303);
  };

  if (!configure()) return retour("config");
  const [okPw, okCode] = await Promise.all([checkPassword(pw), checkCode(code)]);
  if (!okPw || !okCode) {
    // Ralentit les essais en série.
    await new Promise((r) => setTimeout(r, 800));
    return retour("refus");
  }

  const res = NextResponse.redirect(new URL(next, req.url), 303);
  res.cookies.set(SESSION_COOKIE, await createSession(), {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "strict",
    path: "/",
    maxAge: SESSION_DAYS * 86400,
  });
  return res;
}
