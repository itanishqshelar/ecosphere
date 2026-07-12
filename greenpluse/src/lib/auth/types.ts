import type { User } from "@supabase/supabase-js";

export interface AuthUser {
  id: string;
  email: string;
  name: string;
  avatar: string | null;
  role: "admin" | "esg_manager" | "employee";
  department_id: string | null;
  department_name?: string | null;
  xp: number;
  created_at: string;
}

export interface AuthState {
  user: AuthUser | null;
  session: User | null;
  isLoading: boolean;
  isFirstTime: boolean;
}

export interface AuthStore extends AuthState {
  setUser: (user: AuthUser | null) => void;
  setSession: (session: User | null) => void;
  setLoading: (loading: boolean) => void;
  setFirstTime: (firstTime: boolean) => void;
  reset: () => void;
}

export interface SignUpData {
  name: string;
  email: string;
  password: string;
}

export interface SignInData {
  email: string;
  password: string;
  remember?: boolean;
}

export interface AuthError {
  message: string;
  code?: string;
}

export type AuthResult =
  | { success: true; user?: AuthUser }
  | { success: false; error: AuthError };
