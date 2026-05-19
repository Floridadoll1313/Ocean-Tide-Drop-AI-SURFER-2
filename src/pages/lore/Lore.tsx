import React from 'react';
import { Link } from 'react-router-dom';
import PageWrapper from '../../components/PageWrapper';
import { motion } from 'motion/react';
import { Hammer, Waves, Compass } from 'lucide-react';

export default function Lore() {
  const stories = [
    {
      title: "The Carpenter's Line",
      icon: <Hammer className="w-6 h-6" />,
      content: "Before the algorithms and neural networks, there was Bull. A Master Carpenter who understood that any structure—whether a home on the wild ocean front or a digital empire—requires a foundation built for the storm. He didn't just build homes; he designed legacies across the surfing coast, teaching us that the measure of a man is the integrity of his joinery."
    },
    {
      title: "Surfer's Currents",
      icon: <Waves className="w-6 h-6" />,
      content: "The currents here aren't just water; they are frequencies. We learned to surf the edge where the Gulf Stream meets the Labrador Current. It's in this collision of energies that AI Surfer was born, carrying the spirit of the Atlantic into the architecture of the AI age."
    },
    {
      title: "The Navigation",
      icon: <Compass className="w-6 h-6" />,
      content: "We don't just follow trends; we chart our own course. Like the Sky Marlin jumping between dimensions, we bridge the gap between physical craftsmanship and digital divinity."
    }
  ];

  return (
    <PageWrapper maxWidth="max-w-4xl" showHero={false}>
      <div className="w-full py-20 text-center relative overflow-hidden">
        <motion.div
           initial={{ opacity: 0, scale: 0.9 }}
           animate={{ opacity: 1, scale: 1 }}
           className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-cyan-500/5 blur-[120px] rounded-full"
        />

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="relative z-10 mb-24"
        >
          <span className="text-[10px] font-black uppercase tracking-[1em] text-zinc-500 mb-6 block">Origin Archive</span>
          <h1 className="text-6xl md:text-9xl font-black uppercase tracking-tighter text-white mb-8">
            The <span className="text-soul-gradient italic font-serif lowercase">Lore.</span>
          </h1>
          <div className="h-px w-20 bg-soul-gradient mx-auto"></div>
        </motion.div>

        <div className="space-y-40 relative z-10">
          {stories.map((story, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="flex flex-col items-center max-w-2xl mx-auto"
            >
              <div className="w-16 h-16 bg-white/5 border border-white/10 rounded-full flex items-center justify-center mb-10 text-white shadow-[0_0_30px_rgba(255,255,255,0.05)]">
                 {story.icon}
              </div>
              <h2 className="text-3xl font-black uppercase tracking-tighter text-white mb-6 underline decoration-soul-gradient decoration-4 underline-offset-8">
                {story.title}
              </h2>
              <p className="text-zinc-400 text-lg font-medium leading-relaxed italic font-serif">
                "{story.content}"
              </p>
            </motion.div>
          ))}
        </div>

        <div className="mt-40 pt-20 border-t border-white/5">
           <Link 
             to="/" 
             className="px-10 py-5 bg-white/5 border border-white/10 text-white text-[10px] font-black uppercase tracking-[0.4em] hover:bg-white hover:text-black transition-all"
           >
             ← Return to Frequency
           </Link>
        </div>
      </div>
    </PageWrapper>
  );
}
