import React from 'react';
import { Link } from 'react-router-dom';
import PageWrapper from '../../components/PageWrapper';
import OceanBubbles from '../../components/OceanBubbles';
import OceanChatbot from '../../components/OceanChatbot';
import { BookOpen, Clock, ArrowRight } from 'lucide-react';

export default function OceanSurfReports() {
  const posts = [
    {
      title: "5 AI Rip Currents Hurting Businesses",
      excerpt: "Discover the automation mistakes slowing growth.",
      category: "Strategy",
      readTime: "5 min read",
      date: "May 26, 2026",
      image: "linear-gradient(to bottom right, #00f2fe, #4facfe)"
    },
    {
      title: "The Automation Tide Is Rising",
      excerpt: "Why businesses are rapidly adopting AI systems.",
      category: "Industry Trends",
      readTime: "8 min read",
      date: "May 20, 2026",
      image: "linear-gradient(to bottom right, #38b2ac, #3182ce)"
    },
    {
      title: "How Contractors Can Surf Automation",
      excerpt: "Simple AI tools contractors can implement today.",
      category: "Guide",
      readTime: "6 min read",
      date: "May 15, 2026",
      image: "linear-gradient(to bottom right, #4ade80, #0ea5e9)"
    }
  ];

  return (
    <PageWrapper>
      <div className="-mt-4 md:-mt-8 -mx-4 md:-mx-8 min-h-[calc(100vh-4rem)] bg-gradient-to-b from-[#021B33] via-[#033860] to-[#0AA1DD] text-slate-100 font-sans overflow-x-hidden selection:bg-cyan-500/30 relative">
        <OceanBubbles />
        {/* Custom Mini-Nav */}
        <nav className="flex items-center justify-between px-6 py-4 bg-[#030e1a]/80 backdrop-blur-md border-b border-cyan-900/40 sticky top-0 z-50">
          <div className="flex items-center gap-2 font-black tracking-tight text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-blue-400 text-lg md:text-xl">
            <span className="text-2xl" role="img" aria-label="wave">🌊</span> 
            OCEAN TIDE DROP 
            <span className="text-2xl hidden sm:inline-block" role="img" aria-label="flower">🌺</span>
          </div>
          <ul className="hidden md:flex items-center gap-8 text-sm font-semibold tracking-wide text-cyan-100/70 justify-between select-none p-0 list-none m-0">
            <li><Link className="hover:text-cyan-400 transition-colors cursor-pointer" to="/ocean-services">Services</Link></li>
            <li><Link className="hover:text-cyan-400 transition-colors cursor-pointer" to="/ocean">Free Tools</Link></li>
            <li><Link className="hover:text-cyan-400 transition-colors cursor-pointer" to="/ocean-cases">Success Stories</Link></li>
            <li className="text-cyan-400 cursor-pointer">Surf Reports</li>
            <li><Link className="hover:text-cyan-400 transition-colors cursor-pointer" to="/ocean-contact">Contact</Link></li>
          </ul>
        </nav>

        {/* Header Section */}
        <header className="relative pt-24 pb-16 overflow-hidden text-center">
          <div className="absolute top-[-20%] left-[50%] -translate-x-1/2 w-[600px] h-[400px] rounded-[100%] bg-gradient-to-br from-cyan-600 to-blue-800 blur-[150px] opacity-20 pointer-events-none"></div>
          
          <div className="relative z-10 max-w-4xl mx-auto px-6">
            <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-cyan-900/40 border border-cyan-500/30 text-cyan-400 mb-6 shadow-[0_0_30px_rgba(0,242,254,0.15)] overflow-hidden">
               <BookOpen className="w-8 h-8 relative z-10" />
               <div className="absolute inset-0 bg-gradient-to-t from-cyan-500/20 to-transparent"></div>
            </div>
            <h1 className="text-5xl md:text-7xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-white via-cyan-100 to-teal-200 mb-6 tracking-tight">
              Surf Reports
            </h1>
            <p className="text-xl md:text-2xl text-cyan-100/60 font-light max-w-2xl mx-auto">
              Insights, strategies, and the latest tides in business automation.
            </p>
          </div>
        </header>

        {/* Blog Posts Grid */}
        <section className="py-16 md:py-24 relative z-10">
          <div className="max-w-7xl mx-auto px-6">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {posts.map((post, idx) => (
                <article 
                  key={idx} 
                  className="group flex flex-col bg-[#04111f] border border-cyan-900/40 hover:border-cyan-500/50 rounded-3xl transition-all duration-300 hover:shadow-[0_15px_40px_rgba(34,211,238,0.1)] hover:-translate-y-2 overflow-hidden cursor-pointer"
                >
                  {/* Decorative Header Block simulating an image */}
                  <div className="h-48 w-full relative overflow-hidden" style={{ background: post.image }}>
                    <div className="absolute inset-0 bg-[#020b14]/40 group-hover:bg-transparent transition-colors duration-500"></div>
                    <div className="absolute bottom-4 left-4">
                      <span className="px-3 py-1 bg-black/50 backdrop-blur-md rounded-full text-xs font-semibold text-white/90 uppercase tracking-wider border border-white/10">
                        {post.category}
                      </span>
                    </div>
                  </div>
                  
                  <div className="p-8 flex flex-col flex-1">
                    <h2 className="text-2xl font-bold text-white mb-3 tracking-tight group-hover:text-cyan-300 transition-colors line-clamp-2">
                      {post.title}
                    </h2>
                    
                    <p className="text-cyan-100/60 text-lg leading-relaxed flex-1 mb-6">
                      {post.excerpt}
                    </p>
                    
                    <div className="mt-auto pt-6 border-t border-cyan-900/40 flex items-center justify-between">
                      <div className="flex items-center gap-4 text-xs font-medium text-cyan-500/70">
                        <span className="flex items-center gap-1.5 border border-cyan-900/50 px-2 py-1 rounded-md bg-[#020b14]/50">
                           <Clock className="w-3.5 h-3.5" />
                           {post.readTime}
                        </span>
                        <span>{post.date}</span>
                      </div>
                      <ArrowRight className="w-5 h-5 text-cyan-600 group-hover:text-cyan-400 transform group-hover:translate-x-1 transition-all" />
                    </div>
                  </div>
                </article>
              ))}
            </div>
          </div>
        </section>

        <OceanChatbot />
      </div>
    </PageWrapper>
  );
}
