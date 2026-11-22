import { NextResponse, type NextRequest } from "next/server";
import QRCode from "qrcode";
import { checkPassword, etatConfig } from "@/lib/auth";
import { nouvelleCle, otpauthUri } from "@/lib/totp";

/**
 * Renvoie le QR code à scanner (jamais mis en cache), seulement si HG_TOTP_ENROLL=1 et le mot de passe est bon.
 * Sans HG_TOTP_SECRET : une clé neuve est tirée ici, affichée une fois, et Robin la colle lui-même dans Vercel.
 * Elle n'est écrite nulle part ailleurs.
 */
export async function POST(req: NextRequest) {
  if (process.env.HG_TOTP_ENROLL !== "1" || etatConfig().motDePasse !== "ok") return new NextResponse("Fermé.", { status: 404 });
  const form = await req.formData();
  if (!(await checkPassword(String(form.get("motDePasse") ?? "")))) {
    await new Promise((r) => setTimeout(r, 800));
    return NextResponse.redirect(new URL("/connexion/activer-code?erreur=1", req.url), 303);
  }
  const existante = process.env.HG_TOTP_SECRET ?? "";
  const cle = existante || nouvelleCle();
  const svg = await QRCode.toString(otpauthUri(cle), { type: "svg", margin: 1, width: 240 });
  const etapes = existante
    ? `<p>Dans Google Authenticator : « + », puis « Scanner un QR code ». Ensuite, supprime <code>HG_TOTP_ENROLL</code> dans Vercel et redéploie.</p>`
    : `<p>1. Dans Google Authenticator : « + », puis « Scanner un QR code ».</p>
<p>2. Dans Vercel (Production et Preview), crée la variable <code>HG_TOTP_SECRET</code> avec cette valeur :</p>
<p><code style="user-select:all;word-break:break-all;font-size:15px;color:inherit">${cle}</code></p>
<p>3. Supprime <code>HG_TOTP_ENROLL</code>, puis redéploie. Ne recharge pas cette page avant : chaque affichage tire une nouvelle clé.</p>`;
  const html = `<!doctype html><html lang="fr"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"><meta name="robots" content="noindex"><title>QR code · Harmonie Group</title>
<style>body{margin:0;font-family:system-ui,sans-serif;background:#f5f5f3;color:#18191b;display:flex;min-height:100dvh;align-items:center;justify-content:center;padding:16px}
main{max-width:360px;background:#fff;border:1px solid #e2e2de;border-radius:16px;padding:24px;text-align:center}svg{width:240px;height:240px;background:#fff}p{font-size:14px;color:#5c6066;line-height:1.5}
@media (prefers-color-scheme:dark){body{background:#111214;color:#ececea}main{background:#1a1b1e;border-color:#2b2d31}p{color:#a3a6ab}}</style></head>
<body><main><h1 style="font-weight:500;font-size:20px">Scanne ce QR code</h1>${svg}
${etapes}
<p><a href="/connexion">Aller à la connexion</a></p></main></body></html>`;
  return new NextResponse(html, { headers: { "Content-Type": "text/html; charset=utf-8", "Cache-Control": "no-store" } });
}
