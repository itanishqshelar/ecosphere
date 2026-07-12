import Link from "next/link";
import { ArrowRight, Leaf, Shield, Trophy, Users } from "lucide-react";
import { SignOutButton } from "@/components/auth/SignOutButton";

export default function EmployeeDashboard() {
  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-8 flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight text-gray-900 dark:text-white">
            Employee Panel
          </h1>
          <p className="mt-2 text-gray-600 dark:text-gray-400">
            Welcome to your personal GreenPulse dashboard. Track your sustainability efforts and compete with peers!
          </p>
        </div>
        <SignOutButton />
      </div>

      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
        {/* Card 1 */}
        <Link href="/environmental/carbon" className="group rounded-xl border border-gray-200 bg-white p-6 shadow-sm transition-all hover:border-green-500 hover:shadow-md dark:border-gray-800 dark:bg-[hsl(var(--card))] dark:hover:border-green-500">
          <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-lg bg-green-100 text-green-600 dark:bg-green-900/30 dark:text-green-400">
            <Leaf className="h-6 w-6" />
          </div>
          <h3 className="mb-2 text-lg font-semibold text-gray-900 dark:text-white group-hover:text-green-600 dark:group-hover:text-green-400">
            Environmental Impact
          </h3>
          <p className="mb-4 text-sm text-gray-600 dark:text-gray-400">
            Log your carbon footprint, commutes, and track your reduction goals.
          </p>
          <div className="flex items-center text-sm font-medium text-green-600 dark:text-green-400">
            View impact <ArrowRight className="ml-1 h-4 w-4" />
          </div>
        </Link>

        {/* Card 2 */}
        <Link href="/social/csr" className="group rounded-xl border border-gray-200 bg-white p-6 shadow-sm transition-all hover:border-blue-500 hover:shadow-md dark:border-gray-800 dark:bg-[hsl(var(--card))] dark:hover:border-blue-500">
          <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-lg bg-blue-100 text-blue-600 dark:bg-blue-900/30 dark:text-blue-400">
            <Users className="h-6 w-6" />
          </div>
          <h3 className="mb-2 text-lg font-semibold text-gray-900 dark:text-white group-hover:text-blue-600 dark:group-hover:text-blue-400">
            Social & CSR
          </h3>
          <p className="mb-4 text-sm text-gray-600 dark:text-gray-400">
            Join volunteering events, track your social contributions and points.
          </p>
          <div className="flex items-center text-sm font-medium text-blue-600 dark:text-blue-400">
            View activities <ArrowRight className="ml-1 h-4 w-4" />
          </div>
        </Link>

        {/* Card 3 */}
        <Link href="/governance/policies" className="group rounded-xl border border-gray-200 bg-white p-6 shadow-sm transition-all hover:border-purple-500 hover:shadow-md dark:border-gray-800 dark:bg-[hsl(var(--card))] dark:hover:border-purple-500">
          <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-lg bg-purple-100 text-purple-600 dark:bg-purple-900/30 dark:text-purple-400">
            <Shield className="h-6 w-6" />
          </div>
          <h3 className="mb-2 text-lg font-semibold text-gray-900 dark:text-white group-hover:text-purple-600 dark:group-hover:text-purple-400">
            Governance
          </h3>
          <p className="mb-4 text-sm text-gray-600 dark:text-gray-400">
            Review company policies and complete mandatory compliance tasks.
          </p>
          <div className="flex items-center text-sm font-medium text-purple-600 dark:text-purple-400">
            View compliance <ArrowRight className="ml-1 h-4 w-4" />
          </div>
        </Link>

        {/* Card 4 */}
        <Link href="/gamification/leaderboard" className="group rounded-xl border border-gray-200 bg-white p-6 shadow-sm transition-all hover:border-orange-500 hover:shadow-md dark:border-gray-800 dark:bg-[hsl(var(--card))] dark:hover:border-orange-500">
          <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-lg bg-orange-100 text-orange-600 dark:bg-orange-900/30 dark:text-orange-400">
            <Trophy className="h-6 w-6" />
          </div>
          <h3 className="mb-2 text-lg font-semibold text-gray-900 dark:text-white group-hover:text-orange-600 dark:group-hover:text-orange-400">
            Leaderboard & Rewards
          </h3>
          <p className="mb-4 text-sm text-gray-600 dark:text-gray-400">
            Check your XP, badges, rankings, and redeem your hard-earned points.
          </p>
          <div className="flex items-center text-sm font-medium text-orange-600 dark:text-orange-400">
            View leaderboard <ArrowRight className="ml-1 h-4 w-4" />
          </div>
        </Link>
      </div>
    </div>
  );
}
