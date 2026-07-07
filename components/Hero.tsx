"use client";

import { motion } from "framer-motion";
import { popIn, stagger } from "./motion";
import StatBar from "./StatBar";

const contacts = [
  { label: "+62 856 2700 888", href: "tel:+628562700888" },
  { label: "tandianfelix13@gmail.com", href: "mailto:tandianfelix13@gmail.com" },
  { label: "linkedin.com/in/felixtandian", href: "https://linkedin.com/in/felixtandian" },
];

export default function Hero() {
  return (
    <motion.header
      variants={stagger}
      initial="hidden"
      animate="visible"
      className="flex min-h-screen flex-col items-center justify-center px-4"
    >
      <motion.div variants={popIn} className="panel w-full max-w-2xl p-8 text-center sm:p-10">
        <p className="font-display text-sm tracking-[0.3em] text-gold/70">
          ⚔ CHARACTER SHEET ⚔
        </p>

        <h1 className="torch-glow mt-4 font-display text-3xl font-bold tracking-widest text-amber sm:text-5xl">
          FELIX TANDIAN
        </h1>

        <p className="mt-3 font-display text-sm tracking-wider text-stone-300 sm:text-base">
          Lv.28 · Frontend & Mobile App Developer
        </p>

        <div className="mx-auto mt-8 flex max-w-md flex-col gap-3 text-left">
          <StatBar label="HP" value={10} color="bg-hp" note="100" />
          <StatBar label="XP" value={8} color="bg-gold" note="6 yrs" />
        </div>

        <ul className="mt-8 flex flex-col items-center gap-2 text-sm text-stone-400 sm:flex-row sm:justify-center sm:gap-6">
          {contacts.map((c) => (
            <li key={c.label}>
              <a href={c.href} className="transition-colors hover:text-amber">
                {c.label}
              </a>
            </li>
          ))}
        </ul>

        <motion.a
          href="#skills"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className="mt-10 inline-block border border-gold/60 bg-gold/10 px-8 py-3 font-display text-sm tracking-widest text-amber transition-colors hover:bg-gold/20"
        >
          ▶ VIEW QUEST LOG
        </motion.a>
      </motion.div>
    </motion.header>
  );
}
