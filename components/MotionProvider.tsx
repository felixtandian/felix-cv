"use client";

import { MotionConfig } from "framer-motion";

/* honors prefers-reduced-motion for all Framer Motion animations */
export default function MotionProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  return <MotionConfig reducedMotion="user">{children}</MotionConfig>;
}
