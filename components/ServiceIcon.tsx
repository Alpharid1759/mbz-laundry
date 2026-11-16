import { Shirt, Sparkles, Flame, BedDouble } from "lucide-react";

const icons = {
  "wash-and-fold": Shirt,
  "dry-cleaning": Sparkles,
  ironing: Flame,
  household: BedDouble,
} as const;

export default function ServiceIcon({ slug, className = "h-6 w-6" }: { slug: string; className?: string }) {
  const Icon = icons[slug as keyof typeof icons] ?? Shirt;
  return <Icon className={className} />;
}
