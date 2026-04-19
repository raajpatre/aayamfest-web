import type { ReactNode } from "react";
import type { Metadata } from "next";
import { Analytics } from "@vercel/analytics/react";
import "./globals.css";
import { AppFrame } from "@/components/layout/AppFrame";

export const metadata: Metadata = {
  title: {
    default: "Aayam 2026 | National Tech Fest | Newton School of Technology, Bengaluru",
    template: "%s | Aayam 2026",
  },
  description:
    "Aayam 2026 is NST's flagship national tech fest on 25–26 April in Bengaluru. 13+ competitions across Robotics, Hackathons, Gaming & more. ₹4,00,000+ prize pool. Register now.",
  keywords: [
    "Aayam 2026",
    "tech fest Bengaluru",
    "national tech fest India",
    "Newton School of Technology fest",
    "robotics competition Bengaluru",
    "hackathon Bengaluru 2026",
    "college tech fest 2026",
    "NST tech fest",
  ],
  openGraph: {
    title: "Aayam 2026 | National Tech Fest | Newton School of Technology",
    description:
      "13+ competitions. ₹4,00,000+ prize pool. 25–26 April, Bengaluru. Step Beyond the Known.",
    url: "https://aayamfest.com",
    siteName: "Aayam 2026",
    images: [
      {
        url: "https://aayamfest.com/aayam-logo.png",
        width: 1200,
        height: 630,
        alt: "Aayam 2026 - National Tech Fest by Newton School of Technology, Bengaluru",
      },
    ],
    locale: "en_IN",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Aayam 2026 | National Tech Fest",
    description:
      "13+ competitions. ₹4,00,000+ prize pool. 25–26 April, Bengaluru.",
    images: ["https://aayamfest.com/aayam-logo.png"],
    site: "@aayamfest",
  },
  metadataBase: new URL("https://aayamfest.com"),
};

export default function RootLayout({
  children
}: Readonly<{
  children: ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="font-sans antialiased">
        <AppFrame>{children}</AppFrame>
        <Analytics />
      </body>
    </html>
  );
}
