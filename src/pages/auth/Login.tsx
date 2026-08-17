import { FormEvent, useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { supabase } from "../../lib/supabase";

export default function Login() {
  const navigate = useNavigate();
  const location = useLocation();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

  useEffect(() => {
    supabase.auth.getSession().then(({ data }) => {
      if (data.session) navigate("/members", { replace: true });
    });
  }, [navigate]);

  const submit = async (event: FormEvent) => {
    event.preventDefault();
    setLoading(true);
    setMessage("");
    const { error } = await supabase.auth.signInWithPassword({ email: email.trim(), password });
    setLoading(false);
    if (error) {
      setMessage(error.message);
      return;
    }
    const destination = (location.state as { from?: string } | null)?.from || "/members";
    navigate(destination, { replace: true });
  };

  return (
    <main style={styles.page}>
      <section style={styles.card}>
        <div style={styles.logo}>🌊</div>
        <p style={styles.kicker}>OCEAN TIDE DROP AI SURFER</p>
        <h1 style={styles.title}>Welcome back, Surfer.</h1>
        <p style={styles.copy}>Sign in to verify your membership and enter the AI-Surfer Members Dashboard.</p>
        <form onSubmit={submit} style={styles.form}>
          <label>Email<input type="email" autoComplete="email" required value={email} onChange={(e) => setEmail(e.target.value)} style={styles.input} /></label>
          <label>Password<input type="password" autoComplete="current-password" required value={password} onChange={(e) => setPassword(e.target.value)} style={styles.input} /></label>
          {message && <div role="alert" style={styles.error}>{message}</div>}
          <button disabled={loading} style={styles.button}>{loading ? "Checking your pass..." : "Enter Members Area 🏄‍♀️"}</button>
        </form>
        <button onClick={() => navigate("/")} style={styles.link}>Back to AI-Surfer</button>
      </section>
    </main>
  );
}

const styles: Record<string, React.CSSProperties> = {
  page: { minHeight: "100vh", display: "grid", placeItems: "center", padding: 24, background: "radial-gradient(circle at top, #123c5a, #050914 65%)", color: "#fff", fontFamily: "system-ui, sans-serif" },
  card: { width: "100%", maxWidth: 460, padding: 36, borderRadius: 24, background: "rgba(6,12,24,.92)", border: "1px solid rgba(0,242,254,.45)", boxShadow: "0 20px 80px rgba(0,0,0,.4)" },
  logo: { fontSize: 48, textAlign: "center" },
  kicker: { textAlign: "center", color: "#00f2fe", fontSize: 12, fontWeight: 800, letterSpacing: 2 },
  title: { textAlign: "center", fontSize: 32, margin: "12px 0" },
  copy: { textAlign: "center", color: "#cbd5e1", lineHeight: 1.6 },
  form: { display: "grid", gap: 18, marginTop: 28 },
  input: { display: "block", width: "100%", boxSizing: "border-box", marginTop: 7, padding: 13, borderRadius: 10, border: "1px solid #31506a", background: "#0b1524", color: "white" },
  error: { padding: 12, borderRadius: 10, background: "rgba(248,113,113,.12)", color: "#fca5a5", fontSize: 14 },
  button: { padding: 14, border: 0, borderRadius: 999, fontWeight: 800, cursor: "pointer", background: "linear-gradient(90deg,#00f2fe,#4facfe)", color: "#001018" },
  link: { display: "block", margin: "18px auto 0", border: 0, background: "transparent", color: "#93c5fd", cursor: "pointer" }
};
