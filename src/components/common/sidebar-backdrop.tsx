"use client";

import { useSidebarStore } from "@/store/sidebar.store";
import { motion, AnimatePresence } from "framer-motion";

export function SidebarBackdrop() {
  const { isOpen, close } = useSidebarStore();

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.2 }}
          className="fixed inset-0 bg-transparent z-40 lg:hidden"
          onClick={close}
        />
      )}
    </AnimatePresence>
  );
} 