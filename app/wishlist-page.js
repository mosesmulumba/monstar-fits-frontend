"use client";
import { useEffect, useState } from "react";
import { api } from "@/lib/api";
import { useAuth } from "@/lib/auth";
import { useRouter } from "next/navigation";
import ProductCard from "@/components/ProductCard";

export default function WishlistPage() {
  const { user, loading } = useAuth();
  const router = useRouter();
  const [items, setItems] = useState([]);

  useEffect(() => {
    if (!loading && !user) router.push("/login");
    if (user) api("/api/wishlist").then(setItems).catch(() => {});
  }, [user, loading, router]);

  return (
    <div>
      <h1 className="text-3xl font-black mb-6">Wishlist</h1>
      {items.length === 0 ? (
        <p className="text-ink/60">Nothing here yet.</p>
      ) : (
        <div className="grid grid-cols-2 md:grid-cols-3 gap-6">
          {items.map((i) => <ProductCard key={i.id} product={i.product} />)}
        </div>
      )}
    </div>
  );
}