"use client";

import { motion } from "framer-motion";

interface CTAButtonProps {
  children: React.ReactNode;
  onClick?: () => void;
  delay?: number;
}

export function CTAButton({ children, onClick, delay = 0 }: CTAButtonProps) {
  return (
    <motion.button
      initial={{ opacity: 0, y: 20, pointerEvents: "none" }}
      whileInView={{ opacity: 1, y: 0, pointerEvents: "auto" }}
      viewport={{ once: true }}
      transition={{ delay, duration: 0.5, ease: "easeOut" }}
      onClick={onClick}
      className="mt-8 w-full bg-primary text-white font-semibold py-4 px-6 rounded-2xl shadow-[0_8px_30px_rgba(6,78,59,0.2)] hover:bg-primary-light transition-all active:scale-95 text-lg flex items-center justify-center gap-2"
    >
      {children}
    </motion.button>
  );
}
