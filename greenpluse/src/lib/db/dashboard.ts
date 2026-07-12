import { createClient } from "@/lib/supabase/server";
import type { DashboardKPIs, MonthlyCarbonTrend, DeptESGScore, LeaderboardEntry } from "@/lib/types";

/** Aggregate KPIs for the main dashboard */
export async function getDashboardKPIs(): Promise<DashboardKPIs> {
  const supabase = await createClient();

  // Total approved carbon (kg → tons)
  const { data: carbonData } = await supabase
    .from("carbon_transactions")
    .select("co2_kg, date")
    .eq("status", "approved");

  const currentMonth = new Date().getMonth();
  const prevMonth    = currentMonth - 1;

  const currentCO2 = (carbonData ?? [])
    .filter((r) => new Date(r.date).getMonth() === currentMonth)
    .reduce((s, r) => s + (r.co2_kg ?? 0), 0) / 1000;

  const prevCO2 = (carbonData ?? [])
    .filter((r) => new Date(r.date).getMonth() === prevMonth)
    .reduce((s, r) => s + (r.co2_kg ?? 0), 0) / 1000;

  // CSR participation rate
  const { count: totalEmps }   = await supabase.from("employees").select("id", { count: "exact", head: true });
  const { count: csrPartic }   = await supabase.from("csr_participations").select("id", { count: "exact", head: true }).eq("approval_status", "approved");

  // Policy compliance rate
  const { count: totalAcks }   = await supabase.from("policy_acknowledgements").select("id", { count: "exact", head: true });
  const { count: acceptedAcks }= await supabase.from("policy_acknowledgements").select("id", { count: "exact", head: true }).eq("status", "accepted");

  // Total XP
  const { data: xpData } = await supabase.from("employees").select("xp");
  const totalXP = (xpData ?? []).reduce((s, e) => s + (e.xp ?? 0), 0);

  // Active challenges
  const { count: activeChallenges } = await supabase.from("challenges").select("id", { count: "exact", head: true }).eq("status", "active");

  const csrPct  = totalEmps ? Math.round(((csrPartic ?? 0) / totalEmps) * 100) : 0;
  const compPct = totalAcks ? Math.round(((acceptedAcks ?? 0) / (totalAcks ?? 1)) * 100) : 0;

  // Simple ESG score: weighted average of E(40%), S(30%), G(30%)
  const envScore = currentCO2 < 50 ? 90 : currentCO2 < 100 ? 80 : 70;
  const esgScore = Math.round(envScore * 0.4 + csrPct * 0.3 + compPct * 0.3);

  return {
    totalCarbonTons:     Math.round(currentCO2 * 10) / 10,
    prevCarbonTons:      Math.round(prevCO2    * 10) / 10,
    csrParticipationPct: csrPct,
    compliancePct:       compPct,
    totalXP,
    esgScore,
    activeEmployees:     totalEmps ?? 0,
    activeChallenges:    activeChallenges ?? 0,
  };
}

/** Monthly carbon trend for area chart (last 7 months) */
export async function getMonthlyCarbonTrend(): Promise<MonthlyCarbonTrend[]> {
  const supabase = await createClient();
  const { data } = await supabase.from("monthly_carbon_trend").select("*");
  return data ?? [];
}

/** Dept ESG scores for bar chart */
export async function getDeptESGScores(): Promise<DeptESGScore[]> {
  const supabase = await createClient();
  const { data } = await supabase.from("department_esg_scores").select("*");
  return data ?? [];
}

/** Top 10 employees by XP (leaderboard) */
export async function getLeaderboard(limit = 10): Promise<LeaderboardEntry[]> {
  const supabase = await createClient();
  const { data } = await supabase
    .from("employee_leaderboard")
    .select("*")
    .limit(limit);
  return data ?? [];
}

/** Recent notifications / activity feed */
export async function getRecentNotifications(limit = 8) {
  const supabase = await createClient();
  const { data } = await supabase
    .from("notifications")
    .select("*")
    .order("created_at", { ascending: false })
    .limit(limit);
  return data ?? [];
}
