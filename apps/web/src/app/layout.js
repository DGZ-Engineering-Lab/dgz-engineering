import { Geist, Geist_Mono, Bodoni_Moda } from "next/font/google";
import "./globals.css";

import Background from "../components/Background";
import Navbar from "../components/Navbar";
import FloatingTelemetry from "../components/FloatingTelemetry";
import SystemStatusHeader from "../components/SystemStatusHeader";
import AudioInitializer from "../components/AudioInitializer";
import { Analytics } from "@vercel/analytics/react";
import { SpeedInsights } from "@vercel/speed-insights/next";
import { PostHogProvider } from "../components/PostHogProvider";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
  display: "swap",
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
  display: "swap",
});

const displaySerif = Bodoni_Moda({
  variable: "--font-display-serif",
  subsets: ["latin"],
  style: ["normal", "italic"],
  axes: ["opsz"],
  display: "swap",
});

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || "https://devgiz.vercel.app";
const TITLE = "DevGiz | Ingeniería Geoespacial, Catastro LADM-COL y DevOps Territorial";
const DESCRIPTION =
  "Plataforma de ingeniería territorial: catastro multipropósito LADM-COL, SIG empresarial, GeoAI y pipelines DevOps para el sector público y privado en Colombia.";

export const metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: TITLE,
    template: "%s | DevGiz",
  },
  description: DESCRIPTION,
  applicationName: "DevGiz",
  keywords: [
    "LADM-COL",
    "catastro multipropósito",
    "SIG",
    "GIS",
    "GeoAI",
    "PostGIS",
    "QGIS",
    "ingeniería geoespacial",
    "DevOps",
    "Colombia",
  ],
  authors: [{ name: "DevGiz Engineering Lab" }],
  alternates: { canonical: "/" },
  openGraph: {
    type: "website",
    locale: "es_CO",
    url: SITE_URL,
    siteName: "DevGiz",
    title: TITLE,
    description: DESCRIPTION,
  },
  twitter: {
    card: "summary_large_image",
    title: TITLE,
    description: DESCRIPTION,
  },
  robots: { index: true, follow: true },
};

export const viewport = {
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#0b0a08" },
    { media: "(prefers-color-scheme: dark)", color: "#0b0a08" },
  ],
  colorScheme: "light",
};

const organizationJsonLd = {
  "@context": "https://schema.org",
  "@type": "ProfessionalService",
  name: "DevGiz Engineering",
  url: SITE_URL,
  email: "engineering@devgiz.com",
  description: DESCRIPTION,
  areaServed: "CO",
  address: { "@type": "PostalAddress", addressCountry: "CO", addressLocality: "Medellín" },
  knowsAbout: ["LADM-COL", "Catastro multipropósito", "Sistemas de Información Geográfica", "GeoAI", "DevOps"],
};

export default function RootLayout({ children }) {
  return (
    <html
      lang="es"
      className={`${geistSans.variable} ${geistMono.variable} ${displaySerif.variable} h-full antialiased`}
      data-scroll-behavior="smooth"
      suppressHydrationWarning
    >
      <body className="min-h-full flex flex-col text-[var(--foreground)] bg-[var(--background)]" suppressHydrationWarning>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationJsonLd) }}
        />
        <a
          href="#contenido"
          className="sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 focus:z-[200] focus:px-4 focus:py-2 focus:bg-obsidian focus:text-gold focus:rounded"
        >
          Saltar al contenido
        </a>
        <PostHogProvider>
          <AudioInitializer />
          <Background />
          <SystemStatusHeader />
          <Navbar />
          <FloatingTelemetry />
          <main id="contenido" className="relative z-10 flex flex-col min-h-screen">
            {children}
          </main>
          <Analytics />
          <SpeedInsights />
        </PostHogProvider>
      </body>
    </html>
  );
}
