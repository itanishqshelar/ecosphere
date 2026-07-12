import { createServerClient } from "@supabase/ssr";
import { NextResponse, type NextRequest } from "next/server";

export async function GET(request: NextRequest) {
  const { searchParams, origin } = new URL(request.url);
  const code = searchParams.get("code");
  const next = searchParams.get("next") ?? "/dashboard";

  if (!code) {
    return NextResponse.redirect(new URL("/auth/login?error=auth_callback_error", origin));
  }

  // The success response. Session cookies MUST be written onto THIS object so
  // the browser actually receives them. The previous implementation wrote them
  // to request.cookies (an in-memory copy that is discarded), so the browser
  // never got a session and the middleware bounced the user back to /auth.
  const response = NextResponse.redirect(new URL(next, origin));

  const supabase = createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        getAll() {
          return request.cookies.getAll();
        },
        setAll(cookiesToSet) {
          cookiesToSet.forEach(({ name, value, options }) => {
            // Keep the request copy in sync for any later reads in this handler…
            request.cookies.set(name, value);
            // …and, crucially, set the cookie on the outgoing response.
            response.cookies.set(name, value, options);
          });
        },
      },
    }
  );

  const { data, error } = await supabase.auth.exchangeCodeForSession(code);

  if (error || !data.user) {
    return NextResponse.redirect(new URL("/auth/login?error=auth_callback_error", origin));
  }

  const adminEmails = ["tanishq.shelar365@gmail.com", "kundarvinayak2004@gmail.com"];
  const email = data.user.email!.toLowerCase();
  const assignedRole = adminEmails.includes(email) ? "admin" : "employee";

  const { data: existing } = await supabase.from("employees").select("id").eq("email", email).single();

  if (existing) {
    await supabase.from("employees").update({ id: data.user.id, role: assignedRole }).eq("email", email);
  } else {
    await supabase.from("employees").insert({
      id: data.user.id,
      name: data.user.user_metadata?.name ?? email.split("@")[0],
      email: email,
      role: assignedRole,
      xp: 0,
      avatar: data.user.user_metadata?.avatar_url ?? null,
      department_id: null,
    });
  }

  // Redirect to the dashboard with the session cookies attached. First-time
  // welcome handling lives in AuthProvider (localStorage), same as the
  // email/password flow.
  return response;
}
