import React, {
  createContext,
  useContext,
  useEffect,
  useState,
  ReactNode,
} from "react";
import { User } from "@supabase/supabase-js";
import { supabase } from "../lib/supabaseClient";

/* -------------------------------------------------------
   TYPES
------------------------------------------------------- */
interface AuthContextType {
  user: User | null;
  loading: boolean;
  login: () => Promise<void>;
  logout: () => Promise<void>;
  isMember: boolean;
  isAdmin: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

/* -------------------------------------------------------
   PROVIDER
------------------------------------------------------- */
export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  /* -------------------------------------------------------
     INITIAL SESSION + LISTENER
  ------------------------------------------------------- */
  useEffect(() => {
    if (!supabase) {
      setLoading(false);
      return;
    }

    const getSession = async () => {
      const {
        data: { session },
      } = await supabase.auth.getSession();

      setUser(session?.user ?? null);
      setLoading(false);
    };

    getSession();

    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, session) => {
      setUser(session?.user ?? null);
    });

    return () => subscription.unsubscribe();
  }, []);

  /* -------------------------------------------------------
     LOGIN (Google OAuth)
  ------------------------------------------------------- */
  const login = async () => {
    if (!supabase) {
      console.error("Supabase not initialized. Check VITE_SUPABASE_URL and VITE_SUPABASE_ANON_KEY.");
      return;
    }
    await supabase.auth.signInWithOAuth({
      provider: "google",
      options: {
        redirectTo: window.location.origin + "/members",
      },
    });
  };

  /* -------------------------------------------------------
     LOGOUT
  ------------------------------------------------------- */
  const logout = async () => {
    if (!supabase) return;
    await supabase.auth.signOut();
    setUser(null);
  };

  /* -------------------------------------------------------
     ROLE FLAGS
  ------------------------------------------------------- */
  const isAdmin = user?.email === "shannon@oceantidedrop.com";
  const isMember = !!user;

  /* -------------------------------------------------------
     CONTEXT VALUE
  ------------------------------------------------------- */
  const value: AuthContextType = {
    user,
    loading,
    login,
    logout,
    isMember,
    isAdmin,
  };

  return (
    <AuthContext.Provider value={value}>
      {!loading && children}
    </AuthContext.Provider>
  );
};

/* -------------------------------------------------------
   HOOK
------------------------------------------------------- */
export const useAuth = () => {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error("useAuth must be used inside <AuthProvider>");
  return ctx;
};

export default AuthProvider;
