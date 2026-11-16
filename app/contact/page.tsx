import type { Metadata } from "next";
import { MapPin, MessageCircle, Phone } from "lucide-react";
import PageHero from "@/components/PageHero";
import ContactForm from "@/components/ContactForm";
import MapEmbed from "@/components/MapEmbed";
import { business, directionsUrl, fullAddress, whatsappLink } from "@/lib/business";

export const metadata: Metadata = {
  title: "Contact",
  description: `Contact ${business.name} — ${fullAddress}. Phone ${business.phoneDisplay}.`,
};

export default function ContactPage() {
  return (
    <>
      <PageHero title="Contact us" text="Questions about an item, pricing or turnaround? Send a message or give us a call." />
      <section className="container-x grid gap-10 pb-12 lg:grid-cols-2">
        <ContactForm />
        <div className="space-y-4">
          <a href={`tel:${business.phoneTel}`} className="flex items-center gap-4 rounded-2xl border border-slate-200 p-5 hover:border-brand-200">
            <span className="grid h-11 w-11 place-items-center rounded-xl bg-brand-50 text-brand-600">
              <Phone className="h-5 w-5" />
            </span>
            <span>
              <span className="block text-sm text-slate-500">Call</span>
              <span className="font-semibold text-slate-900">{business.phoneDisplay}</span>
            </span>
          </a>
          <a
            href={whatsappLink("Hello MBZ Laundry, I have an enquiry.")}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-4 rounded-2xl border border-slate-200 p-5 hover:border-emerald-200"
          >
            <span className="grid h-11 w-11 place-items-center rounded-xl bg-emerald-50 text-emerald-600">
              <MessageCircle className="h-5 w-5" />
            </span>
            <span>
              <span className="block text-sm text-slate-500">WhatsApp</span>
              <span className="font-semibold text-slate-900">Chat with us</span>
            </span>
          </a>
          <a
            href={directionsUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-4 rounded-2xl border border-slate-200 p-5 hover:border-brand-200"
          >
            <span className="grid h-11 w-11 place-items-center rounded-xl bg-brand-50 text-brand-600">
              <MapPin className="h-5 w-5" />
            </span>
            <span>
              <span className="block text-sm text-slate-500">Visit</span>
              <span className="font-semibold text-slate-900">{fullAddress}</span>
            </span>
          </a>
          <MapEmbed className="h-72" />
        </div>
      </section>
    </>
  );
}
