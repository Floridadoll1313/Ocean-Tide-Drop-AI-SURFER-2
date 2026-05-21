import React, { createContext, useContext, ReactNode, useState, useEffect } from 'react';
import { User, onAuthStateChanged, signInWithPopup, signOut, GoogleAuthProvider } from 'firebase/auth';
import { doc, onSnapshot, setDoc } from 'firebase/firestore';
import { auth, db } from '../lib/firebase';

interface UserData {
  uid: string;
  email: string;
  displayName?: string;
  role?: string;
  subscriptionStatus?: 'none' | 'active' | 'canceled';
  tier?: 'basic' | 'premium' | 'enterprise';
  photoURL?: string;
}

interface AuthContextType {
  user: User | null;
  userData: UserData | null;
  accessToken: string | null;
  loading: boolean;
  error: string | null;
  setError: (error: string | null) => void;
  loginWithGoogle: (requestWorkspaceScopes?: boolean) => Promise<void>;
  logout: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType>({
  user: null,
  userData: null,
  accessToken: null,
  loading: true,
  error: null,
  setError: () => {},
  loginWithGoogle: async () => {},
  logout: async () => {}
});

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [userData, setUserData] = useState<UserData | null>(null);
  const [accessToken, setAccessToken] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let unsubscribeFirestore: (() => void) | undefined;

    const unsubscribeAuth = onAuthStateChanged(auth, (currentUser) => {
      if (unsubscribeFirestore) {
        unsubscribeFirestore();
        unsubscribeFirestore = undefined;
      }
      setUser(currentUser);
      
      if (!currentUser) {
        setAccessToken(null);
        setUserData(null);
        setLoading(false);
      } else {
        // Listen to user document in Firestore
        const userDocRef = doc(db, 'users', currentUser.uid);
        unsubscribeFirestore = onSnapshot(userDocRef, async (docSnap) => {
          if (docSnap.exists()) {
            setUserData(docSnap.data() as UserData);
            setLoading(false);
          } else {
            // Default userData if document doesn't exist yet
            const defaultUser: UserData = {
              uid: currentUser.uid,
              email: currentUser.email || '',
              displayName: currentUser.displayName || '',
              photoURL: currentUser.photoURL || '',
              subscriptionStatus: 'none',
              role: 'user', // required by rules
              tier: 'basic'
            };
            try {
              await setDoc(userDocRef, defaultUser);
            } catch (err: unknown) {
              console.error("Error creating default user doc in firestore:", err);
              // Fallback to setting local state if write fails or isn't completed yet
              setUserData(defaultUser);
              setLoading(false);
            }
          }
        }, (err) => {
          console.error("Error listening to user doc:", err);
          setError(err.message);
          setLoading(false);
        });
      }
    });

    return () => {
      unsubscribeAuth();
      if (unsubscribeFirestore) unsubscribeFirestore();
    };
  }, []);

  const loginWithGoogle = async (requestWorkspaceScopes = false) => {
    try {
      setError(null);
      const provider = new GoogleAuthProvider();
      const shouldRequestWorkspace = requestWorkspaceScopes === true;
      if (shouldRequestWorkspace) {
        provider.addScope('https://www.googleapis.com/auth/calendar');
        provider.addScope('https://www.googleapis.com/auth/tasks');
        provider.addScope('https://www.googleapis.com/auth/chat');
        provider.addScope('https://www.googleapis.com/auth/spreadsheets');
        provider.addScope('https://www.googleapis.com/auth/presentations');
        provider.addScope('https://www.googleapis.com/auth/documents');
        provider.addScope('https://mail.google.com/');
        provider.addScope('https://www.googleapis.com/auth/drive');
        provider.addScope('https://www.googleapis.com/auth/forms.body');
        provider.addScope('https://www.googleapis.com/auth/forms.responses.readonly');
        provider.addScope('https://www.googleapis.com/auth/forms');
      }
      const result = await signInWithPopup(auth, provider);
      const credential = GoogleAuthProvider.credentialFromResult(result);
      if (credential?.accessToken) {
        setAccessToken(credential.accessToken);
      }
    } catch (err: unknown) {
      console.error("Error signing in with Google:", err);
      const errorMessage = err instanceof Error ? err.message : String(err);
      setError(errorMessage);
      throw err;
    }
  };

  const logout = async () => {
    try {
      await signOut(auth);
      setAccessToken(null);
      setError(null);
    } catch (err: unknown) {
      console.error("Error signing out:", err);
      const errorMessage = err instanceof Error ? err.message : String(err);
      setError(errorMessage);
      throw err;
    }
  };

  return (
    <AuthContext.Provider value={{ user, userData, accessToken, loading, error, setError, loginWithGoogle, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  return useContext(AuthContext);
}
