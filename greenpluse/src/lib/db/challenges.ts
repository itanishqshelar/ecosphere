import { createClient } from "@/lib/supabase/server";
import type { Challenge, ChallengeParticipation } from "@/lib/types";

export async function getChallenges(): Promise<Challenge[]> {
  const supabase = await createClient();

  const { data: challenges } = await supabase
    .from("challenges")
    .select("*")
    .order("deadline");

  if (!challenges) return [];

  // Get participation counts per challenge
  const { data: parts } = await supabase
    .from("challenge_participations")
    .select("challenge_id, status");

  return challenges.map((ch) => {
    const challParts = (parts ?? []).filter((p) => p.challenge_id === ch.id);
    return {
      ...ch,
      participant_count: challParts.length,
      completed_count:   challParts.filter((p) => p.status === "completed").length,
    };
  }) as Challenge[];
}

export async function joinChallenge(challengeId: string, employeeId: string) {
  const supabase = await createClient();
  const { data, error } = await supabase
    .from("challenge_participations")
    .upsert({ challenge_id: challengeId, employee_id: employeeId, status: "joined" })
    .select()
    .single();
  if (error) throw error;
  return data;
}

export async function getChallengeSummaryStats() {
  const supabase = await createClient();

  const { count: active }        = await supabase.from("challenges").select("id", { count: "exact", head: true }).eq("status", "active");
  const { count: participants }  = await supabase.from("challenge_participations").select("id", { count: "exact", head: true });
  const { data: xpData }         = await supabase.from("challenges").select("xp, id");
  const { data: completedParts } = await supabase.from("challenge_participations").select("challenge_id").eq("status", "completed");

  const xpByChallenge = Object.fromEntries((xpData ?? []).map((c) => [c.id, c.xp]));
  const totalXP = (completedParts ?? []).reduce((s, p) => s + (xpByChallenge[p.challenge_id] ?? 0), 0);

  return { active: active ?? 0, participants: participants ?? 0, totalXP };
}
