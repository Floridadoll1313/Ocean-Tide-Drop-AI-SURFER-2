import { supabase } from "../../lib/supabase";
import type { WaveAuditAnswers, WaveAuditResult } from "./types";

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
  }

  console.error("Wave Audit lead capture confirmation failed:", lastError);
  return {
    status: "uncertain",
    submissionId: payload.submissionId,
    message: "Your full report is unlocked below. We couldn't confirm the online save, so keep your receipt and try again later.",
  };
}
