import type { Metadata } from "next";
import { Outfit } from "next/font/google";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import PwaRegister from "@/components/PwaRegister";
import "./globals.css";

const outfit = Outfit({
  variable: "--font-outfit",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Lentera Sukahaji | KKN 55 Sukahaji",
  description: "Website portal dan sistem absensi KKN 55 Sukahaji",
  manifest: "/manifest.json",
  icons: {
    icon: "/images/logo/LOGO KKN SISDAMAS 55(1).png"
  }
};

export const viewport = {
  themeColor: "#4d7c0f",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="id"
      className={`${outfit.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col pt-0 md:pt-16 pb-16 md:pb-0">
        <PwaRegister />
        <Navbar />
        <main className="flex-grow flex flex-col">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
