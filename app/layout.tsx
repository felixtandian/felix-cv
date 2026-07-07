import type { Metadata } from "next";
import { Cinzel, Inter } from "next/font/google";
import MotionProvider from "@/components/MotionProvider";
import "./globals.css";

const cinzel = Cinzel({
  subsets: ["latin"],
  variable: "--font-cinzel",
});

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
});

const description =
  "Felix Tandian — Frontend & Mobile App Developer. Six years of Flutter, Dart, and full-stack development, told as an RPG character sheet.";

export const metadata: Metadata = {
  title: "Felix Tandian — Character Sheet",
  description,
  openGraph: {
    title: "Felix Tandian — Character Sheet",
    description,
    type: "website",
    images: ["/og.png"],
  },
  twitter: {
    card: "summary_large_image",
    title: "Felix Tandian — Character Sheet",
    description,
    images: ["/og.png"],
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`${cinzel.variable} ${inter.variable}`}>
      <body className="bg-sky font-body text-stone-200 antialiased">
        <MotionProvider>{children}</MotionProvider>
      </body>
    </html>
  );
}
