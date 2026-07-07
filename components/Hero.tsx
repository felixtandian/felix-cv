"use client";

import { motion, type Variants } from "framer-motion";
import { popIn, stagger } from "./motion";
import StatBar from "./StatBar";
import Tilt from "./Tilt";

const contacts = [
  { label: "+62 856 2700 888", href: "tel:+628562700888" },
  { label: "tandianfelix13@gmail.com", href: "mailto:tandianfelix13@gmail.com" },
  { label: "linkedin.com/in/felixtandian", href: "https://linkedin.com/in/felixtandian" },
];

/* game-title-card reveal: letters spring in one by one */
const letterContainer: Variants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.05, delayChildren: 0.15 } },
};

const letter: Variants = {
  hidden: { opacity: 0, y: 50, scale: 0.7 },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: { type: "spring", stiffness: 300, damping: 20 },
  },
};

function TitleName({ text }: { text: string }) {
  return (
    <motion.h1
      variants={letterContainer}
      className="torch-glow text-center font-display text-[clamp(3rem,11vw,7.5rem)] font-bold leading-none tracking-wide text-amber"
      aria-label={text}
    >
      {text.split(" ").map((word) => (
        <span
          key={word}
          className="mr-[0.3em] inline-block whitespace-nowrap last:mr-0"
        >
          {word.split("").map((ch, i) => (
            <motion.span key={i} variants={letter} className="inline-block">
              {ch}
            </motion.span>
          ))}
        </span>
      ))}
    </motion.h1>
  );
}

export default function Hero() {
  return (
    <motion.header
      variants={stagger}
      initial="hidden"
      animate="visible"
      className="relative flex min-h-screen flex-col items-center justify-center gap-6 overflow-hidden px-4"
    >
      <motion.p
        variants={popIn}
        className="font-display text-sm tracking-[0.3em] text-gold/70"
      >
        ⚔ CHARACTER SHEET ⚔
      </motion.p>

      <TitleName text="FELIX TANDIAN" />

      <motion.p variants={popIn} className="text-gold/50">
        ───── ❖ ─────
      </motion.p>

      <motion.p
        variants={popIn}
        className="text-center font-display text-base tracking-wider text-stone-300 sm:text-xl"
      >
        Lv.28 · Frontend & Mobile App Developer
      </motion.p>

      <motion.div variants={popIn} className="mt-4 w-full max-w-xl">
        <Tilt className="panel p-6 sm:p-8">
          <div className="flex flex-col gap-3">
            <StatBar label="HP" value={10} color="bg-hp" note="100" />
            <StatBar label="XP" value={8} color="bg-gold" note="6 yrs" />
          </div>
          <ul className="mt-6 flex flex-col items-center gap-2 text-sm text-stone-400 sm:flex-row sm:justify-center sm:gap-6">
            {contacts.map((c) => (
              <li key={c.label}>
                <a href={c.href} className="transition-colors hover:text-amber">
                  {c.label}
                </a>
              </li>
            ))}
          </ul>
        </Tilt>
      </motion.div>

      <motion.div variants={popIn} className="mt-4 flex flex-wrap justify-center gap-4">
        <motion.a
          href="#skills"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className="inline-block border border-gold/60 bg-gold/10 px-8 py-3 font-display text-sm tracking-widest text-amber transition-colors hover:bg-gold/20"
        >
          ▶ VIEW QUEST LOG
        </motion.a>
        <motion.a
          href="/resume.pdf"
          download="Felix-Tandian-Resume.pdf"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className="inline-block border border-gold/40 px-8 py-3 font-display text-sm tracking-widest text-stone-300 transition-colors hover:border-gold/70 hover:text-amber"
        >
          📜 DOWNLOAD RESUME
        </motion.a>
      </motion.div>
    </motion.header>
  );
}
