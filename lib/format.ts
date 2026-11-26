const EUROS = new Intl.NumberFormat("fr-FR", { style: "currency", currency: "EUR", maximumFractionDigits: 0 });
const EUROS_2 = new Intl.NumberFormat("fr-FR", { style: "currency", currency: "EUR", minimumFractionDigits: 2, maximumFractionDigits: 2 });
const NOMBRE = new Intl.NumberFormat("fr-FR", { maximumFractionDigits: 0 });
const EUROS_COURT = new Intl.NumberFormat("fr-FR", { notation: "compact", maximumFractionDigits: 1 });

export const euros = (n: number) => EUROS.format(n);
/** Montants de banque : toujours les centimes. */
export const euros2 = (n: number) => EUROS_2.format(n);
export const nombre = (n: number) => NOMBRE.format(n);
export const eurosCourt = (n: number) => `${EUROS_COURT.format(n)} €`;
export const pourcent = (n: number) => `${n > 0 ? "+" : ""}${n.toLocaleString("fr-FR", { maximumFractionDigits: 1 })} %`;

/** Couleurs des séries (validées par dataviz/scripts/validate_palette.js le 22/11/2026, clair : toutes PASS). */
export const COULEUR_SERIE = { luma: "#6b4fd8", hy: "#1a9bb5", perso: "#b07a2a" } as const;
