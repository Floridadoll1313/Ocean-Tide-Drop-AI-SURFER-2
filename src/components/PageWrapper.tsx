import React, { useState, useEffect, useRef } from "react";
import { Link, useLocation } from "react-router-dom";
import { useAuth } from "../hooks/useAuth";
import { Menu, X, Home as HomeIcon, Briefcase, Layers, MessageSquare, LayoutDashboard, Anchor, Users, Calendar as CalendarIcon, Twitter, Linkedin, Instagram, MapPin, Star, Moon, Sun, Search, Command } from "lucide-react";
import { motion, AnimatePresence } from "motion/react";
import AIAssistant from "./AIAssistant";

export default function PageWrapper({ 
  children, 
  maxWidth = "max-w-5xl", 
  showHero = true 
}: { 
  children: React.ReactNode, 
  maxWidth?: string,
  showHero?: boolean
}) {
  const { user, loading, loginWithGoogle, logout } = useAuth();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [theme, setTheme] = useState<'dark' | 'light'>('dark');
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const location = useLocation();
  const searchInputRef = useRef<HTMLInputElement>(null);

  const toggleTheme = () => {
    const newTheme = theme === 'dark' ? 'light' : 'dark';
    setTheme(newTheme);
    if (newTheme === 'light') {
      document.documentElement.style.filter = "invert(1) hue-rotate(180deg)";
      document.documentElement.classList.remove("dark");
      document.documentElement.classList.add("light");
    } else {
      document.documentElement.style.filter = "";
      document.documentElement.classList.add("dark");
      document.documentElement.classList.remove("light");
    }
  };

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
        e.preventDefault();
        setIsSearchOpen(true);
      }
      if (e.key === 'Escape') {
        setIsSearchOpen(false);
      }
      if ((e.metaKey || e.ctrlKey) && e.shiftKey && e.key.toLowerCase() === 'l') {
        e.preventDefault();
        toggleTheme();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [theme]); // using theme instead of toggleTheme to avoid remounting issues, toggleTheme closure updates with state.

  useEffect(() => {
    if (isSearchOpen && searchInputRef.current) {
      searchInputRef.current.focus();
    }
  }, [isSearchOpen]);

  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);

  const isActive = (path: string) => {
    if (path === "/" && location.pathname !== "/") return false;
    return location.pathname.startsWith(path);
  };

  const navLinks = [
    { to: "/", label: "Home", icon: HomeIcon, color: "text-yellow-500" },
    { to: "/gallery", label: "Work", icon: Briefcase, color: "text-blue-500" },
    { to: "/services", label: "Services", icon: Layers, color: "text-purple-500" },
    { to: "/members", label: "Members", icon: LayoutDashboard, color: "text-cyan-400" },
    { to: "/reviews", label: "Reviews", icon: Star, color: "text-yellow-400" },
    { to: "/founders", label: "Founders", icon: Users, color: "text-emerald-500" },
    { to: "/memorial", label: "Bull's Memorial", icon: Anchor, color: "text-orange-500" },
    { to: "/contact", label: "Contact", icon: MessageSquare, color: "text-green-500" },
  ];

  return (
    <div className="min-h-screen bg-transparent text-white flex flex-col relative overflow-x-hidden">
      {/* NAVBAR */}
      <header className="w-full fixed top-4 left-0 z-50 flex justify-center px-4">
        <div className="w-full max-w-6xl backdrop-blur-xl bg-black/50 border border-white/10 rounded-full flex items-center justify-between px-6 py-3 shadow-[0_0_30px_rgba(0,0,0,0.5)] navbar-glow">
          <Link to="/" className="flex items-center gap-3 relative z-[60]">
            <div className="w-10 h-10 flex items-center justify-center rounded-sm">
              <img src="/logo.svg" alt="AI Surfer Logo" className="w-full h-full object-contain drop-shadow-[0_0_5px_rgba(0,255,255,0.5)]" />
            </div>
            <span className="text-xl font-black tracking-tighter uppercase text-white hidden lg:block">
              <span className="text-soul-gradient italic font-serif">AI Surfer</span>
            </span>
          </Link>

          {/* Global Status Indicator */}
          <div className="hidden lg:flex items-center gap-2 px-3 py-1.5 bg-emerald-950/30 border border-emerald-500/20 rounded-full ml-4 mr-auto" title="System Matrix Online">
            <span className="w-1.5 h-1.5 bg-emerald-500 rounded-full animate-pulse" />
            <span className="text-[9px] font-black uppercase tracking-widest text-emerald-400">All Systems Nominal</span>
          </div>

          {/* Desktop Nav */}
          <nav className="hidden md:flex gap-1 bg-white/5 rounded-full p-1 border border-white/5 items-center">
            {navLinks.map((link, idx) => (
              <motion.div 
                key={link.to}
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: idx * 0.05 }}
              >
                <Link 
                  className={`transition-all px-4 py-2 rounded-full flex items-center gap-2 group relative ${isActive(link.to) ? 'bg-white/10 text-white' : 'text-zinc-400 hover:text-white hover:bg-white/5'}`} 
                  to={link.to}
                >
                  <div className="flex items-center gap-1.5 text-[10px] font-black uppercase tracking-[0.1em]">
                    <link.icon className={`w-3 h-3 ${link.color} group-hover:scale-110 transition-transform ${isActive(link.to) ? 'scale-110' : ''}`} />
                    <span>{link.label}</span>
                  </div>
                  {isActive(link.to) && (
                    <motion.div 
                      layoutId="activeNav"
                      className="absolute inset-x-4 -bottom-1 h-px bg-cyan-400 shadow-[0_0_10px_rgba(0,234,255,0.8)]"
                    />
                  )}
                </Link>
              </motion.div>
            ))}
          </nav>
            
          <div className="hidden md:flex items-center gap-4">
            <button onClick={() => setIsSearchOpen(true)} className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/5 border border-white/10 text-zinc-400 hover:text-white hover:bg-white/10 transition-colors" title="Search (Cmd+K)">
              <Search className="w-3.5 h-3.5" />
              <span className="text-[10px] font-bold uppercase tracking-widest hidden lg:block">Search</span>
              <kbd className="hidden lg:flex items-center gap-1 font-mono text-[9px] bg-black/50 px-1.5 py-0.5 rounded opacity-70">
                <Command className="w-2.5 h-2.5" />K
              </kbd>
            </button>
            <button onClick={toggleTheme} className="w-8 h-8 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-zinc-400 hover:text-white hover:bg-white/10 transition-colors" title="Toggle Theme (Cmd+Shift+L)">
              {theme === 'dark' ? <Sun className="w-3.5 h-3.5" /> : <Moon className="w-3.5 h-3.5" />}
            </button>
            {loading ? (
              <div className="w-4 h-4 rounded-full border border-white/20 border-t-white animate-spin"></div>
            ) : user ? (
              <div className="flex items-center gap-2">
                <Link to="/members" className={`flex items-center gap-2 px-4 py-2 bg-cyan-500/10 border border-cyan-500/30 text-cyan-400 rounded-full group transition-all hover:bg-cyan-500 hover:text-black ${isActive('/members') && !isActive('/members/sync') ? 'bg-cyan-500 text-black shadow-[0_0_15px_rgba(6,182,212,0.5)]' : ''}`}>
                  <LayoutDashboard className="w-3.5 h-3.5 group-hover:rotate-12 transition-transform" />
                  <span className="text-[10px] font-black uppercase tracking-widest hidden lg:block">Dashboard</span>
                </Link>
                <Link to="/profile" className="flex items-center gap-2 hover:opacity-80 transition-opacity ml-1">
                  {user.photoURL ? (
                     <img src={user.photoURL} alt={user.displayName || "User"} className={`w-8 h-8 rounded-full border-2 transition-all ${isActive('/profile') ? 'border-cyan-400 scale-110' : 'border-white/20'}`} />
                  ) : (
                     <div className={`w-8 h-8 rounded-full bg-white/10 border-2 flex items-center justify-center text-[10px] font-bold text-white transition-all ${isActive('/profile') ? 'border-cyan-400 scale-110' : 'border-white/20'}`}>
                       {user.email?.[0].toUpperCase()}
                     </div>
                  )}
                </Link>
                <button 
                  onClick={() => { if (window.confirm("Are you sure you want to sign out?")) logout(); }}
                  className="w-8 h-8 flex items-center justify-center rounded-full bg-red-500/10 text-red-400 hover:bg-red-500 hover:text-white transition-colors ml-1"
                  title="Sign Out"
                >
                  <X className="w-3.5 h-3.5" />
                </button>
              </div>
            ) : (
              <button 
                onClick={async () => {
                  try {
                    await loginWithGoogle(false);
                  } catch {
                    alert("Authentication failed. If you are viewing this in the AI Studio preview, popups may be blocked. Please click the arrow/window icon at the top right to open this app in a new tab and try again.");
                  }
                }}
                className="px-6 py-2.5 bg-white text-black rounded-full hover:bg-cyan-400 transition-colors text-[10px] font-black uppercase tracking-widest"
              >
                Join
              </button>
            )}
          </div>

          {/* Mobile Theme & Menu Button */}
          <div className="md:hidden flex items-center gap-2 relative z-[60]">
            <button onClick={() => setIsSearchOpen(true)} className="p-2 text-zinc-400 hover:text-white flex items-center" title="Search">
              <Search className="w-5 h-5" />
            </button>
            <button onClick={toggleTheme} className="p-2 text-zinc-400 hover:text-white flex items-center" title="Toggle Theme">
              {theme === 'dark' ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
            </button>
            <button 
              onClick={toggleMenu}
              className="p-2 text-white"
            >
              {isMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </header>

      {/* Mobile Menu Overlay */}
      <AnimatePresence>
        {isMenuOpen && (
          <motion.div 
            initial={{ opacity: 0, y: -20, clipPath: 'circle(0% at 90% 5%)' }}
            animate={{ opacity: 1, y: 0, clipPath: 'circle(150% at 90% 5%)' }}
            exit={{ opacity: 0, y: -20, clipPath: 'circle(0% at 90% 5%)' }}
            transition={{ type: "spring", damping: 25, stiffness: 200 }}
            className="fixed inset-0 z-50 bg-black/95 backdrop-blur-2xl md:hidden overflow-hidden"
          >
            <div className="flex flex-col items-center justify-center h-full gap-8 p-6 text-center">
              <nav className="flex flex-col gap-6">
                {navLinks.map((link, idx) => (
                  <motion.div
                    key={link.to}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.1 + idx * 0.05 }}
                  >
                    <Link 
                      onClick={toggleMenu} 
                      className={`text-4xl font-black uppercase tracking-tighter transition-all flex items-center justify-center gap-4 ${isActive(link.to) ? 'text-white' : 'text-cyan-400 hover:text-white'}`} 
                      to={link.to}
                    >
                      <link.icon className={`w-8 h-8 ${isActive(link.to) ? link.color : 'text-zinc-700'}`} />
                      {link.label}
                      {isActive(link.to) && (
                        <motion.div 
                          layoutId="mobileActiveDot"
                          className="w-2 h-2 rounded-full bg-white ml-2 shadow-[0_0_8px_rgba(255,255,255,0.8)]"
                        />
                      )}
                    </Link>
                  </motion.div>
                ))}
              </nav>

              <motion.div 
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.4 }}
                className="mt-8 pt-8 border-t border-white/10 w-full max-w-xs flex flex-col gap-4"
              >
                {user ? (
                  <>
                    <Link onClick={toggleMenu} to="/members/sync" className={`flex items-center justify-center gap-3 transition-opacity ${isActive('/members/sync') ? 'opacity-100' : 'opacity-60'}`}>
                      <CalendarIcon className="w-6 h-6 text-emerald-400" />
                      <span className="font-bold">Neural Sync</span>
                    </Link>
                    <Link onClick={toggleMenu} to="/profile" className={`flex items-center justify-center gap-3 text-sm transition-opacity ${isActive('/profile') ? 'opacity-100' : 'opacity-60'}`}>
                      {user.photoURL && <img src={user.photoURL} alt="Profile" className="w-10 h-10 rounded-full border border-white" />}
                      <span className="font-bold">{user.displayName || "View Profile"}</span>
                    </Link>
                    <button 
                      onClick={() => { if (window.confirm("Are you sure you want to sign out?")) { logout(); toggleMenu(); } }}
                      className="w-full py-4 rounded-2xl bg-white/5 border border-white/10 text-white font-black uppercase text-xs tracking-widest"
                    >
                      Sign Out
                    </button>
                  </>
                ) : (
                  <button 
                    onClick={async () => { 
                      try {
                        await loginWithGoogle(false); 
                        toggleMenu(); 
                      } catch {
                        alert("Authentication failed. If you are viewing this in the AI Studio preview, popups may be blocked. Please click the arrow/window icon at the top right to open this app in a new tab and try again.");
                      }
                    }}
                    className="w-full py-4 rounded-2xl bg-white text-black font-black uppercase text-xs tracking-widest"
                  >
                    Sign In With Google
                  </button>
                )}
              </motion.div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Search Overlay */}
      <AnimatePresence>
        {isSearchOpen && (
          <motion.div 
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            transition={{ type: "spring", damping: 25, stiffness: 200 }}
            className="fixed inset-0 z-[100] bg-black/80 backdrop-blur-md flex items-start justify-center pt-24 md:pt-32 px-4"
            onClick={() => setIsSearchOpen(false)}
          >
            <div 
              className="w-full max-w-2xl bg-zinc-950 border border-white/20 rounded-2xl shadow-2xl overflow-hidden flex flex-col"
              onClick={e => e.stopPropagation()}
            >
               <div className="flex items-center gap-4 p-4 border-b border-white/5">
                 <Search className="w-5 h-5 text-cyan-400" />
                 <input 
                   ref={searchInputRef}
                   value={searchQuery}
                   onChange={e => setSearchQuery(e.target.value)}
                   className="flex-1 bg-transparent border-none text-white focus:outline-none placeholder:text-zinc-600 text-lg"
                   placeholder="Search the agency..."
                 />
                 <button onClick={() => setIsSearchOpen(false)} className="text-zinc-500 hover:text-white bg-white/5 px-2 py-1 rounded text-xs font-mono hidden md:block">ESC</button>
                 <button onClick={() => setIsSearchOpen(false)} className="text-zinc-500 hover:text-white md:hidden"><X className="w-5 h-5" /></button>
               </div>
               
               <div className="p-4 flex flex-col gap-2 min-h-[100px]">
                 {searchQuery.length > 2 ? (
                   <div className="text-center text-zinc-500 text-sm py-8">
                     <div className="w-6 h-6 border-2 border-cyan-400/20 border-t-cyan-400 rounded-full animate-spin mx-auto mb-4"></div>
                     Searching architecture for "{searchQuery}"...
                   </div>
                 ) : (
                   <>
                     <span className="text-[10px] font-black uppercase text-zinc-500 tracking-widest pl-2 mb-2">Suggested</span>
                     <Link onClick={() => setIsSearchOpen(false)} to="/services" className="px-4 py-3 bg-white/5 hover:bg-white/10 rounded-xl text-sm flex items-center justify-between group transition-colors">
                       <span className="font-bold text-cyan-100 group-hover:text-cyan-400 transition-colors">Growth Design</span>
                       <span className="text-[10px] uppercase text-zinc-500">Service</span>
                     </Link>
                     <Link onClick={() => setIsSearchOpen(false)} to="/members/sync" className="px-4 py-3 bg-white/5 hover:bg-white/10 rounded-xl text-sm flex items-center justify-between group transition-colors">
                       <span className="font-bold text-emerald-100 group-hover:text-emerald-400 transition-colors">Neural Sync</span>
                       <span className="text-[10px] uppercase text-zinc-500">Applet</span>
                     </Link>
                     <Link onClick={() => setIsSearchOpen(false)} to="/contact" className="px-4 py-3 bg-white/5 hover:bg-white/10 rounded-xl text-sm flex items-center justify-between group transition-colors">
                       <span className="font-bold text-white">Start Your Project</span>
                       <span className="text-[10px] uppercase text-zinc-500">Contact</span>
                     </Link>
                   </>
                 )}
               </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* CONTENT */}
      <main className="flex-1 pt-32 pb-20 relative flex flex-col items-center fade-in">
        <div className={`relative ${maxWidth} mx-auto px-6 z-10 w-full`}>
          {showHero && (
            <div className="text-center mb-12">
               <span className="text-cyan-400 font-bold uppercase tracking-[0.5em] text-[10px]">AI Surfer Growth Architecture</span>
            </div>
          )}
          {children}
        </div>
      </main>

      {/* FOOTER */}
      <footer className="relative pt-32 pb-20 text-center text-cyan-200/90 text-sm z-10 shrink-0 mt-auto bg-black">
        {/* WAVE DIVIDER */}
        <div className="absolute top-0 left-0 w-full overflow-hidden leading-none transform -translate-y-full">
            <svg data-name="Layer 1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1200 120" preserveAspectRatio="none" className="w-[calc(100%+1.3px)] h-[50px] relative block">
                <path d="M321.39,56.44c58-10.79,114.16-30.13,172-41.86,82.39-16.72,168.19-17.73,250.45-.39C823.78,31,906.67,72,985.66,92.83c70.05,18.48,146.53,26.09,214.34,3V120H0V95.8C89.71,110.59,173.34,87.35,250.45,61.76Z" className="fill-black"></path>
            </svg>
        </div>

        <div className="max-w-7xl mx-auto px-6 grid md:grid-cols-4 gap-12 text-left mb-20">
           <div className="col-span-1 md:col-span-2">
              <div className="w-12 h-12 flex items-center justify-center rounded-sm mb-6">
                <img src="/logo.svg" alt="AI Surfer Logo" className="w-full h-full object-contain grayscale brightness-200" />
              </div>
              <p className="max-w-xs text-white font-medium leading-relaxed mb-8">
                AI Surfer: A premium growth agency building digital architecture for tomorrow-focused brands.
              </p>
              
              <div className="max-w-md w-full mb-8">
                <h4 className="text-white font-black uppercase tracking-widest text-xs mb-4">Neural Dispatch (Newsletter)</h4>
                <form className="flex" onSubmit={e => { e.preventDefault(); alert('Subscribed to Neural Dispatch'); }}>
                  <input type="email" placeholder="Enter your email" required className="flex-1 bg-white/5 border border-white/10 rounded-l-xl px-4 py-2 text-sm text-white focus:outline-none focus:border-cyan-400 placeholder:text-zinc-600" />
                  <button type="submit" className="bg-cyan-400 text-black px-4 py-2 rounded-r-xl text-[10px] font-black uppercase tracking-widest hover:bg-cyan-300 transition-colors">Join</button>
                </form>
              </div>

              <div className="flex items-center gap-4">
                 <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" className="w-10 h-10 rounded-full bg-white/5 border border-white/10 flex items-center justify-center hover:bg-cyan-500/20 hover:border-cyan-400 hover:text-cyan-400 transition-all text-white">
                    <Twitter className="w-4 h-4" />
                 </a>
                 <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer" className="w-10 h-10 rounded-full bg-white/5 border border-white/10 flex items-center justify-center hover:bg-blue-500/20 hover:border-blue-400 hover:text-blue-400 transition-all text-white">
                    <Linkedin className="w-4 h-4" />
                 </a>
                 <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" className="w-10 h-10 rounded-full bg-white/5 border border-white/10 flex items-center justify-center hover:bg-pink-500/20 hover:border-pink-400 hover:text-pink-400 transition-all text-white">
                    <Instagram className="w-4 h-4" />
                 </a>
              </div>
           </div>
           <div>
              <h4 className="text-white font-black uppercase tracking-widest text-xs mb-6">Capabilities</h4>
              <ul className="flex flex-col gap-4 text-xs font-bold text-white/90">
                 <li><Link to="/services" className="hover:text-white transition-colors">Brand Identity</Link></li>
                 <li><Link to="/services" className="hover:text-white transition-colors">AI Integration</Link></li>
                 <li><Link to="/services" className="hover:text-white transition-colors">Growth Design</Link></li>
                 <li><Link to="/founders" className="hover:text-white transition-colors">Founders Society</Link></li>
              </ul>
           </div>
           <div>
              <h4 className="text-white font-black uppercase tracking-widest text-xs mb-6">Contact</h4>
              <ul className="flex flex-col gap-4 text-xs font-bold text-white/90">
                 <li className="flex items-center gap-2"><MapPin className="w-3 h-3 text-cyan-400" /> Charleston, SC 29414</li>
                 <li><a href="mailto:oceantidedropaisurf@gmail.com" className="hover:text-white transition-colors">oceantidedropaisurf@gmail.com</a></li>
                 <li className="pt-4"><Link to="/contact" className="inline-block px-6 py-3 bg-cyan-500/10 border border-cyan-400 text-cyan-400 font-black uppercase text-[10px] tracking-widest hover:bg-cyan-400 hover:text-black transition-all">Start Your Project</Link></li>
                 <li className="pt-4 mt-4 border-t border-white/5 flex flex-col gap-2">
                    <Link to="/support" className="hover:text-white transition-colors">Support & Service</Link>
                    <Link to="/privacy" className="hover:text-white transition-colors">Privacy Policy</Link>
                    <Link to="/terms" className="hover:text-white transition-colors">Terms of Service</Link>
                 </li>
              </ul>
           </div>
        </div>
        <div className="pt-12 border-t border-white/5 font-black uppercase tracking-[0.2em] text-[10px] text-white">
          © {new Date().getFullYear()} AI Surfer Marketing Agency — Peak Frequency.
        </div>
      </footer>
      <AIAssistant />
    </div>
  );
}
