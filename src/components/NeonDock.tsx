import React from 'react';
import { NavLink } from 'react-router-dom';
import { Home, CreditCard, Layers, Mail, Users, Cpu } from 'lucide-react';
import './neon-dock.css';

const dockLinks = [
  { path: '/', label: 'Home', icon: Home },
  { path: '/services', label: 'Services', icon: Layers },
  { path: '/pricing', label: 'Pricing', icon: CreditCard },
  { path: '/members', label: 'Members', icon: Users },
  { path: '/studio', label: 'Studio', icon: Cpu },
  { path: '/contact', label: 'Contact', icon: Mail },
];

export default function NeonDock() {
  return (
    <div className="neon-dock">
      {dockLinks.map((link) => (
        <NavLink 
          key={link.path} 
          to={link.path} 
          className={({ isActive }) => `dock-item group ${isActive ? 'active' : ''}`}
        >
          <div className="flex items-center gap-2">
            <link.icon className="w-5 h-5" />
            <span className="hidden md:inline">{link.label}</span>
          </div>
        </NavLink>
      ))}
    </div>
  );
}
