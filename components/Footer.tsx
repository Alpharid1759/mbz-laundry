import Link from "next/link";
import { MapPin, Phone, Clock } from "lucide-react";
import { business, directionsUrl, formatTime, hours } from "@/lib/business";
import Logo from "./Logo";

export default function Footer() {
  return (
    <footer className="bg-brand-900 text-slate-300">
      <div className="container-x grid gap-10 py-14 md:grid-cols-4">
        <div className="md:col-span-1">
          <Logo light />
          <p className="mt-4 text-sm leading-relaxed text-slate-400">
            Laundry and dry cleaning at The Ruby Center, Wuse 2, Abuja.
          </p>
        </div>

        <div>
          <h3 className="text-sm font-semibold text-white">Pages</h3>
          <ul className="mt-4 space-y-2 text-sm">
            {[
              ["/services", "Services"],
              ["/about", "About"],
              ["/book", "Book a service"],
              ["/contact", "Contact"],
            ].map(([href, label]) => (
              <li key={href}>
                <Link href={href} className="hover:text-white">
                  {label}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <h3 className="text-sm font-semibold text-white">Visit us</h3>
          <ul className="mt-4 space-y-3 text-sm">
            <li className="flex gap-2">
              <MapPin className="mt-0.5 h-4 w-4 shrink-0 text-mint-400" />
              <a href={directionsUrl} target="_blank" rel="noopener noreferrer" className="hover:text-white">
                {business.address.line1}
                <br />
                {business.address.line2}, {business.address.city}
              </a>
            </li>
            <li className="flex gap-2">
              <Phone className="mt-0.5 h-4 w-4 shrink-0 text-mint-400" />
              <a href={`tel:${business.phoneTel}`} className="hover:text-white">
                {business.phoneDisplay}
              </a>
            </li>
          </ul>
        </div>

        <div>
          <h3 className="flex items-center gap-2 text-sm font-semibold text-white">
            <Clock className="h-4 w-4 text-mint-400" /> Opening hours
          </h3>
          <ul className="mt-4 space-y-1.5 text-sm">
            {hours.map((h) => (
              <li key={h.day} className="flex justify-between gap-4">
                <span>{h.day}</span>
                <span className="text-slate-400">
                  {h.open && h.close ? `${formatTime(h.open)} – ${formatTime(h.close)}` : "Closed"}
                </span>
              </li>
            ))}
          </ul>
        </div>
      </div>
      <div className="border-t border-white/10">
        <div className="container-x py-5 text-xs text-slate-500">
          © {new Date().getFullYear()} {business.name}. All rights reserved.
        </div>
      </div>
    </footer>
  );
}
