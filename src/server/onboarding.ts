import { supabase } from "../lib/supabase";
import { sendWelcomeEmail } from "./email";

export async function onboardClient({
  userId,
  email,
  tier,
}: {
  userId: string;
  email: string;
  tier: string;
}) {
  // 1. Create client record
  await supabase.from("clients").upsert({
    uid: userId,
    email,
    tier,
    status: "active",
    created_at: new Date(),
  });

  // 2. Create starter project automatically
  await supabase.from("projects").insert([
    {
      client_id: userId,
      name: "AI System Setup",
      status: "active",
    },
  ]);

  // 3. Send welcome email
  await sendWelcomeEmail({
    email,
    tier,
  });

  console.log("🌊 Onboarding complete for:", email);
}