"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { popIn, stagger } from "./motion";
import StatBar from "./StatBar";
import Tilt from "./Tilt";

const contacts = [
  { label: "+62 856 2700 888", href: "tel:+628562700888" },
  { label: "tandianfelix13@gmail.com", href: "mailto:tandianfelix13@gmail.com" },
  { label: "linkedin.com/in/felixtandian", href: "https://linkedin.com/in/felixtandian" },
  { label: "github.com/felixtandian", href: "https://github.com/felixtandian" },
];

const NAME = "FELIX TANDIAN";
const SUBTITLE = "Lv.28 · Frontend & Mobile App Developer";
const TOTAL = NAME.length + SUBTITLE.length;

/* JRPG dialog: the text types itself out, then a gold cursor blinks */
function DialogText() {
  const [n, setN] = useState(0);

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      setN(TOTAL);
      return;
    }
    let id: ReturnType<typeof setInterval>;
    /* wait for the window-open wipe before typing */
    const start = setTimeout(() => {
      let c = 0;
      id = setInterval(() => {
        c += 1;
        setN(c);
        if (c >= TOTAL) clearInterval(id);
      }, 45);
    }, 500);
    return () => {
      clearTimeout(start);
      clearInterval(id);
    };
  }, []);

  const nameLen = Math.min(n, NAME.length);
  const subLen = Math.max(0, n - NAME.length);
  const done = n >= TOTAL;

  return (
    <div aria-label={`${NAME} — ${SUBTITLE}`} className="relative">
      <h1
        aria-hidden
        className="sky-ink font-display text-[clamp(1.25rem,4.5vw,2.5rem)] leading-relaxed text-gold"
      >
        {NAME.slice(0, nameLen)}
        {!done && nameLen < NAME.length && <span className="blink">_</span>}
      </h1>
      <p aria-hidden className="mt-4 min-h-[1.5em] text-sm text-stone-200 sm:text-base">
        {SUBTITLE.slice(0, subLen)}
        {!done && subLen > 0 && <span className="blink">_</span>}
      </p>
      {done && (
        <span aria-hidden className="blink absolute -bottom-1 right-0 text-gold">
          ▶
        </span>
      )}
    </div>
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
        className="sky-ink font-display text-[10px] text-gold/80"
      >
        ⚔ CHARACTER SHEET ⚔
      </motion.p>

      <div className="w-full max-w-xl">
        <Tilt className="panel px-6 py-6 sm:px-8">
          <DialogText />
        </Tilt>
      </div>

      <div className="w-full max-w-xl">
        <Tilt className="panel p-6 sm:p-8">
          <div className="flex flex-col gap-3">
            <StatBar label="HP" value={10} color="bg-hp" note="100" />
            <StatBar label="XP" value={8} color="bg-gold" note="6 yrs" />
          </div>
          <ul className="mt-6 flex flex-col items-center gap-2 text-sm text-stone-400 sm:flex-row sm:flex-wrap sm:justify-center sm:gap-x-6 sm:gap-y-2">
            {contacts.map((c) => (
              <li key={c.label}>
                <a href={c.href} className="transition-colors hover:text-gold">
                  {c.label}
                </a>
              </li>
            ))}
          </ul>
        </Tilt>
      </div>

      <motion.div variants={popIn} className="mt-2 flex flex-wrap justify-center gap-4">
        <motion.a
          href="#skills"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className="sky-ink inline-block rounded-md border-2 border-stone-100/60 bg-[#141f5c]/70 px-6 py-3 font-display text-[11px] text-stone-100 transition-colors hover:border-gold hover:text-gold"
        >
          VIEW QUEST LOG
        </motion.a>
        <motion.a
          href="/resume.pdf"
          download="Felix-Tandian-Resume.pdf"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className="sky-ink inline-block rounded-md border-2 border-stone-100/40 px-6 py-3 font-display text-[11px] text-stone-200 transition-colors hover:border-gold hover:text-gold"
        >
          DOWNLOAD RESUME
        </motion.a>
      </motion.div>
    </motion.header>
  );
}
