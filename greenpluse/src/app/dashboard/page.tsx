"use client";

import { KPICard } from "@/components/dashboard/KPICard";
import { CarbonTrendChart, DeptESGChart, GovernanceDonutChart, CSRRadialChart } from "@/components/dashboard/Charts";
import { TopContributors } from "@/components/dashboard/TopContributors";
import { RecentActivityFeed } from "@/components/dashboard/RecentActivity";
import { mockKPIs } from "@/lib/mock-data";
import {
  Leaf, Wind, Users, Shield, Zap, Trophy, Star, BarChart3,
} from "lucide-react";
import { motion } from "framer-motion";

const kpiCards = [
  {
    title: "Overall ESG Score",
    value: mockKPIs.esgScore.value,
    unit: mockKPIs.esgScore.unit,
    prev: mockKPIs.esgScore.prev,
    icon: Star,
    iconColor: "text-yellow-500",
    iconBg: "bg-yellow-500/10",
    gradient: "bg-gradient-to-r from-yellow-500 to-orange-500",
  },
  {
    title: "Carbon Emission",
    value: mockKPIs.carbonEmission.value,
    unit: "tCO₂",
    prev: mockKPIs.carbonEmission.prev,
    icon: Wind,
    iconColor: "text-primary-500",
    iconBg: "bg-primary-500/10",
    gradient: "bg-gradient-to-r from-primary-500 to-emerald-500",
  },
  {
    title: "CSR Participation",
    value: mockKPIs.csrParticipation.value,
    unit: "%",
    prev: mockKPIs.csrParticipation.prev,
    icon: Users,
    iconColor: "text-accent-500",
    iconBg: "bg-accent-500/10",
    gradient: "bg-gradient-to-r from-accent-500 to-blue-400",
  },
  {
    title: "Compliance Rate",
    value: mockKPIs.complianceRate.value,
    unit: "%",
    prev: mockKPIs.complianceRate.prev,
    icon: Shield,
    iconColor: "text-purple-500",
    iconBg: "bg-purple-500/10",
    gradient: "bg-gradient-to-r from-purple-500 to-pink-500",
  },
  {
    title: "Employee Engagement",
    value: mockKPIs.employeeEngagement.value,
    unit: "%",
    prev: mockKPIs.employeeEngagement.prev,
    icon: Zap,
    iconColor: "text-emerald-500",
    iconBg: "bg-emerald-500/10",
    gradient: "bg-gradient-to-r from-emerald-500 to-teal-500",
  },
  {
    title: "Total XP Earned",
    value: mockKPIs.totalXP.value,
    unit: "XP",
    prev: mockKPIs.totalXP.prev,
    icon: Trophy,
    iconColor: "text-amber-500",
    iconBg: "bg-amber-500/10",
    gradient: "bg-gradient-to-r from-amber-500 to-yellow-500",
  },
  {
    title: "Leaderboard Rank",
    value: `#${mockKPIs.leaderboardRank.value}`,
    prev: mockKPIs.leaderboardRank.prev,
    icon: Star,
    iconColor: "text-rose-500",
    iconBg: "bg-rose-500/10",
    gradient: "bg-gradient-to-r from-rose-500 to-pink-500",
  },
  {
    title: "Department Score",
    value: mockKPIs.departmentScore.value,
    unit: "/100",
    prev: mockKPIs.departmentScore.prev,
    icon: BarChart3,
    iconColor: "text-cyan-500",
    iconBg: "bg-cyan-500/10",
    gradient: "bg-gradient-to-r from-cyan-500 to-blue-500",
  },
];

export default function DashboardPage() {
  return (
    <div className="page-wrapper">
      {/* ── Hero Greeting ───────────────────────────────── */}
      <motion.div
        initial={{ opacity: 0, y: -8 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
        className="flex items-center justify-between"
      >
        <div>
          <h2 className="text-xl font-bold text-[hsl(var(--foreground))]">
            Good morning, Admin 👋
          </h2>
          <p className="text-sm text-[hsl(var(--foreground-muted))] mt-0.5">
            Your ESG score improved by <span className="text-primary-500 font-semibold">8%</span> this month. Keep it up!
          </p>
        </div>
        <div className="hidden md:flex items-center gap-2 px-4 py-2 rounded-2xl bg-primary-500/10 border border-primary-500/20">
          <Leaf className="w-4 h-4 text-primary-500" />
          <span className="text-sm font-semibold text-primary-600 dark:text-primary-400">ESG Score: 82/100</span>
        </div>
      </motion.div>

      {/* ── KPI Grid ────────────────────────────────────── */}
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
        {kpiCards.map((card, i) => (
          <KPICard key={card.title} {...card} index={i} />
        ))}
      </div>

      {/* ── Charts Row 1 ────────────────────────────────── */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        <CarbonTrendChart />
        <DeptESGChart />
      </div>

      {/* ── Charts Row 2 + Leaderboard ───────────────────── */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
        <GovernanceDonutChart />
        <CSRRadialChart />
        <TopContributors />
      </div>

      {/* ── Activity Feed ────────────────────────────────── */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        <RecentActivityFeed />

        {/* ESG Score Breakdown card */}
        <div className="card p-5">
          <div className="mb-5">
            <h3 className="section-title">ESG Score Breakdown</h3>
            <p className="section-subtitle">Pillar-wise performance</p>
          </div>
          <div className="space-y-4">
            {[
              { label: "Environmental", score: 85, color: "bg-primary-500", textColor: "text-primary-500" },
              { label: "Social",        score: 78, color: "bg-accent-500",  textColor: "text-accent-500"  },
              { label: "Governance",    score: 91, color: "bg-purple-500",  textColor: "text-purple-500"  },
            ].map((pillar, i) => (
              <motion.div
                key={pillar.label}
                initial={{ opacity: 0, x: -12 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: i * 0.1 + 0.3 }}
              >
                <div className="flex items-center justify-between text-sm mb-2">
                  <span className="font-medium text-[hsl(var(--foreground))]">{pillar.label}</span>
                  <span className={`font-bold ${pillar.textColor}`}>{pillar.score}/100</span>
                </div>
                <div className="w-full h-2.5 bg-[hsl(var(--surface-overlay))] rounded-full overflow-hidden">
                  <motion.div
                    initial={{ width: 0 }}
                    animate={{ width: `${pillar.score}%` }}
                    transition={{ duration: 0.8, delay: i * 0.15 + 0.4, ease: "easeOut" }}
                    className={`h-full rounded-full ${pillar.color}`}
                  />
                </div>
              </motion.div>
            ))}

            <div className="mt-6 pt-4 border-t border-[hsl(var(--border-muted))]">
              <div className="grid grid-cols-3 gap-3 text-center">
                {[
                  { label: "Carbon Saved", value: "140t", icon: "🌿" },
                  { label: "CSR Events",   value: "24",   icon: "🤝" },
                  { label: "Policies",     value: "98%",  icon: "✅" },
                ].map((stat) => (
                  <div key={stat.label} className="bg-[hsl(var(--surface-overlay))] rounded-xl p-3">
                    <p className="text-xl mb-0.5">{stat.icon}</p>
                    <p className="text-sm font-bold text-[hsl(var(--foreground))]">{stat.value}</p>
                    <p className="text-2xs text-[hsl(var(--foreground-muted))]">{stat.label}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
