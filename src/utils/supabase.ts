import { createBrowserClient, createServerClient, type CookieOptions } from "@supabase/ssr";
import { createClient as createSupabaseClient } from "@supabase/supabase-js";
import type { Request, Response } from "express";

const supabaseUrl = import.meta.env?.VITE_SUPABASE_URL || process.env.VITE_SUPABASE_URL;
const supabaseKey = import.meta.env?.VITE_SUPABASE_PUBLISHABLE_KEY || process.env.VITE_SUPABASE_PUBLISHABLE_KEY;

/**
 * Client-side Supabase client for use in React components
 */
export const supabase = createBrowserClient(supabaseUrl!, supabaseKey!);

/**
 * Standard Supabase client
 */
export const createClient = () => {
  return createSupabaseClient(supabaseUrl!, supabaseKey!);
};

/**
 * Server-side Supabase client for Express
 */
export const createServerSupabaseClient = (req: Request, res: Response) => {
  return createServerClient(
    supabaseUrl!,
    supabaseKey!,
    {
      cookies: {
        getAll() {
          return Object.keys(req.cookies).map((name) => ({ name, value: req.cookies[name] }));
        },
        setAll(cookiesToSet) {
          cookiesToSet.forEach(({ name, value, options }) => {
            res.cookie(name, value, options as CookieOptions);
          });
        },
      },
    }
  );
};
