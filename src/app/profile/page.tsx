
"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useSession, authClient } from "@/lib/client";
import { LogOut, Pencil, UserRound } from "lucide-react";

export default function ProfilePage() {
  const router = useRouter();
  const { data: session, isPending } = useSession();
  const user = session?.user;

  const [name, setName] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleUpdate = async () => {
    if (!name.trim()) {
      setError("নাম লিখুন।");
      return;
    }

    setError("");
    setLoading(true);

    try {
      const { error: updateError } = await authClient.updateUser({
        name: name.trim(),
      });

      if (updateError) {
        setError(updateError.message || "নাম আপডেট করা যায়নি।");
      } else {
        setName("");
        router.refresh();
      }
    } catch {
      setError("সমস্যা হয়েছে। আবার চেষ্টা করুন।");
    } finally {
      setLoading(false);
    }
  };

  const handleSignOut = async () => {
    try {
      await authClient.signOut();
      router.push("/signin");
      router.refresh();
    } catch {
      setError("সাইন আউট করা যায়নি। আবার চেষ্টা করুন।");
    }
  };

  if (isPending) {
    return (
      <div className="flex min-h-[60vh] items-center justify-center bg-[#f0f6f1]">
        <div className="h-8 w-8 animate-spin rounded-full border-4 border-green-700 border-t-transparent" />
      </div>
    );
  }

  if (!user) {
    return (
      <main className="flex min-h-[60vh] items-center justify-center bg-[#f0f6f1] px-4">
        <div className="w-full max-w-md rounded-xl border border-gray-200 bg-white p-6 text-center">
          <UserRound className="mx-auto mb-3 text-green-700" size={36} />

          <h1 className="text-xl font-bold text-gray-900">
            প্রোফাইল দেখতে সাইন ইন করুন
          </h1>

          <p className="mt-2 text-sm text-gray-500">
            আপনার অ্যাকাউন্টের তথ্য দেখতে লগইন করতে হবে।
          </p>

          <Link
            href="/signin"
            className="mt-5 inline-flex rounded-lg bg-green-700 px-6 py-2.5 text-sm font-semibold text-white hover:bg-green-800"
          >
            সাইন ইন করুন
          </Link>
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-[calc(100vh-160px)] bg-[#f0f6f1] px-4 py-8 sm:py-10">
      <div className="mx-auto w-full max-w-3xl">
        {/* Heading */}
        <div className="mb-5">
          <h1 className="text-2xl font-bold text-gray-900">
            আমার প্রোফাইল
          </h1>

          <p className="mt-1 text-sm text-gray-500">
            আপনার অ্যাকাউন্টের তথ্য এখানে দেখুন।
          </p>
        </div>

        {/* User Information Card */}
        <section className="rounded-xl border border-gray-200 bg-white p-4 sm:p-5">
          <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
            <div className="flex min-w-0 items-center gap-3">
              {user.image ? (
                <img
                  src={user.image}
                  alt="Profile"
                  className="h-12 w-12 shrink-0 rounded-xl object-cover"
                />
              ) : (
                <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-green-100 text-green-800">
                  <UserRound size={26} />
                </div>
              )}

              <div className="min-w-0">
                <h2 className="truncate font-semibold text-gray-800">
                  {user.name || "ব্যবহারকারী"}
                </h2>

                <p className="truncate text-sm text-gray-500">
                  {user.email}
                </p>
              </div>
            </div>

            <button
              type="button"
              onClick={handleSignOut}
              className="inline-flex shrink-0 items-center justify-center gap-2 rounded-lg border border-red-400 px-3 py-2 text-sm font-medium text-red-600 transition hover:bg-red-50"
            >
              <LogOut size={16} />
              সাইন আউট
            </button>
          </div>
        </section>

        {/* Update Information Card */}
        <section className="mt-4 rounded-xl border border-gray-200 bg-white p-5 sm:p-6">
          <h2 className="mb-6 text-base font-semibold text-gray-800">
            তথ্য
          </h2>

          <div>
            <label
              htmlFor="name"
              className="mb-2 block text-sm font-medium text-gray-700"
            >
              নাম
            </label>

            <input
              id="name"
              type="text"
              placeholder={user.name || "আপনার নাম লিখুন"}
              value={name}
              onChange={(e) => {
                setName(e.target.value);
                setError("");
              }}
              className="w-full rounded-lg border border-gray-200 px-3 py-2.5 text-sm text-gray-800 outline-none transition focus:border-green-600 focus:ring-2 focus:ring-green-100"
            />

            {error && (
              <p className="mt-2 text-sm text-red-600" role="alert">
                {error}
              </p>
            )}

            <button
              type="button"
              onClick={handleUpdate}
              disabled={loading}
              className="mt-3 flex w-full items-center justify-center gap-2 rounded-lg bg-green-700 px-4 py-2.5 text-sm font-semibold text-white shadow-sm transition hover:bg-green-800 disabled:cursor-not-allowed disabled:opacity-60"
            >
              <Pencil size={15} />
              {loading ? "আপডেট হচ্ছে..." : "আপডেট"}
            </button>
          </div>
        </section>
      </div>
    </main>
  );
}