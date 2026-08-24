import { afterEach, describe, expect, it, vi } from "vitest";

afterEach(() => {
  vi.unstubAllEnvs();
  vi.resetModules();
});

describe("Supabase production configuration", () => {
  it("keeps the connected AI Surfer project when stale deployment variables are present", async () => {
    vi.stubEnv("VITE_SUPABASE_URL", "https://dbpoyuwgmfmrefxwzfnh.supabase.co");
    vi.stubEnv("VITE_SUPABASE_ANON_KEY", "stale-publishable-key");

    const { supabaseAnonKey, supabaseUrl } = await import("../lib/supabase");

    expect(supabaseUrl).toBe("https://mkgnyarwiscttobnytin.supabase.co");
    expect(supabaseAnonKey).toBe("sb_publishable_Jp0Laxs-KoieNMD5hqLA0w_jCnrxATm");
  });
});
