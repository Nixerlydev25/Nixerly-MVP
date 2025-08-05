"use client"

import { cn } from "@/lib/utils"
import { motion } from "framer-motion"

interface SpinnerProps {
  size?: "sm" | "md" | "lg"
  className?: string
}

const sizeMap = {
  sm: "size-4",
  md: "size-8",
  lg: "size-12"
}

export function Spinner({ size = "md", className }: SpinnerProps) {
  return (
    <motion.div
      className={cn(
        "border-4 border-primary/20 border-t-primary rounded-full",
        sizeMap[size],
        className
      )}
      animate={{ rotate: 360 }}
      transition={{
        duration: 1,
        repeat: Infinity,
        ease: "linear"
      }}
    />
  )
}