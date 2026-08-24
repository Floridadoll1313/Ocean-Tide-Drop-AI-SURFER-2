import { createClient } from "@supabase/supabase-js";

// Publishable Supabase credentials are safe to ship to the browser. Deployment
// variables can override these defaults without leaving the app unconfigured.
export const supabaseUrl =
  import.meta.env.VITE_SUPABASE_URL ||
  "https://mkgnyarwiscttobnytin.supabase.co";
export const supabaseAnonKey =
  import.meta.env.VITE_SUPABASE_ANON_KEY ||
  "sb_publishable_Jp0Laxs-KoieNMD5hqLA0w_jCnrxATm";

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
