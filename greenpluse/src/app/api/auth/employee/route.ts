import { NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";

export async function POST(request: Request) {
  try {
    const body = await request.json();
    
    // We use the service role key to bypass RLS because employees cannot insert their own records
    // via the anon key due to the missing INSERT policy on the employees table.
    const supabase = createClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL!,
      process.env.SUPABASE_SERVICE_ROLE_KEY!
    );
    
    const { data, error } = await supabase
      .from("employees")
      .upsert(body, { onConflict: "id" })
      .select()
      .single();

    if (error) {
      console.error("Error creating employee:", error);
      return NextResponse.json({ error: error.message }, { status: 400 });
    }

    return NextResponse.json({ employee: data });
  } catch (error) {
    console.error("Internal error:", error);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}
