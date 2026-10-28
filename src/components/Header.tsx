
"use client";


import NavLinks from "./NavLinks";
import { useState } from "react";
import Image from "next/image";
import Link from "next/link";

import { useSession, signOut } from "@/lib/client";

const Header = () => {
  const [dropdownOpen, setDropdownOpen] = useState(false);

  const { data: session, isPending } = useSession();
  const user = session?.user;

  const date = new Date().toLocaleDateString("bn-BD", {
    dateStyle: "full",
  });

  const handleSignOut = async () => {
    try {
      await signOut();
      setDropdownOpen(false);
    } catch (error) {
      console.error("Sign out failed:", error);
    }
  };

  return (
    <>
      <header className="w-full bg-white">
        <div className="mx-auto max-w-7xl px-4 py-6">
          <div className="flex items-center justify-between gap-4">
            {/* Logo and Date */}
            <Link
              href="/"
              className="flex items-center gap-3 shrink-0"
            >
              <Image
                src="/logo-icon.png"
                alt="বাজার দর Logo"
                width={40}
                height={40}
                className="h-10 w-10 rounded-lg bg-green-800"
                priority
              />

              <div className="flex flex-col">
                <span className="font-bold text-slate-900">
                  বাজার দর
                </span>
                <span className="text-xs text-slate-500">
                  {date}
                </span>
              </div>
            </Link>

            {/* User Menu / Login Buttons */}
            <div className="flex items-center gap-3 shrink-0">
            
              {user ? (
                <div className="relative">
                  <button
                    type="button"
                    onClick={() =>
                      setDropdownOpen((prev) => !prev)
                    }
                    className="flex items-center gap-2.5 rounded-full border border-slate-200 bg-slate-50 p-1 pr-3 transition-all hover:bg-slate-100"
                    id="user-menu-button"
                    aria-expanded={dropdownOpen}
                    aria-haspopup="true"
                  >
                    <div className="flex h-8 w-8 items-center justify-center overflow-hidden rounded-full bg-gradient-to-tr from-teal-500 to-indigo-600 text-xs font-black text-white ring-2 ring-teal-500 ring-offset-1">
                      {user.image ? (
                        <img
                          src={user.image}
                          alt="User"
                          className="h-full w-full object-cover"
                        />
                      ) : (
                        <span>
                          {user.name?.charAt(0) || "U"}
                        </span>
                      )}
                    </div>

                    <div className="hidden flex-col text-left sm:flex">
                      <span className="text-xs font-bold leading-tight text-slate-800">
                        {user.name}
                      </span>
                      <span className="text-[10px] font-semibold text-teal-600">
                        ভেরিফাইড ইউজার ▼
                      </span>
                    </div>
                  </button>

                  {/* Dropdown Menu */}
                  {dropdownOpen && (
                    <>
                      <button
                        type="button"
                        aria-label="Close dropdown"
                        className="fixed inset-0 z-40 cursor-default"
                        onClick={() => setDropdownOpen(false)}
                      />

                      <div className="absolute right-0 z-50 mt-2 w-60 rounded-2xl border border-slate-200 bg-white py-2 text-xs shadow-xl">
                        <div className="border-b border-slate-100 bg-slate-50/50 px-4 py-2.5">
                          <p className="truncate font-bold text-slate-900">
                            {user.name}
                          </p>
                          <p className="truncate text-[11px] text-slate-500">
                            {user.email}
                          </p>
                        </div>

                        <Link
                          href="/profile"
                          onClick={() => setDropdownOpen(false)}
                          className="flex items-center gap-2 px-4 py-2.5 font-semibold text-slate-700 transition-colors hover:bg-teal-50 hover:text-teal-700"
                        >
                          <span>👤</span>
                          প্রোফাইল ড্যাশবোর্ড
                        </Link>

                        <Link
                          href="/profile/update"
                          onClick={() => setDropdownOpen(false)}
                          className="flex items-center gap-2 px-4 py-2.5 font-semibold text-slate-700 transition-colors hover:bg-teal-50 hover:text-teal-700"
                        >
                          <span>✏️</span>
                          তথ্য পরিবর্তন করুন
                        </Link>

                        <div className="my-1 border-t border-slate-100" />

                        <button
                          type="button"
                          onClick={handleSignOut}
                          className="flex w-full items-center gap-2 px-4 py-2.5 text-left font-semibold text-rose-600 transition-colors hover:bg-rose-50"
                        >
                          <span>🚪</span>
                          সাইন আউট
                        </button>
                      </div>
                    </>
                  )}
                </div>
              ) : (
                <div className="flex items-center gap-2">
                  <Link
                    href="/signin"
                    className="rounded-xl px-3 py-2 text-xs font-bold text-slate-700 transition-colors hover:bg-slate-100 hover:text-teal-700"
                  >
                    সাইন ইন
                  </Link>

                  <Link
                    href="/signup"
                    className="rounded-xl bg-green-600 px-4 py-2 text-xs font-bold text-white shadow-sm transition-colors hover:bg-teal-700"
                  >
                    সাইন আপ
                  </Link>
                </div>
              )}
            </div>
          </div>

          {/* Category Navigation */}
          <NavLinks />
        </div>
      </header>
    </>
  );
};

export default Header;
