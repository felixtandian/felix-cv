"use client";

import { motion } from "framer-motion";
import Section from "./Section";
import Sprite from "./Sprite";
import Tilt from "./Tilt";
import { popIn, stagger } from "./motion";

/* FF magic menu: abilities grouped by school, levels as pixel rockets
   (lv of 5) — hover an ability for the experience behind it */
const schools: { school: string; abilities: { name: string; lv: number; detail: string }[] }[] = [
  {
    school: "MOBILE",
    abilities: [
      { name: "Flutter", lv: 5, detail: "5+ yrs · Indomarco & client apps" },
      { name: "Dart", lv: 5, detail: "5+ yrs · every Flutter project" },
      { name: "Java", lv: 4, detail: "Android apps · Material Design" },
    ],
  },
  {
    school: "WEB",
    abilities: [
      { name: "Next.js", lv: 3, detail: "Service management system · project lead" },
      { name: "TypeScript", lv: 3, detail: "Service management system · project lead" },
      { name: "JavaScript", lv: 4, detail: "Web projects & tooling" },
    ],
  },
  {
    school: "DATA & INFRA",
    abilities: [
      { name: "Firebase", lv: 4, detail: "Auth, sync & notifications at Indomarco" },
      { name: "PostgreSQL", lv: 3, detail: "Service management system · project lead" },
      { name: "SQL", lv: 4, detail: "Relational schemas across projects" },
      { name: "Prisma", lv: 3, detail: "Service management system · project lead" },
      { name: "Docker", lv: 3, detail: "Service management system · project lead" },
    ],
  },
  {
    school: "TOOLS",
    abilities: [
      { name: "Git", lv: 4, detail: "Every project since 2018" },
      { name: "C", lv: 3, detail: "University coursework" },
      { name: "C#", lv: 3, detail: "University coursework" },
    ],
  },
];

/* launched rockets have a flame; unearned ones are dim silhouettes */
const rocketRows = ["..b..", ".bbb.", ".bwb.", ".bbb.", "bbbbb", ".f.f."];

function Rocket({ filled }: { filled: boolean }) {
  return (
    <Sprite
      rows={rocketRows}
      palette={
        filled
          ? { b: "#ffd54a", w: "#0a1445", f: "#ff7b00" }
          : { b: "#333f78", w: "#232b52", f: "transparent" }
      }
      px={2}
    />
  );
}

const traits = ["Operating Systems", "iOS App Development", "Android App Development"];

export default function Skills() {
  return (
    <Section id="skills" title="ABILITIES & TRAITS">
      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
        {schools.map((s) => (
          <Tilt key={s.school} className="panel p-5 sm:p-6">
            <p className="mb-4 font-display text-[10px] text-gold">✦ {s.school}</p>
            <motion.ul
              variants={stagger}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.3 }}
              className="flex flex-col gap-2"
            >
              {s.abilities.map((a) => (
                <motion.li
                  key={a.name}
                  variants={popIn}
                  className="group relative flex items-center justify-between gap-3"
                >
                  <span className="cursor-default text-sm text-stone-200 transition-colors group-hover:text-gold">
                    ▹ {a.name}
                  </span>
                  <span className="flex shrink-0 gap-[3px]" aria-label={`level ${a.lv} of 5`}>
                    {[0, 1, 2, 3, 4].map((i) => (
                      <Rocket key={i} filled={i < a.lv} />
                    ))}
                  </span>
                  <span className="pointer-events-none absolute -top-8 left-0 z-10 whitespace-nowrap rounded border border-gold/60 bg-[#0a1445] px-3 py-1.5 text-xs text-stone-100 opacity-0 shadow-lg transition-opacity duration-200 group-hover:opacity-100">
                    {a.detail}
                  </span>
                </motion.li>
              ))}
            </motion.ul>
          </Tilt>
        ))}
      </div>

      <Tilt className="panel mt-6 p-5 sm:p-6">
        <p className="mb-4 text-center font-display text-[10px] text-gold/80">
          PASSIVE TRAITS
        </p>
        <motion.ul
          variants={stagger}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.3 }}
          className="flex flex-wrap justify-center gap-3"
        >
          {traits.map((t) => (
            <motion.li
              key={t}
              variants={popIn}
              className="border border-gold/40 bg-gold/10 px-4 py-2 text-sm text-stone-300"
            >
              ✦ {t}
            </motion.li>
          ))}
        </motion.ul>
      </Tilt>
    </Section>
  );
}
