import { supabase } from "../lib/supabase";
import { sendWelcomeEmail } from "./email";
import { GoogleGenAI } from "@google/genai";

const ai = new GoogleGenAI({
  apiKey: process.env.GEMINI_API_KEY || "",
});

export async function onboardClient({
  userId,
  email,
  tier,
}: {
  userId: string;
  email: string;
  tier: string;
}) {
  console.log("🧠 AI onboarding started for:", email);

  // 1. Generate AI onboarding strategy
  const aiResponse = await ai.models.generateContent({
    model: "gemini-2.5-flash",
    contents: `
You are an AI onboarding strategist for a high-end AI agency.

Client Tier: ${tier}

Create:
1. A short welcome message (2-3 sentences)
2. A 3-step action plan for their success
3. A project name for their starter system

Keep it sharp, modern, high-frequency, business-focused.
Return JSON ONLY:
{
  "welcome": "",
  "projectName": "",
  "steps": ["", "", ""]
}
`,
  });

  let parsed;
  try {
    parsed = JSON.parse(aiResponse.text || "{}");
  } catch {
    parsed = {
      welcome: "Welcome to Ocean Tide Drop AI 🌊",
      projectName: "Starter AI System",
      steps: ["Setup dashboard", "Activate automations", "Launch system"],
    };
  }

  // 2. Create/Update client
  await supabase.from("clients").upsert({
    uid: userId,
    email,
    tier,
    status: "active",
    created_at: new Date(),
  });

  // 3. Create AI-generated project
  const { data: project } = await supabase
    .from("projects")
    .insert([
      {
        client_id: userId,
        name: parsed.projectName,
        status: "active",
      },
    ])
    .select()
    .single();

  // 4. Create AI-generated tasks
  const tasks = parsed.steps.map((step: string) => ({
    client_id: userId,
    project_id: project?.id,
    title: step,
    status: "pending",
  }));

  await supabase.from("tasks").insert(tasks);

  // 5. Send personalized AI email
  await sendWelcomeEmail({
    email,
    tier,
    name: parsed.welcome,
  });

  console.log("⚡ AI onboarding complete:", parsed);
}