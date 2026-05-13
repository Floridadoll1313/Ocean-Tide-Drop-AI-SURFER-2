import React from "react";
import { motion } from "motion/react";
import { Mail, MessageSquare, Phone } from "lucide-react";

export default function Contact() {
  return (
    <div className="min-h-screen pt-20">
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="max-w-4xl mx-auto px-6 py-20"
      >
        <h1 className="text-4xl md:text-6xl font-black italic uppercase tracking-tighter mb-8">
          Signal <span className="text-neon-cyan">The Surge</span>
        </h1>
        
        <p className="text-white/60 text-lg mb-12 max-w-2xl">
          Connect with the Ocean Tide Drop neural network. Our dispatchers are monitoring all frequencies.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {[
            { icon: <Mail />, title: "Neural Link", value: "dispatch@oceantidedrop.ai" },
            { icon: <MessageSquare />, title: "Secure Wave", value: "Discord Sanctuary" },
            { icon: <Phone />, title: "Direct Line", value: "+1 (888) SURF-OAI" },
          ].map((item, i) => (
            <motion.div 
              key={i}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.1 }}
              className="p-8 bg-white/5 border border-white/10 rounded-sm hover:border-neon-cyan/50 transition-colors"
            >
              <div className="text-neon-cyan mb-4">{item.icon}</div>
              <div className="text-[10px] font-black uppercase tracking-widest text-white/40 mb-2">{item.title}</div>
              <div className="text-sm font-bold">{item.value}</div>
            </motion.div>
          ))}
        </div>
      </motion.div>
    </div>
  );
}
