import { NextResponse } from "next/server";
import { bookingSchema, toFieldErrors } from "@/lib/validation";
import { clientIp, makeReference, rateLimited, sendEmail } from "@/lib/server";
import { whatsappLink } from "@/lib/business";

export async function POST(req: Request) {
  if (rateLimited(clientIp(req))) {
    return NextResponse.json({ ok: false, error: "Too many requests. Please call us instead." }, { status: 429 });
  }

  let body: unknown;
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ ok: false, error: "Invalid request" }, { status: 400 });
  }

  const parsed = bookingSchema.safeParse(body);
  if (!parsed.success) {
    return NextResponse.json({ ok: false, errors: toFieldErrors(parsed.error) }, { status: 422 });
  }

  const d = parsed.data;
  if (d.website) return NextResponse.json({ ok: true, reference: makeReference("MBZ"), delivered: true });

  const reference = makeReference("MBZ");
  const methodLabel = d.method === "pickup" ? "Pickup from address" : "Drop-off at shop";

  const rows: [string, string][] = [
    ["Reference", reference],
    ["Name", d.name],
    ["Phone", d.phone],
    ["Email", d.email || "-"],
    ["Services", d.services.join(", ")],
    ["Method", methodLabel],
    ["Address", d.method === "pickup" ? d.address || "-" : "-"],
    ["Preferred date", d.date],
    ["Notes", d.notes || "-"],
  ];

  const delivered = await sendEmail(`New booking ${reference} — ${d.name}`, rows, d.email || undefined);

  const message = [
    `Hello MBZ Laundry, I'd like to book a service.`,
    `Ref: ${reference}`,
    `Name: ${d.name}`,
    `Phone: ${d.phone}`,
    `Services: ${d.services.join(", ")}`,
    `Method: ${methodLabel}`,
    d.method === "pickup" ? `Address: ${d.address}` : null,
    `Preferred date: ${d.date}`,
    d.notes ? `Notes: ${d.notes}` : null,
  ]
    .filter(Boolean)
    .join("\n");

  return NextResponse.json({ ok: true, reference, delivered, whatsappUrl: whatsappLink(message) });
}
