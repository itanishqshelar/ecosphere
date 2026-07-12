"use client";

import { motion } from "framer-motion";
import { ArrowRight, TrendingUp, Users } from "lucide-react";

export function HeroSection() {
  return (
    <section className="relative min-h-screen flex items-center overflow-hidden pt-20">
      {/* Subtle background pattern */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute inset-0 bg-gradient-to-b from-primary-500/[0.03] via-transparent to-transparent" />
        <svg className="absolute top-0 right-0 w-1/2 h-full opacity-[0.03]" viewBox="0 0 800 800" fill="none">
          <path d="M400 0L800 400L400 800L0 400Z" fill="currentColor" className="text-primary-500" />
        </svg>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          {/* Left content */}
          <div className="relative z-10">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-primary-500/10 text-primary-600 dark:text-primary-400 border border-primary-500/20">
                Enterprise ESG Operating System
              </span>
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight mt-6 text-[hsl(var(--foreground))] leading-[1.1]"
            >
              Measure, Manage &amp; Improve Your{" "}
              <span className="gradient-text">ESG Performance</span>
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="text-lg sm:text-xl mt-6 text-[hsl(var(--foreground-muted))] leading-relaxed max-w-xl"
            >
              Integrate sustainability directly into your ERP operations.
              Track carbon emissions, manage CSR initiatives, enforce governance policies,
              and engage your workforce — all from a single platform.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="flex flex-wrap gap-3 mt-8"
            >
              <a href="/dashboard" className="btn-primary text-base px-6 py-3 rounded-xl">
                Get Started
                <ArrowRight className="w-4 h-4" />
              </a>
              <a href="#features" className="btn-secondary text-base px-6 py-3 rounded-xl">
                View Features
              </a>
            </motion.div>

            {/* Trust indicators */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.6, delay: 0.5 }}
              className="flex flex-wrap items-center gap-6 mt-10 pt-8 border-t border-[hsl(var(--border))]"
            >
              <div className="flex items-center gap-2">
                <div className="flex -space-x-2">
                  {["PS", "AM", "SP", "RV"].map((init, i) => (
                    <div
                      key={init}
                      className="w-7 h-7 rounded-lg text-[10px] font-bold flex items-center justify-center border-2 border-white dark:border-[hsl(var(--surface))]"
                      style={{
                        background: `linear-gradient(135deg, rgba(34,197,94,${0.3 - i * 0.05}), rgba(59,130,246,${0.3 - i * 0.05}))`,
                        color: "#22c55e",
                      }}
                    >
                      {init}
                    </div>
                  ))}
                </div>
                <span className="text-sm text-[hsl(var(--foreground-muted))]">
                  Trusted by <strong className="text-[hsl(var(--foreground))]">200+</strong> enterprises
                </span>
              </div>
            </motion.div>
          </div>

          {/* Right - Animated Dashboard Preview */}
          <motion.div
            initial={{ opacity: 0, x: 40 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="relative z-10"
          >
            <div className="relative">
              {/* Main dashboard card */}
              <div className="card p-6 shadow-glass-lg relative overflow-hidden" style={{ background: "hsl(var(--surface-elevated))" }}>
                {/* Decorative top bar */}
                <div className="flex items-center gap-1.5 mb-5">
                  <div className="w-3 h-3 rounded-full bg-danger-400" />
                  <div className="w-3 h-3 rounded-full bg-warning-400" />
                  <div className="w-3 h-3 rounded-full bg-primary-500" />
                  <span className="ml-3 text-xs font-medium text-[hsl(var(--foreground-muted))]">Executive Dashboard — ESG Overview</span>
                </div>

                {/* Mini KPI row */}
                <div className="grid grid-cols-4 gap-2 mb-4">
                  {[
                    { label: "ESG Score", value: "87", color: "text-primary-500" },
                    { label: "tCO₂", value: "1,240", color: "text-accent-500" },
                    { label: "CSR %", value: "74%", color: "text-purple-500" },
                    { label: "XP", value: "48.2K", color: "text-amber-500" },
                  ].map((kpi) => (
                    <div key={kpi.label} className="rounded-xl p-2.5 text-center" style={{ background: "hsl(var(--surface-overlay))" }}>
                      <p className={`text-base font-bold ${kpi.color}`}>{kpi.value}</p>
                      <p className="text-[10px] text-[hsl(var(--foreground-subtle))]">{kpi.label}</p>
                    </div>
                  ))}
                </div>

                {/* Mini chart bars */}
                <div className="space-y-2">
                  <div className="flex items-center justify-between text-xs mb-1">
                    <span className="text-[hsl(var(--foreground-muted))]">Environmental</span>
                    <span className="font-semibold text-primary-500">76%</span>
                  </div>
                  <div className="w-full h-2 rounded-full overflow-hidden" style={{ background: "hsl(var(--surface-overlay))" }}>
                    <motion.div
                      initial={{ width: 0 }}
                      animate={{ width: "76%" }}
                      transition={{ duration: 1.2, delay: 0.8, ease: "easeOut" }}
                      className="h-full rounded-full" style={{ background: "#22c55e" }}
                    />
                  </div>
                  <div className="flex items-center justify-between text-xs mb-1 mt-3">
                    <span className="text-[hsl(var(--foreground-muted))]">Social</span>
                    <span className="font-semibold text-accent-500">82%</span>
                  </div>
                  <div className="w-full h-2 rounded-full overflow-hidden" style={{ background: "hsl(var(--surface-overlay))" }}>
                    <motion.div
                      initial={{ width: 0 }}
                      animate={{ width: "82%" }}
                      transition={{ duration: 1.2, delay: 1.0, ease: "easeOut" }}
                      className="h-full rounded-full" style={{ background: "#3b82f6" }}
                    />
                  </div>
                  <div className="flex items-center justify-between text-xs mb-1 mt-3">
                    <span className="text-[hsl(var(--foreground-muted))]">Governance</span>
                    <span className="font-semibold text-purple-500">91%</span>
                  </div>
                  <div className="w-full h-2 rounded-full overflow-hidden" style={{ background: "hsl(var(--surface-overlay))" }}>
                    <motion.div
                      initial={{ width: 0 }}
                      animate={{ width: "91%" }}
                      transition={{ duration: 1.2, delay: 1.2, ease: "easeOut" }}
                      className="h-full rounded-full" style={{ background: "#a855f7" }}
                    />
                  </div>
                </div>

                {/* Bottom activity bar */}
                <div className="mt-4 pt-3 border-t border-[hsl(var(--border-muted))] flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-primary-500 animate-pulse-green" />
                    <span className="text-xs text-[hsl(var(--foreground-muted))]">Live ESG Data</span>
                  </div>
                  <span className="text-xs font-semibold text-primary-500">Updated just now</span>
                </div>
              </div>

              {/* Floating cards */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 1.0 }}
                className="absolute -bottom-4 -left-4 card p-3 shadow-glass-lg hidden lg:flex items-center gap-3"
                style={{ background: "hsl(var(--surface-elevated))" }}
              >
                <div className="w-10 h-10 rounded-xl bg-primary-500/10 flex items-center justify-center">
                  <TrendingUp className="w-5 h-5 text-primary-500" />
                </div>
                <div>
                  <p className="text-xs text-[hsl(var(--foreground-muted))]">Carbon Reduction</p>
                  <p className="text-sm font-bold text-primary-500">-12.4% this quarter</p>
                </div>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 1.3 }}
                className="absolute -top-4 -right-4 card p-3 shadow-glass-lg hidden lg:flex items-center gap-3"
                style={{ background: "hsl(var(--surface-elevated))" }}
              >
                <div className="w-10 h-10 rounded-xl bg-amber-500/10 flex items-center justify-center">
                  <Users className="w-5 h-5 text-amber-500" />
                </div>
                <div>
                  <p className="text-xs text-[hsl(var(--foreground-muted))]">Employee Engagement</p>
                  <p className="text-sm font-bold text-amber-500">88% participation</p>
                </div>
              </motion.div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
