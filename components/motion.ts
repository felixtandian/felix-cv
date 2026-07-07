import type { Variants } from "framer-motion";

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

/* Section titles pop in letter by letter */
export const letterContainer: Variants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.045 } },
};

export const letterPop: Variants = {
  hidden: { opacity: 0, y: 14, scale: 0.6 },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: { type: "spring", stiffness: 350, damping: 18 },
  },
};
