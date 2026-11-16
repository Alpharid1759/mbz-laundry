import Link from "next/link";
import { ArrowRight, CalendarCheck, MapPin, Phone, ShoppingBag, Sparkles, Truck } from "lucide-react";
import { business, directionsUrl, formatTime, hours, services } from "@/lib/business";
import OpenStatus from "@/components/OpenStatus";
import SectionHeading from "@/components/SectionHeading";
import ServiceIcon from "@/components/ServiceIcon";
import MapEmbed from "@/components/MapEmbed";
import CtaBand from "@/components/CtaBand";

const steps = [
  { icon: CalendarCheck, title: "Book", text: "Fill the short booking form or call us to tell us what you need cleaned." },
  { icon: ShoppingBag, title: "Drop off", text: "Bring your items to Suite 105, The Ruby Center — or request a pickup." },
  { icon: Sparkles, title: "We clean", text: "Your garments are sorted, cleaned and finished according to fabric." },
  { icon: Truck, title: "Collect", text: "We let you know when your order is ready for collection." },
];

export default function HomePage() {
  return (
    <>
      <section className="relative overflow-hidden bg-gradient-to-br from-brand-50 via-white to-brand-100/60">
        <div className="pointer-events-none absolute -top-24 -right-24 h-96 w-96 rounded-full bg-brand-200/50 blur-3xl" />
        <div className="pointer-events-none absolute -bottom-32 -left-20 h-80 w-80 rounded-full bg-mint-400/20 blur-3xl" />
        <div className="container-x relative grid items-center gap-12 py-16 sm:py-24 lg:grid-cols-2">
          <div>
            <OpenStatus />
            <h1 className="mt-5 text-4xl font-bold tracking-tight text-slate-900 sm:text-5xl lg:text-6xl">
              Clean clothes, <span className="text-brand-600">without the hassle.</span>
            </h1>
            <p className="mt-5 max-w-xl text-lg leading-relaxed text-slate-600">
              {business.name} — laundry, dry cleaning and ironing from The Ruby Center on Aminu Kano Crescent, Wuse 2,
              Abuja.
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <Link href="/book" className="btn-primary px-6 py-3 text-base">
                Book a service <ArrowRight className="h-4 w-4" />
              </Link>
              <a href={`tel:${business.phoneTel}`} className="btn-outline px-6 py-3 text-base">
                <Phone className="h-4 w-4" /> Call {business.phoneDisplay}
              </a>
            </div>
            <a
              href={directionsUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-6 inline-flex items-center gap-2 text-sm text-slate-600 hover:text-brand-700"
            >
              <MapPin className="h-4 w-4 text-brand-600" />
              {business.address.line1}, {business.address.line2}
            </a>
          </div>

          <div className="relative">
            <div className="rounded-3xl border border-white/70 bg-white/80 p-6 shadow-xl shadow-brand-900/5 backdrop-blur sm:p-8">
              <h2 className="text-lg font-semibold text-slate-900">What we handle</h2>
              <ul className="mt-5 grid gap-3 sm:grid-cols-2">
                {services.map((s) => (
                  <li key={s.slug} className="flex items-start gap-3 rounded-2xl bg-slate-50 p-4">
                    <span className="grid h-10 w-10 shrink-0 place-items-center rounded-xl bg-brand-100 text-brand-700">
                      <ServiceIcon slug={s.slug} className="h-5 w-5" />
                    </span>
                    <span className="text-sm font-medium text-slate-800">{s.title}</span>
                  </li>
                ))}
              </ul>
              <div className="mt-6 rounded-2xl bg-brand-900 p-5 text-sm text-slate-200">
                <p className="font-semibold text-white">Opening hours</p>
                <p className="mt-1">Monday – Saturday: 8:00 AM – 7:00 PM</p>
                <p>Sunday: Closed</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="container-x py-20">
        <SectionHeading
          eyebrow="Services"
          title="Garment care for everyday and special wear"
          text="From your work shirts to your occasion outfits and household linen."
        />
        <div className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {services.map((s) => (
            <div key={s.slug} className="group rounded-2xl border border-slate-200 p-6 transition hover:-translate-y-0.5 hover:border-brand-200 hover:shadow-lg hover:shadow-brand-900/5">
              <span className="grid h-12 w-12 place-items-center rounded-xl bg-brand-50 text-brand-600 group-hover:bg-brand-600 group-hover:text-white">
                <ServiceIcon slug={s.slug} />
              </span>
              <h3 className="mt-5 font-semibold text-slate-900">{s.title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-slate-600">{s.summary}</p>
            </div>
          ))}
        </div>
        <Link href="/services" className="mt-8 inline-flex items-center gap-1.5 text-sm font-semibold text-brand-700 hover:gap-2.5">
          See all services <ArrowRight className="h-4 w-4" />
        </Link>
      </section>

      <section className="bg-slate-50 py-20">
        <div className="container-x">
          <SectionHeading eyebrow="How it works" title="Four simple steps" center />
          <ol className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {steps.map((step, i) => (
              <li key={step.title} className="relative rounded-2xl bg-white p-6 shadow-sm ring-1 ring-slate-200">
                <span className="absolute top-5 right-5 text-4xl font-bold text-slate-100">{i + 1}</span>
                <step.icon className="h-7 w-7 text-brand-600" />
                <h3 className="mt-4 font-semibold text-slate-900">{step.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-slate-600">{step.text}</p>
              </li>
            ))}
          </ol>
        </div>
      </section>

      <section className="container-x grid gap-10 py-20 lg:grid-cols-2">
        <div>
          <SectionHeading
            eyebrow="Find us"
            title="Right in Wuse 2"
            text="We're inside The Ruby Center on Aminu Kano Crescent, surrounded by the shops and offices of one of Abuja's busiest commercial districts."
          />
          <dl className="mt-8 space-y-5 text-sm">
            <div className="flex gap-3">
              <MapPin className="mt-0.5 h-5 w-5 text-brand-600" />
              <div>
                <dt className="font-semibold text-slate-900">Address</dt>
                <dd className="mt-1 text-slate-600">
                  {business.address.line1}
                  <br />
                  {business.address.line2}, {business.address.city} {business.address.postcode}
                </dd>
              </div>
            </div>
            <div className="flex gap-3">
              <Phone className="mt-0.5 h-5 w-5 text-brand-600" />
              <div>
                <dt className="font-semibold text-slate-900">Phone</dt>
                <dd className="mt-1">
                  <a href={`tel:${business.phoneTel}`} className="text-slate-600 hover:text-brand-700">
                    {business.phoneDisplay}
                  </a>
                </dd>
              </div>
            </div>
          </dl>
          <div className="mt-6 overflow-hidden rounded-2xl ring-1 ring-slate-200">
            <table className="w-full text-sm">
              <tbody>
                {hours.map((h) => (
                  <tr key={h.day} className="border-b border-slate-100 last:border-0">
                    <td className="px-4 py-2.5 font-medium text-slate-800">{h.day}</td>
                    <td className="px-4 py-2.5 text-right text-slate-600">
                      {h.open && h.close ? `${formatTime(h.open)} – ${formatTime(h.close)}` : "Closed"}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <a href={directionsUrl} target="_blank" rel="noopener noreferrer" className="btn-primary mt-6">
            Get directions
          </a>
        </div>
        <MapEmbed className="h-full min-h-96" />
      </section>

      <CtaBand />
    </>
  );
}
