import {
  Anchor,
  ArrowDownRight,
  BadgeEuro,
  Briefcase,
  CalendarCheck,
  CircleAlert,
  Flame,
  Gauge,
  Repeat,
  HandCoins,
  CalendarClock,
  Handshake,
  Inbox,
  Landmark,
  LayoutGrid,
  ListChecks,
  ReceiptText,
  Shapes,
  Sparkles,
  TrendingUp,
  User,
  Wallet,
  type LucideIcon,
} from "lucide-react";
import type { Espace } from "@/lib/indicateurs";

export const ICONE_ESPACE: Record<Espace, LucideIcon> = {
  groupe: LayoutGrid,
  luma: Sparkles,
  "harmonie-yacht": Anchor,
  perso: User,
};

/** Icône de chaque carte, par identifiant (lib/indicateurs.ts). */
const PAR_ID: Record<string, LucideIcon> = {
  tresorerie: Landmark,
  "ca-total": TrendingUp,
  "ca-luma": Sparkles,
  "ca-hy": Anchor,
  "depenses-perso": Wallet,
  "a-classer": Shapes,
  "ca-encaisse": BadgeEuro,
  "ca-signe": Handshake,
  clients: Briefcase,
  "actions-dues": ListChecks,
  ca: BadgeEuro,
  "recettes-30j": TrendingUp,
  "depenses-30j": ArrowDownRight,
  score: Gauge,
  reservations: CalendarClock,
  depenses: Wallet,
  "ca-annee": TrendingUp,
  mrr: Repeat,
  "paiements-a-venir": HandCoins,
  chauds: Flame,
  nombre: ReceiptText,
  urgent: CircleAlert,
  decision: Inbox,
  affaires: Briefcase,
  mouvements: ReceiptText,
};

export function iconeDe(id: string): LucideIcon {
  return PAR_ID[id] ?? LayoutGrid;
}
