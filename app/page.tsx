import prisma from "@/lib/prisma";
import Hero from "@/components/Hero";
import Link from "next/link";

export default async function HomePage() {
  const hasDb = !!process.env.DATABASE_URL;
  // Fallback data if DB is empty or not connected
  const [areas, attorney] = hasDb
    ? await Promise.all([
        prisma.practiceArea.findMany({ take: 6, orderBy: { createdAt: "desc" } }),
        prisma.attorney.findFirst(),
      ])
    : [[], null] as const;

  // Fallback static data for display when DB is empty
  const displayAreas = areas.length > 0 ? areas : [
    { id: "1", title: "Corporate Law", description: "Comprehensive legal solutions for businesses of all sizes, from startups to established corporations." },
    { id: "2", title: "Real Estate", description: "Expert guidance in property transactions, zoning disputes, and commercial leasing." },
    { id: "3", title: "Family Law", description: "Compassionate representation for divorce, custody, and family-related legal matters." },
    { id: "4", title: "Intellectual Property", description: "Protecting your creative assets through trademarks, copyrights, and licensing agreements." },
    { id: "5", title: "Civil Litigation", description: "Strong advocacy in court for contract disputes, personal injury, and liability claims." },
    { id: "6", title: "Estate Planning", description: "Securing your legacy with tailored wills, trusts, and asset protection strategies." },
  ];

  return (
    <div className="flex flex-col">
      {/* Hero Section */}
      <Hero />

      {/* Trust Indicators / Stats */}
      <section className="bg-slate-50 border-b border-slate-100 py-12">
        <div className="container-custom">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
            <div>
              <div className="text-4xl font-bold text-slate-900 mb-1">15+</div>
              <div className="text-sm font-medium text-slate-500 uppercase tracking-wider">Years Experience</div>
            </div>
            <div>
              <div className="text-4xl font-bold text-slate-900 mb-1">500+</div>
              <div className="text-sm font-medium text-slate-500 uppercase tracking-wider">Cases Won</div>
            </div>
            <div>
              <div className="text-4xl font-bold text-slate-900 mb-1">24/7</div>
              <div className="text-sm font-medium text-slate-500 uppercase tracking-wider">Client Support</div>
            </div>
            <div>
              <div className="text-4xl font-bold text-slate-900 mb-1">100%</div>
              <div className="text-sm font-medium text-slate-500 uppercase tracking-wider">Dedication</div>
            </div>
          </div>
        </div>
      </section>

      {/* Practice Areas */}
      <section className="section-padding bg-white">
        <div className="container-custom">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <h2 className="heading text-slate-900">Expert Legal Representation</h2>
            <p className="subheading mx-auto">
              We specialize in a wide range of legal fields to provide you with the comprehensive support you need.
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {displayAreas.map((a) => (
              <div key={a.id} className="group p-8 rounded-xl bg-white border border-slate-100 shadow-sm hover:shadow-xl hover:border-slate-200 transition-all duration-300">
                <div className="w-12 h-12 bg-slate-100 rounded-lg flex items-center justify-center mb-6 text-slate-700 group-hover:bg-amber-700 group-hover:text-white transition-colors duration-300">
                  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/></svg>
                </div>
                <h3 className="text-xl font-bold text-slate-900 mb-3">{a.title}</h3>
                <p className="text-slate-600 leading-relaxed mb-6">{a.description}</p>
                <Link href="/practice-areas" className="inline-flex items-center text-amber-700 font-semibold hover:text-amber-800 transition-colors">
                  Learn more 
                  <svg className="ml-2 w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" /></svg>
                </Link>
              </div>
            ))}
          </div>
          
          <div className="mt-12 text-center">
            <Link href="/practice-areas" className="btn-outline">View All Practice Areas</Link>
          </div>
        </div>
      </section>

      {/* Principal Attorney Intro */}
      <section className="section-padding bg-slate-900 text-white relative overflow-hidden">
        <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1507679799987-c73779587ccf?auto=format&fit=crop&q=80')] bg-cover bg-center opacity-10"></div>
        <div className="container-custom relative z-10">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div className="order-2 md:order-1">
               <h2 className="text-3xl sm:text-4xl font-bold font-serif mb-6 text-white">Meet Your Advocate</h2>
               <div className="w-20 h-1 bg-amber-600 mb-8"></div>
               {attorney ? (
                 <>
                  <h3 className="text-2xl font-semibold mb-4 text-slate-100">{attorney.name}</h3>
                  <p className="text-slate-300 text-lg mb-8 leading-relaxed line-clamp-4">{attorney.bio}</p>
                 </>
               ) : (
                 <>
                  <h3 className="text-2xl font-semibold mb-4 text-slate-100">Selamawit T.</h3>
                  <p className="text-slate-300 text-lg mb-8 leading-relaxed">
                    With over 15 years of courtroom experience, Selam has earned a reputation for fierce advocacy and compassionate counsel. She believes that every client deserves a rigorous defense and personal attention.
                  </p>
                 </>
               )}
               <Link href="/attorney" className="btn-secondary">Read Full Profile</Link>
            </div>
            <div className="order-1 md:order-2 flex justify-center">
              <div className="relative w-80 h-96 sm:w-96 sm:h-[30rem] bg-slate-800 rounded-lg overflow-hidden border-4 border-slate-700/50 shadow-2xl">
                 {/* Placeholder for attorney image - Replace with actual image later */}
                 <div className="absolute inset-0 bg-gradient-to-t from-slate-900 to-transparent z-10"></div>
                 <div className="w-full h-full bg-slate-600 flex items-center justify-center text-slate-400">
                    <span className="text-sm uppercase tracking-widest">Attorney Image</span>
                 </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Why Choose Us */}
      <section className="section-padding bg-slate-50">
        <div className="container-custom">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <h2 className="heading text-slate-900">Why Choose Selam Lawyer</h2>
            <p className="subheading mx-auto">We bring more than just legal knowledge to the table; we bring strategic thinking and unwavering commitment.</p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8">
            <div className="bg-white p-8 rounded-xl shadow-sm border border-slate-100">
              <div className="w-14 h-14 bg-amber-50 rounded-full flex items-center justify-center mb-6 text-amber-700">
                 <svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"/><path d="M12 6v6l4 2"/></svg>
              </div>
              <h3 className="text-xl font-bold text-slate-900 mb-3">Client-Centric Approach</h3>
              <p className="text-slate-600">We prioritize your needs and goals, ensuring clear communication and personalized strategies for your case.</p>
            </div>
            <div className="bg-white p-8 rounded-xl shadow-sm border border-slate-100">
              <div className="w-14 h-14 bg-amber-50 rounded-full flex items-center justify-center mb-6 text-amber-700">
                 <svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"/><polyline points="22 4 12 14.01 9 11.01"/></svg>
              </div>
              <h3 className="text-xl font-bold text-slate-900 mb-3">Proven Track Record</h3>
              <p className="text-slate-600">Our history of successful settlements and verdicts speaks for itself. We know what it takes to win.</p>
            </div>
            <div className="bg-white p-8 rounded-xl shadow-sm border border-slate-100">
               <div className="w-14 h-14 bg-amber-50 rounded-full flex items-center justify-center mb-6 text-amber-700">
                 <svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/></svg>
              </div>
              <h3 className="text-xl font-bold text-slate-900 mb-3">Integrity & Trust</h3>
              <p className="text-slate-600">We operate with the highest ethical standards, providing honest assessments and transparent billing.</p>
            </div>
          </div>
        </div>
      </section>
      
      {/* Testimonials */}
      <section className="section-padding bg-white">
        <div className="container-custom">
          <h2 className="heading text-center text-slate-900 mb-12">Client Testimonials</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            <div className="p-8 bg-slate-50 rounded-lg testimonial-card">
              <div className="flex text-amber-500 mb-4">
                 {[...Array(5)].map((_,i) => <svg key={i} className="w-5 h-5 fill-current" viewBox="0 0 20 20"><path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"/></svg>)}
              </div>
              <p className="text-slate-700 italic mb-6">"Selam provided exceptional guidance during a very difficult time. Her expertise and compassion made all the difference in my case."</p>
              <div className="font-semibold text-slate-900">- Sarah M.</div>
            </div>
            <div className="p-8 bg-slate-50 rounded-lg testimonial-card">
              <div className="flex text-amber-500 mb-4">
                 {[...Array(5)].map((_,i) => <svg key={i} className="w-5 h-5 fill-current" viewBox="0 0 20 20"><path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"/></svg>)}
              </div>
              <p className="text-slate-700 italic mb-6">"Professional, responsive, and incredibly effective. I wouldn't trust anyone else with my business legal matters."</p>
              <div className="font-semibold text-slate-900">- James R.</div>
            </div>
            <div className="p-8 bg-slate-50 rounded-lg testimonial-card hidden lg:block">
              <div className="flex text-amber-500 mb-4">
                 {[...Array(5)].map((_,i) => <svg key={i} className="w-5 h-5 fill-current" viewBox="0 0 20 20"><path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"/></svg>)}
              </div>
              <p className="text-slate-700 italic mb-6">"I felt heard and understood from day one. The team went above and beyond to secure a favorable outcome."</p>
              <div className="font-semibold text-slate-900">- Elena K.</div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-slate-900 text-white text-center">
        <div className="container-custom">
          <h2 className="text-3xl sm:text-4xl font-serif font-bold mb-6">Ready to Discuss Your Case?</h2>
          <p className="text-slate-300 text-lg max-w-2xl mx-auto mb-10">
            Contact us today for a confidential consultation. Let us help you navigate your legal challenges with confidence.
          </p>
          <Link href="/contact" className="btn-secondary">
            Get in Touch
          </Link>
        </div>
      </section>
    </div>
  );
}
