export const dynamic = 'force-dynamic';
export const revalidate = 0;
import { getDashboardKPIs, getMonthlyCarbonTrend, getDeptESGScores, getLeaderboard, getRecentNotifications } from "@/lib/db/dashboard";
import { DashboardClient } from "./DashboardClient";

export default async function DashboardPage() {
  // Fetch all data in parallel on the server
  const [kpis, carbonTrend, deptScores, leaderboard, notifications] = await Promise.all([
    getDashboardKPIs(),
    getMonthlyCarbonTrend(),
    getDeptESGScores(),
    getLeaderboard(6),
    getRecentNotifications(6),
  ]);

  return (
    <DashboardClient
      kpis={kpis}
      carbonTrend={carbonTrend}
      deptScores={deptScores}
      leaderboard={leaderboard}
      notifications={notifications}
    />
  );
}

