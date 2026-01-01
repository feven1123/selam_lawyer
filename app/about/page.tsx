import prisma from "@/lib/prisma";
import Link from "next/link";

export default async function AboutPage() {
  const hasDb = !!process.env.DATABASE_URL;
  const settings = hasDb ? await prisma.siteSettings.findFirst() : null;

  const s = settings as any;
  const aboutText = settings?.about || "Selam Lawyer is a premier legal firm dedicated to providing exceptional representation and personalized counsel. With years of experience and a track record of success, we stand by our clients through every legal challenge.";

  return (
    <div className="flex flex-col">
      {/* Header Banner */}
      <div className="bg-slate-900 text-white py-20 relative overflow-hidden">
        <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&q=80')] bg-cover bg-center opacity-20"></div>
        <div className="container-custom relative z-10 text-center">
          <h1 className="text-4xl sm:text-5xl font-serif font-bold mb-4">Who We Are</h1>
          <div className="w-24 h-1 bg-amber-600 mx-auto"></div>
        </div>
      </div>

      {/* Main Content - About Firm */}
      <section className="section-padding bg-white">
        <div className="container-custom">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="heading text-slate-900">A Legacy of Excellence</h2>
              <p className="subheading mb-6">
                Founded on the principles of integrity and justice, we have been serving our community with unwavering dedication.
              </p>
              <div className="prose prose-lg text-slate-600 leading-relaxed whitespace-pre-wrap">
                {aboutText}
              </div>
              <div className="mt-8">
                <img src="https://signature.freefire-name.com/img.php?f=7&t=Selam%20Law" alt="Signature" className="h-16 opacity-70" />
              </div>
            </div>
            <div className="relative">
              <div className="absolute -inset-4 bg-amber-100 rounded-xl transform rotate-2"></div>
              <div className="relative rounded-xl overflow-hidden shadow-xl aspect-[4/3]">
                <img
                  src="https://images.unsplash.com/photo-1556761175-5973dc0f32e7?auto=format&fit=crop&q=80"
                  alt="Law Office Meeting"
                  className="object-cover w-full h-full"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="section-padding bg-slate-50">
        <div className="container-custom">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <h2 className="heading text-slate-900">Our Mission & Values</h2>
            <p className="subheading mx-auto">The core principles that guide every action we take and every case we handle.</p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            <div className="bg-white p-8 rounded-xl shadow-sm border-t-4 border-amber-600">
              <h3 className="text-xl font-bold text-slate-900 mb-4">Advocacy</h3>
              <p className="text-slate-600">{s?.mission ?? "We are relentless champions for our clients, ensuring their voices are heard and their rights are protected in every forum."}</p>
            </div>
            <div className="bg-white p-8 rounded-xl shadow-sm border-t-4 border-slate-900">
              <h3 className="text-xl font-bold text-slate-900 mb-4">Integrity</h3>
              <p className="text-slate-600">{s?.vision ?? "We operate with transparency and honesty. Our reputation is built on trust, and we maintain the highest ethical standards."}</p>
            </div>
            <div className="bg-white p-8 rounded-xl shadow-sm border-t-4 border-amber-600">
              <h3 className="text-xl font-bold text-slate-900 mb-4">Excellence</h3>
              <p className="text-slate-600">{s?.values ?? "We strive for perfection in our legal craft. Continuous learning and preparation are the hallmarks of our practice."}</p>
            </div>
          </div>
        </div>
      </section>

      {/* Stats / History Snippet */}
      <section className="section-padding bg-slate-900 text-white">
        <div className="container-custom">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl sm:text-4xl font-serif font-bold mb-6">Our Journey</h2>
              <p className="text-slate-300 text-lg mb-6 leading-relaxed">
                Since our establishment, we have navigated complex legal landscapes to deliver favorable outcomes for our clients. What started as a small practice has grown into a respected firm, but our personal touch remains unchanged.
              </p>
              <Link href="/contact" className="text-amber-500 font-semibold hover:text-amber-400 inline-flex items-center">
                Start Your Journey With Us
                <svg className="ml-2 w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" /></svg>
              </Link>
            </div>
            <div className="grid grid-cols-2 gap-6">
              <div className="bg-slate-800 p-6 rounded-lg text-center">
                <div className="text-4xl font-bold text-amber-500 mb-2">98%</div>
                <div className="text-sm text-slate-400 uppercase tracking-wider">Client Satisfaction</div>
              </div>
              <div className="bg-slate-800 p-6 rounded-lg text-center">
                <div className="text-4xl font-bold text-amber-500 mb-2">500+</div>
                <div className="text-sm text-slate-400 uppercase tracking-wider">Cases Handled</div>
              </div>
              <div className="bg-slate-800 p-6 rounded-lg text-center">
                <div className="text-4xl font-bold text-amber-500 mb-2">15+</div>
                <div className="text-sm text-slate-400 uppercase tracking-wider">Years Active</div>
              </div>
              <div className="bg-slate-800 p-6 rounded-lg text-center">
                <div className="text-4xl font-bold text-amber-500 mb-2">1st</div>
                <div className="text-sm text-slate-400 uppercase tracking-wider">Choice for many</div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
