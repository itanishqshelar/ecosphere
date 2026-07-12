"use client";

import { motion } from "framer-motion";
import { mockPolicies } from "@/lib/mock-data";
import { Plus, CheckCircle, Clock, XCircle, Shield } from "lucide-react";
import { cn, getStatusColor } from "@/lib/utils";
import { toast } from "sonner";

export default function PoliciesPage() {
  return (
    <div className="page-wrapper">
      {/* Stats */}
      <div className="grid grid-cols-3 gap-4">
        {[
          { label: "Total Policies", value: "4",  icon: Shield,       color: "text-purple-500", bg: "bg-purple-500/10" },
          { label: "Fully Accepted", value: "2",  icon: CheckCircle,  color: "text-primary-500",bg: "bg-primary-500/10"},
          { label: "Pending Review", value: "1",  icon: Clock,        color: "text-warning-500",bg: "bg-warning-500/10"},
        ].map((s, i) => (
          <motion.div
            key={s.label}
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.08 }}
            className="card p-4 flex items-center gap-3"
          >
            <div className={cn("w-10 h-10 rounded-xl flex items-center justify-center shrink-0", s.bg)}>
              <s.icon className={cn("w-5 h-5", s.color)} />
            </div>
            <div>
              <p className="text-lg font-bold text-[hsl(var(--foreground))]">{s.value}</p>
              <p className="text-xs text-[hsl(var(--foreground-muted))]">{s.label}</p>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Policies List */}
      <div className="card overflow-hidden">
        <div className="flex items-center justify-between p-5 border-b border-[hsl(var(--border-muted))]">
          <div>
            <h3 className="section-title">Company Policies</h3>
            <p className="section-subtitle">Manage and track employee acknowledgements</p>
          </div>
          <button className="btn-primary"><Plus className="w-4 h-4" /> New Policy</button>
        </div>

        <div className="divide-y divide-[hsl(var(--border-muted))]">
          {mockPolicies.map((policy, i) => (
            <motion.div
              key={policy.id}
              initial={{ opacity: 0, x: -12 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: i * 0.07 }}
              className="p-5 hover:bg-[hsl(var(--surface-overlay))]/30 transition-colors"
            >
              <div className="flex items-start justify-between gap-4">
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 mb-1">
                    <h4 className="font-semibold text-[hsl(var(--foreground))]">{policy.title}</h4>
                    <span className="badge-gray badge">{policy.version}</span>
                    <span className={cn("badge capitalize", getStatusColor(policy.status))}>{policy.status}</span>
                  </div>
                  <div className="flex items-center gap-4 text-xs text-[hsl(var(--foreground-muted))]">
                    <span>📅 Effective: {policy.effectiveDate}</span>
                    <span>🏢 {policy.department}</span>
                  </div>
                </div>

                {/* Acceptance progress */}
                <div className="text-right shrink-0">
                  <div className="flex items-center gap-2 justify-end mb-2">
                    <span className="flex items-center gap-1 badge-green badge text-xs">
                      <CheckCircle className="w-3 h-3" /> {policy.accepted}
                    </span>
                    <span className="flex items-center gap-1 badge-amber badge text-xs">
                      <Clock className="w-3 h-3" /> {policy.pending}
                    </span>
                    {policy.rejected > 0 && (
                      <span className="flex items-center gap-1 badge-red badge text-xs">
                        <XCircle className="w-3 h-3" /> {policy.rejected}
                      </span>
                    )}
                  </div>
                  <div className="w-32 h-1.5 bg-[hsl(var(--surface-overlay))] rounded-full overflow-hidden">
                    <div
                      className="h-full bg-primary-500 rounded-full"
                      style={{ width: `${Math.round((policy.accepted / (policy.accepted + policy.pending + policy.rejected)) * 100)}%` }}
                    />
                  </div>
                </div>
              </div>

              <div className="flex gap-2 mt-4">
                <button className="btn-ghost text-xs py-1.5">View Details</button>
                <button className="btn-ghost text-xs py-1.5">Edit</button>
                <button
                  onClick={() => toast.success("Policy accepted!")}
                  className="btn-primary text-xs py-1.5"
                >
                  Accept Policy
                </button>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
}
