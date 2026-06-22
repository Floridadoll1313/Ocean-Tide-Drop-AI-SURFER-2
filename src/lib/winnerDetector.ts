export function detectWinner(results: {
  variantA: number;
  variantB: number;
}) {
  const winner =
    results.variantA > results.variantB ? "A" : "B";

  const confidence =
    Math.max(results.variantA, results.variantB) /
    (results.variantA + results.variantB);

  return {
    winner,
    confidence,
  };
}