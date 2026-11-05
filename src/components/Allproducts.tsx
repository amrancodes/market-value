
"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useSession } from "@/lib/client";

interface Product {
  id: number;
  slug: string;
  nameBn: string;
  category: string;
  categoryNameBn: string;
  image: string;
  unit: string;
  today: number;
  yesterday: number;
  change: {
    dir: string;
    pct: number;
  };
}

interface AllProductsProps {
  categorySlug?: string;
}

export default function AllProducts({
  categorySlug,
}: AllProductsProps) {
  const router = useRouter();
  const { data: session, isPending } = useSession();

  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  // Fetch All Products
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const res = await fetch(
          "https://api.abcz.workers.dev/api/bazardor/products",
          {
            cache: "no-store",
          }
        );

        if (!res.ok) {
          throw new Error("Failed to fetch products");
        }

        const result = await res.json();

        const productData: Product[] = Array.isArray(result)
          ? result
          : result.data ?? [];

        setProducts(productData);
      } catch {
        setError("পণ্যের তথ্য লোড করা যায়নি। আবার চেষ্টা করুন।");
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  // Filter Products By Category
  const filteredProducts = categorySlug
    ? products.filter(
        (product) => product.category === categorySlug
      )
    : products;

  // Product Card Click
  const handleProductClick = (slug: string) => {
    if (isPending) return;

    if (!session?.user) {
      const callbackURL = `/products/${slug}`;

      router.push(
        `/signin?callbackURL=${encodeURIComponent(callbackURL)}`
      );

      return;
    }

    router.push(`/products/${slug}`);
  };

  // Loading
  if (loading || isPending) {
    return (
      <section className="mx-auto max-w-7xl px-4 py-10">
        <div className="flex min-h-40 items-center justify-center">
          <div className="h-8 w-8 animate-spin rounded-full border-4 border-green-700 border-t-transparent" />
        </div>
      </section>
    );
  }

  // Error
  if (error) {
    return (
      <section className="mx-auto max-w-7xl px-4 py-10 text-center">
        <p className="text-sm text-red-600">{error}</p>
      </section>
    );
  }

  // Category Name
  const categoryName =
    filteredProducts[0]?.categoryNameBn || "ক্যাটাগরির পণ্য";

  return (
    <section className="mx-auto max-w-7xl px-4 py-6">

      {/* Heading */}
      <div className="mb-5 flex items-center justify-between gap-3">

        <h2 className="text-xl font-bold text-gray-800">
          {categorySlug
            ? categoryName
            : "সকল পণ্যের বাজার দর"}
        </h2>

        <span className="shrink-0 rounded-full bg-green-100 px-3 py-1 text-sm font-semibold text-green-700">
          {filteredProducts.length.toLocaleString("bn-BD")} টি পণ্য
        </span>

      </div>

      {/* No Products */}
      {filteredProducts.length === 0 ? (
        <div className="rounded-xl border border-gray-200 bg-gray-50 py-16 text-center">
          <p className="text-gray-500">
            এই ক্যাটাগরিতে কোনো পণ্য পাওয়া যায়নি।
          </p>
        </div>
      ) : (

        /* Product Cards */
        <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-3">

          {filteredProducts.map((product) => {

            const isUp = product.change?.dir === "up";
            const isDown = product.change?.dir === "down";
            const percent = Math.abs(product.change?.pct ?? 0);

            return (
              <button
                key={product.id}
                type="button"
                onClick={() => handleProductClick(product.slug)}
                className="block w-full rounded-xl border border-gray-200 bg-[#f9fbf9] p-3 text-left transition-all hover:-translate-y-1 hover:border-green-300 hover:shadow-md"
              >

                {/* Product Info */}
                <div className="flex items-center gap-3">

                  <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-[#f0f5f0] text-xl">
                    {product.image}
                  </div>

                  <div className="min-w-0 flex-1">

                    <h3 className="truncate text-sm font-bold text-gray-800">
                      {product.nameBn}
                    </h3>

                    <p className="text-xs text-gray-500">
                      প্রতি {product.unit}
                    </p>

                  </div>

                </div>

                {/* Price */}
                <div className="mt-3 flex items-end justify-between gap-2">

                  <div>

                    <p className="text-xs text-gray-500">
                      আজকের দাম
                    </p>

                    <p className="text-base font-bold text-gray-900">
                      {product.today}{" "}
                      <span className="text-xs font-normal">
                        টাকা
                      </span>
                    </p>

                  </div>

                  {/* Price Change */}
                  <span
                    className={`shrink-0 rounded-full px-2 py-1 text-xs font-semibold ${
                      isUp
                        ? "bg-red-50 text-red-600"
                        : isDown
                          ? "bg-green-50 text-green-700"
                          : "bg-gray-100 text-gray-600"
                    }`}
                  >

                    {isUp ? "▲" : isDown ? "▼" : "—"}{" "}

                    {percent.toLocaleString("bn-BD", {
                      maximumFractionDigits: 1,
                    })}

                    %

                  </span>

                </div>

              </button>
            );
          })}

        </div>
      )}

    </section>
  );
}



