import Link from "next/link";

export default function ProductCard({ product }) {
  const img = product.images?.[0]?.url || "/placeholder.png";
  return (
    <Link href={`/products/${product.id}`} className="group">
      <div className="aspect-[3/4] overflow-hidden rounded-2xl bg-white">
        <img src={img} alt={product.name}
             className="w-full h-full object-cover group-hover:scale-105 transition" />
      </div>
      <div className="mt-3 flex justify-between items-start">
        <div>
          <p className="font-semibold">{product.name}</p>
          <p className="text-sm text-ink/50">{product.category?.name}</p>
        </div>
        <p className="font-bold">${Number(product.price).toFixed(2)}</p>
      </div>
    </Link>
  );
}