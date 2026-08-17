import { ReactNode, useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { supabase } from "../../lib/supabase";

export default function MemberGate({ children }: { children: ReactNode }) {
  const navigate = useNavigate();
  const location = useLocation();
  const [status, setStatus] = useState<"checking" | "allowed" | "denied">("checking");
  const [email, setEmail] = useState("");

  useEffect(() => {
    let active = true;
    const check = async () => {
      const { data: { session } } = await supabase.auth.getSession();
      if (!session) {
        if (active) setStatus("denied");
        navigate("/login", { replace: true, state: { from: location.pathname } });
        return;
      }
      if (active) setEmail(session.user.email ?? "");
      const { data, error } = await supabase.functions.invoke("member-access", {
        body: { user_id: session.user.id }
      });
      if (!active) return;
      if (error || !data?.allowed) {
        setStatus("denied");
        return;
      }
      setStatus("allowed");
    };
    check();
    const { data: listener } = supabase.auth.onAuthStateChange((_event, session) => {
      if (!session) navigate("/login", { replace: true, state: { from: location.pathname } });
    });
    return () => { active = false; listener.subscription.unsubscribe(); };
  }, [location.pathname, navigate]);

  if (status === "checking") return <div style={styles.center}>🌊 Verifying your membership...</div>;
  if (status === "denied") return (
    <div style={styles.center}>
      <div style={styles.card}>
        <div style={{ fontSize: 46 }}>🔐</div>
        <h1>Members only</h1>
        <p>Your account is not currently entitled to the Members Dashboard.</p>
        <button onClick={() => navigate("/pricing")} style={styles.button}>View Plans 💳</button>
        <button onClick={() => supabase.auth.signOut()} style={styles.link}>Sign out {email && `(${email})`}</button>
      </div>
    </div>
  );
  return <>{children}</>;
}

const styles: Record<string, React.CSSProperties> = {
  center: { minHeight: "100vh", display: "grid", placeItems: "center", padding: 24, background: "#050914", color: "white", fontFamily: "system-ui, sans-serif", textAlign: "center" },
  card: { maxWidth: 480, padding: 36, borderRadius: 24, background: "#0a1426", border: "1px solid rgba(0,242,254,.4)" },
  button: { padding: "13px 24px", border: 0, borderRadius: 999, fontWeight: 800, cursor: "pointer", background: "linear-gradient(90deg,#00f2fe,#4facfe)", color: "#001018" },
  link: { display: "block", margin: "18px auto 0", border: 0, background: "transparent", color: "#93c5fd", cursor: "pointer" }
};
