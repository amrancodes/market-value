

"use client";

import { useState, type FormEvent } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { authClient } from "@/lib/client";
import { FaGithub } from "react-icons/fa";

export default function SignUpPage() {
  const router = useRouter();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [agree, setAgree] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  // Email Signup
  const handleSignUp = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    setError("");
    setSuccess("");

    if (!name.trim()) {
      setError("আপনার নাম লিখুন।");
      return;
    }

    if (password.length < 8) {
      setError("পাসওয়ার্ড কমপক্ষে ৮ অক্ষরের হতে হবে।");
      return;
    }

    if (password !== confirmPassword) {
      setError("দুটি পাসওয়ার্ড মিলছে না।");
      return;
    }

    if (!agree) {
      setError("অ্যাকাউন্ট তৈরি করতে শর্তাবলিতে সম্মতি দাও।");
      return;
    }

    setLoading(true);

    try {
      const { error: signUpError } =
        await authClient.signUp.email({
          name: name.trim(),
          email: email.trim(),
          password,
          callbackURL: "/",
        });

      if (signUpError) {
        setError(
          signUpError.message || "অ্যাকাউন্ট তৈরি করা যায়নি।"
        );
        return;
      }

      setSuccess("অ্যাকাউন্ট তৈরি হয়েছে! হোম পেজে নেওয়া হচ্ছে।");

      router.replace("/");
      router.refresh();

    } catch {
      setError("সমস্যা হয়েছে। আবার চেষ্টা করো।");
    } finally {
      setLoading(false);
    }
  };

  // Google / GitHub Login
  const handleSocialLogin = async (
    provider: "google" | "github"
  ) => {
    setError("");
    setLoading(true);

    try {
      const { error: socialError } =
        await authClient.signIn.social({
          provider,
          callbackURL: "/",
        });

      if (socialError) {
        setError(
          socialError.message || "সোশ্যাল লগইন করা যায়নি।"
        );
        setLoading(false);
      }
    } catch {
      setError(
        "লগইন করা যায়নি। সেটিংস পরীক্ষা করে আবার চেষ্টা করো।"
      );
      setLoading(false);
    }
  };

  return (
    <main className="min-h-screen bg-[#f0f6f1] px-4 py-8 sm:py-12">

      <div className="mx-auto w-full max-w-md">

        {/* Heading */}
        <div className="mb-5 text-center">
          <h1 className="mt-4 text-2xl font-bold text-gray-900">
            অ্যাকাউন্ট তৈরি করুন
          </h1>

          <p className="mt-2 text-sm leading-6 text-gray-500">
            বিনা খরচে সাইন আপ করে সব বিস্তারিত দাম দেখুন।
          </p>
        </div>

        {/* Signup Card */}
        <div className="rounded-xl border border-gray-200 bg-white p-5 shadow-sm sm:p-6">

          <form onSubmit={handleSignUp} className="space-y-4">

            {/* Name */}
            <div>
              <label
                htmlFor="name"
                className="mb-1.5 block text-sm font-medium text-gray-800"
              >
                নাম
              </label>

              <input
                id="name"
                type="text"
                placeholder="যেমন: রহিম উদ্দিন"
                value={name}
                onChange={(e) => setName(e.target.value)}
                autoComplete="name"
                required
                className="w-full rounded-lg border border-gray-200 bg-white px-3 py-2.5 text-sm text-gray-900 outline-none transition focus:border-green-600 focus:ring-2 focus:ring-green-100"
              />
            </div>

            {/* Email */}
            <div>
              <label
                htmlFor="email"
                className="mb-1.5 block text-sm font-medium text-gray-800"
              >
                ইমেইল
              </label>

              <input
                id="email"
                type="email"
                placeholder="you@example.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                autoComplete="email"
                required
                className="w-full rounded-lg border border-gray-200 bg-white px-3 py-2.5 text-sm text-gray-900 outline-none transition focus:border-green-600 focus:ring-2 focus:ring-green-100"
              />
            </div>

            {/* Password */}
            <div>
              <label
                htmlFor="password"
                className="mb-1.5 block text-sm font-medium text-gray-800"
              >
                পাসওয়ার্ড
              </label>

              <input
                id="password"
                type="password"
                placeholder="কমপক্ষে ৮ অক্ষর"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                autoComplete="new-password"
                minLength={8}
                required
                className="w-full rounded-lg border border-gray-200 bg-white px-3 py-2.5 text-sm text-gray-900 outline-none transition focus:border-green-600 focus:ring-2 focus:ring-green-100"
              />
            </div>

            {/* Confirm Password */}
            <div>
              <label
                htmlFor="confirmPassword"
                className="mb-1.5 block text-sm font-medium text-gray-800"
              >
                পাসওয়ার্ড নিশ্চিত করুন
              </label>

              <input
                id="confirmPassword"
                type="password"
                placeholder="আবার লিখুন"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                autoComplete="new-password"
                required
                className="w-full rounded-lg border border-gray-200 bg-white px-3 py-2.5 text-sm text-gray-900 outline-none transition focus:border-green-600 focus:ring-2 focus:ring-green-100"
              />
            </div>

            {/* Terms */}
            <label className="flex cursor-pointer items-start gap-2 text-sm text-gray-600">
              <input
                type="checkbox"
                checked={agree}
                onChange={(e) => setAgree(e.target.checked)}
                className="mt-1 accent-green-700"
              />

              <span>
                আমি শর্তাবলি ও গোপনীয়তা নীতিতে সম্মত।
              </span>
            </label>

            {/* Error */}
            {error && (
              <p
                role="alert"
                className="rounded-lg bg-red-50 px-3 py-2 text-sm text-red-600"
              >
                {error}
              </p>
            )}

            {/* Success */}
            {success && (
              <p
                role="status"
                className="rounded-lg bg-green-50 px-3 py-2 text-sm text-green-700"
              >
                {success}
              </p>
            )}

            {/* Submit */}
            <button
              type="submit"
              disabled={loading}
              className="w-full rounded-lg bg-green-700 px-4 py-3 text-sm font-semibold text-white shadow-sm transition hover:bg-green-800 disabled:cursor-not-allowed disabled:opacity-60"
            >
              {loading
                ? "অ্যাকাউন্ট তৈরি হচ্ছে..."
                : "অ্যাকাউন্ট তৈরি করুন"}
            </button>

          </form>

          {/* Divider */}
          <div className="my-4 flex items-center gap-3">
            <div className="h-px flex-1 bg-gray-200" />

            <span className="text-xs text-gray-500">
              অথবা
            </span>

            <div className="h-px flex-1 bg-gray-200" />
          </div>

          {/* Social Login */}
          <div className="grid grid-cols-1 gap-2 sm:grid-cols-2">

            {/* Google */}
            <button
              type="button"
              onClick={() => handleSocialLogin("google")}
              disabled={loading}
              className="flex items-center justify-center gap-2 rounded-lg border border-gray-200 px-2 py-2.5 text-xs font-medium text-gray-800 transition hover:bg-gray-50 disabled:opacity-60"
            >
              <span className="text-base font-bold text-red-500">
                G
              </span>

              Google দিয়ে চালিয়ে যান
            </button>

            {/* GitHub */}
            <button
              type="button"
              onClick={() => handleSocialLogin("github")}
              disabled={loading}
              className="flex items-center justify-center gap-2 rounded-lg border border-gray-200 px-2 py-2.5 text-xs font-medium text-gray-800 transition hover:bg-gray-50 disabled:opacity-60"
            >
              <FaGithub size={20} />

              GitHub দিয়ে চালিয়ে যান
            </button>

          </div>

          {/* Sign In Link */}
          <p className="mt-5 text-center text-sm text-gray-600">
            অ্যাকাউন্ট আছে?{" "}

            <Link
              href="/signin"
              className="font-medium text-green-700 hover:underline"
            >
              সাইন ইন করুন
            </Link>
          </p>

        </div>

        {/* Back to Home */}
        <div className="mt-5 text-center">
          <Link
            href="/"
            className="text-sm text-gray-500 transition hover:text-green-700"
          >
            ← হোম পেজে ফিরে যান
          </Link>
        </div>

      </div>
    </main>
  );
}


