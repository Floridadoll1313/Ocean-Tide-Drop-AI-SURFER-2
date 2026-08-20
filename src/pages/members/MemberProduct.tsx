import { useEffect, useMemo, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { supabase } from "../../lib/supabase";

type Tier = "Starter Access" | "Innovator Tier" | "Console Tier" | "Full Takeover" | "Member";

type Product = {
  name: string;
  icon: string;
  slug: string;
  description: string;
  minimumTier: Tier;
  nextStep: string;
};

const tierRank: Record<Tier, number> = {
  Member: 0,
  "Starter Access": 1,
  "Innovator Tier": 2,
  "Console Tier": 3,
  "Full Takeover": 4,
};

const products: Product[] = [
  { name: "Wave Scout", icon: "🔎", slug: "wave-scout", description: "Find AI opportunities, visibility gaps, and qualified leads.", minimumTier: "Starter Access", nextStep: "Start with your Wave Audit" },
  { name: "Sales Rider", icon: "💰", slug: "sales-rider", description: "Turn conversations into a repeatable AI-assisted sales system.", minimumTier: "Starter Access", nextStep: "Map your sales workflow" },
  { name: "Content Creator", icon: "✍️", slug: "content-creator", description: "Build an AI-powered content engine for consistent business growth.", minimumTier: "Innovator Tier", nextStep: "Build your content plan" },
  { name: "Customer Care Cove", icon: "💬", slug: "customer-care-cove", description: "Automate helpful customer support while keeping the human touch.", minimumTier: "Innovator Tier", nextStep: "Design your support flow" },
  { name: "Automation Architect", icon: "⚙️", slug: "automation-architect", description: "Connect the workflows that keep your business moving.", minimumTier: "Console Tier", nextStep: "Map your automation stack" },
  { name: "Big Kahuna", icon: "🐋", slug: "big-kahuna", description: "High-touch AI strategy and implementation for a full business transformation.", minimumTier: "Full Takeover", nextStep: "Book your strategy kickoff" },
];

export default function MemberProduct() {
  const { slug } = useParams();
  const navigate = useNavigate();
  const [tier, setTier] = useState<Tier>("Member");
  const [loading, setLoading] = useState(true);

  const product = useMemo(() => products.find((item) => item.slug === slug), [slug]);

  useEffect(() => {
    let active = true;
    supabase.auth.getUser().then(async ({ data }) => {
      if (!data.user) {
        navigate("/login", { replace: true });
        return;
      }
      const { data: profile } = await supabase.from("users").select("tier").eq("id", data.user.id).maybeSingle();
      if (active) {
        setTier((profile?.tier as Tier) || "Member");
        setLoading(false);
      }
    });
    return () => { active = false; };
  }, [navigate]);

  if (!product) {
    return <PageShell><h1>Product not found</h1><button onClick={() => navigate("/members")} style={styles.cta}>Back to Command Center</button></PageShell>;
  }

  if (loading) return <PageShell><p>🌊 Loading your product access...</p></PageShell>;

  const hasAccess = tierRank[tier] >= tierRank[product.minimumTier];

  return (
    <PageShell>
      <button onClick={() => navigate("/members")} style={styles.back}>← Command Center</button>
      <div style={styles.hero}>
        <div style={styles.icon}>{product.icon}</div>
        <p style={styles.kicker}>AI-SURFER PRODUCT</p>
        <h1>{product.name}</h1>
        <p style={styles.copy}>{product.description}</p>
      </div>
      {hasAccess ? (
        <section style={styles.card}>
          <p style={styles.kicker}>ACCESS CONFIRMED</p>
          <h2>Your {product.name} workspace is ready.</h2>
          <p>This product is connected to your <strong>{tier}</strong> membership. The next workflow layer can be connected here as the product is activated.</p>
          <button onClick={() => navigate("/wave-audit")} style={styles.cta}>{product.nextStep} →</button>
        </section>
      ) : (
        <section style={styles.card}>
          <p style={styles.kicker}>UPGRADE REQUIRED</p>
          <h2>Catch this wave with {product.minimumTier}.</h2>
          <p>Your current membership is <strong>{tier}</strong>. Upgrade your plan to unlock {product.name}.</p>
          <button onClick={() => navigate("/pricing")} style={styles.cta}>View Plans 💳</button>
        </section>
      )}
    </PageShell>
  );
}

function PageShell({ children }: { children: React.ReactNode }) {
  return <main style={styles.page}><div style={styles.container}>{children}</div></main>;
}

const styles: Record<string, React.CSSProperties> = {
  page: { minHeight: "100vh", background: "radial-gradient(circle at 10% 0%,#123b59,#050914 48%)", color: "white", fontFamily: "system-ui, sans-serif" },
  container: { maxWidth: 900, margin: "0 auto", padding: "32px 20px 80px" },
  back: { background: "transparent", border: "1px solid #31506a", color: "#cbd5e1", borderRadius: 999, padding: "9px 16px", cursor: "pointer" },
  hero: { textAlign: "center", padding: "70px 20px 45px" },
  icon: { fontSize: 58 },
  kicker: { color: "#00f2fe", fontWeight: 800, letterSpacing: 2, fontSize: 13 },
  copy: { color: "#94a3b8", fontSize: 18, lineHeight: 1.6 },
  card: { maxWidth: 680, margin: "0 auto", padding: 32, borderRadius: 24, background: "rgba(10,20,38,.9)", border: "1px solid rgba(0,242,254,.35)" },
  cta: { border: 0, borderRadius: 999, padding: "13px 22px", fontWeight: 800, cursor: "pointer", background: "linear-gradient(90deg,#00f2fe,#4facfe)", color: "#001018" },
};
