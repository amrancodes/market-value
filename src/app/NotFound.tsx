
"use client";

import Link from "next/link";

export default function NotFound() {
  return (
    <main className="flex min-h-[70vh] items-center justify-center bg-[#f0f5f1] px-4 py-12">
      <div className="w-full max-w-md rounded-2xl border border-green-100 bg-white p-8 text-center shadow-sm">

        <div className="mb-4 text-7xl font-extrabold text-green-600">
          404
        </div>

        <h1 className="mb-3 text-2xl font-bold text-gray-800">
          পেজটি খুঁজে পাওয়া যায়নি!
        </h1>

        <p className="mb-7 text-sm leading-6 text-gray-500">
          দুঃখিত! আপনি যে পেজটি খুঁজছেন সেটি পাওয়া যাচ্ছে না।
          URL টি ভুল হতে পারে অথবা পেজটি সরিয়ে ফেলা হয়েছে।
        </p>

        <Link
          href="/"
          className="inline-flex items-center justify-center rounded-xl bg-green-600 px-6 py-3 text-sm font-bold text-white transition hover:bg-green-700"
        >
          ← হোম পেজে ফিরে যান
        </Link>

      </div>
    </main>
  );
}
