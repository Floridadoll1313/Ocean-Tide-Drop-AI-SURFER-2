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
  Globe, 
  ExternalLink 
} from 'lucide-react';
import { GoogleGenAI } from "@google/genai";
import { useAuth } from '../components/AuthProvider';
import { supabase } from '../lib/supabaseClient';
import ReactMarkdown from 'react-markdown';
import { cn } from '../lib/utils';

interface Message {
  role: 'user' | 'model';
  content: string;
  thinking?: string;
  sources?: { title: string; uri: string }[];
}

export default function AIStudio() {
  const { user } = useAuth();
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [modelType, setModelType] = useState<'pro' | 'flash' | 'lite'>('flash');
  const [highThinking, setHighThinking] = useState(false);
  const [useSearch, setUseSearch] = useState(true);
  const [selectedPersona, setSelectedPersona] = useState<string>('Surfer');
  const [isLoadingHistory, setIsLoadingHistory] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const personas = [
    { id: 'Surfer', name: 'Surfer', icon: Globe, instruction: "You are the OTD AI Surfer, a digital ecosystem guide. You use oceanic metaphors and remain professional yet adventurous." },
    { id: 'Architect', name: 'Architect', icon: Brain, instruction: "You are the lead Neural Architect. Your responses are highly structured, technical, and prioritize systematic integrity." },
    { id: 'Visionary', name: 'Visionary', icon: Sparkles, instruction: "You are the Collective Visionary. Your responses are creative, abstract, more futuristic, and focus on expansionist possibilities." },
    { id: 'Specialist', name: 'Specialist', icon: Zap, instruction: "You are the Tech Specialist. Your responses are extremely concise, direct, and efficient. No fluff." },
  ];

  const getAI = () => {
    // Note: In production, call an API route instead of exposing your key on the client
    const key = import.meta.env.VITE_GEMINI_API_KEY || (process.env.GEMINI_API_KEY as string); 
    if (!key) throw new Error('Neural key not found. Please configure in environment variables.');
    return new GoogleGenAI({ apiKey: key });
  };

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  // Load chat history from Supabase
  useEffect(() => {
    const loadHistory = async () => {
      if (!user || !supabase) return;
      
      setIsLoadingHistory(true);
      try {
        const { data, error } = await supabase
          .from('chat_messages')
          .select('*')
          .eq('user_id', user.id)
          .order('created_at', { ascending: true });

        if (error) throw error;
        if (data) {
          setMessages(data.map(m => ({
            role: m.role as 'user' | 'model',
            content: m.content
          })));
        }
      } catch (err) {
        console.error('Failed to load history:', err);
      } finally {
        setIsLoadingHistory(false);
      }
    };

    loadHistory();
  }, [user]);

  const handleSend = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim() || isTyping) return;

    const userMessage: Message = { role: 'user', content: input };
    setMessages(prev => [...prev, userMessage]);
    
    // Persist user message
    if (user && supabase) {
      supabase.from('chat_messages').insert({
        user_id: user.id,
        role: 'user',
        content: input,
        persona: selectedPersona
      }).then(({ error }) => {
        if (error) console.error('Failed to persist user message:', error);
      });
    }

    setInput('');
    setIsTyping(true);

    try {
      const ai = getAI();
      const modelName = 
        modelType === 'pro' ? 'gemini-3.1-pro-preview' : 
        modelType === 'flash' ? 'gemini-3-flash-preview' : 
        'gemini-3.1-flash-lite-preview-02-05';

      const personaData = personas.find(p => p.id === selectedPersona) || personas[0];
      
      const config: any = {
        temperature: 0.7,
        topP: 0.95,
        topK: 40,
        maxOutputTokens: 8192,
        systemInstruction: `${personaData.instruction} You are currently acting within the AI Surfer environment.`,
      };

      if (highThinking && modelType === 'pro') {
        config.thinkingConfig = { includeThoughts: true };
      }

      const tools = useSearch ? [{ googleSearch: {} }] as any : [];

      const result = await ai.models.generateContent({
        model: modelName,
        contents: [...messages, userMessage].map(m => ({
          role: m.role,
          parts: [{ text: m.content }]
        })),
        config: {
          ...config,
          tools
        }
      });

      const responseText = result.text;
      
      const modelResponse: Message = { 
        role: 'model', 
        content: responseText || "I encountered a ripple in the data stream. Please try again.",
      };

      setMessages(prev => [...prev, modelResponse]);

      // Persist model response
      if (user && supabase) {
        supabase.from('chat_messages').insert({
          user_id: user.id,
          role: 'model',
          content: modelResponse.content,
          persona: selectedPersona
        }).then(({ error }) => {
          if (error) console.error('Failed to persist model response:', error);
        });
      }
    } catch (error) {
      console.error('Chat failed:', error);
      setMessages(prev => [...prev, { role: 'model', content: "System error: The connection to the digital abyss was interrupted." }]);
    } finally {
      setIsTyping(false);
    }
  };

  const clearChat = async () => {
    if (user && supabase) {
      const { error } = await supabase
        .from('chat_messages')
        .delete()
        .eq('user_id', user.id);
      
      if (error) {
        console.error('Failed to clear persistent chat:', error);
        return;
      }
    }
    setMessages([]);
  };

  return (
    <div className="max-w-4xl mx-auto py-12 px-4 h-[calc(100vh-200px)] flex flex-col pt-24">
      <motion.div 
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="flex flex-col md:flex-row items-center justify-between mb-8 gap-4"
      >
        <div className="flex items-center gap-4">
          <div className="p-2 bg-cyan-400/10 rounded-xl border border-cyan-400/20">
            <Bot className="text-cyan-400" size={28} />
          </div>
          <div className="text-left">
            <h1 className="text-3xl font-black italic tracking-tighter text-white">AI SURFER</h1>
            <p className="text-[10px] tracking-[0.3em] text-white/50 uppercase font-bold">Neural Navigator</p>
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
                    ? "bg-cyan-400 text-black" 
                    : "text-white/50 hover:text-white"
                )}
              >
                <p.icon size={12} />
                <span className="hidden sm:inline">{p.name.toUpperCase()}</span>
              </button>
            ))}
          </div>

          <button 
            onClick={clearChat}
            className="p-2 text-white/50 hover:text-red-500 transition-colors"
          >
            <Trash2 size={20} />
          </button>
        </div>
      </motion.div>

      <div className="flex-1 glass-card rounded-3xl border border-white/10 overflow-hidden flex flex-col relative bg-white/5 shadow-2xl">
        <div className="flex-1 overflow-y-auto p-6 space-y-6 custom-scrollbar">
          {isLoadingHistory && (
            <div className="h-full flex flex-col items-center justify-center text-center space-y-4 opacity-40">
              <Loader2 size={32} className="text-cyan-400 animate-spin" />
              <p className="text-xs font-bold uppercase tracking-widest text-white/50">Restoring Neural Context...</p>
            </div>
          )}

          {!isLoadingHistory && messages.length === 0 && (
            <div className="h-full flex flex-col items-center justify-center text-center space-y-6 opacity-40">
              <Sparkles size={48} className="text-cyan-400 animate-pulse" />
              <div className="space-y-2">
                <p className="text-xl font-black italic text-white uppercase">Awaiting Input</p>
                <p className="text-sm font-light tracking-widest uppercase text-white/40">Initialize neural connection</p>
              </div>
              {!user && (
                <div className="mt-4 p-4 border border-white/10 rounded-xl bg-white/5">
                  <p className="text-[10px] text-white/50 mb-2">Login to persist your neural history</p>
                </div>
              )}
            </div>
          )}

          {!isLoadingHistory && (
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
                    ? 'bg-cyan-400/20 border-cyan-400/40 text-cyan-400' 
                    : 'bg-white/5 border-white/10 text-white/40'
                }`}>
                  {msg.role === 'user' ? <User size={16} /> : <Bot size={16} />}
                </div>
                <div className={`max-w-[85%] p-4 rounded-2xl text-sm leading-relaxed text-left ${
                  msg.role === 'user'
                    ? 'bg-cyan-400 text-black font-medium rounded-tr-none'
                    : 'bg-white/5 text-white/80 border border-white/10 rounded-tl-none'
                }`}>
                  <div className="markdown-body">
                    <ReactMarkdown>
                      {msg.content}
                    </ReactMarkdown>
                  </div>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
          )}
          
          {isTyping && (
            <div className="flex gap-4">
              <div className="w-8 h-8 rounded-lg bg-white/5 border border-white/10 flex items-center justify-center text-white/40">
                <Bot size={16} />
              </div>
              <div className="bg-white/5 border border-white/10 p-4 rounded-2xl rounded-tl-none flex items-center gap-2">
                <div className="w-1.5 h-1.5 bg-cyan-400 rounded-full animate-bounce" />
                <div className="w-1.5 h-1.5 bg-cyan-400 rounded-full animate-bounce [animation-delay:0.2s]" />
                <div className="w-1.5 h-1.5 bg-cyan-400 rounded-full animate-bounce [animation-delay:0.4s]" />
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
            className="flex-1 bg-white/5 border border-white/10 rounded-xl px-6 py-4 focus:border-cyan-400 outline-none transition-colors text-white"
          />
          <button 
            type="submit"
            disabled={isTyping || !input.trim()}
            className="bg-cyan-400 text-black p-4 rounded-xl hover:brightness-110 transition-all disabled:opacity-50"
          >
            {isTyping ? <Loader2 className="animate-spin" size={20} /> : <Send size={20} />}
          </button>
        </form>
      </div>

      <div className="mt-4 flex justify-between text-[8px] font-black uppercase tracking-[0.3em] text-white/30">
        <div className="flex gap-4">
          <span>Model: {modelType.toUpperCase()}</span>
          <span>Persona: {selectedPersona.toUpperCase()}</span>
        </div>
        <span>Neural Link: Stable</span>
      </div>
    </div>
  );
}
