"use client";

import { motion } from "framer-motion";
import { Zap, ShoppingCart } from "lucide-react";
import { createClient } from "@/lib/supabase/client";
import { toast } from "sonner";
import { useState } from "react";
import type { Reward } from "@/lib/types";

export function RewardsClient({ rewards }: { rewards: Reward[] }) {
  const [userXP, setUserXP] = useState<number | null>(null);

  const loadXP = async () => {
    const supabase = createClient();
    const { data } = await supabase.from("employees").select("xp").eq("role", "employee").order("xp", { ascending: false }).limit(1).single();
    setUserXP(data?.xp ?? 0);
  };

  const handleRedeem = async (reward: Reward) => {
    if (userXP === null) { await loadXP(); return; }
    if (userXP < reward.xp_cost) {
      toast.error(`Need ${reward.xp_cost - userXP} more XP to redeem this.`);
      return;
    }
    try {
      const supabase = createClient();
      const { data: emp } = await supabase.from("employees").select("id,xp").eq("role","employee").order("xp",{ascending:false}).limit(1).single();
      if (!emp) throw new Error("No employee found");
      await supabase.from("employees").update({ xp: emp.xp - reward.xp_cost }).eq("id", emp.id);
      await supabase.from("reward_redemptions").insert({ reward_id: reward.id, employee_id: emp.id, xp_spent: reward.xp_cost });
      setUserXP(emp.xp - reward.xp_cost);
      toast.success(`🎉 "${reward.name}" redeemed! Check your email.`);
    } catch (err: any) {
      toast.error(err.message ?? "Redemption failed");
    }
  };

  return (
    <div className="page-wrapper">
      <motion.div initial={{ opacity: 0, y: -8 }} animate={{ opacity: 1, y: 0 }}
        className="card p-5 flex items-center justify-between"
        style={{ background: "linear-gradient(to right,rgba(34,197,94,0.1),rgba(16,185,129,0.05),rgba(59,130,246,0.1))", borderColor: "rgba(34,197,94,0.2)" }}>
        <div>
          <p className="text-sm" style={{ color: "hsl(var(--foreground-muted))" }}>Your XP Balance</p>
          <div className="flex items-center gap-2 mt-1">
            <Zap className="w-5 h-5" style={{ color: "#22c55e" }} />
            {userXP === null
              ? <button onClick={loadXP} className="text-xl font-bold text-primary-500" style={{ color: "#22c55e", background: "none", border: "none", cursor: "pointer" }}>Click to load XP</button>
              : <span className="text-2xl font-bold" style={{ color: "hsl(var(--foreground))" }}>{userXP.toLocaleString()} XP</span>
            }
          </div>
        </div>
        <div className="text-right">
          <p className="text-xs" style={{ color: "hsl(var(--foreground-muted))" }}>{rewards.length} rewards available</p>
        </div>
      </motion.div>

      <div>
        <h2 className="text-xl font-bold" style={{ color: "hsl(var(--foreground))" }}>Reward Store</h2>
        <p className="section-subtitle mt-0.5">Redeem your XP for exciting rewards</p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {rewards.map((reward, i) => {
          const canAfford = userXP !== null && userXP >= reward.xp_cost;
          return (
            <motion.div key={reward.id} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.08 }}
              className="card p-5 flex flex-col gap-4 group hover:shadow-card-hover">
              <div className="flex items-start justify-between">
                <div className="text-4xl group-hover:scale-110 transition-transform duration-200">{reward.icon}</div>
                <span className="badge-gray badge text-xs">{reward.category}</span>
              </div>
              <div>
                <h4 className="font-bold" style={{ color: "hsl(var(--foreground))" }}>{reward.name}</h4>
                <p className="text-xs mt-0.5" style={{ color: "hsl(var(--foreground-muted))" }}>{reward.stock} in stock</p>
              </div>
              <div className="flex items-center justify-between mt-auto">
                <div className="flex items-center gap-1 font-bold text-sm" style={{ color: userXP !== null && !canAfford ? "hsl(var(--foreground-muted))" : "#22c55e" }}>
                  <Zap className="w-3.5 h-3.5" />{reward.xp_cost} XP
                </div>
                <button onClick={() => handleRedeem(reward)}
                  className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-semibold transition-all"
                  style={canAfford ? { background: "#22c55e", color: "white" } : { background: "hsl(var(--surface-overlay))", color: "hsl(var(--foreground-muted))", opacity: 0.7 }}>
                  <ShoppingCart className="w-3.5 h-3.5" />
                  {userXP === null ? "Check XP" : canAfford ? "Redeem" : "Need more XP"}
                </button>
              </div>
            </motion.div>
          );
        })}
      </div>
    </div>
  );
}
