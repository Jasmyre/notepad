import "@/styles/globals.css";

import { Analytics } from "@vercel/analytics/next";
import type { Metadata } from "next";
import { Geist } from "next/font/google";
import { ThemeProvider } from "@/components/theme-provider";
import { TRPCReactProvider } from "@/trpc/react";

export const metadata: Metadata = {
  title: "Notepad App",
  description:
    "A fast and simple notepad app built with Next.js and TypeScript. Create, edit, and delete notes using your browser's local storage.",
  icons: [{ rel: "icon", url: "/favicon.ico" }],
  category: "productivity",
  creator: "Jasmyre Andrei Lanuza",
  keywords: [
    "notepad app",
    "notes",
    "local storage notes",
    "crud notes app",
    "nextjs notepad",
    "simple note taking",
  ],
  openGraph: {
    type: "website",
    url: "https://notepad-tau.vercel.app",
    title: "Simple Notepad App",
    description:
      "Take quick notes with this lightweight Next.js notepad that stores everything in your browser using local storage.",
    siteName: "Notepad app",
    images: [
      {
        url: "/og-notepad.png",
        width: 1200,
        height: 630,
        alt: "Simple Notepad App Preview",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Simple Notepad App",
    description:
      "A clean and fast Next.js notepad that uses local storage for CRUD notes.",
    images: ["/og-notepad.png"],
  },
};

const geist = Geist({
  subsets: ["latin"],
  variable: "--font-geist-sans",
});

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html className={`${geist.variable}`} lang="en" suppressHydrationWarning>
      <body>
        <TRPCReactProvider>
          <ThemeProvider
            attribute="class"
            defaultTheme="system"
            disableTransitionOnChange
            enableSystem
          >
            {children}
          </ThemeProvider>
        </TRPCReactProvider>
        <Analytics />
      </body>
    </html>
  );
}
