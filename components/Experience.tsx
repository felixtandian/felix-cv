"use client";

import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import Section from "./Section";
import Tilt from "./Tilt";

type Loot = { icon: string; title: string; detail: string };

const quests = [
  {
    type: "MAIN QUEST",
    status: "ACTIVE",
    company: "PT. Indomarco Prismatama",
    role: "Frontend Developer",
    period: "09/2022 — PRESENT",
    loot: [
      {
        icon: "🔔",
        title: "Core features shipped",
        detail:
          "Real-time notifications, user authentication, data synchronization, and in-app purchases.",
      },
      {
        icon: "🎨",
        title: "Intuitive UI",
        detail: "Built with Flutter's widget system.",
      },
      {
        icon: "⚡",
        title: "4 → 3 steps",
        detail: "Simplified the purchasing flow by a full step.",
      },
      {
        icon: "⚔",
        title: "10,000+ users",
        detail: "Engaged through the features above.",
      },
    ],
  },
  {
    type: "SIDE QUEST",
    status: "CLEARED",
    company: "CV. Tehnik Pompa — Service Management System",
    role: "Project Lead · Team of 3 · Next.js, TypeScript, Prisma, PostgreSQL, Docker",
    period: "07/2025 — 12/2025",
    loot: [
      {
        icon: "🏗",
        title: "End-to-end delivery",
        detail:
          "Full-stack platform replacing fully paper-based operations — sales pipeline tracking, maintenance scheduling with automated reminders, and real-time notifications.",
      },
      {
        icon: "🤝",
        title: "Primary client liaison",
        detail:
          "Gathered requirements from stakeholders, translated business needs into technical specs, and managed feature priorities and delivery timelines across releases.",
      },
      {
        icon: "👥",
        title: "Led a 3-person team",
        detail:
          "Planned sprints, reviewed work, and unblocked teammates to keep delivery on schedule.",
      },
      {
        icon: "📜",
        title: "Weeks → one click",
        detail:
          "Digitized paper-only workflows for 20+ daily active users (50 accounts across Sales, Admin, Superuser). Monthly sales recap went from weeks of paper-and-Excel work to automated, real-time reporting.",
      },
      {
        icon: "✏️",
        title: "UI/UX + hands-on code",
        detail:
          "Designed the application's UI/UX and built frontend components during high-load periods.",
      },
      {
        icon: "🏰",
        title: "Multi-branch ready",
        detail:
          "Branch-level separation built in so new locations onboard without rework.",
      },
    ],
  },
  {
    type: "SIDE QUEST",
    status: "CLEARED",
    company: "CV. Tehnik Pompa",
    role: "Full Stack Developer",
    period: "09/2022 — 12/2022",
    loot: [
      {
        icon: "🎨",
        title: "UI rebuilt in Flutter",
        detail: "Integrated custom widgets and animations.",
      },
      {
        icon: "🧠",
        title: "State management",
        detail: "Provider, with Bloc and GetX.",
      },
      {
        icon: "🔌",
        title: "API integration",
        detail: "Backend APIs wired up via Dio/http packages.",
      },
    ],
  },
  {
    type: "MAIN QUEST",
    status: "CLEARED",
    company: "PT. Indomarco Prismatama",
    role: "Frontend Intern",
    period: "09/2020 — 09/2022",
    loot: [
      {
        icon: "🛠",
        title: "Flutter/Dart apps",
        detail: "Assisted in developing production applications.",
      },
      {
        icon: "🧪",
        title: "UI + testing",
        detail: "Implemented UI components and tested navigation and animations.",
      },
    ],
  },
  {
    type: "SIDE QUEST",
    status: "CLEARED",
    company: "CV. Tehnik Pompa",
    role: "Full Stack Developer",
    period: "02/2020 — 08/2020",
    loot: [
      {
        icon: "📱",
        title: "Java Android apps",
        detail: "Designed in Android Studio using Material Design.",
      },
      {
        icon: "🔐",
        title: "Auth + documents",
        detail: "User authentication and document generation (PDF, DOCX).",
      },
    ],
  },
  {
    type: "TUTORIAL",
    status: "CLEARED",
    company: "Bina Nusantara — Bluejacket Binus",
    role: "Teaching Assistant",
    period: "02/2018 — 12/2020",
    loot: [
      {
        icon: "🎓",
        title: "Taught undergrads",
        detail: "Managed exams and created syllabus materials.",
      },
      {
        icon: "🕹",
        title: "Built projects",
        detail: "Games, e-commerce websites, and mobile apps.",
      },
    ],
  },
];

const tabs = ["ALL", "MAIN QUEST", "SIDE QUEST", "TUTORIAL"] as const;

function LootCard({ loot }: { loot: Loot }) {
  return (
    <motion.div
      whileHover={{ y: -4 }}
      className="border border-gold/25 bg-black/30 p-3 transition-shadow hover:shadow-[0_0_12px_rgb(212_175_55_/_0.25)]"
    >
      <p className="font-display text-sm font-bold text-amber">
        {loot.icon} {loot.title}
      </p>
      <p className="mt-1 text-sm leading-relaxed text-stone-400">{loot.detail}</p>
    </motion.div>
  );
}

export default function Experience() {
  const [filter, setFilter] = useState<(typeof tabs)[number]>("ALL");
  const visible = quests.filter((q) => filter === "ALL" || q.type === filter);

  return (
    <Section id="experience" title="QUEST LOG" from="right">
      <div className="mb-8 flex flex-wrap justify-center gap-2">
        {tabs.map((t) => (
          <button
            key={t}
            onClick={() => setFilter(t)}
            className={`border px-4 py-2 font-display text-xs tracking-widest transition-colors ${
              filter === t
                ? "border-gold bg-gold/15 text-amber"
                : "border-gold/30 text-stone-400 hover:border-gold/60 hover:text-stone-200"
            }`}
          >
            {t}
          </button>
        ))}
      </div>

      <motion.ol layout className="flex flex-col gap-6">
        <AnimatePresence mode="popLayout">
          {visible.map((q) => (
            <motion.li
              key={q.company + q.period}
              layout
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95 }}
              transition={{ type: "spring", stiffness: 120, damping: 18 }}
            >
              <Tilt className="panel p-5 sm:p-6">
                <div className="mb-3 flex flex-wrap items-center gap-3">
                  <span className="font-display text-xs tracking-widest text-gold">
                    ◆ {q.type}
                  </span>
                  <span
                    className={`border px-2 py-0.5 font-display text-[10px] tracking-widest ${
                      q.status === "ACTIVE"
                        ? "border-amber/60 text-amber"
                        : "border-stone-500/50 text-stone-400"
                    }`}
                  >
                    {q.status}
                  </span>
                  <span className="ml-auto text-xs text-stone-500">{q.period}</span>
                </div>
                <h3 className="font-display text-lg font-bold text-stone-100">
                  {q.company}
                </h3>
                <p className="mb-4 text-sm text-amber/90">{q.role}</p>
                <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
                  {q.loot.map((l) => (
                    <LootCard key={l.title} loot={l} />
                  ))}
                </div>
              </Tilt>
            </motion.li>
          ))}
        </AnimatePresence>
      </motion.ol>
    </Section>
  );
}
