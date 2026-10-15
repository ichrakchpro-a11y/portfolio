import type { Metadata } from "next";
import { Space_Grotesk, Inter, JetBrains_Mono } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "@/components/ThemeProvider";
import { LocaleProvider } from "@/lib/i18n";
import { AmbientBackground } from "@/components/AmbientBackground";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";

const spaceGrotesk = Space_Grotesk({
  subsets: ["latin"],
  variable: "--font-heading",
  display: "swap",
});

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

const jetbrainsMono = JetBrains_Mono({
  subsets: ["latin"],
  weight: ["400", "500", "700"],
  variable: "--font-mono",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://ichrak-chahbani.vercel.app"),
  title: "Ichrak Chahbani — Ingénieure en développement web Full-Stack",
  description:
    "Portfolio of Ichrak Chahbani, a full-stack web engineer based in Djerba, Tunisia. React, Next.js, NestJS, MongoDB.",
  openGraph: {
    type: "website",
    title: "Ichrak Chahbani — Ingénieure en développement web Full-Stack",
    description:
      "Full-stack web engineer based in Djerba, Tunisia: React, Next.js, NestJS, MongoDB, AI.",
    images: ["/ichrak.jpg"],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${spaceGrotesk.variable} ${inter.variable} ${jetbrainsMono.variable} antialiased`}>
        <ThemeProvider>
          <LocaleProvider>
            <AmbientBackground />
            <Navbar />
            <main>{children}</main>
            <Footer />
          </LocaleProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
