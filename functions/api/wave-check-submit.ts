const SUPABASE_URL = "https://mkgnyarwiscttobnytin.supabase.co";
const SUPABASE_ANON_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im1rZ255YXJ3aXNjdHRvYm55dGluIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzkyNDQwNTQsImV4cCI6MjA5NDgyMDA1NH0.eO2hcLQ4Qfq2_VkT74pMNnUG0uvPTmA__BuUOhLWFG0";

type WaveCheckSubmission = {
  submission_id: string;
  email: string;
  answers: Record<string, string>;
  score: number;
  top_category: string;
  opportunities: string[];
  recommended_agent: string;
  confidence_label: string;
  source: "wave-audit";
  report_version: number;
};

function json(body: unknown, status = 200) {
  return new Response(JSON.stringify(body), {
    status,
    headers: {
      "Content-Type": "application/json",
      "Cache-Control": "no-store",
    },
  });
}

function isUuid(value: unknown): value is string {
  return typeof value === "string" && /^[0-9a-f]{8}-[0-9a-f]{4}-[1-5][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i.test(value);
}

function isValidSubmission(value: unknown): value is WaveCheckSubmission {
  if (!value || typeof value !== "object") return false;
  const row = value as Partial<WaveCheckSubmission>;
  return Boolean(
    isUuid(row.submission_id) &&
    typeof row.email === "string" && row.email.trim().includes("@") &&
    row.answers && typeof row.answers === "object" &&
    Number.isInteger(row.score) && Number(row.score) >= 0 && Number(row.score) <= 100 &&
    typeof row.top_category === "string" && row.top_category.length > 0 &&
    Array.isArray(row.opportunities) &&
    typeof row.recommended_agent === "string" &&
    typeof row.confidence_label === "string" &&
    row.source === "wave-audit" &&
    row.report_version === 1
  );
}

export async function handleWaveCheckSubmit(request: Request): Promise<Response> {
  if (request.method !== "POST") return json({ error: "Method not allowed." }, 405);

  let submission: unknown;
  try {
    submission = await request.json();
  } catch {
    return json({ error: "Invalid JSON." }, 400);
  }

  if (!isValidSubmission(submission)) {
    return json({ error: "Invalid Wave Check submission." }, 400);
  }

  const normalized: WaveCheckSubmission = {
    ...submission,
    email: submission.email.trim().toLowerCase(),
  };

  try {
    const response = await fetch(`${SUPABASE_URL}/rest/v1/wave_audit_leads`, {
      method: "POST",
      headers: {
        apikey: SUPABASE_ANON_KEY,
        Authorization: `Bearer ${SUPABASE_ANON_KEY}`,
        "Content-Type": "application/json",
        Prefer: "return=minimal",
      },
      body: JSON.stringify(normalized),
    });

    if (!response.ok) {
      const detail = await response.text().catch(() => "");
      if (response.status === 409 && detail.includes("23505")) {
        return json({ status: "saved", submissionId: normalized.submission_id });
      }
      console.error("Wave Check Supabase save failed", response.status, detail.slice(0, 500));
      return json({ error: "Unable to confirm Wave Check save." }, 502);
    }

    return json({ status: "saved", submissionId: normalized.submission_id });
  } catch (error) {
    console.error("Wave Check same-origin save failed", error);
    return json({ error: "Unable to confirm Wave Check save." }, 502);
  }
}

export const onRequestPost: PagesFunction = async ({ request }) => handleWaveCheckSubmit(request);
