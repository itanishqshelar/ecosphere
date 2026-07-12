"use client";

import { motion } from "framer-motion";
import { Plus, MapPin, Calendar, Users, Upload } from "lucide-react";
import { cn, getStatusColor } from "@/lib/utils";
import { createClient } from "@/lib/supabase/client";
import { useAuth } from "@/components/auth/AuthProvider";
import { toast } from "sonner";
import { useState } from "react";
import type { CsrActivity } from "@/lib/types";

interface Props {
  activities: CsrActivity[];
  stats: { totalEvents: number; participants: number; totalPoints: number };
}

export function CSRClient({ activities: initial, stats }: Props) {
  const { user } = useAuth();
  const isAdmin = user?.role === "admin";
  const [activities, setActivities] = useState(initial);
  const [joining, setJoining] = useState<string | null>(null);

  const handleJoin = async (act: CsrActivity) => {
    setJoining(act.id);
    try {
      const supabase = createClient();
      const { data: emp } = await supabase.from("employees").select("id").eq("role","employee").order("xp",{ascending:false}).limit(1).single();
      if (!emp) throw new Error("No employee found");
      const { error } = await supabase.from("csr_participations")
        .upsert({ csr_activity_id: act.id, employee_id: emp.id, approval_status: "pending" });
      if (error) throw error;
      setActivities((prev) => prev.map((a) => a.id === act.id ? { ...a, participant_count: (a.participant_count ?? 0) + 1 } : a));
      toast.success(`🌿 Joined "${act.title}"! Upload proof after the event.`);
    } catch (err: any) {
      toast.error(err.message ?? "Failed to join");
    } finally { setJoining(null); }
  };

  return (
    <div className="page-wrapper">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-xl font-bold" style={{ color: "hsl(var(--foreground))" }}>CSR Activities</h2>
          <p className="section-subtitle mt-0.5">Corporate Social Responsibility events</p>
        </div>
        {isAdmin && <button className="btn-primary"><Plus className="w-4 h-4" /> Create Event</button>}
      </div>

      <div className="grid grid-cols-3 gap-4">
        {[
          { label: "Total Events",    value: stats.totalEvents,                       color: "text-accent-500",   bg: "bg-accent-500/10"  },
          { label: "Participants",    value: stats.participants,                      color: "text-primary-500",  bg: "bg-primary-500/10" },
          { label: "Points Awarded",  value: stats.totalPoints.toLocaleString(),      color: "text-purple-500",   bg: "bg-purple-500/10"  },
        ].map((s, i) => (
          <motion.div key={s.label} initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.08 }}
            className="card p-4 text-center">
            <p className={cn("text-2xl font-bold", s.color)}>{s.value}</p>
            <p className="text-xs mt-0.5" style={{ color: "hsl(var(--foreground-muted))" }}>{s.label}</p>
          </motion.div>
        ))}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {activities.map((event, i) => {
          const pct = Math.round(((event.participant_count ?? 0) / event.max_participants) * 100);
          return (
            <motion.div key={event.id} initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.09 }}
              className="card p-5 group hover:shadow-card-hover">
              <div className="flex items-start justify-between mb-3">
                <div>
                  <h4 className="font-bold group-hover:text-primary-500 transition-colors" style={{ color: "hsl(var(--foreground))" }}>{event.title}</h4>
                  <span className="badge-blue badge mt-1">{event.category}</span>
                </div>
                <span className={cn("badge capitalize", getStatusColor(event.status))}>{event.status}</span>
              </div>
              {event.description && <p className="text-xs mb-3" style={{ color: "hsl(var(--foreground-muted))" }}>{event.description}</p>}
              <div className="space-y-1.5 text-xs mb-4" style={{ color: "hsl(var(--foreground-muted))" }}>
                {event.location && <div className="flex items-center gap-1.5"><MapPin className="w-3.5 h-3.5" style={{ color: "#22c55e" }} />{event.location}</div>}
                <div className="flex items-center gap-1.5"><Calendar className="w-3.5 h-3.5" style={{ color: "#3b82f6" }} />{event.date}</div>
                <div className="flex items-center gap-1.5"><Users className="w-3.5 h-3.5" style={{ color: "#a855f7" }} />
                  {event.participant_count ?? 0}/{event.max_participants} participants · {event.points} pts
                </div>
              </div>
              <div className="mb-4">
                <div className="flex justify-between text-xs mb-1" style={{ fontSize: "0.625rem" }}>
                  <span style={{ color: "hsl(var(--foreground-muted))" }}>Capacity</span>
                  <span className="font-semibold">{pct}%</span>
                </div>
                <div className="w-full h-1.5 rounded-full overflow-hidden" style={{ background: "hsl(var(--surface-overlay))" }}>
                  <motion.div initial={{ width: 0 }} animate={{ width: `${pct}%` }} transition={{ duration: 0.7, delay: i * 0.1 + 0.3 }}
                    className="h-full rounded-full" style={{ background: "linear-gradient(to right,#3b82f6,#22c55e)" }} />
                </div>
              </div>
              <div className="flex gap-2">
                <button className="btn-secondary flex-1 text-xs py-1.5">View Details</button>
                <button onClick={() => handleJoin(event)} disabled={joining === event.id} className="btn-primary flex-1 text-xs py-1.5">
                  {joining === event.id ? "Joining…" : "Join Event"}
                </button>
                <button onClick={() => toast.info("Proof upload coming soon!")} className="btn-ghost text-xs py-1.5 px-3">
                  <Upload className="w-3.5 h-3.5" />
                </button>
              </div>
            </motion.div>
          );
        })}
      </div>
    </div>
  );
}
