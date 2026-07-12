import { getBadgesWithEarned } from "@/lib/db/gamification";
import { BadgesClient } from "./BadgesClient";

export default async function BadgesPage() {
  // Load for the first employee as demo (swap with auth user later)
  const { createClient } = await import("@/lib/supabase/server");
  const supabase = await createClient();
  const { data: emp } = await supabase.from("employees").select("id").eq("role","employee").order("xp",{ascending:false}).limit(1).single();
  const badges = await getBadgesWithEarned(emp?.id);
  return <BadgesClient badges={badges} />;
}
