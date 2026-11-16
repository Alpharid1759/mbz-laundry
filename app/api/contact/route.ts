import { NextResponse } from "next/server";
import { contactSchema, toFieldErrors } from "@/lib/validation";
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

  const parsed = contactSchema.safeParse(body);
  if (!parsed.success) {
    return NextResponse.json({ ok: false, errors: toFieldErrors(parsed.error) }, { status: 422 });
  }

  const d = parsed.data;
  if (d.website) return NextResponse.json({ ok: true, delivered: true });

  const reference = makeReference("MSG");
  const delivered = await sendEmail(
    `Website message ${reference} — ${d.name}`,
    [
      ["Reference", reference],
      ["Name", d.name],
      ["Phone", d.phone],
      ["Email", d.email || "-"],
      ["Message", d.message],
    ],
    d.email || undefined
  );

  const message = `Hello MBZ Laundry, my name is ${d.name} (${d.phone}).\n\n${d.message}`;

  return NextResponse.json({ ok: true, reference, delivered, whatsappUrl: whatsappLink(message) });
}
