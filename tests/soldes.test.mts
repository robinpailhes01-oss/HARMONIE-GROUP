import { test } from "node:test";
import assert from "node:assert/strict";
import { bornesAnnee, choisirSoldes, fraicheur, type LigneCompte } from "../lib/soldes.ts";

const au = new Date("2026-11-26T07:53:26Z");
const lignes: LigneCompte[] = [
  { nom: "Compte principal", role: "principal", solde: 385, soldeAu: au },
  { nom: "TVA", role: "tva", solde: 96.63, soldeAu: au },
  { nom: "Autre", role: "autre", solde: 1000, soldeAu: au },
];

test("la trésorerie est le compte principal, la TVA est à part, rien n'est additionné", () => {
  const s = choisirSoldes(lignes);
  assert.equal(s.tresorerie?.solde, 385);
  assert.equal(s.tva?.solde, 96.63);
});

test("un compte sans solde ou sans date n'est pas affiché", () => {
  const s = choisirSoldes([{ nom: "Compte principal", role: "principal", solde: null, soldeAu: null }]);
  assert.equal(s.tresorerie, null);
  assert.equal(s.tva, null);
});

test("aucun compte : rien n'est inventé", () => {
  assert.deepEqual(choisirSoldes([]), { tresorerie: null, tva: null });
});

test("fraîcheur : 36 h maximum", () => {
  assert.equal(fraicheur(au, new Date("2026-11-27T10:00:00Z")), "a-jour");
  assert.equal(fraicheur(au, new Date("2026-11-28T10:00:00Z")), "ancien");
});

test("année civile à Paris : le 31 décembre à 23 h 30 UTC est déjà l'année suivante à Paris", () => {
  assert.deepEqual(bornesAnnee(new Date("2026-06-15T10:00:00Z")), { annee: 2026, debut: "2026-01-01", fin: "2026-12-31" });
  assert.equal(bornesAnnee(new Date("2026-12-31T23:30:00Z")).annee, 2027);
});
