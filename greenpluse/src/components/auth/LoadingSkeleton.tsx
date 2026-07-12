"use client";

import { motion } from "framer-motion";
import { Leaf } from "lucide-react";

export function AuthLoadingSkeleton() {
  return (
    <div className="min-h-screen bg-white dark:bg-[hsl(var(--background))] flex flex-col items-center justify-center p-6">
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="flex flex-col items-center gap-4"
      >
        <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-primary-500 to-emerald-500 flex items-center justify-center">
          <Leaf className="w-6 h-6 text-white" />
        </div>
        <div className="flex items-center gap-2">
          <div className="w-2 h-2 rounded-full bg-primary-500 animate-bounce" style={{ animationDelay: "0ms" }} />
          <div className="w-2 h-2 rounded-full bg-primary-500 animate-bounce" style={{ animationDelay: "150ms" }} />
          <div className="w-2 h-2 rounded-full bg-primary-500 animate-bounce" style={{ animationDelay: "300ms" }} />
        </div>
        <p className="text-sm text-[hsl(var(--foreground-muted))]">Loading...</p>
      </motion.div>
    </div>
  );
}
