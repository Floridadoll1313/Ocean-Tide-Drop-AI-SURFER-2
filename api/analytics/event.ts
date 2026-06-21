import { createClient } from "@supabase/supabase-js";

const supabase = createClient(
  process.env.SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!
);

export default async function handler(req: any, res: any) {
  const { event, data, timestamp } = req.body;

  try {
    await supabase.from("analytics_events").insert([
      {
        event,
        data,
        timestamp,
      },
    ]);

    res.json({ ok: true });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "analytics failed" });
  }
}