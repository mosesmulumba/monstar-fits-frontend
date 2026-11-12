"use client";
import { useEffect, useState } from "react";
import { api } from "@/lib/api";
import { useAuth } from "@/lib/auth";
import { useRouter } from "next/navigation";

export default function OrdersPage() {
  const { user, loading } = useAuth();
  const router = useRouter();
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    if (!loading && !user) router.push("/login");
    if (user) api("/api/orders").then(setOrders).catch(() => {});
  }, [user, loading, router]);

  return (
    <div>
      <h1 className="text-3xl font-black mb-6">My orders</h1>
      {orders.length === 0 && <p className="text-ink/60">No orders yet.</p>}
      <div className="space-y-4">
        {orders.map((o) => (
          <div key={o.id} className="bg-white rounded-2xl p-5">
            <div className="flex justify-between mb-2">
              <p className="font-bold">Order #{o.id}</p>
              <span className="text-xs px-3 py-1 rounded-full bg-drip">{o.status}</span>
            </div>
            <p className="text-sm text-ink/50 mb-3">
              {new Date(o.createdAt).toLocaleDateString()} · Total ${Number(o.total).toFixed(2)}
            </p>
            <div className="space-y-1 text-sm">
              {o.items.map((i) => (
                <p key={i.id}>{i.quantity}× {i.product.name} — ${Number(i.price).toFixed(2)}</p>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}