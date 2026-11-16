# MBZ Laundry and Dry Cleaning Services

Website for MBZ Laundry and Dry Cleaning Services — Suite 105, The Ruby Center, Aminu Kano Crescent, Wuse 2, Abuja.

Built with Next.js (App Router), TypeScript and Tailwind CSS.

## Features

- Home, Services, About, Book and Contact pages
- Live "open now / closed" status (Africa/Lagos time)
- Booking form (drop-off or pickup) with server-side validation — `POST /api/bookings`
- Contact form — `POST /api/contact`
- Optional email delivery via Resend; WhatsApp prefilled-message fallback
- Google Maps embed and directions link
- SEO: metadata, sitemap, robots, LocalBusiness JSON-LD

## Development

```bash
npm install
npm run dev
```

## Environment variables

See `.env.example`. All are optional:

| Variable | Purpose |
| --- | --- |
| `RESEND_API_KEY` | Resend API key for email notifications |
| `BOOKING_TO_EMAIL` | Inbox(es) that receive bookings/messages (comma-separated) |
| `BOOKING_FROM_EMAIL` | Sender address (must be a verified Resend domain) |
| `NEXT_PUBLIC_WHATSAPP_NUMBER` | WhatsApp number, digits only (default `2348160014156`) |
| `NEXT_PUBLIC_SITE_URL` | Production URL for sitemap/metadata |

Without Resend configured, submissions open WhatsApp with a prefilled message instead.

## Deploy

Import the repo on [Vercel](https://vercel.com/new) — no extra configuration needed.
