import { NextResponse } from "next/server";
import { createClient } from "@/lib/supabase/server";
import { createAdminClient } from "@/lib/supabase/admin";

export async function POST(request: Request) {
  try {
    const { transactionId, status } = await request.json();

    if (!transactionId || !["approved", "rejected"].includes(status)) {
      return NextResponse.json({ error: "Invalid request" }, { status: 400 });
    }

    const supabase = await createClient();
    const { data: auth } = await supabase.auth.getSession();
    const sessionUser = auth.session?.user;

    if (!sessionUser) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const { data: employee } = await supabase.from("employees").select("role").eq("id", sessionUser.id).single();
    if (employee?.role !== "admin") {
      return NextResponse.json({ error: "Only admins can approve carbon transactions" }, { status: 403 });
    }

    const admin = createAdminClient();
    const { error } = await admin.from("carbon_transactions").update({ status }).eq("id", transactionId);
    if (error) {
      throw error;
    }

    return NextResponse.json({ success: true });
  } catch (error) {
    return NextResponse.json(
      { error: error instanceof Error ? error.message : "Failed to update carbon transaction" },
      { status: 500 },
    );
  }
}
