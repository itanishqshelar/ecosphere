import { createServerClient } from "@supabase/ssr";
import { NextResponse, type NextRequest } from "next/server";

export async function GET(request: NextRequest) {
  const { searchParams, origin } = new URL(request.url);
  const code = searchParams.get("code");
  const next = searchParams.get("next") ?? "/dashboard";

  if (code) {
    const supabase = createServerClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL!,
      process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
      {
        cookies: {
          getAll() { return request.cookies.getAll(); },
          setAll(cookiesToSet) {
            cookiesToSet.forEach(({ name, value }) => request.cookies.set(name, value));
          },
        },
      }
    );

    const { data, error } = await supabase.auth.exchangeCodeForSession(code);

    if (!error && data.user) {
      // Ensure employee profile exists
      await supabase.from("employees").upsert({
        id: data.user.id,
        name: data.user.user_metadata?.name ?? data.user.email!.split("@")[0],
        email: data.user.email!,
        role: "employee",
        xp: 0,
        avatar: data.user.user_metadata?.avatar_url ?? null,
        department_id: null,
      }, { onConflict: "id" });

      // Check if first time
      const { data: existing } = await supabase
        .from("carbon_transactions")
        .select("id", { count: "exact", head: true })
        .eq("created_by", data.user.id)
        .limit(1);

      const isFirstTime = !existing || existing.length === 0;

      return NextResponse.redirect(new URL(
        isFirstTime ? "/auth/welcome" : next,
        origin
      ));
    }
  }

  return NextResponse.redirect(new URL("/auth/login?error=auth_callback_error", origin));
}
