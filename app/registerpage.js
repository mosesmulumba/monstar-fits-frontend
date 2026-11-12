"use client";
import { useState } from "react";
import { useAuth } from "@/lib/auth";
import { useRouter } from "next/navigation";

export default function RegisterPage() {
  const { register } = useAuth();
  const router = useRouter();
  const [form, setForm] = useState({ name: "", email: "", password: "" });
  const [err, setErr] = useState("");

  const submit = async (e) => {
    e.preventDefault(); setErr("");
    try {
      await register(form.email, form.password, form.name);
      router.push("/");
    } catch (e) { setErr(e.message); }
  };

  return (
    <div className="max-w-sm mx-auto">
      <h1 className="text-3xl font-black mb-6">Create account</h1>
      <form onSubmit={submit} className="space-y-3">
        <input className="input" placeholder="Name"
               value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} />
        <input className="input" placeholder="Email"
               value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} />
        <input className="input" type="password" placeholder="Password"
               value={form.password} onChange={(e) => setForm({ ...form, password: e.target.value })} />
        <button className="btn-primary w-full">Register</button>
        {err && <p className="text-red-500 text-sm">{err}</p>}
      </form>
    </div>
  );
}