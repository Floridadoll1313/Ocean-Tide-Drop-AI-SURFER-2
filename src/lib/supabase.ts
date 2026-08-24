import { createClient } from "@supabase/supabase-js";

// Pin the browser client to the connected AI-Surfer project. The production
// host still has stale deployment variables from an older Supabase project,
// so allowing a build-time override would silently send member accounts to
// the wrong database again.
export const supabaseUrl = "https://mkgnyarwiscttobnytin.supabase.co";
export const supabaseAnonKey = "sb_publishable_Jp0Laxs-KoieNMD5hqLA0w_jCnrxATm";

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
