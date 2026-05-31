import React, { useState, useEffect, useRef } from 'react';
import { MessageSquare, X, Send, Sparkles, Mic, MicOff, Image as ImageIcon } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { useNavigate } from 'react-router-dom';

const simVoiceTriggers = [
  { label: "🔊 High Tide", phrase: "play high tide" },
  { label: "🔊 Deep Swell", phrase: "play deep swell" },
  { label: "🔊 Coral Reef", phrase: "play coral reef" },
  { label: "💳 Tip Jar", phrase: "open tip jar" },
  { label: "📋 Query Tools", phrase: "query tools" },
  { label: "🛠️ Best Practices", phrase: "go to mcp" },
  { label: "🏠 Home Hub", phrase: "go to home" }
];

interface SpeechResultEvent {
  results: {
    [key: number]: {
      [key: number]: {
        transcript: string;
      };
    };
  };
}

interface SpeechErrorEvent {
  error: string;
}

export default function AIAssistant() {
  const navigate = useNavigate();
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<{role: 'user' | 'assistant', content: string, image?: string}[]>([
    { role: 'assistant', content: "Hello! I am your AI Surfer guide. Try my new Voice-To-Text feature, tap simulated shortcuts, or ask me to 'generate image of [something]'!" }
  ]);
  const [input, setInput] = useState('');
  const [isThinking, setIsThinking] = useState(false);

  // Voice State
  const [isListening, setIsListening] = useState(false);
  const [speechError, setSpeechError] = useState<string | null>(null);
  const recognitionRef = useRef<unknown>(null);

  // Sound system play
  const playAudioSynth = (type: string) => {
    try {
      const AudioCtxClass = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
      const ctx = new AudioCtxClass();
      const now = ctx.currentTime;

      if (type === "high-tide") {
        const freqs = [261.63, 329.63, 392.00, 523.25];
        const filter = ctx.createBiquadFilter();
        filter.type = "lowpass";
        filter.frequency.setValueAtTime(1200, now);
        filter.connect(ctx.destination);
        freqs.forEach(f => {
          const osc = ctx.createOscillator();
          const gain = ctx.createGain();
          osc.type = "triangle";
          osc.frequency.setValueAtTime(f, now);
          gain.gain.setValueAtTime(0, now);
          gain.gain.linearRampToValueAtTime(0.08, now + 0.1);
          gain.gain.exponentialRampToValueAtTime(0.001, now + 1.2);
          osc.connect(gain);
          gain.connect(filter);
          osc.start(now);
          osc.stop(now + 1.4);
        });
      } else if (type === "deep-swell") {
        const freqs = [65.41, 98.00];
        const filter = ctx.createBiquadFilter();
        filter.type = "lowpass";
        filter.frequency.setValueAtTime(100, now);
        filter.frequency.exponentialRampToValueAtTime(500, now + 0.15);
        filter.frequency.exponentialRampToValueAtTime(120, now + 0.8);
        filter.connect(ctx.destination);
        freqs.forEach(f => {
          const osc = ctx.createOscillator();
          const gain = ctx.createGain();
          osc.type = "square";
          osc.frequency.setValueAtTime(f, now);
          gain.gain.setValueAtTime(0, now);
          gain.gain.linearRampToValueAtTime(0.12, now + 0.05);
          gain.gain.exponentialRampToValueAtTime(0.001, now + 0.9);
          osc.connect(gain);
          gain.connect(filter);
          osc.start(now);
          osc.stop(now + 1.0);
        });
      } else if (type === "coral-reef") {
        const freqs = [523.25, 659.25, 783.99, 1046.50];
        const filter = ctx.createBiquadFilter();
        filter.type = "bandpass";
        filter.frequency.setValueAtTime(1500, now);
        filter.connect(ctx.destination);
        freqs.forEach((f, idx) => {
          const noteTime = now + (idx * 0.11);
          const osc = ctx.createOscillator();
          const gain = ctx.createGain();
          osc.type = "sine";
          osc.frequency.setValueAtTime(f, noteTime);
          gain.gain.setValueAtTime(0, noteTime);
          gain.gain.linearRampToValueAtTime(0.1, noteTime + 0.02);
          gain.gain.exponentialRampToValueAtTime(0.001, noteTime + 0.22);
          osc.connect(gain);
          gain.connect(filter);
          osc.start(noteTime);
          osc.stop(noteTime + 0.25);
        });
      }
    } catch {
      console.log("Audio synthesis blocked/not supported inside this frame.");
    }
  };

  // Verbal commands router & parser
  const processVerbalCommand = (spokenText: string) => {
    const text = spokenText.toLowerCase().trim();
    
    if (text.includes("go to home") || text.includes("open home") || text.includes("go home")) {
      navigate("/");
      return {
        reply: "Returning to unified command deck and AI Surfer home terminal.",
        workflow: "Direct Navigation ➔ Home Hub"
      };
    }
    
    if (text.includes("go to tribute") || text.includes("go to tip jar") || text.includes("open tip jar") || text.includes("open tribute") || text.includes("donate") || text.includes("tip jar") || text.includes("tribute")) {
      navigate("/tribute");
      return {
        reply: "Navigating to ocean wave Tribute Jar page. Loading donation tools, digital asset drops, and web acoustic soundboard.",
        workflow: "Direct Navigation ➔ Tip Jar / Tribute"
      };
    }
    
    if (text.includes("go to best practices") || text.includes("go to mcp") || text.includes("open best practices") || text.includes("best practices") || text.includes("mcp")) {
      navigate("/mcp");
      return {
        reply: "Navigating to Best Practices console. Executing active Multi-Agent Control Protocol (MCP) data dashboard.",
        workflow: "Direct Navigation ➔ BEST PRACTICES (MCP)"
      };
    }
    
    if (text.includes("go to contact") || text.includes("open contact")) {
      navigate("/contact");
      return {
        reply: "Opening contact and direct message feed. Reach OceanTideDrop staff here.",
        workflow: "Direct Navigation ➔ Contact"
      };
    }

    if (text.includes("go to services") || text.includes("open services")) {
      navigate("/services");
      return {
        reply: "Opening the OceanTideDrop growth architecture services dashboard.",
        workflow: "Direct Navigation ➔ Services"
      };
    }

    if (text.includes("go to pricing") || text.includes("open pricing") || text.includes("pricing")) {
      navigate("/pricing");
      return {
        reply: "Navigating to growth matrices, pricing tiers, and active subscription models page.",
        workflow: "Direct Navigation ➔ Pricing"
      };
    }

    if (text.includes("go to members") || text.includes("open members")) {
      navigate("/members");
      return {
        reply: "Logging in Surfer node. Navigating to Elite Surfer Members registry.",
        workflow: "Direct Navigation ➔ Members"
      };
    }

    if (text.includes("go to memorial") || text.includes("open memorial") || text.includes("bull")) {
      navigate("/memorial");
      return {
        reply: "Opening Bull's Sacred Memorial page and active swell markers.",
        workflow: "Direct Navigation ➔ Bull's Memorial"
      };
    }

    if (text.includes("go to reviews") || text.includes("open reviews")) {
      navigate("/reviews");
      return {
        reply: "Loading user review sheets and historic surfers satisfaction reports.",
        workflow: "Direct Navigation ➔ Reviews"
      };
    }

    if (text.includes("go to support") || text.includes("open support")) {
      navigate("/support");
      return {
        reply: "Connecting to global operational helpdesk. Loading active support tickets.",
        workflow: "Direct Navigation ➔ Support"
      };
    }

    if (text.includes("play sound high tide") || text.includes("play high tide")) {
      playAudioSynth("high-tide");
      return {
        reply: "Resonating high‑tide major chord (C4-E4-G4-C5 synth sequence). Listen closely for the cyber swells!",
        workflow: "Acoustic Audio Synthesis ➔ Play High Tide"
      };
    }

    if (text.includes("play sound deep swell") || text.includes("play deep swell")) {
      playAudioSynth("deep-swell");
      return {
        reply: "Synthesizing deep‑swell low bass squarewave frequency (C2-G2 chord progression). Feel the rumble!",
        workflow: "Acoustic Audio Synthesis ➔ Play Deep Swell"
      };
    }

    if (text.includes("play sound coral reef") || text.includes("play coral reef")) {
      playAudioSynth("coral-reef");
      return {
        reply: "Executing coral‑reef high tone sine arpeggiation (C5‑E5‑G5-C6 note sequence).",
        workflow: "Acoustic Audio Synthesis ➔ Play Coral Reef"
      };
    }

    if (text.includes("query tools") || text.includes("list tools") || text.includes("list commands") || text.includes("help") || text.includes("tool")) {
      return {
        reply: "Active platform tools matching queries:\n1. Tribute Jar Panel (preset bids or custom donations with simulation and progress goal tracking)\n2. VIP Badge Minter (digital cryptographic status)\n3. Custom Synth Soundboard (High Tide, Deep Swell, Coral Reef oscillators)\n4. Waveform diagnostics scanner (SVG osc curve tuning)\n5. Visual Image Generation (e.g., 'generate image of cyber surfer')",
        workflow: "Core Diagnostics ➔ List Query Tools"
      };
    }

    if (text.startsWith("generate image of ") || text.startsWith("create image of ") || text.startsWith("draw ") || text.startsWith("generate ")) {
      const match = text.match(/^(?:generate image of|create image of|draw|generate)\s+(.+)/i);
      if (match && match[1]) {
        const prompt = match[1].trim();
        const encodedPrompt = encodeURIComponent(prompt + ", high quality, cinematic, 8k resolution, vaporwave, cyberpunk aesthetics");
        // We use Pollinations AI for free, on-the-fly image generation without an API key
        const imageUrl = `https://image.pollinations.ai/prompt/${encodedPrompt}?width=800&height=400&nologo=true`;
        
        return {
          reply: `Synthesizing visual pattern based on your neural prompt: "${prompt}"... Rendering 8K display matrix.`,
          workflow: "Visual Synthesis ➔ Image Generation",
          image: imageUrl
        };
      }
    }

    return null;
  };

  const handleIncomingTranscript = (text: string) => {
    setMessages(prev => [...prev, { role: 'user', content: `🎙️ "${text}"` }]);
    setIsThinking(true);
    
    setTimeout(() => {
      setIsThinking(false);
      const commandResult = processVerbalCommand(text);
      if (commandResult) {
        setMessages(prev => [
          ...prev, 
          { 
            role: 'assistant', 
            content: `🤖 VOICE TRIGGERED: ${commandResult.workflow}\n\n${commandResult.reply}`,
            image: commandResult.image
          }
        ]);
      } else {
        setMessages(prev => [
          ...prev, 
          { 
            role: 'assistant', 
            content: `I translated your microphone speech: "${text}". No specific wave triggers matched. Ask to "play deep swell" or "open tip jar" or navigate to cyber hubs!` 
          }
        ]);
      }
    }, 1100);
  };

  useEffect(() => {
    const SpeechRecConstructor = (window as unknown as { SpeechRecognition?: new () => void; webkitSpeechRecognition?: new () => void }).SpeechRecognition || (window as unknown as { SpeechRecognition?: new () => void; webkitSpeechRecognition?: new () => void }).webkitSpeechRecognition;
    if (SpeechRecConstructor) {
      const rec = new SpeechRecConstructor() as unknown as {
        continuous: boolean;
        interimResults: boolean;
        lang: string;
        onstart: () => void;
        onresult: (e: SpeechResultEvent) => void;
        onerror: (e: SpeechErrorEvent) => void;
        onend: () => void;
      };

      rec.continuous = false;
      rec.interimResults = false;
      rec.lang = 'en-US';

      rec.onstart = () => {
        setIsListening(true);
        setSpeechError(null);
      };

      rec.onresult = (event: SpeechResultEvent) => {
        const transcript = event.results[0][0].transcript;
        handleIncomingTranscript(transcript);
      };

      rec.onerror = (event: SpeechErrorEvent) => {
        console.error("Speech Recognition error:", event.error);
        if (event.error === 'not-allowed') {
          setSpeechError("Microphone permission blocked inside frame. Use simulated quick-trigger tags below!");
        } else {
          setSpeechError(`Capture issue: ${event.error}`);
        }
        setIsListening(false);
      };

      rec.onend = () => {
        setIsListening(false);
      };

      recognitionRef.current = rec;
    }
  }, []);

  const startListening = () => {
    const rec = recognitionRef.current as { start: () => void } | null;
    if (rec) {
      try {
        rec.start();
      } catch (err) {
        console.error(err);
        setIsListening(false);
      }
    } else {
      setSpeechError("Speech recognition not supported in your browser. Tap simulated keywords below!");
    }
  };

  const stopListening = () => {
    const rec = recognitionRef.current as { stop: () => void } | null;
    if (rec) {
      rec.stop();
      setIsListening(false);
    }
  };

  const handleSend = (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim()) return;
    
    const text = input;
    setInput('');
    setMessages(prev => [...prev, { role: 'user', content: text }]);
    setIsThinking(true);
    
    setTimeout(() => {
      setIsThinking(false);
      const commandResult = processVerbalCommand(text);
      if (commandResult) {
        setMessages(prev => [
          ...prev, 
          { 
            role: 'assistant', 
            content: `🤖 WORKFLOW TRIGGERED: ${commandResult.workflow}\n\n${commandResult.reply}`,
            image: commandResult.image
          }
        ]);
      } else {
        setMessages(prev => [
          ...prev, 
          { role: 'assistant', content: "I've logged your request into our database logs. Type a workflow like 'play high tide' or 'open tip jar' to launch interactive controls!" }
        ]);
      }
    }, 1200);
  };

  const triggerSimVoice = (phrase: string) => {
    handleIncomingTranscript(phrase);
  };

  return (
    <>
      <button 
        onClick={() => setIsOpen(true)}
        className="fixed bottom-6 right-6 z-[100] w-14 h-14 bg-cyan-400 text-black rounded-full shadow-[0_0_20px_rgba(34,211,238,0.4)] flex items-center justify-center hover:scale-110 transition-transform cursor-pointer"
        id="ai-assistant-terminal-launcher"
      >
        <MessageSquare className="w-6 h-6" />
      </button>

      <AnimatePresence>
        {isOpen && (
          <motion.div 
            initial={{ opacity: 0, y: 20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.95 }}
            className="fixed bottom-24 right-6 w-85 h-[460px] bg-zinc-950 border border-white/10 rounded-2xl shadow-2xl z-[100] flex flex-col overflow-hidden leading-tight font-sans"
          >
            {/* Header console */}
            <div className="p-4 bg-white/5 border-b border-white/10 flex justify-between items-center bg-zinc-900">
               <div className="flex items-center gap-2">
                 <Sparkles className="w-4 h-4 text-cyan-400" />
                 <span className="text-xs font-black uppercase tracking-widest text-white">AI Assistant Terminal</span>
               </div>
               <button onClick={() => setIsOpen(false)} className="text-zinc-400 hover:text-white cursor-pointer">
                 <X className="w-4 h-4" />
               </button>
            </div>
            
            {/* Messages box area */}
            <div className="flex-1 overflow-y-auto p-4 space-y-4 text-sm scrollbar-thin scrollbar-thumb-zinc-800">
               
               {/* Speach recognition status block header */}
               <div className="p-3 bg-zinc-900/80 border border-pink-500/20 rounded-xl flex flex-col gap-1.5 shadow-md">
                 <div className="flex items-center justify-between">
                   <div className="flex items-center gap-2">
                     <span className={`h-2.5 w-2.5 rounded-full ${isListening ? 'bg-red-500 animate-ping' : 'bg-pink-500'}`} />
                     <span className="text-[10px] font-black uppercase tracking-widest text-pink-500">VOICE-TO-TEXT MATRIX</span>
                   </div>
                   <span className="text-[9px] font-mono text-cyan-400 uppercase tracking-widest">AUDIO CONTROL v1.2</span>
                 </div>
                 
                 {isListening ? (
                   <div className="space-y-2 mt-1 py-1">
                     <div className="text-xs text-white font-mono animate-pulse flex items-center gap-2">
                       <span>🎤 Real-time microphone listening... Spoken words will auto-trigger tools.</span>
                     </div>
                     <div className="flex gap-1 items-end h-4 py-0.5 justify-start">
                       <span className="w-1 bg-pink-500 rounded h-1 animate-bounce" style={{ animationDelay: '50ms' }} />
                       <span className="w-1 bg-purple-500 rounded h-3 animate-bounce" style={{ animationDelay: '100ms' }} />
                       <span className="w-1 bg-cyan-400 rounded h-2 animate-bounce" style={{ animationDelay: '150ms' }} />
                       <span className="w-1 bg-pink-500 rounded h-4 animate-bounce" style={{ animationDelay: '200ms' }} />
                       <span className="w-1 bg-purple-500 rounded h-1 animate-bounce" style={{ animationDelay: '250ms' }} />
                       <span className="w-1 bg-cyan-400 rounded h-3 animate-bounce" style={{ animationDelay: '300ms' }} />
                     </div>
                   </div>
                 ) : (
                   <div className="text-[11px] text-zinc-400 leading-normal mt-1 flex flex-col gap-1">
                     <span>Tap mic to talk, or click simulated trigger words below:</span>
                     {speechError && (
                       <span className="text-pink-400 text-[10px] block font-mono bg-pink-950/20 p-2 border border-pink-900/30 rounded mt-1">{speechError}</span>
                     )}
                   </div>
                 )}
               </div>

               {messages.map((m, i) => (
                 <div key={i} className={`flex ${m.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                    <div className={`max-w-[85%] p-3 rounded-2xl text-xs ${m.role === 'user' ? 'bg-cyan-400 text-black rounded-tr-none font-bold' : 'bg-white/10 text-white rounded-tl-none whitespace-pre-wrap leading-relaxed'}`}>
                       {m.content}
                       {m.image && (
                         <div className="mt-3 overflow-hidden rounded-lg border border-cyan-500/30 shadow-[0_0_15px_rgba(34,211,238,0.2)]">
                           <img src={m.image} alt="Generated UI" className="w-full h-auto block" referrerPolicy="no-referrer" loading="lazy" />
                         </div>
                       )}
                    </div>
                 </div>
               ))}
               
               {isThinking && (
                 <div className="flex justify-start">
                    <div className="bg-white/5 border border-white/10 text-white p-3 rounded-2xl rounded-tl-none flex items-center gap-2">
                       <div className="w-1.5 h-1.5 bg-cyan-400 rounded-full animate-bounce" style={{ animationDelay: '0ms' }} />
                       <div className="w-1.5 h-1.5 bg-cyan-400 rounded-full animate-bounce" style={{ animationDelay: '150ms' }} />
                       <div className="w-1.5 h-1.5 bg-cyan-400 rounded-full animate-bounce" style={{ animationDelay: '300ms' }} />
                    </div>
                 </div>
               )}
            </div>

            {/* Simulated preset shortcuts strip */}
            <div className="px-3 py-2 bg-zinc-950 border-t border-white/5">
              <span className="text-[9px] font-mono text-zinc-500 uppercase tracking-widest font-black block mb-2">🎤 SIMULATED SPEECH PRESETS (Tap to speak):</span>
              <div className="flex gap-1.5 overflow-x-auto pb-1.5 scrollbar-thin scrollbar-thumb-zinc-800">
                {simVoiceTriggers.map((trig, idx) => (
                  <button
                    key={idx}
                    onClick={() => triggerSimVoice(trig.phrase)}
                    className="shrink-0 px-2.5 py-1.5 bg-zinc-900 hover:bg-zinc-800 text-cyan-300 hover:text-white border border-white/5 hover:border-cyan-500/30 rounded-lg text-[10px] font-mono transition-all cursor-pointer whitespace-nowrap"
                  >
                    {trig.label}
                  </button>
                ))}
              </div>
            </div>

            {/* Input bar and action mic */}
            <form onSubmit={handleSend} className="p-3 bg-black border-t border-white/10 flex gap-2 items-center">
               <button
                 type="button"
                 onClick={isListening ? stopListening : startListening}
                 className={`w-9 h-9 rounded-full flex items-center justify-center shrink-0 transition-all ${isListening ? 'bg-red-500 text-white shadow-[0_0_15px_#ef4444]' : 'bg-zinc-800 text-zinc-400 hover:text-white hover:bg-zinc-700'} cursor-pointer`}
                 title={isListening ? "Stop voice listening" : "Speak verbally"}
               >
                 {isListening ? <MicOff className="w-4 h-4 animate-pulse" /> : <Mic className="w-4 h-4" />}
               </button>

               <label className="w-9 h-9 rounded-full bg-zinc-800 text-zinc-400 hover:text-white hover:bg-zinc-700 flex items-center justify-center shrink-0 transition-all cursor-pointer" title="Simulate Image Upload">
                 <input 
                    type="file" 
                    accept="image/*" 
                    className="hidden" 
                    onChange={(e) => {
                      if (e.target.files && e.target.files[0]) {
                        const fakeUrl = URL.createObjectURL(e.target.files[0]);
                        setMessages(prev => [...prev, { role: 'user', content: `Attached Image: ${e.target.files![0].name}`, image: fakeUrl }]);
                        setIsThinking(true);
                        setTimeout(() => {
                           setIsThinking(false);
                           setMessages(prev => [...prev, { role: 'assistant', content: `🤖 VISION MATRIX: I've scanned your image upload. The visual data has been processed. Would you like me to extract insights or create a similar 'generated' asset?` }]);
                        }, 1300);
                      }
                    }} 
                 />
                 <ImageIcon className="w-4 h-4" />
               </label>
               
               <input 
                 value={input}
                 onChange={e => setInput(e.target.value)}
                 placeholder="Type command ('play deep swell', 'go to tip jar')..."
                 className="flex-1 bg-zinc-900 border border-white/10 rounded-full px-4 py-2.5 text-white text-xs focus:outline-none focus:border-cyan-400"
               />
               
               <button type="submit" className="w-9 h-9 rounded-full bg-cyan-400 text-black flex items-center justify-center shrink-0 hover:scale-105 transition-transform cursor-pointer">
                 <Send className="w-3.5 h-3.5" />
               </button>
            </form>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
