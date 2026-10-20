
import Link from "next/link";

const NavLinks = async () => {
  const res = await fetch(
    "https://openapi.programming-hero.com/api/bazardor/categories"
  );

  const data = await res.json();

  const navs = Array.isArray(data) ? data : data.data;

  return (
    <div className="flex items-center gap-6">
      {navs?.map((n: any) => (
        <Link
          key={n.id}
          href={`/${n.slug}`}
          className="flex items-center gap-2"
        >
          <span>{n.icon}</span>
          <span>{n.nameBn}</span>
        </Link>
      ))}
    </div>
  );
};

export default NavLinks;

