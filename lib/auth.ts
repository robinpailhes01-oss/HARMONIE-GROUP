/**
 * Accès à Harmonie Group : mot de passe (HG_PASSWORD, 16 caractères minimum) PUIS code à 6 chiffres
 * (HG_TOTP_SECRET, application d'authentification). Les deux sont obligatoires : sans l'un d'eux, aucune connexion.
 * Session : cookie signé HMAC-SHA256 (clé HG_SESSION_SECRET si elle existe, sinon le mot de passe), valable 7 jours.
 * Changer le mot de passe, la clé du code ou HG_SESSION_SECRET déconnecte toutes les sessions.
 * Toutes les valeurs vivent dans Vercel (Production et Preview), jamais dans un fichier.
 */
import { decalage, verifyTotp } from "./totp";

export const SESSION_COOKIE = "hg_session";
export const SESSION_DAYS = 7;
export const MIN_PASSWORD = 16;

const enc = new TextEncoder();

/** Le mot de passe réglé dans Vercel, sans espace ni retour à la ligne collés par erreur au début ou à la fin. */
function pwEnv() {
  return (process.env.HG_PASSWORD ?? "").trim();
}

export type EtatConfig = { motDePasse: "absent" | "court" | "ok"; code: boolean; secret: boolean };

export function etatConfig(): EtatConfig {
  const pw = pwEnv();
  return {
    motDePasse: !pw ? "absent" : pw.length >= MIN_PASSWORD ? "ok" : "court",
    code: Boolean(process.env.HG_TOTP_SECRET),
    // Facultatif : s'il est donné, 32 caractères minimum.
    secret: !process.env.HG_SESSION_SECRET || process.env.HG_SESSION_SECRET.length >= 32,
  };
}

export function configure() {
  const e = etatConfig();
  return e.motDePasse === "ok" && e.code && e.secret;
}

function cle() {
  return process.env.HG_SESSION_SECRET || pwEnv();
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
  return hmac(cle(), `cfg:${pwEnv()}:${(process.env.HG_TOTP_SECRET ?? "").trim()}`);
}

export async function checkPassword(candidate: string) {
  if (etatConfig().motDePasse !== "ok" || !etatConfig().secret) return false;
  const key = cle();
  // Le mot de passe saisi est aussi nettoyé : le clavier d'un téléphone ajoute souvent une espace à la fin.
  const [a, b] = await Promise.all([hmac(key, `pw:${candidate.trim()}`), hmac(key, `pw:${pwEnv()}`)]);
  return safeEqual(a, b);
}

export async function checkCode(code: string) {
  const secret = (process.env.HG_TOTP_SECRET ?? "").trim();
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
  return `${exp}.${await hmac(cle(), `session:${exp}:${await empreinte()}`)}`;
}

export async function verifySession(value: string | undefined, now = Date.now()) {
  if (!configure() || !value) return false;
  const [expRaw, sig] = value.split(".");
  const exp = Number(expRaw);
  if (!Number.isInteger(exp) || !sig || exp * 1000 < now) return false;
  return safeEqual(sig, await hmac(cle(), `session:${exp}:${await empreinte()}`));
}

export const ONGLETS = ["/groupe", "/luma", "/harmonie-yacht", "/perso"] as const;

/** Retour après connexion : uniquement l'un des 4 onglets. */
export function safeNext(next: string | null | undefined) {
  return next && (ONGLETS as readonly string[]).includes(next) ? next : "/groupe";
}

/**
 * Journal d'un refus, pour le propriétaire (journaux Vercel). Dit quel facteur a échoué et pourquoi, SANS jamais
 * contenir le mot de passe, la clé ni le code saisi. L'écran, lui, ne dit jamais lequel est faux.
 */
export async function journalRefus(motDePasseOk: boolean, code: string) {
  const brut = process.env.HG_TOTP_SECRET ?? "";
  let decal: number | null = null;
  let cleValide = true;
  try {
    decal = await decalage(brut.trim(), code);
  } catch {
    cleValide = false;
  }
  console.warn(
    "[connexion] refus",
    JSON.stringify({
      motDePasseOk,
      codeOk: decal !== null && Math.abs(decal) <= 1,
      chiffresRecus: code.replace(/\D/g, "").length,
      decalagePas: decal, // 0 = bon ; +-1 toléré ; plus = horloge du téléphone décalée ; null = aucune correspondance
      cleBase32Valide: cleValide,
      cleLongueur: brut.trim().length,
      envMotDePasseAvecEspaces: (process.env.HG_PASSWORD ?? "") !== pwEnv(),
      envCleAvecEspaces: brut !== brut.trim(),
      sessionSecretPresent: Boolean(process.env.HG_SESSION_SECRET),
    }),
  );
}
