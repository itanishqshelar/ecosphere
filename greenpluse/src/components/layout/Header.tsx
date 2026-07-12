"use client";

import { Bell, Search, Sun, Moon } from "lucide-react";
import { motion } from "framer-motion";
import { useState } from "react";
import { useThemeStore } from "@/lib/store";
import { useAuthStore } from "@/lib/auth/store";

interface HeaderProps {
  title?: string;
  subtitle?: string;
}

function getDisplayName(name?: string | null, email?: string | null) {
  if (name?.trim()) {
    return name.trim();
  }

  if (email?.trim()) {
    return email.split("@")[0];
  }

  return "Employee";
}

function getDisplayRole(role?: string | null) {
  if (!role?.trim()) {
    return "Employee";
  }

  return role.replace(/_/g, " ");
}

function getInitials(name: string) {
  return name
    .split(" ")
    .filter(Boolean)
    .map((part) => part[0])
    .join("")
    .slice(0, 2)
    .toUpperCase();
}

export function Header({ title = "Dashboard", subtitle }: HeaderProps) {
  const { theme, toggleTheme } = useThemeStore();
  const { user, session } = useAuthStore();
  const [notifications] = useState(4);

  const sessionName = typeof session?.user_metadata?.name === "string" ? session.user_metadata.name : null;
  const sessionRole = typeof session?.user_metadata?.role === "string" ? session.user_metadata.role : null;
  const displayName = getDisplayName(user?.name ?? sessionName, user?.email ?? session?.email ?? null);
  const displayRole = getDisplayRole(user?.role ?? sessionRole);
  const initials = getInitials(displayName);

  return (
    <header className="sticky top-0 z-40 flex h-16 shrink-0 items-center justify-between border-b border-[hsl(var(--border))] bg-[hsl(var(--surface))]/80 px-6 backdrop-blur-sm">
      <div>
        <h1 className="text-base font-semibold text-[hsl(var(--foreground))]">{title}</h1>
        {subtitle && (
          <p className="text-xs text-[hsl(var(--foreground-muted))]">{subtitle}</p>
        )}
      </div>

      <div className="flex items-center gap-2">
        <div className="relative hidden items-center md:flex">
          <Search className="absolute left-3 h-4 w-4 text-[hsl(var(--foreground-subtle))]" />
          <input
            className="input h-9 w-56 pl-9 text-xs"
            placeholder="Search..."
          />
          <kbd className="absolute right-3 rounded border border-[hsl(var(--border))] px-1 py-0.5 font-mono text-2xs text-[hsl(var(--foreground-subtle))]">
            Cmd+K
          </kbd>
        </div>

        <button className="btn-ghost relative flex h-9 w-9 items-center justify-center rounded-xl p-0">
          <Bell className="h-4.5 w-4.5" />
          {notifications > 0 && (
            <motion.span
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              className="absolute right-1.5 top-1.5 h-2 w-2 rounded-full bg-danger-500"
            />
          )}
        </button>

        <button
          onClick={toggleTheme}
          className="btn-ghost flex h-9 w-9 items-center justify-center rounded-xl p-0"
        >
          <motion.div
            key={theme}
            initial={{ rotate: -90, opacity: 0 }}
            animate={{ rotate: 0, opacity: 1 }}
            transition={{ duration: 0.2 }}
          >
            {theme === "dark"
              ? <Sun className="h-4 w-4 text-warning-400" />
              : <Moon className="h-4 w-4 text-accent-500" />
            }
          </motion.div>
        </button>

        <div className="h-6 w-px bg-[hsl(var(--border))]" />

        <div className="group flex cursor-pointer items-center gap-2">
          <div className="flex h-8 w-8 items-center justify-center rounded-xl bg-gradient-to-br from-primary-500 to-emerald-500 text-xs font-bold text-white">
            {initials}
          </div>
          <div className="hidden md:block">
            <p className="text-xs font-semibold text-[hsl(var(--foreground))]">
              {displayName}
            </p>
            <p className="text-2xs capitalize text-[hsl(var(--foreground-muted))]">
              {displayRole}
            </p>
          </div>
        </div>
      </div>
    </header>
  );
}
