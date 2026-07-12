"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { cn } from "@/lib/utils";
import { useSidebarStore } from "@/lib/store";
import {
  LayoutDashboard, Leaf, Users, Shield, Trophy, FileBarChart,
  Settings, ChevronLeft, ChevronRight, Zap, Globe, Target,
  Award, BarChart3, MessageSquare, ChevronDown,
} from "lucide-react";
import { useState } from "react";

const navGroups = [
  {
    label: "Overview",
    items: [
      { label: "Dashboard",  href: "/dashboard",  icon: LayoutDashboard },
    ],
  },
  {
    label: "Environmental",
    items: [
      { label: "Carbon Accounting",   href: "/environmental/carbon",   icon: Leaf },
      { label: "Emission Factors",    href: "/environmental/factors",  icon: Globe },
      { label: "ESG Goals",           href: "/environmental/goals",    icon: Target },
    ],
  },
  {
    label: "Social",
    items: [
      { label: "CSR Activities",  href: "/social/csr",       icon: Users },
      { label: "Training",        href: "/social/training",  icon: Zap },
      { label: "Diversity",       href: "/social/diversity", icon: Award },
    ],
  },
  {
    label: "Governance",
    items: [
      { label: "Policies",    href: "/governance/policies",   icon: Shield },
      { label: "Audits",      href: "/governance/audits",     icon: FileBarChart },
      { label: "Compliance",  href: "/governance/compliance", icon: BarChart3 },
    ],
  },
  {
    label: "Gamification",
    items: [
      { label: "Challenges",   href: "/gamification/challenges",  icon: Trophy },
      { label: "Leaderboard",  href: "/gamification/leaderboard", icon: Award },
      { label: "Rewards",      href: "/gamification/rewards",     icon: Zap },
      { label: "Badges",       href: "/gamification/badges",      icon: Award },
    ],
  },
  {
    label: "Reports",
    items: [
      { label: "Report Builder",  href: "/reports", icon: FileBarChart },
    ],
  },
  {
    label: "System",
    items: [
      { label: "AI Assistant",  href: "/ai",       icon: MessageSquare },
      { label: "Settings",      href: "/settings", icon: Settings },
    ],
  },
];

export function Sidebar() {
  const pathname = usePathname();
  const { collapsed, toggleCollapsed } = useSidebarStore();
  const [openGroups, setOpenGroups] = useState<Record<string, boolean>>({
    Overview: true, Environmental: true, Social: true,
    Governance: true, Gamification: true, Reports: true, System: true,
  });

  const toggleGroup = (label: string) => {
    setOpenGroups((prev) => ({ ...prev, [label]: !prev[label] }));
  };

  return (
    <motion.aside
      animate={{ width: collapsed ? 72 : 256 }}
      transition={{ duration: 0.25, ease: "easeInOut" }}
      className="relative flex flex-col h-full bg-[hsl(var(--sidebar-bg))] border-r border-[hsl(var(--sidebar-border))] overflow-hidden shrink-0"
    >
      {/* Logo */}
      <div className="flex items-center gap-3 px-4 h-16 border-b border-[hsl(var(--sidebar-border))]">
        <div className="w-8 h-8 rounded-xl bg-gradient-to-br from-primary-500 to-emerald-500 flex items-center justify-center shrink-0 shadow-glow-green">
          <Leaf className="w-4 h-4 text-white" />
        </div>
        <AnimatePresence>
          {!collapsed && (
            <motion.div
              initial={{ opacity: 0, x: -8 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -8 }}
              transition={{ duration: 0.2 }}
            >
              <p className="text-sm font-bold text-[hsl(var(--foreground))]">GreenPulse</p>
              <p className="text-2xs text-[hsl(var(--foreground-subtle))] -mt-0.5">AI ESG Platform</p>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Nav */}
      <nav className="flex-1 overflow-y-auto py-3 px-2 space-y-0.5">
        {navGroups.map((group) => (
          <div key={group.label} className="mb-1">
            {/* Group label */}
            {!collapsed && (
              <button
                onClick={() => toggleGroup(group.label)}
                className="w-full flex items-center justify-between px-3 py-1.5 mb-0.5"
              >
                <span className="text-2xs font-semibold uppercase tracking-widest text-[hsl(var(--foreground-subtle))]">
                  {group.label}
                </span>
                <ChevronDown
                  className={cn(
                    "w-3 h-3 text-[hsl(var(--foreground-subtle))] transition-transform duration-200",
                    !openGroups[group.label] && "-rotate-90"
                  )}
                />
              </button>
            )}

            {/* Items */}
            <AnimatePresence initial={false}>
              {(openGroups[group.label] || collapsed) && (
                <motion.div
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: "auto", opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  transition={{ duration: 0.2 }}
                  className="overflow-hidden"
                >
                  {group.items.map((item) => {
                    const isActive = pathname === item.href || pathname.startsWith(item.href + "/");
                    const Icon = item.icon;
                    return (
                      <Link
                        key={item.href}
                        href={item.href}
                        title={collapsed ? item.label : undefined}
                        className={cn(
                          "sidebar-item",
                          isActive && "active",
                          collapsed && "justify-center px-2"
                        )}
                      >
                        <Icon
                          className={cn(
                            "w-4 h-4 shrink-0",
                            isActive
                              ? "text-primary-500"
                              : "text-[hsl(var(--foreground-muted))]"
                          )}
                        />
                        <AnimatePresence>
                          {!collapsed && (
                            <motion.span
                              initial={{ opacity: 0, x: -4 }}
                              animate={{ opacity: 1, x: 0 }}
                              exit={{ opacity: 0 }}
                              transition={{ duration: 0.15 }}
                              className="truncate"
                            >
                              {item.label}
                            </motion.span>
                          )}
                        </AnimatePresence>
                        {isActive && !collapsed && (
                          <motion.div
                            layoutId="active-indicator"
                            className="ml-auto w-1.5 h-1.5 rounded-full bg-primary-500"
                          />
                        )}
                      </Link>
                    );
                  })}
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        ))}
      </nav>

      {/* Collapse toggle */}
      <button
        onClick={toggleCollapsed}
        className="absolute -right-3.5 top-[72px] z-50 w-7 h-7 rounded-full bg-[hsl(var(--surface-elevated))] border border-[hsl(var(--border))] flex items-center justify-center shadow-card hover:bg-[hsl(var(--surface-overlay))] transition-colors"
      >
        {collapsed
          ? <ChevronRight className="w-3.5 h-3.5 text-[hsl(var(--foreground-muted))]" />
          : <ChevronLeft  className="w-3.5 h-3.5 text-[hsl(var(--foreground-muted))]" />
        }
      </button>
    </motion.aside>
  );
}
