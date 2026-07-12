import { AppShell } from "@/components/layout/AppShell";
export default function GamificationLayout({ children }: { children: React.ReactNode }) {
  return <AppShell title="Gamification" subtitle="Challenges, Rewards & Leaderboard">{children}</AppShell>;
}
