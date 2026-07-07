"use client";

import { useEffect, useState } from "react";
import { motion, useScroll } from "framer-motion";

const SECTIONS = ["skills", "experience", "education"];

/* scroll progress as an XP bar; entering a new section levels you up */
export default function XpBar() {
  const { scrollYProgress } = useScroll();
  const [flash, setFlash] = useState(0);

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const seen = new Set<string>();
    const ob = new IntersectionObserver(
      (entries) => {
        for (const e of entries) {
          if (e.isIntersecting && !seen.has(e.target.id)) {
            seen.add(e.target.id);
            setFlash((f) => f + 1);
          }
        }
      },
      { threshold: 0.25 }
    );
    for (const id of SECTIONS) {
      const el = document.getElementById(id);
      if (el) ob.observe(el);
    }
    return () => ob.disconnect();
  }, []);

  return (
    <div aria-hidden className="fixed inset-x-0 top-0 z-50 h-1 bg-white/10">
      <motion.div
        className="h-full origin-left bg-gold"
        style={{ scaleX: scrollYProgress, boxShadow: "0 0 8px rgb(255 213 74 / 0.8)" }}
      />
      {flash > 0 && (
        <motion.span
          key={flash}
          animate={{ opacity: [0, 1, 1, 0], y: [6, 0, 0, -6] }}
          transition={{ duration: 1.5, times: [0, 0.15, 0.8, 1] }}
          className="sky-ink absolute right-3 top-2 font-display text-[9px] text-gold"
        >
          ✦ LEVEL UP!
        </motion.span>
      )}
    </div>
  );
}
