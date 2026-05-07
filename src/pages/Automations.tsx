import React from 'react';
import { motion } from 'motion/react';
import { Bot, Terminal, Activity, Zap } from 'lucide-react';

export const Automations = () => {
  return (
    <div className="max-w-6xl mx-auto py-12 pt-24">
      <motion.div 
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        className="mb-12"
      >
        <div className="flex items-center gap-4 mb-4">
          <Bot className="text-cyan-400" size={40} />
          <h1 className="text-5xl font-black italic tracking-tighter uppercase">Automations</h1>
        </div>
        <p className="text-white/50 text-xl font-light tracking-wide">Live system feeds and autonomous agents.</p>
      </motion.div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-16">
        <div className="glass-card p-8 rounded-2xl border border-white/5 bg-white/5 text-left">
          <Terminal className="text-cyan-400 mb-6" size={32} />
          <h3 className="text-2xl font-bold mb-4">Autonomous Agents</h3>
          <p className="text-white/40 leading-relaxed">
            Deploying AI agents that can perform complex tasks independently. From 
            customer support to data analysis, our agents work 24/7.
          </p>
        </div>
        
        <div className="glass-card p-8 rounded-2xl border border-white/5 bg-white/5 text-left">
          <Activity className="text-neon-pink mb-6" size={32} />
          <h3 className="text-2xl font-bold mb-4">Live Monitoring</h3>
          <p className="text-white/40 leading-relaxed">
            Real-time tracking of your automated systems. Get instant alerts and 
            detailed logs to ensure everything is running smoothly.
          </p>
        </div>

        <div className="glass-card p-8 rounded-2xl border border-white/5 bg-white/5 col-span-full text-left">
          <Zap className="text-neon-green mb-6" size={32} />
          <h3 className="text-2xl font-bold mb-4">Instant Execution</h3>
          <p className="text-white/40 leading-relaxed">
            Triggering actions based on complex events and conditions. Our automation 
            engine provides the speed and reliability your business demands.
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-12 border-t border-white/10 pt-16 text-left">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          className="space-y-6"
        >
          <h2 className="text-3xl font-black italic tracking-tighter uppercase text-cyan-400">The Neural Net (How it Works)</h2>
          <div className="space-y-4">
            <div className="p-6 bg-white/5 rounded-2xl border border-white/10">
              <h4 className="text-white font-bold mb-2">1. Cognitive Mapping</h4>
              <p className="text-white/40 text-sm">We train LLMs on your specific business domain, giving them the "brain" needed to make context-aware decisions.</p>
            </div>
            <div className="p-6 bg-white/5 rounded-2xl border border-white/10">
              <h4 className="text-white font-bold mb-2">2. Tool Integration</h4>
              <p className="text-white/40 text-sm">Agents are equipped with custom API tools, allowing them to perform actions like searching the web, updating records, or sending emails.</p>
            </div>
            <div className="p-6 bg-white/5 rounded-2xl border border-white/10">
              <h4 className="text-white font-bold mb-2">3. Continuous Loops</h4>
              <p className="text-white/40 text-sm">Autonomous loops run 24/7, monitoring for specific conditions and executing multi-step tasks without human intervention.</p>
            </div>
          </div>
        </motion.div>

        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          className="space-y-6"
        >
          <h2 className="text-3xl font-black italic tracking-tighter uppercase text-neon-pink">The Yield (Business Value)</h2>
          <div className="space-y-6">
            <div className="flex gap-4">
              <div className="w-12 h-12 bg-neon-pink/10 rounded-xl flex items-center justify-center border border-neon-pink/20 shrink-0">
                <Bot size={20} className="text-neon-pink" />
              </div>
              <div>
                <h4 className="text-white font-bold mb-1">Human-Level Scalability</h4>
                <p className="text-white/40 text-sm">Handle thousands of customer inquiries or data analysis tasks simultaneously without increasing your headcount.</p>
              </div>
            </div>
            <div className="flex gap-4">
              <div className="w-12 h-12 bg-cyan-400/10 rounded-xl flex items-center justify-center border border-cyan-400/20 shrink-0">
                <Terminal size={20} className="text-cyan-400" />
              </div>
              <div>
                <h4 className="text-white font-bold mb-1">Cost Reduction</h4>
                <p className="text-white/40 text-sm">Automating complex cognitive tasks significantly reduces operational overhead and the cost of scaling internal processes.</p>
              </div>
            </div>
            <div className="flex gap-4">
              <div className="w-12 h-12 bg-neon-green/10 rounded-xl flex items-center justify-center border border-neon-green/20 shrink-0">
                <Activity size={20} className="text-neon-green" />
              </div>
              <div>
                <h4 className="text-white font-bold mb-1">Risk Mitigation</h4>
                <p className="text-white/40 text-sm">Live monitoring and autonomous guards ensure that critical systems stay within defined bounds, preventing costly downtime.</p>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default Automations;
