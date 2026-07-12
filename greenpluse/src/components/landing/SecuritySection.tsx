"use client";

import { motion } from "framer-motion";
import { SectionHeading } from "./SectionHeading";
import { Shield, FileSearch, Users, Lock, ClipboardCheck, Eye } from "lucide-react";

const securityFeatures = [
  { icon: Shield, title: "Role-Based Access Control", description: "Granular permissions for admins, ESG managers, department heads, auditors, and employees.", color: "text-primary-500" },
  { icon: FileSearch, title: "Complete Audit Logs", description: "Every action is logged with timestamp, user, and IP. Immutable audit trail for compliance.", color: "text-accent-500" },
  { icon: ClipboardCheck, title: "Approval Workflows", description: "Multi-step approval for carbon transactions, policy acknowledgements, and CSR participation.", color: "text-purple-500" },
  { icon: Lock, title: "Secure Authentication", description: "Powered by Supabase Auth with email/password, SSO, and MFA support out of the box.", color: "text-amber-500" },
  { icon: Users, title: "Enterprise-Grade", description: "Built for organizations with department hierarchies, team structures, and reporting lines.", color: "text-emerald-500" },
  { icon: Eye, title: "Data Privacy & Compliance", description: "GDPR-ready architecture with data encryption, secure APIs, and privacy-first design.", color: "text-rose-500" },
];

export function SecuritySection() {
  return (
    <section className="py-20 lg:py-28 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHeading
          label="Security & Compliance"
          title="Enterprise-Grade Security"
          description="Your ESG data is protected with industry-standard security practices and compliance-ready architecture."
          center
        />

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4 mt-14">
          {securityFeatures.map((feature, i) => (
            <motion.div
              key={feature.title}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: i * 0.06 }}
              className="card p-5 group hover:shadow-card-hover transition-all duration-300"
            >
              <div className={`w-10 h-10 rounded-xl ${feature.color.replace("text", "bg")}/10 flex items-center justify-center mb-3 group-hover:scale-110 transition-transform`}>
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
