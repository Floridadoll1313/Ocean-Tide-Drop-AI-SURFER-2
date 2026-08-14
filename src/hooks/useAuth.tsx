import { useEffect, useState } from "react";
import type { User } from "@supabase/supabase-js";
import { supabase } from "../lib/supabase";

export type UserData = {
  id: string;
  auth_id: string;
  email: string;
  name: string | null;
  tier: string;
  status: "active" | "cancelled" | "paused" | "trialing";
  stripe_customer_id: string | null;
  avatar_url: string | null;
  sand_dollars: number;
  missions_completed: number;
  joined_at: string;
  created_at: string;
  updated_at: string;
};

export function useAuth() {
  const [user, setUser] = useState<User | null>(null);
  const [userData, setUserData] = useState<UserData | null>(null);
  const [loading, setLoading] = useState(true);

  const loadUserProfile = async (currentUser: User | null) => {
    if (!currentUser) {
      setUserData(null);
      return;
    }

    try {
      /*
       * First look for the application user by Supabase Auth ID.
       *
       * auth.users.id !== public.users.id in your schema.
       * The connection is public.users.auth_id.
       */
      const { data: existingByAuthId, error: authIdError } =
        await supabase
          .from("users")
          .select("*")
          .eq("auth_id", currentUser.id)
          .maybeSingle();

      if (authIdError) {
        console.error(
          "Error loading user by auth_id:",
          authIdError
        );
      }

      if (existingByAuthId) {
        setUserData(existingByAuthId as UserData);
        return;
      }

      /*
       * If this account existed before auth_id was populated,
       * try matching the unique email address.
       */
      const email = currentUser.email ?? "";

      if (email) {
        const { data: existingByEmail, error: emailError } =
          await supabase
            .from("users")
            .select("*")
            .eq("email", email)
            .maybeSingle();

        if (emailError) {
          console.error(
            "Error loading user by email:",
            emailError
          );
        }

        if (existingByEmail) {
          const { data: updatedUser, error: updateError } =
            await supabase
              .from("users")
              .update({
                auth_id: currentUser.id,
                name:
                  existingByEmail.name ||
                  currentUser.user_metadata?.full_name ||
                  currentUser.user_metadata?.name ||
                  null,
                avatar_url:
                  existingByEmail.avatar_url ||
                  currentUser.user_metadata?.avatar_url ||
                  currentUser.user_metadata?.picture ||
                  null,
                updated_at: new Date().toISOString(),
              })
              .eq("id", existingByEmail.id)
              .select("*")
              .single();

          if (updateError) {
            console.error(
              "Error linking existing user to auth account:",
              updateError
            );

            setUserData(existingByEmail as UserData);
          } else {
            setUserData(updatedUser as UserData);
          }

          return;
        }
      }

      /*
       * Brand-new application user.
       *
       * The database default tier is used here.
       * We do NOT grant a paid tier merely because someone
       * created an account.
       */
      const newUser = {
        auth_id: currentUser.id,
        email,
        name:
          currentUser.user_metadata?.full_name ||
          currentUser.user_metadata?.name ||
          null,
        avatar_url:
          currentUser.user_metadata?.avatar_url ||
          currentUser.user_metadata?.picture ||
          null,
      };

      const { data: createdUser, error: createError } =
        await supabase
          .from("users")
          .insert(newUser)
          .select("*")
          .single();

      if (createError) {
        console.error(
          "Error creating application user:",
          createError
        );

        setUserData(null);
        return;
      }

      setUserData(createdUser as UserData);
    } catch (error) {
      console.error(
        "Unexpected error loading user profile:",
        error
      );

      setUserData(null);
    }
  };

  useEffect(() => {
    let mounted = true;

    const initializeAuth = async () => {
      try {
        const {
          data: { session },
          error,
        } = await supabase.auth.getSession();

        if (error) {
          console.error(
            "Supabase session error:",
            error
          );
        }

        if (!mounted) return;

        const currentUser = session?.user ?? null;

        setUser(currentUser);

        if (currentUser) {
          await loadUserProfile(currentUser);
        } else {
          setUserData(null);
        }
      } catch (error) {
        console.error(
          "Authentication initialization failed:",
          error
        );

        if (mounted) {
          setUser(null);
          setUserData(null);
        }
      } finally {
        if (mounted) {
          setLoading(false);
        }
      }
    };

    initializeAuth();

    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange(
      async (_event, session) => {
        if (!mounted) return;

        const currentUser = session?.user ?? null;

        setUser(currentUser);

        if (!currentUser) {
          setUserData(null);
          setLoading(false);
          return;
        }

        await loadUserProfile(currentUser);

        if (mounted) {
          setLoading(false);
        }
      }
    );

    return () => {
      mounted = false;
      subscription.unsubscribe();
    };
  }, []);

  const loginWithEmail = async (
    email: string,
    password: string
  ) => {
    const { data, error } =
      await supabase.auth.signInWithPassword({
        email: email.trim(),
        password,
      });

    if (error) {
      console.error(
        "Email login error:",
        error
      );

      throw error;
    }

    return data;
  };

  const signupWithEmail = async (
    email: string,
    password: string,
    name?: string
  ) => {
    const { data, error } =
      await supabase.auth.signUp({
        email: email.trim(),
        password,
        options: {
          data: {
            full_name: name?.trim() || "",
          },
        },
      });

    if (error) {
      console.error(
        "Email signup error:",
        error
      );

      throw error;
    }

    return data;
  };

  const loginWithGoogle = async () => {
    const { data, error } =
      await supabase.auth.signInWithOAuth({
        provider: "google",
        options: {
          redirectTo: `${window.location.origin}/members`,
        },
      });

    if (error) {
      console.error(
        "Google login error:",
        error
      );

      throw error;
    }

    return data;
  };

  const logout = async () => {
    const { error } =
      await supabase.auth.signOut();

    if (error) {
      console.error(
        "Logout error:",
        error
      );

      throw error;
    }

    setUser(null);
    setUserData(null);
  };

  return {
    user,
    userData,
    loading,
    loginWithEmail,
    signupWithEmail,
    loginWithGoogle,
    logout,
  };
}