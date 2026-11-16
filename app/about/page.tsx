import type { Metadata } from "next";
import { Building2, Clock, MapPin, Shirt } from "lucide-react";
import PageHero from "@/components/PageHero";
import CtaBand from "@/components/CtaBand";
import { business } from "@/lib/business";

export const metadata: Metadata = {
  title: "About",
  description: `About ${business.name}, a laundry and dry-cleaning business at The Ruby Center, Wuse 2, Abuja.`,
};

const points = [
  { icon: MapPin, title: "Central location", text: "Inside The Ruby Center on Aminu Kano Crescent — easy to reach from anywhere in Wuse 2." },
  { icon: Clock, title: "Six days a week", text: "Open Monday to Saturday from 8:00 AM to 7:00 PM, so you can drop off before or after work." },
  { icon: Shirt, title: "Fabric-aware care", text: "Items are sorted and treated according to fabric type, from cotton shirts to delicate occasion wear." },
  { icon: Building2, title: "Walk-in shop", text: "Talk to us in person about your items, stains or special handling before you leave them." },
];

export default function AboutPage() {
  return (
    <>
      <PageHero
        title="About MBZ"
        text={`${business.name} is a garment-care business operating from Suite 105, The Ruby Center, Aminu Kano Crescent, Wuse 2, Abuja.`}
      />

      <section className="container-x grid gap-12 py-6 lg:grid-cols-2">
        <div className="space-y-5 text-lg leading-relaxed text-slate-600">
          <p>
            We provide laundry and dry-cleaning services for residents, professionals and businesses in and around Wuse
            2 — one of Abuja&apos;s busiest commercial districts.
          </p>
          <p>
            Whether it&apos;s your weekly wash, a suit for an important meeting, native attire for an event or your
            household linen, bring it in and we&apos;ll take care of it.
          </p>
        </div>
        <div className="grid gap-4 sm:grid-cols-2">
          {points.map((p) => (
            <div key={p.title} className="rounded-2xl border border-slate-200 p-6">
              <p.icon className="h-6 w-6 text-brand-600" />
              <h2 className="mt-4 font-semibold text-slate-900">{p.title}</h2>
              <p className="mt-2 text-sm leading-relaxed text-slate-600">{p.text}</p>
            </div>
          ))}
        </div>
      </section>

      <CtaBand />
    </>
  );
}
