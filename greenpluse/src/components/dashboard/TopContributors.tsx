"use client";

import { motion } from "framer-motion";
import { mockLeaderboard } from "@/lib/mock-data";
import { Trophy } from "lucide-react";
import { cn } from "@/lib/utils";

export function TopContributors() {
  return (
    <div className="card p-5">
      <div className="flex items-center justify-between mb-5">
        <div>
          <h3 className="section-title">Top Contributors</h3>
          <p className="section-subtitle">This month's leaderboard</p>
        </div>
        <a href="/gamification/leaderboard" className="text-xs text-primary-500 hover:text-primary-400 font-medium transition-colors">
          View All →
        </a>
      </div>
      <div className="space-y-2">
        {mockLeaderboard.map((user, i) => (
          <motion.div
            key={user.rank}
            initial={{ opacity: 0, x: -12 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: i * 0.06, duration: 0.3 }}
            className="flex items-center gap-3 p-2.5 rounded-xl hover:bg-[hsl(var(--surface-overlay))] transition-colors group"
          >
            {/* Rank */}
            <div className={cn(
              "w-6 h-6 rounded-lg flex items-center justify-center text-xs font-bold shrink-0",
              i === 0 && "bg-yellow-400/20 text-yellow-500",
              i === 1 && "bg-gray-400/20 text-gray-400",
              i === 2 && "bg-orange-400/20 text-orange-400",
              i > 2  && "bg-[hsl(var(--surface-overlay))] text-[hsl(var(--foreground-muted))]",
            )}>
              {i < 3 ? <Trophy className="w-3 h-3" /> : user.rank}
            </div>

            {/* Avatar */}
            <div className="w-8 h-8 rounded-xl bg-gradient-to-br from-primary-500/30 to-accent-500/30 flex items-center justify-center text-xs font-bold text-primary-400 shrink-0">
              {user.avatar}
            </div>

            {/* Info */}
            <div className="flex-1 min-w-0">
              <p className="text-sm font-semibold text-[hsl(var(--foreground))] truncate">{user.name}</p>
              <p className="text-xs text-[hsl(var(--foreground-muted))] truncate">{user.dept}</p>
            </div>

            {/* XP */}
            <div className="text-right shrink-0">
              <p className="text-sm font-bold text-primary-500">{user.xp.toLocaleString()}</p>
              <p className="text-2xs text-[hsl(var(--foreground-subtle))]">XP</p>
            </div>

            {/* Badge */}
            <span className="text-base">{user.badge}</span>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
