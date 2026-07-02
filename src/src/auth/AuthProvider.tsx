import React, { createContext, useContext, useEffect, useState } from "react";

const AuthContext = createContext({
  user: null,
  loading: true
});

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let unsubscribe;

    async function initAuth() {
      try {
        const firebaseModule = await import("firebase/auth").catch(() => null);

        if (!firebaseModule) {
          console.warn("Firebase missing — fallback auth mode active");
          setLoading(false);
          return;
        }

        const { getAuth, onAuthStateChanged } = firebaseModule;
        const auth = getAuth();

        unsubscribe = onAuthStateChanged(auth, (currentUser) => {
          setUser(currentUser || null);
          setLoading(false);
        });
      } catch (err) {
        console.error("Auth init error:", err);
        setLoading(false);
      }
    }

    initAuth();

    return () => {
      if (unsubscribe) unsubscribe();
    };
  }, []);

  return (
    <AuthContext.Provider value={{ user, loading }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  return useContext(AuthContext);
}