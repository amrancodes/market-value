
import MarqueeText from "react-marquee-text";
import "react-marquee-text/dist/styles.css";

interface Product {
  id: number | string;
  image: string;
  nameBn: string;
  today: number;
  unit: string;
  change: {
    dir: "up" | "down" | "flat" | number;
    pct: number;
  };
}

interface ProductsResponse {
  data?: Product[];
  products?: Product[];
}

const Marquee = async () => {
  const res = await fetch(
    "https://openapi.programming-hero.com/api/bazardor/products"
  );

  if (!res.ok) {
    throw new Error("Failed to fetch products");
  }

  const result: Product[] | ProductsResponse = await res.json();

  const data: Product[] = Array.isArray(result)
    ? result
    : result.data ?? result.products ?? [];

  return (
    <div className="bg-white text-black">
      <MarqueeText direction="right" duration={13}>
        {data.map((headline) => (
          <span
            key={headline.id}
            className="mx-4 flex gap-3 font-semibold"
          >
            <span>{headline.image}</span>
            <span>{headline.nameBn}</span>
            <span>{headline.today}</span>
            <span>{headline.unit}</span>
            <span>
              {headline.change.dir === "down"
                ? "▼"
                : headline.change.dir === "up"
                  ? "▲"
                  : "—"}
            </span>
            <span>{headline.change.pct}%</span>
          </span>
        ))}
      </MarqueeText>
    </div>
  );
};

export default Marquee;
