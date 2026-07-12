"use client";

import { motion } from "framer-motion";
import { Leaf, Users, Shield, Trophy, Zap } from "lucide-react";
import { SectionHeading } from "./SectionHeading";

const pillars = [
  {
    icon: Leaf,
    title: "Environmental",
    description: "Track carbon emissions, manage emission factors, set sustainability goals, and monitor real-time carbon transactions across all departments.",
    color: "text-primary-500",
    bg: "bg-primary-500/10",
    border: "border-primary-500/20",
    features: ["Carbon Accounting", "Emission Factors", "ESG Goals", "Real-time Monitoring"],
  },
  {
    icon: Users,
    title: "Social",
    description: "Drive CSR initiatives, track employee participation, manage diversity metrics, and foster a culture of social responsibility.",
    color: "text-accent-500",
    bg: "bg-accent-500/10",
    border: "border-accent-500/20",
    features: ["CSR Activities", "Employee Engagement", "Diversity Tracking", "Training Programs"],
  },
  {
    icon: Shield,
    title: "Governance",
    description: "Enforce ESG policies, manage compliance issues, conduct audits, and maintain a transparent governance framework.",
    color: "text-purple-500",
    bg: "bg-purple-500/10",
    border: "border-purple-500/20",
    features: ["Policy Management", "Audit Trails", "Compliance Tracking", "Approval Workflows"],
  },
  {
    icon: Trophy,
    title: "Gamification",
    description: "Engage employees through challenges, XP, badges, leaderboards, and a rewards store that makes sustainability fun and competitive.",
    color: "text-amber-500",
    bg: "bg-amber-500/10",
    border: "border-amber-500/20",
    features: ["Challenges & XP", "Badges & Achievements", "Leaderboards", "Rewards Store"],
  },
];

export function ValueProposition() {
  return (
    <section id="features" className="py-20 lg:py-28 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHeading
          label="Platform Overview"
          title="Four Pillars of Enterprise ESG"
          description="A comprehensive platform covering every aspect of ESG management, from carbon accounting to employee engagement."
          center
        />

        <div className="grid md:grid-cols-2 gap-6 mt-14">
          {pillars.map((pillar, i) => (
            <motion.div
              key={pillar.title}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-80px" }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
              className={`card p-6 lg:p-8 border ${pillar.border} group hover:shadow-card-hover transition-all duration-300`}
            >
              <div className={`w-12 h-12 rounded-xl ${pillar.bg} flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300`}>
                <pillar.icon className={`w-6 h-6 ${pillar.color}`} />
              </div>
              <h3 className="text-xl font-bold text-[hsl(var(--foreground))] mb-2">{pillar.title}</h3>
              <p className="text-sm text-[hsl(var(--foreground-muted))] leading-relaxed mb-4">{pillar.description}</p>
              <div className="flex flex-wrap gap-2">
                {pillar.features.map((f) => (
                  <span key={f} className={`inline-flex items-center gap-1 px-2.5 py-1 rounded-lg text-xs font-medium ${pillar.bg} ${pillar.color}`}>
                    <Zap className="w-3 h-3" />
                    {f}
                  </span>
                ))}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
