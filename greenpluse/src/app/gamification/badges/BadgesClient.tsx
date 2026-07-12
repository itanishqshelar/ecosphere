"use client";

import { motion } from "framer-motion";
import { Lock } from "lucide-react";
import { cn } from "@/lib/utils";
import type { Badge } from "@/lib/types";

export function BadgesClient({ badges }: { badges: Badge[] }) {
  const earned = badges.filter((b) => b.earned).length;

  return (
    <div className="page-wrapper">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-xl font-bold" style={{ color: "hsl(var(--foreground))" }}>Achievement Badges</h2>
          <p className="section-subtitle mt-0.5">Earn badges by completing ESG activities</p>
        </div>
        <div className="badge-green badge text-sm px-3 py-1.5">{earned}/{badges.length} Earned</div>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {badges.map((badge, i) => (
          <motion.div key={badge.id} initial={{ opacity: 0, scale: 0.92 }} animate={{ opacity: 1, scale: 1 }} transition={{ delay: i * 0.07 }}
            className={cn("card p-6 text-center flex flex-col items-center gap-3 relative overflow-hidden", !badge.earned && "opacity-60")}>
            {badge.earned && (
              <div className="absolute top-3 right-3 w-2 h-2 rounded-full animate-pulse-green" style={{ background: "#22c55e" }} />
            )}
            <div className={cn("text-5xl mb-1 transition-transform duration-300", badge.earned ? "animate-float" : "grayscale")}>
              {badge.icon}
            </div>
            <div>
              <h4 className="font-bold" style={{ color: badge.earned ? "hsl(var(--foreground))" : "hsl(var(--foreground-muted))" }}>{badge.name}</h4>
              <p className="text-xs mt-1" style={{ color: "hsl(var(--foreground-muted))" }}>{badge.description}</p>
            </div>
            <div className={cn("badge mt-1", badge.earned ? "badge-green" : "badge-gray")}>
              {badge.earned
                ? <span>✓ Earned{badge.earned_at ? ` · ${new Date(badge.earned_at).toLocaleDateString("en-IN")}` : ""}</span>
                : <span className="flex items-center gap-1"><Lock className="w-3 h-3" />{badge.xp_required} XP required</span>
              }
            </div>
            {badge.earned && <div className="absolute inset-0 rounded-2xl pointer-events-none" style={{ background: "rgba(34,197,94,0.05)" }} />}
          </motion.div>
        ))}
      </div>
    </div>
  );
}
