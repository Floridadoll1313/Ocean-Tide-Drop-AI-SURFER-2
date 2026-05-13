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
  ExternalLink,
  Plus,
  FolderPlus,
  Folder,
  FolderOpen,
  ChevronRight,
  ChevronDown,
  MoreVertical,
  MessageSquare,
  Search
} from 'lucide-react';
import { GoogleGenAI } from "@google/genai";
import { useAuth } from '../../components/AuthProvider';
import { db, handleFirestoreError, OperationType } from '../../utils/firebase';
import { 
  collection, 
  query, 
  where, 
  orderBy, 
  getDocs, 
  addDoc, 
  serverTimestamp, 
  deleteDoc, 
  doc,
  writeBatch,
  Timestamp
} from 'firebase/firestore';
import ReactMarkdown from 'react-markdown';
import { cn } from '../../utils/utils';

interface Message {
  role: 'user' | 'model';
  content: string;
  thinking?: string;
  sources?: { title: string; uri: string }[];
}

interface Session {
  id: string;
  title: string;
  folderId: string | null;
  createdAt: Timestamp;
}

interface Folder {
  id: string;
  name: string;
  createdAt: Timestamp;
}

export default function AIStudio() {
  const { user } = useAuth();
  
  // Projects State
  const [folders, setFolders] = useState<Folder[]>([]);
  const [sessions, setSessions] = useState<Session[]>([]);
  const [currentSessionId, setCurrentSessionId] = useState<string | null>(null);
  const [expandedFolders, setExpandedFolders] = useState<Set<string>>(new Set());
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);

  // Chat State
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [modelType, setModelType] = useState<'pro' | 'flash' | 'lite'>('flash');
  const [highThinking, setHighThinking] = useState(false);
  const [useSearch, setUseSearch] = useState(true);
  const [selectedPersona, setSelectedPersona] = useState<string>('Surfer');
  const [isLoadingHistory, setIsLoadingHistory] = useState(false);
  const [isLoadingProjects, setIsLoadingProjects] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const personas = [
    { id: 'Surfer', name: 'Surfer', icon: Globe, instruction: "You are the OTD AI Surfer, a digital ecosystem guide. You use oceanic metaphors and remain professional yet adventurous." },
    { id: 'Architect', name: 'Architect', icon: Brain, instruction: "You are the lead Neural Architect. Your responses are highly structured, technical, and prioritize systematic integrity." },
    { id: 'Visionary', name: 'Visionary', icon: Sparkles, instruction: "You are the Collective Visionary. Your responses are creative, abstract, more futuristic, and focus on expansionist possibilities." },
    { id: 'Specialist', name: 'Specialist', icon: Zap, instruction: "You are the Tech Specialist. Your responses are extremely concise, direct, and efficient. No fluff." },
  ];

  const mcpTools = [
    { id: 'generateBranding', name: 'Branding', icon: Globe, prompt: "Generate a cinematic branding concept for my project with a surf-mythic aesthetic." },
    { id: 'createLore', name: 'Lore', icon: MessageSquare, prompt: "Expand the lore of the Outer Banks of Innovation with a new island discovery." },
    { id: 'summonWaveCopy', name: 'Wave Copy', icon: Zap, prompt: "Write high-energy, oceanic-themed marketing copy for a new tech initiative." },
    { id: 'saveToFirebase', name: 'Sync Data', icon: Folder, prompt: "Process and summarize the current session data for archival in the Firebase records." },
    { id: 'createStripeCheckout', name: 'Checkout', icon: Plus, prompt: "Help me design a Stripe checkout flow for the member sanctuary tiers." },
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

  // Load projects structure
  useEffect(() => {
    const loadProjects = async () => {
      if (!user || !db) return;
      setIsLoadingProjects(true);
      try {
        const foldersQuery = query(
          collection(db, 'folders'), 
          where('userId', '==', user.uid), 
          orderBy('createdAt', 'desc')
        );
        const sessionsQuery = query(
          collection(db, 'chat_sessions'), 
          where('userId', '==', user.uid), 
          orderBy('createdAt', 'desc')
        );

        const [foldersSnap, sessionsSnap] = await Promise.all([
          getDocs(foldersQuery),
          getDocs(sessionsQuery)
        ]);

        const foldersData = foldersSnap.docs.map(doc => ({ id: doc.id, ...doc.data() } as Folder));
        const sessionsData = sessionsSnap.docs.map(doc => ({ id: doc.id, ...doc.data() } as Session));

        setFolders(foldersData || []);
        setSessions(sessionsData || []);

        // Default to latest session if none selected
        if (!currentSessionId && (sessionsData || []).length > 0 && sessionsData?.[0]) {
          setCurrentSessionId(sessionsData[0].id);
        }
      } catch (err) {
        console.error('Failed to load projects:', err);
        handleFirestoreError(err, OperationType.LIST, 'folders/chat_sessions');
      } finally {
        setIsLoadingProjects(false);
      }
    };
    loadProjects();
  }, [user]);

  // Load chat messages for the current session
  useEffect(() => {
    const loadSessionHistory = async () => {
      if (!user || !db || !currentSessionId) {
        if (!currentSessionId) setMessages([]);
        return;
      }
      
      setIsLoadingHistory(true);
      try {
        const messagesQuery = query(
          collection(db, 'chat_sessions', currentSessionId, 'messages'),
          orderBy('createdAt', 'asc')
        );

        const snap = await getDocs(messagesQuery);
        setMessages(snap.docs.map(doc => {
          const data = doc.data();
          return {
            role: data.role as 'user' | 'model',
            content: data.content
          };
        }));
      } catch (err) {
        console.error('Failed to load session history:', err);
        handleFirestoreError(err, OperationType.LIST, `chat_sessions/${currentSessionId}/messages`);
      } finally {
        setIsLoadingHistory(false);
      }
    };

    loadSessionHistory();
  }, [currentSessionId, user]);

  const createNewSession = async (folderId: string | null = null) => {
    if (!user || !db) return;
    try {
      const docRef = await addDoc(collection(db, 'chat_sessions'), {
        userId: user.uid,
        folderId: folderId,
        title: 'New Neural Stream',
        createdAt: serverTimestamp()
      });
      
      const newSession: Session = {
        id: docRef.id,
        title: 'New Neural Stream',
        folderId: folderId,
        createdAt: Timestamp.now()
      };

      setSessions(prev => [newSession, ...prev]);
      setCurrentSessionId(docRef.id);
      if (folderId) {
        setExpandedFolders(prev => new Set(prev).add(folderId));
      }
    } catch (err) {
      console.error('Failed to create session:', err);
      handleFirestoreError(err, OperationType.CREATE, 'chat_sessions');
    }
  };

  const createFolder = async () => {
    if (!user || !db) return;
    const name = prompt('Folder Name:');
    if (!name) return;

    try {
      const docRef = await addDoc(collection(db, 'folders'), {
        userId: user.uid,
        name,
        createdAt: serverTimestamp()
      });
      
      const newFolder: Folder = {
        id: docRef.id,
        name,
        createdAt: Timestamp.now()
      };
      setFolders(prev => [newFolder, ...prev]);
    } catch (err) {
      console.error('Failed to create folder:', err);
      handleFirestoreError(err, OperationType.CREATE, 'folders');
    }
  };

  const toggleFolder = (id: string) => {
    setExpandedFolders(prev => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      return next;
    });
  };

  const handleSend = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim() || isTyping) return;

    const userMessage: Message = { role: 'user', content: input };
    setMessages(prev => [...prev, userMessage]);
    
    // Persist user message
    if (user && db && currentSessionId) {
      addDoc(collection(db, 'chat_sessions', currentSessionId, 'messages'), {
        userId: user.uid,
        sessionId: currentSessionId,
        role: 'user',
        content: input,
        persona: selectedPersona,
        createdAt: serverTimestamp()
      }).catch((error) => {
        console.error('Failed to persist user message:', error);
        handleFirestoreError(error, OperationType.CREATE, `chat_sessions/${currentSessionId}/messages`);
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

      // Add a placeholder message for the model response
      const modelResponsePlaceholder: Message = { role: 'model', content: '' };
      setMessages(prev => [...prev, modelResponsePlaceholder]);

      const result = await ai.models.generateContentStream({
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

      let fullResponse = '';
      
      for await (const chunk of result) {
        const chunkText = chunk.text;
        fullResponse += chunkText;
        
        // Update the last message (the placeholder) with the accumulated response
        setMessages(prev => {
          const newMessages = [...(prev || [])];
          const lastMsg = newMessages.length > 0 ? newMessages[newMessages.length - 1] : null;
          if (lastMsg && lastMsg.role === 'model') {
            lastMsg.content = fullResponse;
          }
          return newMessages;
        });
      }

      if (!fullResponse) {
        const errorMsg = "I encountered a ripple in the data stream. Please try again.";
        fullResponse = errorMsg;
        setMessages(prev => {
          const newMessages = [...(prev || [])];
          const lastMsg = newMessages.length > 0 ? newMessages[newMessages.length - 1] : null;
          if (lastMsg && lastMsg.role === 'model') {
            lastMsg.content = errorMsg;
          }
          return newMessages;
        });
      }

      // Persist model response after stream is complete
      if (user && db && currentSessionId) {
        addDoc(collection(db, 'chat_sessions', currentSessionId, 'messages'), {
          userId: user.uid,
          sessionId: currentSessionId,
          role: 'model',
          content: fullResponse,
          persona: selectedPersona,
          createdAt: serverTimestamp()
        }).catch((error) => {
          console.error('Failed to persist model response:', error);
          handleFirestoreError(error, OperationType.CREATE, `chat_sessions/${currentSessionId}/messages`);
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
    if (user && db && currentSessionId) {
      try {
        const messagesQuery = query(collection(db, 'chat_sessions', currentSessionId, 'messages'));
        const snap = await getDocs(messagesQuery);
        const batch = writeBatch(db);
        snap.docs.forEach(d => batch.delete(d.ref));
        await batch.commit();
      } catch (err) {
        console.error('Failed to clear session chat:', err);
        handleFirestoreError(err, OperationType.DELETE, `chat_sessions/${currentSessionId}/messages`);
        return;
      }
    }
    setMessages([]);
  };

  return (
    <div className="flex h-[calc(100vh-80px)] mt-20 overflow-hidden bg-[#050505]">
      {/* Sidebar */}
      <motion.div 
        initial={false}
        animate={{ width: isSidebarOpen ? 280 : 0, opacity: isSidebarOpen ? 1 : 0 }}
        className="border-r border-white/5 bg-black/20 overflow-hidden flex flex-col"
      >
        <div className="p-4 flex items-center justify-between border-b border-white/5">
          <h2 className="text-[10px] font-black tracking-[0.3em] uppercase text-white/40">Projects</h2>
          <div className="flex gap-2">
            <button onClick={() => createNewSession()} className="p-1 hover:text-cyan-400 transition-colors" title="New Stream">
              <Plus size={14} />
            </button>
            <button onClick={createFolder} className="p-1 hover:text-cyan-400 transition-colors" title="New Folder">
              <FolderPlus size={14} />
            </button>
          </div>
        </div>

        <div className="flex-1 overflow-y-auto p-2 space-y-1 custom-scrollbar">
          {isLoadingProjects && (
            <div className="p-4 text-center">
              <Loader2 size={16} className="animate-spin mx-auto text-white/20" />
            </div>
          )}

          {/* Root Sessions */}
          {(sessions || []).filter(s => !s.folderId).map(session => (
            <button
              key={session.id}
              onClick={() => setCurrentSessionId(session.id)}
              className={cn(
                "w-full flex items-center gap-3 px-3 py-2 rounded-lg text-[11px] font-bold transition-all group",
                currentSessionId === session.id 
                  ? "bg-cyan-400/10 text-cyan-400 border border-cyan-400/20" 
                  : "text-white/40 hover:text-white hover:bg-white/5"
              )}
            >
              <MessageSquare size={14} className={currentSessionId === session.id ? "text-cyan-400" : "text-white/20"} />
              <span className="truncate">{session.title}</span>
            </button>
          ))}

          {/* Folders */}
          {(folders || []).map(folder => (
            <div key={folder.id} className="space-y-1">
              <div 
                className="flex items-center gap-2 px-2 py-1.5 rounded-lg hover:bg-white/5 group cursor-pointer"
                onClick={() => toggleFolder(folder.id)}
              >
                {expandedFolders.has(folder.id) ? <ChevronDown size={14} className="text-white/20" /> : <ChevronRight size={14} className="text-white/20" />}
                {expandedFolders.has(folder.id) ? <FolderOpen size={14} className="text-cyan-400" /> : <Folder size={14} className="text-white/30" />}
                <span className="text-[11px] font-black uppercase tracking-wider text-white/60 truncate flex-1">{folder.name}</span>
                <button 
                  onClick={(e) => { e.stopPropagation(); createNewSession(folder.id); }}
                  className="opacity-0 group-hover:opacity-100 p-1 hover:text-cyan-400 transition-all"
                >
                  <Plus size={12} />
                </button>
              </div>
              
              {expandedFolders.has(folder.id) && (
                <div className="ml-4 pl-2 border-l border-white/5 space-y-1">
                  {(sessions || []).filter(s => s.folderId === folder.id).map(session => (
                    <button
                      key={session.id}
                      onClick={() => setCurrentSessionId(session.id)}
                      className={cn(
                        "w-full flex items-center gap-3 px-3 py-2 rounded-lg text-[10px] font-bold transition-all group",
                        currentSessionId === session.id 
                          ? "bg-cyan-400/10 text-cyan-400 border border-cyan-400/20" 
                          : "text-white/30 hover:text-white hover:bg-white/5"
                      )}
                    >
                      <MessageSquare size={12} className={currentSessionId === session.id ? "text-cyan-400" : "text-white/10"} />
                      <span className="truncate">{session.title}</span>
                    </button>
                  ))}
                  {(sessions || []).filter(s => s.folderId === folder.id).length === 0 && (
                    <div className="px-3 py-2 text-[10px] italic text-white/20">Empty folder</div>
                  )}
                </div>
              )}
            </div>
          ))}
        </div>

        {!user && (
          <div className="p-4 border-t border-white/5 bg-white/5">
            <p className="text-[10px] font-bold uppercase tracking-widest text-white/40 mb-3">Sync Disabled</p>
            <p className="text-[9px] text-white/20 leading-relaxed">Sign in to save and categorize your neural streams.</p>
          </div>
        )}
      </motion.div>

      {/* Main Chat Area */}
      <div className="flex-1 flex flex-col min-w-0 bg-black/40">
        <div className="max-w-4xl w-full mx-auto flex-1 flex flex-col p-6 overflow-hidden">
          <motion.div 
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            className="flex items-center justify-between mb-8 gap-4"
          >
            <div className="flex items-center gap-4">
              <button 
                onClick={() => setIsSidebarOpen(!isSidebarOpen)}
                className="p-2 hover:bg-white/5 rounded-lg border border-white/5 transition-all text-white/40"
              >
                <MoreVertical size={20} className={isSidebarOpen ? "rotate-90" : ""} />
              </button>
              <div className="p-2 bg-cyan-400/10 rounded-xl border border-cyan-400/20">
                <Bot className="text-cyan-400" size={24} />
              </div>
              <div className="text-left">
                <h1 className="text-xl font-black italic tracking-tighter text-white uppercase">
                  {(sessions || []).find(s => s.id === currentSessionId)?.title || "Neural Navigator"}
                </h1>
                <p className="text-[8px] tracking-[0.3em] text-white/30 uppercase font-bold">Deep Sea Synchronization</p>
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
                <Trash2 size={18} />
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

              {!isLoadingHistory && !currentSessionId && (
                <div className="h-full flex flex-col items-center justify-center text-center space-y-6 opacity-40">
                  <Sparkles size={48} className="text-cyan-400 animate-pulse" />
                  <div className="space-y-4 max-w-xs">
                    <p className="text-xl font-black italic text-white uppercase">No Active Stream</p>
                    <p className="text-[10px] font-black tracking-[0.2em] uppercase text-white/40 leading-loose">
                      Initialize a new project from the sidebar to begin your digital dive.
                    </p>
                    <button 
                      onClick={() => createNewSession()}
                      className="px-6 py-3 bg-cyan-400 text-black font-black uppercase tracking-[0.2em] text-[10px] rounded-xl hover:brightness-110 transition-all"
                    >
                      New Neural Stream
                    </button>
                  </div>
                </div>
              )}

              {!isLoadingHistory && currentSessionId && (messages || []).length === 0 && (
                <div className="h-full flex flex-col items-center justify-center text-center space-y-6 opacity-40">
                  <Brain size={48} className="text-white animate-pulse" />
                  <div className="space-y-2">
                    <p className="text-xl font-black italic text-white uppercase">Awaiting Synapse</p>
                    <p className="text-sm font-light tracking-widest uppercase text-white/40">Transmit your first directive</p>
                  </div>
                </div>
              )}

              {!isLoadingHistory && currentSessionId && (
                <AnimatePresence initial={false}>
                {(messages || []).map((msg, idx) => (
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
                    <div className={`max-w-[85%] p-4 rounded-2xl text-sm leading-relaxed text-left shadow-xl ${
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

            {/* Quick Tools */}
            {currentSessionId && (messages || []).length > 0 && (
              <div className="px-4 pb-2 flex gap-2 overflow-x-auto no-scrollbar">
                {(mcpTools || []).map((tool) => (
                  <button
                    key={tool.id}
                    onClick={() => setInput(tool.prompt)}
                    className="flex items-center gap-1.5 px-3 py-1.5 bg-white/5 border border-white/10 rounded-full text-[9px] font-black uppercase tracking-widest text-white/40 hover:bg-white/10 hover:text-cyan-400 hover:border-cyan-400/30 transition-all whitespace-nowrap"
                  >
                    <tool.icon size={10} />
                    {tool.name}
                  </button>
                ))}
              </div>
            )}

            <form onSubmit={handleSend} className="p-4 bg-black/40 border-t border-white/10 flex gap-4">
              <input 
                type="text" 
                value={input}
                onChange={(e) => setInput(e.target.value)}
                disabled={!currentSessionId}
                placeholder={currentSessionId ? "Ask the AI Surfer anything..." : "Select a stream to begin..."}
                className="flex-1 bg-white/5 border border-white/10 rounded-xl px-6 py-4 focus:border-cyan-400 outline-none transition-colors text-white disabled:opacity-50"
              />
              <button 
                type="submit"
                disabled={isTyping || !input.trim() || !currentSessionId}
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
      </div>
    </div>
  );
}
