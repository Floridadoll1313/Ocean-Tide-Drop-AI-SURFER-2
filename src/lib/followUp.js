import { createClient } from "@supabase/supabase-js";
import { scoreLead } from "./leadBrain";

const supabase = createClient(
  import.meta.env.VITE_SUPABASE_URL,
  import.meta.env.VITE_SUPABASE_ANON_KEY
);

// 🌊 autonomous pipeline updater
export async function processLead(email, messages) {
  const analysis = await scoreLead(messages);

  await supabase.from("leads").update({
    status: analysis.status,
    value: analysis.estimated_value,
  }).eq("email", email);

  // 📩 fake automation hooks (replace later with email API)
  if (analysis.status === "hot" || analysis.status === "ready_to_buy") {
    console.log("🔥 SEND HIGH INTENT EMAIL TO:", email);
  }

  if (analysis.next_action === "book_call") {
    console.log("📅 PUSH CALENDLY REMINDER:", email);
  }

  return analysis;
}