import { createExperiment } from "./autoExperimentRunner";
import { detectWinner } from "./winnerDetector";
import { triggerDeployment } from "./deployEngine";

export function GrowthOrchestrator(metrics: any) {
  const experiment = createExperiment();

  const result = detectWinner({
    variantA: Math.random() * 100,
    variantB: Math.random() * 100,
  });

  if (result.confidence > 0.7) {
    triggerDeployment(`Auto-deploy winner: ${result.winner}`);
  }

  return {
    experiment,
    decision: result,
    status: "autonomous_loop_active",
  };
}