"use client";
import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { api } from "@/lib/api";
import { useAuth } from "@/lib/auth";

export default function ProductPage() {
  const { id } = useParams();
  const router = useRouter();
  const { user } = useAuth();
  const [product, setProduct] = useState(null);
  const [qty, setQty] = useState(1);
  const [msg, setMsg] = useState("");

  useEffect(() => {
    api(`/api/products/${id}`).then(setProduct).catch(() => {});
  }, [id]);

  const addToCart = async () => {
    if (!user) return router.push("/login");
    try {
      await api("/api/cart/items", {
        method: "POST",
        body: JSON.stringify({ productId: product.id, quantity: qty }),
      });
      setMsg("Added to cart ✅");
    } catch (e) { setMsg(e.message); }
  };

  const addToWishlist = async () => {
    if (!user) return router.push("/login");
    try {
      await api("/api/wishlist", {
        method: "POST",
        body: JSON.stringify({ productId: product.id }),
      });
      setMsg("Added to wishlist ❤️");
    } catch (e) { setMsg(e.message); }
  };

  if (!product) return <p>Loading…</p>;

  return (
    <div className="grid md:grid-cols-2 gap-10">
      <div className="rounded-2xl overflow-hidden bg-white">
        <img src={product.images?.[0]?.url} alt={product.name}
             className="w-full h-full object-cover" />
      </div>
      <div>
        <h1 className="text-3xl font-black">{product.name}</h1>
        <p className="text-ink/50 mt-1">{product.category?.name}</p>
        <p className="text-2xl font-bold mt-4">${Number(product.price).toFixed(2)}</p>
        <p className="mt-4 text-ink/70">{product.description}</p>
        <p className="mt-2 text-sm text-ink/50">In stock: {product.stock}</p>

        <div className="flex items-center gap-3 mt-6">
          <input type="number" min="1" value={qty}
                 onChange={(e) => setQty(Number(e.target.value))}
                 className="input w-20" />
          <button onClick={addToCart} className="btn-primary">Add to cart</button>
          <button onClick={addToWishlist} className="btn-outline">❤️</button>
        </div>
        {msg && <p className="mt-3 text-sm font-medium">{msg}</p>}
      </div>
    </div>
  );
}