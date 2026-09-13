import React, { useState } from 'react';
import WhatsAppIcon from './WhatsAppIcon';
import { NavLink } from 'react-router-dom';
import { Home, Smartphone, Calculator, Menu, Sparkles, X, Route, RefreshCw, MapPin, Phone } from 'lucide-react';
import { STORE_CONFIG } from '../data/config';

export default function MobileBottomNav() {
  const [quickMenuOpen, setQuickMenuOpen] = useState(false);

  const bottomWhatsAppUrl = STORE_CONFIG.makeWhatsAppLink(
    "Hello Paindem Smart Cells! 👋 I am browsing your site on mobile and want to ask about your Buy Now, Pay Later scheme."
  );

  const toggleOptions = () => {
    // Open the comprehensive mobile options sheet
    window.dispatchEvent(new CustomEvent('toggle-mobile-menu'));
  };

  return (
    <>
      <nav className="mobile-bottom-nav" aria-label="Mobile Navigation">
        {/* 1. Home */}
        <NavLink 
          to="/" 
          end
          className={({ isActive }) => `bottom-nav-item ${isActive ? 'active' : ''}`}
        >
          <Home size={19} className="bottom-nav-icon" />
          <span className="bottom-nav-label">Home</span>
        </NavLink>

        {/* 2. iPhones */}
        <NavLink 
          to="/all-iphones" 
          className={({ isActive }) => `bottom-nav-item ${isActive ? 'active' : ''}`}
        >
          <Smartphone size={19} className="bottom-nav-icon" />
          <span className="bottom-nav-label">iPhones</span>
        </NavLink>

        {/* 3. Central Dynamic "Menu" Button — Drops / Pops up all option buttons */}
        <button
          type="button"
          className="bottom-nav-item bottom-nav-menu-trigger"
          onClick={toggleOptions}
          aria-label="Open options menu"
        >
          <div className="menu-trigger-bubble">
            <Menu size={20} className="menu-trigger-icon" />
          </div>
          <span className="bottom-nav-label">Menu</span>
        </button>

        {/* 4. Calculator */}
        <NavLink 
          to="/calculator" 
          className={({ isActive }) => `bottom-nav-item ${isActive ? 'active' : ''}`}
        >
          <Calculator size={19} className="bottom-nav-icon" />
          <span className="bottom-nav-label">Calculator</span>
        </NavLink>

        {/* 5. WhatsApp Contact */}
        <a 
          href={bottomWhatsAppUrl}
          target="_blank" 
          rel="noopener noreferrer"
          className="bottom-nav-item bottom-nav-wa"
          aria-label="Chat on WhatsApp"
        >
          <div className="bottom-nav-wa-badge">
            <WhatsAppIcon size={19} className="bottom-nav-icon" />
            <span className="bottom-nav-pulse"></span>
          </div>
          <span className="bottom-nav-label">WhatsApp</span>
        </a>
      </nav>
    </>
  );
}
