import React, { useState } from 'react';
import { MessageSquare, X, Send, Sparkles } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

export default function AIAssistant() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<{role: 'user' | 'assistant', content: string}[]>([
    { role: 'assistant', content: "Hello! I am your AI Surfer guide. How can I help you ride the next wave?" }
  ]);
  const [input, setInput] = useState('');
  const [isThinking, setIsThinking] = useState(false);

  const handleSend = (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim()) return;
    
    setMessages(prev => [...prev, { role: 'user', content: input }]);
    setInput('');
    setIsThinking(true);
    
    setTimeout(() => {
      setIsThinking(false);
      setMessages(prev => [...prev, { role: 'assistant', content: "I'm a local AI assistant. I've noted your inquiry and our elite strategists will integrate this into your growth architecture soon." }]);
    }, 1500);
  };

  return (
    <>
      <button 
        onClick={() => setIsOpen(true)}
        className="fixed bottom-6 right-6 z-[100] w-14 h-14 bg-cyan-400 text-black rounded-full shadow-[0_0_20px_rgba(34,211,238,0.4)] flex items-center justify-center hover:scale-110 transition-transform"
      >
        <MessageSquare className="w-6 h-6" />
      </button>

      <AnimatePresence>
        {isOpen && (
          <motion.div 
            initial={{ opacity: 0, y: 20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.95 }}
            className="fixed bottom-24 right-6 w-80 h-96 bg-zinc-950 border border-white/10 rounded-2xl shadow-2xl z-[100] flex flex-col overflow-hidden"
          >
            <div className="p-4 bg-white/5 border-b border-white/10 flex justify-between items-center">
               <div className="flex items-center gap-2">
                 <Sparkles className="w-4 h-4 text-cyan-400" />
                 <span className="text-xs font-black uppercase tracking-widest text-white">AI Assistant</span>
               </div>
               <button onClick={() => setIsOpen(false)} className="text-zinc-400 hover:text-white">
                 <X className="w-4 h-4" />
               </button>
            </div>
            
            <div className="flex-1 overflow-y-auto p-4 space-y-4 font-sans text-sm">
               {messages.map((m, i) => (
                 <div key={i} className={`flex ${m.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                    <div className={`max-w-[80%] p-3 rounded-2xl ${m.role === 'user' ? 'bg-cyan-400 text-black rounded-tr-none' : 'bg-white/10 text-white rounded-tl-none'}`}>
                       {m.content}
                    </div>
                 </div>
               ))}
               {isThinking && (
                 <div className="flex justify-start">
                    <div className="bg-white/5 border border-white/10 text-white p-4 rounded-2xl rounded-tl-none flex items-center gap-2">
                       <div className="w-1.5 h-1.5 bg-cyan-400 rounded-full animate-bounce" style={{ animationDelay: '0ms' }} />
                       <div className="w-1.5 h-1.5 bg-cyan-400 rounded-full animate-bounce" style={{ animationDelay: '150ms' }} />
                       <div className="w-1.5 h-1.5 bg-cyan-400 rounded-full animate-bounce" style={{ animationDelay: '300ms' }} />
                    </div>
                 </div>
               )}
            </div>

            <form onSubmit={handleSend} className="p-4 bg-black border-t border-white/10 flex gap-2">
               <input 
                 value={input}
                 onChange={e => setInput(e.target.value)}
                 placeholder="Ask something..."
                 className="flex-1 bg-white/5 border border-white/10 rounded-full px-4 py-2 text-white text-xs focus:outline-none focus:border-cyan-400"
               />
               <button type="submit" className="w-8 h-8 rounded-full bg-cyan-400 text-black flex items-center justify-center shrink-0">
                 <Send className="w-3 h-3" />
               </button>
            </form>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
