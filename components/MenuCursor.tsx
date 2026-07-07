"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";

/* one gold ▶ that jumps to whatever link/button you hover, FF-menu style */
export default function MenuCursor() {
  const [pos, setPos] = useState<{ x: number; y: number } | null>(null);

  useEffect(() => {
    /* hover-capable pointers only; touch gets nothing */
    if (!window.matchMedia("(hover: hover)").matches) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const over = (e: MouseEvent) => {
      const t = (e.target as Element).closest?.("a, button");
      if (!t) {
        setPos(null);
        return;
      }
      /* ponytail: position captured at hover time; drifts if you scroll
         while hovering — re-hover corrects it */
      const r = t.getBoundingClientRect();
      setPos({ x: r.left - 16, y: r.top + r.height / 2 - 8 });
    };
    document.addEventListener("mouseover", over);
    return () => document.removeEventListener("mouseover", over);
  }, []);

  if (!pos) return null;
  return (
    <motion.span
      aria-hidden
      initial={false}
      animate={{ x: pos.x, y: pos.y }}
      transition={{ type: "spring", stiffness: 500, damping: 32 }}
      className="sky-ink blink pointer-events-none fixed left-0 top-0 z-50 font-display text-[10px] text-gold"
    >
      ▶
    </motion.span>
  );
}
