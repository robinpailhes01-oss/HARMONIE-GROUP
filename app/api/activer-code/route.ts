import { NextResponse, type NextRequest } from "next/server";
import QRCode from "qrcode";
import { checkPassword, configure } from "@/lib/auth";
import { otpauthUri } from "@/lib/totp";

/** Renvoie le QR code à scanner (jamais mis en cache), seulement si HG_TOTP_ENROLL=1 et le mot de passe est bon. */
export async function POST(req: NextRequest) {
  if (process.env.HG_TOTP_ENROLL !== "1" || !configure()) return new NextResponse("Fermé.", { status: 404 });
  const form = await req.formData();
  if (!(await checkPassword(String(form.get("motDePasse") ?? "")))) {
    await new Promise((r) => setTimeout(r, 800));
    return NextResponse.redirect(new URL("/connexion/activer-code?erreur=1", req.url), 303);
  }
  const svg = await QRCode.toString(otpauthUri(process.env.HG_TOTP_SECRET ?? ""), { type: "svg", margin: 1, width: 240 });
  const html = `<!doctype html><html lang="fr"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"><meta name="robots" content="noindex"><title>QR code · Harmonie Group</title>
<style>body{margin:0;font-family:system-ui,sans-serif;background:#f5f5f3;color:#18191b;display:flex;min-height:100dvh;align-items:center;justify-content:center;padding:16px}
main{max-width:360px;background:#fff;border:1px solid #e2e2de;border-radius:16px;padding:24px;text-align:center}svg{width:240px;height:240px;background:#fff}p{font-size:14px;color:#5c6066;line-height:1.5}
@media (prefers-color-scheme:dark){body{background:#111214;color:#ececea}main{background:#1a1b1e;border-color:#2b2d31}p{color:#a3a6ab}}</style></head>
<body><main><h1 style="font-weight:500;font-size:20px">Scanne ce QR code</h1>${svg}
<p>Dans Google Authenticator : « + », puis « Scanner un QR code ». Ensuite, supprime <code>HG_TOTP_ENROLL</code> dans Vercel et redéploie.</p>
<p><a href="/connexion">Aller à la connexion</a></p></main></body></html>`;
  return new NextResponse(html, { headers: { "Content-Type": "text/html; charset=utf-8", "Cache-Control": "no-store" } });
}
