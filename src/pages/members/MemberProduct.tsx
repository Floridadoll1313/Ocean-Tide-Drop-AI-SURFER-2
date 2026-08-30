import { useEffect, useMemo, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import { supabase } from "../../lib/supabase";
import { getImplementationOffer } from "./implementationOffer";

type Tier = "Starter Access" | "Innovator Tier" | "Console Tier" | "Full Takeover" | "Owner" | "Member";

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
  Owner: 5,
};

const products: Product[] = [
  { name: "AI Opportunity Report", icon: "📊", slug: "ai-opportunity-report", description: "Turn scattered AI possibilities into a prioritized list of the opportunities most likely to create measurable business value.", minimumTier: "Starter Access", nextStep: "Review your AI opportunities" },
  { name: "AEO Blueprint", icon: "🗺️", slug: "aeo-blueprint", description: "Build a practical roadmap for becoming more visible, understandable, and authoritative across AI-powered search and answer engines.", minimumTier: "Innovator Tier", nextStep: "Build your AEO roadmap" },
  { name: "Automation Blueprint", icon: "🏗️", slug: "automation-blueprint", description: "Map repetitive work into AI-powered workflows that reduce manual effort, connect your tools, and make operations more scalable.", minimumTier: "Innovator Tier", nextStep: "Map your automation roadmap" },
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
  const { user } = useAuth();
  const [tier, setTier] = useState<Tier>("Member");
  const [loading, setLoading] = useState(true);

  const product = useMemo(() => products.find((item) => item.slug === slug), [slug]);
  const implementationOffer = useMemo(() => getImplementationOffer(slug), [slug]);

  useEffect(() => {
    let active = true;

    if (!user) {
      return () => {
        active = false;
      };
    }

    if (user.app_metadata?.role === "owner") {
      setTier("Owner");
      setLoading(false);
      return () => {
        active = false;
      };
    }

    supabase
      .from("users")
      .select("tier")
      .eq("auth_id", user.id)
      .maybeSingle()
      .then(({ data: profile }) => {
        if (active) {
          setTier((profile?.tier as Tier) || "Member");
          setLoading(false);
        }
      });

    return () => {
      active = false;
    };
  }, [user]);

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
          <p style={styles.kicker}>MEMBERSHIP WORKSPACE</p>
          <h2>Unlock the ongoing {product.name} workspace with {product.minimumTier}.</h2>
          <p>Your current membership is <strong>{tier}</strong>. Membership controls ongoing workspace access, while implementation can be purchased separately below.</p>
          <button onClick={() => navigate("/pricing")} style={styles.cta}>View Membership Plans 💳</button>
        </section>
      )}

      {implementationOffer && (
        <section style={{ ...styles.card, ...styles.implementationCard }}>
          <p style={styles.implementationKicker}>READY TO IMPLEMENT?</p>
          <h2>Turn {product.name} into a working system for your business.</h2>
          {implementationOffer.kind === "checkout" ? (
            <>
              <p style={styles.copy}>AI Surfer will design and build the implementation around your business, workflows, and goals.</p>
              <p style={styles.price}>${implementationOffer.price.toLocaleString()} <span style={styles.priceNote}>one-time implementation</span></p>
              <a href={implementationOffer.checkoutUrl} target="_blank" rel="noopener noreferrer" style={{ ...styles.cta, ...styles.linkButton }}>
                {implementationOffer.cta} 🌊
              </a>
              <p style={styles.microcopy}>Secure checkout powered by Stripe.</p>
            </>
          ) : (
            <>
              <p style={styles.copy}>Big Kahuna is a high-touch strategy and implementation engagement, so we start with the right scope instead of forcing a one-size-fits-all checkout.</p>
              <button onClick={() => navigate(implementationOffer.path)} style={styles.cta}>{implementationOffer.cta} 🌊</button>
            </>
          )}
        </section>
      )}
    </PageShell>
  );
}

function PageShell({ children }: { children: React.ReactNode }) {
  return <main style={styles.page}><div style={styles.container}>{children}</div></main>;
}

const styles: Record<string, React.CSSProperties> = {
  page: { minHeight: "100vh", background: "transparent", color: "white", fontFamily: "system-ui, sans-serif" },
  container: { maxWidth: 900, margin: "0 auto", padding: "32px 20px 80px" },
  back: { background: "transparent", border: "1px solid #31506a", color: "#cbd5e1", borderRadius: 999, padding: "9px 16px", cursor: "pointer" },
  hero: { textAlign: "center", padding: "70px 20px 45px" },
  icon: { fontSize: 58 },
  kicker: { color: "#00f2fe", fontWeight: 800, letterSpacing: 2, fontSize: 13 },
  copy: { color: "#94a3b8", fontSize: 18, lineHeight: 1.6 },
  card: { maxWidth: 680, margin: "0 auto 24px", padding: 32, borderRadius: 24, background: "rgba(10,20,38,.9)", border: "1px solid rgba(0,242,254,.35)" },
  implementationCard: { border: "1px solid rgba(244,114,182,.45)", background: "linear-gradient(135deg,rgba(8,47,73,.94),rgba(76,29,149,.58),rgba(80,7,36,.58))", boxShadow: "0 24px 80px rgba(0,0,0,.35)" },
  implementationKicker: { color: "#f9a8d4", fontWeight: 900, letterSpacing: 2, fontSize: 13 },
  price: { color: "#67e8f9", fontSize: 38, fontWeight: 900, margin: "22px 0" },
  priceNote: { color: "#cbd5e1", fontSize: 14, fontWeight: 600 },
  cta: { border: 0, borderRadius: 999, padding: "13px 22px", fontWeight: 800, cursor: "pointer", background: "linear-gradient(90deg,#00f2fe,#4facfe,#f9a8d4)", color: "#001018" },
  linkButton: { display: "inline-block", textDecoration: "none" },
  microcopy: { color: "#94a3b8", fontSize: 12, marginTop: 12 },
};
