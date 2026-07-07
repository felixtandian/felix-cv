"use client";

import { motion } from "framer-motion";

export default function StatBar({
  label,
  value, // 0–10
  color = "bg-gold",
  note,
}: {
  label: string;
  value: number;
  color?: string;
  note?: string;
}) {
  return (
    <div className="flex items-center gap-3">
      <span className="w-24 shrink-0 text-sm text-stone-300 sm:w-28">{label}</span>
      <div className="h-3 flex-1 overflow-hidden rounded-sm border border-gold/30 bg-black/50">
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
