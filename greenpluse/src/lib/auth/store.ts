"use client";

import { create } from "zustand";
import type { AuthStore } from "./types";
import type { User } from "@supabase/supabase-js";

const initialState = {
  user: null,
  session: null as User | null,
  isLoading: true,
  isFirstTime: false,
};

export const useAuthStore = create<AuthStore>((set) => ({
  ...initialState,
  setUser: (user) => set({ user }),
  setSession: (session) => set({ session: session as User | null }),
  setLoading: (isLoading) => set({ isLoading }),
  setFirstTime: (isFirstTime) => set({ isFirstTime }),
  reset: () => set(initialState),
}));
