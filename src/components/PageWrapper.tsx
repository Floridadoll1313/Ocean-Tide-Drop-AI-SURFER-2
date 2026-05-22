import React, { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { useAuth } from "../hooks/useAuth";
import { Menu, X, Home as HomeIcon, Briefcase, Layers, MessageSquare, LayoutDashboard, Anchor, Users, Calendar as CalendarIcon, Twitter, Linkedin, Instagram, MapPin, Star, Moon, Sun, HeartHandshake, Activity } from "lucide-react";
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
  const location = useLocation();

  const toggleTheme = () => {
    const newTheme = theme === 'dark' ? 'light' : 'dark';
    setTheme(newTheme);
    if (newTheme === 'light') {
      document.documentElement.style.filter = "invert(1) hue-rotate(180deg)";
    } else {
      document.documentElement.style.filter = "";
    }
  };

  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);

  const isActive = (path: string) => {
    if (path === "/" && location.pathname !== "/") return false;
    return location.pathname.startsWith(path);
  };

  const navLinks = [
    { to: "/", label: "Home", icon: HomeIcon, color: "text-yellow-500" },
    { to: "/ai-surfer-ocean-tide-drop", label: "AI Surfer", icon: Activity, color: "text-cyan-300" },
    { to: "/gallery", label: "Work", icon: Briefcase, color: "text-blue-500" },
    { to: "/services", label: "Services", icon: Layers, color: "text-purple-500" },
    { to: "/members", label: "Members", icon: LayoutDashboard, color: "text-cyan-400" },
    { to: "/reviews", label: "Reviews", icon: Star, color: "text-yellow-400" },
    { to: "/founders", label: "Founders", icon: Users, color: "text-emerald-500" },
    { to: "/memorial", label: "Bull's Memorial", icon: Anchor, color: "text-orange-500" },
    { to: "/tip-jar", label: "Tip Jar", icon: HeartHandshake, color: "text-pink-400" },
    { to: "/contact", label: "Contact", icon: MessageSquare, color: "text-green-500" },
  ];

  return (
    <div className="min-h-screen bg-transparent text-white flex flex-col relative overflow-x-hidden">
      {/* TOP BAR */}
      <header className="w-full fixed top-4 left-0 z-[70] flex justify-center px-4 md:pl-28">
        <div className="relative z-[80] w-full max-w-6xl backdrop-blur-xl bg-black/50 border border-white/10 rounded-full flex items-center justify-between px-6 py-3 shadow-[0_0_30px_rgba(0,0,0,0.5)] navbar-glow">
          <Link to="/" className="flex items-center gap-3 relative z-[90]">
            <div className="w-10 h-10 flex items-center justify-center rounded-sm">
              <img src="/logo.svg" alt="AI Surfer Logo" className="w-full h-full object-contain drop-shadow-[0_0_5px_rgba(0,255,255,0.5)]" />
            </div>
            <span className="text-xl font-black tracking-tighter uppercase text-white hidden sm:block">
              <span className="text-soul-gradient italic font-serif">AI Surfer</span>
            </span>
          </Link>
            
          <div className="hidden md:flex items-center gap-4 relative z-[90]">
            <button onClick={toggleTheme} className="w-8 h-8 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-zinc-400 hover:text-white hover:bg-white/10 transition-colors" title="Toggle Theme">
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
                  onClick={logout}
                  className="w-8 h-8 flex items-center justify-center rounded-full bg-red-500/10 text-red-400 hover:bg-red-500 hover:text-white transition-colors ml-1"
                  title="Sign Out"
                >
                  <X className="w-3.5 h-3.5" />
                </button>
              </div>
            ) : (
              <Link 
                to="/members"
                className="px-6 py-2.5 bg-white text-black rounded-full hover:bg-cyan-400 transition-colors text-[10px] font-black uppercase tracking-widest"
              >
                Join
              </Link>
            )}
          </div>

          {/* Mobile Theme & Menu Button */}
          <div className="md:hidden flex items-center gap-2 relative z-[90]">
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

      {/* DESKTOP SIDE NAV */}
      <aside className="hidden md:flex fixed left-4 top-1/2 -translate-y-1/2 z-40 flex-col items-center gap-3 rounded-[2rem] border border-cyan-400/20 bg-black/65 px-3 py-5 shadow-[0_0_35px_rgba(34,211,238,0.18)] backdrop-blur-2xl">
        <div className="mb-2 h-10 w-10 rounded-2xl border border-white/10 bg-white/5 p-2 shadow-[0_0_20px_rgba(34,211,238,0.2)]">
          <img src="/logo.svg" alt="AI Surfer" className="h-full w-full object-contain" />
        </div>
        <nav className="flex flex-col items-center gap-2">
          {navLinks.map((link) => (
            <Link
              key={link.to}
              to={link.to}
              aria-label={link.label}
              title={link.label}
              className={`group relative flex h-12 w-12 items-center justify-center rounded-2xl border transition-all duration-300 ${isActive(link.to) ? 'border-cyan-300 bg-cyan-400/15 text-white shadow-[0_0_22px_rgba(34,211,238,0.45)]' : 'border-white/10 bg-white/[0.04] text-zinc-400 hover:border-white/30 hover:bg-white/10 hover:text-white'}`}
            >
              <link.icon className={`h-5 w-5 ${link.color} transition-all duration-300 group-hover:scale-110 ${isActive(link.to) ? 'scale-110' : ''}`} />
              <span className="pointer-events-none absolute left-14 scale-95 whitespace-nowrap rounded-full border border-white/10 bg-black/90 px-4 py-2 text-[10px] font-black uppercase tracking-[0.18em] text-white opacity-0 shadow-[0_0_20px_rgba(0,0,0,0.45)] backdrop-blur-xl transition-all duration-300 group-hover:translate-x-1 group-hover:scale-100 group-hover:opacity-100">
                {link.label}
              </span>
              {isActive(link.to) && (
                <span className="absolute -right-1 h-2 w-2 rounded-full bg-cyan-300 shadow-[0_0_12px_rgba(34,211,238,1)]" />
              )}
            </Link>
          ))}
        </nav>
        <div className="mt-2 h-px w-8 bg-white/10" />
        <Link
          to="/tip-jar"
          aria-label="PayPal Tip Jar"
          title="PayPal Tip Jar"
          className="group relative flex h-12 w-12 items-center justify-center rounded-2xl border border-pink-300/40 bg-pink-500/10 text-pink-200 shadow-[0_0_24px_rgba(244,114,182,0.25)] transition-all duration-300 hover:bg-pink-500/20 hover:shadow-[0_0_30px_rgba(244,114,182,0.45)]"
        >
          <HeartHandshake className="h-5 w-5 text-pink-300 transition-transform duration-300 group-hover:scale-110" />
          <span className="pointer-events-none absolute left-14 scale-95 whitespace-nowrap rounded-full border border-pink-300/20 bg-black/90 px-4 py-2 text-[10px] font-black uppercase tracking-[0.18em] text-pink-100 opacity-0 shadow-[0_0_20px_rgba(0,0,0,0.45)] backdrop-blur-xl transition-all duration-300 group-hover:translate-x-1 group-hover:scale-100 group-hover:opacity-100">
            PayPal Tip Jar
          </span>
        </Link>
      </aside>

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
                      onClick={() => { logout(); toggleMenu(); }}
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

      {/* CONTENT */}
      <main className="flex-1 pt-32 pb-20 relative flex flex-col items-center fade-in md:pl-24">
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
      <footer className="relative pt-32 pb-20 text-center text-cyan-200/90 text-sm z-10 shrink-0 mt-auto bg-black md:pl-24">
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
                 <li><Link to="/ai-surfer-ocean-tide-drop" className="hover:text-white transition-colors">AI Surfer Live Page</Link></li>
                 <li><Link to="/services" className="hover:text-white transition-colors">Brand Identity</Link></li>
                 <li><Link to="/services" className="hover:text-white transition-colors">AI Integration</Link></li>
                 <li><Link to="/services" className="hover:text-white transition-colors">Growth Design</Link></li>
                 <li><Link to="/founders" className="hover:text-white transition-colors">Founders Society</Link></li>
                 <li><Link to="/tip-jar" className="hover:text-white transition-colors">Support / PayPal Tip Jar</Link></li>
              </ul>
           </div>
           <div>
              <h4 className="text-white font-black uppercase tracking-widest text-xs mb-6">Contact</h4>
              <ul className="flex flex-col gap-4 text-xs font-bold text-white/90">
                 <li className="flex items-center gap-2"><MapPin className="w-3 h-3 text-cyan-400" /> Charleston, SC 29414</li>
                 <li><a href="mailto:oceantidedropaisurf@gmail.com" className="hover:text-white transition-colors">oceantidedropaisurf@gmail.com</a></li>
                 <li className="pt-4"><Link to="/contact" className="inline-block px-6 py-3 bg-cyan-500/10 border border-cyan-400 text-cyan-400 font-black uppercase text-[10px] tracking-widest hover:bg-cyan-400 hover:text-black transition-all">Start Your Project</Link></li>
                 <li className="pt-4 mt-4 border-t border-white/5 flex flex-col gap-2">
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
