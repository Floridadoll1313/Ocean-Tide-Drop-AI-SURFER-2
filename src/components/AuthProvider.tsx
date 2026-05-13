import React, {
  createContext,
  useContext,
  useEffect,
  useState,
  ReactNode,
} from "react";
import { 
  User, 
  onAuthStateChanged, 
  signInWithPopup, 
  GoogleAuthProvider, 
  signOut 
} from "firebase/auth";
import { auth, db } from "../utils/firebase";
import { doc, getDoc, setDoc } from "firebase/firestore";

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
     SYNC PROFILE
  ------------------------------------------------------- */
  const syncUserProfile = async (currentUser: User) => {
    try {
      const userRef = doc(db, 'users', currentUser.uid);
      const userPublicRef = doc(db, 'users_public', currentUser.uid);
      
      const userSnap = await getDoc(userRef);
      
      if (!userSnap.exists()) {
        const isAdminEmail = currentUser.email === "shannon@oceantidedrop.com" || currentUser.email === "oceantidedrop@gmail.com";
        
        // Initial setup for new member
        await setDoc(userRef, {
          uid: currentUser.uid,
          email: currentUser.email,
          displayName: currentUser.displayName || 'Neural Entity',
          photoURL: currentUser.photoURL || '',
          role: isAdminEmail ? 'admin' : 'user',
          subscriptionStatus: 'none',
          bio: '',
          location: ''
        });
        
        await setDoc(userPublicRef, {
          uid: currentUser.uid,
          displayName: currentUser.displayName || 'Neural Entity',
          photoURL: currentUser.photoURL || '',
          bio: '',
          location: ''
        });
      }
    } catch (error) {
      console.error("User Profile Sync Error:", error);
    }
  };

  /* -------------------------------------------------------
     INITIAL SESSION + LISTENER
  ------------------------------------------------------- */
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (currentUser) => {
      setUser(currentUser);
      if (currentUser) {
        await syncUserProfile(currentUser);
      }
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  /* -------------------------------------------------------
     LOGIN (Google OAuth)
  ------------------------------------------------------- */
  const login = async () => {
    try {
      const provider = new GoogleAuthProvider();
      await signInWithPopup(auth, provider);
    } catch (error) {
      console.error("Firebase Login Error:", error);
    }
  };

  /* -------------------------------------------------------
     LOGOUT
  ------------------------------------------------------- */
  const logout = async () => {
    try {
      await signOut(auth);
      setUser(null);
    } catch (error) {
      console.error("Firebase Logout Error:", error);
    }
  };

  /* -------------------------------------------------------
     ROLE FLAGS
  ------------------------------------------------------- */
  const isAdmin = user?.email === "shannon@oceantidedrop.com" || user?.email === "oceantidedrop@gmail.com";
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
