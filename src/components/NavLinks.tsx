


"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";

type Category = {
  id: string | number;
  slug: string;
  nameBn: string;
  icon?: string;
};

export default function NavLinks() {
  const [navs, setNavs] = useState<Category[]>([]);
  const [loading, setLoading] = useState(true);
  const pathname = usePathname();

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const res = await fetch(
          "https://openapi.programming-hero.com/api/bazardor/categories"
        );

        if (!res.ok) {
          throw new Error("Failed to fetch categories");
        }

        const data = await res.json();

        const categories = Array.isArray(data)
          ? data
          : Array.isArray(data.data)
            ? data.data
            : [];

        setNavs(categories);
      } catch (error) {
        console.error("Category fetch error:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchCategories();
  }, []);

  return (
    <div className="border-t border-slate-100 bg-slate-50/70">
      <nav className="mx-auto flex max-w-7xl items-center gap-1.5 overflow-x-auto px-4 py-2 text-sm font-semibold">
        
      

        {/* Loading */}
        {loading && (
          <span className="px-3 py-2 text-xs text-gray-500">
            ক্যাটাগরি লোড হচ্ছে...
          </span>
        )}

        {/* Categories */}
        {!loading &&
          navs.map((n) => {
            const isActive = pathname === `/${n.slug}`;

            return (
              <Link
                key={n.id}
                href={`/${n.slug}`}
                aria-current={isActive ? "page" : undefined}
                className={`flex shrink-0 items-center gap-1.5 whitespace-nowrap rounded-full px-3 py-2 transition ${
                  isActive
                    ? "bg-green-700 font-bold text-white shadow-sm"
                    : "text-slate-600 hover:bg-green-50 hover:text-green-700"
                }`}
              >
                <span>{n.icon}</span>
                <span>{n.nameBn}</span>
              </Link>
            );
          })}
      </nav>
    </div>
  );
}
