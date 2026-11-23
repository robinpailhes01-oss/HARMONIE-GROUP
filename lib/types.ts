/** Types partagés pour l'affichage des données réelles (lignes, états). */
export type Ton = "ok" | "attention" | "alerte" | "neutre";
export type Ligne = { titre: string; detail: string; droite?: string; ton?: Ton; tag?: "luma" | "hy" | "perso" | "groupe" };
