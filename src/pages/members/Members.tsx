import React, { useState, useEffect } from 'react';
import { motion } from 'motion/react';
import { Users, UserPlus, Search, MapPin } from 'lucide-react';
import { collection, getDocs, query, limit } from 'firebase/firestore';
import { db } from '../../utils/firebase';

interface PublicMember {
  uid: string;
  displayName: string;
  photoURL?: string;
  bio?: string;
  location?: string;
}

export default function Members() {
  const [members, setMembers] = useState<PublicMember[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');

  useEffect(() => {
    const fetchMembers = async () => {
      try {
        const q = query(collection(db, 'users_public'), limit(50));
        const snap = await getDocs(q);
        setMembers(snap.docs.map(doc => doc.data() as PublicMember));
      } catch (err) {
        console.error("Failed to fetch members:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchMembers();
  }, []);

  const filteredMembers = (members || []).filter(m => 
    (m.displayName || "").toLowerCase().includes(searchQuery.toLowerCase()) ||
    (m.bio || "").toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="max-w-7xl mx-auto py-12 px-4 min-h-screen relative z-10 w-full text-left">
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-12"
      >
        <div>
          <h1 className="font-display text-5xl font-black italic tracking-tighter uppercase text-white">Member Directory</h1>
          <p className="text-cyan-400 text-[10px] font-black uppercase tracking-[0.3em] mt-2">Velocity Drop Network</p>
        </div>
        <div className="relative group">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-white/50 group-hover:text-cyan-400 transition-colors" size={18} />
          <input 
            type="text" 
            placeholder="SEARCH NEURAL IDS..." 
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="bg-white/5 border border-white/10 rounded-2xl py-4 pl-12 pr-6 text-white text-xs font-bold focus:outline-none focus:border-cyan-400/50 w-full md:w-80 transition-all uppercase tracking-widest"
          />
        </div>
      </motion.div>

      {loading ? (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {[1, 2, 3].map(i => (
            <div key={i} className="h-64 rounded-[2rem] bg-white/5 animate-pulse border border-white/10" />
          ))}
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {filteredMembers.map((member) => (
            <motion.div 
              layout
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              key={member.uid} 
              className="p-8 rounded-[2rem] border border-white/10 bg-white/5 flex flex-col items-center text-center hover:bg-white/10 transition-colors duration-300 group"
            >
              <div className="w-20 h-20 rounded-2xl overflow-hidden bg-gradient-to-br from-cyan-400/20 to-purple-500/20 border border-white/10 mb-6 flex items-center justify-center">
                {member.photoURL ? (
                  <img src={member.photoURL} alt={member.displayName} className="w-full h-full object-cover" referrerPolicy="no-referrer" />
                ) : (
                  <Users size={32} className="text-white/20" />
                )}
              </div>
              <h3 className="text-lg font-bold text-white uppercase italic mb-1">{member.displayName}</h3>
              {member.location && (
                <div className="flex items-center gap-1 text-cyan-400/60 text-[9px] font-black uppercase tracking-widest mb-2">
                  <MapPin size={10} />
                  {member.location}
                </div>
              )}
              <p className="text-[10px] text-white/50 font-medium leading-relaxed mb-6 line-clamp-2 italic">
                {member.bio || "Neural stream active but silent."}
              </p>
              <button className="w-full py-3 bg-white/5 border border-white/10 rounded-xl text-[10px] font-black uppercase tracking-widest hover:bg-white hover:text-black transition-all group-hover:border-cyan-400/30">
                View Profile
              </button>
            </motion.div>
          ))}
          {(filteredMembers || []).length === 0 && (
            <div className="col-span-full py-20 text-center border border-dashed border-white/10 rounded-[2rem]">
              <p className="text-white/30 text-xs font-black uppercase tracking-[0.2em]">No results found in the Outer Banks.</p>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
