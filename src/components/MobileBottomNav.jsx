import React from 'react';
import WhatsAppIcon from './WhatsAppIcon';
import { NavLink } from 'react-router-dom';
import { Home, Smartphone, Calculator, RefreshCw } from 'lucide-react';
import { STORE_CONFIG } from '../data/config';

export default function MobileBottomNav() {
  const bottomWhatsAppUrl = STORE_CONFIG.makeWhatsAppLink(
    "Hello Paindem Smart Cells! 👋 I am browsing your site on mobile and want to ask about your Pay Small Small scheme."
  );

  return (
    <nav className="mobile-bottom-nav" aria-label="Mobile Navigation">
      <NavLink 
        to="/" 
        end
        className={({ isActive }) => `bottom-nav-item ${isActive ? 'active' : ''}`}
      >
        <Home size={20} className="bottom-nav-icon" />
        <span className="bottom-nav-label">Home</span>
      </NavLink>

      <NavLink 
        to="/all-iphones" 
        className={({ isActive }) => `bottom-nav-item ${isActive ? 'active' : ''}`}
      >
        <Smartphone size={20} className="bottom-nav-icon" />
        <span className="bottom-nav-label">iPhones</span>
      </NavLink>

      <NavLink 
        to="/calculator" 
        className={({ isActive }) => `bottom-nav-item ${isActive ? 'active' : ''}`}
      >
        <Calculator size={20} className="bottom-nav-icon" />
        <span className="bottom-nav-label">Calculator</span>
      </NavLink>

      <NavLink 
        to="/trade-in" 
        className={({ isActive }) => `bottom-nav-item ${isActive ? 'active' : ''}`}
      >
        <RefreshCw size={20} className="bottom-nav-icon" />
        <span className="bottom-nav-label">Trade-In</span>
      </NavLink>

      <a 
        href={bottomWhatsAppUrl}
        target="_blank"
        rel="noopener noreferrer"
        className="bottom-nav-item bottom-nav-wa"
        aria-label="Chat on WhatsApp"
      >
        <div className="bottom-nav-wa-badge">
          <WhatsAppIcon size={20} className="bottom-nav-icon" />
          <span className="bottom-nav-pulse"></span>
        </div>
        <span className="bottom-nav-label">WhatsApp</span>
      </a>
    </nav>
  );
}
