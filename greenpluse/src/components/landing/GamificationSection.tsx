"use client";

import { motion } from "framer-motion";
import { SectionHeading } from "./SectionHeading";
import { AnimatedCounter } from "./AnimatedCounter";
import { Trophy, Zap, Award, Users, Target, Flame } from "lucide-react";

const stats = [
  { icon: Trophy, value: 48.2, suffix: "K", label: "Total XP Earned", color: "text-amber-500", bg: "bg-amber-500/10" },
  { icon: Users, value: 342, suffix: "", label: "Active Participants", color: "text-primary-500", bg: "bg-primary-500/10" },
  { icon: Award, value: 124, suffix: "", label: "Badges Awarded", color: "text-purple-500", bg: "bg-purple-500/10" },
  { icon: Flame, value: 38, suffix: "", label: "Active Streaks", color: "text-orange-500", bg: "bg-orange-500/10" },
];

const leaderboardPreview = [
  { rank: 1, name: "Priya Sharma", dept: "HR", xp: 4820, initials: "PS", color: "from-yellow-400 to-orange-500" },
  { rank: 2, name: "Arjun Mehta", dept: "Engineering", xp: 4560, initials: "AM", color: "from-gray-300 to-gray-400" },
  { rank: 3, name: "Sneha Patel", dept: "Marketing", xp: 4210, initials: "SP", color: "from-orange-400 to-amber-500" },
  { rank: 4, name: "Rahul Verma", dept: "Finance", xp: 3980, initials: "RV", color: "from-primary-500/30 to-accent-500/30" },
  { rank: 5, name: "Kavya Nair", dept: "Operations", xp: 3750, initials: "KN", color: "from-primary-500/30 to-accent-500/30" },
];

const badges = [
  { name: "Green Warrior", icon: "🌿", earned: true },
  { name: "Eco Hero", icon: "⚡", earned: true },
  { name: "Climate Ch.", icon: "🌍", earned: false },
  { name: "CSR Legend", icon: "🌟", earned: false },
  { name: "Compliance", icon: "📋", earned: true },
  { name: "Volunteer", icon: "👑", earned: false },
];

const challenges = [
  { title: "Zero Plastic Week", xp: 300, participants: 42, difficulty: "Medium" },
  { title: "Cycle to Office", xp: 150, participants: 68, difficulty: "Easy" },
  { title: "Plant 5 Trees", xp: 400, participants: 29, difficulty: "Medium" },
];

export function GamificationSection() {
  return (
    <section id="gamification" className="py-20 lg:py-28 relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHeading
          label="Gamification"
          title="Engage Your Workforce"
          description="Turn sustainability into a rewarding experience. Challenges, XP, badges, and leaderboards drive real engagement."
          center
        />

        {/* Stats counters */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mt-14">
          {stats.map((stat, i) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: i * 0.1 }}
              className="card p-5 text-center group hover:shadow-card-hover transition-all duration-300"
            >
              <div className={`w-12 h-12 rounded-xl ${stat.bg} flex items-center justify-center mx-auto mb-3 group-hover:scale-110 transition-transform`}>
                <stat.icon className={`w-6 h-6 ${stat.color}`} />
              </div>
              <p className="text-2xl lg:text-3xl font-bold text-[hsl(var(--foreground))]">
                <AnimatedCounter end={stat.value} suffix={stat.suffix} />
              </p>
              <p className="text-xs text-[hsl(var(--foreground-muted))] mt-1">{stat.label}</p>
            </motion.div>
          ))}
        </div>

        {/* Bottom grid: Leaderboard + Badges + Challenges */}
        <div className="grid lg:grid-cols-3 gap-4 mt-6">
          {/* Leaderboard Preview */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.4, delay: 0.2 }}
            className="card p-5"
          >
            <div className="flex items-center justify-between mb-4">
              <h4 className="font-semibold text-sm text-[hsl(var(--foreground))]">Top Contributors</h4>
              <Trophy className="w-4 h-4 text-amber-500" />
            </div>
            <div className="space-y-2">
              {leaderboardPreview.map((entry) => (
                <div key={entry.rank} className="flex items-center gap-3 p-2 rounded-xl hover:bg-[hsl(var(--surface-overlay))] transition-colors">
                  <div className={`w-6 h-6 rounded-lg flex items-center justify-center text-xs font-bold shrink-0 ${
                    entry.rank <= 3 ? "text-white" : "text-[hsl(var(--foreground-muted))] bg-[hsl(var(--surface-overlay))]"
                  }`} style={entry.rank <= 3 ? { background: `linear-gradient(135deg, ${entry.color.replace("from-", "").split(" ")[0]}, ${entry.color.split(" ")[1].replace("to-", "")})` } : {}}>
                    {entry.rank <= 3 ? <Trophy className="w-3 h-3" /> : entry.rank}
                  </div>
                  <div className="w-7 h-7 rounded-lg flex items-center justify-center text-[10px] font-bold shrink-0" style={{ background: "linear-gradient(135deg, rgba(34,197,94,0.3), rgba(59,130,246,0.3))", color: "#22c55e" }}>
                    {entry.initials}
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-xs font-semibold text-[hsl(var(--foreground))] truncate">{entry.name}</p>
                    <p className="text-[10px] text-[hsl(var(--foreground-subtle))]">{entry.dept}</p>
                  </div>
                  <span className="text-xs font-bold text-primary-500">{entry.xp.toLocaleString()} XP</span>
                </div>
              ))}
            </div>
            <a href="/gamification/leaderboard" className="block text-center text-xs font-semibold text-primary-500 mt-3 hover:opacity-80 transition-opacity">
              View Full Leaderboard →
            </a>
          </motion.div>

          {/* Badges Gallery */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.4, delay: 0.3 }}
            className="card p-5"
          >
            <div className="flex items-center justify-between mb-4">
              <h4 className="font-semibold text-sm text-[hsl(var(--foreground))]">Achievement Badges</h4>
              <Award className="w-4 h-4 text-purple-500" />
            </div>
            <div className="grid grid-cols-3 gap-2">
              {badges.map((badge) => (
                <div
                  key={badge.name}
                  className={`rounded-xl p-3 text-center ${badge.earned ? "" : "opacity-40"} hover:opacity-100 transition-opacity`}
                  style={{ background: badge.earned ? "rgba(34,197,94,0.05)" : "hsl(var(--surface-overlay))" }}
                >
                  <span className="text-2xl block mb-1">{badge.icon}</span>
                  <p className={`text-[10px] font-semibold ${badge.earned ? "text-[hsl(var(--foreground))]" : "text-[hsl(var(--foreground-muted))]"}`}>
                    {badge.name}
                  </p>
                  {badge.earned && <span className="text-[8px] text-primary-500">✓ Earned</span>}
                </div>
              ))}
            </div>
            <a href="/gamification/badges" className="block text-center text-xs font-semibold text-primary-500 mt-3 hover:opacity-80 transition-opacity">
              View All Badges →
            </a>
          </motion.div>

          {/* Active Challenges */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.4, delay: 0.4 }}
            className="card p-5"
          >
            <div className="flex items-center justify-between mb-4">
              <h4 className="font-semibold text-sm text-[hsl(var(--foreground))]">Active Challenges</h4>
              <Target className="w-4 h-4 text-primary-500" />
            </div>
            <div className="space-y-3">
              {challenges.map((ch) => (
                <div key={ch.title} className="rounded-xl p-3" style={{ background: "hsl(var(--surface-overlay))" }}>
                  <div className="flex items-center justify-between mb-1">
                    <p className="text-xs font-semibold text-[hsl(var(--foreground))]">{ch.title}</p>
                    <span className={`text-[10px] font-semibold px-1.5 py-0.5 rounded ${
                      ch.difficulty === "Easy" ? "bg-primary-500/10 text-primary-500" :
                      ch.difficulty === "Medium" ? "bg-amber-500/10 text-amber-500" :
                      "bg-red-500/10 text-red-500"
                    }`}>{ch.difficulty}</span>
                  </div>
                  <div className="flex items-center justify-between text-[10px] text-[hsl(var(--foreground-subtle))]">
                    <span className="flex items-center gap-1"><Users className="w-3 h-3" />{ch.participants}</span>
                    <span className="flex items-center gap-1"><Zap className="w-3 h-3" />{ch.xp} XP</span>
                  </div>
                </div>
              ))}
            </div>
            <a href="/gamification/challenges" className="block text-center text-xs font-semibold text-primary-500 mt-3 hover:opacity-80 transition-opacity">
              View All Challenges →
            </a>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
