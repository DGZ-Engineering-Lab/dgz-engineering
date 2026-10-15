import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

import Background from "../components/Background";
import Navbar from "../components/Navbar";
import FooterSection from "../components/FooterSection";
import SystemStatusHeader from "../components/SystemStatusHeader";
import AudioInitializer from "../components/AudioInitializer";
import { Analytics } from "@vercel/analytics/react";
import { SpeedInsights } from "@vercel/speed-insights/next";
import { PostHogProvider } from "../components/PostHogProvider";
import MotionPreferences from "../components/MotionPreferences";
import JsonLd from "../components/JsonLd";
import { SITE_URL, SITE_NAME, SITE_TAGLINE, SITE_DESCRIPTION, SITE_KEYWORDS, SITE_LOCALE, SITE_LANG, FOUNDER, siteJsonLd } from "../lib/seo";

export const metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: `${SITE_NAME} | ${SITE_TAGLINE}`,
    template: `%s | ${SITE_NAME}`,
  },
  description: SITE_DESCRIPTION,
  applicationName: SITE_NAME,
  keywords: SITE_KEYWORDS,
  authors: [{ name: FOUNDER.name, url: SITE_URL }],
  creator: FOUNDER.name,
  publisher: SITE_NAME,
  category: "technology",
  alternates: { canonical: "/" },
  openGraph: {
    title: `${SITE_NAME} | ${SITE_TAGLINE}`,
    description: SITE_DESCRIPTION,
    url: "/",
    siteName: SITE_NAME,
    locale: SITE_LOCALE,
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: `${SITE_NAME} | ${SITE_TAGLINE}`,
    description: SITE_DESCRIPTION,
  },
  robots: {
    index: true,
    follow: true,
    googleBot: { index: true, follow: true, "max-image-preview": "large", "max-snippet": -1, "max-video-preview": -1 },
  },
  formatDetection: { telephone: false },
  // Códigos de verificación de Google Search Console y Bing Webmaster Tools (variables de entorno en Vercel).
  verification: {
    ...(process.env.GOOGLE_SITE_VERIFICATION ? { google: process.env.GOOGLE_SITE_VERIFICATION } : {}),
    ...(process.env.BING_SITE_VERIFICATION ? { other: { "msvalidate.01": process.env.BING_SITE_VERIFICATION } } : {}),
  },
  other: { "geo.region": "CO-ANT", "geo.placename": "Medellín" },
};

export const viewport = {
  themeColor: "#f8fafc",
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({ children }) {
  return (
    <html
      lang={SITE_LANG}
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
      data-scroll-behavior="smooth"
      suppressHydrationWarning
    >
      <body className="min-h-full flex flex-col text-[var(--foreground)] bg-[var(--background)]" suppressHydrationWarning>
        <a href="#main-content" className="skip-link">
          Saltar al contenido principal
        </a>
        <JsonLd data={siteJsonLd()} />
        <PostHogProvider>
          <MotionPreferences>
            <AudioInitializer />
            <Background />
            <SystemStatusHeader />
            <Navbar />
            <main id="main-content" tabIndex={-1} className="relative z-10 flex flex-col min-h-screen">
              {children}
            </main>
            <FooterSection />
          </MotionPreferences>
          <Analytics />
          <SpeedInsights />
        </PostHogProvider>
      </body>
    </html>
  );
}

