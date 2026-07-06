import { useEffect, useState } from "react";
import {
  onAuthStateChanged,
  signInWithPopup,
  signOut,
  User,
} from "firebase/auth";
import { doc, getDoc, setDoc } from "firebase/firestore";

import { auth, db, googleProvider } from "../lib/firebase";

type UserData = {
  uid: string;
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

  // 👤 AUTH LISTENER
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (firebaseUser) => {
      setUser(firebaseUser);

      if (firebaseUser) {
        const ref = doc(db, "users", firebaseUser.uid);
        const snap = await getDoc(ref);

        if (snap.exists()) {
          setUserData(snap.data() as UserData);
        } else {
          const newUser: UserData = {
            uid: firebaseUser.uid,
            email: firebaseUser.email || "",
            displayName: firebaseUser.displayName || "",
            photoURL: firebaseUser.photoURL || "",
            role: "user",
            subscriptionStatus: "free",
            tier: "basic",
          };

          await setDoc(ref, newUser);
          setUserData(newUser);
        }
      } else {
        setUserData(null);
      }

      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  // 🔑 LOGIN
  const loginWithGoogle = async () => {
    try {
      const result = await signInWithPopup(auth, googleProvider);
      return result.user;
    } catch (err) {
      console.error("Google login error:", err);
      throw err;
    }
  };

  // 🚪 LOGOUT
  const logout = async () => {
    await signOut(auth);
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
