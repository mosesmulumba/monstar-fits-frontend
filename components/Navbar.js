"use client";
import Link from "next/link";
import { useAuth } from "@/lib/auth";

export default function Navbar() {
  const { user, logout } = useAuth();
  return (
    <header className="sticky top-0 z-40 bg-bone/80 backdrop-blur border-b border-ink/10">
      <nav className="max-w-6xl mx-auto flex items-center justify-between px-5 py-4">
        <Link href="/" className="text-xl font-black tracking-tight">
          monstàr<span className="text-drip">.</span>fits
        </Link>
        <div className="flex items-center gap-5 text-sm font-medium">
          <Link href="/products">Shop</Link>
          <Link href="/wishlist">Wishlist</Link>
          <Link href="/cart">Cart</Link>
          {user ? (
            <>
              <Link href="/account">Account</Link>
              <button onClick={logout} className="text-ink/60 hover:text-ink">Logout</button>
            </>
          ) : (
            <Link href="/login" className="btn-primary !py-2 !px-4">Login</Link>
          )}
        </div>
      </nav>
    </header>
  );
}