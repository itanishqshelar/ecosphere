"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { SectionHeading } from "./SectionHeading";
import { Leaf, Users, Shield, Trophy, FileText } from "lucide-react";
import { cn } from "@/lib/utils";

const tabs = [
  { id: "environmental", label: "Environmental", icon: Leaf, color: "#22c55e" },
  { id: "social", label: "Social", icon: Users, color: "#3b82f6" },
  { id: "governance", label: "Governance", icon: Shield, color: "#a855f7" },
  { id: "gamification", label: "Gamification", icon: Trophy, color: "#f59e0b" },
  { id: "reports", label: "Reports", icon: FileText, color: "#ec4899" },
];

const tabContent: Record<string, {
  kpis: { label: string; value: string; color: string }[];
  chartData: { label: string; value: number; color: string }[];
  stats: { label: string; value: string; icon: string }[];
}> = {
  environmental: {
    kpis: [
      { label: "Total Emissions", value: "1,240 tCO₂", color: "#22c55e" },
      { label: "Carbon Saved", value: "180 tCO₂", color: "#10b981" },
      { label: "Active Goals", value: "6", color: "#3b82f6" },
      { label: "Emission Factors", value: "12", color: "#8b5cf6" },
    ],
    chartData: [
      { label: "Jan", value: 158, color: "#22c55e" },
      { label: "Feb", value: 149, color: "#22c55e" },
      { label: "Mar", value: 142, color: "#22c55e" },
      { label: "Apr", value: 138, color: "#22c55e" },
      { label: "May", value: 131, color: "#22c55e" },
      { label: "Jun", value: 124, color: "#22c55e" },
      { label: "Jul", value: 118, color: "#22c55e" },
    ],
    stats: [
      { label: "Reduction", value: "-12.4%", icon: "📉" },
      { label: "Compliance", value: "94%", icon: "✅" },
      { label: "Departments", value: "6", icon: "🏢" },
    ],
  },
  social: {
    kpis: [
      { label: "CSR Events", value: "24", color: "#3b82f6" },
      { label: "Participants", value: "1,847", color: "#22c55e" },
      { label: "Engagement Rate", value: "88%", color: "#8b5cf6" },
      { label: "Points Awarded", value: "42.5K", color: "#f59e0b" },
    ],
    chartData: [
      { label: "Jan", value: 28, color: "#3b82f6" },
      { label: "Feb", value: 35, color: "#3b82f6" },
      { label: "Mar", value: 42, color: "#3b82f6" },
      { label: "Apr", value: 38, color: "#3b82f6" },
      { label: "May", value: 45, color: "#3b82f6" },
      { label: "Jun", value: 52, color: "#3b82f6" },
      { label: "Jul", value: 48, color: "#3b82f6" },
    ],
    stats: [
      { label: "Active Events", value: "8", icon: "📅" },
      { label: "Diversity Score", value: "76%", icon: "🌈" },
      { label: "Training Hours", value: "340", icon: "🎓" },
    ],
  },
  governance: {
    kpis: [
      { label: "Active Policies", value: "18", color: "#a855f7" },
      { label: "Compliance Rate", value: "91%", color: "#22c55e" },
      { label: "Pending Audits", value: "3", color: "#f59e0b" },
      { label: "Open Issues", value: "2", color: "#ef4444" },
    ],
    chartData: [
      { label: "Jan", value: 85, color: "#a855f7" },
      { label: "Feb", value: 88, color: "#a855f7" },
      { label: "Mar", value: 82, color: "#a855f7" },
      { label: "Apr", value: 90, color: "#a855f7" },
      { label: "May", value: 87, color: "#a855f7" },
      { label: "Jun", value: 92, color: "#a855f7" },
      { label: "Jul", value: 91, color: "#a855f7" },
    ],
    stats: [
      { label: "Acknowledged", value: "92%", icon: "📋" },
      { label: "Audit Pass Rate", value: "96%", icon: "✅" },
      { label: "Critical Issues", value: "0", icon: "🛡️" },
    ],
  },
  gamification: {
    kpis: [
      { label: "Total XP Earned", value: "48.2K", color: "#f59e0b" },
      { label: "Active Challenges", value: "6", color: "#22c55e" },
      { label: "Badges Awarded", value: "124", color: "#3b82f6" },
      { label: "Rewards Redeemed", value: "47", color: "#ec4899" },
    ],
    chartData: [
      { label: "Jan", value: 12, color: "#f59e0b" },
      { label: "Feb", value: 24, color: "#f59e0b" },
      { label: "Mar", value: 36, color: "#f59e0b" },
      { label: "Apr", value: 48, color: "#f59e0b" },
      { label: "May", value: 60, color: "#f59e0b" },
      { label: "Jun", value: 72, color: "#f59e0b" },
      { label: "Jul", value: 84, color: "#f59e0b" },
    ],
    stats: [
      { label: "Top Performer", value: "Priya S.", icon: "🏆" },
      { label: "Avg XP/Employee", value: "1,240", icon: "⚡" },
      { label: "Active Streaks", value: "38", icon: "🔥" },
    ],
  },
  reports: {
    kpis: [
      { label: "Reports Generated", value: "156", color: "#ec4899" },
      { label: "Scheduled Reports", value: "8", color: "#22c55e" },
      { label: "Export Formats", value: "4", color: "#3b82f6" },
      { label: "Data Points", value: "12.4K", color: "#a855f7" },
    ],
    chartData: [
      { label: "PDF", value: 45, color: "#ec4899" },
      { label: "CSV", value: 32, color: "#22c55e" },
      { label: "Excel", value: 28, color: "#3b82f6" },
      { label: "API", value: 15, color: "#f59e0b" },
    ],
    stats: [
      { label: "This Month", value: "24", icon: "📊" },
      { label: "Avg Export Time", value: "2.4s", icon: "⚡" },
      { label: "Scheduled", value: "8", icon: "📅" },
    ],
  },
};

export function DashboardPreview() {
  const [activeTab, setActiveTab] = useState("environmental");
  const content = tabContent[activeTab];

  return (
    <section id="dashboard" className="py-20 lg:py-28 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHeading
          label="Live Dashboard"
          title="Real-Time ESG Monitoring"
          description="Interactive dashboard with live data. Switch between modules to see real-time performance metrics."
          center
        />

        <div className="mt-10">
          {/* Tabs */}
          <div className="flex flex-wrap gap-1 p-1 rounded-2xl border border-[hsl(var(--border))] bg-[hsl(var(--surface))] w-fit mx-auto mb-8">
            {tabs.map((tab) => {
              const isActive = activeTab === tab.id;
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={cn(
                    "flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-medium transition-all duration-200",
                    isActive
                      ? "text-white shadow-sm"
                      : "text-[hsl(var(--foreground-muted))] hover:text-[hsl(var(--foreground))] hover:bg-[hsl(var(--surface-overlay))]"
                  )}
                  style={isActive ? { background: tab.color } : {}}
                >
                  <tab.icon className="w-4 h-4" />
                  {tab.label}
                </button>
              );
            })}
          </div>

          {/* Content */}
          <AnimatePresence mode="wait">
            <motion.div
              key={activeTab}
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -12 }}
              transition={{ duration: 0.3 }}
            >
              <div className="card p-6 lg:p-8 shadow-glass-lg" style={{ background: "hsl(var(--surface-elevated))" }}>
                {/* KPI Row */}
                <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 mb-6">
                  {content.kpis.map((kpi) => (
                    <div key={kpi.label} className="rounded-xl p-3.5 text-center" style={{ background: "hsl(var(--surface-overlay))" }}>
                      <p className="text-lg lg:text-xl font-bold" style={{ color: kpi.color }}>{kpi.value}</p>
                      <p className="text-xs text-[hsl(var(--foreground-subtle))] mt-0.5">{kpi.label}</p>
                    </div>
                  ))}
                </div>

                {/* Mini Chart */}
                <div className="rounded-xl p-5" style={{ background: "hsl(var(--surface-overlay))" }}>
                  <p className="text-xs font-semibold text-[hsl(var(--foreground-muted))] mb-4 uppercase tracking-wider">Monthly Trend</p>
                  <div className="flex items-end gap-2 h-28">
                    {content.chartData.map((item, j) => (
                      <motion.div
                        key={item.label}
                        initial={{ height: 0 }}
                        animate={{ height: `${(item.value / Math.max(...content.chartData.map(d => d.value))) * 100}%` }}
                        transition={{ duration: 0.5, delay: j * 0.05 }}
                        className="flex-1 rounded-t-lg relative group/chart"
                        style={{ background: `linear-gradient(to top, ${item.color}, ${item.color}88)` }}
                      >
                        <div className="absolute -top-5 left-1/2 -translate-x-1/2 opacity-0 group-hover/chart:opacity-100 transition-opacity text-[10px] font-semibold text-[hsl(var(--foreground))]">
                          {item.value}
                        </div>
                      </motion.div>
                    ))}
                  </div>
                  <div className="flex justify-between mt-2">
                    {content.chartData.map((item) => (
                      <span key={item.label} className="text-[10px] text-[hsl(var(--foreground-subtle))]">{item.label}</span>
                    ))}
                  </div>
                </div>

                {/* Stats row */}
                <div className="grid grid-cols-3 gap-3 mt-5">
                  {content.stats.map((stat) => (
                    <div key={stat.label} className="flex items-center gap-2 rounded-xl p-3" style={{ background: "hsl(var(--surface-overlay))" }}>
                      <span className="text-base">{stat.icon}</span>
                      <div>
                        <p className="text-sm font-bold text-[hsl(var(--foreground))]">{stat.value}</p>
                        <p className="text-[10px] text-[hsl(var(--foreground-subtle))]">{stat.label}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </motion.div>
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
}
