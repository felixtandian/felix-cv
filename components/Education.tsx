"use client";

import { motion } from "framer-motion";
import Section from "./Section";
import Tilt from "./Tilt";
import { popIn, stagger } from "./motion";

const coursework = [
  "Data Structures & Algorithms",
  "Artificial Intelligence",
  "Mobile App Development",
  "UX/UI",
  "OOP",
  "Database",
  "Networking",
];

export default function Education() {
  return (
    <Section id="education" title="TRAINING GROUNDS">
      <Tilt className="panel p-6 text-center sm:p-8">
        <p className="font-display text-xs leading-relaxed text-stone-100 sm:text-sm">
          UNIVERSITY OF BINA NUSANTARA
        </p>
        <p className="mt-2 text-sm text-stone-400">
          Master of Information Technology · Bachelor of Computer Science (2021)
        </p>

        <p className="mt-8 font-display text-[10px] text-gold/80">
          ABILITIES LEARNED
        </p>
        <motion.ul
          variants={stagger}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.3 }}
          className="mt-4 flex flex-wrap justify-center gap-3"
        >
          {coursework.map((c) => (
            <motion.li
              key={c}
              variants={popIn}
              className="border border-gold/40 bg-gold/10 px-4 py-2 text-sm text-stone-300"
            >
              ✦ {c}
            </motion.li>
          ))}
        </motion.ul>
      </Tilt>
    </Section>
  );
}
