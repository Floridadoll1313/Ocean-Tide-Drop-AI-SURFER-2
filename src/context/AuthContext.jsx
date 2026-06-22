import { createContext, useContext, useEffect, useState } from "react";
import {
  onAuthStateChanged,
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  signOut,
} from "firebase/auth";
import { doc, getDoc, setDoc } from "firebase/firestore";

import { auth } from "../firebase";
import { db } from "../lib/firebase";

const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [userData, setUserData] = useState(null);
  const [loading, setLoading] = useState(true);

  /**
   * 🌊 LOAD USER + PROFILE (TIER SYSTEM)
   */
  useEffect(() => {
    const unsub = onAuthStateChanged(auth, async (firebaseUser) => {
      setUser(firebaseUser);

      if (!firebaseUser) {
        setUserData(null);
        setLoading(false);
        return;
      }

      const userRef = doc(db, "users", firebaseUser.uid);
      const snap = await getDoc(userRef);

      if (!snap.exists()) {
        // create default profile on first login
        const newUser = {
          uid: firebaseUser.uid,
          email: firebaseUser.email,
          tier: "free",
          subscription_status: "inactive",
          created_at: new Date().toISOString(),
        };

        await setDoc(userRef, newUser);
        setUserData(newUser);
      } else {
        setUserData(snap.data());
      }

      setLoading(false);
    });

    return () => unsub();
  }, []);

  /**
   * 🔑 AUTH
   */
  const login = (email, password) =>
    signInWithEmailAndPassword(auth, email, password);

  const signup = (email, password) =>
    createUserWithEmailAndPassword(auth, email, password);

  const logout = () => signOut(auth);

  return (
    <AuthContext.Provider
      value={{
        user,
        userData,
        loading,
        login,
        signup,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => useContext(AuthContext);