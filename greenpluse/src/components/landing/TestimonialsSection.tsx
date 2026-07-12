"use client";

import { motion } from "framer-motion";
import { SectionHeading } from "./SectionHeading";
import { Star } from "lucide-react";

const testimonials = [
  {
    quote: "GreenPulse AI transformed how we track and report our ESG metrics. The automated carbon accounting alone saved our team dozens of hours per month.",
    author: "Vikram Mehta",
    role: "Head of Sustainability",
    company: "Leading Manufacturing Enterprise",
    initials: "VM",
    rating: 5,
  },
  {
    quote: "The gamification features have been a game-changer for employee engagement. Our CSR participation jumped from 45% to 82% in just two quarters.",
    author: "Ananya Reddy",
    role: "VP of HR",
    company: "Mid-Size Technology Firm",
    initials: "AR",
    rating: 5,
  },
  {
    quote: "As an auditor, having all ESG data in one place with complete audit trails has made compliance verification effortless. The report export is fantastic.",
    author: "Rajesh Iyer",
    role: "Internal Audit Director",
    company: "Financial Services Group",
    initials: "RI",
    rating: 5,
  },
];
;
export function TestimonialsSection() {
  return (
    <section className="py-20 lg:py-28 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHeading
          label="Testimonials"
          title="Trusted by Enterprise Teams"
          description="See how organizations are using GreenPulse AI to transform their ESG management."
          center
        />

        <div className="grid md:grid-cols-3 gap-6 mt-14">
          {testimonials.map((t, i) => (
            <motion.div
              key={t.author}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: i * 0.1 }}
              className="card p-6 flex flex-col relative group hover:shadow-card-hover transition-all duration-300"
            >
              {/* Rating */}
              <div className="flex items-center gap-0.5 mb-4">
                {Array.from({ length: t.rating }).map((_, j) => (
                  <Star key={j} className="w-4 h-4 fill-amber-500 text-amber-500" />
                ))}
              </div>

              {/* Quote */}
              <blockquote className="text-sm text-[hsl(var(--foreground))] leading-relaxed flex-1">
                &ldquo;{t.quote}&rdquo;
              </blockquote>

              {/* Author */}
              <div className="flex items-center gap-3 mt-6 pt-4 border-t border-[hsl(var(--border-muted))]">
                <div className="w-9 h-9 rounded-xl flex items-center justify-center text-xs font-bold text-primary-500" style={{ background: "linear-gradient(135deg, rgba(34,197,94,0.3), rgba(59,130,246,0.3))" }}>
                  {t.initials}
                </div>
                <div>
                  <p className="text-sm font-semibold text-[hsl(var(--foreground))]">{t.author}</p>
                  <p className="text-xs text-[hsl(var(--foreground-muted))]">{t.role} &middot; {t.company}</p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
