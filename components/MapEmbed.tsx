import { mapEmbedUrl } from "@/lib/business";

export default function MapEmbed({ className = "" }: { className?: string }) {
  return (
    <div className={`overflow-hidden rounded-2xl border border-slate-200 bg-slate-100 ${className}`}>
      <iframe
        title="MBZ Laundry location map"
        src={mapEmbedUrl}
        className="h-full min-h-72 w-full"
        loading="lazy"
        referrerPolicy="no-referrer-when-downgrade"
      />
    </div>
  );
}
