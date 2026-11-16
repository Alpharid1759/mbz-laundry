import type { Metadata } from "next";
import { GeistSans } from "geist/font/sans";
import "./globals.css";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import FloatingWhatsApp from "@/components/FloatingWhatsApp";
import { business, hours } from "@/lib/business";

export const metadata: Metadata = {
  metadataBase: new URL(business.siteUrl),
  title: {
    default: `${business.name} | Wuse 2, Abuja`,
    template: `%s | ${business.shortName}`,
  },
  description:
    "Laundry, dry cleaning and ironing at The Ruby Center, Aminu Kano Crescent, Wuse 2, Abuja. Open Monday to Saturday, 8 AM – 7 PM.",
  openGraph: {
    title: business.name,
    description: "Laundry and dry cleaning in Wuse 2, Abuja.",
    type: "website",
    locale: "en_NG",
  },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "DryCleaningOrLaundry",
  name: business.name,
  telephone: business.phoneTel,
  url: business.siteUrl,
  address: {
    "@type": "PostalAddress",
    streetAddress: `${business.address.line1}, Aminu Kano Crescent`,
    addressLocality: "Wuse 2, Abuja",
    postalCode: business.address.postcode,
    addressRegion: business.address.region,
    addressCountry: "NG",
  },
  openingHoursSpecification: hours
    .filter((h) => h.open)
    .map((h) => ({
      "@type": "OpeningHoursSpecification",
      dayOfWeek: h.day,
      opens: h.open,
      closes: h.close,
    })),
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={GeistSans.variable}>
      <body className="flex min-h-screen flex-col">
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
        <Header />
        <main className="flex-1">{children}</main>
        <Footer />
        <FloatingWhatsApp />
      </body>
    </html>
  );
}
