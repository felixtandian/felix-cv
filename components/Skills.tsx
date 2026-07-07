"use client";

import { motion } from "framer-motion";
import Section from "./Section";
import StatBar from "./StatBar";
import Tilt from "./Tilt";
import { popIn, stagger } from "./motion";

const stats = [
  { label: "Flutter", value: 9, tooltip: "5+ yrs · Indomarco & Tehnik Pompa apps" },
  { label: "Dart", value: 9, tooltip: "5+ yrs · every Flutter project" },
  { label: "Java", value: 7, tooltip: "Android apps · Material Design" },
  { label: "JavaScript", value: 7, tooltip: "Web projects & tooling" },
  { label: "SQL", value: 7, tooltip: "Relational schemas across projects" },
  { label: "Firebase", value: 8, tooltip: "Auth, sync & notifications at Indomarco" },
  { label: "Next.js", value: 5, tooltip: "Tehnik Pompa service management system" },
  { label: "TypeScript", value: 5, tooltip: "Tehnik Pompa service management system" },
  { label: "Prisma", value: 5, tooltip: "Tehnik Pompa service management system" },
  { label: "PostgreSQL", value: 5, tooltip: "Tehnik Pompa service management system" },
  { label: "Docker", value: 5, tooltip: "Tehnik Pompa service management system" },
  { label: "Git", value: 8, tooltip: "Every project since 2018" },
  { label: "C", value: 6, tooltip: "University coursework" },
  { label: "C#", value: 6, tooltip: "University coursework" },
];

const traits = ["Operating Systems", "iOS App Development", "Android App Development"];

export default function Skills() {
  return (
    <Section id="skills" title="STATS & ABILITIES" from="left">
      <Tilt className="panel p-6 sm:p-8">
        <div className="flex flex-col gap-3">
          {stats.map((s) => (
            <StatBar key={s.label} {...s} />
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
      </Tilt>
    </Section>
  );
}
