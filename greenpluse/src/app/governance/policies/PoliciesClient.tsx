"use client";

import { motion } from "framer-motion";
import { Plus, CheckCircle, Clock, XCircle, Shield } from "lucide-react";
import { cn, getStatusColor } from "@/lib/utils";
import { createClient } from "@/lib/supabase/client";
import { useAuth } from "@/components/auth/AuthProvider";
import { toast } from "sonner";
import { useState } from "react";
import type { Policy } from "@/lib/types";

interface Props {
  policies: Policy[];
  stats: { total: number; active: number; pending: number };
}

export function PoliciesClient({ policies: initial, stats }: Props) {
  const { user } = useAuth();
  const isAdmin = user?.role === "admin";
  const [policies, setPolicies] = useState(initial);

  const handleAccept = async (policy: Policy) => {
    try {
      const supabase = createClient();
      const { data: emp } = await supabase.from("employees").select("id").eq("role","employee").order("xp",{ascending:false}).limit(1).single();
      if (!emp) throw new Error("No employee found");
      await supabase.from("policy_acknowledgements").upsert({
        policy_id: policy.id, employee_id: emp.id, status: "accepted", acknowledged_at: new Date().toISOString(),
      });
      // Update local state
      setPolicies((prev) => prev.map((p) => p.id === policy.id
        ? { ...p, accepted_count: (p.accepted_count ?? 0) + 1, pending_count: Math.max(0, (p.pending_count ?? 0) - 1) }
        : p
      ));
      toast.success(`✅ "${policy.title}" accepted!`);
    } catch (err: any) { toast.error(err.message); }
  };

  return (
    <div className="page-wrapper">
      <div className="grid grid-cols-3 gap-4">
        {[
          { label: "Total Policies",  value: stats.total,   icon: Shield,       color: "text-purple-500", bg: "bg-purple-500/10" },
          { label: "Active Policies", value: stats.active,  icon: CheckCircle,  color: "text-primary-500",bg: "bg-primary-500/10"},
          { label: "Pending Acks",    value: stats.pending, icon: Clock,        color: "text-warning-500",bg: "bg-warning-500/10"},
        ].map((s, i) => (
          <motion.div key={s.label} initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.08 }}
            className="card p-4 flex items-center gap-3">
            <div className={cn("w-10 h-10 rounded-xl flex items-center justify-center shrink-0", s.bg)}>
              <s.icon className={cn("w-5 h-5", s.color)} />
            </div>
            <div>
              <p className="text-lg font-bold" style={{ color: "hsl(var(--foreground))" }}>{s.value}</p>
              <p className="text-xs" style={{ color: "hsl(var(--foreground-muted))" }}>{s.label}</p>
            </div>
          </motion.div>
        ))}
      </div>

      <div className="card overflow-hidden">
        <div className="flex items-center justify-between p-5 border-b" style={{ borderColor: "hsl(var(--border-muted))" }}>
          <div>
            <h3 className="section-title">Company Policies</h3>
            <p className="section-subtitle">Manage and track employee acknowledgements</p>
          </div>
          {isAdmin && <button className="btn-primary"><Plus className="w-4 h-4" /> New Policy</button>}
        </div>

        <div className="divide-y" style={{ borderColor: "hsl(var(--border-muted))" }}>
          {policies.map((policy, i) => {
            const total = (policy.accepted_count ?? 0) + (policy.pending_count ?? 0) + (policy.rejected_count ?? 0);
            const pct   = total > 0 ? Math.round(((policy.accepted_count ?? 0) / total) * 100) : 0;
            return (
              <motion.div key={policy.id} initial={{ opacity: 0, x: -12 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: i * 0.07 }}
                className="p-5 hover:bg-[hsl(var(--surface-overlay))]/30 transition-colors" style={{ borderColor: "hsl(var(--border-muted))" }}>
                <div className="flex items-start justify-between gap-4">
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 mb-1">
                      <h4 className="font-semibold" style={{ color: "hsl(var(--foreground))" }}>{policy.title}</h4>
                      <span className="badge-gray badge">{policy.version}</span>
                      <span className={cn("badge capitalize", getStatusColor(policy.status))}>{policy.status}</span>
                    </div>
                    <div className="flex items-center gap-4 text-xs" style={{ color: "hsl(var(--foreground-muted))" }}>
                      <span>📅 Effective: {policy.effective_date}</span>
                      <span>🏢 {policy.department?.name ?? "All Departments"}</span>
                    </div>
                    {policy.description && (
                      <p className="text-xs mt-1" style={{ color: "hsl(var(--foreground-muted))" }}>{policy.description}</p>
                    )}
                  </div>
                  <div className="text-right shrink-0">
                    <div className="flex items-center gap-2 justify-end mb-2">
                      <span className="flex items-center gap-1 badge-green badge text-xs"><CheckCircle className="w-3 h-3" />{policy.accepted_count ?? 0}</span>
                      <span className="flex items-center gap-1 badge-amber badge text-xs"><Clock className="w-3 h-3" />{policy.pending_count ?? 0}</span>
                      {(policy.rejected_count ?? 0) > 0 && (
                        <span className="flex items-center gap-1 badge-red badge text-xs"><XCircle className="w-3 h-3" />{policy.rejected_count}</span>
                      )}
                    </div>
                    <div className="w-32 h-1.5 rounded-full overflow-hidden" style={{ background: "hsl(var(--surface-overlay))" }}>
                      <div className="h-full rounded-full" style={{ width: `${pct}%`, background: "#22c55e" }} />
                    </div>
                    <p className="text-xs mt-0.5 text-right" style={{ color: "hsl(var(--foreground-muted))" }}>{pct}% accepted</p>
                  </div>
                </div>
                <div className="flex gap-2 mt-4">
                  <button className="btn-ghost text-xs py-1.5">View Details</button>
                  {isAdmin && <button className="btn-ghost text-xs py-1.5">Edit</button>}
                  <button onClick={() => handleAccept(policy)} className="btn-primary text-xs py-1.5">Accept Policy</button>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
