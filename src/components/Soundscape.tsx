import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Volume2, VolumeX, Music, Loader2, Sparkles } from 'lucide-react';
import { GoogleGenAI, Modality } from "@google/genai";
import { useLocation } from 'react-router-dom';

export const Soundscape = () => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [loading, setLoading] = useState(false);
  const [audioUrl, setAudioUrl] = useState<string | null>(null);
  const audioRef = useRef<HTMLAudioElement>(null);
  const location = useLocation();

  const generateSoundscape = async () => {
    setLoading(true);
    try {
      const pageName = location.pathname.split('/')[1] || 'home';
      const prompt = `Generate a 30-second ambient, futuristic soundscape for a digital island called "${pageName}". 
      Style: Ethereal, synth-driven, cyberpunk, oceanic. No vocals.`;

      const aistudio = (window as any).aistudio;
      if (aistudio) {
        const hasKey = await aistudio.hasSelectedApiKey();
        if (!hasKey) {
          await aistudio.openSelectKey();
        }
      }

      const key = process.env.API_KEY || process.env.GEMINI_API_KEY;
      if (!key) {
        console.warn('Neural key not found, soundscape generation aborted.');
        return;
      }
      
      const ai = new GoogleGenAI({ apiKey: key });
      const response = await ai.models.generateContentStream({
        model: "lyria-3-clip-preview",
        contents: prompt,
        config: {
          responseModalities: [Modality.AUDIO]
        }
      });

      let audioBase64 = "";
      let mimeType = "audio/wav";

      for await (const chunk of response) {
        const parts = chunk.candidates?.[0]?.content?.parts;
        if (!parts) continue;
        for (const part of parts) {
          if (part.inlineData?.data) {
            if (!audioBase64 && part.inlineData.mimeType) {
              mimeType = part.inlineData.mimeType;
            }
            audioBase64 += part.inlineData.data;
          }
        }
      }

      if (audioBase64) {
        const binary = atob(audioBase64);
        const bytes = new Uint8Array(binary.length);
        for (let i = 0; i < binary.length; i++) {
          bytes[i] = binary.charCodeAt(i);
        }
        const blob = new Blob([bytes], { type: mimeType });
        const url = URL.createObjectURL(blob);
        setAudioUrl(url);
      }
    } catch (error) {
      console.error('Soundscape generation failed:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (isPlaying && !audioUrl && !loading) {
      generateSoundscape();
    }
  }, [isPlaying, audioUrl]);

  // Clean up URL on unmount or change
  useEffect(() => {
    return () => {
      if (audioUrl) {
        URL.revokeObjectURL(audioUrl);
      }
    };
  }, [audioUrl]);

  // Regenerate when location changes if playing
  useEffect(() => {
    if (isPlaying) {
      setAudioUrl(null);
    }
  }, [location.pathname]);

  const togglePlay = () => {
    if (isPlaying && audioRef.current) {
      audioRef.current.pause();
    }
    setIsPlaying(!isPlaying);
  };

  return (
    <div className="fixed bottom-8 left-8 z-[100]">
      <div className="flex items-center gap-3">
        <button
          onClick={togglePlay}
          className={`p-4 rounded-full backdrop-blur-xl border transition-all duration-500 group relative ${
            isPlaying 
              ? 'bg-neon-purple/20 border-neon-purple text-neon-purple shadow-[0_0_20px_rgba(123,47,247,0.3)]' 
              : 'bg-black/40 border-white/10 text-slate-500 hover:border-white/20'
          }`}
        >
          {loading ? (
            <Loader2 className="animate-spin" size={20} />
          ) : isPlaying ? (
            <Volume2 size={20} />
          ) : (
            <VolumeX size={20} />
          )}
          
          <span className="absolute left-full ml-4 px-3 py-1 bg-black/80 border border-white/10 rounded text-[10px] font-black uppercase tracking-widest text-white opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap pointer-events-none">
            {isPlaying ? 'Neural Soundscape Active' : 'Initialize Soundscape'}
          </span>
        </button>

        <AnimatePresence>
          {isPlaying && (
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              className="flex items-center gap-2 px-4 py-2 bg-neon-purple/10 border border-neon-purple/20 rounded-full"
            >
              <Music size={12} className="text-neon-purple animate-pulse" />
              <span className="text-[10px] font-black uppercase tracking-widest text-neon-purple">
                {loading ? 'Manifesting Audio...' : 'Ambient Link Stable'}
              </span>
              {!loading && <Sparkles size={10} className="text-neon-purple animate-bounce" />}
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {audioUrl && (
        <audio
          ref={audioRef}
          src={audioUrl}
          autoPlay
          loop
          onEnded={() => setIsPlaying(false)}
          className="hidden"
          crossOrigin="anonymous"
        />
      )}
    </div>
  );
};
