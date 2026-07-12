"use client";

import { motion } from "framer-motion";
import { SectionHeading } from "./SectionHeading";
import { FileText, FileSpreadsheet, FileDown, Filter, BarChart3, Eye, Users, Shield } from "lucide-react";

const reportTypes = [
  { label: "Environmental Report", icon: FileText, color: "text-primary-500", bg: "bg-primary-500/10", desc: "Carbon emissions, goals, and reduction metrics" },
  { label: "Social Report", icon: Users, color: "text-accent-500", bg: "bg-accent-500/10", desc: "CSR participation, diversity, and training data" },
  { label: "Governance Report", icon: Shield, color: "text-purple-500", bg: "bg-purple-500/10", desc: "Policy compliance, audits, and issue tracking" },
  { label: "Full ESG Report", icon: BarChart3, color: "text-rose-500", bg: "bg-rose-500/10", desc: "Comprehensive ESG performance overview" },
  { label: "Executive Summary", icon: Eye, color: "text-amber-500", bg: "bg-amber-500/10", desc: "C-suite ready overview with key insights" },
  { label: "Custom Report", icon: Filter, color: "text-cyan-500", bg: "bg-cyan-500/10", desc: "Build reports with custom filters and metrics" },
];

const exportFormats = [
  { label: "PDF Report", icon: FileDown, desc: "Printable, branded PDF reports" },
  { label: "CSV Export", icon: FileSpreadsheet, desc: "Raw data for further analysis" },
  { label: "Excel Export", icon: FileText, desc: "Formatted Excel spreadsheets" },
];

export function ReportingSection() {
  return (
    <section className="py-20 lg:py-28 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHeading
          label="Reporting"
          title="Audit-Ready ESG Reports"
          description="Generate professional reports for stakeholders, auditors, and executives. Multiple formats and customizable filters."
          center
        />

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4 mt-14">
          {reportTypes.map((report, i) => (
            <motion.div
              key={report.label}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: i * 0.05 }}
              className="card p-5 group hover:shadow-card-hover transition-all duration-300 cursor-pointer"
            >
              <div className={`w-10 h-10 rounded-xl ${report.bg} flex items-center justify-center mb-3 group-hover:scale-110 transition-transform`}>
                <report.icon className={`w-5 h-5 ${report.color}`} />
              </div>
              <h4 className="font-semibold text-sm text-[hsl(var(--foreground))] mb-1">{report.label}</h4>
              <p className="text-xs text-[hsl(var(--foreground-muted))]">{report.desc}</p>
            </motion.div>
          ))}
        </div>

        {/* Export formats */}
        <div className="mt-10">
          <h4 className="text-sm font-semibold text-center text-[hsl(var(--foreground-muted))] mb-4">Export Formats</h4>
          <div className="flex flex-wrap justify-center gap-4">
            {exportFormats.map((fmt) => (
              <div key={fmt.label} className="flex items-center gap-3 card p-4 hover:shadow-card-hover transition-all">
                <div className="w-10 h-10 rounded-xl bg-primary-500/10 flex items-center justify-center">
                  <fmt.icon className="w-5 h-5 text-primary-500" />
                </div>
                <div>
                  <p className="text-sm font-semibold text-[hsl(var(--foreground))]">{fmt.label}</p>
                  <p className="text-xs text-[hsl(var(--foreground-muted))]">{fmt.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
