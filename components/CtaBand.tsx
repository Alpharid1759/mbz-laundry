import Link from "next/link";
import { Phone } from "lucide-react";
import { business } from "@/lib/business";

export default function CtaBand() {
  return (
    <section className="container-x py-16">
      <div className="flex flex-col items-start justify-between gap-6 rounded-3xl bg-brand-600 px-8 py-10 text-white sm:flex-row sm:items-center sm:px-12">
        <div>
          <h2 className="text-2xl font-bold sm:text-3xl">Ready for fresh, clean clothes?</h2>
          <p className="mt-2 text-brand-100">Book online or call us — we&apos;re open Monday to Saturday.</p>
        </div>
        <div className="flex flex-wrap gap-3">
          <Link href="/book" className="btn bg-white text-brand-700 hover:bg-brand-50">
            Book a service
          </Link>
          <a href={`tel:${business.phoneTel}`} className="btn border border-white/40 text-white hover:bg-white/10">
            <Phone className="h-4 w-4" /> {business.phoneDisplay}
          </a>
        </div>
      </div>
    </section>
  );
}
