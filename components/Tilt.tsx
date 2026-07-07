"use client";

import { useId } from "react";
import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";

/* mouse-follow 3D tilt wrapper; opens like an FF menu window on first view
   and drifts idly afterwards (the float lives on the outer div so it can't
   fight framer-motion's transform) */
export default function Tilt({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) {
  const x = useMotionValue(0.5);
  const y = useMotionValue(0.5);
  const rotateX = useSpring(useTransform(y, [0, 1], [4, -4]), {
    stiffness: 150,
    damping: 20,
  });
  const rotateY = useSpring(useTransform(x, [0, 1], [-4, 4]), {
    stiffness: 150,
    damping: 20,
  });

  /* stable per-instance float offset so panels don't bob in unison */
  const id = useId();
  const seed = [...id].reduce((a, c) => a + c.charCodeAt(0), 0) % 55;

  return (
    <div className="idle-float" style={{ animationDelay: `-${seed / 10}s` }}>
      <motion.div
        className={className}
        initial={{ opacity: 0, scaleY: 0.04 }}
        whileInView={{ opacity: 1, scaleY: 1 }}
        viewport={{ once: true, amount: 0.2 }}
        transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
        style={{ rotateX, rotateY, transformPerspective: 900 }}
        onMouseMove={(e) => {
          const r = e.currentTarget.getBoundingClientRect();
          x.set((e.clientX - r.left) / r.width);
          y.set((e.clientY - r.top) / r.height);
        }}
        onMouseLeave={() => {
          x.set(0.5);
          y.set(0.5);
        }}
      >
        {children}
      </motion.div>
    </div>
  );
}
