import React from 'react';
import { motion } from 'motion/react';
import { Archive, Lock, Download, FileText, Image, Video } from 'lucide-react';

export const Vault = () => {
  return (
    <div className="max-w-7xl mx-auto py-12 px-4 min-h-screen">
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="mb-12">
        <h1 className="text-5xl font-black italic tracking-tighter uppercase text-white">The Vault</h1>
        <p className="text-purple-400 text-[10px] font-black uppercase tracking-[0.3em] mt-2">Secure Asset Storage</p>
      </motion.div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {[
          { name: 'Onboarding Dossier.pdf', type: 'doc', icon: FileText, size: '2.4 MB' },
          { name: 'Velocity Drop Logo Pack.zip', type: 'archive', icon: Archive, size: '48 MB' },
          { name: 'Cinematic Intro B-Roll.mp4', type: 'video', icon: Video, size: '1.2 GB' },
          { name: 'Foundational Schematics.png', type: 'image', icon: Image, size: '8.1 MB' },
          { name: 'Secure Neural Keys.enc', type: 'secured', icon: Lock, size: '12 KB', color: 'text-red-500' },
        ].map((file, i) => (
          <div key={i} className="glass-card p-6 rounded-2xl border border-white/10 bg-white/5 hover:bg-white/10 transition-colors group cursor-pointer flex items-center gap-4">
             <div className={`w-12 h-12 rounded-xl flex items-center justify-center border border-white/10 bg-black/40 ${file.color || 'text-purple-400'}`}>
               <file.icon size={20} />
             </div>
             <div className="flex-1 min-w-0">
               <h3 className="text-sm font-bold text-white truncate">{file.name}</h3>
               <p className="text-[10px] text-slate-500 font-mono mt-1">{file.size}</p>
             </div>
             <button className="p-2 text-slate-500 hover:text-white transition-colors" title="Download">
               <Download size={18} />
             </button>
          </div>
        ))}
      </div>
    </div>
  );
};
