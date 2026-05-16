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
import { Analytics } from "@vercel/analytics/react";
import { SpeedInsights } from "@vercel/speed-insights/next";

export const metadata = {
  title: "DevGiz | Smart Geospatial DevOps Systems",
  description: "Building Digital Territories with advanced GIS and DevOps pipelines.",
};

export default function RootLayout({ children }) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
      data-scroll-behavior="smooth"
      suppressHydrationWarning
    >
      <body className="min-h-full flex flex-col text-slate-100 bg-[#02040a]" suppressHydrationWarning>
        <Background />
        <SystemStatusHeader />
        <Navbar />
        <main className="relative z-10 flex flex-col min-h-screen">
          {children}
        </main>
        <Analytics />
        <SpeedInsights />
      </body>
    </html>
  );
}
