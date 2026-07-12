"use client";

import { motion } from "framer-motion";
import { mockRewards } from "@/lib/mock-data";
import { Zap, ShoppingCart } from "lucide-react";
import { cn } from "@/lib/utils";
import { toast } from "sonner";

const userXP = 4820;

export default function RewardsPage() {
  const handleRedeem = (reward: typeof mockRewards[0]) => {
    if (userXP < reward.xpCost) {
      toast.error(`Not enough XP! You need ${reward.xpCost - userXP} more XP.`);
      return;
    }
    toast.success(`🎉 "${reward.name}" redeemed successfully!`);
  };

  return (
    <div className="page-wrapper">
      {/* XP Balance Banner */}
      <motion.div
        initial={{ opacity: 0, y: -8 }}
        animate={{ opacity: 1, y: 0 }}
        className="card p-5 bg-gradient-to-r from-primary-500/10 via-emerald-500/5 to-accent-500/10 border-primary-500/20 flex items-center justify-between"
      >
        <div>
          <p className="text-sm text-[hsl(var(--foreground-muted))]">Your XP Balance</p>
          <div className="flex items-center gap-2 mt-1">
            <Zap className="w-5 h-5 text-primary-500" />
            <span className="text-2xl font-bold text-[hsl(var(--foreground))]">{userXP.toLocaleString()} XP</span>
          </div>
        </div>
        <div className="text-right">
          <p className="text-xs text-[hsl(var(--foreground-muted))]">Lifetime earned</p>
          <p className="text-sm font-bold text-primary-500">8,400 XP</p>
        </div>
      </motion.div>

      <div>
        <h2 className="text-xl font-bold text-[hsl(var(--foreground))]">Reward Store</h2>
        <p className="section-subtitle mt-0.5">Redeem your XP for exciting rewards</p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {mockRewards.map((reward, i) => {
          const canAfford = userXP >= reward.xpCost;
          return (
            <motion.div
              key={reward.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.08 }}
              className="card p-5 flex flex-col gap-4 group hover:shadow-card-hover"
            >
              <div className="flex items-start justify-between">
                <div className="text-4xl group-hover:scale-110 transition-transform duration-200">
                  {reward.icon}
                </div>
                <span className="badge-gray badge text-xs">{reward.category}</span>
              </div>
              <div>
                <h4 className="font-bold text-[hsl(var(--foreground))]">{reward.name}</h4>
                <p className="text-xs text-[hsl(var(--foreground-muted))] mt-0.5">{reward.stock} in stock</p>
              </div>
              <div className="flex items-center justify-between mt-auto">
                <div className={cn(
                  "flex items-center gap-1 font-bold text-sm",
                  canAfford ? "text-primary-500" : "text-[hsl(var(--foreground-muted))]"
                )}>
                  <Zap className="w-3.5 h-3.5" />
                  {reward.xpCost} XP
                </div>
                <button
                  onClick={() => handleRedeem(reward)}
                  className={cn(
                    "flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-semibold transition-all",
                    canAfford
                      ? "btn-primary"
                      : "bg-[hsl(var(--surface-overlay))] text-[hsl(var(--foreground-muted))] cursor-not-allowed opacity-60"
                  )}
                >
                  <ShoppingCart className="w-3.5 h-3.5" />
                  {canAfford ? "Redeem" : "Insufficient XP"}
                </button>
              </div>
            </motion.div>
          );
        })}
      </div>
    </div>
  );
}
