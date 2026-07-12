"use client";

import { motion } from "framer-motion";
import { mockBadges } from "@/lib/mock-data";
import { Lock } from "lucide-react";
import { cn } from "@/lib/utils";

export default function BadgesPage() {
  return (
    <div className="page-wrapper">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-xl font-bold text-[hsl(var(--foreground))]">Achievement Badges</h2>
          <p className="section-subtitle mt-0.5">Earn badges by completing ESG activities</p>
        </div>
        <div className="badge-green badge text-sm px-3 py-1.5">
          {mockBadges.filter((b) => b.earned).length}/{mockBadges.length} Earned
        </div>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-3 gap-4">
        {mockBadges.map((badge, i) => (
          <motion.div
            key={badge.id}
            initial={{ opacity: 0, scale: 0.92 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: i * 0.08 }}
            className={cn(
              "card p-6 text-center flex flex-col items-center gap-3 relative overflow-hidden",
              !badge.earned && "opacity-60"
            )}
          >
            {badge.earned && (
              <div className="absolute top-3 right-3 w-2 h-2 rounded-full bg-primary-500 animate-pulse-green" />
            )}
            <div className={cn(
              "text-5xl mb-1 transition-transform duration-300",
              badge.earned ? "animate-float" : "grayscale"
            )}>
              {badge.icon}
            </div>
            <div>
              <h4 className={cn("font-bold", badge.earned ? "text-[hsl(var(--foreground))]" : "text-[hsl(var(--foreground-muted))]")}>
                {badge.name}
              </h4>
              <p className="text-xs text-[hsl(var(--foreground-muted))] mt-1">{badge.description}</p>
            </div>
            <div className={cn(
              "badge mt-1",
              badge.earned ? "badge-green" : "badge-gray"
            )}>
              {badge.earned ? "✓ Earned" : (
                <span className="flex items-center gap-1">
                  <Lock className="w-3 h-3" />
                  {badge.xpRequired} XP required
                </span>
              )}
            </div>
            {/* Glow behind icon when earned */}
            {badge.earned && (
              <div className="absolute inset-0 bg-primary-500/5 pointer-events-none rounded-2xl" />
            )}
          </motion.div>
        ))}
      </div>
    </div>
  );
}
