"use server";

import { createClient } from "@/lib/supabase/server";
import { createAdminClient } from "@/lib/supabase/admin";
import { redirect } from "next/navigation";

function getBaseUrl() {
  if (process.env.NEXT_PUBLIC_SITE_URL) return process.env.NEXT_PUBLIC_SITE_URL;
  if (process.env.VERCEL_URL) return `https://${process.env.VERCEL_URL}`;
  return "http://localhost:3000";
}

export async function signUp(formData: FormData) {
  const name = formData.get("name") as string;
  const email = formData.get("email") as string;
  const password = formData.get("password") as string;

  const supabase = await createClient();

  const { data: authData, error: signUpError } = await supabase.auth.signUp({
    email,
    password,
    options: {
      data: { name },
      emailRedirectTo: `${getBaseUrl()}/auth/callback`,
    },
  });

  if (signUpError) {
    return { success: false as const, error: { message: signUpError.message, code: signUpError.code } };
  }

  if (!authData.user) {
    return { success: false as const, error: { message: "Failed to create account" } };
  }

  // When email confirmation is enabled, signUp() returns no session, so the
  // user is not yet authenticated and can't satisfy the employees RLS policy.
  // Provision the profile with the service-role client (bypasses RLS) — this
  // is a trusted server-side step keyed to the just-created auth user's id.
  const admin = createAdminClient();
  const { error: profileError } = await admin.from("employees").upsert({
    id: authData.user.id,
    name,
    email,
    role: "employee",
    xp: 0,
    avatar: null,
    department_id: null,
  }, { onConflict: "id" });

  if (profileError) {
    return { success: false as const, error: { message: profileError.message } };
  }

  return { success: true as const };
}

export async function signIn(formData: FormData) {
  const email = formData.get("email") as string;
  const password = formData.get("password") as string;

  const supabase = await createClient();

  const { data, error } = await supabase.auth.signInWithPassword({
    email,
    password,
  });

  if (error) {
    return { success: false as const, error: { message: error.message, code: error.code } };
  }

  if (!data.user) {
    return { success: false as const, error: { message: "No user found" } };
  }

  const { data: employee } = await supabase
    .from("employees")
    .select("*, department:departments(name)")
    .eq("id", data.user.id)
    .single();

  return {
    success: true as const,
    user: employee ? {
      id: employee.id,
      email: employee.email,
      name: employee.name,
      avatar: employee.avatar,
      role: employee.role,
      department_id: employee.department_id,
      department_name: employee.department?.name ?? null,
      xp: employee.xp,
      created_at: employee.created_at,
    } : undefined,
  };
}

export async function signInWithGoogle() {
  const supabase = await createClient();

  const { data, error } = await supabase.auth.signInWithOAuth({
    provider: "google",
    options: {
      redirectTo: `${getBaseUrl()}/auth/callback`,
      queryParams: {
        access_type: "offline",
        prompt: "consent",
      },
    },
  });

  if (error) {
    return { success: false as const, error: { message: error.message } };
  }

  if (data.url) {
    redirect(data.url);
  }

  return { success: false as const, error: { message: "Failed to initialize Google sign in" } };
}

export async function signOut() {
  const supabase = await createClient();
  const { error } = await supabase.auth.signOut();
  if (error) return { success: false as const, error: { message: error.message } };
  redirect("/auth/login");
}

export async function forgotPassword(formData: FormData) {
  const email = formData.get("email") as string;
  const supabase = await createClient();

  const { error } = await supabase.auth.resetPasswordForEmail(email, {
    redirectTo: `${getBaseUrl()}/auth/reset-password`,
  });

  if (error) {
    return { success: false as const, error: { message: error.message } };
  }

  return { success: true as const };
}

export async function resetPassword(formData: FormData) {
  const password = formData.get("password") as string;
  const supabase = await createClient();

  const { error } = await supabase.auth.updateUser({ password });

  if (error) {
    return { success: false as const, error: { message: error.message } };
  }

  return { success: true as const };
}

export async function resendVerification(formData: FormData) {
  const email = formData.get("email") as string;
  const supabase = await createClient();

  const { error } = await supabase.auth.resend({
    type: "signup",
    email,
    options: { emailRedirectTo: `${getBaseUrl()}/auth/callback` },
  });

  if (error) {
    return { success: false as const, error: { message: error.message } };
  }

  return { success: true as const };
}

export async function getSession() {
  const supabase = await createClient();
  const { data: { session }, error } = await supabase.auth.getSession();

  if (error || !session) {
    return { session: null, user: null };
  }

  const { data: employee } = await supabase
    .from("employees")
    .select("*, department:departments(name)")
    .eq("id", session.user.id)
    .single();

  return {
    session,
    user: employee ? {
      id: employee.id,
      email: employee.email,
      name: employee.name,
      avatar: employee.avatar,
      role: employee.role,
      department_id: employee.department_id,
      department_name: employee.department?.name ?? null,
      xp: employee.xp,
      created_at: employee.created_at,
    } : {
      id: session.user.id,
      email: session.user.email!,
      name: session.user.user_metadata?.name ?? session.user.email!.split("@")[0],
      avatar: session.user.user_metadata?.avatar_url ?? null,
      role: "employee" as const,
      department_id: null,
      xp: 0,
      created_at: session.user.created_at,
    },
  };
}

export async function ensureEmployeeProfile() {
  const supabase = await createClient();
  const { data: { session } } = await supabase.auth.getSession();

  if (!session?.user) return null;

  const { data: existing } = await supabase
    .from("employees")
    .select("id")
    .eq("id", session.user.id)
    .single();

  if (existing) return existing;

  const { data: newEmployee, error } = await supabase
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

  if (error) return null;
  return newEmployee;
}
