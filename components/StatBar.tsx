"use client";

import { useEffect, useRef, useState } from "react";
import { motion, useInView } from "framer-motion";

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
  const text = String(note ?? value);
  const target = parseInt(text, 10);
  const suffix = text.replace(/^\d+/, "");

  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true });
  const [shown, setShown] = useState(0);

  /* number counts up alongside the bar fill */
  useEffect(() => {
    if (!inView || Number.isNaN(target)) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      setShown(target);
      return;
    }
    const steps = 18;
    let s = 0;
    const id = setInterval(() => {
      s += 1;
      setShown(Math.round((target * s) / steps));
      if (s >= steps) clearInterval(id);
    }, 50);
    return () => clearInterval(id);
  }, [inView, target]);

  return (
    <div ref={ref} className="group relative flex items-center gap-3">
      {tooltip && (
        <div className="pointer-events-none absolute -top-9 left-1/2 z-10 -translate-x-1/2 whitespace-nowrap rounded border border-gold/60 bg-[#0a1445] px-3 py-1.5 text-xs text-stone-100 opacity-0 shadow-lg transition-opacity duration-200 group-hover:opacity-100">
          {tooltip}
        </div>
      )}
      <span className="w-24 shrink-0 text-sm text-stone-300 sm:w-28">{label}</span>
      <div className="h-3 flex-1 overflow-hidden rounded-sm border border-gold/30 bg-gold/15">
        <motion.div
          className={`relative h-full ${color}`}
          initial={{ width: 0 }}
          whileInView={{ width: `${value * 10}%` }}
          viewport={{ once: true }}
          transition={{ type: "spring", stiffness: 60, damping: 18 }}
        >
          <span className="bar-shimmer" />
        </motion.div>
      </div>
      <span className="w-14 shrink-0 text-right font-display text-[10px] text-amber">
        {Number.isNaN(target) ? text : `${shown}${suffix}`}
      </span>
    </div>
  );
}
