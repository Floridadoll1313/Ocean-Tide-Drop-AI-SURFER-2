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
      <div className="min-h-screen bg-black text-white flex items-center justify-center">
        🌊 Booting AI Security Layer...
      </div>
    );
  }

  if (!user) {
    return (
      <div className="min-h-screen bg-black text-white flex items-center justify-center text-center px-6">
        <div>
          <h2 className="text-2xl font-bold">🔒 System Locked</h2>
          <p className="text-white/60 mt-2">
            This AI Operating System requires authentication to access revenue engines.
          </p>

          <a
            href="/login"
            className="mt-6 inline-block bg-cyan-500 text-black px-6 py-3 rounded-xl"
          >
            Authenticate
          </a>
        </div>
      </div>
    );
  }

  return children;
}
