import { useEffect, useState } from "react";
import { User } from "@supabase/supabase-js";
import { supabase } from "../lib/supabase";

type UserData = {
  id?: string;
  uid?: string;
  email: string;
  displayName?: string;
  photoURL?: string;
  role?: string;
  subscriptionStatus?: string;
  tier?: string;
};

export function useAuth() {
  const [user, setUser] = useState<User | null>(null);
  const [userData, setUserData] = useState<UserData | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let mounted = true;

    const loadUser = async () => {
      const {
        data: { session },
      } = await supabase.auth.getSession();

      const currentUser = session?.user ?? null;

      if (!mounted) return;

      setUser(currentUser);

      if (currentUser) {
        const { data, error } = await supabase
          .from("users")
          .select("*")
          .eq("id", currentUser.id)
          .single();

        if (!error && data) {
          setUserData(data);
        } else {
          const newUser: UserData = {
            uid: currentUser.id,
            email: currentUser.email || "",
            displayName:
              currentUser.user_metadata?.full_name || "",
            photoURL:
              currentUser.user_metadata?.avatar_url || "",
            role: "user",
            subscriptionStatus: "free",
            tier: "basic",
          };

          await supabase.from("users").insert(newUser);

          setUserData(newUser);
        }
      } else {
        setUserData(null);
      }

      setLoading(false);
    };

    loadUser();

    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange(async (_event, session) => {
      if (!mounted) return;

      const currentUser = session?.user ?? null;

      setUser(currentUser);

      if (!currentUser) {
        setUserData(null);
      }

      setLoading(false);
    });

    return () => {
      mounted = false;
      subscription.unsubscribe();
    };
  }, []);

  const loginWithGoogle = async () => {
    const { data, error } = await supabase.auth.signInWithOAuth({
      provider: "google",
    });

    if (error) {
      console.error("Google login error:", error);
      throw error;
    }

    return data;
  };

  const logout = async () => {
    await supabase.auth.signOut();
    setUser(null);
    setUserData(null);
  };

  return {
    user,
    userData,
    loading,
    loginWithGoogle,
    logout,
  };
}
