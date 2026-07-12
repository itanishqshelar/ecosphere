import { getRewards } from "@/lib/db/gamification";
import { RewardsClient } from "./RewardsClient";

export default async function RewardsPage() {
  const rewards = await getRewards();
  return <RewardsClient rewards={rewards} />;
}
