"use client";
import { useEffect, useState, Suspense } from "react";
import { useSearchParams } from "next/navigation";

type PracticeArea = { id: string; title: string; description: string };
type SiteSettings = { id: string; phone: string | null; email: string | null; address: string | null; about: string | null; mission: string | null; vision: string | null; values: string | null };
type Attorney = { id: string; name: string; bio: string | null; education: string | null; experience: string | null; photoUrl: string | null };
type ContactMessage = { id: string; name: string; email: string; phone: string | null; message: string; createdAt: string };


function AdminDashboardContent() {
  const [areas, setAreas] = useState<PracticeArea[]>([]);
  const [settings, setSettings] = useState<SiteSettings | null>(null);
  const [attorney, setAttorney] = useState<Attorney | null>(null);
  const [messages, setMessages] = useState<ContactMessage[]>([]);
  const [activeTab, setActiveTab] = useState("attorney");
  const searchParams = useSearchParams();

  async function logout() {
    await fetch("/api/auth/logout", { method: "POST" });
    window.location.href = "/admin/login";
  }

  async function loadAll() {
    try {
      const [areasRes, settingsRes, attorneyRes, messagesRes] = await Promise.all([
        fetch("/api/practice-areas"),
        fetch("/api/settings"),
        fetch("/api/attorney"),
        fetch("/api/contact", { method: "GET" }),
      ]);
      setAreas(await areasRes.json());
      setSettings(await settingsRes.json());
      setAttorney(await attorneyRes.json());
      setMessages(await messagesRes.json());
    } catch (e) {
      console.error("Failed to load data", e);
    }
  }

  useEffect(() => {
    loadAll();
  }, []);

  useEffect(() => {
    const tab = searchParams.get("tab") || "attorney";
    setActiveTab(tab);
  }, [searchParams]);

  async function addArea(form: HTMLFormElement) {
    const fd = new FormData(form);
    const payload = Object.fromEntries(fd.entries());
    await fetch("/api/practice-areas", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify(payload) });
    form.reset();
    loadAll();
  }

  async function updateSettings(form: HTMLFormElement) {
    const fd = new FormData(form);
    const payload = Object.fromEntries(fd.entries());
    await fetch("/api/settings", { method: "PUT", headers: { "Content-Type": "application/json" }, body: JSON.stringify(payload) });
    loadAll();
    alert("Settings updated!");
  }

  async function updateAttorney(form: HTMLFormElement) {
    const fd = new FormData(form);
    const payload = Object.fromEntries(fd.entries());
    await fetch("/api/attorney", { method: "PUT", headers: { "Content-Type": "application/json" }, body: JSON.stringify(payload) });
    loadAll();
    alert("Attorney Profile updated!");
  }

  async function removeArea(id: string) {
    if (!confirm("Are you sure you want to delete this area?")) return;
    await fetch(`/api/practice-areas/${id}`, { method: "DELETE" });
    loadAll();
  }

  const inputClass = "w-full rounded-lg border border-gray-300 px-4 py-2 focus:ring-2 focus:ring-primary-500 focus:border-transparent outline-none transition-all";
  const labelClass = "block text-sm font-semibold text-gray-700 mb-1";

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="py-12">
        <div className="container-custom space-y-8">
          {/* Site Settings */}
          {activeTab === "settings" && (
            <section className="glass-card p-8 rounded-xl">
              <h2 className="text-2xl font-bold text-primary-900 mb-6">Site Settings</h2>
              <form
                onSubmit={(e) => {
                  e.preventDefault();
                  updateSettings(e.currentTarget);
                }}
                className="grid gap-6 md:grid-cols-2"
              >
                <div>
                  <label className={labelClass}>Phone Number</label>
                  <input name="phone" defaultValue={settings?.phone ?? ""} placeholder="+251 ..." className={inputClass} />
                </div>
                <div>
                  <label className={labelClass}>Email Address</label>
                  <input name="email" defaultValue={settings?.email ?? ""} placeholder="info@example.com" className={inputClass} />
                </div>
                <div className="md:col-span-2">
                  <label className={labelClass}>Physical Address</label>
                  <input name="address" defaultValue={settings?.address ?? ""} placeholder="Addis Ababa, ..." className={inputClass} />
                </div>
                <div className="md:col-span-2">
                  <label className={labelClass}>About Description</label>
                  <textarea name="about" defaultValue={settings?.about ?? ""} placeholder="Detailed description of the firm..." rows={6} className={inputClass} />
                </div>
                <div>
                  <label className={labelClass}>Mission</label>
                  <textarea name="mission" defaultValue={settings?.mission ?? ""} placeholder="What drives the firm..." rows={4} className={inputClass} />
                </div>
                <div>
                  <label className={labelClass}>Vision</label>
                  <textarea name="vision" defaultValue={settings?.vision ?? ""} placeholder="Where the firm is headed..." rows={4} className={inputClass} />
                </div>
                <div className="md:col-span-2">
                  <label className={labelClass}>Values</label>
                  <textarea name="values" defaultValue={settings?.values ?? ""} placeholder="Core principles and ethics..." rows={4} className={inputClass} />
                </div>
                <div className="md:col-span-2">
                  <button className="btn-primary">Save Settings</button>
                </div>
              </form>
            </section>
          )}

          {/* Attorney Profile */}
          {activeTab === "attorney" && (
            <section className="glass-card p-8 rounded-xl">
              <h2 className="text-2xl font-bold text-primary-900 mb-6">Principal Attorney</h2>
              <form
                onSubmit={(e) => {
                  e.preventDefault();
                  updateAttorney(e.currentTarget);
                }}
                className="grid gap-6 md:grid-cols-2"
              >
                <div>
                  <label className={labelClass}>Full Name</label>
                  <input name="name" defaultValue={attorney?.name ?? ""} placeholder="Attorney Name" className={inputClass} />
                </div>
                <div>
                  <label className={labelClass}>Photo URL</label>
                  <input name="photoUrl" defaultValue={attorney?.photoUrl ?? ""} placeholder="/assets/attorney.jpg" className={inputClass} />
                </div>
                <div className="md:col-span-2">
                  <label className={labelClass}>Biography</label>
                  <textarea name="bio" defaultValue={attorney?.bio ?? ""} placeholder="Professional biography..." rows={5} className={inputClass} />
                </div>
                <div className="md:col-span-2">
                  <label className={labelClass}>Education</label>
                  <textarea name="education" defaultValue={attorney?.education ?? ""} placeholder="Degrees and universities..." rows={3} className={inputClass} />
                </div>
                <div className="md:col-span-2">
                  <label className={labelClass}>Experience</label>
                  <textarea name="experience" defaultValue={attorney?.experience ?? ""} placeholder="Previous roles and years of experience..." rows={3} className={inputClass} />
                </div>
                <div className="md:col-span-2">
                  <button className="btn-primary">Save Profile</button>
                </div>
              </form>
            </section>
          )}

          {/* Practice Areas */}
          {activeTab === "areas" && (
            <section className="space-y-8">
              <div className="glass-card p-8 rounded-xl">
                <h2 className="text-2xl font-bold text-primary-900 mb-6">Add New Practice Area</h2>
                <form
                  onSubmit={(e) => {
                    e.preventDefault();
                    addArea(e.currentTarget);
                  }}
                  className="grid gap-6 md:grid-cols-2"
                >
                  <div className="md:col-span-2">
                    <label className={labelClass}>Title</label>
                    <input name="title" placeholder="e.g. Criminal Law" required className={inputClass} />
                  </div>
                  <div className="md:col-span-2">
                    <label className={labelClass}>Description</label>
                    <textarea name="description" placeholder="Short description for the card..." required rows={3} className={inputClass} />
                  </div>
                  <div className="md:col-span-2">
                    <button className="btn-primary">Add Area</button>
                  </div>
                </form>
              </div>

              <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
                {areas.map((a) => (
                  <div key={a.id} className="glass-card p-6 rounded-xl relative group">
                    <h3 className="text-xl font-bold text-primary-900 mb-2">{a.title}</h3>
                    <p className="text-sm text-gray-600 mb-4 line-clamp-3">{a.description}</p>
                    <button onClick={() => removeArea(a.id)} className="text-sm font-medium text-red-600 hover:text-red-800 transition-colors">
                      Delete Area
                    </button>
                  </div>
                ))}
              </div>
            </section>
          )}

          {/* Messages */}
          {activeTab === "messages" && (
            <section className="glass-card p-8 rounded-xl">
              <h2 className="text-2xl font-bold text-primary-900 mb-6">Inbox</h2>
              <div className="divide-y divide-gray-100">
                {messages.length > 0 ? (
                  messages.map((m) => (
                    <div key={m.id} className="py-6 first:pt-0 last:pb-0 hover:bg-gray-50 -mx-8 px-8 transition-colors">
                      <div className="flex justify-between items-start mb-2">
                        <div>
                          <span className="font-bold text-gray-900">{m.name}</span>
                          <span className="text-gray-500 text-sm ml-2">&lt;{m.email}&gt;</span>
                          {m.phone && <span className="text-gray-500 text-sm ml-2">• {m.phone}</span>}
                        </div>
                        <div className="text-xs text-gray-400">{new Date(m.createdAt).toLocaleString()}</div>
                      </div>
                      <p className="text-gray-700 whitespace-pre-wrap leading-relaxed">{m.message}</p>
                    </div>
                  ))
                ) : (
                  <div className="py-12 text-center text-gray-500">No messages found.</div>
                )}
              </div>
            </section>
          )}
        </div>
      </div>
    </div>
  );
}

export default function AdminDashboardPage() {
  return (
    <Suspense fallback={<div className="min-h-screen flex items-center justify-center">Loading...</div>}>
      <AdminDashboardContent />
    </Suspense>
  );
}
