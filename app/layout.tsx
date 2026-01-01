import "./globals.css";
import type { Metadata } from "next";
import { Inter, Playfair_Display } from "next/font/google";
import { Suspense } from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import FooterWrapper from "@/components/FooterWrapper";

const inter = Inter({ subsets: ["latin"], variable: "--font-inter" });
const playfair = Playfair_Display({ subsets: ["latin"], variable: "--font-playfair" });

export const metadata: Metadata = {
  title: "Selam Lawyer | Trusted Legal Counsel",
  description: "Professional law office offering trusted legal services with integrity and dedication.",
  keywords: [
    "Lawyer",
    "Attorney",
    "Legal Services",
    "Selam Lawyer",
    "Ethiopian Law",
    "Justice"
  ],
  robots: {
    index: true,
    follow: true,
  },
  openGraph: {
    title: "Selam Lawyer",
    description: "Professional law office offering trusted legal services.",
    url: "https://selam-lawyer.com",
    siteName: "Selam Lawyer",
    type: "website",
    images: [{ url: '/assets/logo.png', width: 800, height: 600, alt: 'Selam Lawyer Logo' }],
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${inter.variable} ${playfair.variable}`}>
      <body className="font-sans antialiased text-gray-900 bg-gray-50 flex flex-col min-h-screen">
        <Suspense fallback={<div className="h-20 bg-white/80 border-b border-gray-200" />}>
          <Navbar />
        </Suspense>
        <main className="flex-grow">
          {children}
        </main>
        <FooterWrapper>
          <Footer />
        </FooterWrapper>
      </body>
    </html>
  );
}
