import { NextResponse, type NextRequest } from "next/server";
import { SESSION_COOKIE, SESSION_DAYS, checkCode, checkPassword, configure, createSession, safeNext } from "@/lib/auth";

/**
 * Connexion : mot de passe ET code à 6 chiffres, vérifiés ensemble (on ne dit jamais lequel est faux).
 * Deux formes : JSON (l'écran animé, réponse { ok }) ou formulaire classique (redirection), si le JavaScript manque.
 */
export async function POST(req: NextRequest) {
  const json = (req.headers.get("content-type") ?? "").includes("application/json");
  let pw = "";
  let code = "";
  let nextRaw = "";
  if (json) {
    const body = (await req.json().catch(() => ({}))) as Record<string, unknown>;
    pw = String(body.motDePasse ?? "");
    code = String(body.code ?? "");
    nextRaw = String(body.next ?? "");
  } else {
    const form = await req.formData();
    pw = String(form.get("motDePasse") ?? "");
    code = String(form.get("code") ?? "");
    nextRaw = String(form.get("next") ?? "");
  }
  const next = safeNext(nextRaw);

  const refus = (erreur: "config" | "refus") => {
    if (json) return NextResponse.json({ ok: false, erreur }, { status: erreur === "config" ? 503 : 401 });
    const url = new URL("/connexion", req.url);
    url.searchParams.set("erreur", erreur);
    if (next !== "/groupe") url.searchParams.set("next", next);
    return NextResponse.redirect(url, 303);
  };

  if (!configure()) return refus("config");
  const [okPw, okCode] = await Promise.all([checkPassword(pw), checkCode(code)]);
  if (!okPw || !okCode) {
    // Ralentit les essais en série.
    await new Promise((r) => setTimeout(r, 800));
    return refus("refus");
  }

  const res = json ? NextResponse.json({ ok: true, next }) : NextResponse.redirect(new URL(next, req.url), 303);
  res.cookies.set(SESSION_COOKIE, await createSession(), {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    path: "/",
    maxAge: SESSION_DAYS * 86400,
  });
  return res;
}
