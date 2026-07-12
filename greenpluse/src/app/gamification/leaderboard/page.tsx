"use client";

import { motion } from "framer-motion";
import { mockLeaderboard } from "@/lib/mock-data";
import { Trophy, Medal, Crown } from "lucide-react";
import { cn } from "@/lib/utils";
import { useState } from "react";

const tabs = ["Monthly", "Weekly", "All Time"] as const;

export default function LeaderboardPage() {
  const [tab, setTab] = useState<typeof tabs[number]>("Monthly");

  return (
    <div className="page-wrapper">
      {/* Hero */}
      <div className="card p-6 bg-gradient-to-r from-primary-500/10 via-emerald-500/5 to-accent-500/10 border-primary-500/20">
        <h2 className="text-xl font-bold text-[hsl(var(--foreground))]">🏆 ESG Leaderboard</h2>
        <p className="section-subtitle mt-1">Top performers driving sustainability</p>
      </div>

      {/* Tabs */}
      <div className="flex gap-2">
        {tabs.map((t) => (
          <button
            key={t}
            onClick={() => setTab(t)}
            className={cn(
              "px-4 py-2 rounded-xl text-sm font-semibold transition-all",
              tab === t
                ? "bg-primary-500 text-white shadow-glow-green"
                : "btn-secondary"
            )}
          >
            {t}
          </button>
        ))}
      </div>

      {/* Top 3 Podium */}
      <div className="grid grid-cols-3 gap-4">
        {[mockLeaderboard[1], mockLeaderboard[0], mockLeaderboard[2]].map((user, i) => {
          const podiumRank = [2, 1, 3][i];
          const isFirst = podiumRank === 1;
          return (
            <motion.div
              key={user.rank}
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.1 }}
              className={cn(
                "card p-5 text-center flex flex-col items-center gap-3",
                isFirst && "border-yellow-500/30 shadow-glow-green/20 bg-gradient-to-b from-yellow-500/5 to-transparent",
                !isFirst && "mt-6"
              )}
            >
              {isFirst && <Crown className="w-6 h-6 text-yellow-500" />}
              <div className={cn(
                "w-16 h-16 rounded-2xl flex items-center justify-center text-xl font-bold",
                isFirst ? "bg-gradient-to-br from-yellow-400 to-orange-400 text-white shadow-glow-green" :
                podiumRank === 2 ? "bg-gradient-to-br from-gray-400 to-gray-300 text-white" :
                "bg-gradient-to-br from-orange-400 to-amber-400 text-white"
              )}>
                {user.avatar}
              </div>
              <div>
                <p className="font-bold text-[hsl(var(--foreground))]">{user.name}</p>
                <p className="text-xs text-[hsl(var(--foreground-muted))]">{user.dept}</p>
              </div>
              <div className={cn(
                "badge text-base",
                isFirst ? "badge-amber" : "badge-gray"
              )}>
                {podiumRank === 1 ? "🥇" : podiumRank === 2 ? "🥈" : "🥉"} #{podiumRank}
              </div>
              <p className="text-lg font-bold text-primary-500">{user.xp.toLocaleString()} XP</p>
            </motion.div>
          );
        })}
      </div>

      {/* Full Table */}
      <div className="card overflow-hidden">
        <div className="p-5 border-b border-[hsl(var(--border-muted))]">
          <h3 className="section-title">Full Rankings</h3>
        </div>
        <table className="w-full">
          <thead>
            <tr className="border-b border-[hsl(var(--border-muted))] bg-[hsl(var(--surface-overlay))]/50">
              <th className="table-header text-left w-12">Rank</th>
              <th className="table-header text-left">Employee</th>
              <th className="table-header text-left">Department</th>
              <th className="table-header text-left">Badge</th>
              <th className="table-header text-right">XP</th>
            </tr>
          </thead>
          <tbody>
            {mockLeaderboard.map((user, i) => (
              <motion.tr
                key={user.rank}
                initial={{ opacity: 0, x: -8 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: i * 0.06 + 0.3 }}
                className="table-row"
              >
                <td className="table-cell">
                  <div className={cn(
                    "w-7 h-7 rounded-lg flex items-center justify-center text-xs font-bold",
                    i === 0 && "bg-yellow-500/20 text-yellow-500",
                    i === 1 && "bg-gray-400/20 text-gray-400",
                    i === 2 && "bg-orange-400/20 text-orange-400",
                    i > 2  && "bg-[hsl(var(--surface-overlay))] text-[hsl(var(--foreground-muted))]",
                  )}>
                    {i < 3 ? <Trophy className="w-3.5 h-3.5" /> : user.rank}
                  </div>
                </td>
                <td className="table-cell">
                  <div className="flex items-center gap-2.5">
                    <div className="w-8 h-8 rounded-xl bg-gradient-to-br from-primary-500/30 to-accent-500/30 flex items-center justify-center text-xs font-bold text-primary-400">
                      {user.avatar}
                    </div>
                    <span className="font-semibold">{user.name}</span>
                  </div>
                </td>
                <td className="table-cell text-[hsl(var(--foreground-muted))]">{user.dept}</td>
                <td className="table-cell text-xl">{user.badge}</td>
                <td className="table-cell text-right font-bold text-primary-500">{user.xp.toLocaleString()}</td>
              </motion.tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
