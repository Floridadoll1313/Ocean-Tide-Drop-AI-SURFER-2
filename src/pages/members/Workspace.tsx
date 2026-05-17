import React, { useEffect, useState } from "react";
import PageWrapper from "../../components/PageWrapper";
import { useAuth } from "../../hooks/useAuth";
import { 
  Calendar, 
  CheckSquare, 
  Clock, 
  Plus, 
  RefreshCcw, 
  ExternalLink,
  ShieldAlert,
  Loader2,
  CalendarDays,
  Layout,
  X
} from "lucide-react";
import { motion, AnimatePresence } from "motion/react";
import { 
  fetchCalendarEvents, 
  fetchTasks, 
  CalendarEvent, 
  Task,
  createCalendarEvent,
  createTask,
  updateTaskStatus
} from "../../services/googleWorkspaceService";

export default function Workspace() {
  const { user, accessToken, loginWithGoogle } = useAuth();
  const [events, setEvents] = useState<CalendarEvent[]>([]);
  const [tasks, setTasks] = useState<Task[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [activeTab, setActiveTab] = useState<'calendar' | 'tasks'>('calendar');

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

  const loadData = async () => {
    if (!accessToken) return;
    setLoading(true);
    setError(null);
    try {
      const [fetchedEvents, fetchedTasks] = await Promise.all([
        fetchCalendarEvents(accessToken),
        fetchTasks(accessToken)
      ]);
      setEvents(fetchedEvents);
      setTasks(fetchedTasks);
    } catch (err: any) {
      console.error("Load Error:", err);
      setError(err.message || "Failed to synchronize with Google Workspace");
    } finally {
      setLoading(false);
    }
  };

  const handleCompleteTask = async (taskId: string, currentStatus: string) => {
    if (!accessToken) return;
    
    // Optimistic update
    const newStatus = currentStatus === 'completed' ? 'needsAction' : 'completed';
    setTasks(prev => prev.map(t => t.id === taskId ? { ...t, status: newStatus } : t));
    
    try {
      await updateTaskStatus(accessToken, taskId, newStatus);
    } catch (err: any) {
      console.error("Failed to update task:", err);
      setError(err.message || "Failed to update task status");
      // Revert optimism
      setTasks(prev => prev.map(t => t.id === taskId ? { ...t, status: currentStatus as any } : t));
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
    } catch (err: any) {
      setError(err.message || "Failed to create event");
    } finally {
      setCreating(false);
    }
  };

  useEffect(() => {
    if (accessToken) {
      loadData();
    }
  }, [accessToken]);

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
        <div className="flex gap-px bg-white/10 border border-white/10 mb-12 overflow-hidden">
          <button 
            onClick={() => setActiveTab('calendar')}
            className={`flex-1 py-6 flex items-center justify-center gap-3 text-[10px] font-black uppercase tracking-widest transition-all ${activeTab === 'calendar' ? 'bg-[#00eaff] text-black' : 'bg-black text-zinc-500 hover:text-white'}`}
          >
            <Calendar className="w-4 h-4" />
            Calendar Events
          </button>
          <button 
            onClick={() => setActiveTab('tasks')}
            className={`flex-1 py-6 flex items-center justify-center gap-3 text-[10px] font-black uppercase tracking-widest transition-all ${activeTab === 'tasks' ? 'bg-purple-500 text-black' : 'bg-black text-zinc-500 hover:text-white'}`}
          >
            <CheckSquare className="w-4 h-4" />
            Strategic Tasks
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
            ) : (
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
                      <div key={task.id} className="glass-card p-6 border-white/10 bg-white/5 flex items-center gap-6 group hover:border-purple-500/30 transition-all duration-500">
                        <div 
                          onClick={() => handleCompleteTask(task.id, task.status)}
                          className={`w-6 h-6 rounded border flex items-center justify-center transition-colors cursor-pointer ${task.status === 'completed' ? 'bg-emerald-500 border-emerald-500' : 'border-white/20 group-hover:border-purple-500'}`}
                        >
                          {task.status === 'completed' && <Plus className="w-4 h-4 text-black rotate-45" />}
                        </div>
                        <div className="flex-grow">
                          <h3 
                            className={`text-sm font-black uppercase tracking-widest ${task.status === 'completed' ? 'text-zinc-600 line-through' : 'text-white'}`}
                          >
                            {task.title}
                          </h3>
                          {task.notes && (
                            <p className="text-zinc-500 text-[10px] uppercase font-bold mt-1 tracking-tight">{task.notes}</p>
                          )}
                        </div>
                        {task.due && (
                          <div className="text-[9px] font-black uppercase tracking-widest text-zinc-600 bg-white/5 px-3 py-1 rounded">
                            Due: {new Date(task.due).toLocaleDateString()}
                          </div>
                        )}
                      </div>
                    ))}
                  </div>
                )}
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </PageWrapper>
  );
}
