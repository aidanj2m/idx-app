import type { Metadata } from "next";
import { DM_Sans, Playfair_Display } from "next/font/google";
import { Navbar } from "@/components/layout/Navbar";
import "./globals.css";

const dmSans = DM_Sans({
  variable: "--font-dm-sans",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
});

const playfair = Playfair_Display({
  variable: "--font-playfair",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

export const metadata: Metadata = {
  title: "TexasHomes.com - Where Texas Comes to Buy Homes",
  description: "Find your dream home in Texas. Search thousands of listings with advanced filters.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${dmSans.variable} ${playfair.variable} antialiased`}
      >
        <Navbar />
        {children}
      </body>
    </html>
  );
}
