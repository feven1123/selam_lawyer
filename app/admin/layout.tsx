"use client";

import { useRouter, usePathname } from "next/navigation";

export default function AdminLayout({ children }: { children: React.ReactNode }) {
    const pathname = usePathname();
    // Use precise matching to ensure dashboard (/admin) doesn't get treated as login
    const isLoginPage = pathname === "/admin/login";

    const handleLogout = async () => {
        await fetch("/api/auth/logout", { method: "POST" });
        window.location.href = "/admin/login";
    };

    if (isLoginPage) {
        return (
            <div className="min-h-screen bg-gray-50 flex flex-col justify-center">
                {children}
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-gray-50">
            <main className="py-8">
                {children}
            </main>
        </div>
    );
}
