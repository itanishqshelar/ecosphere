"use client";

import { motion } from "framer-motion";
import { SectionHeading } from "./SectionHeading";
import {
  LayoutDashboard, Shield, BarChart3, Wind, FileText,
  Users, Bell, Gift, Settings, KeyRound, Building2, RefreshCw,
} from "lucide-react";

const features = [
  { icon: LayoutDashboard, title: "Unified ESG Platform", description: "All ESG metrics in one place — no more scattered spreadsheets or disconnected tools.", color: "text-primary-500", bg: "bg-primary-500/10" },
  { icon: Shield, title: "Enterprise Governance", description: "Role-based access, approval workflows, and complete audit trails for every action.", color: "text-purple-500", bg: "bg-purple-500/10" },
  { icon: BarChart3, title: "Department Scorecards", description: "Real-time ESG scores, rankings, and performance comparisons across departments.", color: "text-accent-500", bg: "bg-accent-500/10" },
  { icon: Wind, title: "Automated Carbon Accounting", description: "Auto-calculate CO₂ emissions using pre-configured factors. No manual calculations.", color: "text-emerald-500", bg: "bg-emerald-500/10" },
  { icon: FileText, title: "Audit-Ready Reports", description: "Generate comprehensive ESG reports with one click. Export to PDF, CSV, or Excel.", color: "text-rose-500", bg: "bg-rose-500/10" },
  { icon: Users, title: "Employee Engagement", description: "Drive participation through challenges, CSR events, and gamified experiences.", color: "text-amber-500", bg: "bg-amber-500/10" },
  { icon: Bell, title: "Real-time Notifications", description: "Instant alerts for policy updates, challenge deadlines, and approval requests.", color: "text-sky-500", bg: "bg-sky-500/10" },
  { icon: Gift, title: "Reward System", description: "Let employees redeem XP for real rewards — vouchers, leave days, gift cards, and more.", color: "text-yellow-500", bg: "bg-yellow-500/10" },
  { icon: Settings, title: "Configurable Workflows", description: "Customize emission factors, scoring rules, policy templates, and challenge parameters.", color: "text-indigo-500", bg: "bg-indigo-500/10" },
  { icon: KeyRound, title: "Role-Based Access", description: "Granular permissions for ESG admins, department heads, auditors, and employees.", color: "text-cyan-500", bg: "bg-cyan-500/10" },
  { icon: Building2, title: "Multi-Department Support", description: "Manage ESG across engineering, HR, finance, operations, and every business unit.", color: "text-orange-500", bg: "bg-orange-500/10" },
  { icon: RefreshCw, title: "Real-time Sync", description: "Live data synchronization across all modules with Supabase real-time capabilities.", color: "text-teal-500", bg: "bg-teal-500/10" },
];

export function WhyEcoSphere() {
  return (
    <section className="py-20 lg:py-28 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHeading
          label="Why GreenPulse AI"
          title="Enterprise-Grade ESG Management"
          description="Built for organizations that take sustainability seriously. Every feature addresses a real enterprise need."
          center
        />

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4 mt-14">
          {features.map((feature, i) => (
            <motion.div
              key={feature.title}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.4, delay: i * 0.04 }}
              className="card p-5 group hover:shadow-card-hover transition-all duration-300"
            >
              <div className={`w-10 h-10 rounded-xl ${feature.bg} flex items-center justify-center mb-3 group-hover:scale-110 transition-transform duration-300`}>
                <feature.icon className={`w-5 h-5 ${feature.color}`} />
              </div>
              <h4 className="font-semibold text-sm text-[hsl(var(--foreground))] mb-1.5">{feature.title}</h4>
              <p className="text-xs text-[hsl(var(--foreground-muted))] leading-relaxed">{feature.description}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
