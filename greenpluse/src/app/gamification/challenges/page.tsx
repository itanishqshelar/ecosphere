import { getChallenges, getChallengeSummaryStats } from "@/lib/db/challenges";
import { ChallengesClient } from "./ChallengesClient";

export default async function ChallengesPage() {
  const [challenges, stats] = await Promise.all([getChallenges(), getChallengeSummaryStats()]);
  return <ChallengesClient challenges={challenges} stats={stats} />;
}
