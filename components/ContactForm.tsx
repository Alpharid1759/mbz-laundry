"use client";

import { useState } from "react";
import { CheckCircle2, Loader2, MessageCircle } from "lucide-react";
import type { FieldErrors } from "@/lib/validation";

type Result = { delivered: boolean; whatsappUrl?: string };

export default function ContactForm() {
  const [form, setForm] = useState({ name: "", phone: "", email: "", message: "", website: "" });
  const [errors, setErrors] = useState<FieldErrors>({});
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<Result | null>(null);

  const set = (key: keyof typeof form, value: string) => {
    setForm((f) => ({ ...f, [key]: value }));
    setErrors((e) => ({ ...e, [key]: undefined }));
  };

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    setErrors({});
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      const data = await res.json();
      if (!res.ok || !data.ok) {
        setErrors(data.errors ?? { form: data.error ?? "Something went wrong. Please call us." });
        return;
      }
      setResult(data);
      if (!data.delivered && data.whatsappUrl) window.open(data.whatsappUrl, "_blank", "noopener");
    } catch {
      setErrors({ form: "Network error. Please try again or call us." });
    } finally {
      setLoading(false);
    }
  }

  if (result) {
    return (
      <div className="rounded-3xl border border-emerald-200 bg-emerald-50 p-8">
        <CheckCircle2 className="h-10 w-10 text-emerald-600" />
        <h2 className="mt-4 text-2xl font-bold text-slate-900">Message received</h2>
        <p className="mt-2 text-slate-600">
          {result.delivered ? "Thanks — we'll get back to you soon." : "Send the prefilled WhatsApp message to reach us directly."}
        </p>
        {result.whatsappUrl && !result.delivered && (
          <a href={result.whatsappUrl} target="_blank" rel="noopener noreferrer" className="btn-whatsapp mt-6">
            <MessageCircle className="h-4 w-4" /> Send on WhatsApp
          </a>
        )}
      </div>
    );
  }

  return (
    <form onSubmit={onSubmit} noValidate className="space-y-5 rounded-3xl border border-slate-200 p-6 sm:p-8">
      <input
        type="text"
        name="website"
        tabIndex={-1}
        autoComplete="off"
        className="hidden"
        value={form.website}
        onChange={(e) => set("website", e.target.value)}
      />
      <div>
        <label className="label">Full name</label>
        <input className="input" value={form.name} onChange={(e) => set("name", e.target.value)} autoComplete="name" />
        {errors.name && <p className="mt-1.5 text-sm text-red-600">{errors.name}</p>}
      </div>
      <div className="grid gap-5 sm:grid-cols-2">
        <div>
          <label className="label">Phone number</label>
          <input className="input" type="tel" value={form.phone} onChange={(e) => set("phone", e.target.value)} autoComplete="tel" />
          {errors.phone && <p className="mt-1.5 text-sm text-red-600">{errors.phone}</p>}
        </div>
        <div>
          <label className="label">Email (optional)</label>
          <input className="input" type="email" value={form.email} onChange={(e) => set("email", e.target.value)} autoComplete="email" />
          {errors.email && <p className="mt-1.5 text-sm text-red-600">{errors.email}</p>}
        </div>
      </div>
      <div>
        <label className="label">Message</label>
        <textarea className="input min-h-36" value={form.message} onChange={(e) => set("message", e.target.value)} />
        {errors.message && <p className="mt-1.5 text-sm text-red-600">{errors.message}</p>}
      </div>
      {errors.form && <p className="rounded-xl bg-red-50 px-4 py-3 text-sm text-red-700">{errors.form}</p>}
      <button type="submit" disabled={loading} className="btn-primary py-3 px-8 text-base">
        {loading && <Loader2 className="h-4 w-4 animate-spin" />} Send message
      </button>
    </form>
  );
}
