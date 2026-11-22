import type { Metadata, Viewport } from "next";
import { Geist, Instrument_Serif, Urbanist } from "next/font/google";
import "./globals.css";

const geist = Geist({ subsets: ["latin"], variable: "--font-geist", display: "swap" });
const urbanist = Urbanist({ subsets: ["latin"], variable: "--font-urbanist", display: "swap" });
const instrument = Instrument_Serif({ subsets: ["latin"], weight: "400", style: "italic", variable: "--font-instrument", display: "swap" });

export const metadata: Metadata = {
  title: { default: "Harmonie Group", template: "%s · Harmonie Group" },
  description: "Tour de contrôle privée d'Harmonie Group.",
  robots: { index: false, follow: false },
};

export const viewport: Viewport = { width: "device-width", initialScale: 1 };

/* Applique le thème forcé (clair ou sombre) avant le premier rendu, pour éviter un flash. */
const THEME_SCRIPT = `try{var t=localStorage.getItem("hg-theme");if(t==="dark")document.documentElement.dataset.theme=t}catch(e){}`;

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="fr" className={`${geist.variable} ${urbanist.variable} ${instrument.variable}`} suppressHydrationWarning>
      <head>
        <script dangerouslySetInnerHTML={{ __html: THEME_SCRIPT }} />
      </head>
      <body>{children}</body>
    </html>
  );
}
