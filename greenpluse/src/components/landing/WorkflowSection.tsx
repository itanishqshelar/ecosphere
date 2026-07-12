"use client";

import { motion } from "framer-motion";
import { SectionHeading } from "./SectionHeading";
import { Settings, Database, Wind, Users, Trophy, BarChart3, LayoutDashboard, FileText } from "lucide-react";

const steps = [
  {
    icon: Settings,
    title: "Master Configuration",
    description: "Configure emission factors, department hierarchies, policy templates, and gamification rules.",
    color: "text-primary-500",
    bg: "bg-primary-500/10",
  },
  {
    icon: Database,
    title: "Business Operations",
    description: "Employees log carbon transactions, participate in CSR events, and accept governance policies.",
    color: "text-accent-500",
    bg: "bg-accent-500/10",
  },
  {
    icon: Wind,
    title: "Carbon Engine",
    description: "Automatic CO₂ calculation using pre-configured emission factors with real-time validation.",
    color: "text-emerald-500",
    bg: "bg-emerald-500/10",
  },
  {
    icon: Users,
    title: "Employee Participation",
    description: "Employees join challenges, earn XP, unlock badges, and climb the leaderboard.",
    color: "text-amber-500",
    bg: "bg-amber-500/10",
  },
  {
    icon: Trophy,
    title: "Scoring Engine",
    description: "Automated ESG scoring across Environmental, Social, and Governance pillars per department.",
    color: "text-purple-500",
    bg: "bg-purple-500/10",
  },
  {
    icon: BarChart3,
    title: "Department Rankings",
    description: "Compare department performance with real-time leaderboards and ESG scorecards.",
    color: "text-rose-500",
    bg: "bg-rose-500/10",
  },
  {
    icon: LayoutDashboard,
    title: "Executive Dashboard",
    description: "Real-time ESG monitoring with KPIs, trends, compliance status, and actionable insights.",
    color: "text-primary-500",
    bg: "bg-primary-500/10",
  },
  {
    icon: FileText,
    title: "Reports & Export",
    description: "Generate audit-ready ESG reports with interactive filters. Export to PDF, CSV, or Excel.",
    color: "text-accent-500",
    bg: "bg-accent-500/10",
  },
];

export function WorkflowSection() {
  return (
    <section className="py-20 lg:py-28 relative overflow-hidden">
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] rounded-full bg-primary-500/[0.02]" />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHeading
          label="How It Works"
          title="From Configuration to Reporting"
          description="A streamlined workflow that connects every aspect of ESG management into a single, cohesive system."
          center
        />

        <div className="relative mt-14">
          {/* SVG connector line (desktop) */}
          <svg className="hidden lg:block absolute top-0 left-[50px] w-1 h-full" style={{ color: "hsl(var(--border))" }}>
            <motion.line
              x1="0" y1="0" x2="0" y2="100%"
              stroke="currentColor"
              strokeWidth="1"
              strokeDasharray="6 4"
              initial={{ pathLength: 0 }}
              whileInView={{ pathLength: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 2 }}
            />
          </svg>

          <div className="grid lg:grid-cols-2 gap-4">
            {steps.map((step, i) => (
              <motion.div
                key={step.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-60px" }}
                transition={{ duration: 0.4, delay: i * 0.08 }}
                className="card p-5 flex items-start gap-4 group hover:shadow-card-hover transition-all duration-300"
              >
                <div className={`w-12 h-12 rounded-xl ${step.bg} flex items-center justify-center shrink-0 group-hover:scale-110 transition-transform duration-300`}>
                  <step.icon className={`w-6 h-6 ${step.color}`} />
                </div>
                <div>
                  <div className="flex items-center gap-2 mb-1">
                    <span className="text-xs font-mono text-[hsl(var(--foreground-subtle))]">0{i + 1}</span>
                    <h4 className="font-semibold text-[hsl(var(--foreground))]">{step.title}</h4>
                  </div>
                  <p className="text-sm text-[hsl(var(--foreground-muted))] leading-relaxed">{step.description}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
