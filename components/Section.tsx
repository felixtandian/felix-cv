"use client";

import { motion } from "framer-motion";
import { slideIn } from "./motion";

export default function Section({
  id,
  title,
  from = "bottom",
  children,
}: {
  id: string;
  title: string;
  from?: "left" | "right" | "bottom";
  children: React.ReactNode;
}) {
  return (
    <motion.section
      id={id}
      variants={slideIn(from)}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.15 }}
      className="mx-auto w-full max-w-4xl px-4 py-16 sm:py-20"
    >
      <h2 className="mb-2 text-center font-display text-2xl font-bold tracking-widest text-gold sm:text-3xl">
        {title}
      </h2>
      <p className="mb-10 text-center text-gold/50">— ❖ —</p>
      {children}
    </motion.section>
  );
}
