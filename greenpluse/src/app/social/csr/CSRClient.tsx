"use client";

import { motion } from "framer-motion";
import { Plus, MapPin, Calendar, Users, Upload } from "lucide-react";
import { useEffect, useState } from "react";
import { toast } from "sonner";
import { useAuth } from "@/components/auth/AuthProvider";
import { useAuthStore } from "@/lib/auth/store";
import { cn, getStatusColor } from "@/lib/utils";
import { createClient } from "@/lib/supabase/client";
import type { CsrActivity } from "@/lib/types";

interface Props {
  activities: CsrActivity[];
  stats: { totalEvents: number; participants: number; totalPoints: number };
}

export function CSRClient({ activities: initial, stats }: Props) {
  const { user } = useAuth();
  const { session } = useAuthStore();
  const isAdmin = user?.role === "admin";
  const actorId = user?.id ?? session?.id ?? null;
  const [activities, setActivities] = useState(initial);
  const [joining, setJoining] = useState<string | null>(null);
  const [joinedIds, setJoinedIds] = useState<string[]>([]);

  useEffect(() => {
    const loadParticipations = async () => {
      if (!actorId) {
        setJoinedIds([]);
        return;
      }

      const supabase = createClient();
      const { data } = await supabase
        .from("csr_participations")
        .select("csr_activity_id")
        .eq("employee_id", actorId);

      setJoinedIds((data ?? []).map((item) => item.csr_activity_id));
    };

    void loadParticipations();
  }, [actorId]);

  const handleJoin = async (activity: CsrActivity) => {
    setJoining(activity.id);
    try {
      if (!actorId) {
        throw new Error("Please sign in to join this CSR activity");
      }
      const alreadyJoined = joinedIds.includes(activity.id);

      const supabase = createClient();
      const { error } = await supabase
        .from("csr_participations")
        .insert({ csr_activity_id: activity.id, employee_id: actorId, approval_status: "pending" });

      if (error) {
        throw error;
      }

      setJoinedIds((current) => current.includes(activity.id) ? current : [...current, activity.id]);
      setActivities((current) =>
        current.map((item) =>
          item.id === activity.id ? { ...item, participant_count: (item.participant_count ?? 0) + (alreadyJoined ? 0 : 1) } : item,
        ),
      );
      toast.success(`Joined "${activity.title}"`);
    } catch (error: unknown) {
      toast.error(error instanceof Error ? error.message : (error as any)?.message || "Failed to join");
    } finally {
      setJoining(null);
    }
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
          { label: "Total Events", value: stats.totalEvents, color: "text-accent-500", bg: "bg-accent-500/10" },
          { label: "Participants", value: stats.participants, color: "text-primary-500", bg: "bg-primary-500/10" },
          { label: "Points Awarded", value: stats.totalPoints.toLocaleString(), color: "text-purple-500", bg: "bg-purple-500/10" },
        ].map((stat, index) => (
          <motion.div key={stat.label} initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: index * 0.08 }} className="card p-4 text-center">
            <p className={cn("text-2xl font-bold", stat.color)}>{stat.value}</p>
            <p className="mt-0.5 text-xs" style={{ color: "hsl(var(--foreground-muted))" }}>{stat.label}</p>
          </motion.div>
        ))}
      </div>

      <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
        {activities.map((event, index) => {
          const pct = Math.round(((event.participant_count ?? 0) / event.max_participants) * 100);
          const isJoined = joinedIds.includes(event.id);
          const isClosed = event.status !== "active" || (event.participant_count ?? 0) >= event.max_participants;

          return (
            <motion.div key={event.id} initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: index * 0.09 }} className="card group p-5 hover:shadow-card-hover">
              <div className="mb-3 flex items-start justify-between">
                <div>
                  <h4 className="font-bold transition-colors group-hover:text-primary-500" style={{ color: "hsl(var(--foreground))" }}>{event.title}</h4>
                  <span className="badge badge-blue mt-1">{event.category}</span>
                </div>
                <span className={cn("badge capitalize", getStatusColor(event.status))}>{event.status}</span>
              </div>
              {event.description && <p className="mb-3 text-xs" style={{ color: "hsl(var(--foreground-muted))" }}>{event.description}</p>}
              <div className="mb-4 space-y-1.5 text-xs" style={{ color: "hsl(var(--foreground-muted))" }}>
                {event.location && <div className="flex items-center gap-1.5"><MapPin className="h-3.5 w-3.5" style={{ color: "#22c55e" }} />{event.location}</div>}
                <div className="flex items-center gap-1.5"><Calendar className="h-3.5 w-3.5" style={{ color: "#3b82f6" }} />{event.date}</div>
                <div className="flex items-center gap-1.5"><Users className="h-3.5 w-3.5" style={{ color: "#a855f7" }} />{event.participant_count ?? 0}/{event.max_participants} participants · {event.points} pts</div>
              </div>

              <div className="flex gap-2">
                <button className="btn-secondary flex-1 py-1.5 text-xs">View Details</button>
                <button
                  onClick={() => void handleJoin(event)}
                  disabled={joining === event.id || isJoined || isClosed}
                  className="btn-primary flex-1 py-1.5 text-xs disabled:pointer-events-none disabled:opacity-60"
                >
                  {isJoined ? "Joined" : joining === event.id ? "Joining..." : isClosed ? "Unavailable" : "Join Event"}
                </button>
                <button onClick={() => toast.info("Active CSR self-join is enabled for employees.")} className="btn-ghost px-3 py-1.5 text-xs">
                  <Upload className="h-3.5 w-3.5" />
                </button>
              </div>
            </motion.div>
          );
        })}
      </div>
    </div>
  );
}
