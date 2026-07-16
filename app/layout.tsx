import type { Metadata } from "next";
import { Hanken_Grotesk, Inter } from "next/font/google";
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
      className={`${hankenGrotesk.variable} ${inter.variable} h-full antialiased`}
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
