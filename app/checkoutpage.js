"use client";
import { useState, useEffect } from "react";
import { api } from "@/lib/api";
import { useAuth } from "@/lib/auth";
import { useRouter } from "next/navigation";

export default function CheckoutPage() {
  const { user, loading } = useAuth();
  const router = useRouter();
  const [address, setAddress] = useState("");
  const [coupon, setCoupon] = useState("");
  const [msg, setMsg] = useState("");
  const [placing, setPlacing] = useState(false);

  useEffect(() => {
    if (!loading && !user) router.push("/login");
  }, [user, loading, router]);

  const placeOrder = async () => {
    setPlacing(true); setMsg("");
    try {
      const order = await api("/api/orders", {
        method: "POST",
        body: JSON.stringify({ shippingAddress: address, couponCode: coupon || undefined }),
      });
      router.push(`/account/orders?placed=${order.id}`);
    } catch (e) { setMsg(e.message); }
    finally { setPlacing(false); }
  };

  return (
    <div className="max-w-lg mx-auto">
      <h1 className="text-3xl font-black mb-6">Checkout</h1>
      <label className="block text-sm font-medium mb-2">Shipping address</label>
      <textarea
        value={address} onChange={(e) => setAddress(e.target.value)}
        rows={3} className="input mb-4" placeholder="Street, city, country…" />
      <label className="block text-sm font-medium mb-2">Coupon (optional)</label>
      <input value={coupon} onChange={(e) => setCoupon(e.target.value)}
             className="input mb-6" placeholder="e.g. DRIP10" />
      <button onClick={placeOrder} disabled={placing || !address}
              className="btn-primary w-full disabled:opacity-50">
        {placing ? "Placing…" : "Place order"}
      </button>
      {msg && <p className="mt-4 text-red-500">{msg}</p>}
    </div>
  );
}