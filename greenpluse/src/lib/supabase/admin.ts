import { createClient } from "@supabase/supabase-js";

/**
 * Service-role Supabase client — SERVER-ONLY. Bypasses Row-Level Security.
 *
 * Only import this from server code (Server Actions / route handlers). The key
 * has no NEXT_PUBLIC_ prefix, so it is never bundled into client JS.
 *
 * Use this ONLY for trusted server-side operations that legitimately need to
 * run without a user session (e.g. provisioning an employee profile during
 * sign-up, before the user has confirmed their email / established a session).
 */
export function createAdminClient() {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const serviceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

  if (!url || !serviceRoleKey) {
    throw new Error(
      "Missing Supabase admin env vars. Set NEXT_PUBLIC_SUPABASE_URL and SUPABASE_SERVICE_ROLE_KEY in .env.local."
    );
  }

  return createClient(url, serviceRoleKey, {
    auth: {
      autoRefreshToken: false,
      persistSession: false,
    },
  });
}
