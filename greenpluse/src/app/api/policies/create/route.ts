import { NextResponse } from "next/server";
import { createClient } from "@/lib/supabase/server";
import { createAdminClient } from "@/lib/supabase/admin";

export async function POST(request: Request) {
  try {
    const { title, scope, content } = await request.json();

    if (!title || !scope || !content) {
      return NextResponse.json(
        { error: "Title, scope, and content are required" },
        { status: 400 }
      );
    }

    const supabase = await createClient();
    const { data: { session } } = await supabase.auth.getSession();

    if (!session) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const { data: employee } = await supabase
      .from("employees")
      .select("role")
      .eq("id", session.user.id)
      .single();

    if (employee?.role !== "admin") {
      return NextResponse.json(
        { error: "Only admins can create policies" },
        { status: 403 }
      );
    }

    const admin = createAdminClient();
    const { data: policy, error } = await admin
      .from("policies")
      .insert({
        title,
        description: `[Scope: ${scope}]\n\n${content}`,
        status: "active",
        version: "1.0",
        effective_date: new Date().toISOString().split("T")[0],
      })
      .select()
      .single();

    if (error) {
      console.error("Policy insert error:", error);
      throw error;
    }

    const webhookUrl =
      process.env.N8N_WEBHOOK_URL ??
      "https://n8n.rookiesn8n.me/webhook/b3a19f86-66cb-4b82-8049-866f67852f73";

    fetch(webhookUrl, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        policyTitle: title,
        policyScope: scope,
        action: "policy_created",
      }),
    }).catch(() => {});

    return NextResponse.json({ success: true, policy });
  } catch (error) {
    return NextResponse.json(
      {
        error:
          error instanceof Error ? error.message : "Failed to create policy",
      },
      { status: 500 }
    );
  }
}
