import type { Metadata } from "next";
import Link from "next/link";
import { Check, Info } from "lucide-react";
import { services, business } from "@/lib/business";
import PageHero from "@/components/PageHero";
import ServiceIcon from "@/components/ServiceIcon";
import CtaBand from "@/components/CtaBand";

export const metadata: Metadata = {
  title: "Services",
  description: "Laundry, dry cleaning, ironing and household item cleaning in Wuse 2, Abuja.",
};

export default function ServicesPage() {
  return (
    <>
      <PageHero
        title="Our services"
        text="Laundry and dry cleaning for everyday clothes, corporate and native wear, and household fabrics."
      />

      <section className="container-x grid gap-6 pb-10 md:grid-cols-2">
        {services.map((s) => (
          <article key={s.slug} id={s.slug} className="scroll-mt-24 rounded-3xl border border-slate-200 p-8">
            <span className="grid h-12 w-12 place-items-center rounded-xl bg-brand-600 text-white">
              <ServiceIcon slug={s.slug} />
            </span>
            <h2 className="mt-5 text-xl font-bold text-slate-900">{s.title}</h2>
            <p className="mt-2 text-slate-600">{s.summary}</p>
            <ul className="mt-5 space-y-2.5">
              {s.details.map((d) => (
                <li key={d} className="flex items-start gap-2.5 text-sm text-slate-700">
                  <Check className="mt-0.5 h-4 w-4 shrink-0 text-mint-500" /> {d}
                </li>
              ))}
            </ul>
            <Link href={`/book?service=${encodeURIComponent(s.title)}`} className="btn-outline mt-6">
              Book {s.title.split(" (")[0].toLowerCase()}
            </Link>
          </article>
        ))}
      </section>

      <section className="container-x">
        <div className="flex gap-4 rounded-2xl bg-brand-50 p-6 text-sm text-slate-700">
          <Info className="h-5 w-5 shrink-0 text-brand-600" />
          <p>
            Pricing depends on the item and fabric. For specialty or delicate items, stain treatment and turnaround
            times, please call us on{" "}
            <a href={`tel:${business.phoneTel}`} className="font-semibold text-brand-700 underline">
              {business.phoneDisplay}
            </a>{" "}
            or ask when you drop off.
          </p>
        </div>
      </section>

      <CtaBand />
    </>
  );
}
