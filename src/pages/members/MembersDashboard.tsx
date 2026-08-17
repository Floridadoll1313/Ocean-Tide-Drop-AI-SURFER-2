import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "../../lib/supabase";

const products = [
  ["🔎", "Wave Scout", "Find AI opportunities and qualified leads."],
  ["💰", "Sales Rider", "Turn conversations into a repeatable sales system."],
  ["✍️", "Content Creator", "Build an AI-powered content engine."],
  ["💬", "Customer Care Cove", "Automate helpful customer support."],
  ["⚙️", "Automation Architect", "Connect the workflows that keep business moving."],
  ["🐋", "Big Kahuna", "High-touch AI strategy and implementation."],
];

export default function MembersDashboard() {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [tier, setTier] = useState("Member");

  useEffect(() => {
    supabase.auth.getUser().then(async ({ data }) => {
      const user = data.user;
      if (!user) return;
      setEmail(user.email ?? "");
      const { data: profile } = await supabase.from("users").select("tier").eq("id", user.id).maybeSingle();
      if (profile?.tier) setTier(profile.tier);
    });
  }, []);

  const signOut = async () => {
    await supabase.auth.signOut();
    navigate("/", { replace: true });
  };

  return (
    <main style={styles.page}>
      <header style={styles.header}>
        <div><div style={styles.brand}>🌊 AI-SURFER</div><div style={styles.sub}>Members Command Center</div></div>
        <button onClick={signOut} style={styles.signOut}>Sign out</button>
      </header>
      <section style={styles.hero}>
        <div>
          <p style={styles.kicker}>YOU'RE IN THE WATER 🏄‍♀️</p>
          <h1>Welcome to your AI-Surfer Dashboard.</h1>
          <p style={styles.copy}>{email || "Member"} · <strong>{tier}</strong></p>
        </div>
        <div style={styles.audit}><div style={{ fontSize: 34 }}>🌺</div><strong>Start with your AI Wave Audit</strong><p>Discover where AI can create the biggest business impact.</p><button onClick={() => navigate("/audit")} style={styles.cta}>Launch Wave Audit</button></div>
      </section>
      <section><h2>Your AI Surfer Products</h2><div style={styles.grid}>{products.map(([icon, name, text]) => <button key={name} onClick={() => {}} style={styles.product}><span style={{ fontSize: 30 }}>{icon}</span><strong>{name}</strong><span>{text}</span><small>Open product →</small></button>)}</div></section>
    </main>
  );
}

const styles: Record<string, React.CSSProperties> = {
  page: { minHeight: "100vh", padding: "24px clamp(18px,5vw,70px) 70px", background: "radial-gradient(circle at 10% 0%,#123b59,#050914 48%)", color: "white", fontFamily: "system-ui, sans-serif" },
  header: { maxWidth: 1200, margin: "0 auto", display: "flex", justifyContent: "space-between", alignItems: "center", paddingBottom: 30 },
  brand: { fontWeight: 900, letterSpacing: 2, color: "#00f2fe" },
  sub: { color: "#94a3b8", fontSize: 13 },
  signOut: { background: "transparent", border: "1px solid #31506a", color: "#cbd5e1", borderRadius: 999, padding: "9px 16px", cursor: "pointer" },
  hero: { maxWidth: 1200, margin: "0 auto 45px", display: "grid", gridTemplateColumns: "1.5fr 1fr", gap: 28, alignItems: "stretch" },
  kicker: { color: "#00f2fe", fontWeight: 800, letterSpacing: 2, fontSize: 13 },
  copy: { color: "#94a3b8" },
  audit: { padding: 28, borderRadius: 22, background: "rgba(10,20,38,.85)", border: "1px solid rgba(0,242,254,.35)" },
  cta: { border: 0, borderRadius: 999, padding: "12px 18px", fontWeight: 800, cursor: "pointer", background: "linear-gradient(90deg,#00f2fe,#4facfe)" },
  grid: { maxWidth: 1200, margin: "20px auto 0", display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(220px,1fr))", gap: 18 },
  product: { minHeight: 180, textAlign: "left", display: "grid", gap: 9, padding: 22, borderRadius: 20, border: "1px solid #203a52", background: "rgba(10,20,38,.8)", color: "#fff", cursor: "pointer" }
};
