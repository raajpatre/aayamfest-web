import type { ReactNode } from "react";
import type { Metadata } from "next";
import "./globals.css";
import { AppFrame } from "@/components/layout/AppFrame";

export const metadata: Metadata = {
  title: "Aayam-Tech Fest",
  description: "Modern futuristic college fest website."
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
      </body>
    </html>
  );
}
