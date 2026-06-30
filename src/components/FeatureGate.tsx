import AuthGate from "./AuthGate";
import FeatureGate from "./FeatureGate";
import FreeBaselineModules from "./FreeBaselineModules";
import PremiumToolCanvas from "./PremiumToolCanvas";
import VelocityDropUpsell from "./VelocityDropUpsell";

export default function DashboardPage() {
  return (
    <AuthGate>
      {/* Everything inside here requires a logged-in user */}
      <div style={{ backgroundColor: "#0A0E1A", minHeight: "100vh", color: "#fff", padding: 24 }}>
        
        <h1>AI Surfer Dashboard</h1>

        {/* 1. FREE SECTION (Visible to any logged-in user) */}
        <section style={{ marginBottom: 40 }}>
          <h2>Baseline Tools</h2>
          <FreeBaselineModules />
        </section>

        {/* 2. STRIPE WALLED SECTION (Only visible to paid members) */}
        <section>
          <FeatureGate fallback={<VelocityDropUpsell tier1="$249" tier2="$349" />}>
            <PremiumToolCanvas />
          </FeatureGate>
        </section>

      </div>
    </AuthGate>
  );
}
