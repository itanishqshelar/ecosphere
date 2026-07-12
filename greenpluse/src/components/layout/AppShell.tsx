"use client";

import { Sidebar } from "./Sidebar";
import { Header } from "./Header";
import { Toaster } from "sonner";
import { useThemeStore } from "@/lib/store";
import { useEffect } from "react";
import { motion } from "framer-motion";

interface AppShellProps {
  children: React.ReactNode;
  title?: string;
  subtitle?: string;
}

export function AppShell({ children, title, subtitle }: AppShellProps) {
  const { theme, setTheme } = useThemeStore();

  // Init theme on mount
  useEffect(() => {
    const saved = localStorage.getItem("gp-theme") as "dark" | "light" | null;
    setTheme(saved ?? "dark");
  }, [setTheme]);

  // Persist theme
  useEffect(() => {
    localStorage.setItem("gp-theme", theme);
  }, [theme]);

  return (
    <div className="flex h-screen overflow-hidden bg-[hsl(var(--background))]">
      <Sidebar />
      <div className="flex flex-col flex-1 overflow-hidden">
        <Header title={title} subtitle={subtitle} />
        <motion.main
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3, ease: "easeOut" }}
          className="flex-1 overflow-y-auto"
        >
          {children}
        </motion.main>
      </div>
      <Toaster
        theme={theme}
        position="bottom-right"
        toastOptions={{
          style: {
            background: "hsl(var(--surface-elevated))",
            border: "1px solid hsl(var(--border))",
            color: "hsl(var(--foreground))",
          },
        }}
      />
    </div>
  );
}
