// @ts-nocheck
import { Workflow } from "@cloudflare/workflows";
import { validateStripe } from "./steps/validateStripe";
import { enrichCustomer } from "./steps/enrichCustomer";
import { assignSurfboardTier } from "./steps/assignSurfboardTier";
import { saveToD1 } from "./steps/saveToD1";
import { sendWelcomeEmail } from "./steps/sendWelcomeEmail";
import { finalize } from "./steps/finalize";

export default Workflow("surferPipeline", (wf, env) => {
  const payload = wf.input();

  const stripeData = wf.step("Validate Stripe Event", () =>
    validateStripe(payload, env)
  );

  const customer = wf.step("Enrich Customer", () =>
    enrichCustomer(stripeData, env)
  );

  const tier = wf.step("Assign Surfboard Tier", () =>
    assignSurfboardTier(customer, env)
  );

  const saved = wf.step("Save to D1", () =>
    saveToD1({ customer, tier }, env)
  );

  wf.step("Send Welcome Email", () =>
    sendWelcomeEmail({ customer, tier }, env)
  );

  return wf.step("Finalize", () =>
    finalize({ customer, tier, saved }, env)
  );
});
