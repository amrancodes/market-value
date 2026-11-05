
import { notFound } from "next/navigation";
import ProductDetails from "@/components/ProductDetails";

type Product = {
  id: number;
  slug: string;
  nameBn: string;
  category: string;
  categoryNameBn?: string;
  categoryIcon?: string;
  image: string;
  unit: string;
  today: number;
  yesterday?: number;
  lastWeek?: number;
  markets?: {
    market: string;
    division: string;
    min: number;
    max: number;
  }[];
};

async function getProducts(): Promise<Product[]> {
  try {
    const res = await fetch(
      "https://api.abcz.workers.dev/api/bazardor/products",
      {
        cache: "no-store",
      }
    );

    if (!res.ok) {
      throw new Error("Product API failed");
    }

    const result = await res.json();

    return Array.isArray(result)
      ? result
      : result.data ?? [];
  } catch (error) {
    console.error("Product fetch error:", error);
    throw new Error("পণ্যের তথ্য লোড করা যায়নি");
  }
}

export default async function ProductPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;

  const products = await getProducts();

  const product = products.find(
    (item) => item.slug === slug
  );

  if (!product) {
    notFound();
  }

  return <ProductDetails product={product} />;
}

