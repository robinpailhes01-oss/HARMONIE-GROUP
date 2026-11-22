import { NextResponse, type NextRequest } from "next/server";
import { SESSION_COOKIE, verifySession } from "@/lib/auth";

/**
 * Tout le site est privé. Seules la page de connexion, l'activation du code et les routes de connexion
 * et de déconnexion sont accessibles sans session.
 */
const PUBLIC = new Set(["/connexion", "/connexion/activer-code", "/api/connexion", "/api/deconnexion", "/api/activer-code"]);

export async function proxy(req: NextRequest) {
  const { pathname } = req.nextUrl;
  if (PUBLIC.has(pathname)) return NextResponse.next();
  if (await verifySession(req.cookies.get(SESSION_COOKIE)?.value)) return NextResponse.next();
  if (pathname.startsWith("/api/")) return NextResponse.json({ ok: false, error: "non connecté" }, { status: 401 });
  const url = req.nextUrl.clone();
  url.pathname = "/connexion";
  url.search = pathname === "/" ? "" : `?next=${encodeURIComponent(pathname)}`;
  return NextResponse.redirect(url);
}

export const config = {
  matcher: ["/((?!_next/|favicon\\.ico$|icon\\.svg$).*)"],
};
