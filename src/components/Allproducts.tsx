
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

export default async function AllProducts() {
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

  const products: Product[] = Array.isArray(result)
    ? result
    : result.data ?? [];

  return (
    <section className="mx-auto max-w-7xl px-4 py-6">
      {/* Heading */}
      <div className="mb-5 flex items-center justify-between">
        <h2 className="text-xl font-bold text-gray-800">
          সকল পণ্যের বাজার দর
        </h2>

        <span className="rounded-full bg-green-100 px-3 py-1 text-sm font-semibold text-green-700">
          {products.length} টি পণ্য
        </span>
      </div>

      {/* All Product Cards */}
      <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-3">
        {products.map((product) => {
          const isUp = product.change?.dir === "up";
          const isDown = product.change?.dir === "down";
          const percent = Math.abs(product.change?.pct ?? 0);

          return (
            <div
              key={product.id}
              className="rounded-xl border border-gray-200 bg-[#f9fbf9] p-3 transition-shadow hover:shadow-md"
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
                  })}%
                </span>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
}
