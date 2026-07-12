"use client";

import { KPICard } from "@/components/dashboard/KPICard";
import { motion } from "framer-motion";
import {
  AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip,
  ResponsiveContainer, BarChart, Bar, PieChart, Pie, Cell,
  RadialBarChart, RadialBar, Legend,
} from "recharts";
import { Leaf, Wind, Users, Shield, Zap, Trophy, Star, BarChart3 } from "lucide-react";
import { cn } from "@/lib/utils";
import type { DashboardKPIs, MonthlyCarbonTrend, DeptESGScore, LeaderboardEntry, Notification } from "@/lib/types";

const BADGE_ICONS: Record<number, string> = { 1: "🌿", 2: "⚡", 3: "🌱", 4: "♻️", 5: "🌍", 6: "💚" };

const CustomTooltip = ({ active, payload, label }: any) => {
  if (!active || !payload?.length) return null;
  return (
    <div className="card px-3 py-2 text-xs" style={{ boxShadow: "var(--shadow-glass-lg)" }}>
      <p className="font-semibold mb-1" style={{ color: "hsl(var(--foreground))" }}>{label}</p>
      {payload.map((p: any) => (
        <div key={p.name} className="flex items-center gap-2">
          <span className="w-2 h-2 rounded-full" style={{ background: p.color }} />
          <span style={{ color: "hsl(var(--foreground-muted))" }}>{p.name}:</span>
          <span className="font-semibold" style={{ color: "hsl(var(--foreground))" }}>{p.value}</span>
        </div>
      ))}
    </div>
  );
};

interface Props {
  kpis: DashboardKPIs;
  carbonTrend: MonthlyCarbonTrend[];
  deptScores: DeptESGScore[];
  leaderboard: LeaderboardEntry[];
  notifications: Notification[];
}

export function DashboardClient({ kpis, carbonTrend, deptScores, leaderboard, notifications }: Props) {
  const carbonChange = kpis.prevCarbonTons > 0
    ? ((kpis.totalCarbonTons - kpis.prevCarbonTons) / kpis.prevCarbonTons) * 100
    : null;

  const kpiCards = [
    { title: "Overall ESG Score",      value: kpis.esgScore,            unit: "/100", change: null,          icon: Star,     iconColor: "text-yellow-500", iconBg: "bg-yellow-500/10",  gradient: "bg-gradient-to-r from-yellow-500 to-orange-500"  },
    { title: "Carbon Emission",         value: kpis.totalCarbonTons,     unit: "tCO₂", change: carbonChange,  icon: Wind,     iconColor: "text-primary-500",iconBg: "bg-primary-500/10", gradient: "bg-gradient-to-r from-primary-500 to-emerald-500" },
    { title: "CSR Participation",       value: kpis.csrParticipationPct, unit: "%",    change: null,          icon: Users,    iconColor: "text-accent-500", iconBg: "bg-accent-500/10",  gradient: "bg-gradient-to-r from-accent-500 to-blue-400"     },
    { title: "Compliance Rate",         value: kpis.compliancePct,       unit: "%",    change: null,          icon: Shield,   iconColor: "text-purple-500", iconBg: "bg-purple-500/10",  gradient: "bg-gradient-to-r from-purple-500 to-pink-500"     },
    { title: "Active Employees",        value: kpis.activeEmployees,     unit: "",     change: null,          icon: Users,    iconColor: "text-emerald-500",iconBg: "bg-emerald-500/10", gradient: "bg-gradient-to-r from-emerald-500 to-teal-500"    },
    { title: "Total XP Earned",         value: kpis.totalXP,             unit: "XP",   change: null,          icon: Trophy,   iconColor: "text-amber-500",  iconBg: "bg-amber-500/10",   gradient: "bg-gradient-to-r from-amber-500 to-yellow-500"    },
    { title: "Active Challenges",       value: kpis.activeChallenges,    unit: "",     change: null,          icon: Zap,      iconColor: "text-rose-500",   iconBg: "bg-rose-500/10",    gradient: "bg-gradient-to-r from-rose-500 to-pink-500"       },
    { title: "Departments",             value: deptScores.length,        unit: "",     change: null,          icon: BarChart3,iconColor: "text-cyan-500",   iconBg: "bg-cyan-500/10",    gradient: "bg-gradient-to-r from-cyan-500 to-blue-500"       },
  ];

  // Chart data from real DB
  const carbonChartData = carbonTrend.length > 0
    ? carbonTrend.map((m) => ({ month: m.month, emission: m.emission_tons, target: +(m.emission_tons * 0.9).toFixed(2) }))
    : [{ month: "No data", emission: 0, target: 0 }];

  const deptChartData = deptScores.map((d) => ({
    dept:          d.department.slice(0, 4),
    environmental: Math.round(+d.environmental_score),
    social:        Math.round(+d.social_score),
    governance:    Math.round(+d.governance_score),
  }));

  const compliancePie = [
    { name: "Compliant", value: kpis.compliancePct,           fill: "#22c55e" },
    { name: "Pending",   value: Math.max(0, 100 - kpis.compliancePct - 3), fill: "#f59e0b" },
    { name: "Non-Comp.", value: 3,                             fill: "#ef4444" },
  ];

  return (
    <div className="page-wrapper">
      {/* Greeting */}
      <motion.div initial={{ opacity: 0, y: -8 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.4 }}
        className="flex items-center justify-between">
        <div>
          <h2 className="text-xl font-bold" style={{ color: "hsl(var(--foreground))" }}>Good morning, Admin 👋</h2>
          <p className="text-sm mt-0.5" style={{ color: "hsl(var(--foreground-muted))" }}>
            ESG Score: <span className="font-semibold" style={{ color: "#22c55e" }}>{kpis.esgScore}/100</span> — Keep driving sustainability!
          </p>
        </div>
        <div className="hidden md:flex items-center gap-2 px-4 py-2 rounded-2xl" style={{ background: "rgba(34,197,94,0.1)", border: "1px solid rgba(34,197,94,0.2)" }}>
          <Leaf className="w-4 h-4" style={{ color: "#22c55e" }} />
          <span className="text-sm font-semibold" style={{ color: "#16a34a" }}>Live ESG Data</span>
        </div>
      </motion.div>

      {/* KPI Grid */}
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
        {kpiCards.map((card, i) => <KPICard key={card.title} {...card} index={i} />)}
      </div>

      {/* Charts Row 1 */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        {/* Carbon Trend */}
        <div className="card p-5">
          <div className="flex items-center justify-between mb-5">
            <div>
              <h3 className="section-title">Carbon Emission Trend</h3>
              <p className="section-subtitle">Monthly tCO₂ (live data)</p>
            </div>
          </div>
          <ResponsiveContainer width="100%" height={220}>
            <AreaChart data={carbonChartData} margin={{ top: 4, right: 4, left: -20, bottom: 0 }}>
              <defs>
                <linearGradient id="emGrad" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%"  stopColor="#22c55e" stopOpacity={0.25} />
                  <stop offset="95%" stopColor="#22c55e" stopOpacity={0} />
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" opacity={0.5} />
              <XAxis dataKey="month" tick={{ fontSize: 11, fill: "hsl(var(--foreground-muted))" }} axisLine={false} tickLine={false} />
              <YAxis tick={{ fontSize: 11, fill: "hsl(var(--foreground-muted))" }} axisLine={false} tickLine={false} />
              <Tooltip content={<CustomTooltip />} />
              <Area type="monotone" dataKey="emission" name="Emission" stroke="#22c55e" strokeWidth={2} fill="url(#emGrad)" dot={false} activeDot={{ r: 5, fill: "#22c55e" }} />
              <Area type="monotone" dataKey="target"   name="Target"   stroke="#3b82f6" strokeWidth={2} strokeDasharray="5 3" fill="none" dot={false} />
            </AreaChart>
          </ResponsiveContainer>
        </div>

        {/* Dept ESG */}
        <div className="card p-5">
          <div className="mb-5">
            <h3 className="section-title">Department ESG Comparison</h3>
            <p className="section-subtitle">E / S / G scores by department</p>
          </div>
          <div className="flex items-center gap-4 text-xs mb-4">
            {[["#22c55e","Environmental"],["#3b82f6","Social"],["#a855f7","Governance"]].map(([c,l])=>(
              <span key={l} className="flex items-center gap-1.5">
                <span className="w-2.5 h-2.5 rounded-sm" style={{ background: c }} />
                <span style={{ color: "hsl(var(--foreground-muted))" }}>{l}</span>
              </span>
            ))}
          </div>
          <ResponsiveContainer width="100%" height={200}>
            <BarChart data={deptChartData} margin={{ top: 4, right: 4, left: -20, bottom: 0 }} barGap={2}>
              <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" opacity={0.5} vertical={false} />
              <XAxis dataKey="dept" tick={{ fontSize: 10, fill: "hsl(var(--foreground-muted))" }} axisLine={false} tickLine={false} />
              <YAxis domain={[0, 100]} tick={{ fontSize: 10, fill: "hsl(var(--foreground-muted))" }} axisLine={false} tickLine={false} />
              <Tooltip content={<CustomTooltip />} />
              <Bar dataKey="environmental" name="Environmental" fill="#22c55e" radius={[4,4,0,0]} maxBarSize={14} />
              <Bar dataKey="social"        name="Social"        fill="#3b82f6" radius={[4,4,0,0]} maxBarSize={14} />
              <Bar dataKey="governance"    name="Governance"    fill="#a855f7" radius={[4,4,0,0]} maxBarSize={14} />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Charts Row 2 + Leaderboard */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
        {/* Governance Donut */}
        <div className="card p-5">
          <h3 className="section-title mb-1">Governance Compliance</h3>
          <p className="section-subtitle mb-2">Policy acceptance overview</p>
          <ResponsiveContainer width="100%" height={200}>
            <PieChart>
              <Pie data={compliancePie} cx="50%" cy="50%" innerRadius={55} outerRadius={80} paddingAngle={3} dataKey="value">
                {compliancePie.map((entry, i) => <Cell key={i} fill={entry.fill} stroke="transparent" />)}
              </Pie>
              <Tooltip content={<CustomTooltip />} />
              <Legend formatter={(v) => <span className="text-xs" style={{ color: "hsl(var(--foreground-muted))" }}>{v}</span>} />
            </PieChart>
          </ResponsiveContainer>
        </div>

        {/* CSR Radial */}
        <div className="card p-5">
          <h3 className="section-title mb-1">CSR Participation</h3>
          <p className="section-subtitle mb-2">Employee engagement rate</p>
          <div className="relative flex items-center justify-center">
            <ResponsiveContainer width="100%" height={200}>
              <RadialBarChart cx="50%" cy="50%" innerRadius="55%" outerRadius="80%" barSize={16}
                data={[{ name: "Participation", value: kpis.csrParticipationPct, fill: "#22c55e" }]}
                startAngle={225} endAngle={-45}>
                <RadialBar background={{ fill: "hsl(var(--surface-overlay))" }} dataKey="value" cornerRadius={8} />
              </RadialBarChart>
            </ResponsiveContainer>
            <div className="absolute inset-0 flex flex-col items-center justify-center">
              <span className="text-3xl font-bold" style={{ color: "hsl(var(--foreground))" }}>{kpis.csrParticipationPct}%</span>
              <span className="text-xs" style={{ color: "hsl(var(--foreground-muted))" }}>Joined</span>
            </div>
          </div>
        </div>

        {/* Leaderboard */}
        <div className="card p-5">
          <div className="flex items-center justify-between mb-5">
            <div>
              <h3 className="section-title">Top Contributors</h3>
              <p className="section-subtitle">This month's leaderboard</p>
            </div>
            <a href="/gamification/leaderboard" className="text-xs font-medium transition-colors" style={{ color: "#22c55e" }}>View All →</a>
          </div>
          <div className="space-y-2">
            {leaderboard.map((user, i) => (
              <motion.div key={user.id} initial={{ opacity: 0, x: -12 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: i * 0.06 }}
                className="flex items-center gap-3 p-2.5 rounded-xl hover:bg-[hsl(var(--surface-overlay))] transition-colors">
                <div className={cn("w-6 h-6 rounded-lg flex items-center justify-center text-xs font-bold shrink-0",
                  i===0?"bg-yellow-400/20 text-yellow-500":i===1?"bg-gray-400/20 text-gray-400":i===2?"bg-orange-400/20 text-orange-400":"bg-[hsl(var(--surface-overlay))]")}>
                  {i < 3 ? <Trophy className="w-3 h-3" /> : user.rank}
                </div>
                <div className="w-8 h-8 rounded-xl flex items-center justify-center text-xs font-bold shrink-0"
                  style={{ background: "linear-gradient(135deg,rgba(34,197,94,0.3),rgba(59,130,246,0.3))", color: "#22c55e" }}>
                  {user.avatar ?? user.name.slice(0,2).toUpperCase()}
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-semibold truncate" style={{ color: "hsl(var(--foreground))" }}>{user.name}</p>
                  <p className="text-xs truncate" style={{ color: "hsl(var(--foreground-muted))" }}>{user.department}</p>
                </div>
                <div className="text-right shrink-0">
                  <p className="text-sm font-bold" style={{ color: "#22c55e" }}>{user.xp.toLocaleString()}</p>
                  <p className="text-xs" style={{ color: "hsl(var(--foreground-subtle))" }}>XP</p>
                </div>
                <span className="text-base">{BADGE_ICONS[i + 1] ?? "⭐"}</span>
              </motion.div>
            ))}
          </div>
        </div>
      </div>

      {/* Activity + ESG Breakdown */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        {/* Activity feed */}
        <div className="card p-5">
          <div className="flex items-center justify-between mb-5">
            <div>
              <h3 className="section-title">Recent Activity</h3>
              <p className="section-subtitle">Live platform events</p>
            </div>
            <span className="flex items-center gap-1.5 text-xs" style={{ color: "#22c55e" }}>
              <span className="w-1.5 h-1.5 rounded-full bg-primary-500 animate-pulse-green" style={{ background: "#22c55e" }} />Live
            </span>
          </div>
          <div>
            {notifications.length === 0 ? (
              <p className="text-sm text-center py-6" style={{ color: "hsl(var(--foreground-muted))" }}>No recent activity. Run the seed script!</p>
            ) : notifications.map((n, i) => (
              <motion.div key={n.id} initial={{ opacity: 0, x: 12 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: i * 0.07 }}
                className="flex gap-3 py-3 border-b last:border-0 -mx-2 px-2 rounded-xl hover:bg-[hsl(var(--surface-overlay))]/40 transition-colors"
                style={{ borderColor: "hsl(var(--border-muted))" }}>
                <div className="w-8 h-8 rounded-xl flex items-center justify-center text-sm shrink-0" style={{ background: "hsl(var(--surface-overlay))" }}>
                  {n.icon}
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm" style={{ color: "hsl(var(--foreground))" }}>{n.message}</p>
                  <p className="text-xs mt-0.5" style={{ color: "hsl(var(--foreground-subtle))" }}>
                    {new Date(n.created_at).toLocaleTimeString("en-IN", { hour: "2-digit", minute: "2-digit" })}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>

        {/* ESG Breakdown */}
        <div className="card p-5">
          <div className="mb-5">
            <h3 className="section-title">ESG Score Breakdown</h3>
            <p className="section-subtitle">Pillar-wise performance</p>
          </div>
          <div className="space-y-4">
            {[
              { label: "Environmental", score: Math.round(deptScores.reduce((s,d)=>s+ +d.environmental_score,0)/Math.max(deptScores.length,1)), color: "#22c55e" },
              { label: "Social",        score: Math.round(deptScores.reduce((s,d)=>s+ +d.social_score,0)/Math.max(deptScores.length,1)),        color: "#3b82f6" },
              { label: "Governance",    score: Math.round(deptScores.reduce((s,d)=>s+ +d.governance_score,0)/Math.max(deptScores.length,1)),    color: "#a855f7" },
            ].map((pillar, i) => (
              <motion.div key={pillar.label} initial={{ opacity: 0, x: -12 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: i * 0.1 + 0.3 }}>
                <div className="flex items-center justify-between text-sm mb-2">
                  <span className="font-medium" style={{ color: "hsl(var(--foreground))" }}>{pillar.label}</span>
                  <span className="font-bold" style={{ color: pillar.color }}>{pillar.score}/100</span>
                </div>
                <div className="w-full h-2.5 rounded-full overflow-hidden" style={{ background: "hsl(var(--surface-overlay))" }}>
                  <motion.div initial={{ width: 0 }} animate={{ width: `${pillar.score}%` }}
                    transition={{ duration: 0.8, delay: i * 0.15 + 0.4 }}
                    className="h-full rounded-full" style={{ background: pillar.color }} />
                </div>
              </motion.div>
            ))}
            <div className="mt-6 pt-4 border-t" style={{ borderColor: "hsl(var(--border-muted))" }}>
              <div className="grid grid-cols-3 gap-3 text-center">
                {[
                  { label: "Departments", value: deptScores.length,    icon: "🏢" },
                  { label: "Total XP",    value: `${Math.round(kpis.totalXP/1000)}K`, icon: "⚡" },
                  { label: "Compliance",  value: `${kpis.compliancePct}%`, icon: "✅" },
                ].map((stat) => (
                  <div key={stat.label} className="rounded-xl p-3" style={{ background: "hsl(var(--surface-overlay))" }}>
                    <p className="text-xl mb-0.5">{stat.icon}</p>
                    <p className="text-sm font-bold" style={{ color: "hsl(var(--foreground))" }}>{stat.value}</p>
                    <p className="section-subtitle" style={{ fontSize: "0.625rem" }}>{stat.label}</p>
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
