import React, { useState } from 'react';
import { motion } from 'motion/react';
import { Check, Loader2 } from 'lucide-react';
import { useAuth } from '../../components/AuthProvider';

export default function JoinCollective() {
  const { user, login } = useAuth();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubscribe = async () => {
    if (!user) {
      await login();
      return;
    }

    setLoading(true);
    setError(null);
    try {
      const response = await fetch('/api/create-checkout-session', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ userId: user.uid, email: user.email })
      });
      
      const data = await response.json();
      
      if (!response.ok) {
        throw new Error(data.error || 'Failed to initialize checkout');
      }

      window.location.href = data.url;
    } catch (err: any) {
      setError(err.message);
      setLoading(false);
    }
  };

  return (
    <div className="pt-24 pb-12 w-full text-left max-w-4xl mx-auto px-4">
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="mb-12 text-center">
        <h1 className="font-display text-5xl font-black uppercase tracking-tighter mb-4 text-white italic">Join the Collective</h1>
        <p className="text-white/50 text-sm leading-relaxed max-w-lg mx-auto">Access the Velocity Drop neural network, tools, and community.</p>
      </motion.div>

      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }} className="glass-card p-8 md:p-12 rounded-[2rem] border border-neon-cyan/20 bg-gradient-to-br from-neon-cyan/5 to-black relative">
        <div className="absolute top-0 right-0 p-4">
          <div className="text-xs font-black uppercase tracking-widest text-neon-cyan bg-neon-cyan/10 px-3 py-1 rounded-full border border-neon-cyan/20">All Access</div>
        </div>
        
        <div className="mb-8">
          <h2 className="text-3xl font-black italic uppercase text-white mb-2">Neural Link</h2>
          <div className="text-5xl font-black text-white">$49<span className="text-xl text-slate-500">/mo</span></div>
        </div>

        <ul className="space-y-4 mb-10">
          {[
            'Full access to the Member Dashboard',
            'AI Surfer & Prompt Toolkit',
            'Global Member Network',
            'Blueprints & Automations',
            'Cancel anytime'
          ].map((feature, i) => (
            <li key={i} className="flex items-center gap-3 text-slate-300">
              <div className="w-5 h-5 rounded-full bg-neon-cyan/20 flex items-center justify-center shrink-0">
                <Check size={12} className="text-neon-cyan" />
              </div>
              <span className="text-sm font-medium">{feature}</span>
            </li>
          ))}
        </ul>

        {error && (
          <div className="mb-6 p-4 bg-red-500/10 border border-red-500/20 rounded-xl text-red-500 text-sm font-medium">
            {error}
          </div>
        )}

        <button 
          onClick={handleSubscribe}
          disabled={loading}
          className="w-full py-4 bg-neon-cyan text-black rounded-xl font-black uppercase tracking-widest hover:brightness-110 transition-all disabled:opacity-50 flex items-center justify-center gap-2"
        >
          {loading ? <Loader2 className="animate-spin" size={18} /> : (user ? 'Initialize Link' : 'Sign in to Subscribe')}
        </button>
      </motion.div>
    </div>
  );
}
