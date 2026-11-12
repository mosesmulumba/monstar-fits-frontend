"use client";
import { useEffect, useState } from "react";
import { api } from "@/lib/api";
import ProductCard from "@/components/ProductCard";

export default function ProductsPage() {
  const [products, setProducts] = useState([]);
  const [search, setSearch] = useState("");

  useEffect(() => {
    api(`/api/products?search=${encodeURIComponent(search)}`)
      .then(setProducts).catch(() => {});
  }, [search]);

  return (
    <div>
      <h1 className="text-3xl font-black mb-6">All drops</h1>
      <input
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        placeholder="Search garments…"
        className="input mb-8 max-w-md"
      />
      <div className="grid grid-cols-2 md:grid-cols-3 gap-6">
        {products.map((p) => <ProductCard key={p.id} product={p} />)}
        {products.length === 0 && <p className="text-ink/50">No products found.</p>}
      </div>
    </div>
  );
}