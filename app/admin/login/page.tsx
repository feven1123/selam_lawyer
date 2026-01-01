"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";

export default function AdminLoginPage() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setLoading(true);
    setError(null);
    const form = e.currentTarget;
    const formData = new FormData(form);
    const payload = Object.fromEntries(formData.entries());
    try {
      const res = await fetch("/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      if (!res.ok) throw new Error("Invalid credentials");
      console.log("Response OK, Redirecting...");
      // Force full reload to ensure middleware catches the new cookie state correctly
      window.location.href = "/admin";
    } catch (err) {
      console.error("Login client error:", err);
      setError("Invalid email or password");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="flex min-h-screen items-center justify-center bg-white py-12 px-4 sm:px-6 lg:px-8">
      <div className="w-full max-w-md space-y-8">
        <div className="text-center">
          <h2 className="heading-serif text-3xl font-bold tracking-tight text-slate-900">Admin Login</h2>
          <p className="mt-2 text-sm text-slate-600">Sign in to manage your website content</p>
        </div>
        <form className="mt-8 space-y-6" onSubmit={onSubmit}>
          <div className="space-y-4">
            <input id="email" name="email" type="email" required className="w-full rounded-lg border px-4 py-3" placeholder="Email" />
            <input id="password" name="password" type="password" required className="w-full rounded-lg border px-4 py-3" placeholder="Password" />
          </div>
          <button type="submit" disabled={loading} className="w-full rounded-lg bg-primary px-4 py-3 text-white font-semibold hover:bg-primary-800 transition disabled:opacity-70">
            {loading ? "Signing in..." : "Sign in"}
          </button>
          {error && <div className="text-center text-red-600">{error}</div>}
        </form>
      </div>
    </div>
  );
}
