"use client";
import Link from "next/link";
import { useAuth } from "@/lib/auth";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

export default function AccountPage() {
  const { user, loading, logout } = useAuth();
  const router = useRouter();
  useEffect(() => { if (!loading && !user) router.push("/login"); }, [user, loading, router]);

  if (!user) return null;
  return (
    <div className="max-w-lg">
      <h1 className="text-3xl font-black mb-2">Hey, {user.name || user.email}</h1>
      <p className="text-ink/50 mb-6">{user.email}</p>
      <div className="space-y-3">
        <Link href="/account/orders" className="block btn-outline">My orders</Link>
        <Link href="/wishlist" className="block btn-outline">My wishlist</Link>
        <button onClick={logout} className="btn-outline w-full">Logout</button>
      </div>
    </div>
  );
}