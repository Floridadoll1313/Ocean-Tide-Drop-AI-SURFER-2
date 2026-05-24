import React, { useState, useEffect } from "react";
import PageWrapper from "../../components/PageWrapper";
import { Headphones, Mail, MessageSquare, ArrowRight, ShieldCheck, Activity, Plus, Bot, Ticket, Search, Send, CheckCircle2, Terminal } from "lucide-react";
import { motion, AnimatePresence } from "motion/react";

export default function Support() {
  const [activeTab, setActiveTab] = useState<'faq' | 'contact' | 'status' | 'chat' | 'ticket' | 'logs'>('faq');
  const [expandedFaq, setExpandedFaq] = useState<number | null>(null);
  const [faqSearch, setFaqSearch] = useState('');

  const [chatMessages, setChatMessages] = useState<{role: 'user' | 'bot', text: string}[]>([
    { role: 'bot', text: 'Initialize sequence... Support matrix online. How may I assist your traversal today?' }
  ]);
  const [chatInput, setChatInput] = useState('');
  const [isBotTyping, setIsBotTyping] = useState(false);

  const [ticketSubject, setTicketSubject] = useState('');
  const [ticketBody, setTicketBody] = useState('');
  const [ticketSubmitted, setTicketSubmitted] = useState(false);

  const [submittedTickets, setSubmittedTickets] = useState<{id: string, subject: string, date: string, status: string}[]>([
    { id: 'TKT-8942', subject: 'Cognitive node mismatch on workspace import', date: '2026-05-21', status: 'Resolved' },
    { id: 'TKT-9104', subject: 'Requesting API quota increase', date: '2026-05-22', status: 'In Progress' }
  ]);

  const [supportLogs, setSupportLogs] = useState<{timestamp: string, event: string, level: string}[]>([
    { timestamp: '11:42:01', event: 'SYSTEM: Initialized autonomous diagnostic sweep.', level: 'INFO' },
    { timestamp: '11:45:22', event: 'NETWORK: Verified stable handshake with origin nodes.', level: 'INFO' },
    { timestamp: '11:51:09', event: 'SUPPORT: User initiated knowledge base query.', level: 'ACTION' }
  ]);

  useEffect(() => {
    const interval = setInterval(() => {
      const now = new Date();
      const timeStr = `${now.getHours().toString().padStart(2, '0')}:${now.getMinutes().toString().padStart(2, '0')}:${now.getSeconds().toString().padStart(2, '0')}`;
      setSupportLogs(prev => [...prev.slice(-15), { timestamp: timeStr, event: 'SYSTEM: Routine background parity check aligned.', level: 'INFO' }]);
    }, 15000);
    return () => clearInterval(interval);
  }, []);

  const handleSendSupportChat = (e: React.FormEvent) => {
    e.preventDefault();
    if (!chatInput.trim()) return;
    setChatMessages(prev => [...prev, { role: 'user', text: chatInput }]);
    
    const now = new Date();
    const timeStr = `${now.getHours().toString().padStart(2, '0')}:${now.getMinutes().toString().padStart(2, '0')}:${now.getSeconds().toString().padStart(2, '0')}`;
    setSupportLogs(prev => [...prev.slice(-15), { timestamp: timeStr, event: 'CHAT: User dispatched query to AI Node.', level: 'ACTION' }]);

    setChatInput('');
    setIsBotTyping(true);
    setTimeout(() => {
       setIsBotTyping(false);
       setChatMessages(prev => [...prev, { role: 'bot', text: 'I have processed your query through the central node. It appears human oversight is optimal here—please initialize a ticket if the issue persists.' }]);
       
       const nextNow = new Date();
       const nextTimeStr = `${nextNow.getHours().toString().padStart(2, '0')}:${nextNow.getMinutes().toString().padStart(2, '0')}:${nextNow.getSeconds().toString().padStart(2, '0')}`;
       setSupportLogs(prev => [...prev.slice(-15), { timestamp: nextTimeStr, event: 'CHAT: AI Node resolved conversational block.', level: 'INFO' }]);
    }, 1500);
  };

  const handleSubmitTicket = (e: React.FormEvent) => {
     e.preventDefault();
     if (!ticketSubject.trim() || !ticketBody.trim()) return;
     setTicketSubmitted(true);
     
     const newTicket = {
       id: `TKT-${Math.floor(Math.random() * 9000) + 1000}`,
       subject: ticketSubject,
       date: new Date().toISOString().split('T')[0],
       status: 'Open'
     };
     setSubmittedTickets(prev => [newTicket, ...prev]);

     const now = new Date();
     const timeStr = `${now.getHours().toString().padStart(2, '0')}:${now.getMinutes().toString().padStart(2, '0')}:${now.getSeconds().toString().padStart(2, '0')}`;
     setSupportLogs(prev => [...prev.slice(-15), { timestamp: timeStr, event: `TICKET: Entity initialized portal record ${newTicket.id}.`, level: 'ACTION' }]);

     setTimeout(() => {
        setTicketSubject('');
        setTicketBody('');
        setTicketSubmitted(false);
     }, 3000);
  };

  const faqs = [
    { question: "How fast is customer support?", answer: "Our priority SLA guarantees structural analysis and initial response within 15 minutes for enterprise tier users, and under 2 hours for premium members." },
    { question: "Can I upgrade my tier mid-cycle?", answer: "Yes. Tier progression is completely fluid. Your billing cycle will be prorated based on the millisecond you transition into the required tier." },
    { question: "Are my workspace connections secure?", answer: "Absolutely. All API handshakes and workspace tokens run exclusively on AES-256 gated neural networks, with zero-knowledge policies fully enforced." },
    { question: "How do I revoke tool access?", answer: "Navigate to your Profile settings array, locate 'Active Integrations,' and initiate a complete disconnect command to drop all tokens simultaneously." },
    { question: "Do you offer on-premise deployments?", answer: "Yes, for Enterprise customers. We can deploy our cognitive engine nodes directly to your secure intranet environment. Contact sales via our ticket portal." },
    { question: "What happens if I exceed my usage limits?", answer: "Systems will gracefully degrade. You will not be overcharged, but generation speeds may throttle until your next cycle or manual upgrade." },
    { question: "Is multi-party collaboration supported?", answer: "Multi-user sync is natively supported across all standard tooling. Permissions can be managed within the members panel." }
  ];

  const filteredFaqs = faqs.filter(f => f.question.toLowerCase().includes(faqSearch.toLowerCase()) || f.answer.toLowerCase().includes(faqSearch.toLowerCase()));

  return (
    <PageWrapper maxWidth="max-w-7xl">
      <div className="w-full px-6 py-24 min-h-[80vh] flex flex-col pt-32 relative">
        <div className="absolute top-40 left-0 w-96 h-96 bg-cyan-500/10 blur-[120px] rounded-full pointer-events-none" />
        <div className="absolute bottom-0 right-0 w-96 h-96 bg-purple-500/10 blur-[120px] rounded-full pointer-events-none" />

        <div className="max-w-3xl mb-16 relative z-10">
          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-5xl md:text-7xl font-black uppercase text-white tracking-tighter mb-6"
          >
            Customer <span className="text-cyan-400">Support</span>
          </motion.h1>
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-zinc-400 font-medium text-lg max-w-xl"
          >
            Access priority channels, system diagnostics, and our enterprise knowledge base. We ensure absolute continuity for your operations.
          </motion.p>
        </div>

        <div className="grid lg:grid-cols-12 gap-12 relative z-10">
          <div className="lg:col-span-4 space-y-4">
            <button 
              onClick={() => setActiveTab('faq')}
              className={`w-full p-6 text-left border transition-all flex justify-between items-center ${activeTab === 'faq' ? 'bg-cyan-950/30 border-cyan-500/30 text-white' : 'bg-white/5 border-white/5 text-zinc-400 hover:border-white/20'}`}
            >
              <span className="font-black uppercase tracking-widest text-sm flex items-center gap-3">
                <MessageSquare className="w-4 h-4" /> FAQ Array
              </span>
              {activeTab === 'faq' && <ArrowRight className="w-4 h-4 text-cyan-400" />}
            </button>
            <button 
              onClick={() => setActiveTab('chat')}
              className={`w-full p-6 text-left border transition-all flex justify-between items-center ${activeTab === 'chat' ? 'bg-cyan-950/30 border-cyan-500/30 text-white' : 'bg-white/5 border-white/5 text-zinc-400 hover:border-white/20'}`}
            >
              <span className="font-black uppercase tracking-widest text-sm flex items-center gap-3">
                <Bot className="w-4 h-4" /> AI Support Node
              </span>
              {activeTab === 'chat' && <ArrowRight className="w-4 h-4 text-cyan-400" />}
            </button>
            <button 
              onClick={() => setActiveTab('ticket')}
              className={`w-full p-6 text-left border transition-all flex justify-between items-center ${activeTab === 'ticket' ? 'bg-cyan-950/30 border-cyan-500/30 text-white' : 'bg-white/5 border-white/5 text-zinc-400 hover:border-white/20'}`}
            >
              <span className="font-black uppercase tracking-widest text-sm flex items-center gap-3">
                <Ticket className="w-4 h-4" /> Support Tickets
              </span>
              {activeTab === 'ticket' && <ArrowRight className="w-4 h-4 text-cyan-400" />}
            </button>
            <button 
              onClick={() => setActiveTab('contact')}
              className={`w-full p-6 text-left border transition-all flex justify-between items-center ${activeTab === 'contact' ? 'bg-cyan-950/30 border-cyan-500/30 text-white' : 'bg-white/5 border-white/5 text-zinc-400 hover:border-white/20'}`}
            >
              <span className="font-black uppercase tracking-widest text-sm flex items-center gap-3">
                <Headphones className="w-4 h-4" /> Direct Contact
              </span>
              {activeTab === 'contact' && <ArrowRight className="w-4 h-4 text-cyan-400" />}
            </button>
            <button 
              onClick={() => setActiveTab('status')}
              className={`w-full p-6 text-left border transition-all flex justify-between items-center ${activeTab === 'status' ? 'bg-cyan-950/30 border-cyan-500/30 text-white' : 'bg-white/5 border-white/5 text-zinc-400 hover:border-white/20'}`}
            >
              <span className="font-black uppercase tracking-widest text-sm flex items-center gap-3">
                <Activity className="w-4 h-4" /> System Status
              </span>
              {activeTab === 'status' && <ArrowRight className="w-4 h-4 text-cyan-400" />}
            </button>
            <button 
              onClick={() => setActiveTab('logs')}
              className={`w-full p-6 text-left border transition-all flex justify-between items-center ${activeTab === 'logs' ? 'bg-cyan-950/30 border-cyan-500/30 text-white' : 'bg-white/5 border-white/5 text-zinc-400 hover:border-white/20'}`}
            >
              <span className="font-black uppercase tracking-widest text-sm flex items-center gap-3">
                <Terminal className="w-4 h-4" /> System Logs
              </span>
              {activeTab === 'logs' && <ArrowRight className="w-4 h-4 text-cyan-400" />}
            </button>
          </div>

          <div className="lg:col-span-8 bg-black border border-white/10 p-8 md:p-12 min-h-[400px]">
            <AnimatePresence mode="wait">
              {activeTab === 'faq' && (
                <motion.div
                  key="faq"
                  initial={{ opacity: 0, x: 10 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -10 }}
                  className="space-y-4"
                >
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-8 pb-4 border-b border-white/10 gap-4">
                    <h2 className="text-2xl font-black uppercase text-cyan-400">Knowledge Base Matrix</h2>
                    <div className="relative relative w-full sm:w-64">
                      <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-zinc-500" />
                      <input 
                        type="text" 
                        value={faqSearch}
                        onChange={(e) => setFaqSearch(e.target.value)}
                        placeholder="Search matrix..." 
                        className="w-full bg-black border border-white/10 text-white pl-10 pr-4 py-2 font-mono text-xs focus:border-cyan-400/50 outline-none transition-colors"
                      />
                    </div>
                  </div>
                  {filteredFaqs.length === 0 ? (
                    <div className="text-center py-10 text-zinc-500 font-mono text-xs">No records found matching your query.</div>
                  ) : (
                    filteredFaqs.map((faq, idx) => (
                      <div key={idx} className="border border-white/10 bg-white/5 rounded overflow-hidden">
                        <button 
                          onClick={() => setExpandedFaq(expandedFaq === idx ? null : idx)}
                          className="w-full text-left p-6 font-bold text-white flex justify-between items-center hover:bg-white/5 transition-colors"
                        >
                          {faq.question}
                          <Plus className={`w-4 h-4 text-cyan-400 transition-transform ${expandedFaq === idx ? 'rotate-45' : ''}`} />
                        </button>
                        <AnimatePresence>
                          {expandedFaq === idx && (
                            <motion.div
                              initial={{ height: 0, opacity: 0 }}
                              animate={{ height: 'auto', opacity: 1 }}
                              exit={{ height: 0, opacity: 0 }}
                              className="bg-black/50"
                            >
                              <p className="p-6 pt-0 text-sm xl leading-relaxed text-zinc-400 font-medium">
                                {faq.answer}
                              </p>
                            </motion.div>
                          )}
                        </AnimatePresence>
                      </div>
                    ))
                  )}
                </motion.div>
              )}

              {activeTab === 'chat' && (
                <motion.div
                  key="chat"
                  initial={{ opacity: 0, x: 10 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -10 }}
                  className="flex flex-col h-full min-h-[400px]"
                >
                  <div className="flex items-center justify-between gap-3 mb-6 pb-4 border-b border-white/10 flex-wrap">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 bg-cyan-900/50 border border-cyan-500/50 rounded-full flex items-center justify-center shrink-0">
                        <Bot className="w-5 h-5 text-cyan-400" />
                      </div>
                      <div>
                        <h2 className="text-xl font-black uppercase text-white leading-none">Automated Connect</h2>
                        <span className="text-[10px] font-mono text-cyan-400">STATUS: ONLINE / REACTIVE</span>
                      </div>
                    </div>
                    <a 
                      href="https://t.me/boost/oceantidedropaisolutions"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="px-4 py-2 bg-gradient-to-r from-cyan-500/10 to-teal-500/20 hover:from-cyan-400 hover:to-teal-400 border border-cyan-400/30 text-cyan-400 hover:text-black font-black uppercase text-[10px] tracking-widest rounded-full transition-all duration-300 shadow-[0_0_15px_rgba(34,211,238,0.15)] hover:shadow-[0_0_20px_rgba(34,211,238,0.4)]"
                    >
                      Launch Website Bot &rarr;
                    </a>
                  </div>
                  
                  <div className="flex-1 bg-white/5 border border-white/10 rounded overflow-hidden flex flex-col pt-4">
                    <div className="flex-1 px-4 overflow-y-auto space-y-4 pb-4">
                      {chatMessages.map((msg, idx) => (
                        <div key={idx} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                          <div className={`max-w-[80%] p-4 rounded-xl text-sm ${msg.role === 'user' ? 'bg-cyan-500/20 text-white border border-cyan-500/50 rounded-br-none' : 'bg-white/10 text-zinc-300 border border-white/20 rounded-bl-none'}`}>
                            {msg.text}
                          </div>
                        </div>
                      ))}
                      {isBotTyping && (
                         <div className="flex justify-start">
                           <div className="bg-white/10 text-zinc-300 border border-white/20 p-4 rounded-xl rounded-bl-none flex items-center gap-2">
                             <span className="w-1.5 h-1.5 bg-cyan-400 rounded-full animate-bounce" style={{ animationDelay: '0ms' }} />
                             <span className="w-1.5 h-1.5 bg-cyan-400 rounded-full animate-bounce" style={{ animationDelay: '150ms' }} />
                             <span className="w-1.5 h-1.5 bg-cyan-400 rounded-full animate-bounce" style={{ animationDelay: '300ms' }} />
                           </div>
                         </div>
                      )}
                    </div>
                    <form onSubmit={handleSendSupportChat} className="p-3 border-t border-white/10 bg-black flex gap-3">
                      <input 
                        type="text" 
                        value={chatInput}
                        onChange={(e) => setChatInput(e.target.value)}
                        placeholder="State your query..." 
                        className="flex-1 bg-white/5 border border-white/10 text-white px-4 py-3 text-sm focus:border-cyan-400/50 outline-none rounded"
                      />
                      <button type="submit" disabled={isBotTyping} className="bg-cyan-500/20 text-cyan-400 border border-cyan-500/50 px-6 py-3 rounded hover:bg-cyan-400 hover:text-black font-black uppercase text-xs tracking-widest transition-colors flex items-center gap-2 disabled:opacity-50">
                        <Send className="w-4 h-4" /> Send
                      </button>
                    </form>
                  </div>
                </motion.div>
              )}

              {activeTab === 'ticket' && (
                <motion.div
                  key="ticket"
                  initial={{ opacity: 0, x: 10 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -10 }}
                >
                  <h2 className="text-2xl font-black uppercase text-cyan-400 mb-8 border-b border-white/10 pb-4">Support Portal</h2>
                  
                  <div className="mb-10">
                    <h3 className="text-sm font-black uppercase text-zinc-500 mb-4 tracking-widest">Active Tickets</h3>
                    <div className="space-y-3">
                       {submittedTickets.map(ticket => (
                         <div key={ticket.id} className="p-4 border border-white/5 bg-white/5 flex items-center justify-between rounded hover:bg-white/10 transition-colors cursor-pointer">
                           <div>
                             <span className="text-xs font-mono text-cyan-400 block mb-1">{ticket.id}</span>
                             <span className="text-sm font-medium text-white">{ticket.subject}</span>
                           </div>
                           <div className="text-right">
                             <span className="text-xs text-zinc-500 block mb-1">{ticket.date}</span>
                             <span className={`text-[10px] font-black uppercase tracking-widest px-2 py-1 rounded inline-block ${ticket.status === 'Resolved' ? 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/30' : 'bg-amber-500/20 text-amber-400 border border-amber-500/30'}`}>{ticket.status}</span>
                           </div>
                         </div>
                       ))}
                    </div>
                  </div>

                  <h3 className="text-sm font-black uppercase text-zinc-500 mb-4 tracking-widest">Submit New Ticket</h3>
                  {ticketSubmitted ? (
                    <div className="flex flex-col items-center justify-center py-20 text-center bg-white/5 border border-white/10 rounded">
                      <CheckCircle2 className="w-16 h-16 text-emerald-400 mb-6" />
                      <h3 className="text-xl font-bold text-white mb-2 uppercase tracking-widest">Portal Record Created</h3>
                      <p className="text-zinc-400">Our engineers have received your ticket and will process it shortly.</p>
                    </div>
                  ) : (
                    <form onSubmit={handleSubmitTicket} className="space-y-6">
                      <div>
                        <label className="block text-xs font-black uppercase tracking-widest text-zinc-500 mb-2">Subject Header</label>
                        <input 
                          type="text" 
                          required
                          value={ticketSubject}
                          onChange={(e) => setTicketSubject(e.target.value)}
                          placeholder="e.g. Cognitive node timeout..."
                          className="w-full bg-white/5 border border-white/10 text-white p-4 focus:border-cyan-400/50 outline-none rounded"
                        />
                      </div>
                      <div>
                        <label className="block text-xs font-black uppercase tracking-widest text-zinc-500 mb-2">Diagnostic Data / Summary</label>
                        <textarea 
                          required
                          value={ticketBody}
                          onChange={(e) => setTicketBody(e.target.value)}
                          placeholder="Provide trace details or specific issues encountered..."
                          rows={6}
                          className="w-full bg-white/5 border border-white/10 text-white p-4 focus:border-cyan-400/50 outline-none rounded resize-none"
                        ></textarea>
                      </div>
                      <div className="flex justify-end">
                        <button type="submit" className="bg-white text-black px-8 py-4 font-black uppercase text-sm tracking-widest hover:bg-cyan-400 transition-colors">
                          Initialize Ticket &rarr;
                        </button>
                      </div>
                    </form>
                  )}
                </motion.div>
              )}

              {activeTab === 'contact' && (
                <motion.div
                  key="contact"
                  initial={{ opacity: 0, x: 10 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -10 }}
                >
                   <h2 className="text-2xl font-black uppercase text-cyan-400 mb-8 border-b border-white/10 pb-4">Direct Communication Links</h2>
                   <div className="grid md:grid-cols-2 gap-6">
                     <div className="p-8 border border-white/10 bg-white/5 hover:border-cyan-400/50 transition-colors group">
                        <Mail className="w-8 h-8 text-cyan-400 mb-4 group-hover:scale-110 transition-transform" />
                        <h3 className="text-lg font-black uppercase text-white mb-2">Priority Email</h3>
                        <p className="text-xs text-zinc-400 mb-6">General strategy questions and account billing.</p>
                        <a href="mailto:support@aisurfer.com" className="text-sm font-bold text-cyan-400 uppercase tracking-widest hover:text-white transition-colors">
                          support@aisurfer.com &rarr;
                        </a>
                     </div>
                     <div className="p-8 border border-white/10 bg-white/5 hover:border-purple-400/50 transition-colors group">
                        <ShieldCheck className="w-8 h-8 text-purple-400 mb-4 group-hover:scale-110 transition-transform" />
                        <h3 className="text-lg font-black uppercase text-white mb-2">Emergency Hub</h3>
                        <p className="text-xs text-zinc-400 mb-6">For immediate enterprise outages only.</p>
                        <span className="text-sm font-bold text-purple-400 uppercase tracking-widest">
                          +1 800 MATRIX
                        </span>
                     </div>
                   </div>
                </motion.div>
              )}

              {activeTab === 'status' && (
                <motion.div
                  key="status"
                  initial={{ opacity: 0, x: 10 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -10 }}
                >
                   <div className="flex items-center justify-between mb-8 border-b border-white/10 pb-4">
                     <h2 className="text-2xl font-black uppercase text-cyan-400">System Metrics</h2>
                     <div className="flex items-center gap-2 px-3 py-1 bg-emerald-950/50 border border-emerald-500/20 text-emerald-400 text-xs font-black uppercase tracking-widest rounded">
                       <span className="w-2 h-2 bg-emerald-500 rounded-full animate-pulse" /> All Systems Nominal
                     </div>
                   </div>
                   
                   <div className="space-y-4">
                     {[
                       { name: "Cognitive Neural Hub", status: "Operational", uptime: "99.99%" },
                       { name: "Workspace Connectors", status: "Operational", uptime: "99.98%" },
                       { name: "Generation Matrices", status: "Operational", uptime: "100.0%" },
                       { name: "Authentication Gateway", status: "Operational", uptime: "99.95%" },
                     ].map((sys, idx) => (
                       <div key={idx} className="flex flex-col sm:flex-row sm:items-center justify-between p-4 bg-white/5 border border-white/5 rounded">
                         <span className="font-bold text-white text-sm uppercase tracking-wide mb-2 sm:mb-0">{sys.name}</span>
                         <div className="flex items-center gap-6">
                           <span className="text-emerald-400 text-xs font-bold uppercase tracking-widest">{sys.status}</span>
                           <span className="text-zinc-500 text-xs font-mono w-16 text-right">Uptime: {sys.uptime}</span>
                         </div>
                       </div>
                     ))}
                   </div>
                </motion.div>
              )}

              {activeTab === 'logs' && (
                <motion.div
                  key="logs"
                  initial={{ opacity: 0, x: 10 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -10 }}
                >
                   <div className="flex items-center justify-between mb-8 border-b border-white/10 pb-4">
                     <h2 className="text-2xl font-black uppercase text-cyan-400">Automated Support Logs</h2>
                     <span className="text-[10px] font-mono text-cyan-500 uppercase tracking-widest bg-cyan-950/40 px-2 py-1 border border-cyan-500/20 rounded">Real-time Streamed</span>
                   </div>
                   
                   <div className="space-y-2 h-[400px] overflow-y-auto custom-scrollbar pr-2 flex flex-col-reverse">
                     {[...supportLogs].reverse().map((log, idx) => (
                       <div key={idx} className="flex gap-4 p-3 bg-white/5 border border-white/5 rounded text-xs font-mono hover:bg-white/10 transition-colors">
                         <span className="text-zinc-500 shrink-0 shadow-none">[{log.timestamp}]</span>
                         <span className={`${log.level === 'ACTION' ? 'text-cyan-400 font-bold' : 'text-zinc-300'}`}>{log.event}</span>
                       </div>
                     ))}
                   </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>
      </div>
    </PageWrapper>
  );
}
