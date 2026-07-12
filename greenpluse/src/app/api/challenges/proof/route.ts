import { NextResponse } from "next/server";
import { createClient } from "@/lib/supabase/server";
import { createAdminClient } from "@/lib/supabase/admin";

const CHALLENGE_PROOF_BUCKET = process.env.NEXT_PUBLIC_CHALLENGE_PROOF_BUCKET ?? "challenge-proofs";

export async function POST(request: Request) {
  try {
    const supabase = await createClient();
    const { data: auth } = await supabase.auth.getSession();
    const sessionUser = auth.session?.user;

    if (!sessionUser) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const formData = await request.formData();
    const challengeId = String(formData.get("challengeId") ?? "");
    const proof = formData.get("proof");

    if (!challengeId || !(proof instanceof File)) {
      return NextResponse.json({ error: "Challenge and proof image are required" }, { status: 400 });
    }

    const admin = createAdminClient();
    const fileExt = proof.name.split(".").pop()?.toLowerCase() || "jpg";
    const filePath = `${sessionUser.id}/${challengeId}-${Date.now()}.${fileExt}`;
    const arrayBuffer = await proof.arrayBuffer();

    const { error: uploadError } = await admin.storage
      .from(CHALLENGE_PROOF_BUCKET)
      .upload(filePath, Buffer.from(arrayBuffer), {
        contentType: proof.type || "image/jpeg",
        upsert: true,
      });

    if (uploadError) {
      throw new Error(
        uploadError.message.includes("Bucket not found")
          ? `Supabase bucket "${CHALLENGE_PROOF_BUCKET}" does not exist yet`
          : uploadError.message,
      );
    }

    const { data: publicUrlData } = admin.storage.from(CHALLENGE_PROOF_BUCKET).getPublicUrl(filePath);
    const { data: participation, error: participationError } = await admin
      .from("challenge_participations")
      .upsert({
        challenge_id: challengeId,
        employee_id: sessionUser.id,
        status: "pending",
        evidence_url: publicUrlData.publicUrl,
      }, { onConflict: "challenge_id,employee_id" })
      .select()
      .single();

    if (participationError) {
      throw participationError;
    }

    return NextResponse.json({ success: true, participation });
  } catch (error) {
    return NextResponse.json(
      { error: error instanceof Error ? error.message : "Failed to upload challenge proof" },
      { status: 500 },
    );
  }
}
