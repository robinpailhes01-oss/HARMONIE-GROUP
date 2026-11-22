import { test } from "node:test";
import assert from "node:assert/strict";
import { hotp, verifyTotp, base32Decode } from "../lib/totp.ts";

// Vecteurs officiels RFC 6238 (SHA-1, clé « 12345678901234567890 »), sur 8 chiffres.
const KEY = new TextEncoder().encode("12345678901234567890");
const B32 = "GEZDGNBVGY3TQOJQGEZDGNBVGY3TQOJQ";

test("base32", () => assert.deepEqual(base32Decode(B32), KEY));

test("RFC 6238", async () => {
  for (const [t, code] of [[59, "94287082"], [1111111109, "07081804"], [1234567890, "89005924"], [2000000000, "69279037"]] as const) {
    assert.equal(await hotp(KEY, Math.floor(t / 30), 8), code);
  }
});

test("verifyTotp accepte le pas courant et voisin, refuse le reste", async () => {
  const now = 59_000;
  const code = await hotp(KEY, 1, 6);
  assert.equal(await verifyTotp(B32, code, now), true);
  assert.equal(await verifyTotp(B32, code, now + 30_000), true);
  assert.equal(await verifyTotp(B32, code, now + 120_000), false);
  assert.equal(await verifyTotp(B32, "abc", now), false);
});

test("nouvelleCle : 32 caractères base32, utilisable", async () => {
  const { nouvelleCle } = await import("../lib/totp.ts");
  const k = nouvelleCle();
  assert.match(k, /^[A-Z2-7]{32}$/);
  assert.equal(base32Decode(k).length, 20);
});
