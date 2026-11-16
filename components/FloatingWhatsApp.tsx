import { MessageCircle } from "lucide-react";
import { whatsappLink } from "@/lib/business";

export default function FloatingWhatsApp() {
  return (
    <a
      href={whatsappLink("Hello MBZ Laundry, I have an enquiry.")}
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Chat on WhatsApp"
      className="fixed right-5 bottom-5 z-50 grid h-14 w-14 place-items-center rounded-full bg-[#25D366] text-white shadow-lg shadow-black/20 transition hover:scale-105"
    >
      <MessageCircle className="h-7 w-7" />
    </a>
  );
}
