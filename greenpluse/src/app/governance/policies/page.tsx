import { getPolicies, getPolicyStats } from "@/lib/db/governance";
import { PoliciesClient } from "./PoliciesClient";

export default async function PoliciesPage() {
  const [policies, stats] = await Promise.all([getPolicies(), getPolicyStats()]);
  return <PoliciesClient policies={policies} stats={stats} />;
}
