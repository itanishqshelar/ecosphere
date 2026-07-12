"use client";

import { motion } from "framer-motion";
import { Trophy, Clock, Users, Zap, Plus } from "lucide-react";
import { cn, getStatusColor } from "@/lib/utils";
import { createClient } from "@/lib/supabase/client";
import { useAuth } from "@/components/auth/AuthProvider";
import { toast } from "sonner";
import { useState } from "react";
import type { Challenge } from "@/lib/types";

const DEMO_EMPLOYEE_ID = "00000000-0000-0000-0000-000000000000"; // swap after auth

const difficultyColor: Record<string, string> = { Easy: "badge-green", Medium: "badge-amber", Hard: "badge-red" };

interface Props {
  challenges: Challenge[];
  stats: { active: number; participants: number; totalXP: number };
}

export function ChallengesClient({ challenges: initial, stats }: Props) {
  const { user } = useAuth();
  const isAdmin = user?.role === "admin";
  const [challenges, setChallenges] = useState(initial);
  const [joining, setJoining] = useState<string | null>(null);

  const handleJoin = async (ch: Challenge) => {
    setJoining(ch.id);
    try {
      const supabase = createClient();
      const { data: emps } = await supabase.from("employees").select("id").eq("role", "employee").limit(1).single();
      const empId = emps?.id ?? DEMO_EMPLOYEE_ID;
      const { error } = await supabase.from("challenge_participations")
        .upsert({ challenge_id: ch.id, employee_id: empId, status: "joined" });
      if (error) throw error;
      setChallenges((prev) => prev.map((c) => c.id === ch.id ? { ...c, participant_count: (c.participant_count ?? 0) + 1 } : c));
      toast.success(`🏆 Joined "${ch.title}"! Good luck.`);
    } catch (err: any) {
      toast.error(err.message ?? "Failed to join");
    } finally {
      setJoining(null);
    }
  };

  return (
    <div className="page-wrapper">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-xl font-bold" style={{ color: "hsl(var(--foreground))" }}>Sustainability Challenges</h2>
          <p className="section-subtitle mt-0.5">Engage employees with ESG challenges</p>
        </div>
        {isAdmin && <button className="btn-primary"><Plus className="w-4 h-4" /> New Challenge</button>}
      </div>

      <div className="grid grid-cols-3 gap-4">
        {[
          { label: "Active Challenges", value: stats.active,       icon: Trophy, color: "text-yellow-500", bg: "bg-yellow-500/10" },
          { label: "Participants",      value: stats.participants,  icon: Users,  color: "text-accent-500", bg: "bg-accent-500/10" },
          { label: "XP Distributed",   value: `${(stats.totalXP/1000).toFixed(1)}K`, icon: Zap, color: "text-primary-500", bg: "bg-primary-500/10" },
        ].map((s, i) => (
          <motion.div key={s.label} initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.08 }}
            className="card p-4 flex items-center gap-3">
            <div className={cn("w-10 h-10 rounded-xl flex items-center justify-center", s.bg)}>
              <s.icon className={cn("w-5 h-5", s.color)} />
            </div>
            <div>
              <p className="text-lg font-bold" style={{ color: "hsl(var(--foreground))" }}>{s.value}</p>
              <p className="text-xs" style={{ color: "hsl(var(--foreground-muted))" }}>{s.label}</p>
            </div>
          </motion.div>
        ))}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {challenges.map((ch, i) => {
          const total = ch.participant_count ?? 0;
          const done  = ch.completed_count  ?? 0;
          const pct   = total > 0 ? Math.round((done / total) * 100) : 0;
          return (
            <motion.div key={ch.id} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.07 }}
              className="card p-5 flex flex-col gap-4 hover:shadow-card-hover group">
              <div className="flex items-start justify-between">
                <div>
                  <span className={cn("badge mb-2", ch.category === "Environmental" ? "badge-green" : "badge-blue")}>{ch.category}</span>
                  <h4 className="font-semibold group-hover:text-primary-500 transition-colors" style={{ color: "hsl(var(--foreground))" }}>{ch.title}</h4>
                  {ch.description && <p className="text-xs mt-1" style={{ color: "hsl(var(--foreground-muted))" }}>{ch.description}</p>}
                </div>
                <span className={cn("badge", difficultyColor[ch.difficulty])}>{ch.difficulty}</span>
              </div>
              <div className="flex items-center gap-4 text-xs" style={{ color: "hsl(var(--foreground-muted))" }}>
                <span className="flex items-center gap-1"><Users className="w-3.5 h-3.5" />{total} joined</span>
                <span className="flex items-center gap-1"><Clock className="w-3.5 h-3.5" />{ch.deadline}</span>
                <span className="flex items-center gap-1 font-semibold" style={{ color: "#22c55e" }}><Zap className="w-3.5 h-3.5" />{ch.xp} XP</span>
              </div>
              <div>
                <div className="flex justify-between text-xs mb-1.5">
                  <span style={{ color: "hsl(var(--foreground-muted))" }}>Completion</span>
                  <span className="font-semibold" style={{ color: "hsl(var(--foreground))" }}>{pct}%</span>
                </div>
                <div className="w-full h-2 rounded-full overflow-hidden" style={{ background: "hsl(var(--surface-overlay))" }}>
                  <motion.div initial={{ width: 0 }} animate={{ width: `${pct}%` }} transition={{ duration: 0.8, delay: i * 0.1 + 0.3 }}
                    className="h-full rounded-full" style={{ background: "linear-gradient(to right,#22c55e,#10b981)" }} />
                </div>
                <p className="text-xs mt-1" style={{ color: "hsl(var(--foreground-subtle))", fontSize: "0.625rem" }}>{done}/{total} completed</p>
              </div>
              <div className="flex gap-2 pt-1">
                <button className="btn-secondary flex-1 text-xs py-1.5">View Details</button>
                <button onClick={() => handleJoin(ch)} disabled={joining === ch.id} className="btn-primary flex-1 text-xs py-1.5">
                  {joining === ch.id ? "Joining…" : "Join Challenge"}
                </button>
              </div>
            </motion.div>
          );
        })}
      </div>
    </div>
  );
}
