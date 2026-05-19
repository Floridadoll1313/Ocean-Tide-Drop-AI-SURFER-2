import React, { useState, useEffect, useRef } from "react";
import { db } from "../lib/firebase";
import { 
  collection, 
  addDoc, 
  query, 
  orderBy, 
  limit, 
  onSnapshot, 
  serverTimestamp,
  Timestamp 
} from "firebase/firestore";
import { useAuth } from "../hooks/useAuth";
import { Send, MessageSquare } from "lucide-react";

interface Message {
  id: string;
  text: string;
  uid: string;
  displayName: string;
  photoURL: string;
  createdAt: Timestamp;
}

export default function Chat() {
  const { user } = useAuth();
  const [messages, setMessages] = useState<Message[]>([]);
  const [newMessage, setNewMessage] = useState("");
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const q = query(
      collection(db, "chat_messages"),
      orderBy("created_at", "asc"),
      limit(50)
    );

    const unsubscribe = onSnapshot(q, (snapshot) => {
      const msgs = snapshot.docs.map((doc) => {
        const data = doc.data();
        return {
          id: doc.id,
          text: data.content,
          uid: data.user_id,
          displayName: data.username,
          createdAt: data.created_at,
        };
      }) as Message[];
      setMessages(msgs);
    });

    return () => unsubscribe();
  }, []);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages]);

  const handleSend = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newMessage.trim() || !user) return;

    try {
      await addDoc(collection(db, "chat_messages"), {
        content: newMessage,
        user_id: user.uid,
        username: user.displayName || user.email?.split('@')[0] || "Anonymous",
        created_at: serverTimestamp(),
      });
      setNewMessage("");
    } catch (error) {
      console.error("Error sending message:", error);
    }
  };

  return (
    <div className="flex flex-col h-[500px] bg-black border border-white/10 rounded-sm overflow-hidden accent-glow-purple">
      {/* Header */}
      <div className="p-4 border-b border-white/5 flex items-center justify-between bg-white/5 backdrop-blur-md">
        <div className="flex items-center gap-3">
          <MessageSquare className="w-4 h-4 text-soul-gradient" />
          <h3 className="text-[10px] font-black uppercase tracking-widest text-white">Frequency Chat</h3>
        </div>
        <div className="flex items-center gap-2">
           <div className="w-1.5 h-1.5 rounded-full bg-cyan-400 animate-pulse shadow-[0_0_10px_#00eaff]"></div>
           <span className="text-[8px] font-black uppercase text-zinc-500 tracking-widest">Live Sync</span>
        </div>
      </div>

      {/* Messages */}
      <div 
        ref={scrollRef}
        className="flex-1 overflow-y-auto p-4 space-y-4 scrollbar-hide bg-gradient-to-b from-transparent to-purple-900/5"
      >
        {messages.length === 0 ? (
          <div className="flex flex-col items-center justify-center h-full opacity-20">
             <MessageSquare className="w-8 h-8 mb-2" />
             <span className="text-[10px] font-black uppercase tracking-widest">No transmissions yet</span>
          </div>
        ) : (
          messages.map((msg) => (
            <div 
              key={msg.id} 
              className={`flex flex-col ${msg.uid === user?.uid ? 'items-end' : 'items-start'}`}
            >
              <div className="flex items-center gap-2 mb-1">
                 <span className="text-[8px] font-black uppercase text-zinc-600">{msg.displayName}</span>
              </div>
              <div 
                className={`max-w-[80%] p-3 text-xs font-medium leading-relaxed rounded-sm border ${
                  msg.uid === user?.uid 
                    ? 'bg-white text-black border-white shadow-[0_0_15px_rgba(255,255,255,0.1)]' 
                    : 'bg-zinc-900/80 backdrop-blur-sm text-white border-white/5'
                }`}
              >
                {msg.text}
              </div>
            </div>
          ))
        )}
      </div>

      {/* Input */}
      <form onSubmit={handleSend} className="p-4 border-t border-white/5 bg-white/5 flex gap-2">
        <input 
          type="text" 
          value={newMessage}
          onChange={(e) => setNewMessage(e.target.value)}
          placeholder="SEND TRANSMISSION..." 
          className="flex-1 bg-black border border-white/10 px-4 py-3 text-[10px] font-black tracking-widest text-white focus:outline-none focus:border-purple-500 transition-all uppercase"
        />
        <button 
          type="submit"
          className="p-3 bg-white text-black hover:bg-soul-gradient hover:text-white transition-all rounded-sm flex items-center justify-center"
        >
          <Send className="w-4 h-4" />
        </button>
      </form>
    </div>
  );
}
