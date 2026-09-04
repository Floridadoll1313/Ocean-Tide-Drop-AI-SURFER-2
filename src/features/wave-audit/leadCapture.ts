import type { WaveAuditAnswers, WaveAuditResult } from "./types";
import { supabase } from "../../lib/supabase";

export interface LeadCapturePayload {
  email: string;
  answers: WaveAuditAnswers;
  result: WaveAuditResult;
  source: "wave-audit";
  submissionId: string;
}

export type LeadCaptureOutcome =
  | { status: "saved"; submissionId: string }
  | { status: "uncertain"; submissionId: string; message: string };

export async function saveWaveAuditLead(
  payload: LeadCapturePayload,
): Promise<LeadCaptureOutcome> {
  const record = {
    submission_id: payload.submissionId,
    email: payload.email.trim().toLowerCase(),
    answers: payload.answers,
    score: payload.result.score,
    top_category: payload.result.topCategory,
    opportunities: payload.result.opportunities,
    recommended_agent: payload.result.recommendedAgent,
    confidence_label: payload.result.confidenceLabel,
    source: payload.source,
    report_version: 1,
  };

  let lastError: unknown;
  for (let attempt = 0; attempt < 2; attempt += 1) {
    try {
      const response = await fetch("/api/wave-check-submit", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(record),
      });

      if (response.ok) {
        const contentType = response.headers.get("Content-Type") || "";
        if (contentType.includes("application/json")) {
          const body = await response.json() as { status?: string; submissionId?: string };
          if (body.status === "saved") {
            return { status: "saved", submissionId: body.submissionId || payload.submissionId };
          }
        }
      }

      lastError = new Error(`Wave Check save returned HTTP ${response.status}`);
    } catch (error) {
      lastError = error;
    }
  }

  try {
    const { error } = await supabase
      .from("wave_audit_leads")
      .insert(record);

    if (!error || error.code === "23505") {
      return { status: "saved", submissionId: payload.submissionId };
    }
    lastError = error;
  } catch (error) {
    lastError = error;
  }

  console.error("Wave Audit lead capture confirmation failed:", lastError);
  return {
    status: "uncertain",
    submissionId: payload.submissionId,
    message: "We couldn't confirm the online save. Please try again so your Wave Check is not lost.",
  };
}
