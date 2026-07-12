export const dynamic = 'force-dynamic';
export const revalidate = 0;
import { getLeaderboard } from "@/lib/db/dashboard";
import { LeaderboardClient } from "./LeaderboardClient";

export default async function LeaderboardPage() {
  const leaderboard = await getLeaderboard(20);
  return <LeaderboardClient leaderboard={leaderboard} />;
}

