import { createClient } from "@supabase/supabase-js";

const supabase = createClient(
  import.meta.env.VITE_SUPABASE_URL,
  import.meta.env.VITE_SUPABASE_ANON_KEY
);

export async function testSupabase() {
  const { data, error } = await supabase.from("leads").select("*");
  console.log("SUPABASE TEST:", data, error);
}