"use client";

import { Bell, Search, Sun, Moon, Leaf } from "lucide-react";
import { useThemeStore } from "@/lib/store";
import { motion } from "framer-motion";
import { useState } from "react";

interface HeaderProps {
  title?: string;
  subtitle?: string;
}

export function Header({ title = "Dashboard", subtitle }: HeaderProps) {
  const { theme, toggleTheme } = useThemeStore();
  const [notifications] = useState(4);

  return (
    <header className="h-16 border-b border-[hsl(var(--border))] bg-[hsl(var(--surface))]/80 backdrop-blur-sm flex items-center justify-between px-6 shrink-0 sticky top-0 z-40">
      {/* Left — breadcrumb/title */}
      <div>
        <h1 className="text-base font-semibold text-[hsl(var(--foreground))]">{title}</h1>
        {subtitle && (
          <p className="text-xs text-[hsl(var(--foreground-muted))]">{subtitle}</p>
        )}
      </div>

      {/* Right — search + actions */}
      <div className="flex items-center gap-2">
        {/* Search */}
        <div className="relative hidden md:flex items-center">
          <Search className="absolute left-3 w-4 h-4 text-[hsl(var(--foreground-subtle))]" />
          <input
            className="input pl-9 w-56 h-9 text-xs"
            placeholder="Search…"
          />
          <kbd className="absolute right-3 text-2xs text-[hsl(var(--foreground-subtle))] font-mono border border-[hsl(var(--border))] rounded px-1 py-0.5">
            ⌘K
          </kbd>
        </div>

        {/* Notifications */}
        <button className="btn-ghost relative w-9 h-9 p-0 flex items-center justify-center rounded-xl">
          <Bell className="w-4.5 h-4.5" />
          {notifications > 0 && (
            <motion.span
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              className="absolute top-1.5 right-1.5 w-2 h-2 rounded-full bg-danger-500"
            />
          )}
        </button>

        {/* Theme toggle */}
        <button
          onClick={toggleTheme}
          className="btn-ghost w-9 h-9 p-0 flex items-center justify-center rounded-xl"
        >
          <motion.div
            key={theme}
            initial={{ rotate: -90, opacity: 0 }}
            animate={{ rotate: 0, opacity: 1 }}
            transition={{ duration: 0.2 }}
          >
            {theme === "dark"
              ? <Sun  className="w-4 h-4 text-warning-400" />
              : <Moon className="w-4 h-4 text-accent-500" />
            }
          </motion.div>
        </button>

        {/* Divider */}
        <div className="w-px h-6 bg-[hsl(var(--border))]" />

        {/* User Avatar */}
        <div className="flex items-center gap-2 cursor-pointer group">
          <div className="w-8 h-8 rounded-xl bg-gradient-to-br from-primary-500 to-emerald-500 flex items-center justify-center text-xs font-bold text-white">
            AD
          </div>
          <div className="hidden md:block">
            <p className="text-xs font-semibold text-[hsl(var(--foreground))]">Admin User</p>
            <p className="text-2xs text-[hsl(var(--foreground-muted))]">Super Admin</p>
          </div>
        </div>
      </div>
    </header>
  );
}
