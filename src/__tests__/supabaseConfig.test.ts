import { readFileSync } from "node:fs";
import { describe, expect, it } from "vitest";

describe("Supabase production configuration", () => {
  it("uses the connected AI Surfer project when deployment variables are absent", () => {
    const source = readFileSync("src/lib/supabase.ts", "utf8");

    expect(source).toContain("https://mkgnyarwiscttobnytin.supabase.co");
    expect(source).toContain("sb_publishable_Jp0Laxs-KoieNMD5hqLA0w_jCnrxATm");
  });
});
