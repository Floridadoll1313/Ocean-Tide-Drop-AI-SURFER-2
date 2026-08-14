import type { Session } from '@supabase/supabase-js';
import { supabase } from './supabase';

export async function getSession(): Promise<Session | null> {
  const res = await supabase.auth.getSession();
  return res.data.session ?? null;
}

export function onAuthChange(callback: (session: Session | null) => void) {
  // initial call (async)
  getSession().then(callback).catch(() => callback(null));

  const { data: listener } = supabase.auth.onAuthStateChange((_event, session) => {
    callback(session);
  }); 

  return () => {
    listener?.subscription.unsubscribe();
  };
}
