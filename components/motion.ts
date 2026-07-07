import type { Variants } from "framer-motion";

/* Sections slide in like entering a new level */
export const slideIn = (from: "left" | "right" | "bottom" = "bottom"): Variants => ({
  hidden: {
    opacity: 0,
    x: from === "left" ? -80 : from === "right" ? 80 : 0,
    y: from === "bottom" ? 80 : 0,
  },
  visible: {
    opacity: 1,
    x: 0,
    y: 0,
    transition: { type: "spring", stiffness: 70, damping: 14 },
  },
});

/* Parent container that reveals children one by one */
export const stagger: Variants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.08, delayChildren: 0.1 } },
};

/* Bouncy pop, for inventory items / badges */
export const popIn: Variants = {
  hidden: { opacity: 0, scale: 0.5 },
  visible: {
    opacity: 1,
    scale: 1,
    transition: { type: "spring", stiffness: 320, damping: 16 },
  },
};
