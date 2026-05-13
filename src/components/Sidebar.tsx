import React from "react";
import { NavLink } from "react-router-dom";
import "./sidebar.css";

export default function Sidebar() {
  return (
    <div className="sidebar fixed left-0 top-0 bottom-0 w-64 bg-black/80 backdrop-blur-xl border-r border-white/10 z-[60] flex flex-col p-6 hidden lg:flex">
      <div className="sidebar-logo text-2xl font-black italic text-neon-cyan mb-12 drop-shadow-[0_0_8px_rgba(0,255,255,0.4)]">
        🌊 OTD
      </div>

      <nav className="sidebar-nav flex flex-col gap-4">
        {[
          { name: "Dashboard", path: "/members/dashboard" },
          { name: "Realm Metrics", path: "/members/realm" },
          { name: "Lore Engine", path: "/members/lore" },
          { name: "Member Signals", path: "/members/signals" },
          { name: "Cinematic Systems", path: "/members/cinematic" },
        ].map((link) => (
          <NavLink
            key={link.path}
            to={link.path}
            className={({ isActive }) => 
              `sidebar-link text-[10px] font-black uppercase tracking-[0.2em] transition-all ${
                isActive ? "text-neon-cyan" : "text-white/40 hover:text-neon-cyan"
              }`
            }
          >
            {link.name}
          </NavLink>
        ))}
      </nav>
    </div>
  );
}
