import prisma from "@/lib/prisma";

export default async function PracticeAreasPage() {
  const hasDb = !!process.env.DATABASE_URL;
  const areas = hasDb ? await prisma.practiceArea.findMany({ orderBy: { title: "asc" } }) : [];
  return (
    <div className="flex flex-col">
      <div className="bg-slate-900 text-white py-16">
        <div className="container-custom text-center">
          <h1 className="heading-serif heading-lg">Practice Areas</h1>
          <p className="mt-4 text-slate-300">Tailored expertise across key legal domains.</p>
        </div>
      </div>
      <section className="section-padding bg-white">
        <div className="container-custom">
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {areas.map((a) => (
              <div key={a.id} className="card-hover rounded-xl p-6">
                <div className="text-xl font-semibold text-primary">{a.title}</div>
                <div className="mt-2 text-sm text-slate-700 leading-relaxed">{a.description}</div>
              </div>
            ))}
            {areas.length === 0 && (
              <div className="col-span-full text-center text-slate-600">Practice areas will appear here once added.</div>
            )}
          </div>
        </div>
      </section>
    </div>
  );
}
