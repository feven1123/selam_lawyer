import prisma from "@/lib/prisma";

export default async function AttorneyPage() {
  const hasDb = !!process.env.DATABASE_URL;
  const attorney = hasDb ? await prisma.attorney.findFirst() : null;
  const fallback = {
    name: "Selamawit T.",
    bio: "With over 15 years of courtroom experience, Selamawit leads with integrity and relentless advocacy. She partners closely with clients to craft clear, effective strategies and fight for outcomes that matter.",
    education: "LL.B, Addis Ababa University • LL.M, International Business Law",
    experience: "Civil and commercial litigation, corporate advisory, family law, and dispute resolution across regional and federal courts.",
    photoUrl: null as string | null,
  };
  return (
    <div className="flex flex-col">
      <div className="bg-slate-900 text-white py-16">
        <div className="container-custom text-center">
          <h1 className="heading-serif heading-lg">Principal Attorney</h1>
          <p className="mt-4 text-slate-300">Leadership, experience, and unwavering commitment to justice.</p>
        </div>
      </div>
      <section className="section-padding bg-white">
        <div className="container-custom">
          <div className="grid gap-10 md:grid-cols-3 items-start">
            <div className="md:col-span-1">
              {(attorney?.photoUrl || fallback.photoUrl) ? (
                <img src={(attorney?.photoUrl ?? fallback.photoUrl) as string} alt={(attorney?.name ?? fallback.name)} className="w-64 h-64 rounded-xl object-cover border" />
              ) : (
                <div className="w-64 h-64 rounded-xl bg-slate-200" />
              )}
            </div>
            <div className="md:col-span-2 space-y-6">
              <div>
                <div className="text-3xl font-bold text-primary">{attorney?.name ?? fallback.name}</div>
              </div>
              <div className="glass-card rounded-xl p-6">
                <div className="text-lg font-semibold text-slate-900">Biography</div>
                <div className="mt-2 text-slate-700 whitespace-pre-wrap leading-relaxed">{attorney?.bio ?? fallback.bio}</div>
              </div>
              <div className="glass-card rounded-xl p-6">
                <div className="text-lg font-semibold text-slate-900">Education</div>
                <div className="mt-2 text-slate-700 whitespace-pre-wrap leading-relaxed">{attorney?.education ?? fallback.education}</div>
              </div>
              <div className="glass-card rounded-xl p-6">
                <div className="text-lg font-semibold text-slate-900">Experience</div>
                <div className="mt-2 text-slate-700 whitespace-pre-wrap leading-relaxed">{attorney?.experience ?? fallback.experience}</div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
