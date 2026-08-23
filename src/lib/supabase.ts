import { createClient } from "@supabase/supabase-js";

// Publishable Supabase credentials are safe to ship to the browser. Deployment
// variables can override these defaults without leaving the app unconfigured.
const supabaseUrl =
  import.meta.env.VITE_SUPABASE_URL ||
  "https://dbpoyuwgmfmrefxwzfnh.supabase.co";
const supabaseAnonKey =
  import.meta.env.VITE_SUPABASE_ANON_KEY ||
  "sb_publishable_QEzJowvtsB5eRypf9FYUOA_csiTgKyU";

export const supabase = createClient(
  supabaseUrl,
  supabaseAnonKey,
  {
    auth: {
      persistSession: true,
      autoRefreshToken: true,
      detectSessionInUrl: true,
    },
  }
);