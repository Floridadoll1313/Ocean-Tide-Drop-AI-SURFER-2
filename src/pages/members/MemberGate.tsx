import { ReactNode, useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { supabase } from "../../lib/supabase";

export default function MemberGate({ children }: { children: ReactNode }) {
  const navigate = useNavigate();
  const location = useLocation();
  const [status, setStatus] = useState<"checking" | "allowed" | "denied">("checking");
  const [errorMessage, setErrorMessage] = useState("");

  useEffect(() => {
    let active = true;
    const check = async () => {
      const { data: { session }, error: sessionError } = await supabase.auth.getSession();
      if (sessionError || !session) {
        if (active) {
          setStatus("denied");
          setErrorMessage(sessionError?.message || "Please sign in to continue.");
        }
        navigate("/login", { replace: true, state: { from: location.pathname } });
        return;
      }

      const { data, error } = await supabase.functions.invoke("member-access-v2", {
        body: { user_id: session.user.id },
      });

      if (!active) return;
      if (error) {
        console.error("Member access check failed:", error);
        setStatus("denied");
        setErrorMessage(error.message || "We couldn't verify your membership. Please try again.");
        return;
      }
      if (!data?.allowed) {
        setStatus("denied");
        setErrorMessage("Your account does not currently have paid member access.");
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
        <p>{errorMessage}</p>
        <button onClick={() => navigate("/pricing")} style={styles.button}>View Plans 💳</button>
        <button onClick={() => navigate("/login")} style={styles.link}>Sign in</button>
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
