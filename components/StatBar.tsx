"use client";

import { motion } from "framer-motion";

export default function StatBar({
  label,
  value, // 0–10
  color = "bg-gold",
  note,
  tooltip,
}: {
  label: string;
  value: number;
  color?: string;
  note?: string;
  tooltip?: string;
}) {
  return (
    <div className="group relative flex items-center gap-3">
      {tooltip && (
        <div className="pointer-events-none absolute -top-9 left-1/2 z-10 -translate-x-1/2 whitespace-nowrap border border-gold/50 bg-[#e7daab] px-3 py-1.5 text-xs text-amber opacity-0 shadow-lg transition-opacity duration-200 group-hover:opacity-100">
          {tooltip}
        </div>
      )}
      <span className="w-24 shrink-0 text-sm text-stone-300 sm:w-28">{label}</span>
      <div className="h-3 flex-1 overflow-hidden rounded-sm border border-gold/30 bg-gold/15">
        <motion.div
          className={`h-full ${color}`}
          initial={{ width: 0 }}
          whileInView={{ width: `${value * 10}%` }}
          viewport={{ once: true }}
          transition={{ type: "spring", stiffness: 60, damping: 18 }}
        />
      </div>
      <span className="w-10 shrink-0 text-right font-display text-sm text-amber">
        {note ?? value}
      </span>
    </div>
  );
}
