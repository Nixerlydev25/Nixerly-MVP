import { MotionProps } from "framer-motion";

// Common animation variants
export const fadeInOut = {
  initial: { opacity: 0 },
  animate: { opacity: 1 },
  exit: { opacity: 0 },
  transition: { duration: 0.2 }
};

export const slideUpFade = {
  initial: { opacity: 0, y: 10 },
  animate: { opacity: 1, y: 0 },
  exit: { opacity: 0, y: -10 },
  transition: { duration: 0.3 }
};

export const scaleUpFade = {
  initial: { opacity: 0, scale: 0.95 },
  animate: { opacity: 1, scale: 1 },
  exit: { opacity: 0, scale: 0.95 },
  transition: { duration: 0.2 }
};

export const buttonTapAnimation: MotionProps = {
  whileHover: { scale: 1.01 },
  whileTap: { scale: 0.99 },
  transition: { duration: 0.2 }
};

export const iconTapAnimation: MotionProps = {
  whileHover: { scale: 1.05, rotate: 3 },
  whileTap: { scale: 0.95, rotate: -3 },
  transition: { duration: 0.2 }
};

export const cardHoverAnimation: MotionProps = {
  whileHover: { 
    scale: 1.01,
    y: -2,
    transition: { duration: 0.2 }
  }
};

export const listItemAnimation = (index: number) => ({
  initial: { opacity: 0, x: -20 },
  animate: { opacity: 1, x: 0 },
  transition: { delay: index * 0.1, duration: 0.2 }
});

export const modalAnimation = {
  initial: { opacity: 0, scale: 0.95, y: 20 },
  animate: { opacity: 1, scale: 1, y: 0 },
  exit: { opacity: 0, scale: 0.95, y: 20 },
  transition: { duration: 0.3 }
};

export const tooltipAnimation = {
  initial: { opacity: 0, y: 5 },
  animate: { opacity: 1, y: 0 },
  exit: { opacity: 0, y: 5 },
  transition: { duration: 0.15 }
};