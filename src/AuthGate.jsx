import { useEffect, useState } from "react";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "./firebase";

export default function AuthGate({ children }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsub = onAuthStateChanged(auth, (u) => {
      setUser(u);
      setLoading(false);
    });

    return () => unsub();
  }, []);

  if (loading) {
    return (
      <div style={{ padding: 40 }}>
        🌊 Loading Ocean Tide Access...
      </div>
    );
  }

  if (!user) {
    return (
      <div style={{ padding: 40 }}>
        <h2>🔒 Members Only</h2>
        <p>Please log in to continue.</p>
      </div>
    );
  }

  return children;
}
