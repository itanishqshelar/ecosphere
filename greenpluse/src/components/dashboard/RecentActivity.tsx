"use client";

import { motion } from "framer-motion";
import { mockActivity } from "@/lib/mock-data";

export function RecentActivityFeed() {
  return (
    <div className="card p-5">
      <div className="flex items-center justify-between mb-5">
        <div>
          <h3 className="section-title">Recent Activity</h3>
          <p className="section-subtitle">Live platform events</p>
        </div>
        <span className="flex items-center gap-1.5 text-xs text-primary-500">
          <span className="w-1.5 h-1.5 rounded-full bg-primary-500 animate-pulse-green" />
          Live
        </span>
      </div>
      <div className="space-y-0">
        {mockActivity.map((item, i) => (
          <motion.div
            key={item.id}
            initial={{ opacity: 0, x: 12 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: i * 0.07, duration: 0.3 }}
            className="flex gap-3 py-3 border-b border-[hsl(var(--border-muted))] last:border-0 group hover:bg-[hsl(var(--surface-overlay))]/40 -mx-2 px-2 rounded-xl transition-colors"
          >
            {/* Icon bubble */}
            <div className="w-8 h-8 rounded-xl bg-[hsl(var(--surface-overlay))] flex items-center justify-center text-sm shrink-0 group-hover:scale-110 transition-transform">
              {item.icon}
            </div>
            {/* Content */}
            <div className="flex-1 min-w-0">
              <p className="text-sm text-[hsl(var(--foreground))] leading-snug">{item.text}</p>
              <p className="text-xs text-[hsl(var(--foreground-subtle))] mt-0.5">{item.time}</p>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
