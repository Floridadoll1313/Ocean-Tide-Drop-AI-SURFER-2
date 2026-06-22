export function deployPrimeUniverse(meta: any) {
  return {
    deployedUniverse: meta.selectedUniverse,
    action: "push_to_production",
    effect: "overwrite_previous_saas_version",
  };
}