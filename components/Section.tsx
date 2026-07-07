"use client";

import { motion } from "framer-motion";
import { letterContainer, letterPop } from "./motion";

export default function Section({
  id,
  title,
  children,
}: {
  id: string;
  title: string;
  children: React.ReactNode;
}) {
  return (
    <section id={id} className="mx-auto w-full max-w-4xl px-4 py-16 sm:py-20">
      <motion.h2
        variants={letterContainer}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.6 }}
        aria-label={title}
        className="sky-ink mb-3 text-center font-display text-lg text-gold sm:text-xl"
      >
        {title.split("").map((ch, i) => (
          <motion.span
            key={i}
            variants={letterPop}
            aria-hidden
            className="inline-block"
          >
            {ch === " " ? " " : ch}
          </motion.span>
        ))}
      </motion.h2>
      <p className="mb-10 text-center text-stone-400">— ❖ —</p>
      {children}
    </section>
  );
}
