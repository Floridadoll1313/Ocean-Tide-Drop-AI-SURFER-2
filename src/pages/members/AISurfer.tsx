import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Send, 
  Bot, 
  User, 
  Sparkles, 
  Brain, 
  Zap, 
  Loader2, 
  Trash2, 
  Globe
} from 'lucide-react';
import { GoogleGenAI, ThinkingLevel } from "@google/genai";
import { useAuth } from '../../components/AuthProvider';
import ReactMarkdown from 'react-markdown';
import { cn } from '../../utils/utils';

interface Message {
  role: 'user' | 'model';
  content: string;
  thinking?: string;
  sources?: { title: string; uri: string }[];
}

export const AISurfer = () => {
  const { user } = useAuth();
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [modelType, setModelType] = useState<'pro' | 'flash' | 'lite'>('flash');
  const [highThinking, setHighThinking] = useState(false);
  const [useSearch, setUseSearch] = useState(true);
  const [selectedPersona, setSelectedPersona] = useState<string>('Surfer');
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const personas = [
    { id: 'Surfer', name: 'Surfer', icon: Globe, instruction: "You are the OTD AI Surfer, a digital ecosystem guide. You use oceanic metaphors and remain professional yet adventurous." },
    { id: 'Architect', name: 'Architect', icon: Brain, instruction: "You are the lead Neural Architect. Your responses are highly structured, technical, and prioritize systematic integrity." },
    { id: 'Visionary', name: 'Visionary', icon: Sparkles, instruction: "You are the Collective Visionary. Your responses are creative, abstract, more futuristic, and focus on expansionist possibilities." },
    { id: 'Specialist', name: 'Specialist', icon: Zap, instruction: "You are the Tech Specialist. Your responses are extremely concise, direct, and efficient. No fluff." },
  ];

  const getAI = () => {
    // Note: In production, call an API route instead of exposing your key on the client
    const key = import.meta.env.VITE_GEMINI_API_KEY; 
    if (!key) throw new Error('Neural key not found. Please configure in environment variables.');
    return new GoogleGenAI({ apiKey: key });
  };

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSend = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim() || isTyping) return;

    const userMessage: Message = { role: 'user', content: input };
    setMessages(prev => [...prev, userMessage]);
    setInput('');
    setIsTyping(true);

    try {
      const ai = getAI();
      const modelName = 
        modelType === 'pro' ? 'gemini-2.0-pro-exp-02-05' : 
        modelType === 'flash' ? 'gemini-2.0-flash' : 
        'gemini-2.0-flash-lite-preview-02-05';

      const personaData = personas.find(p => p.id === selectedPersona) || personas[0];
      
      const generationConfig: any = {
        temperature: 0.7,
        topP: 0.95,
        topK: 40,
        maxOutputTokens: 8192,
      };

      const tools = useSearch ? [{ googleSearch: {} }] : [];

      const result = await ai.models.generateContent({
        model: modelName,
        contents: [...messages, userMessage].map(m => ({
          role: m.role,
          parts: [{ text: m.content }]
        })),
        config: {
          systemInstruction: `${personaData.instruction} You are currently acting within the Velocity Drop environment.`,
          tools,
          temperature: 0.7,
          topP: 0.95,
          topK: 40,
          thinkingConfig: (highThinking && modelType === 'pro') ? { thinkingLevel: ThinkingLevel.HIGH } : undefined
        }
      });

      const responseText = result.text;
      
      const modelResponse: Message = { 
        role: 'model', 
        content: responseText || "I encountered a ripple in the data stream. Please try again.",
      };

      setMessages(prev => [...prev, modelResponse]);
    } catch (error) {
      console.error('Chat failed:', error);
      setMessages(prev => [...prev, { role: 'model', content: "System error: The connection to the digital abyss was interrupted." }]);
    } finally {
      setIsTyping(false);
    }
  };

  const clearChat = () => {
    setMessages([]);
  };

  return (
    <div className="max-w-4xl mx-auto py-12 px-4 h-[calc(100vh-120px)] flex flex-col">
      <motion.div 
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="flex flex-col md:flex-row items-center justify-between mb-8 gap-4"
      >
        <div className="flex items-center gap-4">
          <div className="p-2 bg-neon-cyan/10 rounded-xl border border-neon-cyan/20">
            <Bot className="text-neon-cyan" size={28} />
          </div>
          <div>
            <h1 className="text-3xl font-black italic tracking-tighter text-white">AI SURFER</h1>
            <p className="text-[10px] tracking-[0.3em] text-slate-500 uppercase font-bold">Neural Navigator</p>
          </div>
        </div>

        <div className="flex flex-wrap items-center justify-center gap-3">
          <div className="flex p-1 bg-white/5 rounded-lg border border-white/10">
            {personas.map((p) => (
              <button
                key={p.id}
                onClick={() => setSelectedPersona(p.id)}
                className={cn(
                  "flex items-center gap-1.5 px-3 py-1 text-[10px] font-bold rounded transition-all",
                  selectedPersona === p.id 
                    ? "bg-neon-cyan text-black" 
                    : "text-slate-500 hover:text-white"
                )}
              >
                <p.icon size={12} />
                <span className="hidden sm:inline">{p.name.toUpperCase()}</span>
              </button>
            ))}
          </div>

          <button 
            onClick={clearChat}
            className="p-2 text-slate-500 hover:text-red-500 transition-colors"
          >
            <Trash2 size={20} />
          </button>
        </div>
      </motion.div>

      <div className="flex-1 glass-card rounded-3xl border border-white/10 overflow-hidden flex flex-col relative bg-white/5">
        <div className="flex-1 overflow-y-auto p-6 space-y-6 custom-scrollbar">
          {messages.length === 0 && (
            <div className="h-full flex flex-col items-center justify-center text-center space-y-6 opacity-40">
              <Sparkles size={48} className="text-neon-cyan animate-pulse" />
              <div className="space-y-2">
                <p className="text-xl font-black italic text-white">AWAITING INPUT</p>
                <p className="text-sm font-light tracking-widest uppercase text-slate-400">Initialize neural connection</p>
              </div>
            </div>
          )}

          <AnimatePresence initial={false}>
            {messages.map((msg, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className={`flex gap-4 ${msg.role === 'user' ? 'flex-row-reverse' : ''}`}
              >
                <div className={`w-8 h-8 rounded-lg flex items-center justify-center shrink-0 border ${
                  msg.role === 'user' 
                    ? 'bg-neon-cyan/20 border-neon-cyan/40 text-neon-cyan' 
                    : 'bg-white/5 border-white/10 text-slate-400'
                }`}>
                  {msg.role === 'user' ? <User size={16} /> : <Bot size={16} />}
                </div>
                <div className={`max-w-[85%] p-4 rounded-2xl text-sm leading-relaxed ${
                  msg.role === 'user'
                    ? 'bg-neon-cyan text-black font-medium rounded-tr-none'
                    : 'bg-white/5 text-slate-200 border border-white/10 rounded-tl-none'
                }`}>
                  <div className="prose prose-invert prose-sm max-w-none">
                    <ReactMarkdown>
                      {msg.content}
                    </ReactMarkdown>
                  </div>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
          
          {isTyping && (
            <div className="flex gap-4">
              <div className="w-8 h-8 rounded-lg bg-white/5 border border-white/10 flex items-center justify-center text-slate-400">
                <Bot size={16} />
              </div>
              <div className="bg-white/5 border border-white/10 p-4 rounded-2xl rounded-tl-none flex items-center gap-2">
                <div className="w-1.5 h-1.5 bg-neon-cyan rounded-full animate-bounce" />
                <div className="w-1.5 h-1.5 bg-neon-cyan rounded-full animate-bounce [animation-delay:0.2s]" />
                <div className="w-1.5 h-1.5 bg-neon-cyan rounded-full animate-bounce [animation-delay:0.4s]" />
              </div>
            </div>
          )}
          <div ref={messagesEndRef} />
        </div>

        <form onSubmit={handleSend} className="p-4 bg-black/40 border-t border-white/10 flex gap-4">
          <input 
            type="text" 
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Ask the AI Surfer anything..."
            className="flex-1 bg-white/5 border border-white/10 rounded-xl px-6 py-4 focus:border-neon-cyan outline-none transition-colors text-white"
          />
          <button 
            type="submit"
            disabled={isTyping || !input.trim()}
            className="bg-neon-cyan text-black p-4 rounded-xl hover:brightness-110 transition-all disabled:opacity-50"
          >
            {isTyping ? <Loader2 className="animate-spin" size={20} /> : <Send size={20} />}
          </button>
        </form>
      </div>

      <div className="mt-4 flex justify-between text-[8px] font-black uppercase tracking-[0.3em] text-slate-600">
        <div className="flex gap-4">
          <span>Model: {modelType.toUpperCase()}</span>
          <span>Persona: {selectedPersona.toUpperCase()}</span>
        </div>
        <span>Neural Link: Stable</span>
      </div>
    </div>
  );
};
