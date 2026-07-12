"use client";

import { motion } from "framer-motion";
import { Trophy, Crown } from "lucide-react";
import { cn } from "@/lib/utils";
import { useState } from "react";
import type { LeaderboardEntry } from "@/lib/types";

const tabs = ["All Time", "Monthly", "Weekly"] as const;
const BADGE_MAP = ["🥇","🥈","🥉"];

export function LeaderboardClient({ leaderboard }: { leaderboard: LeaderboardEntry[] }) {
  const [tab, setTab] = useState<typeof tabs[number]>("All Time");

  const top3    = [leaderboard[1], leaderboard[0], leaderboard[2]].filter(Boolean);
  const podiumOrder = [2, 1, 3];

  return (
    <div className="page-wrapper">
      <div className="card p-6" style={{ background: "linear-gradient(to right,rgba(34,197,94,0.1),rgba(16,185,129,0.05),rgba(59,130,246,0.1))", borderColor: "rgba(34,197,94,0.2)" }}>
        <h2 className="text-xl font-bold" style={{ color: "hsl(var(--foreground))" }}>🏆 ESG Leaderboard</h2>
        <p className="section-subtitle mt-1">Top performers driving sustainability</p>
      </div>

      <div className="flex gap-2">
        {tabs.map((t) => (
          <button key={t} onClick={() => setTab(t)}
            className={cn("px-4 py-2 rounded-xl text-sm font-semibold transition-all",
              tab === t ? "bg-primary-500 text-white" : "btn-secondary")}
            style={tab === t ? { background: "#22c55e", color: "white" } : {}}>
            {t}
          </button>
        ))}
      </div>

      {/* Podium */}
      {leaderboard.length >= 3 && (
        <div className="grid grid-cols-3 gap-4">
          {top3.map((user, i) => {
            const podiumRank = podiumOrder[i];
            const isFirst = podiumRank === 1;
            return (
              <motion.div key={user.id} initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.1 }}
                className={cn("card p-5 text-center flex flex-col items-center gap-3", !isFirst && "mt-6")}
                style={isFirst ? { borderColor: "rgba(234,179,8,0.3)", background: "linear-gradient(to bottom,rgba(234,179,8,0.05),transparent)" } : {}}>
                {isFirst && <Crown className="w-6 h-6 text-yellow-500" />}
                <div className="w-16 h-16 rounded-2xl flex items-center justify-center text-xl font-bold text-white"
                  style={{ background: isFirst ? "linear-gradient(135deg,#fbbf24,#f97316)" : podiumRank === 2 ? "linear-gradient(135deg,#9ca3af,#6b7280)" : "linear-gradient(135deg,#f97316,#fbbf24)" }}>
                  {user.avatar ?? user.name.slice(0,2).toUpperCase()}
                </div>
                <div>
                  <p className="font-bold" style={{ color: "hsl(var(--foreground))" }}>{user.name}</p>
                  <p className="text-xs" style={{ color: "hsl(var(--foreground-muted))" }}>{user.department}</p>
                </div>
                <span className={cn("badge text-base", isFirst ? "badge-amber" : "badge-gray")}>
                  {BADGE_MAP[podiumRank - 1]} #{podiumRank}
                </span>
                <p className="text-lg font-bold" style={{ color: "#22c55e" }}>{user.xp.toLocaleString()} XP</p>
              </motion.div>
            );
          })}
        </div>
      )}

      {/* Full table */}
      <div className="card overflow-hidden">
        <div className="p-5 border-b" style={{ borderColor: "hsl(var(--border-muted))" }}>
          <h3 className="section-title">Full Rankings ({leaderboard.length} employees)</h3>
        </div>
        <table className="w-full">
          <thead>
            <tr className="border-b" style={{ borderColor: "hsl(var(--border-muted))", background: "hsl(var(--surface-overlay))" }}>
              <th className="table-header text-left w-12">Rank</th>
              <th className="table-header text-left">Employee</th>
              <th className="table-header text-left">Department</th>
              <th className="table-header text-right">XP</th>
            </tr>
          </thead>
          <tbody>
            {leaderboard.map((user, i) => (
              <motion.tr key={user.id} initial={{ opacity: 0, x: -8 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: i * 0.04 + 0.3 }} className="table-row">
                <td className="table-cell">
                  <div className={cn("w-7 h-7 rounded-lg flex items-center justify-center text-xs font-bold",
                    i===0?"bg-yellow-500/20 text-yellow-500":i===1?"bg-gray-400/20 text-gray-400":i===2?"bg-orange-400/20 text-orange-400":"bg-[hsl(var(--surface-overlay))]")}>
                    {i < 3 ? <Trophy className="w-3.5 h-3.5" /> : user.rank}
                  </div>
                </td>
                <td className="table-cell">
                  <div className="flex items-center gap-2.5">
                    <div className="w-8 h-8 rounded-xl flex items-center justify-center text-xs font-bold"
                      style={{ background: "linear-gradient(135deg,rgba(34,197,94,0.3),rgba(59,130,246,0.3))", color: "#22c55e" }}>
                      {user.avatar ?? user.name.slice(0,2).toUpperCase()}
                    </div>
                    <span className="font-semibold" style={{ color: "hsl(var(--foreground))" }}>{user.name}</span>
                  </div>
                </td>
                <td className="table-cell" style={{ color: "hsl(var(--foreground-muted))" }}>{user.department}</td>
                <td className="table-cell text-right font-bold" style={{ color: "#22c55e" }}>{user.xp.toLocaleString()}</td>
              </motion.tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
