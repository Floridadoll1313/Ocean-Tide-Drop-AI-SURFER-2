import { useState, useEffect } from "react";

export function useAuth() {
  const [user, setUser] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // TEMP placeholder auth (pre-Supabase/Firebase)
    const fakeUser = null;

    setUser(fakeUser);
    setLoading(false);
  }, []);

  return { user, loading };
}
