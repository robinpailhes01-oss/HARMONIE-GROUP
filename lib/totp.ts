/**
 * Code à 6 chiffres qui change toutes les 30 secondes (TOTP, RFC 6238, HMAC-SHA1), compatible Google Authenticator.
 * Web Crypto uniquement : utilisable dans proxy.ts, les routes et les pages serveur.
 */

const B32 = "ABCDEFGHIJKLMNOPQRSTUVWXYZ234567";

export function base32Decode(input: string): Uint8Array {
  const clean = input.toUpperCase().replace(/[\s=-]/g, "");
  let bits = 0;
  let value = 0;
  const out: number[] = [];
  for (const ch of clean) {
    const idx = B32.indexOf(ch);
    if (idx < 0) throw new Error("Clé TOTP invalide (base32 attendu).");
    value = (value << 5) | idx;
    bits += 5;
    if (bits >= 8) {
      out.push((value >>> (bits - 8)) & 0xff);
      bits -= 8;
    }
  }
  return new Uint8Array(out);
}

export async function hotp(key: Uint8Array, counter: number, digits = 6): Promise<string> {
  const msg = new Uint8Array(8);
  let c = counter;
  for (let i = 7; i >= 0; i--) {
    msg[i] = c & 0xff;
    c = Math.floor(c / 256);
  }
  const k = await crypto.subtle.importKey("raw", key as BufferSource, { name: "HMAC", hash: "SHA-1" }, false, ["sign"]);
  const h = new Uint8Array(await crypto.subtle.sign("HMAC", k, msg));
  const off = h[h.length - 1] & 0x0f;
  const bin = ((h[off] & 0x7f) << 24) | (h[off + 1] << 16) | (h[off + 2] << 8) | h[off + 3];
  return String(bin % 10 ** digits).padStart(digits, "0");
}

/** Vérifie un code à ±1 pas de 30 s (tolère un léger décalage d'horloge du téléphone). */
export async function verifyTotp(secretB32: string, code: string, now = Date.now()): Promise<boolean> {
  const clean = code.replace(/\s/g, "");
  if (!/^\d{6}$/.test(clean) || !secretB32) return false;
  const key = base32Decode(secretB32);
  const step = Math.floor(now / 1000 / 30);
  let ok = false;
  for (const d of [-1, 0, 1]) {
    // Pas de sortie anticipée : même durée quel que soit le pas qui correspond.
    if ((await hotp(key, step + d)) === clean) ok = true;
  }
  return ok;
}

/** Adresse otpauth:// à scanner dans l'application d'authentification. */
export function otpauthUri(secretB32: string, label = "Harmonie Group") {
  const l = encodeURIComponent(label);
  return `otpauth://totp/${l}?secret=${secretB32.replace(/\s/g, "").toUpperCase()}&issuer=${l}&algorithm=SHA1&digits=6&period=30`;
}

/** Nouvelle clé aléatoire (160 bits, base32), générée au moment de l'activation. */
export function nouvelleCle() {
  const bytes = crypto.getRandomValues(new Uint8Array(20));
  let bits = 0;
  let value = 0;
  let out = "";
  for (const b of bytes) {
    value = (value << 8) | b;
    bits += 8;
    while (bits >= 5) {
      out += B32[(value >>> (bits - 5)) & 31];
      bits -= 5;
    }
  }
  return out;
}
