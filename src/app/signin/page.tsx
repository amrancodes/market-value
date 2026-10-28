
"use client";

import { useState, type FormEvent } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { authClient } from "@/lib/client";

export default function SignInPage() {
  const router = useRouter();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSignIn = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      const { data, error: signInError } =
        await authClient.signIn.email({
          email,
          password,
          callbackURL: "/",
        });

      if (signInError) {
        setError(signInError.message || "ইমেইল বা পাসওয়ার্ড সঠিক নয়।");
        return;
      }

      if (data) {
        router.push("/");
        router.refresh();
      }
    } catch {
      setError("সাইন ইন করা যায়নি। আবার চেষ্টা করো।");
    } finally {
      setLoading(false);
    }
  };

  const handleSocialSignIn = async (
    provider: "google" | "github"
  ) => {
    setError("");

    try {
      await authClient.signIn.social({
        provider,
        callbackURL: "/",
      });
    } catch {
      setError("সোশ্যাল অ্যাকাউন্ট দিয়ে সাইন ইন করা যায়নি।");
    }
  };

  return (
    <main className="min-h-screen bg-[#f0f5f0] px-4 py-8">
      <div className="mx-auto w-full max-w-[350px]">
        <header className="mb-5 text-center">
          <h1 className="text-xl font-bold text-[#26352b]">
            সাইন ইন
          </h1>

          <p className="mt-1 text-[11px] leading-5 text-gray-500">
            বিস্তারিত দামে, বাজার তুলনা ও মোবাইল দেখতে অ্যাকাউন্টে
            ঢুকুন।
          </p>
        </header>

        <section className="rounded-xl border border-[#e0e8e0] bg-white/80 p-4 sm:p-5">
          <form onSubmit={handleSignIn} className="space-y-3">
            <div>
              <label
                htmlFor="email"
                className="mb-1 block text-[11px] font-medium text-gray-700"
              >
                ইমেইল
              </label>

              <input
                id="email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="you@example.com"
                autoComplete="email"
                required
                className="h-8 w-full rounded-md border border-[#e0e8e0] bg-transparent px-2 text-[11px] outline-none transition focus:border-green-600 focus:ring-1 focus:ring-green-100"
              />
            </div>

            <div>
              <label
                htmlFor="password"
                className="mb-1 block text-[11px] font-medium text-gray-700"
              >
                পাসওয়ার্ড
              </label>

              <input
                id="password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="কমপক্ষে ৮ অক্ষর"
                autoComplete="current-password"
                required
                className="h-8 w-full rounded-md border border-[#e0e8e0] bg-transparent px-2 text-[11px] outline-none transition focus:border-green-600 focus:ring-1 focus:ring-green-100"
              />
            </div>

            {error && (
              <p
                role="alert"
                className="rounded-md bg-red-50 p-2 text-[11px] text-red-600"
              >
                {error}
              </p>
            )}

            <button
              type="submit"
              disabled={loading}
              className="h-[30px] w-full rounded-md bg-[#078b43] text-xs font-semibold text-white shadow-sm transition hover:bg-[#067638] disabled:opacity-60"
            >
              {loading ? "সাইন ইন হচ্ছে..." : "সাইন ইন"}
            </button>
          </form>

          <div className="my-3 flex items-center gap-3">
            <div className="h-px flex-1 bg-gray-200" />
            <span className="text-[10px] text-gray-500">অথবা</span>
            <div className="h-px flex-1 bg-gray-200" />
          </div>

          <div className="grid grid-cols-2 gap-2">
            <button
              type="button"
              onClick={() => handleSocialSignIn("google")}
              className="flex h-8 items-center justify-center gap-1 rounded-md border border-[#e0e8e0] px-1 text-[10px] font-medium text-gray-700 hover:bg-gray-50"
            >
              <span className="font-bold text-blue-600">G</span>
              Google দিয়ে লগইন
            </button>

            <button
              type="button"
              onClick={() => handleSocialSignIn("github")}
              className="flex h-8 items-center justify-center gap-1 rounded-md border border-[#e0e8e0] px-1 text-[10px] font-medium text-gray-700 hover:bg-gray-50"
            >
              <svg
                viewBox="0 0 24 24"
                className="h-3 w-3 fill-current"
                aria-hidden="true"
              >
                <path d="M12 .9a11.1 11.1 0 0 0-3.51 21.63c.56.1.76-.24.76-.54v-2.1c-3.1.67-3.76-1.32-3.76-1.32-.5-1.28-1.23-1.62-1.23-1.62-1.01-.69.08-.68.08-.68 1.12.08 1.7 1.15 1.7 1.15.99 1.69 2.59 1.2 3.22.92.1-.72.39-1.2.7-1.48-2.48-.28-5.08-1.24-5.08-5.51 0-1.22.44-2.21 1.15-2.99-.12-.28-.5-1.42.11-2.96 0 0 .94-.3 3.05 1.14a10.6 10.6 0 0 1 5.55 0c2.11-1.44 3.05-1.14 3.05-1.14.61 1.54.23 2.68.11 2.96.72.78 1.15 1.77 1.15 2.99 0 4.28-2.6 5.22-5.09 5.5.4.35.75 1.02.75 2.06v3.08c0 .3.2.65.77.54A11.1 11.1 0 0 0 12 .9Z" />
              </svg>
              GitHub দিয়ে লগইন
            </button>
          </div>

          <p className="mt-3 text-center text-[10px] text-gray-600">
            অ্যাকাউন্ট নেই?{" "}
            <Link
              href="/signup"
              className="font-semibold text-green-700 hover:underline"
            >
              সাইন আপ করুন
            </Link>
          </p>
        </section>
      </div>
    </main>
  );
}
