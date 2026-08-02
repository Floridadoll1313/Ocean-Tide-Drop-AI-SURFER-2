import React, { useState } from 'react';
import { supabase } from '../lib/supabaseClient';

export default function AuthForm() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const signIn = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });
    setLoading(false);
    if (error) setError(error.message);
    else {
      // Signed in — you can redirect or handle session state
      console.log('Signed in:', data);
    }
  };

  const signOut = async () => {
    await supabase.auth.signOut();
  };

  return (
    <form onSubmit={signIn}>
      <input
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        placeholder="email@example.com"
        type="email"
        required
      />
      <input
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        placeholder="password"
        type="password"
        required
      />
      <button type="submit" disabled={loading}>
        {loading ? 'Signing in…' : 'Sign in'}