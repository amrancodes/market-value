

"use client";

import React, { useEffect, useState } from "react";

interface Product {
  id: number;
  slug: string;
  nameBn: string;
  unit: string;
  image: string;
  today: number;
  yesterday: number;
  change: {
    dir: "up" | "down" | "flat";
    pct: number;
  };
}

const DamBarce = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await fetch(
          "https://api.abcz.workers.dev/api/bazardor/products"
        );

        if (!response.ok) {
          throw new Error("পণ্যের তথ্য লোড করা যায়নি");
        }

        const data: Product[] = await response.json();
        setProducts(data);
      } catch (err) {
        setError(
          err instanceof Error ? err.message : "একটি সমস্যা হয়েছে"
        );
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  if (loading) {
    return (
      <section className="mx-auto max-w-7xl px-4 py-5">
        <p className="text-sm text-gray-500">
          বাজারদরের তথ্য লোড হচ্ছে...
        </p>
      </section>
    );
  }

  if (error) {
    return (
      <section className="mx-auto max-w-7xl px-4 py-5">
        <p className="text-sm text-red-600">{error}</p>
      </section>
    );
  }

  
  const risingProducts = products
  .filter((product) => product.change.dir === "up")
  .slice(0, 6);

  return (
    <section className="mx-auto max-w-7xl bg-[#f0f5f1] px-4 py-5">
      <div className="mb-3 flex items-center gap-2">
        <span className="text-xs text-red-500">▲</span>
        <h2 className="text-base font-bold text-[#26352b]">
          আজ দাম বেড়েছে
        </h2>
      </div>

      {risingProducts.length === 0 ? (
        <p className="text-sm text-gray-500">
          আজ দাম বেড়েছে এমন পণ্য পাওয়া যায়নি।
        </p>
      ) : (
        <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-3">
          {risingProducts.map((product) => (
            <article
              key={product.id}
              className="min-w-0 rounded-xl border border-[#e1e9e2] bg-[#fbfdfb] p-3 transition-shadow hover:shadow-md"
            >
              
              <div className="flex items-center gap-2">
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-[#f0f5f0] text-xl">
                  {product.image}
                </div>

                <div className="min-w-0">
                  <h3 className="truncate text-sm font-bold text-[#26352b]">
                    {product.nameBn}
                  </h3>

                  <p className="mt-0.5 text-[10px] text-gray-500">
                    {product.unit === "kg"
                      ? "প্রতি কেজি"
                      : product.unit === "litre"
                      ? "প্রতি লিটার"
                      : product.unit === "dozen"
                      ? "প্রতি ডজন"
                      : product.unit === "piece"
                      ? "প্রতি প্যাক"
                      : product.unit}
                  </p>
                </div>
              </div>

              {/* Today's price and percentage */}
              <div className="mt-3 flex items-end justify-between gap-2">
                <div>
                  <p className="text-[10px] text-gray-500">
                    বর্তমান দাম
                  </p>

                  <p className="mt-0.5 text-base font-extrabold text-[#26352b]">
                    {product.today.toLocaleString("bn-BD")} টাকা
                  </p>
                </div>

                <span className="mb-0.5 inline-flex shrink-0 items-center gap-1 rounded-full bg-red-50 px-2 py-1 text-[10px] font-semibold text-red-600">
                  ▲{" "}
                  {Math.abs(product.change.pct).toLocaleString(
                    "bn-BD",
                    { maximumFractionDigits: 1 }
                  )}
                  %
                </span>
              </div>
            </article>
          ))}
        </div>
      )}
    </section>
  );
};

export default DamBarce;