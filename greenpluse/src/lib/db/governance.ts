import { createClient } from "@/lib/supabase/server";
import type { Policy, PolicyAcknowledgement, Audit, ComplianceIssue } from "@/lib/types";

export async function getPolicies(): Promise<Policy[]> {
  const supabase = await createClient();

  const { data: policies } = await supabase
    .from("policies")
    .select(`*, department:departments(id,name)`)
    .order("effective_date", { ascending: false });

  if (!policies) return [];

  const { data: acks } = await supabase
    .from("policy_acknowledgements")
    .select("policy_id, status");

  return policies.map((pol) => {
    const polAcks = (acks ?? []).filter((a) => a.policy_id === pol.id);
    return {
      ...pol,
      accepted_count: polAcks.filter((a) => a.status === "accepted").length,
      pending_count:  polAcks.filter((a) => a.status === "pending").length,
      rejected_count: polAcks.filter((a) => a.status === "rejected").length,
    };
  }) as Policy[];
}

export async function acceptPolicy(policyId: string, employeeId: string) {
  const supabase = await createClient();
  const { error } = await supabase
    .from("policy_acknowledgements")
    .upsert({
      policy_id: policyId,
      employee_id: employeeId,
      status: "accepted",
      acknowledged_at: new Date().toISOString(),
    });
  if (error) throw error;
}

export async function getPolicyStats() {
  const supabase = await createClient();
  const { count: total }    = await supabase.from("policies").select("id", { count: "exact", head: true });
  const { count: active }   = await supabase.from("policies").select("id", { count: "exact", head: true }).eq("status", "active");
  const { count: pending }  = await supabase.from("policy_acknowledgements").select("id", { count: "exact", head: true }).eq("status", "pending");
  return { total: total ?? 0, active: active ?? 0, pending: pending ?? 0 };
}

export async function getAudits(): Promise<Audit[]> {
  const supabase = await createClient();
  const { data } = await supabase
    .from("audits")
    .select(`*, department:departments(id,name), auditor:employees(id,name,avatar)`)
    .order("created_at", { ascending: false });
  return (data ?? []) as Audit[];
}

export async function getComplianceIssues(): Promise<ComplianceIssue[]> {
  const supabase = await createClient();
  const { data } = await supabase
    .from("compliance_issues")
    .select(`*, department:departments(id,name), owner:employees(id,name,avatar)`)
    .order("created_at", { ascending: false });
  return (data ?? []) as ComplianceIssue[];
}
