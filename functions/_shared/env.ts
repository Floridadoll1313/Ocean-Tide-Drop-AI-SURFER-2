export type CrewEnv = {
  OPENAI_API_KEY: string;
  OPENAI_MODEL?: string;
  SUPABASE_URL: string;
  SUPABASE_ANON_KEY: string;
  RESEND_API_KEY?: string;
  FROM_EMAIL?: string;
};

const REQUIRED = [
  "OPENAI_API_KEY",
  "SUPABASE_URL",
  "SUPABASE_ANON_KEY",
] as const;

export function requireCrewEnv(env: CrewEnv): CrewEnv {
  const missing = REQUIRED.filter((key) => !env[key]?.trim());
  if (missing.length) {
    throw new Error(`Crew runtime configuration is incomplete: ${missing.join(", ")}`);
  }
  return env;
}
