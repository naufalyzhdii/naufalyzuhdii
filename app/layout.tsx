import type { Metadata } from "next";
import { Space_Grotesk, Inter, IBM_Plex_Mono } from "next/font/google";
import "./globals.css";

const display = Space_Grotesk({ subsets: ["latin"], variable: "--f-display", weight: ["500", "600"], fallback: ["Arial", "sans-serif"] });
const body = Inter({ subsets: ["latin"], variable: "--f-body", fallback: ["Arial", "sans-serif"] });
const mono = IBM_Plex_Mono({ subsets: ["latin"], variable: "--f-mono", weight: ["400", "500"], fallback: ["monospace"] });

export const metadata: Metadata = {
  title: "Naufaly Zuhdi Indriandi — Solutions Engineer & Technical Consultant",
  description: "Solutions Engineer & Technical Consultant helping businesses design, build, and automate practical software and AI systems.",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${display.variable} ${body.variable} ${mono.variable}`}>
      <body>{children}</body>
    </html>
  );
}
