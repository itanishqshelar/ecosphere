"use client";

import { motion } from "framer-motion";
import { TrendingUp, TrendingDown, Minus } from "lucide-react";
import { cn } from "@/lib/utils";
import type { LucideIcon } from "lucide-react";

interface KPICardProps {
  title: string;
  value: number | string;
  unit?: string;
  change?: number | null;   // percent change, pre-computed
  icon: LucideIcon;
  iconColor?: string;
  iconBg?: string;
  gradient?: string;
  index?: number;
}

export function KPICard({
  title,
  value,
  unit = "",
  change = null,
  icon: Icon,
  iconColor = "text-primary-500",
  iconBg = "bg-primary-500/10",
  gradient,
  index = 0,
}: KPICardProps) {
  const isUp   = change !== null && change > 0;
  const isDown = change !== null && change < 0;
  const isFlat = change !== null && change === 0;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, delay: index * 0.07, ease: "easeOut" }}
      className="metric-card group"
    >
      {gradient && (
        <div className={cn("absolute top-0 left-0 right-0 h-0.5 rounded-t-2xl", gradient)} />
      )}

      <div className="flex items-start justify-between">
        <div className={cn("w-10 h-10 rounded-xl flex items-center justify-center shrink-0", iconBg)}>
          <Icon className={cn("w-5 h-5", iconColor)} />
        </div>
        {change !== null && (
          <div
            className={cn(
              "flex items-center gap-1 text-xs font-semibold px-2 py-1 rounded-lg",
              isUp   && "text-primary-600 bg-primary-500/10",
              isDown && "text-danger-500 bg-danger-500/10",
              isFlat && "bg-[hsl(var(--surface-overlay))] text-[hsl(var(--foreground-muted))]"
            )}
            style={isDown ? { color: "#ef4444" } : {}}
          >
            {isUp   && <TrendingUp   className="w-3 h-3" />}
            {isDown && <TrendingDown className="w-3 h-3" />}
            {isFlat && <Minus        className="w-3 h-3" />}
            {Math.abs(change).toFixed(1)}%
          </div>
        )}
      </div>

      <div>
        <div className="flex items-end gap-1">
          <span className="text-2xl font-bold" style={{ color: "hsl(var(--foreground))" }}>
            {typeof value === "number" ? value.toLocaleString() : value}
          </span>
          {unit && (
            <span className="text-sm mb-0.5" style={{ color: "hsl(var(--foreground-muted))" }}>{unit}</span>
          )}
        </div>
        <p className="text-sm font-medium mt-0.5" style={{ color: "hsl(var(--foreground-muted))" }}>{title}</p>
      </div>

      <div className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none ring-1 ring-primary-500/20" />
    </motion.div>
  );
}
