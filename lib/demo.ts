/**
 * ⚠️ DONNÉES FICTIVES — MODE DÉMO UNIQUEMENT (demande de Robin du 22/11/2026, pour voir le rendu en attendant
 * le branchement des vraies sources). Aucun chiffre, nom ou statut de ce fichier n'est réel.
 * Règles : elles ne s'affichent qu'en mode démo, toujours sous l'étiquette « Démo », et ne se mélangent jamais
 * à une vraie donnée. Tout chiffre réel vient de sa source (lib/indicateurs.ts), jamais d'ici.
 */
import type { Espace } from "./indicateurs";

export type Ton = "ok" | "attention" | "alerte" | "neutre";
export type KpiDemo = { valeur: number | string; variation?: number; serie?: number[]; sens?: "hausse-bien" | "baisse-bien" };
export type LigneDemo = { titre: string; detail: string; droite?: string; ton?: Ton; tag?: "luma" | "hy" | "perso" | "groupe" };
export type SerieDemo = { id: "luma" | "hy" | "perso"; nom: string; valeurs: number[] };
export type GrapheDemo = { titre: string; sousTitre: string; series: SerieDemo[] };
export type EtatDemo = { ton: Ton; etat: string; detail: string };

export type DemoOnglet = {
  kpis: Record<string, KpiDemo>;
  graphe: GrapheDemo;
  repartition?: { titre: string; parts: { id: "luma" | "hy" | "perso"; nom: string; valeur: number }[] };
  listes: Record<string, LigneDemo[]>;
  aRetenir: LigneDemo[];
};

export const MOIS = ["janv.", "févr.", "mars", "avr.", "mai", "juin", "juil.", "août", "sept.", "oct.", "nov."];

const CA_LUMA = [0, 0, 0, 0, 0, 0, 0, 0, 1200, 3600, 4800];
const CA_HY = [1200, 900, 2100, 3400, 6800, 9400, 14200, 15800, 8600, 3900, 1500];
const DEP_HY = [1800, 1500, 2200, 2600, 3900, 4800, 6100, 6500, 4200, 2900, 2700];
const DEP_PERSO = [420, 510, 380, 690, 540, 610, 720, 480, 530, 690, 670];
const somme = (t: number[]) => t.reduce((a, b) => a + b, 0);

export const DEMO: Record<Espace, DemoOnglet> = {
  groupe: {
    kpis: {
      tresorerie: { valeur: 38450, variation: 4.2, serie: [31200, 32800, 31900, 33600, 35100, 34200, 36000, 36900, 35800, 37400, 36900, 38450], sens: "hausse-bien" },
      "ca-total": { valeur: somme(CA_LUMA) + somme(CA_HY), variation: 18, serie: CA_LUMA.map((v, i) => v + CA_HY[i]), sens: "hausse-bien" },
      "ca-luma": { valeur: somme(CA_LUMA), variation: 33, serie: CA_LUMA, sens: "hausse-bien" },
      "ca-hy": { valeur: somme(CA_HY), variation: 12, serie: CA_HY, sens: "hausse-bien" },
      "depenses-perso": { valeur: somme(DEP_PERSO), variation: -8, serie: DEP_PERSO, sens: "baisse-bien" },
      "a-classer": { valeur: 14 },
    },
    graphe: {
      titre: "Chiffre d'affaires par mois",
      sousTitre: "Encaissé, par activité",
      series: [
        { id: "hy", nom: "Harmonie Yacht", valeurs: CA_HY },
        { id: "luma", nom: "Luma", valeurs: CA_LUMA },
      ],
    },
    repartition: {
      titre: "Où part l'argent",
      parts: [
        { id: "hy", nom: "Harmonie Yacht", valeur: somme(DEP_HY) },
        { id: "luma", nom: "Luma", valeur: 7900 },
        { id: "perso", nom: "Perso", valeur: somme(DEP_PERSO) },
      ],
    },
    listes: {
      urgent: [
        { titre: "Répondre à 3 demandes WhatsApp", detail: "Léa attend ta réponse depuis 26 h", ton: "alerte", tag: "hy" },
        { titre: "Relancer la Boulangerie Martin", detail: "Proposition envoyée il y a 7 jours", ton: "attention", tag: "luma" },
        { titre: "Payer l'assurance du bateau", detail: "Avant le 30 nov.", droite: "1 140 €", ton: "attention", tag: "hy" },
        { titre: "Classer 14 mouvements Qonto", detail: "En attente de l'agent comptable", ton: "neutre", tag: "groupe" },
      ],
      decision: [
        { titre: "Valider le devis Clim Sud Énergie", detail: "Employé WhatsApp + agenda", droite: "3 200 €", tag: "luma" },
        { titre: "Accepter la sortie privée du 14 déc.", detail: "6 personnes, coucher de soleil", droite: "1 200 €", tag: "hy" },
        { titre: "Budget pub de décembre", detail: "Passer de 5 € à 7 € par jour ?", tag: "luma" },
      ],
    },
    aRetenir: [
      { titre: "Meilleur mois pour Luma", detail: "4 800 € encaissés en novembre", ton: "ok", tag: "luma" },
      { titre: "Basse saison au port", detail: "Recettes du yacht en baisse de 51 % sur 30 jours", ton: "attention", tag: "hy" },
      { titre: "Perso sous contrôle", detail: "Dépenses en baisse de 8 % sur l'année", ton: "ok", tag: "perso" },
      { titre: "14 mouvements à classer", detail: "L'agent comptable n'existe pas encore", ton: "neutre", tag: "groupe" },
    ],
  },

  luma: {
    kpis: {
      "ca-encaisse": { valeur: somme(CA_LUMA), variation: 33, serie: CA_LUMA, sens: "hausse-bien" },
      "ca-signe": { valeur: 14200, variation: 21, serie: [0, 0, 0, 0, 0, 0, 0, 0, 2400, 7000, 14200], sens: "hausse-bien" },
      clients: { valeur: 3, variation: 50 },
      "actions-dues": { valeur: 5 },
    },
    graphe: { titre: "CA encaissé par mois", sousTitre: "Luma", series: [{ id: "luma", nom: "Luma", valeurs: CA_LUMA }] },
    listes: {
      affaires: [
        { titre: "Domaine des Oliviers", detail: "Tableau de bord · acompte reçu", droite: "4 800 €", ton: "ok" },
        { titre: "Clim Sud Énergie", detail: "Employé WhatsApp + agenda · négociation", droite: "3 200 €", ton: "attention" },
        { titre: "Boulangerie Martin", detail: "Employé WhatsApp · proposition envoyée", droite: "2 400 €", ton: "attention" },
        { titre: "École de voile Azur", detail: "Employé WhatsApp · à relancer", droite: "1 900 €", ton: "neutre" },
        { titre: "Garage Lambert", detail: "Audit · rendez-vous le 27 nov.", ton: "neutre" },
      ],
      urgent: [
        { titre: "Préparer le rendez-vous Garage Lambert", detail: "Jeudi 27 nov., 10 h", ton: "attention" },
        { titre: "Facture d'acompte Domaine des Oliviers", detail: "À finaliser dans Qonto", ton: "alerte" },
        { titre: "Relancer la Boulangerie Martin", detail: "Relance J+7", ton: "attention" },
      ],
    },
    aRetenir: [
      { titre: "Novembre, record", detail: "4 800 € encaissés, +33 % sur octobre", ton: "ok" },
      { titre: "Prospection", detail: "48 mails cette semaine, 3 réponses positives", ton: "ok" },
      { titre: "Pub en pause", detail: "Plafond de 5 €/jour atteint mardi", ton: "attention" },
    ],
  },

  "harmonie-yacht": {
    kpis: {
      ca: { valeur: somme(CA_HY), variation: 12, serie: CA_HY, sens: "hausse-bien" },
      "recettes-30j": { valeur: 1900, variation: -51, serie: [3900, 3400, 2800, 2600, 2300, 1900], sens: "hausse-bien" },
      "depenses-30j": { valeur: 2750, variation: -5, serie: [4200, 3600, 2900, 2800, 2700, 2750], sens: "baisse-bien" },
      score: { valeur: "Correct" },
      reservations: { valeur: 7, variation: 40 },
    },
    graphe: {
      titre: "Recettes et dépenses par mois",
      sousTitre: "Harmonie Yacht",
      series: [
        { id: "hy", nom: "Recettes", valeurs: CA_HY },
        { id: "perso", nom: "Dépenses", valeurs: DEP_HY },
      ],
    },
    listes: {
      reservations: [
        { titre: "Sam. 6 déc. · Coucher de soleil", detail: "4 personnes · acompte reçu", droite: "680 €", ton: "ok" },
        { titre: "Sam. 14 déc. · Sortie privée", detail: "6 personnes · en attente de ta réponse", droite: "1 200 €", ton: "attention" },
        { titre: "Mer. 31 déc. · Nouvel An à bord", detail: "2 personnes · confirmée", droite: "450 €", ton: "ok" },
        { titre: "Sam. 10 janv. · Nuit à bord", detail: "2 personnes · confirmée", droite: "200 €", ton: "ok" },
      ],
      urgent: [
        { titre: "Claire D.", detail: "Sortie privée, sans réponse depuis 26 h", ton: "alerte" },
        { titre: "Thomas R.", detail: "Demande à payer en 3 fois", ton: "attention" },
        { titre: "Agence Évasion", detail: "Devis groupe, 12 personnes", ton: "attention" },
      ],
    },
    aRetenir: [
      { titre: "Basse saison", detail: "Recettes 30 jours : 1 900 €, -51 %", ton: "attention" },
      { titre: "Léa tient la barre", detail: "23 messages traités aujourd'hui, réponse en 2 min", ton: "ok" },
      { titre: "Mer agitée dimanche", detail: "Vent 28 nœuds : sortie déconseillée", ton: "alerte" },
    ],
  },

  perso: {
    kpis: {
      depenses: { valeur: somme(DEP_PERSO), variation: -8, serie: DEP_PERSO, sens: "baisse-bien" },
      nombre: { valeur: 86, variation: -4 },
    },
    graphe: { titre: "Dépenses perso par mois", sousTitre: "Mouvements classés « Perso »", series: [{ id: "perso", nom: "Perso", valeurs: DEP_PERSO }] },
    listes: {
      mouvements: [
        { titre: "Carrefour Market", detail: "18 nov. · Courses", droite: "−86 €" },
        { titre: "TotalEnergies", detail: "16 nov. · Carburant", droite: "−72 €" },
        { titre: "Netflix", detail: "12 nov. · Abonnements", droite: "−13 €" },
        { titre: "Restaurant du port", detail: "9 nov. · Sorties", droite: "−54 €" },
        { titre: "Pharmacie", detail: "3 nov. · Santé", droite: "−22 €" },
      ],
    },
    aRetenir: [
      { titre: "Premier poste : courses", detail: "31 % des dépenses perso", ton: "neutre" },
      { titre: "Abonnements", detail: "4 abonnements actifs, 47 € par mois", ton: "attention" },
      { titre: "Tendance", detail: "-8 % sur l'année", ton: "ok" },
    ],
  },
};

/** État fictif des outils et des agents (démo). L'agent comptable reste « À créer » : c'est la vérité, même en démo. */
export const ETAT_OUTILS_DEMO: Record<string, EtatDemo> = {
  qonto: { ton: "ok", etat: "Connecté", detail: "Synchro il y a 4 min" },
  "supabase-luma": { ton: "ok", etat: "Connecté", detail: "Lecture seule" },
  resend: { ton: "ok", etat: "Connecté", detail: "48 envois cette semaine" },
  zernio: { ton: "attention", etat: "À renouveler", detail: "Jeton expire dans 5 jours" },
  telegram: { ton: "ok", etat: "Connecté", detail: "Dernière alerte à 8 h 12" },
  baileys: { ton: "ok", etat: "Connecté", detail: "3 numéros actifs" },
  apify: { ton: "neutre", etat: "En veille", detail: "Dernière recherche lundi" },
  vercel: { ton: "ok", etat: "Connecté", detail: "Déployé il y a 2 h" },
  "supabase-hy": { ton: "ok", etat: "Connecté", detail: "Lecture seule" },
  sumup: { ton: "ok", etat: "Connecté", detail: "Dernier paiement samedi" },
  stripe: { ton: "neutre", etat: "En veille", detail: "Aucun paiement depuis 30 j" },
  "whatsapp-lea": { ton: "ok", etat: "Connecté", detail: "Téléphone en ligne" },
  agenda: { ton: "ok", etat: "Connecté", detail: "4 sorties à venir" },
  gmail: { ton: "alerte", etat: "Déconnecté", detail: "Autorisation à refaire" },
  meteo: { ton: "ok", etat: "Connecté", detail: "Mis à jour à 6 h" },
};

export const ETAT_AGENTS_DEMO: Record<string, EtatDemo> = {
  manager: { ton: "ok", etat: "Actif", detail: "Point du lundi envoyé" },
  jordan: { ton: "ok", etat: "Actif", detail: "2 relances préparées ce matin" },
  simon: { ton: "ok", etat: "Actif", detail: "48 mails, 3 réponses positives" },
  don: { ton: "attention", etat: "En pause", detail: "Plafond de 5 €/jour atteint" },
  hermes: { ton: "ok", etat: "Actif", detail: "Fiches prospects à jour" },
  alma: { ton: "ok", etat: "Actif", detail: "12 visiteurs aidés aujourd'hui" },
  lea: { ton: "ok", etat: "Actif", detail: "23 messages, réponse en 2 min" },
  "qonto-sync": { ton: "ok", etat: "OK", detail: "112 mouvements ce mois-ci" },
  "finance-pulse": { ton: "ok", etat: "OK", detail: "Bilan calculé à 6 h" },
  "daily-recap": { ton: "ok", etat: "OK", detail: "Récap envoyé à 20 h" },
  "weather-sync": { ton: "ok", etat: "OK", detail: "Mis à jour à 6 h" },
};

export const COOKIE_DEMO = "hg_demo";
