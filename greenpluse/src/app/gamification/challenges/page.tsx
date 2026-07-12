"use client";

import { motion } from "framer-motion";
import { mockChallenges } from "@/lib/mock-data";
import { Trophy, Clock, Users, Zap, Plus } from "lucide-react";
import { cn, getStatusColor } from "@/lib/utils";

const difficultyColor: Record<string, string> = {
  Easy:   "badge-green",
  Medium: "badge-amber",
  Hard:   "badge-red",
};

export default function ChallengesPage() {
  return (
    <div className="page-wrapper">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-xl font-bold text-[hsl(var(--foreground))]">Sustainability Challenges</h2>
          <p className="section-subtitle mt-0.5">Engage employees with ESG challenges</p>
        </div>
        <button className="btn-primary">
          <Plus className="w-4 h-4" />
          New Challenge
        </button>
      </div>

      {/* Stats Bar */}
      <div className="grid grid-cols-3 gap-4">
        {[
          { label: "Active Challenges", value: "6",  icon: Trophy, color: "text-yellow-500", bg: "bg-yellow-500/10" },
          { label: "Participants",      value: "246", icon: Users,  color: "text-accent-500", bg: "bg-accent-500/10" },
          { label: "XP Distributed",   value: "12.4K", icon: Zap,  color: "text-primary-500",bg: "bg-primary-500/10"},
        ].map((s, i) => (
          <motion.div
            key={s.label}
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.08 }}
            className="card p-4 flex items-center gap-3"
          >
            <div className={cn("w-10 h-10 rounded-xl flex items-center justify-center", s.bg)}>
              <s.icon className={cn("w-5 h-5", s.color)} />
            </div>
            <div>
              <p className="text-lg font-bold text-[hsl(var(--foreground))]">{s.value}</p>
              <p className="text-xs text-[hsl(var(--foreground-muted))]">{s.label}</p>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Challenge Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {mockChallenges.map((ch, i) => {
          const pct = Math.round((ch.completed / ch.participants) * 100);
          return (
            <motion.div
              key={ch.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.07 }}
              className="card p-5 flex flex-col gap-4 hover:shadow-card-hover group"
            >
              {/* Top */}
              <div className="flex items-start justify-between">
                <div>
                  <span className={cn("badge mb-2", ch.category === "Environmental" ? "badge-green" : "badge-blue")}>
                    {ch.category}
                  </span>
                  <h4 className="font-semibold text-[hsl(var(--foreground))] group-hover:text-primary-500 transition-colors">
                    {ch.title}
                  </h4>
                </div>
                <span className={cn("badge", difficultyColor[ch.difficulty])}>{ch.difficulty}</span>
              </div>

              {/* Meta */}
              <div className="flex items-center gap-4 text-xs text-[hsl(var(--foreground-muted))]">
                <span className="flex items-center gap-1">
                  <Users className="w-3.5 h-3.5" />
                  {ch.participants} joined
                </span>
                <span className="flex items-center gap-1">
                  <Clock className="w-3.5 h-3.5" />
                  {ch.deadline}
                </span>
                <span className="flex items-center gap-1 text-primary-500 font-semibold">
                  <Zap className="w-3.5 h-3.5" />
                  {ch.xp} XP
                </span>
              </div>

              {/* Progress */}
              <div>
                <div className="flex justify-between text-xs mb-1.5">
                  <span className="text-[hsl(var(--foreground-muted))]">Completion</span>
                  <span className="font-semibold text-[hsl(var(--foreground))]">{pct}%</span>
                </div>
                <div className="w-full h-2 bg-[hsl(var(--surface-overlay))] rounded-full overflow-hidden">
                  <motion.div
                    initial={{ width: 0 }}
                    animate={{ width: `${pct}%` }}
                    transition={{ duration: 0.8, delay: i * 0.1 + 0.3 }}
                    className="h-full rounded-full bg-gradient-to-r from-primary-500 to-emerald-500"
                  />
                </div>
                <p className="text-2xs text-[hsl(var(--foreground-subtle))] mt-1">
                  {ch.completed}/{ch.participants} completed
                </p>
              </div>

              {/* Actions */}
              <div className="flex gap-2 pt-1">
                <button className="btn-secondary flex-1 text-xs py-1.5">View Details</button>
                <button className="btn-primary flex-1 text-xs py-1.5">Join Challenge</button>
              </div>
            </motion.div>
          );
        })}
      </div>
    </div>
  );
}
