import { createClient } from "@/lib/supabase/server";
import type { Department, Employee } from "@/lib/types";

export async function getDepartments(): Promise<Department[]> {
  const supabase = await createClient();
  const { data } = await supabase.from("departments").select("*").order("name");
  return data ?? [];
}

export async function getEmployees(): Promise<Employee[]> {
  const supabase = await createClient();
  const { data } = await supabase
    .from("employees")
    .select(`*, department:departments(id,name)`)
    .order("xp", { ascending: false });
  return (data ?? []) as Employee[];
}
