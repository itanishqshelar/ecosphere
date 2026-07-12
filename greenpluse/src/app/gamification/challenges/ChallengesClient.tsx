"use client";

import { motion } from "framer-motion";
import { Trophy, Clock, Users, Zap, Plus, Upload, CheckCircle2, XCircle, FileImage } from "lucide-react";
import { useEffect, useState } from "react";
import { toast } from "sonner";
import { useAuth } from "@/components/auth/AuthProvider";
import { useAuthStore } from "@/lib/auth/store";
import { cn, getStatusColor } from "@/lib/utils";
import { createClient } from "@/lib/supabase/client";
import type { Challenge, ChallengeParticipation } from "@/lib/types";

const difficultyColor: Record<string, string> = { Easy: "badge-green", Medium: "badge-amber", Hard: "badge-red" };

type PendingChallengeSubmission = ChallengeParticipation & {
  employee?: { name: string; email: string };
  challenge?: { title: string; xp: number };
};

interface Props {
  challenges: Challenge[];
  stats: { active: number; participants: number; totalXP: number };
}

export function ChallengesClient({ challenges: initial, stats }: Props) {
  const { user, refresh } = useAuth();
  const { session } = useAuthStore();
  const isAdmin = user?.role === "admin";
  const actorId = user?.id ?? session?.id ?? null;
  const [challenges, setChallenges] = useState(initial);
  const [joining, setJoining] = useState<string | null>(null);
  const [uploading, setUploading] = useState<string | null>(null);
  const [decisionId, setDecisionId] = useState<string | null>(null);
  const [myParticipations, setMyParticipations] = useState<Record<string, ChallengeParticipation>>({});
  const [pendingSubmissions, setPendingSubmissions] = useState<PendingChallengeSubmission[]>([]);

  useEffect(() => {
    const loadData = async () => {
      const supabase = createClient();

      if (actorId) {
        const { data } = await supabase
          .from("challenge_participations")
          .select("*")
          .eq("employee_id", actorId);

        setMyParticipations(Object.fromEntries((data ?? []).map((item) => [item.challenge_id, item])));
      } else {
        setMyParticipations({});
      }

      if (isAdmin) {
        const { data, error } = await supabase
          .from("challenge_participations")
          .select("*, employee:employees!challenge_participations_employee_id_fkey(name,email), challenge:challenges(title,xp)")
          .eq("status", "pending")
          .order("joined_at", { ascending: false });

        if (error) {
          console.error("Error loading pending submissions:", error);
        }

        setPendingSubmissions((data ?? []) as PendingChallengeSubmission[]);
      } else {
        setPendingSubmissions([]);
      }
    };

    void loadData();
  }, [actorId, isAdmin]);

  const handleJoin = async (challenge: Challenge) => {
    setJoining(challenge.id);
    try {
      if (!actorId) {
        throw new Error("Please sign in to join a challenge");
      }
      const alreadyJoined = Boolean(myParticipations[challenge.id]);

      const supabase = createClient();
      const { data, error } = await supabase
        .from("challenge_participations")
        .insert({ challenge_id: challenge.id, employee_id: actorId, status: "joined" })
        .select()
        .single();

      if (error) {
        throw error;
      }

      setMyParticipations((current) => ({ ...current, [challenge.id]: data as ChallengeParticipation }));
      setChallenges((current) =>
        current.map((item) =>
          item.id === challenge.id ? { ...item, participant_count: (item.participant_count ?? 0) + (alreadyJoined ? 0 : 1) } : item,
        ),
      );
      toast.success(`Joined "${challenge.title}"`);
    } catch (error: unknown) {
      toast.error(error instanceof Error ? error.message : (error as any)?.message || "Failed to join");
    } finally {
      setJoining(null);
    }
  };

  const handleProofUpload = async (challengeId: string, file: File) => {
    setUploading(challengeId);
    try {
      const body = new FormData();
      body.append("challengeId", challengeId);
      body.append("proof", file);

      const response = await fetch("/api/challenges/proof", {
        method: "POST",
        body,
      });
      const payload = await response.json().catch(() => ({}));

      if (!response.ok) {
        throw new Error(payload.error ?? "Failed to upload proof");
      }

      setMyParticipations((current) => ({
        ...current,
        [challengeId]: payload.participation as ChallengeParticipation,
      }));
      toast.success("Proof uploaded for admin review");
    } catch (error: unknown) {
      toast.error(error instanceof Error ? error.message : "Failed to upload proof");
    } finally {
      setUploading(null);
    }
  };

  const handleApproval = async (participationId: string, status: "approved" | "rejected") => {
    setDecisionId(participationId);
    try {
      const response = await fetch("/api/challenges/approve", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ participationId, status }),
      });
      const payload = await response.json().catch(() => ({}));

      if (!response.ok) {
        throw new Error(payload.error ?? "Failed to update challenge submission");
      }

      setPendingSubmissions((current) => current.filter((item) => item.id !== participationId));
      if (status === "approved") {
        setChallenges((current) =>
          current.map((item) =>
            item.id === payload.challengeId ? { ...item, completed_count: (item.completed_count ?? 0) + 1 } : item,
          ),
        );
        setMyParticipations((current) => {
          const participation = current[payload.challengeId];
          if (participation && participation.id === participationId) {
            return { ...current, [payload.challengeId]: { ...participation, status: "completed" } };
          }
          return current;
        });
        void refresh();
      } else {
        setMyParticipations((current) => {
          const participation = current[payload.challengeId];
          if (participation && participation.id === participationId) {
            return { ...current, [payload.challengeId]: { ...participation, status: "rejected" } };
          }
          return current;
        });
      }
      toast.success(status === "approved" ? "Challenge approved and XP awarded" : "Challenge proof rejected");
    } catch (error: unknown) {
      toast.error(error instanceof Error ? error.message : "Failed to update challenge submission");
    } finally {
      setDecisionId(null);
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
          { label: "Active Challenges", value: stats.active, icon: Trophy, color: "text-yellow-500", bg: "bg-yellow-500/10" },
          { label: "Participants", value: stats.participants, icon: Users, color: "text-accent-500", bg: "bg-accent-500/10" },
          { label: "XP Distributed", value: `${(stats.totalXP / 1000).toFixed(1)}K`, icon: Zap, color: "text-primary-500", bg: "bg-primary-500/10" },
        ].map((stat, index) => (
          <motion.div key={stat.label} initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: index * 0.08 }} className="card flex items-center gap-3 p-4">
            <div className={cn("flex h-10 w-10 items-center justify-center rounded-xl", stat.bg)}>
              <stat.icon className={cn("h-5 w-5", stat.color)} />
            </div>
            <div>
              <p className="text-lg font-bold" style={{ color: "hsl(var(--foreground))" }}>{stat.value}</p>
              <p className="text-xs" style={{ color: "hsl(var(--foreground-muted))" }}>{stat.label}</p>
            </div>
          </motion.div>
        ))}
      </div>

      <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
        {challenges.map((challenge, index) => {
          const total = challenge.participant_count ?? 0;
          const done = challenge.completed_count ?? 0;
          const pct = total > 0 ? Math.round((done / total) * 100) : 0;
          const myParticipation = myParticipations[challenge.id];
          const canUploadProof = Boolean(actorId) && Boolean(myParticipation) && myParticipation.status !== "completed";

          return (
            <motion.div key={challenge.id} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: index * 0.07 }} className="card group flex flex-col gap-4 p-5 hover:shadow-card-hover">
              <div className="flex items-start justify-between">
                <div>
                  <span className={cn("badge mb-2", challenge.category === "Environmental" ? "badge-green" : "badge-blue")}>{challenge.category}</span>
                  <h4 className="font-semibold transition-colors group-hover:text-primary-500" style={{ color: "hsl(var(--foreground))" }}>{challenge.title}</h4>
                  {challenge.description && <p className="mt-1 text-xs" style={{ color: "hsl(var(--foreground-muted))" }}>{challenge.description}</p>}
                </div>
                <span className={cn("badge", difficultyColor[challenge.difficulty])}>{challenge.difficulty}</span>
              </div>
              <div className="flex items-center gap-4 text-xs" style={{ color: "hsl(var(--foreground-muted))" }}>
                <span className="flex items-center gap-1"><Users className="h-3.5 w-3.5" />{total} joined</span>
                <span className="flex items-center gap-1"><Clock className="h-3.5 w-3.5" />{challenge.deadline}</span>
                <span className="flex items-center gap-1 font-semibold" style={{ color: "#22c55e" }}><Zap className="h-3.5 w-3.5" />{challenge.xp} XP</span>
              </div>

              <div className="flex gap-2 pt-1">
                <button className="btn-secondary flex-1 py-1.5 text-xs">View Details</button>
                <button
                  onClick={() => void handleJoin(challenge)}
                  disabled={joining === challenge.id || Boolean(myParticipation)}
                  className="btn-primary flex-1 py-1.5 text-xs disabled:pointer-events-none disabled:opacity-60"
                >
                  {myParticipation ? "Joined" : joining === challenge.id ? "Joining..." : "Join Challenge"}
                </button>
              </div>
              <div className="flex flex-wrap items-center gap-2 text-xs">
                {myParticipation && <span className={cn("badge capitalize", getStatusColor(myParticipation.status))}>{myParticipation.status}</span>}
                {myParticipation?.evidence_url && (
                  <a href={myParticipation.evidence_url} target="_blank" rel="noreferrer" className="inline-flex items-center gap-1 text-primary-500">
                    <FileImage className="h-3.5 w-3.5" /> View proof
                  </a>
                )}
              </div>
              {canUploadProof && (
                <label className="btn-secondary flex cursor-pointer items-center justify-center gap-2 py-1.5 text-xs">
                  <Upload className="h-3.5 w-3.5" />
                  {uploading === challenge.id ? "Uploading..." : myParticipation?.status === "rejected" ? "Upload New Proof" : "Upload Proof"}
                  <input
                    type="file"
                    accept="image/png,image/jpeg,image/jpg,image/webp"
                    className="hidden"
                    onChange={(event) => {
                      const file = event.target.files?.[0];
                      if (file) {
                        void handleProofUpload(challenge.id, file);
                      }
                    }}
                  />
                </label>
              )}
            </motion.div>
          );
        })}
      </div>

      {isAdmin && (
        <div className="card p-5">
          <div className="mb-4">
            <h3 className="section-title">Pending Challenge Approvals</h3>
            <p className="section-subtitle">{pendingSubmissions.length} proof submissions awaiting review</p>
          </div>
          <div className="space-y-3">
            {pendingSubmissions.length === 0 && (
              <p className="text-sm" style={{ color: "hsl(var(--foreground-muted))" }}>No pending challenge proofs right now.</p>
            )}
            {pendingSubmissions.map((submission) => (
              <div key={submission.id} className="flex flex-col gap-3 rounded-2xl border p-4 md:flex-row md:items-center md:justify-between" style={{ borderColor: "hsl(var(--border-muted))" }}>
                <div>
                  <p className="font-semibold" style={{ color: "hsl(var(--foreground))" }}>{submission.challenge?.title ?? "Challenge proof"}</p>
                  <p className="text-xs" style={{ color: "hsl(var(--foreground-muted))" }}>
                    {submission.employee?.name ?? submission.employee?.email ?? "Employee"} · {(submission.challenge?.xp ?? 0).toLocaleString()} XP
                  </p>
                  {submission.evidence_url && (
                    <a href={submission.evidence_url} target="_blank" rel="noreferrer" className="mt-2 inline-flex items-center gap-1 text-xs text-primary-500">
                      <FileImage className="h-3.5 w-3.5" /> Open proof image
                    </a>
                  )}
                </div>
                <div className="flex gap-2">
                  <button onClick={() => void handleApproval(submission.id, "rejected")} disabled={decisionId === submission.id} className="btn-secondary text-xs">
                    <XCircle className="h-3.5 w-3.5" /> Reject
                  </button>
                  <button onClick={() => void handleApproval(submission.id, "approved")} disabled={decisionId === submission.id} className="btn-primary text-xs">
                    <CheckCircle2 className="h-3.5 w-3.5" /> {decisionId === submission.id ? "Saving..." : "Approve"}
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
