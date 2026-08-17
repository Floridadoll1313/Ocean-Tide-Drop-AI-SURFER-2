import { FormEvent, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { supabase } from "../lib/supabase";

export default function Login() {
  const navigate = useNavigate();
  const location = useLocation();
  const from = (location.state as { from?: string } | null)?.from || "/members";
  const [mode, setMode] = useState<"signin" | "signup" | "reset">("signin");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const clear = () => { setMessage(""); setError(""); };

  const submit = async (e: FormEvent) => {
    e.preventDefault(); clear(); setLoading(true);
    try {
      if (mode === "reset") {
        const { error } = await supabase.auth.resetPasswordForEmail(email, { redirectTo: `${window.location.origin}/reset-password` });
        if (error) throw error;
        setMessage("Password reset instructions are on their way. Check your email.");
      } else if (mode === "signup") {
        const { data, error } = await supabase.auth.signUp({ email, password });
        if (error) throw error;
        setMessage(data.session ? "Account created. Taking you to AI-Surfer..." : "Account created! Check your email to confirm your account.");
        if (data.session) navigate(from, { replace: true });
      } else {
        const { error } = await supabase.auth.signInWithPassword({ email, password });
        if (error) throw error;
        navigate(from, { replace: true });
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : "Something went wrong. Please try again.");
    } finally { setLoading(false); }
  };

  const google = async () => {
    clear(); setLoading(true);
    const { error } = await supabase.auth.signInWithOAuth({ provider: "google", options: { redirectTo: `${window.location.origin}${from}` } });
    if (error) { setError(error.message); setLoading(false); }
  };

  return (
    <div style={styles.page}>
      <div style={styles.card}>
        <div style={styles.logo}>🌊🏄‍♀️</div>
        <h1 style={styles.title}>{mode === "signup" ? "Create Your AI-Surfer Account" : mode === "reset" ? "Reset Your Password" : "Welcome Back, Surfer"}</h1>
        <p style={styles.subtitle}>{mode === "signup" ? "Create your account and get ready to ride the AI wave." : mode === "reset" ? "Enter your email and we'll send you a secure reset link." : "Sign in to access your AI-Surfer experience."}</p>
        {mode !== "reset" && <button type="button" onClick={google} disabled={loading} style={styles.google}>🇬 <span>Continue with Google</span></button>}
        {mode !== "reset" && <div style={styles.divider}>or</div>}
        <form onSubmit={submit}>
          <label style={styles.label}>Email</label>
          <input style={styles.input} type="email" value={email} onChange={e => setEmail(e.target.value)} placeholder="you@example.com" required autoComplete="email" />
          {mode !== "reset" && <><label style={styles.label}>Password</label><input style={styles.input} type="password" value={password} onChange={e => setPassword(e.target.value)} placeholder="••••••••" required minLength={6} autoComplete={mode === "signup" ? "new-password" : "current-password"} /></>}
          {message && <div style={styles.success}>{message}</div>}
          {error && <div style={styles.error}>{error}</div>}
          <button type="submit" disabled={loading} style={styles.primary}>{loading ? "Please wait..." : mode === "signup" ? "Create Account 🚀" : mode === "reset" ? "Send Reset Link 🔑" : "Sign In 🏄‍♀️"}</button>
        </form>
        <div style={styles.links}>
          {mode === "signin" && <><button onClick={() => { clear(); setMode("signup"); }} style={styles.link}>Create Account</button><button onClick={() => { clear(); setMode("reset"); }} style={styles.link}>Forgot Password?</button></>}
          {mode === "signup" && <button onClick={() => { clear(); setMode("signin"); }} style={styles.link}>Already have an account? Sign in</button>}
          {mode === "reset" && <button onClick={() => { clear(); setMode("signin"); }} style={styles.link}>Back to Sign In</button>}
        </div>
      </div>
    </div>
  );
}

const styles: Record<string, React.CSSProperties> = {
  page:{minHeight:"100vh",display:"grid",placeItems:"center",padding:24,background:"radial-gradient(circle at top,#0d2440,#050914 60%)",color:"white",fontFamily:"system-ui,sans-serif"},
  card:{width:"100%",maxWidth:460,padding:36,borderRadius:28,background:"rgba(7,16,31,.96)",border:"1px solid rgba(0,242,254,.35)",boxShadow:"0 20px 70px rgba(0,0,0,.4)",textAlign:"center"},
  logo:{fontSize:44,marginBottom:8},title:{fontSize:28,margin:"0 0 8px"},subtitle:{color:"#94a3b8",margin:"0 0 24px"},google:{width:"100%",padding:13,borderRadius:10,border:"1px solid #475569",background:"#fff",color:"#111827",fontWeight:800,fontSize:15,cursor:"pointer",display:"flex",justifyContent:"center",gap:10},divider:{margin:"20px 0",color:"#64748b"},label:{display:"block",textAlign:"left",fontSize:13,color:"#cbd5e1",margin:"14px 0 6px"},input:{width:"100%",boxSizing:"border-box",padding:13,borderRadius:10,border:"1px solid #334155",background:"#0b172a",color:"white"},primary:{width:"100%",marginTop:20,padding:14,border:0,borderRadius:999,background:"linear-gradient(90deg,#00f2fe,#4facfe)",color:"#001018",fontWeight:900,cursor:"pointer"},links:{display:"flex",justifyContent:"center",gap:18,flexWrap:"wrap",marginTop:22},link:{border:0,background:"transparent",color:"#67e8f9",cursor:"pointer",fontWeight:700},success:{marginTop:16,padding:10,borderRadius:10,background:"rgba(34,197,94,.12)",color:"#86efac",fontSize:14},error:{marginTop:16,padding:10,borderRadius:10,background:"rgba(248,113,113,.12)",color:"#fca5a5",fontSize:14}
};
