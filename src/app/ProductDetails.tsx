
import Link from "next/link";

type Market = {
  market: string;
  division: string;
  min: number;
  max: number;
};

type Product = {
  slug: string;
  nameBn: string;
  category: string;
  categoryNameBn?: string;
  categoryIcon?: string;
  unit: string;
  today: number;
  yesterday?: number;
  lastWeek?: number;
  markets?: Market[];
};

export default function ProductDetails({
  product,
}: {
  product: Product;
}) {
  const bn = (value: number) =>
    new Intl.NumberFormat("bn-BD").format(value);

  const markets = product.markets ?? [];

  const prices = markets.flatMap((market) => [
    market.min,
    market.max,
  ]);

  const minPrice = prices.length
    ? Math.min(...prices)
    : product.today;

  const maxPrice = prices.length
    ? Math.max(...prices)
    : product.today;

  const avgPrice = prices.length
    ? Math.round(
        prices.reduce((sum, price) => sum + price, 0) /
          prices.length
      )
    : product.today;

  return (
    <main className="mx-auto max-w-7xl space-y-5 px-4 py-6">
      {/* Breadcrumb */}
      <div className="text-sm text-gray-500">
        <Link href="/" className="hover:text-green-700">
          হোম
        </Link>
        {" › "}
        <Link
          href={`/category/${product.category}`}
          className="hover:text-green-700"
        >
          {product.categoryNameBn || product.category}
        </Link>
        {" › "}
        {product.nameBn}
      </div>

      {/* Product Header Card */}
      <section className="flex flex-col justify-between gap-4 rounded-2xl border border-gray-200 bg-white p-5 sm:flex-row sm:items-center">
        <div className="flex items-center gap-4">
          <div className="flex h-16 w-16 items-center justify-center rounded-xl bg-green-50 text-4xl">
            {product.categoryIcon || "🛒"}
          </div>

          <div>
            <h1 className="text-2xl font-bold text-gray-800">
              {product.nameBn}
            </h1>
            <p className="mt-1 text-sm text-gray-500">
              প্রতি {product.unit}
            </p>
          </div>
        </div>

        <div className="rounded-xl bg-green-50 p-4">
          <p className="text-sm text-gray-500">আজকের দাম</p>
          <p className="text-2xl font-bold text-green-700">
            {bn(product.today)} টাকা
          </p>
          <p className="text-xs text-gray-500">
            প্রতি {product.unit}
          </p>
        </div>
      </section>

      {/* Price Summary */}
      <section className="rounded-2xl border border-gray-200 bg-white p-5">
        <h2 className="mb-4 font-bold text-gray-800">
          দামের সারসংক্ষেপ
        </h2>

        <div className="grid grid-cols-1 gap-3 sm:grid-cols-3">
          <PriceBox
            title="সর্বনিম্ন দাম"
            price={minPrice}
            color="text-green-700"
            bn={bn}
          />

          <PriceBox
            title="সর্বোচ্চ দাম"
            price={maxPrice}
            color="text-red-600"
            bn={bn}
          />

          <PriceBox
            title="গড় দাম"
            price={avgPrice}
            color="text-green-700"
            bn={bn}
          />
        </div>
      </section>

      {/* Market Price Table */}
      <section className="overflow-hidden rounded-2xl border border-gray-200 bg-white p-4">
        <h2 className="mb-4 font-bold text-gray-800">
          বাজারভিত্তিক আজকের দাম
        </h2>

        {markets.length > 0 ? (
          <div className="overflow-x-auto">
            <table className="w-full min-w-[600px] text-sm">
              <thead className="bg-gray-50 text-gray-500">
                <tr>
                  <th className="p-3 text-left">বাজার</th>
                  <th className="p-3 text-left">বিভাগ</th>
                  <th className="p-3 text-right">সর্বনিম্ন</th>
                  <th className="p-3 text-right">সর্বোচ্চ</th>
                </tr>
              </thead>

              <tbody>
                {markets.map((market, index) => (
                  <tr
                    key={`${market.market}-${index}`}
                    className="border-t border-gray-200 hover:bg-green-50"
                  >
                    <td className="p-3">{market.market}</td>
                    <td className="p-3">{market.division}</td>
                    <td className="p-3 text-right">
                      {bn(market.min)} টাকা
                    </td>
                    <td className="p-3 text-right">
                      {bn(market.max)} টাকা
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        ) : (
          <p className="py-6 text-center text-gray-500">
            এই পণ্যের বাজারভিত্তিক তথ্য পাওয়া যায়নি।
          </p>
        )}
      </section>
    </main>
  );
}

function PriceBox({
  title,
  price,
  color,
  bn,
}: {
  title: string;
  price: number;
  color: string;
  bn: (value: number) => string;
}) {
  return (
    <div className="rounded-xl border border-gray-200 bg-gray-50 p-4">
      <p className="text-sm text-gray-500">{title}</p>
      <p className={`mt-2 text-2xl font-bold ${color}`}>
        {bn(price)} টাকা
      </p>
    </div>
  );
}
