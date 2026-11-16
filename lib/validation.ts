import { z } from "zod";

const phone = z
  .string()
  .trim()
  .min(7, "Enter a valid phone number")
  .max(20, "Enter a valid phone number")
  .regex(/^[+\d\s()-]+$/, "Enter a valid phone number");

export const bookingSchema = z.object({
  name: z.string().trim().min(2, "Enter your name").max(80),
  phone,
  email: z.union([z.literal(""), z.string().trim().email("Enter a valid email")]).optional(),
  services: z.array(z.string().min(1)).min(1, "Pick at least one service"),
  method: z.enum(["dropoff", "pickup"]),
  address: z.string().trim().max(200).optional(),
  date: z.string().trim().min(1, "Pick a date"),
  notes: z.string().trim().max(600).optional(),
  website: z.string().max(0).optional(),
}).refine((d) => d.method === "dropoff" || (d.address && d.address.length >= 5), {
  message: "Enter a pickup address",
  path: ["address"],
});

export type BookingInput = z.infer<typeof bookingSchema>;

export const contactSchema = z.object({
  name: z.string().trim().min(2, "Enter your name").max(80),
  phone,
  email: z.union([z.literal(""), z.string().trim().email("Enter a valid email")]).optional(),
  message: z.string().trim().min(5, "Write a short message").max(1000),
  website: z.string().max(0).optional(),
});

export type ContactInput = z.infer<typeof contactSchema>;

export type FieldErrors = Partial<Record<string, string>>;

export function toFieldErrors(error: z.ZodError): FieldErrors {
  const out: FieldErrors = {};
  for (const issue of error.issues) {
    const key = String(issue.path[0] ?? "form");
    if (!out[key]) out[key] = issue.message;
  }
  return out;
}
