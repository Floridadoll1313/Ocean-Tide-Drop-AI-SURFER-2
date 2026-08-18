export type AuditAgent =
  | "Wave Scout"
  | "Sales Rider"
  | "Content Creator"
  | "Customer Care Cove"
  | "Automation Architect"
  | "Big Kahuna";

export interface WaveAuditAnswers {
  businessType: string;
  teamSize: string;
  timeDrain: string;
  lostOpportunity: string;
  aiPriority: string;
}

export interface WaveAuditResult {
  score: number;
  topCategory: string;
  opportunities: string[];
  recommendedAgent: AuditAgent;
  confidenceLabel: string;
}