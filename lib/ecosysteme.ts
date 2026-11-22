/**
 * Les outils et les agents de chaque espace. Ces listes sont des FAITS, relevés le 22/11/2026 dans les dépôts
 * (robin-LP : CLAUDE.md, luma-context/decisions.md ; IA-HY-INFRA-NEW : README.md, supabase/functions).
 * Leur état réel (en ligne, dernière synchro) n'est pas encore branché : hors démo, on affiche « Pas branché ».
 */
import type { Espace } from "./indicateurs";

export type Outil = { id: string; nom: string; role: string; espace: Exclude<Espace, "groupe"> | "groupe" };
export type Agent = { id: string; nom: string; role: string; espace: Exclude<Espace, "groupe"> | "groupe"; type: "agent" | "automatisme"; aCreer?: boolean };

export const OUTILS: Outil[] = [
  { id: "qonto", nom: "Qonto", role: "Le compte bancaire du groupe", espace: "groupe" },
  { id: "supabase-luma", nom: "Supabase luma-agence", role: "La base de Luma", espace: "luma" },
  { id: "resend", nom: "Resend", role: "Mails de prospection", espace: "luma" },
  { id: "zernio", nom: "Zernio", role: "Pubs Meta et Instagram", espace: "luma" },
  { id: "telegram", nom: "Telegram", role: "Alertes et validations de Robin", espace: "luma" },
  { id: "baileys", nom: "WhatsApp (Baileys, Railway)", role: "Les employés WhatsApp", espace: "luma" },
  { id: "apify", nom: "Apify · Outscraper", role: "Recherche de prospects", espace: "luma" },
  { id: "vercel", nom: "Vercel", role: "Site, studio et tableaux de bord", espace: "luma" },
  { id: "supabase-hy", nom: "Supabase Harmonie Yacht", role: "La base d'Harmonie Yacht", espace: "harmonie-yacht" },
  { id: "sumup", nom: "SumUp", role: "Paiements par carte", espace: "harmonie-yacht" },
  { id: "stripe", nom: "Stripe", role: "Paiements en ligne", espace: "harmonie-yacht" },
  { id: "whatsapp-lea", nom: "WhatsApp de Léa", role: "Les messages des clients", espace: "harmonie-yacht" },
  { id: "agenda", nom: "Google Agenda", role: "Le planning des sorties", espace: "harmonie-yacht" },
  { id: "gmail", nom: "Gmail", role: "La boîte mail", espace: "harmonie-yacht" },
  { id: "meteo", nom: "Open-Meteo", role: "La météo marine", espace: "harmonie-yacht" },
];

export const AGENTS: Agent[] = [
  { id: "comptable", nom: "Agent comptable", role: "Classe chaque mouvement Qonto : Luma, Harmonie Yacht ou Perso", espace: "groupe", type: "agent", aCreer: true },
  { id: "manager", nom: "Manager", role: "Vue d'ensemble, priorités, contrôle qualité", espace: "luma", type: "agent" },
  { id: "jordan", nom: "Jordan", role: "Ventes : affaires, relances, propositions", espace: "luma", type: "agent" },
  { id: "simon", nom: "Simon", role: "Prospection : leads et mails à froid", espace: "luma", type: "agent" },
  { id: "don", nom: "Don", role: "Publicité Meta (plafond 5 €/jour)", espace: "luma", type: "agent" },
  { id: "hermes", nom: "Hermes", role: "Agent opérationnel (VPS, Telegram)", espace: "luma", type: "agent" },
  { id: "alma", nom: "Alma", role: "L'agent du site luma-agence.fr", espace: "luma", type: "agent" },
  { id: "lea", nom: "Léa", role: "Agent WhatsApp et manageuse", espace: "harmonie-yacht", type: "agent" },
  { id: "qonto-sync", nom: "Synchro Qonto", role: "Copie les mouvements bancaires", espace: "harmonie-yacht", type: "automatisme" },
  { id: "finance-pulse", nom: "Bilan financier", role: "Trésorerie, score et tendances, chaque jour", espace: "harmonie-yacht", type: "automatisme" },
  { id: "daily-recap", nom: "Récap du jour", role: "Le résumé quotidien", espace: "harmonie-yacht", type: "automatisme" },
  { id: "weather-sync", nom: "Météo marine", role: "Vent et mer pour les sorties", espace: "harmonie-yacht", type: "automatisme" },
];

/** Groupe : tout ; Perso : Qonto et l'agent comptable ; sinon, l'espace lui-même. */
export function outilsDe(espace: Espace) {
  if (espace === "groupe") return OUTILS;
  if (espace === "perso") return OUTILS.filter((o) => o.id === "qonto");
  return OUTILS.filter((o) => o.espace === espace || o.id === "qonto");
}
export function agentsDe(espace: Espace) {
  if (espace === "groupe") return AGENTS;
  if (espace === "perso") return AGENTS.filter((a) => a.id === "comptable");
  return AGENTS.filter((a) => a.espace === espace);
}
