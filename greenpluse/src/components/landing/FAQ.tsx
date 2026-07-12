"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronDown } from "lucide-react";
import { cn } from "@/lib/utils";
import { SectionHeading } from "./SectionHeading";

const faqs = [
  {
    q: "What is GreenPulse AI and how does it help with ESG management?",
    a: "GreenPulse AI is an enterprise ESG management platform that integrates sustainability tracking directly into your ERP operations. It helps organizations measure carbon emissions, manage CSR activities, enforce governance policies, and engage employees through gamification — all from a single dashboard.",
  },
  {
    q: "How does the carbon accounting system work?",
    a: "Our carbon accounting system uses pre-configured emission factors (e.g., diesel: 2.68 kg CO₂/litre, grid electricity: 0.82 kg CO₂/kWh). When a department logs an activity, the system automatically calculates the CO₂ impact. Each transaction includes an approval workflow for accuracy and compliance.",
  },
  {
    q: "Can I customize emission factors for my organization?",
    a: "Yes. ESG administrators can add, modify, or deactivate emission factors specific to your organization's operations. The system supports various categories including fuel, electricity, travel, manufacturing, and custom categories.",
  },
  {
    q: "How is the ESG score calculated?",
    a: "The ESG score is calculated across three pillars: Environmental (carbon reduction, goal achievement), Social (CSR participation, diversity metrics, training completion), and Governance (policy acceptance, audit results, compliance status). Each department receives an individual score that rolls up to the organization-wide score.",
  },
  {
    q: "What reports can I generate?",
    a: "You can generate Environmental, Social, Governance, and Full ESG reports. Reports are available as PDF, CSV, and Excel formats. The report builder includes interactive filters for custom date ranges, departments, and specific metrics.",
  },
  {
    q: "How does the gamification system encourage participation?",
    a: "Employees earn XP by completing sustainability challenges, participating in CSR events, and accepting policies. XP contributes to leaderboard rankings and can be redeemed for rewards like vouchers, gift cards, and extra leave days. Badges are awarded for milestones and achievements.",
  },
  {
    q: "Is the platform suitable for multi-department organizations?",
    a: "Absolutely. GreenPulse AI is built for enterprise use with full department-level tracking, individual ESG scorecards, and department leaderboards. Each department can be managed independently while contributing to the organization's overall ESG performance.",
  },
  {
    q: "What security and compliance features are included?",
    a: "The platform includes role-based access control (admin, ESG manager, employee), complete audit trails for all actions, approval workflows for critical transactions, secure authentication via Supabase Auth with MFA support, and GDPR-ready data privacy architecture.",
  },
];

export function FAQSection() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  return (
    <section id="faq" className="py-20 lg:py-28 relative">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHeading
          label="FAQ"
          title="Frequently Asked Questions"
          description="Everything you need to know about GreenPulse AI and ESG management."
          center
        />

        <div className="mt-12 space-y-2">
          {faqs.map((faq, i) => (
            <div
              key={i}
              className={cn(
                "card overflow-hidden transition-all duration-300",
                openIndex === i && "border-primary-500/30"
              )}
            >
              <button
                onClick={() => setOpenIndex(openIndex === i ? null : i)}
                className="w-full flex items-center justify-between p-4 lg:p-5 text-left"
              >
                <span className="text-sm font-semibold text-[hsl(var(--foreground))] pr-4">{faq.q}</span>
                <ChevronDown
                  className={cn(
                    "w-4 h-4 shrink-0 text-[hsl(var(--foreground-muted))] transition-transform duration-200",
                    openIndex === i && "rotate-180"
                  )}
                />
              </button>
              <AnimatePresence>
                {openIndex === i && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.2 }}
                  >
                    <div className="px-4 lg:px-5 pb-4 lg:pb-5">
                      <p className="text-sm text-[hsl(var(--foreground-muted))] leading-relaxed">{faq.a}</p>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
