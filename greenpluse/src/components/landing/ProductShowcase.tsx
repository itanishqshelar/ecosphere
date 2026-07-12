"use client";

import { motion } from "framer-motion";
import { Leaf, Users, Shield, Trophy, ArrowRight } from "lucide-react";
import { SectionHeading } from "./SectionHeading";

const modules = [
  {
    id: "environmental",
    title: "Environmental Module",
    description: "Comprehensive carbon accounting with real-time emission tracking, factor management, and sustainability goal monitoring.",
    features: [
      "Log carbon transactions with pre-calculated emission factors",
      "Track department-level carbon footprints",
      "Set and monitor ESG reduction goals",
      "Visualize emission trends with interactive charts",
    ],
    icon: Leaf,
    color: "text-primary-500",
    gradient: "from-primary-500 to-emerald-500",
    bgColor: "rgba(34,197,94,0.05)",
    border: "rgba(34,197,94,0.15)",
    chartData: [42, 38, 35, 32, 28, 24, 21],
  },
  {
    id: "social",
    title: "Social Module",
    description: "Drive corporate social responsibility with event management, participation tracking, and employee engagement analytics.",
    features: [
      "Create and manage CSR activities",
      "Track employee participation rates",
      "Upload proof of participation",
      "Award points for social contributions",
    ],
    icon: Users,
    color: "text-accent-500",
    gradient: "from-accent-500 to-blue-400",
    bgColor: "rgba(59,130,246,0.05)",
    border: "rgba(59,130,246,0.15)",
    chartData: [28, 35, 42, 38, 45, 52, 48],
  },
  {
    id: "governance",
    title: "Governance Module",
    description: "Enterprise-grade policy management with acknowledgment tracking, compliance monitoring, and audit-ready documentation.",
    features: [
      "Distribute policies across departments",
      "Track employee acknowledgments in real-time",
      "Schedule and conduct compliance audits",
      "Manage compliance issues with severity levels",
    ],
    icon: Shield,
    color: "text-purple-500",
    gradient: "from-purple-500 to-pink-500",
    bgColor: "rgba(168,85,247,0.05)",
    border: "rgba(168,85,247,0.15)",
    chartData: [85, 88, 82, 90, 87, 92, 91],
  },
  {
    id: "gamification",
    title: "Gamification Module",
    description: "Boost employee engagement with challenges, XP, badges, leaderboards, and a rewards store that drives sustainable behavior.",
    features: [
      "Create sustainability challenges with XP rewards",
      "Award badges for achievements",
      "Department and individual leaderboards",
      "Reward store for XP redemption",
    ],
    icon: Trophy,
    color: "text-amber-500",
    gradient: "from-amber-500 to-yellow-500",
    bgColor: "rgba(245,158,11,0.05)",
    border: "rgba(245,158,11,0.15)",
    chartData: [1200, 2400, 3600, 4800, 6000, 7200, 8400],
  },
];

export function ProductShowcase() {
  return (
    <section id="modules" className="py-20 lg:py-28 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHeading
          label="Product Modules"
          title="Everything You Need for ESG Management"
          description="Four integrated modules that work together to provide a complete ESG management solution."
          center
        />

        <div className="mt-14 space-y-20 lg:space-y-28">
          {modules.map((mod, i) => (
            <motion.div
              key={mod.id}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.6 }}
              className={`grid lg:grid-cols-2 gap-10 lg:gap-16 items-center ${i % 2 === 1 ? "lg:grid-flow-dense" : ""}`}
            >
              {/* Text */}
              <div className={i % 2 === 1 ? "lg:col-start-2" : ""}>
                <div className={`w-12 h-12 rounded-xl ${mod.color.replace("text", "bg")}/10 flex items-center justify-center mb-4`}>
                  <mod.icon className={`w-6 h-6 ${mod.color}`} />
                </div>
                <h3 className="text-2xl lg:text-3xl font-bold text-[hsl(var(--foreground))] mb-3">{mod.title}</h3>
                <p className="text-base text-[hsl(var(--foreground-muted))] leading-relaxed mb-6">{mod.description}</p>
                <ul className="space-y-3">
                  {mod.features.map((f) => (
                    <li key={f} className="flex items-start gap-3 text-sm text-[hsl(var(--foreground))]">
                      <span className={`w-5 h-5 rounded-lg ${mod.color.replace("text", "bg")}/10 flex items-center justify-center shrink-0 mt-0.5`}>
                        <ArrowRight className={`w-3 h-3 ${mod.color}`} />
                      </span>
                      {f}
                    </li>
                  ))}
                </ul>
                <a
                  href={`/${mod.id === "gamification" ? "gamification/challenges" : mod.id === "environmental" ? "environmental/carbon" : mod.id === "social" ? "social/csr" : "governance/policies"}`}
                  className={`inline-flex items-center gap-1.5 mt-6 text-sm font-semibold ${mod.color} hover:opacity-80 transition-opacity`}
                >
                  Explore {mod.title.split(" ")[0]} Module <ArrowRight className="w-3.5 h-3.5" />
                </a>
              </div>

              {/* Mockup */}
              <div className={i % 2 === 1 ? "lg:col-start-1" : ""}>
                <div
                  className="card p-5 lg:p-6 shadow-glass-lg relative overflow-hidden"
                  style={{ background: "hsl(var(--surface-elevated))" }}
                >
                  {/* Mini KPI cards */}
                  <div className="grid grid-cols-3 gap-2 mb-4">
                    {[75, 82, 91].map((val, j) => (
                      <div key={j} className="rounded-xl p-3 text-center" style={{ background: mod.bgColor, border: `1px solid ${mod.border}` }}>
                        <p className={`text-lg font-bold ${mod.color}`}>{val}%</p>
                        <p className="text-[10px] text-[hsl(var(--foreground-subtle))]">
                          {["Performance", "Engagement", "Compliance"][j]}
                        </p>
                      </div>
                    ))}
                  </div>

                  {/* Animated bar chart */}
                  <div className="flex items-end gap-2 h-32 mt-2">
                    {mod.chartData.map((val, j) => (
                      <motion.div
                        key={j}
                        initial={{ height: 0 }}
                        whileInView={{ height: `${(val / Math.max(...mod.chartData)) * 100}%` }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.6, delay: j * 0.08 + 0.3 }}
                        className="flex-1 rounded-t-lg relative group/chart"
                        style={{ background: `linear-gradient(to top, ${mod.color.replace("text-", "")}, ${mod.color.replace("text-", "")}88)` }}
                      >
                        <div className="absolute -top-6 left-1/2 -translate-x-1/2 opacity-0 group-hover/chart:opacity-100 transition-opacity text-xs font-semibold text-[hsl(var(--foreground))]">
                          {val}
                        </div>
                      </motion.div>
                    ))}
                  </div>

                  {/* Activity rows */}
                  <div className="mt-4 pt-3 border-t border-[hsl(var(--border-muted))] space-y-2">
                    {[
                      { label: `${mod.title.split(" ")[0]} score improved`, time: "2 min ago" },
                      { label: "New transaction recorded", time: "15 min ago" },
                      { label: "Department target updated", time: "1 hr ago" },
                    ].map((act, j) => (
                      <motion.div
                        key={act.label}
                        initial={{ opacity: 0, x: -8 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.5 + j * 0.08 }}
                        className="flex items-center justify-between text-xs"
                      >
                        <span className="text-[hsl(var(--foreground))]">{act.label}</span>
                        <span className="text-[hsl(var(--foreground-subtle))]">{act.time}</span>
                      </motion.div>
                    ))}
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
