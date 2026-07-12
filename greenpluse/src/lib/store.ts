"use client";

import { create } from "zustand";

type Theme = "light" | "dark";

interface ThemeStore {
  theme: Theme;
  setTheme: (theme: Theme) => void;
  toggleTheme: () => void;
}

export const useThemeStore = create<ThemeStore>((set, get) => ({
  theme: "dark",
  setTheme: (theme) => {
    set({ theme });
    if (typeof document !== "undefined") {
      document.documentElement.classList.toggle("dark", theme === "dark");
    }
  },
  toggleTheme: () => {
    const next = get().theme === "dark" ? "light" : "dark";
    get().setTheme(next);
  },
}));

interface SidebarStore {
  collapsed: boolean;
  toggleCollapsed: () => void;
  setCollapsed: (v: boolean) => void;
}

export const useSidebarStore = create<SidebarStore>((set) => ({
  collapsed: false,
  toggleCollapsed: () => set((s) => ({ collapsed: !s.collapsed })),
  setCollapsed: (v) => set({ collapsed: v }),
}));
