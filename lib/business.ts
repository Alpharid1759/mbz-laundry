export const business = {
  name: "MBZ Laundry and Dry Cleaning Services",
  shortName: "MBZ Laundry",
  tagline: "Laundry & dry cleaning in the heart of Wuse 2",
  phoneDisplay: "0816 001 4156",
  phoneTel: "+2348160014156",
  whatsapp: process.env.NEXT_PUBLIC_WHATSAPP_NUMBER || "2348160014156",
  address: {
    line1: "Suite 105, The Ruby Center",
    line2: "Aminu Kano Crescent, Wuse 2",
    city: "Abuja",
    postcode: "904101",
    region: "Federal Capital Territory",
    country: "Nigeria",
  },
  mapsQuery:
    "MBZ Laundry and Dry Cleaning Services, Suite 105, The Ruby Center, Aminu Kano Cres, Wuse 2, Abuja",
  siteUrl: process.env.NEXT_PUBLIC_SITE_URL || "https://mbz-laundry.vercel.app",
} as const;

export const fullAddress = `${business.address.line1}, ${business.address.line2}, ${business.address.city} ${business.address.postcode}, ${business.address.region}, ${business.address.country}`;

export const directionsUrl = `https://www.google.com/maps/dir/?api=1&destination=${encodeURIComponent(
  business.mapsQuery
)}`;

export const mapEmbedUrl = `https://www.google.com/maps?q=${encodeURIComponent(
  business.mapsQuery
)}&output=embed`;

export function whatsappLink(message?: string) {
  const base = `https://wa.me/${business.whatsapp}`;
  return message ? `${base}?text=${encodeURIComponent(message)}` : base;
}

export type DayHours = { day: string; open: string | null; close: string | null };

export const hours: DayHours[] = [
  { day: "Monday", open: "08:00", close: "19:00" },
  { day: "Tuesday", open: "08:00", close: "19:00" },
  { day: "Wednesday", open: "08:00", close: "19:00" },
  { day: "Thursday", open: "08:00", close: "19:00" },
  { day: "Friday", open: "08:00", close: "19:00" },
  { day: "Saturday", open: "08:00", close: "19:00" },
  { day: "Sunday", open: null, close: null },
];

export function formatTime(t: string) {
  const [h, m] = t.split(":").map(Number);
  const suffix = h >= 12 ? "PM" : "AM";
  const hr = h % 12 === 0 ? 12 : h % 12;
  return `${hr}:${m.toString().padStart(2, "0")} ${suffix}`;
}

export const services = [
  {
    slug: "wash-and-fold",
    title: "Laundry (Wash & Fold)",
    summary: "Everyday clothing washed, dried and neatly folded, ready to pack away.",
    details: [
      "Shirts, trousers, casual wear and everyday items",
      "Sorted by colour and fabric before washing",
      "Returned folded and bagged",
    ],
  },
  {
    slug: "dry-cleaning",
    title: "Dry Cleaning",
    summary: "Careful cleaning for suits, native wear, dresses and fabrics that shouldn't go in a machine.",
    details: [
      "Suits, blazers and corporate wear",
      "Agbada, kaftans and other native attire",
      "Gowns, dresses and occasion wear",
    ],
  },
  {
    slug: "ironing",
    title: "Ironing & Pressing",
    summary: "Crisp, wrinkle-free finishing so your clothes are ready to wear straight off the hanger.",
    details: [
      "Shirts and blouses pressed and hung",
      "Trousers creased properly",
      "Available on its own or with washing",
    ],
  },
  {
    slug: "household",
    title: "Household Items",
    summary: "Bedding, towels, curtains and other larger household fabrics.",
    details: [
      "Bedsheets, duvets and pillowcases",
      "Towels and table linen",
      "Curtains and drapes",
    ],
  },
] as const;

export const serviceOptions = services.map((s) => s.title);
