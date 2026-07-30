import type { Metadata } from "next";
import { DM_Serif_Display, Inter } from "next/font/google";
import "./globals.css";

const dmSerif = DM_Serif_Display({
  subsets: ["latin"],
  weight: "400",
  variable: "--font-dm-serif",
});

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
});

export const metadata: Metadata = {
  title: "AfriSphere AI — Ancient Cultures. Modern Intelligence.",
  description:
    "Meet Zuri, your local African friend powered by AI. Discover authentic travel experiences across Africa.",
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <body className={`${dmSerif.variable} ${inter.variable} font-sans bg-warmwhite`}>
        {children}
      </body>
    </html>
  );
}
