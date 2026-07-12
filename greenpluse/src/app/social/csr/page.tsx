export const dynamic = 'force-dynamic';
export const revalidate = 0;
import { getCsrActivities, getCsrStats } from "@/lib/db/csr";
import { CSRClient } from "./CSRClient";

export default async function CSRPage() {
  const [activities, stats] = await Promise.all([getCsrActivities(), getCsrStats()]);
  return <CSRClient activities={activities} stats={stats} />;
}

