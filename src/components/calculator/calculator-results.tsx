"use client";

import * as React from "react";
import { motion, AnimatePresence } from "framer-motion";

interface CalculatorResultsProps {
  isVisible: boolean;
  children: React.ReactNode;
}

export function CalculatorResults({
  isVisible,
  children,
}: CalculatorResultsProps) {
  return (
    <AnimatePresence mode="wait">
      {isVisible && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -10 }}
          transition={{ duration: 0.4, ease: "easeOut" }}
        >
          {children}
        </motion.div>
      )}
    </AnimatePresence>
  );
}
