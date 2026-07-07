"use client";

import { motion } from "framer-motion";
import Section from "./Section";
import { slideIn } from "./motion";

const quests = [
  {
    type: "MAIN QUEST",
    status: "ACTIVE",
    company: "PT. Indomarco Prismatama",
    role: "Frontend Developer",
    period: "09/2022 — PRESENT",
    log: [
      "Developed core features: real-time notifications, user authentication, data synchronization, and in-app purchases.",
      "Created an intuitive UI using Flutter's widget system.",
      "Simplified the purchasing flow from 4 steps to 3 steps.",
      "Engaged over 10,000 users.",
    ],
  },
  {
    type: "SIDE QUEST",
    status: "CLEARED",
    company: "CV. Tehnik Pompa — Service Management System",
    role: "Project Lead · Team of 3 · Next.js, TypeScript, Prisma, PostgreSQL, Docker",
    period: "07/2025 — 12/2025",
    log: [
      "Led end-to-end delivery of a full-stack service management platform replacing fully paper-based operations — sales pipeline tracking, maintenance scheduling with automated reminders, and real-time notifications.",
      "Served as primary client liaison — gathered requirements from stakeholders, translated business needs into technical specs, and managed feature priorities and delivery timelines across releases.",
      "Led and coordinated a 3-person development team: planned sprints, reviewed work, and unblocked teammates to keep delivery on schedule.",
      "Digitized paper-only workflows for 20+ daily active users (50 provisioned accounts across Sales, Admin, and Superuser roles) — reduced monthly sales recap from weeks of manual paper-and-Excel work to a single click with automated, real-time reporting.",
      "Designed the application's UI/UX and contributed hands-on to the codebase (frontend components and feature implementation) during high-load periods.",
      "Architected the platform for multi-branch expansion — branch-level separation built in so new locations onboard without rework.",
    ],
  },
  {
    type: "SIDE QUEST",
    status: "CLEARED",
    company: "CV. Tehnik Pompa",
    role: "Full Stack Developer",
    period: "09/2022 — 12/2022",
    log: [
      "Rebuilt the UI with Flutter, integrating custom widgets and animations.",
      "Implemented state management with Provider (Bloc, GetX).",
      "Integrated backend APIs via Dio/http packages.",
    ],
  },
  {
    type: "MAIN QUEST",
    status: "CLEARED",
    company: "PT. Indomarco Prismatama",
    role: "Frontend Intern",
    period: "09/2020 — 09/2022",
    log: [
      "Assisted in developing Flutter/Dart applications.",
      "Implemented UI components and tested features like navigation and animations.",
    ],
  },
  {
    type: "SIDE QUEST",
    status: "CLEARED",
    company: "CV. Tehnik Pompa",
    role: "Full Stack Developer",
    period: "02/2020 — 08/2020",
    log: [
      "Designed Java apps in Android Studio using Material Design.",
      "Integrated user authentication and enabled document generation (PDF, DOCX).",
    ],
  },
  {
    type: "TUTORIAL",
    status: "CLEARED",
    company: "Bina Nusantara — Bluejacket Binus",
    role: "Teaching Assistant",
    period: "02/2018 — 12/2020",
    log: [
      "Taught undergrads, managed exams, and created syllabus materials.",
      "Built games, e-commerce websites, and mobile apps.",
    ],
  },
];

export default function Experience() {
  return (
    <Section id="experience" title="QUEST LOG" from="right">
      <ol className="flex flex-col gap-6">
        {quests.map((q, i) => (
          <motion.li
            key={q.company + q.period}
            variants={slideIn(i % 2 === 0 ? "left" : "right")}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.2 }}
            className="panel p-5 sm:p-6"
          >
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
            <p className="mb-3 text-sm text-amber/90">{q.role}</p>
            <ul className="space-y-1.5 text-sm leading-relaxed text-stone-300">
              {q.log.map((line) => (
                <li key={line} className="flex gap-2">
                  <span className="text-gold/60">›</span>
                  {line}
                </li>
              ))}
            </ul>
          </motion.li>
        ))}
      </ol>
    </Section>
  );
}
