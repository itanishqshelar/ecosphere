"use client";


import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { Leaf, ArrowRight, Wind, Users, Shield, Trophy } from "lucide-react";

const modules = [
  { icon: Wind, label: "Environmental", desc: "Carbon accounting & sustainability goals", color: "text-primary-500", bg: "bg-primary-500/10" },
  { icon: Users, label: "Social", desc: "CSR activities & employee engagement", color: "text-accent-500", bg: "bg-accent-500/10" },
  { icon: Shield, label: "Governance", desc: "Policies, audits & compliance", color: "text-purple-500", bg: "bg-purple-500/10" },
  { icon: Trophy, label: "Gamification", desc: "Challenges, XP & rewards", color: "text-amber-500", bg: "bg-amber-500/10" },
];

export default function WelcomePage() {
  const router = useRouter();

  const handleEnter = () => {
    localStorage.setItem("gp-welcome-seen", "true");
    router.push("/dashboard");
  };

  useEffect(() => {
    const seen = localStorage.getItem("gp-welcome-seen");
    if (seen) {
      router.push("/dashboard");
    }
  }, [router]);

  return (
    <div className="min-h-screen bg-white dark:bg-[hsl(var(--background))] flex flex-col items-center justify-center p-6">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="max-w-lg w-full text-center"
      >
        {/* Logo */}
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ duration: 0.4, delay: 0.1 }}
          className="w-16 h-16 rounded-2xl bg-gradient-to-br from-primary-500 to-emerald-500 flex items-center justify-center mx-auto shadow-glow-green mb-6"
        >
          <Leaf className="w-8 h-8 text-white" />
        </motion.div>

        <h1 className="text-3xl font-bold tracking-tight text-[hsl(var(--foreground))]">
          Welcome to GreenPulse AI
        </h1>
        <p className="text-base text-[hsl(var(--foreground-muted))] mt-3 leading-relaxed">
          Your organization&apos;s ESG management platform. Monitor sustainability,
          engage employees, and drive compliance — all in one place.
        </p>

        {/* Module cards */}
        <div className="grid grid-cols-2 gap-3 mt-8">
          {modules.map((mod, i) => (
            <motion.div
              key={mod.label}
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: 0.3 + i * 0.08 }}
              className="card p-4 text-left group hover:shadow-card-hover transition-all"
            >
              <div className={`w-9 h-9 rounded-xl ${mod.bg} flex items-center justify-center mb-2`}>
                <mod.icon className={`w-4.5 h-4.5 ${mod.color}`} />
              </div>
              <h3 className="text-sm font-semibold text-[hsl(var(--foreground))]">{mod.label}</h3>
              <p className="text-xs text-[hsl(var(--foreground-muted))] mt-0.5">{mod.desc}</p>
            </motion.div>
          ))}
        </div>

        <motion.button
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: 0.7 }}
          onClick={handleEnter}
          className="btn-primary mt-8 px-8 py-3 text-base"
        >
          Enter workspace
          <ArrowRight className="w-4 h-4" />
        </motion.button>
      </motion.div>
    </div>
  );
}



