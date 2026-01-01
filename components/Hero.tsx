import Link from "next/link";

export default function Hero() {
  return (
    <div className="relative bg-slate-900 text-white overflow-hidden min-h-[85vh] flex items-center">
      {/* Background Image with Overlay */}
      <div className="absolute inset-0 z-0">
        <div className="absolute inset-0 bg-gradient-to-r from-slate-900 via-slate-900/90 to-slate-900/40 z-10" />
        <div className="h-full w-full bg-[url('https://images.unsplash.com/photo-1589829085413-56de8ae18c73?auto=format&fit=crop&q=80')] bg-cover bg-center opacity-40 mix-blend-overlay" />
      </div>

      <div className="relative z-10 container-custom px-4 py-20 sm:px-6 lg:px-8">
        <div className="max-w-3xl animate-fade-in-up">
          <div className="inline-block px-4 py-1.5 mb-6 rounded-full bg-slate-800/50 border border-slate-700 backdrop-blur-sm text-sm font-medium tracking-wide text-amber-500 uppercase">
            Premier Legal Counsel
          </div>

          <h1 className="text-5xl sm:text-6xl md:text-7xl font-bold font-serif tracking-tight leading-tight mb-8">
            <span className="block text-white">Defending Your Rights,</span>
            <span className="block text-amber-500">Protecting Your Future.</span>
          </h1>

          <p className="max-w-xl text-lg sm:text-xl text-slate-300 mb-10 leading-relaxed font-light">
            Selam Lawyer provides trusted legal counsel with a commitment to excellence. We fight for your rights with the dedication you deserve.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 w-full sm:w-auto">
            <Link href="/contact" className="btn-secondary text-lg px-8 py-4">
              Schedule Consultation
            </Link>
            <Link href="/practice-areas" className="btn-outline-white text-lg px-8 py-4">
              Our Practice Areas
            </Link>
          </div>

          <div className="mt-12 flex items-center gap-8 text-slate-400 text-sm font-medium">
            <div className="flex items-center gap-2">
              <div className="w-1.5 h-1.5 rounded-full bg-amber-500"></div>
              Experienced
            </div>
            <div className="flex items-center gap-2">
              <div className="w-1.5 h-1.5 rounded-full bg-amber-500"></div>
              Compassionate
            </div>
            <div className="flex items-center gap-2">
              <div className="w-1.5 h-1.5 rounded-full bg-amber-500"></div>
              Results-Driven
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
