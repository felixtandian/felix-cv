import type { Metadata } from "next";
import { Press_Start_2P, DotGothic16 } from "next/font/google";
import MotionProvider from "@/components/MotionProvider";
import "./globals.css";

const pixel = Press_Start_2P({
  weight: "400",
  subsets: ["latin"],
  variable: "--font-pixel",
});

const dot = DotGothic16({
  weight: "400",
  subsets: ["latin"],
  variable: "--font-dot",
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
    <html lang="en" className={`${pixel.variable} ${dot.variable}`}>
      <body className="bg-sky font-body text-stone-200 antialiased">
        <MotionProvider>{children}</MotionProvider>
      </body>
    </html>
  );
}
