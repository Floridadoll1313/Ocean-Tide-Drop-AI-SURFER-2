import { createServerClient, type CookieOptions } from "@supabase/ssr";
import { Request, Response } from "express";

/**
 * Creates a Supabase client for use in an Express server context,
 * handling cookies similarly to how @supabase/ssr does for Next.js.
 */
export function createSupabaseServerClient(req: Request, res: Response) {
  const supabaseUrl = process.env.VITE_SUPABASE_URL || "";
  const supabaseKey = process.env.VITE_SUPABASE_ANON_KEY || "";

  if (!supabaseUrl || !supabaseKey) {
    throw new Error("Supabase environment variables are missing");
  }

  return createServerClient(supabaseUrl, supabaseKey, {
    cookies: {
      getAll() {
        // Express cookie-parser populates req.cookies
        return Object.keys(req.cookies || {}).map((name) => ({
          name,
          value: req.cookies[name],
        }));
      },
      setAll(cookiesToSet) {
        cookiesToSet.forEach(({ name, value, options }) => {
          res.cookie(name, value, options as CookieOptions);
        });
      },
    },
  });
}
