import { createClient } from "@/lib/supabase/server";
import type { Badge, Reward } from "@/lib/types";

export async function getBadgesWithEarned(employeeId?: string): Promise<Badge[]> {
  const supabase = await createClient();

  const { data: badges } = await supabase
    .from("badges")
    .select("*")
    .order("xp_required");

  if (!badges) return [];

  if (!employeeId) return badges as Badge[];

  const { data: earned } = await supabase
    .from("employee_badges")
    .select("badge_id, earned_at")
    .eq("employee_id", employeeId);

  const earnedMap = Object.fromEntries((earned ?? []).map((e) => [e.badge_id, e.earned_at]));

  return badges.map((b) => ({
    ...b,
    earned:    !!earnedMap[b.id],
    earned_at: earnedMap[b.id] ?? null,
  })) as Badge[];
}

export async function getRewards(): Promise<Reward[]> {
  const supabase = await createClient();
  const { data } = await supabase
    .from("rewards")
    .select("*")
    .gt("stock", 0)
    .order("xp_cost");
  return data ?? [];
}

export async function redeemReward(rewardId: string, employeeId: string, xpCost: number) {
  const supabase = await createClient();

  // Deduct XP from employee
  const { data: emp } = await supabase.from("employees").select("xp").eq("id", employeeId).single();
  if (!emp || emp.xp < xpCost) throw new Error("Insufficient XP");

  await supabase.from("employees").update({ xp: emp.xp - xpCost }).eq("id", employeeId);
  await supabase.from("reward_redemptions").insert({ reward_id: rewardId, employee_id: employeeId, xp_spent: xpCost });
  // Decrement stock
  await supabase.rpc("decrement_reward_stock", { reward_id: rewardId });
}

export async function getEmployeeXP(employeeId: string): Promise<number> {
  const supabase = await createClient();
  const { data } = await supabase.from("employees").select("xp").eq("id", employeeId).single();
  return data?.xp ?? 0;
}
