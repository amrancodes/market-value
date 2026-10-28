
import type { Metadata } from "next";
import { Hind_Siliguri } from "next/font/google";
import "./globals.css";

import Header from "@/components/Header";
import { Toaster } from "react-hot-toast";
import Marquee from "@/components/Marquee";
import { Suspense } from 'react';
import Footer from "@/components/Footer";


const font = Hind_Siliguri({
  subsets: ["bengali", "latin"],
  weight: ["400", "500", "600", "700"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "বাজার দর | দৈনিক বাজার মূল্য",
  description:
    "বাংলাদেশের প্রয়োজনীয় পণ্যের দৈনিক বাজার দর এক নজরে দেখুন।",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="bn" data-theme="light">
      <body className={`${font.className} min-h-screen flex flex-col antialiased`}>
       <Suspense fallback={<p>loading..</p>}>
        <Header />
        </Suspense>
        <Marquee/>
        <main className="flex-1">
          {children}
        </main>
       
        <Footer/>

        <Toaster position="top-center" />
      </body>
    </html>
  );
}

