"use client";

import { motion } from "framer-motion";
import Section from "./Section";
import StatBar from "./StatBar";
import { popIn, stagger } from "./motion";

const stats = [
  { label: "Flutter", value: 9 },
  { label: "Dart", value: 9 },
  { label: "Java", value: 7 },
  { label: "JavaScript", value: 7 },
  { label: "SQL", value: 7 },
  { label: "Firebase", value: 8 },
  { label: "Next.js", value: 5 },
  { label: "TypeScript", value: 5 },
  { label: "Prisma", value: 5 },
  { label: "PostgreSQL", value: 5 },
  { label: "Docker", value: 5 },
  { label: "Git", value: 8 },
  { label: "C", value: 6 },
  { label: "C#", value: 6 },
];

const traits = ["Operating Systems", "iOS App Development", "Android App Development"];

export default function Skills() {
  return (
    <Section id="skills" title="STATS & ABILITIES" from="left">
      <div className="panel p-6 sm:p-8">
        <div className="flex flex-col gap-3">
          {stats.map((s) => (
            <StatBar key={s.label} label={s.label} value={s.value} />
          ))}
        </div>

        <p className="mt-8 text-center font-display text-sm tracking-widest text-gold/70">
          PASSIVE TRAITS
        </p>
        <motion.ul
          variants={stagger}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.3 }}
          className="mt-4 flex flex-wrap justify-center gap-3"
        >
          {traits.map((t) => (
            <motion.li
              key={t}
              variants={popIn}
              className="border border-gold/40 bg-black/30 px-4 py-2 text-sm text-stone-300"
            >
              ✦ {t}
            </motion.li>
          ))}
        </motion.ul>
      </div>
    </Section>
  );
}
