export default function Logo({ light = false }: { light?: boolean }) {
  return (
    <span className="flex items-center gap-2.5">
      <span className="grid h-9 w-9 place-items-center rounded-xl bg-brand-600 text-sm font-bold tracking-tight text-white">
        MBZ
      </span>
      <span className="leading-tight">
        <span className={`block text-sm font-bold ${light ? "text-white" : "text-slate-900"}`}>MBZ Laundry</span>
        <span className={`block text-[11px] ${light ? "text-slate-300" : "text-slate-500"}`}>& Dry Cleaning</span>
      </span>
    </span>
  );
}
