import prisma from "@/lib/prisma";
import Image from "next/image";
import Link from "next/link";

export default async function Footer() {
  let settings: any = null;
  try {
    settings = await prisma.siteSettings.findFirst();
  } catch { }

  return (
    <footer className="bg-primary-950 text-white pt-16 pb-8 border-t border-primary-900">
      <div className="container-custom grid gap-12 md:grid-cols-4 lg:gap-8">
        <div className="md:col-span-2 lg:col-span-1">
          <Link href="/" className="flex items-center gap-3 mb-6">
            <div className="relative h-8 w-8 bg-white/10 rounded p-1">
              <Image
                src="/assets/logo.png"
                alt="Selam Lawyer Logo"
                fill
                className="object-contain"
              />
            </div>
            <span className="text-xl font-serif font-bold tracking-wide">Selam Lawyer</span>
          </Link>
          <p className="text-primary-200 text-sm leading-relaxed mb-6">
            Providing trusted legal counsel with integrity, professionalism, and a client-first approach. We are dedicated to fighting for your rights.
          </p>
        </div>

        <div>
          <h3 className="font-serif font-bold text-lg mb-4 text-secondary-400">Quick Links</h3>
          <ul className="space-y-3 text-sm text-primary-100">
            <li><Link href="/" className="hover:text-white transition-colors">Home</Link></li>
            <li><Link href="/about" className="hover:text-white transition-colors">About the Firm</Link></li>
            <li><Link href="/practice-areas" className="hover:text-white transition-colors">Practice Areas</Link></li>
            <li><Link href="/contact" className="hover:text-white transition-colors">Contact Us</Link></li>
          </ul>
        </div>

        <div>
          <h3 className="font-serif font-bold text-lg mb-4 text-secondary-400">Legal</h3>
          <ul className="space-y-3 text-sm text-primary-100">
            <li><Link href="#" className="hover:text-white transition-colors">Privacy Policy</Link></li>
            <li><Link href="#" className="hover:text-white transition-colors">Terms of Service</Link></li>
            <li><Link href="#" className="hover:text-white transition-colors">Disclaimer</Link></li>
          </ul>
        </div>

        <div>
          <h3 className="font-serif font-bold text-lg mb-4 text-secondary-400">Contact</h3>
          <ul className="space-y-3 text-sm text-primary-100">
            <li className="flex items-start gap-3">
              <span className="opacity-70">Address:</span>
              <span>{settings?.address ?? "Addis Ababa, Ethiopia"}</span>
            </li>
            <li className="flex items-center gap-3">
              <span className="opacity-70">Phone:</span>
              <span>{settings?.phone ?? "+251 911 234 567"}</span>
            </li>
            <li className="flex items-center gap-3">
              <span className="opacity-70">Email:</span>
              <span>{settings?.email ?? "info@selamlawyer.com"}</span>
            </li>
          </ul>
        </div>
      </div>

      <div className="container-custom mt-16 pt-8 border-t border-primary-900 text-center text-sm text-primary-400">
        <p>© {new Date().getFullYear()} Selam Lawyer. All rights reserved.</p>
      </div>
    </footer>
  );
}
