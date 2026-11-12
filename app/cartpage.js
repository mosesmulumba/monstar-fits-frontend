"use client";
import { useEffect, useState } from "react";
import Link from "next/link";
import { api } from "@/lib/api";
import { useAuth } from "@/lib/auth";
import { useRouter } from "next/navigation";

export default function CartPage() {
  const { user, loading } = useAuth();
  const router = useRouter();
  const [cart, setCart] = useState(null);

  useEffect(() => {
    if (!loading && !user) router.push("/login");
    if (user) api("/api/cart").then(setCart).catch(() => {});
  }, [user, loading, router]);

  const update = async (itemId, quantity) => {
    const c = await api(`/api/cart/items/${itemId}`, {
      method: "PUT", body: JSON.stringify({ quantity }),
    });
    setCart(c);
  };

  if (!cart) return <p>Loading…</p>;

  const total = cart.items.reduce(
    (s, i) => s + Number(i.product.price) * i.quantity, 0
  );

  return (
    <div>
      <h1 className="text-3xl font-black mb-6">Your cart</h1>
      {cart.items.length === 0 ? (
        <p className="text-ink/60">Cart is empty. <Link href="/products" className="underline">Shop now</Link></p>
      ) : (
        <div className="space-y-4">
          {cart.items.map((item) => (
            <div key={item.id}
                 className="flex items-center gap-4 bg-white rounded-2xl p-4">
              <img src={item.product.images?.[0]?.url} alt=""
                   className="w-20 h-24 object-cover rounded-lg" />
              <div className="flex-1">
                <p className="font-semibold">{item.product.name}</p>
                <p className="text-sm text-ink/50">${Number(item.product.price).toFixed(2)}</p>
              </div>
              <input type="number" min="1" value={item.quantity}
                     onChange={(e) => update(item.id, Number(e.target.value))}
                     className="input w-20" />
              <button onClick={() => update(item.id, 0)}
                      className="text-ink/50 hover:text-red-500 text-sm">Remove</button>
            </div>
          ))}
          <div className="flex justify-between items-center pt-4 border-t border-ink/10">
            <p className="text-xl font-bold">Total: ${total.toFixed(2)}</p>
            <Link href="/checkout" className="btn-primary">Checkout →</Link>
          </div>
        </div>
      )}
    </div>
  );
}