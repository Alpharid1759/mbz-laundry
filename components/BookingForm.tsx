"use client";

import { useMemo, useState } from "react";
import { useSearchParams } from "next/navigation";
import { CheckCircle2, Loader2, MessageCircle } from "lucide-react";
import { serviceOptions } from "@/lib/business";
import type { FieldErrors } from "@/lib/validation";

type Result = { reference: string; delivered: boolean; whatsappUrl?: string };

function todayLagos() {
  return new Intl.DateTimeFormat("en-CA", { timeZone: "Africa/Lagos" }).format(new Date());
}

export default function BookingForm() {
  const params = useSearchParams();
  const preset = params.get("service");
  const minDate = useMemo(todayLagos, []);

  const [form, setForm] = useState({
    name: "",
    phone: "",
    email: "",
    services: preset && serviceOptions.includes(preset as (typeof serviceOptions)[number]) ? [preset] : ([] as string[]),
    method: "dropoff" as "dropoff" | "pickup",
    address: "",
    date: "",
    notes: "",
    website: "",
  });
  const [errors, setErrors] = useState<FieldErrors>({});
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<Result | null>(null);

  const set = <K extends keyof typeof form>(key: K, value: (typeof form)[K]) => {
    setForm((f) => ({ ...f, [key]: value }));
    setErrors((e) => ({ ...e, [key]: undefined }));
  };

  const toggleService = (s: string) =>
    set("services", form.services.includes(s) ? form.services.filter((x) => x !== s) : [...form.services, s]);

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (form.date && new Date(`${form.date}T12:00:00`).getDay() === 0) {
      setErrors({ date: "We're closed on Sundays — pick another day" });
      return;
    }
    setLoading(true);
    setErrors({});
    try {
      const res = await fetch("/api/bookings", {
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
        <h2 className="mt-4 text-2xl font-bold text-slate-900">Booking received</h2>
        <p className="mt-2 text-slate-700">
          Your reference is <span className="font-mono font-semibold">{result.reference}</span>.
        </p>
        <p className="mt-2 text-slate-600">
          {result.delivered
            ? "We'll reach out shortly to confirm."
            : "Send the prefilled WhatsApp message so we can confirm your booking."}
        </p>
        <div className="mt-6 flex flex-wrap gap-3">
          {result.whatsappUrl && (
            <a href={result.whatsappUrl} target="_blank" rel="noopener noreferrer" className="btn-whatsapp">
              <MessageCircle className="h-4 w-4" /> {result.delivered ? "Also send on WhatsApp" : "Send on WhatsApp"}
            </a>
          )}
          <button type="button" className="btn-outline" onClick={() => setResult(null)}>
            Make another booking
          </button>
        </div>
      </div>
    );
  }

  return (
    <form onSubmit={onSubmit} noValidate className="space-y-6 rounded-3xl border border-slate-200 p-6 sm:p-8">
      <input
        type="text"
        name="website"
        tabIndex={-1}
        autoComplete="off"
        className="hidden"
        value={form.website}
        onChange={(e) => set("website", e.target.value)}
      />

      <div className="grid gap-5 sm:grid-cols-2">
        <Field label="Full name" error={errors.name}>
          <input className="input" value={form.name} onChange={(e) => set("name", e.target.value)} autoComplete="name" />
        </Field>
        <Field label="Phone number" error={errors.phone}>
          <input
            className="input"
            type="tel"
            value={form.phone}
            onChange={(e) => set("phone", e.target.value)}
            placeholder="080..."
            autoComplete="tel"
          />
        </Field>
        <Field label="Email (optional)" error={errors.email} className="sm:col-span-2">
          <input className="input" type="email" value={form.email} onChange={(e) => set("email", e.target.value)} autoComplete="email" />
        </Field>
      </div>

      <fieldset>
        <legend className="label">Services needed</legend>
        <div className="grid gap-2 sm:grid-cols-2">
          {serviceOptions.map((s) => {
            const checked = form.services.includes(s);
            return (
              <label
                key={s}
                className={`flex cursor-pointer items-center gap-3 rounded-xl border px-4 py-3 text-sm transition ${
                  checked ? "border-brand-500 bg-brand-50 text-brand-800" : "border-slate-300 hover:border-slate-400"
                }`}
              >
                <input type="checkbox" className="accent-brand-600" checked={checked} onChange={() => toggleService(s)} />
                {s}
              </label>
            );
          })}
        </div>
        {errors.services && <p className="mt-1.5 text-sm text-red-600">{errors.services}</p>}
      </fieldset>

      <fieldset>
        <legend className="label">How will we get your items?</legend>
        <div className="grid gap-2 sm:grid-cols-2">
          {(
            [
              ["dropoff", "I'll drop off at the shop"],
              ["pickup", "Request a pickup"],
            ] as const
          ).map(([value, label]) => (
            <label
              key={value}
              className={`flex cursor-pointer items-center gap-3 rounded-xl border px-4 py-3 text-sm transition ${
                form.method === value ? "border-brand-500 bg-brand-50 text-brand-800" : "border-slate-300 hover:border-slate-400"
              }`}
            >
              <input
                type="radio"
                name="method"
                className="accent-brand-600"
                checked={form.method === value}
                onChange={() => set("method", value)}
              />
              {label}
            </label>
          ))}
        </div>
        {form.method === "pickup" && (
          <p className="mt-2 text-xs text-slate-500">Pickup availability and any charges will be confirmed when we contact you.</p>
        )}
      </fieldset>

      <div className="grid gap-5 sm:grid-cols-2">
        {form.method === "pickup" && (
          <Field label="Pickup address" error={errors.address} className="sm:col-span-2">
            <input className="input" value={form.address} onChange={(e) => set("address", e.target.value)} autoComplete="street-address" />
          </Field>
        )}
        <Field label={form.method === "pickup" ? "Preferred pickup date" : "Preferred drop-off date"} error={errors.date}>
          <input className="input" type="date" min={minDate} value={form.date} onChange={(e) => set("date", e.target.value)} />
        </Field>
      </div>

      <Field label="Notes (optional)" error={errors.notes}>
        <textarea
          className="input min-h-28"
          value={form.notes}
          onChange={(e) => set("notes", e.target.value)}
          placeholder="Number of items, stains, delicate fabrics, etc."
        />
      </Field>

      {errors.form && <p className="rounded-xl bg-red-50 px-4 py-3 text-sm text-red-700">{errors.form}</p>}

      <button type="submit" disabled={loading} className="btn-primary w-full py-3 text-base sm:w-auto sm:px-8">
        {loading && <Loader2 className="h-4 w-4 animate-spin" />} Submit booking
      </button>
    </form>
  );
}

function Field({
  label,
  error,
  className = "",
  children,
}: {
  label: string;
  error?: string;
  className?: string;
  children: React.ReactNode;
}) {
  return (
    <div className={className}>
      <label className="label">{label}</label>
      {children}
      {error && <p className="mt-1.5 text-sm text-red-600">{error}</p>}
    </div>
  );
}
