import type { Metadata } from "next";
import {
  Great_Vibes,
  Hanken_Grotesk,
  Inter,
  Noto_Sans_Arabic,
  Noto_Sans_JP,
  Noto_Sans_SC,
} from "next/font/google";
import { cssVariables } from "@/lib/theme";
import "./globals.css";

const hankenGrotesk = Hanken_Grotesk({
  variable: "--font-hanken-grotesk",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800", "900"],
});

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800", "900"],
});

const notoSc = Noto_Sans_SC({
  variable: "--font-noto-sc",
  subsets: ["latin"],
  weight: ["700"],
});

const notoJp = Noto_Sans_JP({
  variable: "--font-noto-jp",
  subsets: ["latin"],
  weight: ["700"],
});

const notoAr = Noto_Sans_Arabic({
  variable: "--font-noto-ar",
  subsets: ["arabic"],
  weight: ["700"],
});

const script = Great_Vibes({
  variable: "--font-script",
  subsets: ["latin"],
  weight: "400",
});

export const metadata: Metadata = {
  title: "Subodh Rijal - MERN Developer Portfolio",
  description:
    "MERN Developer portfolio — architecting robust, scalable, and user-centric web applications.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${hankenGrotesk.variable} ${inter.variable} ${notoSc.variable} ${notoJp.variable} ${notoAr.variable} ${script.variable} h-full antialiased`}
      style={cssVariables}
    >
      <body
        className="min-h-full overflow-x-hidden bg-white"
        suppressHydrationWarning
      >
        {children}
      </body>
    </html>
  );
}
