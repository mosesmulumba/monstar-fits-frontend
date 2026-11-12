import Link from "next/link";
import { api } from "@/lib/api";
import ProductCard from "@/components/ProductCard";

export default async function Home() {
  let products = [];
  try { products = await api("/api/products"); } catch {}
  return (
    <div>
      <section className="text-center py-16">
        <h1 className="text-5xl md:text-7xl font-black tracking-tight">
          monstàr<span className="text-drip">.</span>fits
        </h1>
        <p className="mt-4 text-lg text-ink/60">
          Gentle garments · Drip clothes · Men & Women
        </p>
        <Link href="/products" className="btn-primary mt-8">Shop the drop</Link>
      </section>

      <section className="grid grid-cols-2 md:grid-cols-3 gap-6">
        {products.slice(0, 6).map((p) => (
          <ProductCard key={p.id} product={p} />
        ))}
      </section>
    </div>
  );
}