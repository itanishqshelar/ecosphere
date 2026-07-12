"use client";
import { motion } from "framer-motion";
import { Target, Plus } from "lucide-react";

const goals = [
  { id: 1, title: "Reduce Operations Carbon by 20%", dept: "Operations", target: 800, current: 980, deadline: "2026-12-31" },
  { id: 2, title: "Cut Electricity by 15%",           dept: "Engineering", target: 4500, current: 5200, deadline: "2026-09-30" },
  { id: 3, title: "Zero Single-Use Plastic",          dept: "HR",          target: 0,    current: 12,   deadline: "2026-08-31" },
];

export default function GoalsPage() {
  return (
    <div className="page-wrapper">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-xl font-bold text-[hsl(var(--foreground))]">Environmental Goals</h2>
          <p className="text-sm text-[hsl(var(--foreground-muted))] mt-0.5">Track carbon reduction targets</p>
        </div>
        <button className="btn-primary"><Plus className="w-4 h-4" /> New Goal</button>
      </div>
      <div className="grid gap-4">
        {goals.map((goal, i) => {
          const pct = Math.round((1 - goal.current / (goal.target === 0 ? 1 : goal.target * 1.3)) * 100);
          const progress = Math.max(0, Math.min(100, pct));
          return (
            <motion.div
              key={goal.id}
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.1 }}
              className="card p-5"
            >
              <div className="flex items-start justify-between mb-4">
                <div>
                  <div className="flex items-center gap-2 mb-1">
                    <Target className="w-4 h-4 text-primary-500" />
                    <h4 className="font-semibold text-[hsl(var(--foreground))]">{goal.title}</h4>
                  </div>
                  <p className="text-xs text-[hsl(var(--foreground-muted))]">{goal.dept} · Deadline: {goal.deadline}</p>
                </div>
                <span className="text-sm font-bold text-primary-500">{progress}% complete</span>
              </div>
              <div className="w-full h-2.5 bg-[hsl(var(--surface-overlay))] rounded-full overflow-hidden">
                <motion.div
                  initial={{ width: 0 }}
                  animate={{ width: `${progress}%` }}
                  transition={{ duration: 0.9, delay: i * 0.12 }}
                  className="h-full rounded-full bg-gradient-to-r from-primary-500 to-emerald-500"
                />
              </div>
              <div className="flex justify-between text-xs text-[hsl(var(--foreground-muted))] mt-2">
                <span>Current: {goal.current} tCO₂</span>
                <span>Target: {goal.target} tCO₂</span>
              </div>
            </motion.div>
          );
        })}
      </div>
    </div>
  );
}
