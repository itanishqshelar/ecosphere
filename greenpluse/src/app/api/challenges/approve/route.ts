import { NextResponse } from "next/server";
import { createClient } from "@/lib/supabase/server";
import { createAdminClient } from "@/lib/supabase/admin";

export async function POST(request: Request) {
  try {
    const { participationId, status } = await request.json();

    if (!participationId || !["approved", "rejected"].includes(status)) {
      return NextResponse.json({ error: "Invalid request" }, { status: 400 });
    }

    const supabase = await createClient();
    const { data: auth } = await supabase.auth.getSession();
    const sessionUser = auth.session?.user;

    if (!sessionUser) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const { data: adminEmployee } = await supabase.from("employees").select("role").eq("id", sessionUser.id).single();
    if (adminEmployee?.role !== "admin") {
      return NextResponse.json({ error: "Only admins can review challenge proofs" }, { status: 403 });
    }

    const admin = createAdminClient();
    const { data: participation, error: loadError } = await admin
      .from("challenge_participations")
      .select("id, challenge_id, employee_id, status")
      .eq("id", participationId)
      .single();

    if (loadError || !participation) {
      return NextResponse.json({ error: "Challenge participation not found" }, { status: 404 });
    }

    if (status === "approved") {
      const { data: challenge, error: challengeError } = await admin
        .from("challenges")
        .select("id, xp")
        .eq("id", participation.challenge_id)
        .single();

      if (challengeError || !challenge) {
        return NextResponse.json({ error: "Challenge not found" }, { status: 404 });
      }

      if (participation.status !== "completed") {
        const { data: employee, error: employeeError } = await admin
          .from("employees")
          .select("xp")
          .eq("id", participation.employee_id)
          .single();

        if (employeeError || !employee) {
          return NextResponse.json({ error: "Employee not found" }, { status: 404 });
        }

        const { error: xpError } = await admin
          .from("employees")
          .update({ xp: (employee.xp ?? 0) + (challenge.xp ?? 0) })
          .eq("id", participation.employee_id);

        if (xpError) {
          throw xpError;
        }
      }

      const { error: updateError } = await admin
        .from("challenge_participations")
        .update({ status: "completed" })
        .eq("id", participationId);

      if (updateError) {
        throw updateError;
      }

      return NextResponse.json({ success: true, challengeId: participation.challenge_id });
    }

    const { error: rejectError } = await admin
      .from("challenge_participations")
      .update({ status: "rejected" })
      .eq("id", participationId);

    if (rejectError) {
      throw rejectError;
    }

    return NextResponse.json({ success: true, challengeId: participation.challenge_id });
  } catch (error) {
    return NextResponse.json(
      { error: error instanceof Error ? error.message : "Failed to review challenge proof" },
      { status: 500 },
    );
  }
}
