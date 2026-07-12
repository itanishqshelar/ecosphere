"use client";

import { createContext, useContext, useEffect, useCallback } from "react";
import { useRouter } from "next/navigation";
import { createClient } from "@/lib/supabase/client";
import { useAuthStore } from "@/lib/auth/store";
import type { AuthUser } from "@/lib/auth/types";

interface AuthContextValue {
  user: AuthUser | null;
  isLoading: boolean;
  isFirstTime: boolean;
  refresh: () => Promise<void>;
}

const AuthContext = createContext<AuthContextValue>({
  user: null,
  isLoading: true,
  isFirstTime: false,
  refresh: async () => {},
});

export function useAuth() {
  return useContext(AuthContext);
}

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const router = useRouter();
  const {
    user,
    isLoading,
    isFirstTime,
    setUser,
    setSession,
    setLoading,
    setFirstTime,
  } = useAuthStore();

  const refresh = useCallback(async () => {
    const supabase = createClient();
    const { data: { session } } = await supabase.auth.getSession();

    setSession(session?.user ?? null);

    if (!session?.user) {
      setUser(null);
      setLoading(false);
      return;
    }

    const { data: employee } = await supabase
      .from("employees")
      .select("*, department:departments(name)")
      .eq("id", session.user.id)
      .single();

    if (employee) {
      setUser({
        id: employee.id,
        email: employee.email,
        name: employee.name,
        avatar: employee.avatar,
        role: employee.role,
        department_id: employee.department_id,
        department_name: employee.department?.name ?? null,
        xp: employee.xp,
        created_at: employee.created_at,
      });
    } else {
      const { data: newEmployee } = await supabase
        .from("employees")
        .upsert({
          id: session.user.id,
          name: session.user.user_metadata?.name ?? session.user.email!.split("@")[0],
          email: session.user.email!,
          role: "employee",
          xp: 0,
          avatar: session.user.user_metadata?.avatar_url ?? null,
          department_id: null,
        }, { onConflict: "id" })
        .select()
        .single();

      if (newEmployee) {
        setUser({
          id: newEmployee.id,
          email: newEmployee.email,
          name: newEmployee.name,
          avatar: newEmployee.avatar,
          role: newEmployee.role,
          department_id: newEmployee.department_id,
          department_name: null,
          xp: newEmployee.xp,
          created_at: newEmployee.created_at,
        });
        setFirstTime(true);
      }
    }

    setLoading(false);
  }, [setUser, setSession, setLoading, setFirstTime]);

  useEffect(() => {
    if (!isLoading && user) {
      const hasSeenWelcome = localStorage.getItem("gp-welcome-seen");
      if (!hasSeenWelcome) {
        localStorage.setItem("gp-welcome-seen", "true");
        router.push("/auth/welcome");
      }
    }
  }, [isLoading, user, router]);

  useEffect(() => {
    const supabase = createClient();

    refresh();

    const { data: { subscription } } = supabase.auth.onAuthStateChange((event, session) => {
      if (event === "SIGNED_IN" || event === "TOKEN_REFRESHED") {
        setSession(session?.user ?? null);
        refresh();
      } else if (event === "SIGNED_OUT") {
        setSession(null);
        setUser(null);
        setLoading(false);
        router.push("/auth/login");
      }
    });

    return () => subscription.unsubscribe();
  }, [refresh, setSession, setUser, setLoading, router]);

  return (
    <AuthContext.Provider value={{ user, isLoading, isFirstTime, refresh }}>
      {children}
    </AuthContext.Provider>
  );
}
