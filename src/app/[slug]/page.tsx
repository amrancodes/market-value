import Allproducts from "@/components/Allproducts";

export default async function CategoryPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;

  return (
    <main className="min-h-screen">
      <Allproducts categorySlug={slug} />
    </main>
  );
}
