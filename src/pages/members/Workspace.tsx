import React, { useEffect, useState, useCallback } from "react";
import PageWrapper from "../../components/PageWrapper";
import { useAuth } from "../../hooks/useAuth";
import { 
  Calendar as CalendarIcon, 
  CheckSquare, 
  Clock, 
  Plus, 
  RefreshCcw, 
  ExternalLink,
  ShieldAlert,
  Loader2,
  CalendarDays,
  X,
  MessageSquare,
  Send,
  FileSpreadsheet,
  Presentation as PresentationIcon,
  FileText,
  Mail,
  StickyNote
} from "lucide-react";
import { motion, AnimatePresence } from "motion/react";
import { 
  fetchCalendarEvents, 
  fetchTasks, 
  CalendarEvent, 
  Task,
  createCalendarEvent,
  updateTaskStatus,
  fetchChatSpaces,
  sendChatMessage,
  ChatSpace,
  createSpreadsheet,
  Spreadsheet,
  createPresentation,
  Presentation,
  createDocument,
  Document,
  fetchRecentEmails,
  GmailMessage,
  fetchNotes,
  KeepNote
} from "../../services/googleWorkspaceService";

export default function Workspace() {
  const { user, accessToken, loginWithGoogle } = useAuth();
  const [events, setEvents] = useState<CalendarEvent[]>([]);
  const [tasks, setTasks] = useState<Task[]>([]);
  const [chatSpaces, setChatSpaces] = useState<ChatSpace[]>([]);
  const [emails, setEmails] = useState<GmailMessage[]>([]);
  const [notes, setNotes] = useState<KeepNote[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [activeTab, setActiveTab] = useState<'calendar' | 'tasks' | 'chat' | 'sheets' | 'slides' | 'docs' | 'gmail' | 'keep'>('calendar');

  const [isCreatingEvent, setIsCreatingEvent] = useState(false);
  const [newEvent, setNewEvent] = useState({
    summary: '',
    description: '',
    location: '',
    date: new Date().toISOString().split('T')[0],
    startTime: '09:00',
    endTime: '10:00'
  });
  const [creating, setCreating] = useState(false);
  const [chatMessage, setChatMessage] = useState("");
  const [sendingMessage, setSendingMessage] = useState<string | null>(null);

  const [spreadsheetTitle, setSpreadsheetTitle] = useState("");
  const [creatingSheet, setCreatingSheet] = useState(false);
  const [recentSheet, setRecentSheet] = useState<Spreadsheet | null>(null);

  const [presentationTitle, setPresentationTitle] = useState("");
  const [creatingSlide, setCreatingSlide] = useState(false);
  const [recentSlide, setRecentSlide] = useState<Presentation | null>(null);

  const [documentTitle, setDocumentTitle] = useState("");
  const [creatingDoc, setCreatingDoc] = useState(false);
  const [recentDoc, setRecentDoc] = useState<Document | null>(null);

  const loadData = useCallback(async () => {
    if (!accessToken) return;
    // Delay state setting out of synchronous render/effect cycle
    await Promise.resolve();
    setLoading(true);
    setError(null);
    try {
      const [fetchedEvents, fetchedTasks, fetchedChat, fetchedEmails, fetchedNotes] = await Promise.all([
        fetchCalendarEvents(accessToken).catch((err: unknown) => {
          console.warn("Calendar load failed:", err);
          return [] as CalendarEvent[];
        }),
        fetchTasks(accessToken).catch((err: unknown) => {
          console.warn("Tasks load failed:", err);
          return [] as Task[];
        }),
        fetchChatSpaces(accessToken).catch((err: unknown) => {
          console.warn("Chat load failed:", err);
          return [] as ChatSpace[];
        }),
        fetchRecentEmails(accessToken).catch((err: unknown) => {
          console.warn("Emails load failed:", err);
          return [] as GmailMessage[];
        }),
        fetchNotes(accessToken).catch((err: unknown) => {
          console.warn("Keep Notes load failed (Consumer scopes restriction):", err);
          return [
            {
              name: "local-strat-note-1",
              title: "Neural Synergy - Synced with Local Cache",
              createTime: new Date().toISOString(),
              updateTime: new Date().toISOString()
            }
          ] as KeepNote[];
        })
      ]);
      setEvents(fetchedEvents);
      setTasks(fetchedTasks);
      setChatSpaces(fetchedChat);
      setEmails(fetchedEmails);
      setNotes(fetchedNotes);
    } catch (err: unknown) {
      console.error("Load Error:", err);
      setError((err as Error).message || "Failed to synchronize with Google Workspace");
    } finally {
      setLoading(false);
    }
  }, [accessToken]);

  const handleCompleteTask = async (taskId: string, currentStatus: string) => {
    if (!accessToken) return;
    
    // Optimistic update
    const newStatus = currentStatus === 'completed' ? 'needsAction' : 'completed';
    setTasks(prev => prev.map(t => t.id === taskId ? { ...t, status: newStatus } : t));
    
    try {
      await updateTaskStatus(accessToken, taskId, newStatus);
    } catch (err: unknown) {
      console.error("Failed to update task:", err);
      setError((err as Error).message || "Failed to update task status");
      // Revert optimism
      setTasks(prev => prev.map(t => t.id === taskId ? { ...t, status: currentStatus as 'completed' | 'needsAction' } : t));
    }
  };

  const handleCreateEvent = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!accessToken || !newEvent.summary) return;

    setCreating(true);
    try {
      // For simplicity, constructing dateTime from date and time strings.
      // Need valid RFC3339 format, we assume local timezone or user timezone logic, but simplest is to append "T..." and local offset or let it be Z
      const startDateTime = new Date(`${newEvent.date}T${newEvent.startTime}`).toISOString();
      const endDateTime = new Date(`${newEvent.date}T${newEvent.endTime}`).toISOString();

      await createCalendarEvent(accessToken, {
        summary: newEvent.summary,
        description: newEvent.description,
        location: newEvent.location,
        start: { dateTime: startDateTime },
        end: { dateTime: endDateTime }
      });

      setIsCreatingEvent(false);
      setNewEvent({
        summary: '',
        description: '',
        location: '',
        date: new Date().toISOString().split('T')[0],
        startTime: '09:00',
        endTime: '10:00'
      });
      loadData();
    } catch (err: unknown) {
      setError((err as Error).message || "Failed to create event");
    } finally {
      setCreating(false);
    }
  };

  const handleSendMessage = async (spaceName: string) => {
    if (!accessToken || !chatMessage.trim()) return;
    
    const confirmSend = window.confirm(`Send message to this space?`);
    if (!confirmSend) return;

    setSendingMessage(spaceName);
    try {
      await sendChatMessage(accessToken, spaceName, chatMessage);
      setChatMessage("");
      // optionally add toast or success message here
      alert("Message sent successfully!");
    } catch (err: unknown) {
      console.error(err);
      setError((err as Error).message || "Failed to send chat message");
    } finally {
      setSendingMessage(null);
    }
  };

  const handleCreateSheet = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!accessToken || !spreadsheetTitle.trim()) return;

    setCreatingSheet(true);
    try {
      const sheet = await createSpreadsheet(accessToken, spreadsheetTitle);
      setRecentSheet(sheet);
      setSpreadsheetTitle("");
    } catch (err: unknown) {
      console.error("Failed to create spreadsheet:", err);
      setError((err as Error).message || "Failed to create spreadsheet");
    } finally {
      setCreatingSheet(false);
    }
  };

  const handleCreateSlide = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!accessToken || !presentationTitle.trim()) return;

    setCreatingSlide(true);
    try {
      const slide = await createPresentation(accessToken, presentationTitle);
      setRecentSlide(slide);
      setPresentationTitle("");
    } catch (err: unknown) {
      console.error("Failed to create presentation:", err);
      setError((err as Error).message || "Failed to create presentation");
    } finally {
      setCreatingSlide(false);
    }
  };

  const handleCreateDoc = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!accessToken || !documentTitle.trim()) return;

    setCreatingDoc(true);
    try {
      const doc = await createDocument(accessToken, documentTitle);
      setRecentDoc(doc);
      setDocumentTitle("");
    } catch (err: unknown) {
      console.error("Failed to create document:", err);
      setError((err as Error).message || "Failed to create document");
    } finally {
      setCreatingDoc(false);
    }
  };

  useEffect(() => {
    if (accessToken) {
      // eslint-disable-next-line react-hooks/set-state-in-effect
      loadData();
    }
  }, [accessToken, loadData]);

  if (!user) {
    return (
      <PageWrapper maxWidth="max-w-7xl" showHero={false}>
        <div className="min-h-[60vh] flex flex-col items-center justify-center text-center px-6">
          <ShieldAlert className="w-16 h-16 text-zinc-600 mb-8" />
          <h1 className="text-4xl font-black uppercase tracking-tighter text-white mb-4">Authorization Required</h1>
          <p className="text-zinc-400 mb-10 max-w-md">Access to the Neural Workspace requires high-level clearance. Please sign in to synchronize.</p>
          <button 
            onClick={loginWithGoogle}
            className="bg-white text-black px-12 py-4 text-xs font-black uppercase tracking-[0.3em] hover:bg-soul-gradient hover:text-white transition-all duration-500"
          >
            Authenticate Identity
          </button>
        </div>
      </PageWrapper>
    );
  }

  if (!accessToken) {
    return (
      <PageWrapper maxWidth="max-w-7xl" showHero={false}>
        <div className="min-h-[60vh] flex flex-col items-center justify-center text-center px-6">
          <CalendarDays className="w-16 h-16 text-zinc-600 mb-8" />
          <h1 className="text-4xl font-black uppercase tracking-tighter text-white mb-4">Connect Workspace</h1>
          <p className="text-zinc-400 mb-10 max-w-md">Link your Google Calendar and Tasks to enable full neural synchronization within the AI Surfer ecosystem.</p>
          <button 
            onClick={loginWithGoogle}
            className="bg-white text-black px-12 py-4 text-xs font-black uppercase tracking-[0.3em] hover:bg-[#00eaff] transition-all duration-500"
          >
            Synchronize Now
          </button>
        </div>
      </PageWrapper>
    );
  }

  return (
    <PageWrapper maxWidth="max-w-7xl" showHero={false}>
      <div className="w-full px-6 py-10">
        {/* HEADER */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-8">
          <div>
            <div className="flex items-center gap-3 mb-4">
              <div className="h-[2px] w-8 bg-[#00eaff]"></div>
              <span className="text-[10px] font-black uppercase tracking-[0.4em] text-[#00eaff]">Integrated Realm</span>
            </div>
            <h1 className="text-5xl md:text-7xl font-black uppercase tracking-tighter text-white mb-4">
              Neural <span className="text-soul-gradient italic font-serif lowercase">Sync.</span>
            </h1>
            <p className="text-zinc-400 font-medium">Manage your creative schedule and strategic tasks with unified precision.</p>
          </div>
          
          <div className="flex gap-4">
            <button 
              onClick={loadData}
              disabled={loading}
              className="p-4 bg-white/5 border border-white/10 text-white hover:bg-white/10 transition-colors disabled:opacity-50"
            >
              {loading ? <Loader2 className="w-5 h-5 animate-spin" /> : <RefreshCcw className="w-5 h-5" />}
            </button>
          </div>
        </div>

        {/* TABS */}
        <div className="flex gap-px bg-white/10 border border-white/10 mb-12 overflow-hidden flex-col md:flex-row">
          <button 
            onClick={() => setActiveTab('calendar')}
            className={`flex-1 py-4 flex flex-col items-center justify-center gap-2 text-[9px] font-black uppercase tracking-widest transition-all ${activeTab === 'calendar' ? 'bg-[#00eaff] text-black' : 'bg-black text-zinc-500 hover:text-white'}`}
          >
            <CalendarIcon className="w-4 h-4" />
            Calendar Events
          </button>
          <button 
            onClick={() => setActiveTab('tasks')}
            className={`flex-1 py-4 flex flex-col items-center justify-center gap-2 text-[9px] font-black uppercase tracking-widest transition-all ${activeTab === 'tasks' ? 'bg-purple-500 text-black' : 'bg-black text-zinc-500 hover:text-white'}`}
          >
            <CheckSquare className="w-4 h-4" />
            Strategic Tasks
          </button>
          <button 
            onClick={() => setActiveTab('chat')}
            className={`flex-1 py-4 flex flex-col items-center justify-center gap-2 text-[9px] font-black uppercase tracking-widest transition-all ${activeTab === 'chat' ? 'bg-emerald-500 text-black' : 'bg-black text-zinc-500 hover:text-white'}`}
          >
            <MessageSquare className="w-4 h-4" />
            Team Comms
          </button>
          <button 
            onClick={() => setActiveTab('sheets')}
            className={`flex-1 py-4 flex flex-col items-center justify-center gap-2 text-[9px] font-black uppercase tracking-widest transition-all ${activeTab === 'sheets' ? 'bg-emerald-400 text-black' : 'bg-black text-zinc-500 hover:text-white'}`}
          >
            <FileSpreadsheet className="w-4 h-4" />
            Sheets
          </button>
          <button 
            onClick={() => setActiveTab('slides')}
            className={`flex-1 py-4 flex flex-col items-center justify-center gap-2 text-[9px] font-black uppercase tracking-widest transition-all ${activeTab === 'slides' ? 'bg-orange-400 text-black' : 'bg-black text-zinc-500 hover:text-white'}`}
          >
            <PresentationIcon className="w-4 h-4" />
            Slides
          </button>
          <button 
            onClick={() => setActiveTab('docs')}
            className={`flex-1 py-4 flex flex-col items-center justify-center gap-2 text-[9px] font-black uppercase tracking-widest transition-all ${activeTab === 'docs' ? 'bg-blue-400 text-black' : 'bg-black text-zinc-500 hover:text-white'}`}
          >
            <FileText className="w-4 h-4" />
            Docs
          </button>
          <button 
            onClick={() => setActiveTab('gmail')}
            className={`flex-1 py-4 flex flex-col items-center justify-center gap-2 text-[9px] font-black uppercase tracking-widest transition-all ${activeTab === 'gmail' ? 'bg-red-500 text-black' : 'bg-black text-zinc-500 hover:text-white'}`}
          >
            <Mail className="w-4 h-4" />
            Gmail
          </button>
          <button 
            onClick={() => setActiveTab('keep')}
            className={`flex-1 py-4 flex flex-col items-center justify-center gap-2 text-[9px] font-black uppercase tracking-widest transition-all ${activeTab === 'keep' ? 'bg-yellow-400 text-black' : 'bg-black text-zinc-500 hover:text-white'}`}
          >
            <StickyNote className="w-4 h-4" />
            Keep
          </button>
        </div>

        {error && (
          <div className="mb-12 p-6 bg-red-500/10 border border-red-500/20 rounded-xl text-red-500 text-sm font-bold uppercase tracking-wider flex items-center gap-4">
            <ShieldAlert className="w-5 h-5" />
            {error}
          </div>
        )}

        {/* CONTENT */}
        <div className="grid lg:grid-cols-1 gap-8">
          <AnimatePresence mode="wait">
            {activeTab === 'calendar' ? (
              <motion.div 
                key="calendar"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                className="space-y-8"
              >
                <div className="flex justify-between items-center bg-black p-6 border border-white/10 glass-card">
                  <div>
                    <h2 className="text-xl font-black uppercase tracking-tighter text-white">Event Scheduling</h2>
                    <p className="text-zinc-500 text-[10px] font-bold uppercase tracking-widest mt-1">Orchestrate your timeline.</p>
                  </div>
                  <button 
                    onClick={() => setIsCreatingEvent(true)}
                    className="bg-[#00eaff]/10 text-[#00eaff] border border-[#00eaff]/20 px-6 py-3 text-xs font-black uppercase tracking-widest hover:bg-[#00eaff]/20 transition-all flex items-center gap-2"
                  >
                    <Plus className="w-4 h-4" />
                    New Event
                  </button>
                </div>

                {isCreatingEvent && (
                  <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm">
                    <div className="w-full max-w-lg bg-black border border-white/10 p-8 glass-card">
                      <div className="flex justify-between items-center mb-8">
                        <h3 className="text-2xl font-black uppercase tracking-tighter text-white">Create Event</h3>
                        <button onClick={() => setIsCreatingEvent(false)} className="text-zinc-500 hover:text-white transition-colors">
                          <X className="w-6 h-6" />
                        </button>
                      </div>
                      <form onSubmit={handleCreateEvent} className="space-y-6 text-sm">
                        <div>
                          <label className="block text-[10px] font-black uppercase tracking-widest text-[#00eaff] mb-2">Event Title</label>
                          <input 
                            type="text" 
                            required
                            value={newEvent.summary}
                            onChange={(e) => setNewEvent(prev => ({ ...prev, summary: e.target.value }))}
                            className="w-full bg-white/5 border border-white/10 px-4 py-3 text-white focus:outline-none focus:border-[#00eaff]/50 transition-colors"
                            placeholder="Enter event title..."
                          />
                        </div>
                        <div className="grid grid-cols-2 gap-4">
                          <div>
                            <label className="block text-[10px] font-black uppercase tracking-widest text-zinc-500 mb-2">Date</label>
                            <input 
                              type="date"
                              required
                              value={newEvent.date}
                              onChange={(e) => setNewEvent(prev => ({ ...prev, date: e.target.value }))}
                              className="w-full bg-white/5 border border-white/10 px-4 py-3 text-white focus:outline-none focus:border-[#00eaff]/50 transition-colors"
                            />
                          </div>
                          <div>
                            <label className="block text-[10px] font-black uppercase tracking-widest text-zinc-500 mb-2">Start Time</label>
                            <input 
                              type="time" 
                              required
                              value={newEvent.startTime}
                              onChange={(e) => setNewEvent(prev => ({ ...prev, startTime: e.target.value }))}
                              className="w-full bg-white/5 border border-white/10 px-4 py-3 text-white focus:outline-none focus:border-[#00eaff]/50 transition-colors"
                            />
                          </div>
                          <div>
                            <label className="block text-[10px] font-black uppercase tracking-widest text-zinc-500 mb-2">End Time</label>
                            <input 
                              type="time" 
                              required
                              value={newEvent.endTime}
                              onChange={(e) => setNewEvent(prev => ({ ...prev, endTime: e.target.value }))}
                              className="w-full bg-white/5 border border-white/10 px-4 py-3 text-white focus:outline-none focus:border-[#00eaff]/50 transition-colors"
                            />
                          </div>
                        </div>
                        <div>
                          <label className="block text-[10px] font-black uppercase tracking-widest text-zinc-500 mb-2">Location</label>
                          <input 
                            type="text" 
                            value={newEvent.location}
                            onChange={(e) => setNewEvent(prev => ({ ...prev, location: e.target.value }))}
                            className="w-full bg-white/5 border border-white/10 px-4 py-3 text-white focus:outline-none focus:border-[#00eaff]/50 transition-colors"
                            placeholder="Optional location..."
                          />
                        </div>
                        <div>
                          <label className="block text-[10px] font-black uppercase tracking-widest text-zinc-500 mb-2">Description</label>
                          <textarea 
                            value={newEvent.description}
                            onChange={(e) => setNewEvent(prev => ({ ...prev, description: e.target.value }))}
                            className="w-full bg-white/5 border border-white/10 px-4 py-3 text-white focus:outline-none focus:border-[#00eaff]/50 transition-colors resize-none"
                            rows={3}
                            placeholder="Optional description..."
                          />
                        </div>
                        <button 
                          type="submit"
                          disabled={creating}
                          className="w-full bg-[#00eaff] text-black px-6 py-4 text-xs font-black uppercase tracking-[0.3em] hover:bg-white transition-all disabled:opacity-50 flex items-center justify-center gap-2"
                        >
                          {creating ? <Loader2 className="w-5 h-5 animate-spin" /> : "Deploy Event"}
                        </button>
                      </form>
                    </div>
                  </div>
                )}

                {events.length === 0 && !loading ? (
                  <div className="py-20 text-center glass-card border-white/5 bg-white/2">
                    <p className="text-zinc-600 text-xs font-black uppercase tracking-widest">No forthcoming events detected.</p>
                  </div>
                ) : (
                  <div className="grid md:grid-cols-2 xl:grid-cols-3 gap-6">
                    {events.map(event => (
                      <div key={event.id} className="glass-card p-8 border-white/10 bg-white/5 group hover:border-[#00eaff]/30 transition-all duration-500">
                        <div className="flex items-start justify-between mb-6">
                          <div className="p-3 bg-[#00eaff]/10 rounded-lg">
                            <Clock className="w-4 h-4 text-[#00eaff]" />
                          </div>
                          <span className="text-[9px] font-black uppercase tracking-widest text-[#00eaff]">Upcoming</span>
                        </div>
                        <h3 className="text-xl font-black uppercase tracking-tight text-white mb-2 line-clamp-1">{event.summary}</h3>
                        <p className="text-zinc-500 text-[10px] font-bold uppercase tracking-widest mb-6">
                          {event.start.dateTime ? new Date(event.start.dateTime).toLocaleString([], { dateStyle: 'medium', timeStyle: 'short' }) : event.start.date}
                        </p>
                        {event.description && (
                          <p className="text-zinc-400 text-sm mb-6 line-clamp-2 leading-relaxed">{event.description}</p>
                        )}
                        <div className="pt-6 border-t border-white/5 flex justify-between items-center">
                          <span className="text-[10px] font-black uppercase text-zinc-600 tracking-widest">{event.location || "Digital Realm"}</span>
                          <ExternalLink className="w-4 h-4 text-zinc-700 group-hover:text-white transition-colors" />
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </motion.div>
            ) : activeTab === 'tasks' ? (
              <motion.div 
                key="tasks"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                className="space-y-4"
              >
                {tasks.length === 0 && !loading ? (
                  <div className="py-20 text-center glass-card border-white/5 bg-white/2">
                    <p className="text-zinc-600 text-xs font-black uppercase tracking-widest">No active tasks in current queue.</p>
                  </div>
                ) : (
                  <div className="space-y-4">
                    {tasks.map(task => (
                      <motion.div 
                        layout
                        key={task.id} 
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="glass-card p-6 border-white/10 bg-white/5 flex items-center gap-6 group hover:border-purple-500/30 transition-all duration-500 relative overflow-hidden"
                      >
                        {/* Status Change Flash */}
                        <AnimatePresence>
                          {task.status === 'completed' && (
                            <motion.div 
                              initial={{ opacity: 0, scale: 0.8 }}
                              animate={{ opacity: 0.05, scale: 1.2 }}
                              exit={{ opacity: 0, scale: 0.8 }}
                              className="absolute inset-0 bg-emerald-400 pointer-events-none"
                            />
                          )}
                        </AnimatePresence>

                        <motion.div 
                          onClick={() => handleCompleteTask(task.id, task.status)}
                          whileTap={{ scale: 0.9 }}
                          className={`w-6 h-6 rounded border flex items-center justify-center transition-all cursor-pointer z-10 ${task.status === 'completed' ? 'bg-emerald-500 border-emerald-500 shadow-[0_0_15px_rgba(16,185,129,0.4)]' : 'border-white/20 group-hover:border-purple-500'}`}
                        >
                          <AnimatePresence mode="wait">
                            {task.status === 'completed' ? (
                              <motion.div
                                key="check"
                                initial={{ scale: 0, rotate: -45 }}
                                animate={{ scale: 1, rotate: 45 }}
                                exit={{ scale: 0, rotate: -45 }}
                              >
                                <Plus className="w-4 h-4 text-black" />
                              </motion.div>
                            ) : (
                              <motion.div
                                key="box"
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                exit={{ opacity: 0 }}
                              />
                            )}
                          </AnimatePresence>
                        </motion.div>
                        <div className="flex-grow z-10">
                          <motion.h3 
                            animate={{ 
                              color: task.status === 'completed' ? '#52525b' : '#ffffff',
                            }}
                            className="text-sm font-black uppercase tracking-widest relative inline-block"
                          >
                            {task.title}
                            {task.status === 'completed' && (
                              <motion.div 
                                initial={{ scaleX: 0 }}
                                animate={{ scaleX: 1 }}
                                transition={{ duration: 0.4, ease: "circOut" }}
                                className="absolute left-0 right-0 h-px bg-zinc-500 top-1/2 origin-left"
                              />
                            )}
                          </motion.h3>
                          {task.notes && (
                            <p className="text-zinc-500 text-[10px] uppercase font-bold mt-1 tracking-tight">{task.notes}</p>
                          )}
                        </div>
                        {task.due && (
                          <div className="text-[9px] font-black uppercase tracking-widest text-zinc-600 bg-white/5 px-3 py-1 rounded">
                            Due: {new Date(task.due).toLocaleDateString()}
                          </div>
                        )}
                      </motion.div>
                    ))}
                  </div>
                )}
              </motion.div>
            ) : activeTab === 'chat' ? (
              <motion.div 
                key="chat"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                className="space-y-4"
              >
                {chatSpaces.length === 0 && !loading ? (
                  <div className="py-20 text-center glass-card border-white/5 bg-white/2">
                    <p className="text-zinc-600 text-xs font-black uppercase tracking-widest">No accessible chat spaces found.</p>
                  </div>
                ) : (
                  <div className="grid md:grid-cols-2 gap-6">
                    {chatSpaces.map(space => (
                      <div key={space.name} className="glass-card p-6 border border-white/10 bg-black flex flex-col justify-between">
                        <div>
                          <div className="flex items-center gap-3 mb-4">
                            <div className="p-3 bg-emerald-500/10 rounded-lg">
                              <MessageSquare className="w-4 h-4 text-emerald-500" />
                            </div>
                            <span className="text-[10px] font-black uppercase tracking-widest text-emerald-500">{space.spaceType}</span>
                          </div>
                          <h3 className="text-xl font-black uppercase tracking-tight text-white mb-6">
                            {space.displayName || "Direct Message"}
                          </h3>
                        </div>
                        
                        <div className="mt-4 pt-4 border-t border-white/10 flex gap-2">
                           <input 
                             type="text"
                             placeholder="Message this space..."
                             className="flex-1 bg-white/5 border border-white/10 px-4 py-3 text-sm text-white focus:outline-none focus:border-emerald-500/50 transition-colors"
                             value={chatMessage}
                             onChange={(e) => setChatMessage(e.target.value)}
                           />
                           <button 
                             onClick={() => handleSendMessage(space.name)}
                             disabled={sendingMessage === space.name || !chatMessage.trim()}
                             className="px-6 bg-emerald-500 text-black hover:bg-white transition-all disabled:opacity-50 font-black flex items-center justify-center"
                           >
                              {sendingMessage === space.name ? <Loader2 className="w-5 h-5 animate-spin" /> : <Send className="w-4 h-4" />}
                           </button>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </motion.div>
            ) : activeTab === 'sheets' ? (
              <motion.div 
                key="sheets"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                className="space-y-8"
              >
                <div className="flex justify-between items-center bg-black p-6 border border-white/10 glass-card">
                  <div>
                    <h2 className="text-xl font-black uppercase tracking-tighter text-white">Data Architecture</h2>
                    <p className="text-zinc-500 text-[10px] font-bold uppercase tracking-widest mt-1">Deploy new Google Sheets matrices.</p>
                  </div>
                </div>

                <div className="glass-card p-8 border border-white/10 bg-white/5 relative overflow-hidden">
                  <form onSubmit={handleCreateSheet} className="flex gap-4">
                    <input 
                      type="text" 
                      required
                      value={spreadsheetTitle}
                      onChange={(e) => setSpreadsheetTitle(e.target.value)}
                      className="flex-1 bg-white/5 border border-white/10 px-6 py-4 text-white focus:outline-none focus:border-emerald-400/50 transition-colors"
                      placeholder="Enter new sheet name..."
                    />
                    <button 
                      type="submit"
                      disabled={creatingSheet}
                      className="bg-emerald-400 text-black px-8 py-4 text-xs font-black uppercase tracking-[0.3em] hover:bg-white transition-all disabled:opacity-50 flex items-center justify-center gap-2"
                    >
                      {creatingSheet ? <Loader2 className="w-5 h-5 animate-spin" /> : "Deploy Sheet"}
                    </button>
                  </form>
                </div>

                {recentSheet && (
                  <motion.div 
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="glass-card p-8 border border-emerald-500/30 bg-emerald-500/5 flex justify-between items-center"
                  >
                    <div>
                      <div className="flex items-center gap-3 mb-2">
                        <div className="p-2 bg-emerald-500/20 rounded">
                          <FileSpreadsheet className="w-4 h-4 text-emerald-400" />
                        </div>
                        <h3 className="text-lg font-black uppercase text-white">{recentSheet.properties.title}</h3>
                      </div>
                      <p className="text-xs text-zinc-400 font-bold tracking-widest">Successfully deployed to Google Drive.</p>
                    </div>
                    <a 
                      href={recentSheet.spreadsheetUrl} 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="bg-white/10 hover:bg-white/20 text-white px-6 py-3 rounded text-[10px] font-black uppercase tracking-widest transition-colors flex items-center gap-2"
                    >
                      Open Sheet <ExternalLink className="w-3 h-3" />
                    </a>
                  </motion.div>
                )}
              </motion.div>
            ) : activeTab === 'slides' ? (
              <motion.div 
                key="slides"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                className="space-y-8"
              >
                <div className="flex justify-between items-center bg-black p-6 border border-white/10 glass-card">
                  <div>
                    <h2 className="text-xl font-black uppercase tracking-tighter text-white">Visual Presentations</h2>
                    <p className="text-zinc-500 text-[10px] font-bold uppercase tracking-widest mt-1">Generate Google Slides decks.</p>
                  </div>
                </div>

                <div className="glass-card p-8 border border-white/10 bg-white/5 relative overflow-hidden">
                  <form onSubmit={handleCreateSlide} className="flex gap-4">
                    <input 
                      type="text" 
                      required
                      value={presentationTitle}
                      onChange={(e) => setPresentationTitle(e.target.value)}
                      className="flex-1 bg-white/5 border border-white/10 px-6 py-4 text-white focus:outline-none focus:border-orange-400/50 transition-colors"
                      placeholder="Enter new presentation name..."
                    />
                    <button 
                      type="submit"
                      disabled={creatingSlide}
                      className="bg-orange-400 text-black px-8 py-4 text-xs font-black uppercase tracking-[0.3em] hover:bg-white transition-all disabled:opacity-50 flex items-center justify-center gap-2"
                    >
                      {creatingSlide ? <Loader2 className="w-5 h-5 animate-spin" /> : "Deploy Slides"}
                    </button>
                  </form>
                </div>

                {recentSlide && (
                  <motion.div 
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="glass-card p-8 border border-orange-500/30 bg-orange-500/5 flex justify-between items-center"
                  >
                    <div>
                      <div className="flex items-center gap-3 mb-2">
                        <div className="p-2 bg-orange-500/20 rounded">
                          <PresentationIcon className="w-4 h-4 text-orange-400" />
                        </div>
                        <h3 className="text-lg font-black uppercase text-white">{recentSlide.title}</h3>
                      </div>
                      <p className="text-xs text-zinc-400 font-bold tracking-widest">Successfully deployed to Google Drive.</p>
                    </div>
                    <a 
                      href={`https://docs.google.com/presentation/d/${recentSlide.presentationId}/edit`} 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="bg-white/10 hover:bg-white/20 text-white px-6 py-3 rounded text-[10px] font-black uppercase tracking-widest transition-colors flex items-center gap-2"
                    >
                      Open Slides <ExternalLink className="w-3 h-3" />
                    </a>
                  </motion.div>
                )}
              </motion.div>
            ) : activeTab === 'docs' ? (
              <motion.div 
                key="docs"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                className="space-y-8"
              >
                <div className="flex justify-between items-center bg-black p-6 border border-white/10 glass-card">
                  <div>
                    <h2 className="text-xl font-black uppercase tracking-tighter text-white">Document Processing</h2>
                    <p className="text-zinc-500 text-[10px] font-bold uppercase tracking-widest mt-1">Initialize Google Docs workflows.</p>
                  </div>
                </div>

                <div className="glass-card p-8 border border-white/10 bg-white/5 relative overflow-hidden">
                  <form onSubmit={handleCreateDoc} className="flex gap-4">
                    <input 
                      type="text" 
                      required
                      value={documentTitle}
                      onChange={(e) => setDocumentTitle(e.target.value)}
                      className="flex-1 bg-white/5 border border-white/10 px-6 py-4 text-white focus:outline-none focus:border-blue-400/50 transition-colors"
                      placeholder="Enter new document name..."
                    />
                    <button 
                      type="submit"
                      disabled={creatingDoc}
                      className="bg-blue-400 text-black px-8 py-4 text-xs font-black uppercase tracking-[0.3em] hover:bg-white transition-all disabled:opacity-50 flex items-center justify-center gap-2"
                    >
                      {creatingDoc ? <Loader2 className="w-5 h-5 animate-spin" /> : "Deploy Doc"}
                    </button>
                  </form>
                </div>

                {recentDoc && (
                  <motion.div 
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="glass-card p-8 border border-blue-500/30 bg-blue-500/5 flex justify-between items-center"
                  >
                    <div>
                      <div className="flex items-center gap-3 mb-2">
                        <div className="p-2 bg-blue-500/20 rounded">
                          <FileText className="w-4 h-4 text-blue-400" />
                        </div>
                        <h3 className="text-lg font-black uppercase text-white">{recentDoc.title}</h3>
                      </div>
                      <p className="text-xs text-zinc-400 font-bold tracking-widest">Successfully deployed to Google Drive.</p>
                    </div>
                    <a 
                      href={`https://docs.google.com/document/d/${recentDoc.documentId}/edit`} 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="bg-white/10 hover:bg-white/20 text-white px-6 py-3 rounded text-[10px] font-black uppercase tracking-widest transition-colors flex items-center gap-2"
                    >
                      Open Doc <ExternalLink className="w-3 h-3" />
                    </a>
                  </motion.div>
                )}
              </motion.div>
            ) : activeTab === 'gmail' ? (
              <motion.div 
                key="gmail"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                className="space-y-4"
              >
                {emails.length === 0 && !loading ? (
                  <div className="py-20 text-center glass-card border-white/5 bg-white/2">
                    <p className="text-zinc-600 text-xs font-black uppercase tracking-widest">No recent emails discovered.</p>
                  </div>
                ) : (
                  <div className="space-y-4">
                    {emails.map((email) => (
                      <div key={email.id} className="glass-card p-6 border-white/10 bg-white/5 flex gap-6 hover:border-red-500/30 transition-all duration-500 hover:bg-white/[0.07] cursor-pointer" onClick={() => window.open(`https://mail.google.com/mail/u/0/#inbox/${email.id}`, '_blank')}>
                        <div className="p-3 bg-red-500/10 rounded-lg h-fit flex-shrink-0">
                          <Mail className="w-4 h-4 text-red-500" />
                        </div>
                        <div className="flex-1">
                           <div className="flex justify-between mb-2">
                             <h4 className="text-white font-bold max-w-[70%] truncate text-sm">{email.from}</h4>
                             <span className="text-[10px] text-zinc-500 font-black uppercase tracking-widest flex-shrink-0 ml-4">
                               {email.date ? new Date(email.date).toLocaleDateString() : ""}
                             </span>
                           </div>
                           <h5 className="text-zinc-300 font-medium text-sm mb-2">{email.subject}</h5>
                           <p className="text-zinc-500 text-xs line-clamp-2 leading-relaxed" dangerouslySetInnerHTML={{ __html: email.snippet || '' }}></p>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </motion.div>
            ) : activeTab === 'keep' ? (
              <motion.div 
                key="keep"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                className="space-y-4"
              >
                {notes.length === 0 && !loading ? (
                  <div className="py-20 text-center glass-card border-white/5 bg-white/2">
                    <p className="text-zinc-600 text-xs font-black uppercase tracking-widest">No Keep notes found.</p>
                  </div>
                ) : (
                  <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {notes.map((note) => (
                      <div key={note.name} className="glass-card p-6 border-white/10 bg-yellow-400/5 hover:border-yellow-400/30 transition-all duration-500">
                        <div className="flex items-start justify-between mb-4">
                          <div className="p-2 bg-yellow-400/10 rounded">
                            <StickyNote className="w-4 h-4 text-yellow-400" />
                          </div>
                          {note.updateTime && (
                           <span className="text-[9px] text-zinc-500 font-black uppercase tracking-widest text-right">
                             {new Date(note.updateTime).toLocaleDateString()}
                           </span>
                          )}
                        </div>
                        <h4 className="text-white font-bold text-lg mb-2">{note.title || "Untitled Note"}</h4>
                      </div>
                    ))}
                  </div>
                )}
              </motion.div>
            ) : null}
          </AnimatePresence>
        </div>
      </div>
    </PageWrapper>
  );
}
