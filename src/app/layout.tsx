import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { Toaster } from "@/components/ui/toaster";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Global Trade OS — Connected. Verified. Intelligent.",
  description:
    "Global Trade OS is the operating system for international trade. Discover verified partners, negotiate cross-border deals, manage representatives and commissions, and execute trade through one intelligent platform.",
  keywords: [
    "Global Trade",
    "B2B Marketplace",
    "Sourcing",
    "RFQ",
    "Trade Representatives",
    "Commission Management",
    "Trade Intelligence",
    "Supply Chain",
  ],
  authors: [{ name: "Global Trade OS" }],
  icons: {
    icon: "/logo.svg",
  },
  openGraph: {
    title: "Global Trade OS",
    description: "The operating system for international trade — connected, verified, intelligent.",
    siteName: "Global Trade OS",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning className="dark">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased bg-background text-foreground min-h-screen`}
      >
        {children}
        <Toaster />
      </body>
    </html>
  );
}
