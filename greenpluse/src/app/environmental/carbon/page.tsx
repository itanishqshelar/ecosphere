import { getCarbonTransactions, getEmissionFactors, getCarbonStats } from "@/lib/db/carbon";
import { getDepartments } from "@/lib/db/employees";
import { CarbonClient } from "./CarbonClient";

export default async function CarbonPage() {
  const [transactions, emissionFactors, stats, departments] = await Promise.all([
    getCarbonTransactions(),
    getEmissionFactors(),
    getCarbonStats(),
    getDepartments(),
  ]);

  return <CarbonClient transactions={transactions} emissionFactors={emissionFactors} stats={stats} departments={departments} />;
}
