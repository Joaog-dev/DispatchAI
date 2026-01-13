"use client";

import { motion } from "framer-motion";

type PageMotionProps = {
  children: React.ReactNode;
};

export function PageMotion({ children }: PageMotionProps) {
  return (
    <motion.div
      className="min-h-screen"
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, ease: "easeOut" }}
    >
      {children}
    </motion.div>
  );
}
