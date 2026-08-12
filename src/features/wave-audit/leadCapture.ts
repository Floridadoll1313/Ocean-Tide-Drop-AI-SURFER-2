import { supabase } from "../../lib/supabase";
import type { WaveAuditAnswers, WaveAuditResult } from "./types";

export interface LeadCapturePayload {
  email: string;
  answers: WaveAuditAnswers;
  result: WaveAuditResult;
  source: "wave-audit";
}

export async function saveWaveAuditLead(
  payload: LeadCapturePayload,
): Promise<{ ok: true } | { ok: false; message: string }> {
  try {
    const { error } = await supabase.from("wave_audit_leads").insert({
      email: payload.email.trim().toLowerCase(),
      answers: payload.answers,
      score: payload.result.score,
      top_category: payload.result.topCategory,
      opportunities: payload.result.opportunities,
      recommended_agent: payload.result.recommendedAgent,
      confidence_label: payload.result.confidenceLabel,
      source: payload.source,
    });

    if (error) {
      return {
        ok: false,
        message: "We couldn't save your report yet. Your results are still safe here. Please try again.",
      };
    }

    return { ok: true };
  } catch (error) {
    console.error("Wave Audit lead capture failed:", error);
    return {
      ok: false,
      message: "We couldn't save your report yet. Your results are still safe here. Please try again.",
    };
  }
}
