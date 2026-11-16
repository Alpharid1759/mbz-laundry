"use client";

import { useEffect, useState } from "react";
import { formatTime, hours } from "@/lib/business";

function lagosNow() {
  const parts = new Intl.DateTimeFormat("en-GB", {
    timeZone: "Africa/Lagos",
    weekday: "long",
    hour: "2-digit",
    minute: "2-digit",
    hour12: false,
  }).formatToParts(new Date());
  const get = (t: string) => parts.find((p) => p.type === t)?.value ?? "";
  return { day: get("weekday"), minutes: Number(get("hour")) * 60 + Number(get("minute")) };
}

const toMin = (t: string) => {
  const [h, m] = t.split(":").map(Number);
  return h * 60 + m;
};

function computeStatus() {
  const { day, minutes } = lagosNow();
  const idx = hours.findIndex((h) => h.day === day);
  const today = hours[idx];

  if (today?.open && today.close && minutes >= toMin(today.open) && minutes < toMin(today.close)) {
    return { open: true, text: `Open now · until ${formatTime(today.close)}` };
  }

  if (today?.open && minutes < toMin(today.open)) {
    return { open: false, text: `Closed · opens ${formatTime(today.open)} today` };
  }

  for (let i = 1; i <= 7; i++) {
    const next = hours[(idx + i) % 7];
    if (next.open) {
      return { open: false, text: `Closed · opens ${next.day} ${formatTime(next.open)}` };
    }
  }
  return { open: false, text: "Closed" };
}

export default function OpenStatus({ className = "" }: { className?: string }) {
  const [status, setStatus] = useState<{ open: boolean; text: string } | null>(null);

  useEffect(() => {
    setStatus(computeStatus());
    const id = setInterval(() => setStatus(computeStatus()), 60_000);
    return () => clearInterval(id);
  }, []);

  if (!status) return <span className={`inline-block h-7 w-44 rounded-full bg-white/40 ${className}`} />;

  return (
    <span
      className={`inline-flex items-center gap-2 rounded-full px-3 py-1 text-xs font-semibold ${
        status.open ? "bg-emerald-50 text-emerald-700 ring-1 ring-emerald-200" : "bg-slate-100 text-slate-600 ring-1 ring-slate-200"
      } ${className}`}
    >
      <span className={`h-2 w-2 rounded-full ${status.open ? "bg-emerald-500" : "bg-slate-400"}`} />
      {status.text}
    </span>
  );
}
