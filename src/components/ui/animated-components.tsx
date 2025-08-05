import { motion } from "framer-motion";
import { Button } from "./button";
import { Card } from "./card";
import { buttonTapAnimation, cardHoverAnimation } from "@/hook/common/useAnimations";
import { cn } from "@/lib/utils";

// Animated Button
export const AnimatedButton = motion(Button);

// Default animation props for the button
export const defaultButtonAnimationProps = {
  ...buttonTapAnimation,
  className: "transition-all duration-300"
};

// Animated Card
export const AnimatedCard = motion(Card);

// Default animation props for the card
export const defaultCardAnimationProps = {
  ...cardHoverAnimation,
  className: "transition-all duration-300"
};

// Animated List Item
interface AnimatedListItemProps {
  children: React.ReactNode;
  index?: number;
  className?: string;
}

export const AnimatedListItem = ({ children, index = 0, className }: AnimatedListItemProps) => (
  <motion.li
    initial={{ opacity: 0, x: -20 }}
    animate={{ opacity: 1, x: 0 }}
    transition={{ delay: index * 0.1, duration: 0.2 }}
    className={cn("transition-all duration-300", className)}
  >
    {children}
  </motion.li>
);

// Animated Icon Button
interface AnimatedIconButtonProps {
  children: React.ReactNode;
  className?: string;
  onClick?: () => void;
}

export const AnimatedIconButton = ({ children, className, onClick }: AnimatedIconButtonProps) => (
  <motion.button
    whileHover={{ scale: 1.1, rotate: 5 }}
    whileTap={{ scale: 0.9, rotate: -5 }}
    transition={{ duration: 0.2 }}
    className={cn("transition-all duration-300", className)}
    onClick={onClick}
  >
    {children}
  </motion.button>
);

// Animated Section
interface AnimatedSectionProps {
  children: React.ReactNode;
  className?: string;
}

export const AnimatedSection = ({ children, className }: AnimatedSectionProps) => (
  <motion.section
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.5 }}
    className={cn("transition-all duration-500", className)}
  >
    {children}
  </motion.section>
);

// Animated Input
interface AnimatedInputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  error?: boolean;
}

export const AnimatedInput = motion.input;

// Default animation props for inputs
export const defaultInputAnimationProps = {
  whileFocus: { scale: 1.02 },
  transition: { duration: 0.2 }
};