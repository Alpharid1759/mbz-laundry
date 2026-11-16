import type { Metadata } from "next";
import { Suspense } from "react";
import { Phone } from "lucide-react";
import PageHero from "@/components/PageHero";
import BookingForm from "@/components/BookingForm";
import OpenStatus from "@/components/OpenStatus";
import { business, formatTime, hours } from "@/lib/business";

export const metadata: Metadata = {
  title: "Book a service",
  description: "Book laundry, dry cleaning or ironing with MBZ Laundry in Wuse 2, Abuja.",
};

export default function BookPage() {
  return (
    <>
      <PageHero title="Book a service" text="Tell us what you need and when. We'll confirm your booking by phone or WhatsApp." />
      <section className="container-x grid gap-10 pb-20 lg:grid-cols-3">
        <div className="lg:col-span-2">
          <Suspense>
            <BookingForm />
          </Suspense>
        </div>
        <aside className="space-y-5">
          <div className="rounded-2xl border border-slate-200 p-6">
            <OpenStatus />
            <h2 className="mt-4 font-semibold text-slate-900">Opening hours</h2>
            <ul className="mt-3 space-y-1.5 text-sm">
              {hours.map((h) => (
                <li key={h.day} className="flex justify-between">
                  <span className="text-slate-700">{h.day}</span>
                  <span className="text-slate-500">
                    {h.open && h.close ? `${formatTime(h.open)} – ${formatTime(h.close)}` : "Closed"}
                  </span>
                </li>
              ))}
            </ul>
          </div>
          <div className="rounded-2xl bg-brand-900 p-6 text-slate-200">
            <h2 className="font-semibold text-white">Prefer to call?</h2>
            <p className="mt-2 text-sm">Speak to us directly during opening hours.</p>
            <a href={`tel:${business.phoneTel}`} className="btn mt-4 bg-white text-brand-800 hover:bg-brand-50">
              <Phone className="h-4 w-4" /> {business.phoneDisplay}
            </a>
          </div>
        </aside>
      </section>
    </>
  );
}
