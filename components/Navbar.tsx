"use client";

import Link from "next/link";
import Image from "next/image";
import { usePathname, useRouter, useSearchParams } from "next/navigation";

export default function Navbar() {
  const pathname = usePathname();
  const router = useRouter();

  async function logout() {
    await fetch("/api/auth/logout", { method: "POST" });
    router.replace("/admin/login");
  }

  const isAdmin = pathname?.startsWith("/admin");
  const isAdminLogin = pathname === "/admin/login";
  const searchParams = useSearchParams();
  const activeTab = searchParams.get("tab") || "attorney";

  if (isAdminLogin) return null;

  return (
    <header className="sticky top-0 z-50 w-full border-b border-gray-200 bg-white/80 backdrop-blur-md">
      <div className="container-custom h-20 flex items-center justify-between">
        <Link href={isAdmin ? "/admin" : "/"} className="flex items-center gap-3 group">
          <div className="relative h-10 w-10 overflow-hidden rounded-sm">
            <Image src="/assets/logo.png" alt="Selam Lawyer Logo" fill className="object-contain" />
          </div>
          <span className="text-xl font-serif font-bold text-primary-900 tracking-tight group-hover:text-secondary-600 transition-colors">
            Selam Lawyer
          </span>
        </Link>

        {!isAdmin ? (
          <nav className="hidden md:flex items-center gap-8 text-sm font-medium text-gray-700">
            <Link href="/" className="hover:text-primary-600 transition-colors">Home</Link>
            <Link href="/about" className="hover:text-primary-600 transition-colors">About Firm</Link>
            <Link href="/practice-areas" className="hover:text-primary-600 transition-colors">Practice Areas</Link>
            <Link href="/attorney" className="hover:text-primary-600 transition-colors">Principal Attorney</Link>
            <Link href="/contact" className="btn-primary py-2 px-5 text-sm shadow-md">Consultation</Link>
          </nav>
        ) : (
          <nav className="hidden md:flex items-center gap-6 text-sm font-medium text-gray-700">
            <Link href="/admin" className={`${activeTab === "attorney" ? "text-primary-900 font-semibold" : "hover:text-primary-700 transition-colors"}`}>Principal Attorney</Link>
            <Link href="/admin?tab=areas" className={`${activeTab === "areas" ? "text-primary-900 font-semibold" : "hover:text-primary-700 transition-colors"}`}>Practice Areas</Link>
            <Link href="/admin?tab=messages" className={`${activeTab === "messages" ? "text-primary-900 font-semibold" : "hover:text-primary-700 transition-colors"}`}>Messages</Link>
            <Link href="/admin?tab=settings" className={`${activeTab === "settings" ? "text-primary-900 font-semibold" : "hover:text-primary-700 transition-colors"}`}>General Settings</Link>
            <button onClick={logout} className="btn-outline">Logout</button>
          </nav>
        )}

        <button className="md:hidden text-gray-600">
          <span className="sr-only">Open menu</span>
          <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
          </svg>
        </button>
      </div>
    </header>
  );
}
