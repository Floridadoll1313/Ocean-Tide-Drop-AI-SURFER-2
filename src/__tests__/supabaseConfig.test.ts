import { readFileSync } from "node:fs";
import { describe, expect, it } from "vitest";

describe("Supabase production configuration", () => {
  it("uses the connected AI Surfer project when deployment variables are absent", () => {
    const source = readFileSync(new URL("../lib/supabase.ts", import.meta.url), "utf8");

    expect(source).toContain("https://dbpoyuwgmfmrefxwzfnh.supabase.co");
    expect(source).toContain("sb_publishable_QEzJowvtsB5eRypf9FYUOA_csiTgKyU");
  });
});
