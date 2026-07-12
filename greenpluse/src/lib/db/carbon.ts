import { createClient } from "@/lib/supabase/server";
import type { CarbonTransaction, EmissionFactor, EsgGoal } from "@/lib/types";

export async function getCarbonTransactions(): Promise<CarbonTransaction[]> {
  const supabase = await createClient();
  const { data } = await supabase
    .from("carbon_transactions")
    .select(`*, department:departments(id,name), emission_factor:emission_factors(id,name,unit)`)
    .order("date", { ascending: false });
  return (data ?? []) as CarbonTransaction[];
}

export async function createCarbonTransaction(payload: {
  department_id: string;
  activity: string;
  emission_factor_id: string;
  quantity: number;
  unit: string;
  co2_kg: number;
  date: string;
}) {
  const supabase = await createClient();
  const { data, error } = await supabase
    .from("carbon_transactions")
    .insert({ ...payload, status: "pending" })
    .select()
    .single();
  if (error) throw error;
  return data;
}

export async function updateCarbonStatus(id: string, status: "approved" | "rejected") {
  const supabase = await createClient();
  const { error } = await supabase
    .from("carbon_transactions")
    .update({ status })
    .eq("id", id);
  if (error) throw error;
}

export async function getEmissionFactors(): Promise<EmissionFactor[]> {
  const supabase = await createClient();
  const { data } = await supabase
    .from("emission_factors")
    .select("*")
    .eq("status", "active")
    .order("category");
  return data ?? [];
}

export async function getEsgGoals(): Promise<EsgGoal[]> {
  const supabase = await createClient();
  const { data } = await supabase
    .from("esg_goals")
    .select(`*, department:departments(id,name)`)
    .order("deadline");
  return (data ?? []) as EsgGoal[];
}

export async function createEsgGoal(payload: {
  title: string;
  department_id: string;
  target_carbon: number;
  current_carbon: number;
  deadline: string;
}) {
  const supabase = await createClient();
  const { data, error } = await supabase
    .from("esg_goals")
    .insert({ ...payload, status: "active" })
    .select()
    .single();
  if (error) throw error;
  return data;
}

/** Carbon stats for the dashboard cards */
export async function getCarbonStats() {
  const supabase = await createClient();
  const { data } = await supabase
    .from("carbon_transactions")
    .select("co2_kg, activity, status");

  const approved = (data ?? []).filter((r) => r.status === "approved");
  const total    = approved.reduce((s, r) => s + r.co2_kg, 0);
  const fuel     = approved.filter((r) => ["Diesel Fuel","Petrol Fuel","Natural Gas"].includes(r.activity)).reduce((s,r)=>s+r.co2_kg,0);
  const elec     = approved.filter((r) => r.activity === "Grid Electricity").reduce((s,r)=>s+r.co2_kg,0);

  return {
    totalKg:   Math.round(total),
    savedKg:   Math.round(total * 0.11), // simulated 11% saving vs baseline
    fuelKg:    Math.round(fuel),
    electricKg:Math.round(elec),
  };
}
