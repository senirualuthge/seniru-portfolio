import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Nav from "@/components/navigation/Nav";
import Cursor from "@/components/interactive/Cursor";
import CommandPalette from "@/components/interactive/CommandPalette";
import DevConsole from "@/components/console/DevConsole";
import AccessibilityPrefs from "@/components/accessibility/AccessibilityPrefs";
import Welcome from "@/components/welcome/Welcome";
import { SITE_URL } from "@/lib/site";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: "Seniru Aluthge — Developer & AI Systems Builder",
  description:
    "Portfolio of Seniru Aluthge, undergraduate developer in Sri Lanka. I learn by building real things — an agreement management SaaS platform and Aariya, a multi-surface AI companion with real-time voice interaction.",
  keywords: [
    "Seniru Aluthge",
    "developer portfolio",
    "full-stack developer",
    "AI systems",
    "Sri Lanka",
  ],
  openGraph: {
    title: "Seniru Aluthge — Building Software + AI Systems",
    description:
      "Undergraduate developer. I learn by building real things — full-stack platforms and AI systems.",
    type: "website",
    url: SITE_URL,
    siteName: "Seniru Aluthge",
  },
  twitter: {
    card: "summary",
    title: "Seniru Aluthge — Developer & AI Systems Builder",
    description:
      "Undergraduate developer exploring full-stack development, AI systems, and real-world software projects.",
  },
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col bg-ink text-primary">
        <Nav />
        {children}
        <CommandPalette />
        <Cursor />
        <DevConsole />
        <AccessibilityPrefs />
        <Welcome />
      </body>
    </html>
  );
}
