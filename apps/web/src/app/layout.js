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
import FloatingTelemetry from "../components/FloatingTelemetry";
import SystemStatusHeader from "../components/SystemStatusHeader";
import AudioInitializer from "../components/AudioInitializer";
import { Analytics } from "@vercel/analytics/react";
import { SpeedInsights } from "@vercel/speed-insights/next";
import { PostHogProvider } from "../components/PostHogProvider";
import MotionPreferences from "../components/MotionPreferences";

export const metadata = {
  title: "DevGiz | Smart Geospatial DevOps Systems",
  description: "Building Digital Territories with advanced GIS and DevOps pipelines.",
};

export default function RootLayout({ children }) {
  return (
    <html
      lang="es"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
      data-scroll-behavior="smooth"
      suppressHydrationWarning
    >
      <body className="min-h-full flex flex-col text-[var(--foreground)] bg-[var(--background)]" suppressHydrationWarning>
        <a href="#main-content" className="skip-link">
          Saltar al contenido principal
        </a>
        <PostHogProvider>
          <MotionPreferences>
            <AudioInitializer />
            <Background />
            <SystemStatusHeader />
            <Navbar />
            <FloatingTelemetry />
            <main id="main-content" tabIndex={-1} className="relative z-10 flex flex-col min-h-screen">
              {children}
            </main>
          </MotionPreferences>
          <Analytics />
          <SpeedInsights />
        </PostHogProvider>
      </body>
    </html>
  );
}

