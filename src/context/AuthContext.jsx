import { createContext, useContext, useEffect, useState } from "react";
import {
onAuthStateChanged,
signInWithEmailAndPassword,
createUserWithEmailAndPassword,
signOut,
} from "firebase/auth";
import { doc, getDoc } from "firebase/firestore";

import { auth } from "../firebase";
import { db } from "../lib/firebase";

const AuthContext = createContext();

export function AuthProvider({ children }) {
const [user, setUser] = useState(null);
const [userData, setUserData] = useState(null);
const [loading, setLoading] = useState(true);

useEffect(() => {
const unsub = onAuthStateChanged(auth, async (firebaseUser) => {
setUser(firebaseUser);

  if (firebaseUser) {
    try {
      const userRef = doc(db, "users", firebaseUser.uid);
      const snap = await getDoc(userRef);

      if (snap.exists()) {
        setUserData(snap.data());
      } else {
        setUserData({
          tier: "free",
          subscription_status: "inactive",
        });
      }
    } catch (err) {
      console.error("User profile load error:", err);
    }
  } else {
    setUserData(null);
  }

  setLoading(false);
});

return () => unsub();

}, []);

const login = (email, password) => {
return signInWithEmailAndPassword(auth, email, password);
};

const signup = (email, password) => {
return createUserWithEmailAndPassword(auth, email, password);
};

const logout = () => {
return signOut(auth);
};

return (
<AuthContext.Provider
value={{
user,
userData,
login,
signup,
logout,
loading,
}}
>
{children}
</AuthContext.Provider>
);
}

export const useAuth = () => useContext(AuthContext);