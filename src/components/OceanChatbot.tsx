import React, { useState } from 'react';
import { MessageSquare, X, Send } from 'lucide-react';

export default function OceanChatbot() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<{ text: string; isBot: boolean }[]>([
    { text: "🤖 Ready to ride the automation tide?", isBot: true },
  ]);
  const [input, setInput] = useState('');

  const handleSend = (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim()) return;

    setMessages([...messages, { text: input, isBot: false }]);
    setInput('');

    // Simulate bot response
    setTimeout(() => {
      setMessages((prev) => [
        ...prev,
        { text: "Cowabunga! That sounds like an awesome wave to catch. We can automate that for you! 🌊", isBot: true },
      ]);
    }, 1000);
  };

  return (
    <div className="fixed bottom-6 right-6 z-50">
      {/* Chat Window */}
      {isOpen && (
        <div className="mb-4 w-80 bg-[#030e1a]/95 backdrop-blur-xl border border-cyan-500/30 rounded-2xl shadow-[0_10px_40px_rgba(0,242,254,0.15)] flex flex-col overflow-hidden animate-[fadeIn_0.2s_ease-out]">
          {/* Header */}
          <div className="bg-gradient-to-r from-cyan-600 to-blue-600 p-4 flex items-center justify-between">
            <h3 className="font-bold text-white flex items-center gap-2">
              <span className="text-xl">🌊</span> Talk to the Wave
            </h3>
            <button 
              onClick={() => setIsOpen(false)}
              className="text-white/80 hover:text-white transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Messages */}
          <div className="h-80 p-4 overflow-y-auto flex flex-col gap-3 custom-scrollbar">
            {messages.map((msg, idx) => (
              <div 
                key={idx} 
                className={`max-w-[85%] rounded-2xl p-3 text-sm flex-1 ${
                  msg.isBot 
                    ? "bg-[#06182c] border border-cyan-900/50 text-cyan-50 rounded-tl-sm self-start" 
                    : "bg-cyan-500 text-[#020b14] font-medium rounded-tr-sm self-end"
                }`}
              >
                {msg.text}
              </div>
            ))}
          </div>

          {/* Input */}
          <div className="p-3 border-t border-cyan-900/50 bg-[#020b14]">
            <form onSubmit={handleSend} className="relative">
              <input 
                type="text" 
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder="Ask something..." 
                className="w-full bg-[#06182c] border border-cyan-900/60 rounded-xl pl-4 pr-10 py-3 text-white focus:outline-none focus:border-cyan-400 focus:ring-1 focus:ring-cyan-400 transition-all text-sm placeholder:text-slate-500"
              />
              <button 
                type="submit"
                className="absolute right-2 top-1/2 -translate-y-1/2 p-2 text-cyan-400 hover:text-cyan-300 transition-colors"
              >
                <Send className="w-4 h-4" />
              </button>
            </form>
          </div>
        </div>
      )}

      {/* Toggle Button */}
      <button 
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center gap-3 px-6 py-4 rounded-full bg-gradient-to-r from-cyan-500 to-blue-600 text-white font-bold text-lg hover:shadow-[0_0_30px_rgba(0,242,254,0.4)] transition-all hover:-translate-y-1 transform focus:outline-none ml-auto"
      >
        <span>🌊</span> {isOpen ? "Close Chat" : "Talk to the Wave"}
      </button>
    </div>
  );
}
