
import type { Metadata } from "next";
import { Hind_Siliguri } from "next/font/google";
import "./globals.css";

import Header from "@/components/Header";
import { Toaster } from "react-hot-toast";

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
        <Header />

        <main className="flex-1">
          {children}
        </main>

        <footer className="mt-auto">
          <div className="flex flex-col md:flex-row py-4 px-4 gap-3 md:gap-5 justify-between text-center">
            <h1>বাজার দর — প্রয়োজনীয় পণ্যের দাম এক নজরে।</h1>
            <p>
              সকল দাম সম্ভাব্য; বাজার অবস্থার ওপর নির্ভর করে পরিবর্তিত হয়।
            </p>
          </div>
        </footer>

        <Toaster position="top-center" />
      </body>
    </html>
  );
}

