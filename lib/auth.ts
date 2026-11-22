/**
 * Accès à Harmonie Group : mot de passe (HG_PASSWORD, 16 caractères minimum) PUIS code à 6 chiffres
 * (HG_TOTP_SECRET, application d'authentification). Les deux sont obligatoires : sans l'un d'eux, aucune connexion.
 * Session : cookie signé HMAC-SHA256 (HG_SESSION_SECRET), valable 7 jours. Changer l'une des trois variables
 * déconnecte toutes les sessions. Toutes les valeurs vivent dans Vercel (Production et Preview), jamais dans un fichier.
 */
import { verifyTotp } from "./totp";

export const SESSION_COOKIE = "hg_session";
export const SESSION_DAYS = 7;
export const MIN_PASSWORD = 16;

const enc = new TextEncoder();

export type EtatConfig = { motDePasse: "absent" | "court" | "ok"; code: boolean; secret: boolean };

export function etatConfig(): EtatConfig {
  const pw = process.env.HG_PASSWORD ?? "";
  return {
    motDePasse: !pw ? "absent" : pw.length >= MIN_PASSWORD ? "ok" : "court",
    code: Boolean(process.env.HG_TOTP_SECRET),
    secret: (process.env.HG_SESSION_SECRET ?? "").length >= 32,
  };
}

export function configure() {
  const e = etatConfig();
  return e.motDePasse === "ok" && e.code && e.secret;
}

async function hmac(key: string, message: string) {
  const k = await crypto.subtle.importKey("raw", enc.encode(key), { name: "HMAC", hash: "SHA-256" }, false, ["sign"]);
  const sig = await crypto.subtle.sign("HMAC", k, enc.encode(message));
  return Array.from(new Uint8Array(sig), (b) => b.toString(16).padStart(2, "0")).join("");
}

function safeEqual(a: string, b: string) {
  if (a.length !== b.length) return false;
  let diff = 0;
  for (let i = 0; i < a.length; i++) diff |= a.charCodeAt(i) ^ b.charCodeAt(i);
  return diff === 0;
}

/** Empreinte des trois réglages : si l'un change, les sessions existantes tombent. */
async function empreinte() {
  return hmac(process.env.HG_SESSION_SECRET ?? "", `cfg:${process.env.HG_PASSWORD}:${process.env.HG_TOTP_SECRET}`);
}

export async function checkPassword(candidate: string) {
  if (etatConfig().motDePasse !== "ok" || !etatConfig().secret) return false;
  const key = process.env.HG_SESSION_SECRET ?? "";
  const [a, b] = await Promise.all([hmac(key, `pw:${candidate}`), hmac(key, `pw:${process.env.HG_PASSWORD}`)]);
  return safeEqual(a, b);
}

export async function checkCode(code: string) {
  const secret = process.env.HG_TOTP_SECRET ?? "";
  if (!secret) return false;
  try {
    return await verifyTotp(secret, code);
  } catch {
    return false;
  }
}

export async function createSession(now = Date.now()) {
  if (!configure()) throw new Error("Harmonie Group n'est pas configuré (variables Vercel manquantes).");
  const exp = Math.floor(now / 1000) + SESSION_DAYS * 86400;
  return `${exp}.${await hmac(process.env.HG_SESSION_SECRET ?? "", `session:${exp}:${await empreinte()}`)}`;
}

export async function verifySession(value: string | undefined, now = Date.now()) {
  if (!configure() || !value) return false;
  const [expRaw, sig] = value.split(".");
  const exp = Number(expRaw);
  if (!Number.isInteger(exp) || !sig || exp * 1000 < now) return false;
  return safeEqual(sig, await hmac(process.env.HG_SESSION_SECRET ?? "", `session:${exp}:${await empreinte()}`));
}

export const ONGLETS = ["/groupe", "/luma", "/harmonie-yacht", "/perso"] as const;

/** Retour après connexion : uniquement l'un des 4 onglets. */
export function safeNext(next: string | null | undefined) {
  return next && (ONGLETS as readonly string[]).includes(next) ? next : "/groupe";
}
