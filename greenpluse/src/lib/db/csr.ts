import { createClient } from "@/lib/supabase/server";
import type { CsrActivity, CsrParticipation } from "@/lib/types";

export async function getCsrActivities(): Promise<CsrActivity[]> {
  const supabase = await createClient();

  const { data: activities } = await supabase
    .from("csr_activities")
    .select("*")
    .order("date");

  if (!activities) return [];

  // Get participant counts
  const { data: parts } = await supabase
    .from("csr_participations")
    .select("csr_activity_id");

  return activities.map((act) => ({
    ...act,
    participant_count: (parts ?? []).filter((p) => p.csr_activity_id === act.id).length,
  })) as CsrActivity[];
}

export async function joinCsrActivity(activityId: string, employeeId: string) {
  const supabase = await createClient();
  const { data, error } = await supabase
    .from("csr_participations")
    .upsert({
      csr_activity_id: activityId,
      employee_id: employeeId,
      approval_status: "pending",
    })
    .select()
    .single();
  if (error) throw error;
  return data;
}

export async function getCsrStats() {
  const supabase = await createClient();
  const { count: totalEvents }  = await supabase.from("csr_activities").select("id", { count: "exact", head: true });
  const { count: participants } = await supabase.from("csr_participations").select("id", { count: "exact", head: true });
  const { data: pointsData }    = await supabase.from("csr_participations").select("points_earned").eq("approval_status", "approved");
  const totalPoints = (pointsData ?? []).reduce((s, r) => s + (r.points_earned ?? 0), 0);
  return { totalEvents: totalEvents ?? 0, participants: participants ?? 0, totalPoints };
}
