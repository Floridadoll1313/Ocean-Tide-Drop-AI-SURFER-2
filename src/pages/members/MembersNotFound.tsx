import React from 'react';
import { motion } from 'motion/react';
import { AlertCircle, ArrowLeft } from 'lucide-react';
import { Link } from 'react-router-dom';

export const MembersNotFound = () => {
  return (
    <div className="max-w-7xl mx-auto py-32 px-4 min-h-[80vh] flex flex-col items-center justify-center text-center">
      <motion.div initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }}>
        <AlertCircle size={80} className="text-neon-pink mb-8 mx-auto opacity-50" />
        <h1 className="text-6xl font-black italic tracking-tighter uppercase text-white mb-4">404 - Grid Error</h1>
        <p className="text-slate-400 max-w-lg mx-auto mb-12">
          The coordinates you entered do not exist within the Velocity Drop ecosystem. You may have drifted outside the known grid.
        </p>
        <Link to="/members" className="inline-flex items-center gap-2 bg-white text-black px-8 py-4 rounded-xl font-black uppercase tracking-widest text-xs hover:bg-slate-200 transition-colors">
           <ArrowLeft size={16} /> Return to Dashboard
        </Link>
      </motion.div>
    </div>
  );
};
