import { Variants } from "framer-motion";

export const fadeIn = (direction = "up"): Variants => {
  return {
    initial: {
      y: direction === "up" ? 40 : -60,
      opacity: 0,
    },
    animate: {
      y: 0,
      opacity: 1,
      transition: {
        duration: 0.5,
        ease: "easeInOut",
      },
    },
  };
};

export const staggerContainer: Variants = {
  initial: {},
  animate: {
    transition: {
      delayChildren: 0.7,
      staggerChildren: 0.5,
    },
  },
};

export const dogyeWrapper: Variants = {
  initial: {
    y: -1000,
  },
  animate: {
    y: 0,
    opacity: 1,
    transition: {
      delay: 2.6,
      duration: 0.8,
      type: "spring",
    },
  },
};

export const dogye: Variants = {
  initial: {
    y: 0,
  },
  animate: {
    y: [30, 0, 30],
    transition: {
      duration: 1.6,
      ease: "linear",
      repeat: Infinity,
    },
  },
};

export const fireWrapper: Variants = {
  initial: {
    y: -800,
  },
  animate: {
    y: 0,
    transition: {
      duration: 0.4,

      type: "spring",
    },
  },
};
export const fire: Variants = {
  initial: {
    x: 0,
  },
  animate: (i: number) => ({
    x: [20, 0, 20],
    transition: {
      delay: 2,
      duration: 1 * i,
      ease: "linear",
      repeat: Infinity,
    },
  }),
};

export const firesContainer: Variants = {
  initial: {},
  animate: {
    transition: {
      delayChildren: 3,
      staggerChildren: 0.2,
    },
  },
};