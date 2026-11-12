"use client";
import { useState } from "react";
import { useAuth } from "@/lib/auth";
import { useRouter } from "next/navigation";
import Link from "next/link";

export default function LoginPage() {
  const { login } = useAuth();
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [err, setErr] = useState("");

  const submit = async (e) => {
    e.preventDefault(); setErr("");
    try { await login(email, password); router.push("/"); }
    catch (e) { setErr(e.message); }
  };

  return (
    <div className="max-w-sm mx-auto">
      <h1 className="text-3xl font-black mb-6">Login</h1>
      <form onSubmit={submit} className="space-y-3">
        <input className="input" placeholder="Email" value={email}
               onChange={(e) => setEmail(e.target.value)} />
        <input className="input" type="password" placeholder="Password"
               value={password} onChange={(e) => setPassword(e.target.value)} />
        <button className="btn-primary w-full">Login</button>
        {err && <p className="text-red-500 text-sm">{err}</p>}
      </form>
      <p className="mt-4 text-sm text-ink/60">
        No account? <Link href="/register" className="underline">Register</Link>
      </p>
    </div>
  );
}